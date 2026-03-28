import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { Rocket } from 'lucide-react'

export const metadata: Metadata = {
  title: 'ReplyRocket | Hyper-personalized cold outreach messages',
  description: 'Generate hyper-personalized cold outreach messages by scraping website content instantly using AI.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { userId } = await auth()

  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: '#3B82F6',
          colorBackground: '#FFFFFF',
          colorText: '#0F172A',
          colorTextSecondary: '#475569',
          colorInputBackground: '#FFFFFF',
          colorInputText: '#0F172A',
          colorNeutral: '#0F172A',
          colorTextOnPrimaryBackground: '#FFFFFF',
          colorShimmer: 'rgba(0,0,0,0.04)',
          borderRadius: '0.5rem',
          fontFamily: 'Inter, sans-serif',
        },
        elements: {
          rootBox: { width: '100%' },
          card: {
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            borderRadius: '1rem',
          },
          headerTitle: { color: '#0F172A', fontSize: '1.5rem', fontWeight: '700' },
          headerSubtitle: { color: '#475569' },
          socialButtonsBlockButton: {
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            color: '#0F172A',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          },
          socialButtonsBlockButtonText: { color: '#0F172A', fontWeight: '500' },
          dividerLine: { background: '#E2E8F0' },
          dividerText: { color: '#94A3B8' },
          formFieldLabel: { color: '#0F172A', fontWeight: '500' },
          formFieldInput: {
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            color: '#0F172A',
            borderRadius: '0.5rem',
          },
          formFieldInputShowPasswordButton: { color: '#94A3B8' },
          formButtonPrimary: {
            background: '#3B82F6',
            color: 'white',
            fontWeight: '600',
            fontSize: '0.9375rem',
            borderRadius: '0.5rem',
            boxShadow: '0 1px 2px rgba(59,130,246,0.2)',
          },
          footerActionLink: { color: '#3B82F6' },
          footerActionText: { color: '#475569' },
          identityPreviewText: { color: '#0F172A' },
          formResendCodeLink: { color: '#3B82F6' },
          alertText: { color: '#0F172A' },
          otpCodeFieldInput: {
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            color: '#0F172A',
          },
          badge: { background: '#EFF6FF', color: '#3B82F6' },
        }
      }}
    >
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <Navbar userId={userId} />

          <main style={{ minHeight: 'calc(100vh - 3.75rem)' }}>
            {children}
          </main>

          {/* ── Footer ── */}
          <footer style={{
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-secondary)',
            padding: '2.5rem 0',
          }}>
            <div className="container footer-inner">
              {/* Brand */}
              <Link href="/" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4375rem',
                fontWeight: 700,
                fontSize: '1rem',
                color: 'var(--text-main)',
                letterSpacing: '-0.01em',
              }}>
                <Rocket color="#3B82F6" size={18} />
                ReplyRocket
              </Link>

              {/* Legal links */}
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <Link href="/terms"   style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Terms</Link>
                <Link href="/privacy" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Privacy</Link>
                <Link href="/contact" style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Contact</Link>
              </div>

              {/* Copyright */}
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                © {new Date().getFullYear()} ReplyRocket
              </p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}
