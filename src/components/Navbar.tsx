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
    <nav className="navbar">
      {/* Top bar */}
      <div className="container navbar-inner">
        {/* Logo */}
        <Link
          href="/"
          className="logo-link"
          onClick={() => setOpen(false)}
        >
          <Rocket color="#3B82F6" size={22} />
          ReplyRocket
        </Link>

        {/* Desktop links */}
        <div className="nav-links">
          <Link href="/#how-it-works" className="nav-link">How it works</Link>
          <Link href="/#pricing" className="nav-link">Pricing</Link>

          {!userId ? (
            <>
              <Link href="/login" className="btn btn-ghost" style={{ marginLeft: '0.25rem' }}>Log in</Link>
              <Link href="/signup" className="btn btn-primary" style={{ marginLeft: '0.25rem' }}>Get Started</Link>
            </>
          ) : (
            <>
              <Link href="/dashboard" className="btn btn-secondary" style={{ marginLeft: '0.25rem' }}>Dashboard</Link>
              <div style={{ marginLeft: '0.5rem' }}>
                <UserButton />
              </div>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="hamburger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-menu${open ? ' open' : ''}`}>
        <Link href="/#how-it-works" className="btn btn-ghost" onClick={() => setOpen(false)}>How it works</Link>
        <Link href="/#pricing" className="btn btn-ghost" onClick={() => setOpen(false)}>Pricing</Link>
        {!userId ? (
          <>
            <Link href="/login" className="btn btn-secondary" onClick={() => setOpen(false)}>Log in</Link>
            <Link href="/signup" className="btn btn-primary" onClick={() => setOpen(false)}>Get Started</Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className="btn btn-secondary" onClick={() => setOpen(false)}>Dashboard</Link>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '0.25rem' }}>
              <UserButton />
            </div>
          </>
        )}
      </div>
    </nav>
  )
}
