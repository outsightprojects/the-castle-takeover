'use client'

import { useState } from 'react'
import Link from 'next/link'

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
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Content */}
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
                  item.label === 'ABOUT' ? 'text-[#FFE135]' : 'text-white hover:text-[#FFE135]'
                }`}
                style={{ transform: hoveredNav === item.label ? 'scale(1.1)' : 'scale(1)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 px-8 py-12 max-w-4xl mx-auto w-full overflow-y-auto">
          <article className="space-y-16">
            {/* Intro */}
            <section className="text-center mb-12">
              <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-lg">About this Weekend</h1>
              <p className="text-2xl text-white/90 leading-relaxed">
                We&apos;re turning 40.<br />
                <span className="text-white/70">Which, honestly, feels like a pretty big deal.</span>
              </p>
            </section>

            {/* The Story */}
            <section className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <p className="text-white/90 text-lg leading-relaxed mb-6">
                The three of us know each other in different ways, but mostly through{' '}
                <span className="text-[#FFE135] font-semibold">Cari</span> — the connector.
                The common thread is simple: we like each other, we share something, and over time
                a circle formed that felt worth celebrating.
              </p>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                So we thought:<br />
                <em className="text-white">If you&apos;re going to celebrate a moment like this… why not do it properly?</em>
              </p>
              <p className="text-white/80 text-lg leading-relaxed">
                And somehow, that led to:<br />
                <span className="text-[#FFE135] font-bold text-xl">a whole weekend in a fucking castle.</span>
              </p>
              <p className="text-white/60 text-lg mt-4 italic">Ridiculous. Perfect.</p>
            </section>

            {/* What This Is About */}
            <section>
              <h2 className="text-3xl font-bold text-[#FFE135] mb-6">What this is about</h2>
              <p className="text-white/90 text-xl mb-6">
                This is not just a party.<br />
                <span className="text-white font-semibold">It&apos;s a weekend.</span>
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <p className="text-white/80 text-lg mb-4">A weekend to:</p>
                <ul className="grid grid-cols-2 gap-3 text-white/90 text-lg">
                  <li className="flex items-center gap-2"><span className="text-[#FFE135]">—</span> hang out</li>
                  <li className="flex items-center gap-2"><span className="text-[#FFE135]">—</span> dance</li>
                  <li className="flex items-center gap-2"><span className="text-[#FFE135]">—</span> talk</li>
                  <li className="flex items-center gap-2"><span className="text-[#FFE135]">—</span> meet new people</li>
                  <li className="flex items-center gap-2"><span className="text-[#FFE135]">—</span> reconnect with old ones</li>
                  <li className="flex items-center gap-2"><span className="text-[#FFE135]">—</span> stay up too late</li>
                  <li className="flex items-center gap-2"><span className="text-[#FFE135]">—</span> sleep in strange castle rooms</li>
                  <li className="flex items-center gap-2"><span className="text-[#FFE135]">—</span> sit in the sun</li>
                  <li className="flex items-center gap-2 col-span-2"><span className="text-[#FFE135]">—</span> and just… vibe</li>
                </ul>
              </div>
              <p className="text-white/80 text-lg mt-6 leading-relaxed">
                People from different phases of our lives, different places, different contexts — all coming together in one space.
              </p>
              <p className="text-white mt-4 text-lg">
                That&apos;s kind of the core idea:<br />
                <span className="text-[#FFE135] font-semibold">connection, openness, and a really good time.</span>
              </p>
            </section>

            {/* The Vibe */}
            <section>
              <h2 className="text-3xl font-bold text-[#FFE135] mb-6">The vibe</h2>
              <p className="text-white/90 text-xl mb-6">We want this to work for everyone.</p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <p className="text-white/80 text-lg mb-4">That means:</p>
                <ul className="space-y-3 text-white/90 text-lg">
                  <li className="flex items-center gap-3"><span className="text-[#FFE135]">—</span> being open-minded</li>
                  <li className="flex items-center gap-3"><span className="text-[#FFE135]">—</span> being respectful</li>
                  <li className="flex items-center gap-3"><span className="text-[#FFE135]">—</span> reading the room</li>
                  <li className="flex items-center gap-3"><span className="text-[#FFE135]">—</span> not overstepping boundaries</li>
                  <li className="flex items-center gap-3"><span className="text-[#FFE135]">—</span> giving space where needed</li>
                  <li className="flex items-center gap-3"><span className="text-[#FFE135]">—</span> and connecting where it feels right</li>
                </ul>
              </div>
              <p className="text-white/70 text-lg mt-6 italic">
                It&apos;s not complicated — just good energy and mutual respect.
              </p>
            </section>

            {/* How We Make This Happen */}
            <section>
              <h2 className="text-3xl font-bold text-[#FFE135] mb-6">How we make this happen</h2>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                A weekend like this doesn&apos;t just magically exist{' '}
                <span className="text-white/60">(even if it kind of feels like it should in a castle)</span>.
              </p>
              <p className="text-white text-xl mb-6">
                So the idea is simple:<br />
                <span className="font-semibold">we make it happen together.</span>
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-6">
                <p className="text-white/80 text-lg mb-4">That means:</p>
                <ul className="space-y-3 text-white/90 text-lg">
                  <li className="flex items-center gap-3"><span className="text-[#FFE135]">—</span> everyone contributes a bit</li>
                  <li className="flex items-center gap-3"><span className="text-[#FFE135]">—</span> everyone helps where they can</li>
                  <li className="flex items-center gap-3"><span className="text-[#FFE135]">—</span> everyone brings their energy into it</li>
                </ul>
              </div>
              <p className="text-white/80 text-lg leading-relaxed mb-4">
                And yes — there&apos;s a contribution involved.
              </p>
              <p className="text-white/70 text-lg leading-relaxed mb-4">
                But realistically:<br />
                If you&apos;ve ever booked a tiny house somewhere in Brandenburg, you know what 90€ gets you…<br />
                <span className="text-white">This is a full weekend, in a castle, with all of us.</span>
              </p>
              <p className="text-white/90 text-lg">
                So it&apos;s less about &quot;paying for something&quot; and more about:<br />
                <span className="text-[#FFE135] font-semibold">making this shared experience possible.</span>
              </p>
            </section>

            {/* What To Expect */}
            <section>
              <h2 className="text-3xl font-bold text-[#FFE135] mb-6">What to expect</h2>
              <p className="text-white text-xl mb-6">
                <span className="font-semibold">Saturday</span> will be the main day — the center of it all.
              </p>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-6">
                <ul className="space-y-3 text-white/90 text-lg">
                  <li>We&apos;ll start with a moment to gather, arrive, and set the tone together.</li>
                  <li>There will be <span className="text-[#FFE135] font-semibold">dinner</span>.</li>
                  <li>There will be <span className="text-[#FFE135] font-semibold">music</span>.</li>
                  <li>There will be <span className="text-[#FFE135] font-semibold">dancing</span>.</li>
                </ul>
                <p className="text-white/70 text-lg mt-4 italic">The rest unfolds naturally.</p>
              </div>
              <div className="bg-[#FFE135]/20 border border-[#FFE135]/40 rounded-xl p-6">
                <p className="text-white text-lg">
                  Also: <span className="font-bold">There&apos;s a pool.</span><br />
                  <span className="text-[#FFE135]">So bring swimwear.</span>
                </p>
              </div>
            </section>

            {/* Why This Matters */}
            <section>
              <h2 className="text-3xl font-bold text-[#FFE135] mb-6">Why this matters to us</h2>
              <p className="text-white/90 text-xl leading-relaxed mb-6">
                Bringing together people from all parts of our lives — that&apos;s the special part.
              </p>
              <p className="text-white/80 text-lg leading-relaxed mb-6">
                Different backgrounds, different stories, different energies — all in one place, for one weekend.
              </p>
              <p className="text-white/70 text-lg mb-4">That doesn&apos;t happen often.</p>
              <p className="text-white text-lg font-semibold">And that&apos;s why we&apos;re doing this.</p>
            </section>

            {/* The Simple Goal */}
            <section className="text-center pb-8">
              <h2 className="text-3xl font-bold text-[#FFE135] mb-8">The simple goal</h2>
              <div className="text-white text-2xl leading-relaxed space-y-2">
                <p>Have fun.</p>
                <p>Be open.</p>
                <p>Be kind.</p>
                <p>Be part of it.</p>
              </div>
              <p className="text-white/80 text-lg mt-8 leading-relaxed">
                If we get that right,<br />
                <span className="text-[#FFE135] font-semibold text-xl">this will be something pretty magical.</span>
              </p>
            </section>

            {/* CTA */}
            <section className="text-center pb-12">
              <Link
                href="/tickets"
                className="inline-block bg-[#FFE135] text-[#2D4A3E] font-bold text-lg px-10 py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-2 border-white/30"
              >
                Join Us — RSVP Now
              </Link>
            </section>
          </article>
        </main>

        {/* Footer */}
        <footer className="text-center text-white/60 text-sm py-8">
          <p className="font-semibold text-white/80">thecastletakeover.de</p>
        </footer>
      </div>
    </div>
  )
}
