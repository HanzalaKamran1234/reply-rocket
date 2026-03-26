export default function PrivacyPage() {
  return (
    <div className="container" style={{ padding: '4rem 0', maxWidth: '800px' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Privacy Policy</h1>
      <div style={{ color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <p>Last updated: {new Date().toLocaleDateString()}</p>
        <section>
          <h2 style={{ color: 'var(--text-main)' }}>1. Information We Collect</h2>
          <p>We collect information you provide directly to us (such as email and password for account creation), as well as usage data related to the URLs you analyze and messages generated.</p>
        </section>
        <section>
          <h2 style={{ color: 'var(--text-main)' }}>2. How We Use Information</h2>
          <p>We use the information we collect to provide, maintain, and improve our services, including processing payments via Stripe and generating AI content via Gemini API.</p>
        </section>
        <section>
          <h2 style={{ color: 'var(--text-main)' }}>3. Data Sharing</h2>
          <p>We do not sell or rent your personal information to third parties. We share your data only with specific service providers (Supabase, Stripe, Google) necessary to operate our service.</p>
        </section>
      </div>
    </div>
  )
}
