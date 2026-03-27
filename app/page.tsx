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
    { label: 'TICKETS', href: '/tickets' },
    { label: "FAQ'S", href: '/faqs' },
  ]

  return (
    <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(180deg, #F5D6C6 0%, #FDEAE0 30%, #E8F4F8 70%, #7FD8BE 100%)' }}>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-[#2D4A3E]" style={{
          letterSpacing: '0.05em',
        }}>
          THE CASTLE TAKEOVER
        </Link>
        
        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredNav(item.label)}
              onMouseLeave={() => setHoveredNav(null)}
              className="text-[#2D4A3E] font-semibold text-sm transition-all duration-200 px-3 py-2 hover:text-[#E84B8A]"
              style={{
                transform: hoveredNav === item.label ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex items-center justify-center px-8 py-12 max-w-7xl mx-auto">
        <div className="flex gap-16 items-center">
          {/* Left Image */}
          <div className="flex-shrink-0 w-[420px]">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hf_20260326_204051_a3b3f6c6-2a6f-4e09-845a-7454ef0d5e34-hcN986dxg3rDEIT3LrfKUBVT36Wm5O.jpeg"
                alt="The Castle Takeover - 40th Birthday Celebration"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 space-y-8">
            <div>
              <p className="text-[#E84B8A] text-lg font-medium mb-2">Three times fourty</p>
              <h1 className="text-5xl font-bold text-[#2D4A3E] mb-4 leading-tight">
                THE CASTLE<br />TAKEOVER
              </h1>
              <p className="text-[#4A6B5D] text-xl font-normal leading-relaxed max-w-md">
                <span className="font-semibold text-[#E84B8A]">Cari</span>, <span className="font-semibold text-[#E84B8A]">Peter</span> & <span className="font-semibold text-[#E84B8A]">Georg</span> celebrate their 40th birthday and the people they&apos;ve met throughout their lives.
              </p>
            </div>

            {/* Event Details Box */}
            <div className="border-2 border-[#2D4A3E] bg-white/80 backdrop-blur rounded-xl p-6 max-w-sm">
              <div className="text-xl font-bold text-[#2D4A3E] mb-1">Schloss Dornburg</div>
              <div className="text-[#4A6B5D] font-medium">28 - 30 August 2026</div>
            </div>

            {/* CTA Button */}
            <button className="bg-[#FFE135] text-[#2D4A3E] font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-2 border-[#2D4A3E]">
              Reserve Now
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-[#4A6B5D] text-sm py-8">
        <p>Join us for an unforgettable time and reserve a bed in a real castle</p>
        <p className="mt-2 font-semibold">thecastletakeover.de</p>
      </footer>
    </div>
  )
}
