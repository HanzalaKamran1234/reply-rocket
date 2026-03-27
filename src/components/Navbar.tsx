'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Rocket, Menu, X } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'

interface NavbarProps {
  userId: string | null
}

export default function Navbar({ userId }: NavbarProps) {
  const [open, setOpen] = useState(false)

  return (
    <nav
      style={{
        borderBottom: '1px solid var(--border-color)',
        background: 'rgba(11, 15, 25, 0.9)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Top bar */}
      <div
        className="container"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '4rem' }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '1.25rem', color: 'var(--text-main)' }}
          onClick={() => setOpen(false)}
        >
          <Rocket color="var(--primary)" size={24} />
          ReplyRocket
        </Link>

        {/* Desktop links */}
        <div className="nav-links">
          <Link href="/#pricing" style={{ color: 'var(--text-muted)', fontWeight: 500 }} className="btn">
            Pricing
          </Link>
          {!userId ? (
            <>
              <Link href="/login" className="btn btn-secondary">Log in</Link>
              <Link href="/signup" className="btn btn-primary">Get Started</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="btn btn-secondary">Dashboard</Link>
              <UserButton />
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="hamburger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <Link href="/#pricing" className="btn btn-secondary" onClick={() => setOpen(false)}>
          Pricing
        </Link>
        {!userId ? (
          <>
            <Link href="/login" className="btn btn-secondary" onClick={() => setOpen(false)}>Log in</Link>
            <Link href="/signup" className="btn btn-primary" onClick={() => setOpen(false)}>Get Started</Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className="btn btn-secondary" onClick={() => setOpen(false)}>Dashboard</Link>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <UserButton />
            </div>
          </>
        )}
      </div>
    </nav>
  )
}
