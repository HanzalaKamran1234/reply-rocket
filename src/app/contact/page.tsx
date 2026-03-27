'use client'

import { useState } from 'react'
import { sendContactMessage } from './actions'

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
    <div className="container" style={{ padding: '4rem 0', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Contact Us</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', textAlign: 'center', marginBottom: '3rem' }}>Have questions? We'd love to hear from you.</p>

      <div className="card">
        {status === 'success' ? (
          <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10B981', borderRadius: '0.5rem', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Sent!</h3>
            <p>Thanks for reaching out. We will get back to you shortly at growtoglow44@gmail.com.</p>
            <button onClick={() => setStatus('idle')} className="btn btn-secondary" style={{ marginTop: '1.5rem' }}>Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {status === 'error' && (
              <div style={{ padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#EF4444', borderRadius: '0.25rem', fontSize: '0.875rem' }}>
                {errorMessage}
              </div>
            )}
            <div>
              <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
              <input id="name" name="name" type="text" className="input" placeholder="Your name" required disabled={status === 'loading'} />
            </div>
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
              <input id="email" name="email" type="email" className="input" placeholder="you@example.com" required disabled={status === 'loading'} />
            </div>
            <div>
              <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
              <textarea id="message" name="message" className="input" placeholder="How can we help?" rows={5} required disabled={status === 'loading'} style={{ resize: 'vertical' }}></textarea>
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', opacity: status === 'loading' ? 0.7 : 1 }} disabled={status === 'loading'}>
              {status === 'loading' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
