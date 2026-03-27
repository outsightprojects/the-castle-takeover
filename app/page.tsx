'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'VENUE', href: '/venue' },
    { label: 'RSVP', href: '/tickets' },
    { label: "FAQ'S", href: '/faqs' },
  ]

  return (
    <div className="relative min-h-screen font-sans overflow-hidden">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/videos/background.mp4"
      />
      {/* Dark overlay so content stays readable */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* All content sits above the video */}
      <div className="relative z-20 min-h-screen flex flex-col">

      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-2xl font-bold text-white drop-shadow-md" style={{ letterSpacing: '0.05em' }}>
          THE CASTLE TAKEOVER
        </Link>

        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredNav(item.label)}
              onMouseLeave={() => setHoveredNav(null)}
              className="text-white font-semibold text-sm transition-all duration-200 px-3 py-2 hover:text-[#FFE135] drop-shadow-sm"
              style={{ transform: hoveredNav === item.label ? 'scale(1.1)' : 'scale(1)' }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-1 items-center justify-center px-8 py-12 max-w-7xl mx-auto w-full">
        <div className="flex gap-16 items-center">
          {/* Left — Flyer */}
          <div className="flex-shrink-0 w-[420px]">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/30">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hf_20260326_204051_a3b3f6c6-2a6f-4e09-845a-7454ef0d5e34-hcN986dxg3rDEIT3LrfKUBVT36Wm5O.jpeg"
                alt="The Castle Takeover - 40th Birthday Celebration"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right — Content */}
          <div className="flex-1 space-y-8">
            <div>
              <p className="text-[#FFE135] text-lg font-medium mb-2 drop-shadow">Three times fourty</p>
              <h1 className="text-5xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
                THE CASTLE<br />TAKEOVER
              </h1>
              <p className="text-white/90 text-xl font-normal leading-relaxed max-w-md drop-shadow">
                <span className="font-semibold text-[#FFE135]">Cari</span>,{' '}
                <span className="font-semibold text-[#FFE135]">Peter</span> &{' '}
                <span className="font-semibold text-[#FFE135]">Georg</span>{' '}
                celebrate their 40th birthday and the people they&apos;ve met throughout their lives.
              </p>
            </div>

            {/* Event Details Box */}
            <div className="border-2 border-white/50 bg-black/30 backdrop-blur-sm rounded-xl p-6 max-w-sm">
              <div className="text-xl font-bold text-white mb-1">Schloss Dornburg</div>
              <div className="text-white/80 font-medium">28 – 30 August 2026</div>
            </div>

            {/* CTA */}
            <Link
              href="/tickets"
              className="inline-block bg-[#FFE135] text-[#2D4A3E] font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-2 border-white/30"
            >
              Reserve Now
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-white/60 text-sm py-8">
        <p>Join us for an unforgettable time and reserve a bed in a real castle</p>
        <p className="mt-2 font-semibold text-white/80">thecastletakeover.de</p>
      </footer>

      </div>{/* end z-20 wrapper */}
    </div>
  )
}
