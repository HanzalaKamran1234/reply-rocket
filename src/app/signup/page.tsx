import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Rocket } from "lucide-react";

export default function SignupPage() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-secondary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2.5rem 1.25rem',
      position: 'relative',
    }}>
      {/* Subtle top gradient */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '300px',
        background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(59,130,246,0.06), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%',
        maxWidth: '440px',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 700,
          fontSize: '1.125rem',
          color: 'var(--text-main)',
          textDecoration: 'none',
          marginBottom: '0.375rem',
          letterSpacing: '-0.01em',
        }}>
          <Rocket color="#3B82F6" size={22} />
          ReplyRocket
        </Link>

        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.9375rem',
          margin: '0 0 1.75rem',
        }}>
          Create your free account — no credit card needed
        </p>

        {/* Clerk SignUp card */}
        {/* Name fields enabled in: Clerk Dashboard → User & Authentication → Personal Information */}
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
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
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
                  boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
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
                  boxShadow: '0 1px 3px rgba(59,130,246,0.25)',
                  border: 'none',
                },
                footerActionLink: { color: '#3B82F6', fontWeight: '500' },
                footerActionText: { color: '#475569' },
                identityPreviewText: { color: '#0F172A' },
                formResendCodeLink: { color: '#3B82F6' },
                alertText: { color: '#0F172A' },
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

        <p style={{
          textAlign: 'center',
          marginTop: '1.375rem',
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
        }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
