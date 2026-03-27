'use client'

import { useState } from 'react'
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
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Content wrapper */}
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
                className={`font-semibold text-sm transition-all duration-200 px-3 py-2 drop-shadow-sm ${
                  item.label === 'HOME' ? 'text-[#FFE135]' : 'text-white hover:text-[#FFE135]'
                }`}
                style={{ transform: hoveredNav === item.label ? 'scale(1.1)' : 'scale(1)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex flex-1 items-center justify-center px-8 py-8">
          <div className="flex gap-12 items-center max-w-6xl">
            {/* Left - Flyer Image */}
            <div className="flex-shrink-0 w-[380px] hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-[#2D4A3E]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hf_20260326_204051_a3b3f6c6-2a6f-4e09-845a-7454ef0d5e34-hcN986dxg3rDEIT3LrfKUBVT36Wm5O.jpeg"
                  alt="The Castle Takeover - 40th Birthday Celebration"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right - Content Card (coral style like RSVP) */}
            <div className="bg-[#D4726A] rounded-3xl border-4 border-[#2D4A3E] p-8 md:p-10 max-w-lg">
              <p className="text-[#FFE135] text-lg font-medium mb-2">Three times fourty</p>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                THE CASTLE<br />TAKEOVER
              </h1>
              
              <div className="bg-white/20 rounded-xl p-4 mb-6">
                <p className="text-white text-lg leading-relaxed">
                  <span className="font-semibold text-[#FFE135]">Cari</span>,{' '}
                  <span className="font-semibold text-[#FFE135]">Peter</span> &{' '}
                  <span className="font-semibold text-[#FFE135]">Georg</span>{' '}
                  celebrate their 40th birthday and the people they&apos;ve met throughout their lives.
                </p>
              </div>

              {/* Event Details */}
              <div className="bg-white/20 rounded-xl p-4 mb-6">
                <div className="text-xl font-bold text-white mb-1">Schloss Dornburg</div>
                <div className="text-white/80 font-medium">28 - 30 August 2026</div>
              </div>

              {/* CTA Button */}
              <Link
                href="/tickets"
                className="inline-block w-full text-center bg-[#FFE135] text-[#2D4A3E] font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
              >
                Reserve Now
              </Link>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-white/60 text-sm py-6">
          <p>Join us for an unforgettable time and reserve a bed in a real castle</p>
          <p className="mt-2 font-semibold text-white/80">thecastletakeover.de</p>
        </footer>
      </div>
    </div>
  )
}
