'use client'

import { useState } from 'react'
import { sendContactMessage } from './actions'
import { Mail, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    const formData = new FormData(e.currentTarget)
    const result = await sendContactMessage(formData)

    if (result.success) {
      setStatus('success')
      e.currentTarget.reset()
    } else {
      setStatus('error')
      setErrorMessage(result.error || 'Something went wrong.')
    }
  }

  return (
    <div style={{
      minHeight: '100%',
      backgroundColor: 'var(--bg-secondary)',
      padding: '5rem 1.5rem',
    }}>
      <div style={{ maxWidth: '580px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '3rem',
            height: '3rem',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: 'var(--primary-light)',
            marginBottom: '1rem',
          }}>
            <Mail size={20} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.625rem', letterSpacing: '-0.02em' }}>Contact us</h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', margin: 0 }}>
            Have a question or feedback? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Card */}
        <div style={{
          backgroundColor: 'var(--bg-color)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          boxShadow: 'var(--shadow-sm)',
        }}>
          {status === 'success' ? (
            <div style={{
              textAlign: 'center',
              padding: '2rem 1rem',
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <CheckCircle size={40} color="var(--success)" />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Message sent!</h3>
              <p style={{ margin: '0 0 1.5rem', color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
                Thanks for reaching out. We&apos;ll get back to you shortly.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="btn btn-secondary"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {status === 'error' && (
                <div className="alert alert-error">
                  <AlertCircle size={15} style={{ flexShrink: 0 }} />
                  {errorMessage}
                </div>
              )}

              {/* Honeypot field - visually hidden but available to bots */}
              <div style={{ position: 'absolute', left: '-9999px', top: '-9999px' }} aria-hidden="true">
                <label htmlFor="bot_field">Don&apos;t fill this out if you&apos;re human</label>
                <input id="bot_field" name="bot_field" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className="input"
                  placeholder="Your name"
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label htmlFor="email">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input"
                  placeholder="you@example.com"
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <div>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="input"
                  placeholder="How can we help?"
                  rows={5}
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={status === 'loading'}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.6875rem 1.25rem',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  opacity: status === 'loading' ? 0.7 : 1,
                }}
              >
                {status === 'loading' ? 'Sending…' : 'Send message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
