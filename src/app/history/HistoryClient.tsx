'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, Copy, Check, ExternalLink, History, Rocket, ChevronDown, ChevronUp } from 'lucide-react'

interface HistoryItem {
  id: string
  url: string
  messages: string[]
  createdAt: string
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '')
  } catch {
    return url
  }
}

function HistoryCard({ item }: { item: HistoryItem }) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [expanded, setExpanded] = useState(false)

  const handleCopy = async (text: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(idx)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch { /* ignore */ }
  }

  const visibleMessages = expanded ? item.messages : item.messages.slice(0, 1)

  return (
    <div style={{
      backgroundColor: 'var(--bg-color)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-sm)',
    }}>
      {/* Card header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.25rem',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        flexWrap: 'wrap',
        gap: '0.5rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', minWidth: 0 }}>
          <div style={{
            width: '2rem', height: '2rem', borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--primary-light)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <ExternalLink size={14} color="var(--primary)" />
          </div>
          <div style={{ minWidth: 0 }}>
            <p style={{
              margin: 0, fontWeight: 600, fontSize: '0.9rem',
              color: 'var(--text-main)', overflow: 'hidden',
              textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {getDomain(item.url)}
            </p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {item.messages.length} variant{item.messages.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{
            display: 'flex', alignItems: 'center', gap: '0.3rem',
            fontSize: '0.78rem', color: 'var(--text-muted)',
          }}>
            <Clock size={12} />
            <span title={formatDate(item.createdAt)}>{timeAgo(item.createdAt)}</span>
          </span>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex', alignItems: 'center', gap: '0.25rem',
              fontSize: '0.78rem', color: 'var(--primary)',
              fontWeight: 500, textDecoration: 'none',
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(59,130,246,0.2)',
              backgroundColor: 'var(--primary-light)',
            }}
          >
            Visit <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* Messages */}
      <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        {visibleMessages.map((msg, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-lg)',
              padding: '0.875rem 1rem',
              position: 'relative',
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem',
            }}>
              <span style={{
                fontSize: '0.7rem', fontWeight: 700,
                color: 'var(--text-muted)', letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}>
                Variant {idx + 1}
              </span>
              <button
                onClick={() => handleCopy(msg, idx)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.25rem',
                  padding: '0.2rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  background: copiedIndex === idx ? 'var(--success-light)' : 'var(--bg-color)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  fontSize: '0.75rem', fontWeight: 500,
                  color: copiedIndex === idx ? 'var(--success)' : 'var(--text-secondary)',
                  transition: 'all 0.15s',
                  fontFamily: 'var(--font-main)',
                }}
              >
                {copiedIndex === idx ? <><Check size={11} /> Copied!</> : <><Copy size={11} /> Copy</>}
              </button>
            </div>
            <p style={{
              margin: 0, fontSize: '0.9rem', color: 'var(--text-main)',
              lineHeight: 1.7, whiteSpace: 'pre-wrap',
            }}>{msg}</p>
          </div>
        ))}

        {/* Show more / less toggle */}
        {item.messages.length > 1 && (
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              justifyContent: 'center',
              width: '100%',
              padding: '0.5rem',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-color)',
              background: 'transparent',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem', fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'var(--font-main)',
              transition: 'background-color 0.15s',
            }}
          >
            {expanded
              ? <><ChevronUp size={14} /> Show less</>
              : <><ChevronDown size={14} /> Show {item.messages.length - 1} more variant{item.messages.length > 2 ? 's' : ''}</>
            }
          </button>
        )}
      </div>
    </div>
  )
}

export default function HistoryClient({ items }: { items: HistoryItem[] }) {
  return (
    <div style={{
      backgroundColor: 'var(--bg-secondary)',
      minHeight: '100%',
      padding: '3rem 1.5rem',
    }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
            <div style={{
              width: '2.25rem', height: '2.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <History size={16} color="var(--primary)" />
            </div>
            <h1 style={{ fontSize: '1.5rem', margin: 0, letterSpacing: '-0.02em' }}>Generation History</h1>
          </div>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
            All your previously generated messages, newest first.
          </p>
        </div>

        {/* Stats bar */}
        {items.length > 0 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            backgroundColor: 'var(--bg-color)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            marginBottom: '1.25rem',
            boxShadow: 'var(--shadow-xs)',
          }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <strong style={{ color: 'var(--text-main)' }}>{items.length}</strong> generation{items.length !== 1 ? 's' : ''} total
              &nbsp;·&nbsp;
              <strong style={{ color: 'var(--text-main)' }}>{items.reduce((n, i) => n + i.messages.length, 0)}</strong> messages
            </span>
            <Link href="/dashboard" className="btn btn-primary" style={{
              padding: '0.4rem 0.875rem',
              fontSize: '0.825rem',
              gap: '0.35rem',
            }}>
              <Rocket size={13} /> Generate new
            </Link>
          </div>
        )}

        {/* Empty state */}
        {items.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            backgroundColor: 'var(--bg-color)',
            border: '1px dashed var(--border-color)',
            borderRadius: 'var(--radius-xl)',
          }}>
            <History size={36} style={{ margin: '0 auto 1rem', color: 'var(--border-strong)' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>No history yet</h3>
            <p style={{ margin: '0 0 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
              Generate your first personalized message to see it here.
            </p>
            <Link href="/dashboard" className="btn btn-primary" style={{ gap: '0.375rem' }}>
              <Rocket size={15} /> Go to Generator
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {items.map(item => (
              <HistoryCard key={item.id} item={item} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}
