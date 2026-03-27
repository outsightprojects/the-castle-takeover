'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function AboutPage() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'VENUE', href: '/venue' },
    { label: 'RSVP', href: '/tickets' },
    { label: "FAQ'S", href: '/faqs' },
  ]

  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background: 'linear-gradient(180deg, #F5D6C6 0%, #FDEAE0 30%, #E8F4F8 70%, #7FD8BE 100%)',
      }}
    >
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-[#2D4A3E]" style={{ letterSpacing: '0.05em' }}>
          THE CASTLE TAKEOVER
        </Link>

        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredNav(item.label)}
              onMouseLeave={() => setHoveredNav(null)}
              className={`font-semibold text-sm transition-all duration-200 px-3 py-2 ${
                item.label === 'ABOUT' ? 'text-[#E84B8A]' : 'text-[#2D4A3E] hover:text-[#E84B8A]'
              }`}
              style={{ transform: hoveredNav === item.label ? 'scale(1.1)' : 'scale(1)' }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-8 py-12 max-w-3xl mx-auto">
        <article className="space-y-12">
          {/* Hero */}
          <section className="text-center">
            <h1 className="text-5xl font-bold text-[#2D4A3E] mb-6">About this Weekend</h1>
            <p className="text-xl text-[#4A6B5D] leading-relaxed">
              We&apos;re turning 40.<br />
              Which felt like a good enough reason to do something slightly stupid.
            </p>
            <p className="text-2xl text-[#E84B8A] font-bold mt-4">
              So yeah — we rented a fucking castle.
            </p>
          </section>

          {/* Why this exists */}
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#E84B8A] mb-4">Why this exists</h2>
            <p className="text-[#2D4A3E] text-lg leading-relaxed mb-4">
              The three of us are connected through{' '}
              <span className="font-semibold text-[#E84B8A]">Kari</span> (the glue in all of this),
              and somewhere along the way we realized:
            </p>
            <p className="text-[#4A6B5D] text-lg leading-relaxed mb-6">
              There&apos;s a group of people around us — from different phases, places, and stories —
              that we genuinely like.
            </p>
            <p className="text-[#2D4A3E] text-lg font-medium mb-2">
              So this is about bringing all of that together.
            </p>
            <p className="text-[#4A6B5D] text-lg mb-4">
              Not just a party. A full weekend of:
            </p>
            <p className="text-[#2D4A3E] text-lg font-medium">
              music, dancing, talking, swimming, not sleeping, meeting new people, reconnecting, and just vibing.
            </p>
          </section>

          {/* The energy */}
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#E84B8A] mb-4">The energy</h2>
            <p className="text-[#2D4A3E] text-lg mb-4">Keep it simple:</p>
            <ul className="space-y-2 text-[#2D4A3E] text-lg">
              <li className="flex items-center gap-3">
                <span className="text-[#E84B8A]">•</span> be open
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#E84B8A]">•</span> be kind
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#E84B8A]">•</span> don&apos;t be weird in a bad way
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#E84B8A]">•</span> respect boundaries
              </li>
              <li className="flex items-center gap-3">
                <span className="text-[#E84B8A]">•</span> connect if it feels right
              </li>
            </ul>
            <p className="text-[#4A6B5D] text-lg mt-4 italic">That&apos;s it.</p>
          </section>

          {/* Making it happen */}
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#E84B8A] mb-4">Making it happen</h2>
            <p className="text-[#2D4A3E] text-lg leading-relaxed mb-4">
              A weekend like this doesn&apos;t exist for free.
            </p>
            <p className="text-[#2D4A3E] text-lg font-medium mb-4">So everyone chips in.</p>
            <p className="text-[#4A6B5D] text-lg leading-relaxed mb-4">
              If you&apos;ve ever paid 90€ for some tiny house in Brandenburg, you&apos;ll understand:<br />
              <span className="text-[#2D4A3E] font-medium">this is a whole weekend in a castle.</span>
            </p>
            <p className="text-[#2D4A3E] text-lg">
              So it&apos;s less about paying — more about{' '}
              <span className="text-[#E84B8A] font-semibold">making it happen together.</span>
            </p>
          </section>

          {/* What's going on */}
          <section className="bg-white/70 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-[#E84B8A] mb-4">What&apos;s going on</h2>
            <p className="text-[#2D4A3E] text-lg font-medium mb-4">Saturday is the main day.</p>
            <p className="text-[#4A6B5D] text-lg leading-relaxed mb-6">
              We&apos;ll gather, have dinner, and then it goes from there:<br />
              <span className="text-[#2D4A3E]">music, dancing, chaos (the good kind).</span>
            </p>
            <div className="bg-[#E84B8A]/10 border border-[#E84B8A]/30 rounded-xl p-4">
              <p className="text-[#2D4A3E] text-lg">
                Also: <span className="font-bold">there&apos;s a pool</span>{' '}
                <span className="text-[#E84B8A]">→ bring swimwear.</span>
              </p>
            </div>
          </section>

          {/* The point */}
          <section className="text-center py-8">
            <h2 className="text-2xl font-bold text-[#E84B8A] mb-6">The point</h2>
            <p className="text-[#2D4A3E] text-xl leading-relaxed mb-4">
              People from all over our lives, in one place, for one weekend.
            </p>
            <p className="text-[#4A6B5D] text-lg mb-4">That&apos;s rare.</p>
            <p className="text-[#2D4A3E] text-xl font-semibold">Let&apos;s make it count.</p>
          </section>

          {/* CTA */}
          <section className="text-center pb-8">
            <p className="text-[#4A6B5D] text-lg mb-6">Come, be part of it.</p>
            <Link
              href="/tickets"
              className="inline-block bg-[#FFE135] text-[#2D4A3E] font-bold text-lg px-10 py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-2 border-[#2D4A3E]"
            >
              RSVP Now
            </Link>
          </section>
        </article>
      </main>

      {/* Footer */}
      <footer className="text-center text-[#4A6B5D] text-sm py-8">
        <p className="font-semibold text-[#2D4A3E]">thecastletakeover.de</p>
      </footer>
    </div>
  )
}
