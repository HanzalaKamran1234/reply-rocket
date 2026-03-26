'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Rocket, Loader2, Copy, Check, RefreshCw, AlertCircle } from 'lucide-react'

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
      // We will make a POST request to our /api/generate endpoint
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
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Message Generator</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>Enter a website URL to generate 3 personalized cold messages.</p>
      </div>

      <div className="card" style={{ marginBottom: '3rem' }}>
        <form onSubmit={handleGenerate} style={{ display: 'flex', gap: '1rem' }}>
          <input 
            type="url" 
            className="input" 
            placeholder="https://example.com" 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ minWidth: '140px' }}>
            {loading ? (
              <><Loader2 size={18} className="animate-spin" style={{ marginRight: '8px' }} /> Analyzing</>
            ) : (
              <><Rocket size={18} style={{ marginRight: '8px' }} /> Generate</>
            )}
          </button>
        </form>
        {error && (
          <div style={{ marginTop: '1rem', color: 'var(--error)', display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <AlertCircle size={18} /> {error}
          </div>
        )}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem 0' }}>
          <Loader2 size={48} className="animate-spin" style={{ margin: '0 auto 1rem', color: 'var(--primary)' }} />
          <p>Scraping website and generating hyper-personalized messages...</p>
        </div>
      )}

      {!loading && messages.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Check color="var(--success)" /> Generated Messages
          </h2>
          
          {messages.map((msg, idx) => (
            <div key={idx} className="card" style={{ position: 'relative', paddingRight: '4rem' }}>
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => handleCopy(msg, idx)}
                  className="btn btn-secondary" 
                  style={{ padding: '0.5rem', border: 'none', background: 'transparent' }}
                  title="Copy to clipboard"
                >
                  {copiedIndex === idx ? <Check size={20} color="var(--success)" /> : <Copy size={20} color="var(--text-muted)" />}
                </button>
              </div>
              <p style={{ whiteSpace: 'pre-wrap', color: 'var(--text-main)', margin: 0 }}>{msg}</p>
            </div>
          ))}

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
            <button onClick={handleGenerate} className="btn btn-secondary" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              <RefreshCw size={18} /> Generate Alternative Variants
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
