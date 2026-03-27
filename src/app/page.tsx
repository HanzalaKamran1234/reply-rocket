import Link from 'next/link'
import { ArrowRight, Bot, Target, Zap, Check, Sparkles } from 'lucide-react'
import PricingButton from '@/components/PricingButton'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        padding: '7rem 0 5rem', 
        textAlign: 'center',
        background: 'radial-gradient(ellipse at top, rgba(79, 70, 229, 0.18), transparent 60%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(79,70,229,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ maxWidth: '800px', position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 1rem', 
            backgroundColor: 'rgba(79, 70, 229, 0.12)', 
            color: '#818CF8', 
            borderRadius: '999px',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1.75rem',
            border: '1px solid rgba(79, 70, 229, 0.25)',
            backdropFilter: 'blur(8px)',
          }}>
            <Sparkles size={14} />
            Powered by Gemini AI
          </div>
          <h1 style={{ 
            fontSize: 'clamp(2.5rem, 6vw, 3.75rem)', 
            lineHeight: 1.1, 
            marginBottom: '1.5rem', 
            backgroundImage: 'linear-gradient(135deg, #fff 40%, rgba(156,163,175,0.7))', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.02em',
          }}>
            Personalized Cold Messages<br />in Seconds.
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#9CA3AF', marginBottom: '2.5rem', lineHeight: 1.7, maxWidth: '620px', margin: '0 auto 2.5rem' }}>
            Stop sending generic templates. ReplyRocket analyzes your lead&apos;s website and uses AI to generate highly-targeted, hyper-personalized outreach messages that actually get replies.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/signup" className="btn btn-primary" style={{ 
              padding: '0.875rem 2rem', 
              fontSize: '1.05rem', 
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
              boxShadow: '0 0 30px rgba(79,70,229,0.4)',
            }}>
              Start for Free <ArrowRight size={18} />
            </Link>
            <Link href="#how-it-works" className="btn btn-secondary" style={{ padding: '0.875rem 2rem', fontSize: '1.05rem' }}>
              See how it works
            </Link>
          </div>
          {/* Social proof */}
          <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: '#6B7280' }}>
            ✨ No credit card required · Free plan available · Setup in 60 seconds
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" style={{ padding: '6rem 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>How ReplyRocket Works</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>Three simple steps to perfect outreach.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { icon: <Target size={32} />, step: '01', title: 'Enter Lead URL', desc: "Paste the website URL of your prospect. We'll handle the rest automatically." },
              { icon: <Bot size={32} />, step: '02', title: 'AI Analysis', desc: "Our AI scrapes and deeply analyzes the company's value proposition and target audience." },
              { icon: <Zap size={32} />, step: '03', title: 'Get Messages', desc: 'Receive 3 distinct, hyper-personalized message variants ready to send immediately.' },
            ].map((item) => (
              <div key={item.step} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '2.5rem 2rem', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default' }}>
                <div style={{ 
                  fontSize: '0.7rem', 
                  fontWeight: 700, 
                  letterSpacing: '0.1em', 
                  color: '#4F46E5',
                  marginBottom: '1rem', 
                  fontFamily: 'monospace' 
                }}>STEP {item.step}</div>
                <div style={{ padding: '1rem', backgroundColor: 'rgba(79, 70, 229, 0.12)', borderRadius: '1rem', color: '#818CF8', marginBottom: '1.5rem', border: '1px solid rgba(79,70,229,0.2)' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem', color: '#F3F4F6' }}>{item.title}</h3>
                <p style={{ margin: 0, color: '#9CA3AF', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
        {/* Background glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(79,70,229,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{
              display: 'inline-block',
              padding: '0.3rem 1rem',
              backgroundColor: 'rgba(79, 70, 229, 0.1)',
              color: '#818CF8',
              borderRadius: '999px',
              fontSize: '0.8rem',
              fontWeight: 600,
              marginBottom: '1rem',
              border: '1px solid rgba(79, 70, 229, 0.2)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}>Pricing</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '1rem' }}>Simple, Transparent Pricing</h2>
            <p style={{ color: '#9CA3AF', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
              Start free, scale when you&apos;re ready. No hidden fees.
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto', alignItems: 'start' }}>
            
            {/* Free Plan */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(17,24,39,0.9), rgba(11,15,25,0.95))',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '1.25rem',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#9CA3AF', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Free</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 800, color: '#F3F4F6', lineHeight: 1 }}>$0</span>
                  <span style={{ color: '#6B7280', fontSize: '0.95rem' }}>/month</span>
                </div>
                <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: 0 }}>Perfect to get started</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', flex: 1 }}>
                {['60 messages per month', 'Standard AI analysis', 'Email support', '3 message variants per lead'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#D1D5DB', fontSize: '0.95rem' }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={11} color="#818CF8" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <PricingButton
                plan="free"
                label="Sign Up"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.875rem 1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'transparent',
                  color: '#F3F4F6',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              />
            </div>

            {/* Pro Plan — FEATURED */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(79,70,229,0.15), rgba(124,58,237,0.1))',
              border: '2px solid rgba(79,70,229,0.6)',
              borderRadius: '1.25rem',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              boxShadow: '0 0 40px rgba(79,70,229,0.2), 0 25px 50px rgba(0,0,0,0.5)',
            }}>
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: '-1px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                color: 'white',
                padding: '0.3rem 1.25rem',
                borderRadius: '0 0 0.75rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}>Most Popular</div>
              
              <div style={{ marginBottom: '1.5rem', marginTop: '0.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#818CF8', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Pro</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 800, color: '#F3F4F6', lineHeight: 1 }}>$9</span>
                  <span style={{ color: '#6B7280', fontSize: '0.95rem' }}>/month</span>
                </div>
                <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: 0 }}>For serious sales pros</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', flex: 1 }}>
                {['Unlimited messages', 'Advanced AI prompts', 'Priority support', '3 message variants per lead', 'Copy-to-clipboard', 'Export history'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#F3F4F6', fontSize: '0.95rem' }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(129,140,248,0.2)', border: '1px solid rgba(129,140,248,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={11} color="#818CF8" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <PricingButton
                plan="pro"
                label="Get Started"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.875rem 1.5rem',
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                  color: 'white',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 0 25px rgba(79,70,229,0.5)',
                }}
              />
            </div>

            {/* Starter Plan */}
            <div style={{ 
              background: 'linear-gradient(135deg, rgba(17,24,39,0.9), rgba(11,15,25,0.95))',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '1.25rem',
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
            }}>
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#9CA3AF', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Starter</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '3rem', fontWeight: 800, color: '#F3F4F6', lineHeight: 1 }}>$5</span>
                  <span style={{ color: '#6B7280', fontSize: '0.95rem' }}>/month</span>
                </div>
                <p style={{ color: '#6B7280', fontSize: '0.9rem', margin: 0 }}>For growing teams</p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', flex: 1 }}>
                {['500 messages per month', 'Standard AI analysis', 'Email support', '3 message variants per lead', 'Copy-to-clipboard'].map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#D1D5DB', fontSize: '0.95rem' }}>
                    <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(79,70,229,0.15)', border: '1px solid rgba(79,70,229,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={11} color="#818CF8" strokeWidth={3} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              <PricingButton
                plan="starter"
                label="Get Starter"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '0.875rem 1.5rem',
                  borderRadius: '0.75rem',
                  border: '1px solid rgba(255,255,255,0.12)',
                  background: 'transparent',
                  color: '#F3F4F6',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 0', textAlign: 'center', backgroundColor: 'var(--bg-secondary)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem', backgroundImage: 'linear-gradient(135deg, #F3F4F6, #9CA3AF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Ready to boost your reply rates?
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '1.1rem', marginBottom: '2.5rem' }}>
            Join thousands of SDRs and Founders using AI to close more deals.
          </p>
          <Link href="/signup" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.9rem 2.5rem',
            fontSize: '1.05rem',
            fontWeight: 700,
            borderRadius: '0.75rem',
            background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
            color: 'white',
            textDecoration: 'none',
            boxShadow: '0 0 30px rgba(79,70,229,0.4)',
            transition: 'opacity 0.2s, box-shadow 0.2s',
          }}>
            Create Your Free Account <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
