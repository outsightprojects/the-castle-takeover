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
  ]

  return (
    <div className="min-h-screen font-sans relative overflow-hidden">
      {/* Wavy blue-gray background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: '#6B7B8E',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%235a6a7a' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto w-full">
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
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center max-w-5xl">
            {/* Left - Flyer Image */}
            <div className="flex-shrink-0 w-[300px] md:w-[360px]">
              <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-[#2D4A3E]">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hf_20260326_204051_a3b3f6c6-2a6f-4e09-845a-7454ef0d5e34-hcN986dxg3rDEIT3LrfKUBVT36Wm5O.jpeg"
                  alt="The Castle Takeover - 40th Birthday Celebration"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Right - Content Card (coral style like RSVP) */}
            <div className="bg-[#D4726A] rounded-3xl border-4 border-[#2D4A3E] p-8 md:p-10 max-w-lg shadow-2xl">
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
