import Link from 'next/link';

export default function TermsPage() {
  const lastUpdated = "March 28, 2026";
  
  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', padding: '6rem 1rem' }}>
      <div className="container" style={{ maxWidth: '800px', backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: '1rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Terms of Service</h1>
        <p style={{ color: '#64748B', marginBottom: '3rem', fontSize: '0.95rem' }}>Last updated: {lastUpdated}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', color: '#334155', lineHeight: 1.7 }}>
          
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>1. Acceptance of Terms</h2>
            <p>By accessing or using ReplyRocket (the "Service"), provided by ReplyRocket AI ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>2. Description of Service</h2>
            <p>ReplyRocket provides AI-powered tools to generate personalized outreach messages by analyzing website content. We reserve the right to modify, suspend, or discontinue any aspect of the Service at any time without notice.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>3. Subscription and Billing</h2>
            <p>Some parts of the Service are billed on a subscription basis ("Subscription(s)"). You will be billed in advance on a recurring and periodic basis ("Billing Cycle"). Billing cycles are set on a monthly or annual basis, depending on the type of subscription plan you select when purchasing a Subscription.</p>
            <p style={{ marginTop: '0.5rem' }}>Payments are processed securely through Stripe. By providing payment information, you represent and warrant that you have the legal right to use the payment method provided.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>4. AI Content Disclaimer</h2>
            <p>ReplyRocket uses artificial intelligence (AI) to generate content. While we strive for accuracy, the AI may occasionally produce incorrect, biased, or inappropriate content. You are solely responsible for reviewing and verifying all AI-generated content before using it in any capacity. We do not guarantee the accuracy, completeness, or usefulness of any generated content.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>5. User Responsibilities</h2>
            <p>You agree not to use the Service for any unlawful purpose or to solicit others to perform or participate in any unlawful acts. You are prohibited from using the Service to scrape data in a way that exceeds your plan limits or harms target websites' availability.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>6. Limitation of Liability</h2>
            <p>In no event shall ReplyRocket, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>7. Governing Law</h2>
            <p>These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which the company is registered, without regard to its conflict of law provisions.</p>
          </section>

          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#F8FAFC', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
            <p style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>Questions about our Terms?</p>
            <p>If you have any questions, please contact us at <a href="mailto:support@replyrocket.ai" style={{ color: '#3B82F6', textDecoration: 'none', fontWeight: 500 }}>support@replyrocket.ai</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
