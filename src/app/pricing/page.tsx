import Link from 'next/link'
import { Check } from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="container" style={{ padding: '4rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Simple, Transparent Pricing</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>Start generating personalized outreach messages today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Free Plan */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Free</h2>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>$0<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mo</span></div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Test the waters and see the power of AI personalization.</p>
          
          <ul style={{ listStyle: 'none', marginBottom: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check color="var(--primary)" size={18} /> 60 Messages per month</li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check color="var(--primary)" size={18} /> <strong>1 message variant per lead</strong></li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check color="var(--primary)" size={18} /> Standard AI Analysis</li>
          </ul>
          
          <Link href="/signup" className="btn btn-secondary" style={{ width: '100%' }}>Sign Up Free</Link>
        </div>

        {/* Starter Plan */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Starter</h2>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>$5<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mo</span></div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Perfect for solo SDRs and founders starting their outreach.</p>
          
          <ul style={{ listStyle: 'none', marginBottom: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check color="var(--primary)" size={18} /> 500 Messages per month</li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check color="var(--primary)" size={18} /> <strong>3 message variants per lead</strong></li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check color="var(--primary)" size={18} /> Standard AI Analysis</li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check color="var(--primary)" size={18} /> Basic Email Support</li>
          </ul>
          
          <Link href="/login" className="btn btn-secondary" style={{ width: '100%' }}>Get Started</Link>
        </div>

        {/* Pro Plan */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', border: '2px solid var(--primary)', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--primary)', color: 'white', padding: '0.25rem 1rem', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 600 }}>
            Most Popular
          </div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pro</h2>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>$9<span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/mo</span></div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>For growing teams that need volume and advanced features.</p>
          
          <ul style={{ listStyle: 'none', marginBottom: '2rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check color="var(--primary)" size={18} /> Unlimited Messages</li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check color="var(--primary)" size={18} /> <strong>4 message variants per lead</strong></li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check color="var(--primary)" size={18} /> Advanced AI Prompts</li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check color="var(--primary)" size={18} /> Export features (CSV)</li>
            <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}><Check color="var(--primary)" size={18} /> Priority Support</li>
          </ul>
          
          <Link href="/login" className="btn btn-primary" style={{ width: '100%' }}>Upgrade to Pro</Link>
        </div>

      </div>
    </div>
  )
}
