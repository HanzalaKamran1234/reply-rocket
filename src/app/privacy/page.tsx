import Link from 'next/link';

export default function PrivacyPage() {
  const lastUpdated = "March 28, 2026";

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', padding: '6rem 1rem' }}>
      <div className="container" style={{ maxWidth: '800px', backgroundColor: '#FFFFFF', padding: '3rem', borderRadius: '1rem', border: '1px solid #E2E8F0', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', letterSpacing: '-0.02em' }}>Privacy Policy</h1>
        <p style={{ color: '#64748B', marginBottom: '3rem', fontSize: '0.95rem' }}>Last updated: {lastUpdated}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', color: '#334155', lineHeight: 1.7 }}>
          
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>1. Introduction</h2>
            <p>Welcome to ReplyRocket. We respect your privacy and are committed to protecting your personal data. This Privacy Policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>2. Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Identity Data:</strong> Includes first name, last name, and username provided via Clerk.</li>
              <li><strong>Contact Data:</strong> Includes email address.</li>
              <li><strong>Financial Data:</strong> Handled securely by Stripe (we do not store your full credit card details).</li>
              <li><strong>Usage Data:</strong> Includes information about how you use our website, products, and services, including URLs submitted for analysis.</li>
              <li><strong>AI Input Data:</strong> Content scraped from URLs you provide to generate personalized messages.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>3. How We Use Your Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>To register you as a new customer and manage your account via Clerk.</li>
              <li>To process and deliver your subscription including managing payments via Stripe.</li>
              <li>To provide the core AI message generation service using the Gemini API.</li>
              <li>To improve our website, products/services, marketing, and customer relationships.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>4. Third-Party Services</h2>
            <p>We use several third-party services to operate ReplyRocket. These services have their own privacy policies:</p>
            <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><strong>Clerk:</strong> For authentication and user management.</li>
              <li><strong>Stripe:</strong> For payment processing and subscription management.</li>
              <li><strong>Google (Gemini AI):</strong> To process analyzed website content and generate outreach messages.</li>
              <li><strong>Supabase:</strong> To store your generation history and account metadata.</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>5. Data Security</h2>
            <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.</p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>6. Data Retention</h2>
            <p>We will only retain your personal data for as long as reasonably necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting requirements.</p>
          </section>

          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: '#F8FAFC', borderRadius: '0.75rem', border: '1px solid #E2E8F0' }}>
            <p style={{ fontWeight: 600, color: '#0F172A', marginBottom: '0.5rem' }}>Privacy Concerns?</p>
            <p>If you have any questions about this Privacy Policy or our privacy practices, please contact us at <a href="mailto:privacy@replyrocket.ai" style={{ color: '#3B82F6', textDecoration: 'none', fontWeight: 500 }}>privacy@replyrocket.ai</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
