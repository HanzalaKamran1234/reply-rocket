import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { Rocket } from "lucide-react";

export default function SignupPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top right, rgba(124,58,237,0.18) 0%, transparent 50%), radial-gradient(ellipse at bottom left, rgba(79,70,229,0.12) 0%, transparent 50%), #0B0F19',
      display: 'grid',
      placeItems: 'center',
      padding: '3rem 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative orbs */}
      <div style={{
        position: 'absolute', top: '-10rem', right: '-10rem',
        width: '40rem', height: '40rem', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-10rem', left: '-10rem',
        width: '35rem', height: '35rem', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Centered content column */}
      <div style={{
        width: '100%',
        maxWidth: '460px',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        {/* Logo — centred */}
        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 700,
          fontSize: '1.5rem',
          color: '#F3F4F6',
          textDecoration: 'none',
          marginBottom: '0.5rem',
        }}>
          <Rocket color="#4F46E5" size={28} />
          ReplyRocket
        </Link>

        <p style={{
          color: '#9CA3AF',
          fontSize: '0.95rem',
          margin: '0 0 2rem',
        }}>
          Create your free account — no credit card needed
        </p>

        {/* Clerk SignUp — full width of wrapper */}
        {/* First name & last name are enabled in: Clerk Dashboard → User & Authentication → Personal Information */}
        <div style={{ width: '100%' }}>
          <SignUp
            routing="hash"
            signInUrl="/login"
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
                  padding: '2.25rem',
                  margin: '0',
                },
                headerTitle: { display: 'none' },
                headerSubtitle: { display: 'none' },
                /* Name fields — shown when enabled in Clerk dashboard */
                formFieldRow: {
                  display: 'flex',
                  gap: '0.75rem',
                },
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

        {/* Outside-card sign-in prompt — centred */}
        <p style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          color: '#9CA3AF',
          fontSize: '0.9rem',
        }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#818CF8', fontWeight: 600, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
