import Link from 'next/link'
import { ArrowRight, Bot, Target, Zap, Check, Sparkles, ChevronRight } from 'lucide-react'
import PricingButton from '@/components/PricingButton'

/* ─── Inline styles shared across sections ─── */
const featureCardStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-color)',
  border: '1px solid var(--border-color)',
  borderRadius: 'var(--radius-xl)',
  padding: '2rem 1.75rem',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: 'var(--shadow-sm)',
  transition: 'box-shadow 0.2s ease, transform 0.2s ease',
}

const checkItemStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.625rem',
  fontSize: '0.9375rem',
  color: 'var(--text-secondary)',
}

export default function Home() {
  return (
    <div>

      {/* ═══ HERO ═══════════════════════════════════════════════════ */}
      <section style={{
        padding: '6rem 0 5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--bg-color)',
      }}>
        {/* Soft top gradient wash */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '420px',
          background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(59,130,246,0.09), transparent)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ maxWidth: '780px', position: 'relative', zIndex: 1 }}>
          {/* Eyebrow badge */}
          <div style={{ marginBottom: '1.5rem' }}>
            <span className="badge badge-blue">
              <Sparkles size={12} />
              Powered by Gemini AI
            </span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5.5vw, 3.75rem)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--text-main)',
            marginBottom: '1.375rem',
          }}>
            Cold outreach that<br />
            <span style={{ color: 'var(--primary)' }}>actually gets replies</span>
          </h1>

          {/* Sub-headline */}
          <p style={{
            fontSize: '1.175rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            maxWidth: '560px',
            margin: '0 auto 2.25rem',
          }}>
            Stop sending generic templates. ReplyRocket analyzes your lead&apos;s website and uses AI to write hyper-personalized messages in seconds.
          </p>

          {/* CTA buttons */}
          <div className="hero-buttons" style={{ marginBottom: '1.875rem' }}>
            <Link href="/signup" className="btn btn-primary" style={{
              padding: '0.75rem 1.75rem',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '0.625rem',
              gap: '0.5rem',
            }}>
              Start for Free <ArrowRight size={16} />
            </Link>
            <Link href="#how-it-works" className="btn btn-secondary" style={{
              padding: '0.75rem 1.75rem',
              fontSize: '1rem',
              borderRadius: '0.625rem',
            }}>
              See how it works
            </Link>
          </div>

          {/* Social proof micro-copy */}
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
            No credit card required · Free plan available · Setup in 60 seconds
          </p>
        </div>
      </section>

      {/* Social proof strip */}
      <div style={{
        borderTop: '1px solid var(--border-color)',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--bg-secondary)',
        padding: '1rem 0',
        textAlign: 'center',
      }}>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', letterSpacing: '0.02em' }}>
          Trusted by SDRs and founders growing their pipeline faster with AI
        </p>
      </div>

      {/* ═══ HOW IT WORKS ════════════════════════════════════════════ */}
      <section id="how-it-works" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <div style={{ marginBottom: '0.875rem' }}>
              <span className="badge badge-blue">How it works</span>
            </div>
            <h2>Three steps to perfect outreach</h2>
            <p>From URL to personalized message in under 10 seconds.</p>
          </div>

          <div className="features-grid">
            {[
              {
                icon: <Target size={22} />,
                step: '01',
                title: 'Paste the lead URL',
                desc: "Drop in your prospect's website URL. ReplyRocket fetches and reads the page content automatically.",
              },
              {
                icon: <Bot size={22} />,
                step: '02',
                title: 'AI analyzes the site',
                desc: "Gemini AI deeply understands the company's value proposition, niche, and audience.",
              },
              {
                icon: <Zap size={22} />,
                step: '03',
                title: 'Get your messages',
                desc: 'Receive 1–4 unique, hyper-personalized message variants (based on your plan) ready to copy and send.',
              },
            ].map((item) => (
              <div key={item.step} style={featureCardStyle}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  color: 'var(--primary)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  fontFamily: 'monospace',
                }}>
                  {item.step}
                </div>
                <div style={{
                  width: '2.75rem',
                  height: '2.75rem',
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--primary-light)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  marginBottom: '1.25rem',
                }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{item.title}</h3>
                <p style={{ margin: 0, fontSize: '0.9375rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═════════════════════════════════════════════════ */}
      <section id="pricing" className="section">
        <div className="container">
          <div className="section-header">
            <div style={{ marginBottom: '0.875rem' }}>
              <span className="badge badge-blue">Pricing</span>
            </div>
            <h2>Simple, transparent pricing</h2>
            <p>Start free, upgrade when you need more power. No hidden fees.</p>
          </div>

          <div className="pricing-grid">

            {/* ── Free ── */}
            <div style={{
              ...featureCardStyle,
              padding: '2rem',
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{
                  margin: '0 0 0.25rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}>Free</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.375rem' }}>
                  <span style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>$0</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/month</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Perfect to get started</p>
              </div>

              <ul style={{ listStyle: 'none', margin: '0 0 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, padding: 0 }}>
                {[
                  '60 messages per month',
                  '1 message variant per lead',
                  'Standard AI analysis',
                  'Email support',
                ].map(f => (
                  <li key={f} style={checkItemStyle}>
                    <div style={{
                      width: '18px', height: '18px', flexShrink: 0,
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: 'var(--primary-light)',
                    }}>
                      <Check size={11} color="var(--primary)" strokeWidth={3} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <PricingButton
                plan="free"
                label="Sign up free"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  padding: '0.625rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-color)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-xs)',
                }}
              />
            </div>

            {/* ── Starter ── */}
            <div style={{
              ...featureCardStyle,
              padding: '2rem',
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{
                  margin: '0 0 0.25rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                }}>Starter</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.375rem' }}>
                  <span style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>$5</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/month</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>For solo SDRs and founders</p>
              </div>

              <ul style={{ listStyle: 'none', margin: '0 0 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, padding: 0 }}>
                {[
                  '500 messages per month',
                  '3 message variants per lead',
                  'Standard AI analysis',
                  'Email support',
                  'Copy to clipboard',
                ].map(f => (
                  <li key={f} style={checkItemStyle}>
                    <div style={{
                      width: '18px', height: '18px', flexShrink: 0,
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: 'var(--primary-light)',
                    }}>
                      <Check size={11} color="var(--primary)" strokeWidth={3} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <PricingButton
                plan="starter"
                label="Get Starter"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  padding: '0.625rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-color)',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-xs)',
                }}
              />
            </div>

            {/* ── Pro (featured) ── */}
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
              {/* Most popular badge */}
              <div style={{
                position: 'absolute',
                top: '-1px',
                left: '50%',
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

              <div style={{ marginBottom: '1.5rem', marginTop: '0.625rem' }}>
                <p style={{
                  margin: '0 0 0.25rem',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--primary)',
                }}>Pro</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.375rem' }}>
                  <span style={{ fontSize: '2.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1 }}>$9</span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/month</span>
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>For serious sales pros</p>
              </div>

              <ul style={{ listStyle: 'none', margin: '0 0 1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, padding: 0 }}>
                {[
                  'Unlimited messages',
                  '4 message variants per lead',
                  'Advanced AI prompts',
                  'Priority support',
                  'Copy to clipboard',
                  'Export history',
                ].map(f => (
                  <li key={f} style={checkItemStyle}>
                    <div style={{
                      width: '18px', height: '18px', flexShrink: 0,
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      backgroundColor: 'var(--primary-light)',
                    }}>
                      <Check size={11} color="var(--primary)" strokeWidth={3} />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>

              <PricingButton
                plan="pro"
                label="Get Started"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  padding: '0.625rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary)',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(59,130,246,0.3)',
                  border: 'none',
                }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* ═══ CTA STRIP ═══════════════════════════════════════════════ */}
      <section style={{
        padding: '5rem 0',
        textAlign: 'center',
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
      }}>
        <div className="container" style={{ maxWidth: '580px' }}>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
            marginBottom: '0.875rem',
            letterSpacing: '-0.02em',
          }}>
            Ready to boost your reply rates?
          </h2>
          <p style={{ fontSize: '1.05rem', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
            Join thousands of SDRs and founders using AI to close more deals — for free.
          </p>
          <Link href="/signup" className="btn btn-primary" style={{
            padding: '0.75rem 2rem',
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: '0.625rem',
            gap: '0.5rem',
            display: 'inline-flex',
          }}>
            Create Your Free Account <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </div>
  )
}
