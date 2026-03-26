export default function TermsPage() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Terms of Service</h1>
      <div style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <section>
          <h2 style={{ color: 'var(--text-main)' }}>1. Acceptance of Terms</h2>
          <p>By accessing or using ReplyRocket, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our service.</p>
        </section>
        <section>
          <h2 style={{ color: 'var(--text-main)' }}>2. Use License</h2>
          <p>Permission is granted to temporarily use the ReplyRocket SaaS for personal or commercial outreach purposes, subject to your subscription plan limits.</p>
        </section>
        <section>
          <h2 style={{ color: 'var(--text-main)' }}>3. API Usage and Scraping</h2>
          <p>You agree to use our scraping tools responsibly. You must not use our service to scrape malicious websites or engage in denial of service attacks.</p>
        </section>
      </div>
    </div>
  )
}
