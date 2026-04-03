'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Venue', href: '/venue' },
  { label: 'RSVP', href: '/tickets' },
]

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="relative z-20 flex items-center justify-between px-6 py-5 md:px-8 md:py-6 max-w-7xl mx-auto w-full">
      <Link
        href="/"
        className="font-serif text-xl md:text-2xl font-bold text-c-white tracking-wide"
      >
        The Castle Takeover
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex gap-1">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-lg transition-colors duration-200 ${
              pathname === item.href
                ? 'text-c-gold bg-c-gold/10'
                : 'text-c-muted hover:text-c-white hover:bg-white/5'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden text-c-white p-2 -mr-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-c-black/98 backdrop-blur-md border-t border-c-border md:hidden">
          <div className="flex flex-col p-4 gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`font-mono text-sm tracking-widest uppercase px-4 py-3 rounded-lg transition-colors min-h-[44px] flex items-center ${
                  pathname === item.href
                    ? 'text-c-gold bg-c-gold/10'
                    : 'text-c-muted hover:text-c-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
