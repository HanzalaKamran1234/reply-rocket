/**
 * Simple in-process sliding-window rate limiter.
 * Works per-userId; resets on server restart (fine for single-instance/serverless cold starts).
 * For multi-instance deployments, replace with Redis / Upstash Ratelimit.
 */

interface Window {
  timestamps: number[]
}

const store = new Map<string, Window>()

/**
 * @param key      Unique key (e.g. userId or IP)
 * @param limit    Max requests allowed in `windowMs`
 * @param windowMs Rolling window in milliseconds (default 60 000 = 1 min)
 * @returns        { allowed: boolean; remaining: number; resetAt: number }
 */
export function checkRateLimit(
  key: string,
  limit: number = 10,
  windowMs: number = 60_000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const cutoff = now - windowMs

  // Retrieve or create window
  let win = store.get(key)
  if (!win) {
    win = { timestamps: [] }
    store.set(key, win)
  }

  // Evict timestamps outside the window
  win.timestamps = win.timestamps.filter((t) => t > cutoff)

  if (win.timestamps.length >= limit) {
    const oldest = win.timestamps[0]
    return {
      allowed: false,
      remaining: 0,
      resetAt: oldest + windowMs,
    }
  }

  win.timestamps.push(now)
  return {
    allowed: true,
    remaining: limit - win.timestamps.length,
    resetAt: now + windowMs,
  }
}

/**
 * Periodically prune dead keys so the Map doesn't grow unbounded.
 * Runs every 5 minutes.
 */
setInterval(() => {
  const cutoff = Date.now() - 60_000
  for (const [key, win] of store.entries()) {
    win.timestamps = win.timestamps.filter((t) => t > cutoff)
    if (win.timestamps.length === 0) store.delete(key)
  }
}, 5 * 60_000)
