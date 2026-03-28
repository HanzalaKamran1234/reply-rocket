import dns from 'dns/promises'
import net from 'net'

/**
 * Private / reserved IPv4 ranges that must never be fetched server-side.
 * Includes loopback, link-local, RFC-1918, and cloud metadata endpoints.
 */
const BLOCKED_CIDRS: Array<{ base: number; mask: number }> = [
  // 127.0.0.0/8  — loopback
  { base: ip('127.0.0.0'), mask: 0xff000000 },
  // 10.0.0.0/8   — RFC-1918
  { base: ip('10.0.0.0'), mask: 0xff000000 },
  // 172.16.0.0/12 — RFC-1918
  { base: ip('172.16.0.0'), mask: 0xfff00000 },
  // 192.168.0.0/16 — RFC-1918
  { base: ip('192.168.0.0'), mask: 0xffff0000 },
  // 169.254.0.0/16 — link-local / AWS & GCP metadata
  { base: ip('169.254.0.0'), mask: 0xffff0000 },
  // 0.0.0.0/8
  { base: ip('0.0.0.0'), mask: 0xff000000 },
  // 100.64.0.0/10 — shared address space
  { base: ip('100.64.0.0'), mask: 0xffc00000 },
]

function ip(addr: string): number {
  return addr
    .split('.')
    .reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0
}

function isPrivateIP(addr: string): boolean {
  if (!net.isIPv4(addr)) return true // block IPv6 for now (could allow later)
  const n = ip(addr) >>> 0
  return BLOCKED_CIDRS.some(({ base, mask }) => (n & mask) === (base & mask))
}

export class SSRFError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'SSRFError'
  }
}

/**
 * Validates that `rawUrl` is safe to fetch server-side.
 * Returns the parsed URL if valid, throws SSRFError otherwise.
 */
export async function validatePublicUrl(rawUrl: string): Promise<URL> {
  if (!rawUrl || typeof rawUrl !== 'string') {
    throw new SSRFError('URL is required')
  }

  if (rawUrl.length > 2048) {
    throw new SSRFError('URL is too long')
  }

  let parsed: URL
  try {
    parsed = new URL(rawUrl)
  } catch {
    throw new SSRFError('Invalid URL format')
  }

  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new SSRFError('Only http and https URLs are allowed')
  }

  const hostname = parsed.hostname

  // Block numeric IP addresses directly
  if (net.isIP(hostname)) {
    if (isPrivateIP(hostname)) {
      throw new SSRFError('URL resolves to a private or reserved IP address')
    }
    return parsed
  }

  // Resolve hostname and check all returned IPs
  let addresses: string[]
  try {
    const results = await dns.resolve4(hostname)
    addresses = results
  } catch {
    throw new SSRFError('Failed to resolve URL hostname')
  }

  if (addresses.length === 0) {
    throw new SSRFError('URL hostname did not resolve to any IP address')
  }

  for (const addr of addresses) {
    if (isPrivateIP(addr)) {
      throw new SSRFError('URL resolves to a private or reserved IP address')
    }
  }

  return parsed
}
