export default function ContactPage() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '600px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Contact Us</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', textAlign: 'center', marginBottom: '3rem' }}>Have questions? We'd love to hear from you.</p>

      <div className="card">
        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
            <input id="name" type="text" className="input" placeholder="Your name" required />
          </div>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address</label>
            <input id="email" type="email" className="input" placeholder="you@example.com" required />
          </div>
          <div>
            <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
            <textarea id="message" className="input" placeholder="How can we help?" rows={5} required style={{ resize: 'vertical' }}></textarea>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Send Message</button>
        </form>
      </div>
    </div>
  )
}
