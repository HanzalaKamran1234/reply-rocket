import Link from 'next/link'
import { ArrowRight, Bot, Target, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        padding: '6rem 0', 
        textAlign: 'center',
        background: 'radial-gradient(circle at top, rgba(79, 70, 229, 0.15), transparent 60%)'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ 
            display: 'inline-block', 
            padding: '0.25rem 0.75rem', 
            backgroundColor: 'rgba(79, 70, 229, 0.1)', 
            color: 'var(--primary)', 
            borderRadius: '999px',
            fontSize: '0.875rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            border: '1px solid rgba(79, 70, 229, 0.2)'
          }}>
            🚀 Revolutionize Your Outreach
          </div>
          <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, marginBottom: '1.5rem', backgroundImage: 'linear-gradient(to right, #fff, #9CA3AF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Personalized Cold Messages in Seconds.
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Stop sending generic templates. ReplyRocket analyzes your lead's website and uses AI to generate highly-targeted, hyper-personalized outreach messages that actually get replies.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link href="/login" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '1.125rem', gap: '0.5rem' }}>
              Start for free <ArrowRight size={20} />
            </Link>
            <Link href="#how-it-works" className="btn btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '1.125rem' }}>
              See how it works
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="how-it-works" style={{ padding: '5rem 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>How ReplyRocket Works</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>Three simple steps to generate perfect outreach.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ padding: '1rem', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '1rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <Target size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>1. Enter Lead URL</h3>
              <p>Paste the website URL of your prospect. We'll handle the rest.</p>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ padding: '1rem', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '1rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <Bot size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>2. AI Analysis</h3>
              <p>Our advanced AI scrapes and analyzes the company's value proposition and target audience.</p>
            </div>
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              <div style={{ padding: '1rem', backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: '1rem', color: 'var(--primary)', marginBottom: '1.5rem' }}>
                <Zap size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>3. Get Messages</h3>
              <p>Receive 3 distinct, highly personalized message variants ready to send.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Ready to boost your reply rates?</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginBottom: '2.5rem' }}>Join the top SDRs and Founders using AI to close more deals.</p>
          <Link href="/login" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.125rem' }}>
            Create Your Free Account
          </Link>
        </div>
      </section>
    </div>
  )
}
