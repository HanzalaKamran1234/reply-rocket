'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PricingButtonProps {
  plan: 'free' | 'starter' | 'pro'
  label: string
  style?: React.CSSProperties
}

export default function PricingButton({ plan, label, style }: PricingButtonProps) {
  const [loading, setLoading] = useState(false)

  if (plan === 'free') {
    return (
      <Link href="/signup" style={style}>
        {label}
      </Link>
    )
  }

  const handleClick = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })

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
        display: 'block',
        width: '100%',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
        border: 'none',
        fontFamily: 'inherit',
        fontSize: '0.95rem',
      }}
    >
      {loading ? 'Redirecting…' : label}
    </button>
  )
}
