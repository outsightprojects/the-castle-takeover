'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  const navItems = ['HOME', 'ABOUT', 'VENUE', 'TICKETS', "FAQ'S"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 font-sans">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-3xl font-bold text-white drop-shadow-lg" style={{
          WebkitTextStroke: '2px #000',
          paintOrder: 'stroke fill',
          letterSpacing: '0.05em',
        }}>
          THE CASTLE
        </div>
        
        <div className="flex gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onMouseEnter={() => setHoveredNav(item)}
              onMouseLeave={() => setHoveredNav(null)}
              className="text-white font-bold text-sm transition-all duration-200 px-3 py-2"
              style={{
                WebkitTextStroke: '1px #000',
                transform: hoveredNav === item ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex items-center justify-center px-8 py-20 max-w-7xl mx-auto">
        <div className="flex gap-16 items-center">
          {/* Left Image */}
          <div className="flex-shrink-0 w-96">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_qp0sxnqp0sxnqp0s.png-qbCevOjxCNwTB0RwQ7qZO6JhQhhoG8.jpeg"
                alt="Castle Takeover Birthday Bash"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 space-y-8">
            <div>
              <p className="text-white text-lg font-light mb-2 opacity-90">Celebrate</p>
              <h1 className="text-6xl font-bold text-white mb-4" style={{
                WebkitTextStroke: '2px #000',
                paintOrder: 'stroke fill',
                lineHeight: '1.2',
              }}>
                THE CASTLE<br />TAKEOVER
              </h1>
              <p className="text-white text-xl font-light leading-relaxed opacity-95">
                A 40th birthday celebration for Cari, Peter & Georg with friends and family at Schloss Dornburg.
              </p>
            </div>

            {/* Event Details Box */}
            <div className="border-3 border-black bg-white bg-opacity-20 backdrop-blur rounded-2xl p-6 text-white max-w-md">
              <div className="text-lg font-bold mb-2">Schloss Dornburg</div>
              <div className="text-base font-light">28 - 30 August 2026</div>
            </div>

            {/* CTA Button */}
            <button className="bg-yellow-300 text-black font-bold text-xl px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-3 border-black">
              RESERVE NOW
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-white text-sm py-8 opacity-75">
        <p>Join us for an unforgettable castle birthday celebration</p>
        <p className="mt-2">nosexintthepool.com</p>
      </footer>
    </div>
  )
}
