'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Rocket, Loader2, Copy, Check, AlertCircle, Sparkles } from 'lucide-react'

export default function DashboardPage() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!url) return

    setLoading(true)
    setError(null)
    setMessages([])

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate messages')
      }

      setMessages(data.messages)
      
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <div style={{
      backgroundColor: 'var(--bg-secondary)',
      minHeight: '100%',
      padding: '3rem 1.5rem',
    }}>
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>

        {/* Page header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.5rem' }}>
            <div style={{
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Sparkles size={16} color="var(--primary)" />
            </div>
            <h1 style={{ fontSize: '1.5rem', margin: 0, letterSpacing: '-0.02em' }}>Message Generator</h1>
          </div>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
            Enter a prospect&apos;s website URL to generate personalized outreach messages.
          </p>
        </div>

        {/* Generator card */}
        <div style={{
          backgroundColor: 'var(--bg-color)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: '1.75rem',
        }}>
          <label htmlFor="lead-url" style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--text-main)',
            marginBottom: '0.5rem',
          }}>
            Lead website URL
          </label>
          <form onSubmit={handleGenerate} className="dashboard-form">
            <input
              id="lead-url"
              type="url"
              className="input"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              style={{ flex: 1 }}
            />
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ minWidth: '130px', fontWeight: 600, gap: '0.4rem' }}
            >
              {loading ? (
                <><Loader2 size={15} className="animate-spin" /> Analyzing</>
              ) : (
                <><Rocket size={15} /> Generate</>
              )}
            </button>
          </form>

          {error && (
            <div className="alert alert-error" style={{ marginTop: '1rem' }}>
              <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '0.05rem' }} />
              {error}
            </div>
          )}
        </div>

        {/* Loading state */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '3.5rem 1.5rem',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--bg-color)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <Loader2
              size={36}
              className="animate-spin"
              style={{ margin: '0 auto 1rem', color: 'var(--primary)' }}
            />
            <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
              Scraping website and generating hyper-personalized messages…
            </p>
          </div>
        )}

        {/* Results */}
        {!loading && messages.length > 0 && (
          <div>
            {/* Results header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
            }}>
              <div style={{
                width: '20px', height: '20px',
                borderRadius: '50%',
                backgroundColor: 'var(--success-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Check size={12} color="var(--success)" strokeWidth={3} />
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {messages.length} message variant{messages.length > 1 ? 's' : ''} generated
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'var(--bg-color)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '1.5rem 1.25rem',
                    boxShadow: 'var(--shadow-sm)',
                    position: 'relative',
                  }}
                >
                  {/* Variant label */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.875rem',
                  }}>
                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.07em',
                      textTransform: 'uppercase',
                    }}>
                      Variant {idx + 1}
                    </span>
                    <button
                      onClick={() => handleCopy(msg, idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.3rem 0.625rem',
                        borderRadius: 'var(--radius-sm)',
                        background: copiedIndex === idx ? 'var(--success-light)' : 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        cursor: 'pointer',
                        fontSize: '0.78rem',
                        fontWeight: 500,
                        color: copiedIndex === idx ? 'var(--success)' : 'var(--text-secondary)',
                        transition: 'all 0.15s ease',
                      }}
                      title="Copy to clipboard"
                    >
                      {copiedIndex === idx
                        ? <><Check size={12} /> Copied!</>
                        : <><Copy size={12} /> Copy</>
                      }
                    </button>
                  </div>

                  <p style={{
                    whiteSpace: 'pre-wrap',
                    color: 'var(--text-main)',
                    margin: 0,
                    fontSize: '0.9375rem',
                    lineHeight: 1.7,
                  }}>
                    {msg}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && messages.length === 0 && !error && (
          <div style={{
            textAlign: 'center',
            padding: '3.5rem 1.5rem',
            color: 'var(--text-muted)',
            backgroundColor: 'var(--bg-color)',
            border: '1px dashed var(--border-color)',
            borderRadius: 'var(--radius-xl)',
          }}>
            <Rocket size={32} style={{ margin: '0 auto 0.875rem', color: 'var(--border-strong)' }} />
            <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--text-muted)' }}>
              Enter a URL above to generate your first message
            </p>
          </div>
        )}

      </div>
    </div>
  )
}
