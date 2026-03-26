import type { Metadata } from 'next'
import './globals.css'
import Link from 'next/link'
import { Rocket } from 'lucide-react'
import { ClerkProvider, UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'

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
          colorInputBackground: '#0B0F19',
          colorInputText: '#F3F4F6',
        },
        elements: {
          card: 'card', 
          formButtonPrimary: 'btn btn-primary',
          formFieldInput: 'input',
          headerTitle: { color: '#F3F4F6' },
          headerSubtitle: { color: '#9CA3AF' }
        }
      }}
    >
      <html lang="en">
        <body>
          <nav style={{ 
            borderBottom: '1px solid var(--border-color)', 
            background: 'rgba(11, 15, 25, 0.8)',
            backdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 50
          }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}>
              <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-main)' }}>
                <Rocket color="var(--primary)" size={24} />
                ReplyRocket
              </Link>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link href="/pricing" style={{ color: 'var(--text-muted)', fontWeight: 500, transition: 'color 0.2s' }} className="btn">
                  Pricing
                </Link>
                {!userId ? (
                  <>
                    <Link href="/login" className="btn btn-secondary">
                      Log in
                    </Link>
                    <Link href="/signup" className="btn btn-primary">
                      Get Started
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/dashboard" className="btn btn-secondary">
                      Dashboard
                    </Link>
                    <UserButton />
                  </>
                )}
              </div>
            </div>
          </nav>

          <main style={{ minHeight: 'calc(100vh - 104px)' }}>
            {children}
          </main>

          <footer style={{ borderTop: '1px solid var(--border-color)', padding: '2rem 0', marginTop: 'auto', backgroundColor: 'var(--bg-secondary)' }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <p>&copy; {new Date().getFullYear()} ReplyRocket. All rights reserved.</p>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/terms">Terms</Link>
                <Link href="/privacy">Privacy</Link>
                <Link href="/contact">Contact</Link>
              </div>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  )
}
