import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { seoTools } from '@/data/seo-tools'
import FreeToolForm from '@/components/FreeToolForm'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

// 1. Generate Static Params for blazing fast build-time pages
export async function generateStaticParams() {
  return seoTools.map((tool) => ({
    slug: tool.slug,
  }))
}

// 2. Dynamic SEO Metadata Generation
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const tool = seoTools.find((t) => t.slug === slug)

  if (!tool) return {}

  return {
    title: tool.title,
    description: tool.metaDescription,
    alternates: {
      canonical: `https://replyrocket.io/tools/${slug}`,
    },
    openGraph: {
      title: tool.title,
      description: tool.metaDescription,
      url: `https://replyrocket.io/tools/${slug}`,
      type: 'website',
    },
  }
}

// 3. Main Page Component
export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const tool = seoTools.find((t) => t.slug === slug)

  if (!tool) {
    notFound()
  }

  // Schema Markup (Software Application & FAQ)
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': tool.title,
    'operatingSystem': 'WebBrowser',
    'applicationCategory': 'BusinessApplication',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': tool.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh' }}>
      {/* Inject Schema.org JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main>
        {/* HERO SECTION */}
        <section style={{
          padding: '5rem 1.5rem 3rem',
          textAlign: 'center',
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Breadcrumbs */}
            <nav style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
              <Link href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--primary)' }}>Tools</span>
              <span>/</span>
              <span>{tool.h1}</span>
            </nav>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', color: 'var(--text-main)', marginBottom: '1rem', letterSpacing: '-0.03em', lineHeight: 1.1 }}>
              {tool.h1}
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', margin: '0 auto 2rem', maxWidth: '600px', lineHeight: 1.6 }}>
              {tool.h2}
            </p>
          </div>
        </section>

        {/* TOOL & CONTENT SECTION */}
        <section style={{ padding: '4rem 1.5rem' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            
            {/* Left Column: Form & Output */}
            <div style={{ position: 'sticky', top: '2rem' }}>
              <FreeToolForm inputPlaceholder={tool.inputPlaceholder} buttonText={tool.buttonText} />
            </div>

            {/* Right Column: SEO Content, Value Prop, FAQs */}
            <div>
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem' }}>About this tool</h3>
                <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {tool.content}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {['Saves hours of writing', 'Hyper-personalized templates', '100% free to try'].map(benefit => (
                    <li key={benefit} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-main)', fontSize: '0.95rem' }}>
                      <CheckCircle2 size={16} color="var(--primary)" /> {benefit}
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQs */}
              <div style={{ marginBottom: '3rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1.5rem' }}>Frequently Asked Questions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {tool.faqs.map((faq, idx) => (
                    <div key={idx}>
                      <h4 style={{ fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>{faq.question}</h4>
                      <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Tools Interlinking (Crucial for SEO Indexing) */}
              {tool.relatedTools && tool.relatedTools.length > 0 && (
                <div style={{ padding: '1.5rem', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1rem' }}>Related Free Tools</h4>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {tool.relatedTools.map(slug => {
                      const related = seoTools.find(t => t.slug === slug)
                      if (!related) return null
                      return (
                        <li key={slug}>
                          <Link href={`/tools/${slug}`} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--primary)', fontSize: '0.9rem', textDecoration: 'none' }}>
                            {related.h1} <ArrowRight size={12} />
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>

          </div>
        </section>

      </main>
    </div>
  )
}
