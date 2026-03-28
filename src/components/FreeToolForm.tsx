'use client'

import { useState } from 'react'
import { Rocket, Sparkles, Loader2, Copy, Check } from 'lucide-react'
import Link from 'next/link'

interface FreeToolFormProps {
  inputPlaceholder: string
  buttonText: string
}

export default function FreeToolForm({ inputPlaceholder, buttonText }: FreeToolFormProps) {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    setLoading(true)
    setResult(null)

    // Simulate network delay to make it feel authentic
    setTimeout(() => {
      // Very basic local logic (Option A) — No API cost
      // Using generic template matching random variables.
      const templates = [
        `Hey there,\n\nI was just looking into ${input.slice(0, 30)}... and frankly, I loved what I saw. \n\nI run a system that helps companies in this exact space scale up. Are you open to a quick 5-min chat next Tuesday to see if it makes sense?`,
        `Hi team,\n\nAwesome work on ${input.slice(0, 30)}... I've been following your progress. \n\nI noticed an area where you could potentially double your conversion rate with one small tweak. Mind if I send over a quick 2-min video showing you?`,
        `Hey!\n\nI'll keep this short. I was highly impressed by ${input.slice(0, 30)}...\n\nWe specialize in helping similar teams hit their Q3 targets faster. Are you handling this internally right now, or open to outside help?`
      ]
      
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)]
      setResult(randomTemplate)
      setLoading(false)
    }, 1500)
  }

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div style={{
      backgroundColor: 'var(--bg-color)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-xl)',
      padding: '2rem',
      boxShadow: 'var(--shadow-sm)'
    }}>
      <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem', display: 'block' }}>
            Try it out:
          </label>
          <textarea
            className="input"
            rows={3}
            placeholder={inputPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            required
            style={{ width: '100%', resize: 'vertical' }}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading || !input.trim()}
          style={{ alignSelf: 'flex-start', padding: '0.75rem 1.5rem', fontWeight: 600 }}
        >
          {loading ? <><Loader2 size={16} className="animate-spin" /> Generating...</> : <><Sparkles size={16} /> {buttonText}</>}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '2rem', animation: 'fadeIn 0.5s ease-in-out' }}>
          <div style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.5rem',
            position: 'relative'
          }}>
            <button
              onClick={handleCopy}
              style={{
                position: 'absolute', top: '0.75rem', right: '0.75rem',
                display: 'flex', alignItems: 'center', gap: '0.25rem',
                fontSize: '0.75rem', padding: '0.4rem 0.6rem',
                borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                background: copied ? 'var(--success-light)' : 'var(--bg-color)',
                border: '1px solid var(--border-color)',
                color: copied ? 'var(--success)' : 'var(--text-secondary)',
              }}
            >
              {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
            </button>
            <p style={{ whiteSpace: 'pre-wrap', color: 'var(--text-main)', margin: 0, fontSize: '0.95rem', lineHeight: 1.6, marginTop: '0.5rem' }}>
              {result}
            </p>
          </div>

          {/* Upsell CTA */}
          <div style={{ 
            marginTop: '1.5rem', 
            padding: '1.5rem', 
            border: '2px solid var(--primary-light)', 
            borderRadius: 'var(--radius-lg)', 
            background: 'linear-gradient(to right, rgba(59,130,246,0.05), transparent)' 
          }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', marginTop: 0, marginBottom: '0.5rem', fontSize: '1.1rem' }}>
              <Rocket size={18} color="var(--primary)" /> 
              Want hyper-personalized AI logic?
            </h4>
            <p style={{ margin: '0 0 1rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              This free tool uses standard templates. The full ReplyRocket app actively scrapes prospect websites and uses Gemini 2.5 Flash to write custom hooks tailored to their exact business model.
            </p>
            <Link href="/signup" className="btn btn-primary" style={{ display: 'inline-flex' }}>
              Try Full Version for Free
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
