'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@clerk/nextjs'

interface PricingButtonProps {
  plan: 'free' | 'starter' | 'pro'
  label: string
  style?: React.CSSProperties
}

export default function PricingButton({ plan, label, style }: PricingButtonProps) {
  const [loading, setLoading] = useState(false)
  const { userId } = useAuth()

  if (plan === 'free') {
    return (
      <Link href="/signup" style={style}>
        {label}
      </Link>
    )
  }

  const handleClick = async () => {
    if (!userId) {
      window.location.href = '/signup'
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

      if (res.status === 401) {
        window.location.href = '/signup'
        return
      }

      const data = await res.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        alert(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      alert('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.65 : 1,
        fontFamily: 'var(--font-main)',
        fontSize: '0.9rem',
        fontWeight: 600,
        transition: 'opacity 0.15s ease',
      }}
    >
      {loading ? 'Redirecting…' : label}
    </button>
  )
}
