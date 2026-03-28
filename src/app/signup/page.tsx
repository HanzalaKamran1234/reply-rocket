import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Rocket } from "lucide-react";

export default function SignupPage() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 3.75rem)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem 1rem',
      backgroundColor: 'var(--bg-main)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Glows */}
      <div style={{
        position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%',
        maxWidth: '400px',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        {/* Header / Logo */}
        <Link href="/" style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-main)',
          textDecoration: 'none', letterSpacing: '-0.01em',
          marginBottom: '2rem',
        }}>
          <Rocket color="#3B82F6" size={24} />
          ReplyRocket
        </Link>

        <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem', letterSpacing: '-0.02em', color: 'var(--text-main)' }}>
            Create an account
          </h1>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Sign up to start generating messages
          </p>
        </div>

        <div style={{ width: '100%' }}>
          <SignUp
            routing="hash"
            signInUrl="/login"
            forceRedirectUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: { width: '100%' },
                card: {
                  width: '100%',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                  borderRadius: '1rem',
                  padding: '2rem',
                  margin: '0',
                },
                headerTitle: { display: 'none' },
                headerSubtitle: { display: 'none' },
                formFieldRow: {
                  display: 'flex',
                  gap: '0.75rem',
                },
                socialButtonsBlockButton: {
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#0F172A',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
                },
                socialButtonsBlockButtonText: { color: '#0F172A', fontWeight: '500' },
                socialButtonsBlockButtonArrow: { color: '#94A3B8' },
                dividerLine: { background: '#E2E8F0' },
                dividerText: { color: '#94A3B8' },
                formFieldLabel: { color: '#0F172A', fontWeight: '500', fontSize: '0.875rem' },
                formFieldInput: {
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#0F172A',
                  borderRadius: '0.5rem',
                  fontSize: '0.9375rem',
                },
                formFieldInputShowPasswordButton: { color: '#94A3B8' },
                formButtonPrimary: {
                  background: '#3B82F6',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '0.9375rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 1px 3px rgba(59,130,246,0.2)',
                  border: 'none',
                },
                footerActionLink: { color: '#3B82F6', fontWeight: '500' },
                footerActionText: { color: '#475569' },
                identityPreviewText: { color: '#0F172A' },
                formResendCodeLink: { color: '#3B82F6' },
                alertText: { color: '#0F172A' },
                footer: { display: 'none' },
                otpCodeFieldInput: {
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  color: '#0F172A',
                  borderRadius: '0.5rem',
                },
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
