import type { Metadata } from 'next'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

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
          colorPrimary: '#4F46E5',
          colorBackground: '#111827',
          colorText: '#F3F4F6',
          colorTextSecondary: '#9CA3AF',
          colorInputBackground: '#0B0F19',
          colorInputText: '#F3F4F6',
          colorNeutral: '#F3F4F6',
          colorTextOnPrimaryBackground: '#FFFFFF',
          colorShimmer: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '0.5rem',
          fontFamily: 'Inter, sans-serif',
        },
        elements: {
          rootBox: { width: '100%' },
          card: {
            background: 'linear-gradient(135deg, rgba(17,24,39,0.95), rgba(11,15,25,0.98))',
            border: '1px solid rgba(79,70,229,0.25)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.6), 0 0 40px rgba(79,70,229,0.1)',
            borderRadius: '1rem',
            backdropFilter: 'blur(20px)',
          },
          headerTitle: { color: '#F3F4F6', fontSize: '1.75rem', fontWeight: '700' },
          headerSubtitle: { color: '#9CA3AF' },
          socialButtonsBlockButton: {
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#F3F4F6',
            borderRadius: '0.5rem',
          },
          socialButtonsBlockButtonText: { color: '#F3F4F6', fontWeight: '500' },
          socialButtonsBlockButtonArrow: { color: '#F3F4F6' },
          dividerLine: { background: 'rgba(255,255,255,0.1)' },
          dividerText: { color: '#9CA3AF' },
          formFieldLabel: { color: '#D1D5DB', fontWeight: '500' },
          formFieldInput: {
            background: '#0B0F19',
            border: '1px solid rgba(79,70,229,0.3)',
            color: '#F3F4F6',
            borderRadius: '0.5rem',
          },
          formFieldInputShowPasswordButton: { color: '#9CA3AF' },
          formButtonPrimary: {
            background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
            color: 'white',
            fontWeight: '600',
            fontSize: '1rem',
            borderRadius: '0.5rem',
            boxShadow: '0 0 20px rgba(79,70,229,0.4)',
          },
          footerActionLink: { color: '#818CF8' },
          footerActionText: { color: '#9CA3AF' },
          identityPreviewText: { color: '#F3F4F6' },
          identityPreviewEditButtonIcon: { color: '#9CA3AF' },
          formResendCodeLink: { color: '#818CF8' },
          alertText: { color: '#F3F4F6' },
          formHeaderTitle: { color: '#F3F4F6' },
          formHeaderSubtitle: { color: '#9CA3AF' },
          otpCodeFieldInput: {
            background: '#0B0F19',
            border: '1px solid rgba(79,70,229,0.3)',
            color: '#F3F4F6',
          },
          badge: { background: 'rgba(79,70,229,0.15)', color: '#818CF8' },
        }
      }}
    >
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <Navbar userId={userId} />

          <main style={{ minHeight: 'calc(100vh - 104px)' }}>
            {children}
          </main>

          <footer style={{ borderTop: '1px solid var(--border-color)', padding: '2rem 0', marginTop: 'auto', backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container footer-inner">
              <p style={{ margin: 0 }}>© {new Date().getFullYear()} ReplyRocket. All rights reserved.</p>
              <div style={{ display: 'flex', gap: '1.25rem' }}>
                <Link href="/terms" style={{ color: 'var(--text-muted)' }}>Terms</Link>
                <Link href="/privacy" style={{ color: 'var(--text-muted)' }}>Privacy</Link>
                <Link href="/contact" style={{ color: 'var(--text-muted)' }}>Contact</Link>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}
