import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Rocket } from "lucide-react";

export default function LoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top left, rgba(79,70,229,0.18) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(124,58,237,0.12) 0%, transparent 50%), #0B0F19',
      display: 'grid',
      placeItems: 'center',
      padding: '4rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative orbs */}
      <div style={{
        position: 'absolute', top: '-10rem', left: '-10rem',
        width: '40rem', height: '40rem', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10rem', right: '-10rem',
        width: '35rem', height: '35rem', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Centered content wrapper */}
      <div style={{
        width: '100%',
        maxWidth: '460px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.5rem', color: '#F3F4F6', textDecoration: 'none' }}>
            <Rocket color="#4F46E5" size={28} />
            ReplyRocket
          </Link>
          <p style={{ color: '#9CA3AF', marginTop: '0.5rem', fontSize: '0.95rem', margin: '0.5rem 0 0' }}>
            Sign in to your account
          </p>
        </div>

        {/* Clerk SignIn — width matches wrapper */}
        <div style={{ width: '100%' }}>
          <SignIn
            routing="hash"
            signUpUrl="/signup"
            appearance={{
              elements: {
                rootBox: { width: '100%' },
                card: {
                  width: '100%',
                  background: 'linear-gradient(135deg, rgba(17,24,39,0.98), rgba(11,15,25,0.99))',
                  border: '1px solid rgba(79,70,229,0.2)',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.7), 0 0 60px rgba(79,70,229,0.08)',
                  borderRadius: '1.25rem',
                  backdropFilter: 'blur(20px)',
                  padding: '2rem',
                  margin: '0',
                },
                headerTitle: { display: 'none' },
                headerSubtitle: { display: 'none' },
                socialButtonsBlockButton: {
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: '#F3F4F6',
                  borderRadius: '0.6rem',
                  fontWeight: '500',
                },
                socialButtonsBlockButtonText: { color: '#F3F4F6', fontWeight: '500' },
                socialButtonsBlockButtonArrow: { color: '#F3F4F6' },
                dividerLine: { background: 'rgba(255,255,255,0.08)' },
                dividerText: { color: '#6B7280' },
                formFieldLabel: { color: '#D1D5DB', fontWeight: '500' },
                formFieldInput: {
                  background: 'rgba(11,15,25,0.8)',
                  border: '1px solid rgba(79,70,229,0.25)',
                  color: '#F3F4F6',
                  borderRadius: '0.6rem',
                },
                formFieldInputShowPasswordButton: { color: '#9CA3AF' },
                formButtonPrimary: {
                  background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '1rem',
                  borderRadius: '0.6rem',
                  boxShadow: '0 0 25px rgba(79,70,229,0.45)',
                  border: 'none',
                },
                footerActionLink: { color: '#818CF8' },
                footerActionText: { color: '#9CA3AF' },
                identityPreviewText: { color: '#F3F4F6' },
                formResendCodeLink: { color: '#818CF8' },
                alertText: { color: '#F3F4F6' },
                otpCodeFieldInput: {
                  background: 'rgba(11,15,25,0.8)',
                  border: '1px solid rgba(79,70,229,0.25)',
                  color: '#F3F4F6',
                },
              }
            }}
          />
        </div>

        {/* Sign up prompt */}
        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#9CA3AF', fontSize: '0.9rem' }}>
          Don&apos;t have an account?{' '}
          <Link href="/signup" style={{ color: '#818CF8', fontWeight: 600, textDecoration: 'none' }}>
            Sign up free →
          </Link>
        </p>
      </div>
    </div>
  );
}
