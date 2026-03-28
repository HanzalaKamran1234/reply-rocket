import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

export default function PricingPage() {
  const checkItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.625rem',
    fontSize: '0.9375rem',
    color: 'var(--text-secondary)',
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-color)' }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: '5rem 1.5rem 3.5rem',
        background: 'radial-gradient(ellipse 70% 60% at 50% -5%, rgba(59,130,246,0.07), transparent)',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
      }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.3rem',
          padding: '0.25rem 0.75rem',
          borderRadius: '999px',
          fontSize: '0.78rem',
          fontWeight: 700,
          letterSpacing: '0.07em',
          textTransform: 'uppercase',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)',
          border: '1px solid rgba(59,130,246,0.15)',
          marginBottom: '1rem',
        }}>Pricing</span>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', marginBottom: '0.875rem', letterSpacing: '-0.03em' }}>
          Simple, transparent pricing
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '460px', margin: '0 auto' }}>
          Start free, upgrade when you&apos;re ready. No hidden fees, no contracts.
        </p>
      </div>

      {/* Cards */}
      <div style={{ padding: '4rem 1.5rem 5rem' }}>
        <div className="pricing-grid">

          {/* Free */}
          <div style={{
            backgroundColor: 'var(--bg-color)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Free</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.375rem' }}>
              <span style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>$0</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/month</span>
            </div>
            <p style={{ margin: '0 0 1.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Perfect to get started</p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
              {['60 messages per month', '1 message variant per lead', 'Standard AI analysis', 'Email support'].map(f => (
                <li key={f} style={checkItemStyle}>
                  <div style={{ width: 18, height: 18, flexShrink: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-light)' }}>
                    <Check size={11} color="var(--primary)" strokeWidth={3} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/signup" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.375rem',
              padding: '0.625rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)',
              color: 'var(--text-main)',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: 'var(--shadow-xs)',
            }}>
              Sign up free <ArrowRight size={14} />
            </Link>
          </div>

          {/* Starter */}
          <div style={{
            backgroundColor: 'var(--bg-color)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: 'var(--shadow-sm)',
          }}>
            <p style={{ margin: '0 0 0.25rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Starter</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.375rem' }}>
              <span style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>$5</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/month</span>
            </div>
            <p style={{ margin: '0 0 1.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>For solo SDRs and founders</p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
              {['500 messages per month', '3 message variants per lead', 'Standard AI analysis', 'Email support', 'Copy to clipboard'].map(f => (
                <li key={f} style={checkItemStyle}>
                  <div style={{ width: 18, height: 18, flexShrink: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-light)' }}>
                    <Check size={11} color="var(--primary)" strokeWidth={3} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/login" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.375rem',
              padding: '0.625rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              background: 'var(--bg-color)',
              color: 'var(--text-main)',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: 'var(--shadow-xs)',
            }}>
              Get Started <ArrowRight size={14} />
            </Link>
          </div>

          {/* Pro */}
          <div style={{
            backgroundColor: 'var(--bg-color)',
            border: '2px solid var(--primary)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            boxShadow: '0 0 0 4px rgba(59,130,246,0.07), var(--shadow-lg)',
          }}>
            <div style={{
              position: 'absolute',
              top: '-1px', left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'var(--primary)',
              color: 'white',
              padding: '0.2rem 1rem',
              borderRadius: '0 0 8px 8px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>Most Popular</div>

            <p style={{ margin: '0.625rem 0 0.25rem', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--primary)' }}>Pro</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.375rem' }}>
              <span style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>$9</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/month</span>
            </div>
            <p style={{ margin: '0 0 1.75rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>For serious sales pros</p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
              {['Unlimited messages', '4 message variants per lead', 'Advanced AI prompts', 'Priority support', 'Copy to clipboard', 'Export history'].map(f => (
                <li key={f} style={checkItemStyle}>
                  <div style={{ width: 18, height: 18, flexShrink: 0, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-light)' }}>
                    <Check size={11} color="var(--primary)" strokeWidth={3} />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <Link href="/login" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.375rem',
              padding: '0.625rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--primary)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.9rem',
              boxShadow: '0 2px 8px rgba(59,130,246,0.3)',
              border: 'none',
            }}>
              Upgrade to Pro <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
