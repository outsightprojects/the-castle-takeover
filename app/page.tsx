'use client'

import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  const navItems = ['HOME', 'ABOUT', 'VENUE', 'TICKETS', "FAQ'S"]

  return (
    <div className="min-h-screen font-sans" style={{
      background: 'linear-gradient(180deg, #87CEEB 0%, #E8D7C6 40%, #A8E6C1 70%, #87CEEB 100%)',
    }}>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-3xl font-bold" style={{
          WebkitTextStroke: '2px #000',
          paintOrder: 'stroke fill',
          color: '#F38181',
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
              className="font-bold text-sm transition-all duration-200 px-3 py-2"
              style={{
                WebkitTextStroke: '1.5px #000',
                color: '#FFE66D',
                transform: hoveredNav === item ? 'scale(1.1) rotate(-2deg)' : 'scale(1)',
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex items-center justify-center px-8 py-12 max-w-7xl mx-auto">
        <div className="flex gap-12 items-center">
          {/* Left Image - The Flyer */}
          <div className="flex-shrink-0 w-96">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-black">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hf_20260326_204051_a3b3f6c6-2a6f-4e09-845a-7454ef0d5e34-hcN986dxg3rDEIT3LrfKUBVT36Wm5O.jpeg"
                alt="Castle Takeover - Three times fourty"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 space-y-8">
            <div>
              <p className="font-light mb-2 text-lg" style={{
                WebkitTextStroke: '0.5px #000',
                color: '#2D1B4E',
              }}>
                Three times fourty
              </p>
              <h1 className="text-5xl font-bold mb-4 leading-tight" style={{
                WebkitTextStroke: '2px #000',
                paintOrder: 'stroke fill',
                background: 'linear-gradient(135deg, #FFE66D 0%, #F38181 50%, #4ECDC4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                THE CASTLE<br />TAKEOVER
              </h1>
              <p className="text-lg font-light leading-relaxed" style={{
                WebkitTextStroke: '0.5px #000',
                color: '#2D1B4E',
              }}>
                A 40th birthday celebration for Cari, Peter & Georg with all the people they&apos;ve met throughout their lives.
              </p>
            </div>

            {/* Event Details Box */}
            <div className="border-4 border-black bg-white rounded-2xl p-6 max-w-md shadow-lg" style={{
              backgroundColor: 'rgba(255, 230, 109, 0.3)',
            }}>
              <div className="font-bold mb-2 text-lg" style={{
                WebkitTextStroke: '1px #000',
                color: '#B8368D',
              }}>
                Schloss Dornburg
              </div>
              <div className="font-light text-base" style={{
                WebkitTextStroke: '0.5px #000',
                color: '#2D1B4E',
              }}>
                28 - 30 August 2026
              </div>
            </div>

            {/* CTA Button */}
            <button className="font-bold text-xl px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-4 border-black" style={{
              backgroundColor: '#FFE66D',
              color: '#2D1B4E',
              WebkitTextStroke: '0.5px #000',
            }}>
              RESERVE NOW
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 mt-12" style={{
        color: '#2D1B4E',
      }}>
        <p className="font-light text-sm">Join us for an unforgettable time and reserve a bed in a real castle</p>
        <p className="mt-2 font-bold text-sm">thecastletakeover.de</p>
      </footer>
    </div>
  )
}
