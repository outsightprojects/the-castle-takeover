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
    <div className="min-h-screen font-sans flex flex-col" style={{ background: 'linear-gradient(180deg, #F5D6C6 0%, #FDEAE0 30%, #E8F4F8 70%, #7FD8BE 100%)' }}>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
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

      {/* Main content */}
      <main className="flex-1 px-8 py-12 max-w-4xl mx-auto w-full">
        <article className="space-y-16">
            {/* Intro */}
            <section className="text-center mb-12">
              <h1 className="text-5xl font-bold text-[#2D4A3E] mb-6">About this Weekend</h1>
              <p className="text-2xl text-[#4A6B5D] leading-relaxed">
                We&apos;re turning 40.<br />
                <span className="text-[#6B5B4F]">Which, honestly, feels like a pretty big deal.</span>
              </p>
            </section>

            {/* The Story */}
            <section className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40">
              <p className="text-[#2D4A3E]/90 text-lg leading-relaxed mb-6">
                The three of us know each other in different ways, but mostly through{' '}
                <span className="text-[#E84B8A] font-semibold">Cari</span> — the connector.
                The common thread is simple: we like each other, we share something, and over time
                a circle formed that felt worth celebrating.
              </p>
              <p className="text-[#4A6B5D] text-lg leading-relaxed mb-6">
                So we thought:<br />
                <em className="text-[#2D4A3E]">If you&apos;re going to celebrate a moment like this… why not do it properly?</em>
              </p>
              <p className="text-[#4A6B5D] text-lg leading-relaxed">
                And somehow, that led to:<br />
                <span className="text-[#E84B8A] font-bold text-xl">a whole weekend in a fucking castle.</span>
              </p>
              <p className="text-[#6B5B4F] text-lg mt-4 italic">Ridiculous. Perfect.</p>
            </section>

            {/* What This Is About */}
            <section>
              <h2 className="text-3xl font-bold text-[#E84B8A] mb-6">What this is about</h2>
              <p className="text-[#2D4A3E] text-xl mb-6">
                This is not just a party.<br />
                <span className="font-semibold">It&apos;s a weekend.</span>
              </p>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40">
                <p className="text-[#4A6B5D] text-lg mb-4">A weekend to:</p>
                <ul className="grid grid-cols-2 gap-3 text-[#2D4A3E] text-lg">
                  <li className="flex items-center gap-2"><span className="text-[#E84B8A]">—</span> hang out</li>
                  <li className="flex items-center gap-2"><span className="text-[#E84B8A]">—</span> dance</li>
                  <li className="flex items-center gap-2"><span className="text-[#E84B8A]">—</span> talk</li>
                  <li className="flex items-center gap-2"><span className="text-[#E84B8A]">—</span> meet new people</li>
                  <li className="flex items-center gap-2"><span className="text-[#E84B8A]">—</span> reconnect with old ones</li>
                  <li className="flex items-center gap-2"><span className="text-[#E84B8A]">—</span> stay up too late</li>
                  <li className="flex items-center gap-2"><span className="text-[#E84B8A]">—</span> sleep in strange castle rooms</li>
                  <li className="flex items-center gap-2"><span className="text-[#E84B8A]">—</span> sit in the sun</li>
                  <li className="flex items-center gap-2 col-span-2"><span className="text-[#E84B8A]">—</span> and just… vibe</li>
                </ul>
              </div>
              <p className="text-[#4A6B5D] text-lg mt-6 leading-relaxed">
                People from different phases of our lives, different places, different contexts — all coming together in one space.
              </p>
              <p className="text-[#2D4A3E] text-lg mt-4">
                That&apos;s kind of the core idea:<br />
                <span className="text-[#E84B8A] font-semibold">connection, openness, and a really good time.</span>
              </p>
            </section>

            {/* The Vibe */}
            <section>
              <h2 className="text-3xl font-bold text-[#E84B8A] mb-6">The vibe</h2>
              <p className="text-[#2D4A3E] text-xl mb-6">We want this to work for everyone.</p>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40">
                <p className="text-[#4A6B5D] text-lg mb-4">That means:</p>
                <ul className="space-y-3 text-[#2D4A3E] text-lg">
                  <li className="flex items-center gap-3"><span className="text-[#E84B8A]">—</span> being open-minded</li>
                  <li className="flex items-center gap-3"><span className="text-[#E84B8A]">—</span> being respectful</li>
                  <li className="flex items-center gap-3"><span className="text-[#E84B8A]">—</span> reading the room</li>
                  <li className="flex items-center gap-3"><span className="text-[#E84B8A]">—</span> not overstepping boundaries</li>
                  <li className="flex items-center gap-3"><span className="text-[#E84B8A]">—</span> giving space where needed</li>
                  <li className="flex items-center gap-3"><span className="text-[#E84B8A]">—</span> and connecting where it feels right</li>
                </ul>
              </div>
              <p className="text-[#6B5B4F] text-lg mt-6 italic">
                It&apos;s not complicated — just good energy and mutual respect.
              </p>
            </section>

            {/* How We Make This Happen */}
            <section>
              <h2 className="text-3xl font-bold text-[#E84B8A] mb-6">How we make this happen</h2>
              <p className="text-[#4A6B5D] text-lg leading-relaxed mb-6">
                A weekend like this doesn&apos;t just magically exist{' '}
                <span className="text-[#6B5B4F]">(even if it kind of feels like it should in a castle)</span>.
              </p>
              <p className="text-[#2D4A3E] text-xl mb-6">
                So the idea is simple:<br />
                <span className="font-semibold">we make it happen together.</span>
              </p>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40 mb-6">
                <p className="text-[#4A6B5D] text-lg mb-4">That means:</p>
                <ul className="space-y-3 text-[#2D4A3E] text-lg">
                  <li className="flex items-center gap-3"><span className="text-[#E84B8A]">—</span> everyone contributes a bit</li>
                  <li className="flex items-center gap-3"><span className="text-[#E84B8A]">—</span> everyone helps where they can</li>
                  <li className="flex items-center gap-3"><span className="text-[#E84B8A]">—</span> everyone brings their energy into it</li>
                </ul>
              </div>
              <p className="text-[#4A6B5D] text-lg leading-relaxed mb-4">
                And yes — there&apos;s a contribution involved.
              </p>
              <p className="text-[#6B5B4F] text-lg leading-relaxed mb-4">
                But realistically:<br />
                If you&apos;ve ever booked a tiny house somewhere in Brandenburg, you know what 90€ gets you…<br />
                <span className="text-[#2D4A3E]">This is a full weekend, in a castle, with all of us.</span>
              </p>
              <p className="text-[#2D4A3E] text-lg">
                So it&apos;s less about &quot;paying for something&quot; and more about:<br />
                <span className="text-[#E84B8A] font-semibold">making this shared experience possible.</span>
              </p>
            </section>

            {/* What To Expect */}
            <section>
              <h2 className="text-3xl font-bold text-[#E84B8A] mb-6">What to expect</h2>
              <p className="text-[#2D4A3E] text-xl mb-6">
                <span className="font-semibold">Saturday</span> will be the main day — the center of it all.
              </p>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/40 mb-6">
                <ul className="space-y-3 text-[#2D4A3E] text-lg">
                  <li>We&apos;ll start with a moment to gather, arrive, and set the tone together.</li>
                  <li>There will be <span className="text-[#E84B8A] font-semibold">dinner</span>.</li>
                  <li>There will be <span className="text-[#E84B8A] font-semibold">music</span>.</li>
                  <li>There will be <span className="text-[#E84B8A] font-semibold">dancing</span>.</li>
                </ul>
                <p className="text-[#6B5B4F] text-lg mt-4 italic">The rest unfolds naturally.</p>
              </div>
              <div className="bg-[#E84B8A]/20 border border-[#E84B8A]/40 rounded-xl p-6">
                <p className="text-[#2D4A3E] text-lg">
                  Also: <span className="font-bold">There&apos;s a pool.</span><br />
                  <span className="text-[#E84B8A]">So bring swimwear.</span>
                </p>
              </div>
            </section>

            {/* Why This Matters */}
            <section>
              <h2 className="text-3xl font-bold text-[#E84B8A] mb-6">Why this matters to us</h2>
              <p className="text-[#2D4A3E] text-xl leading-relaxed mb-6">
                Bringing together people from all parts of our lives — that&apos;s the special part.
              </p>
              <p className="text-[#4A6B5D] text-lg leading-relaxed mb-6">
                Different backgrounds, different stories, different energies — all in one place, for one weekend.
              </p>
              <p className="text-[#6B5B4F] text-lg mb-4">That doesn&apos;t happen often.</p>
              <p className="text-[#2D4A3E] text-lg font-semibold">And that&apos;s why we&apos;re doing this.</p>
            </section>

            {/* The Simple Goal */}
            <section className="text-center pb-8">
              <h2 className="text-3xl font-bold text-[#E84B8A] mb-8">The simple goal</h2>
              <div className="text-[#2D4A3E] text-2xl leading-relaxed space-y-2">
                <p>Have fun.</p>
                <p>Be open.</p>
                <p>Be kind.</p>
                <p>Be part of it.</p>
              </div>
              <p className="text-[#4A6B5D] text-lg mt-8 leading-relaxed">
                If we get that right,<br />
                <span className="text-[#E84B8A] font-semibold text-xl">this will be something pretty magical.</span>
              </p>
            </section>

            {/* CTA */}
            <section className="text-center pb-12">
              <Link
                href="/tickets"
                className="inline-block bg-[#FFE135] text-[#2D4A3E] font-bold text-lg px-10 py-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-2 border-[#2D4A3E]"
              >
                Join Us — RSVP Now
              </Link>
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
        </article>
      </main>

      {/* Footer */}
      <footer className="text-center text-[#4A6B5D] text-sm py-8">
        <p className="font-semibold text-[#2D4A3E]">thecastletakeover.de</p>
      </footer>
    </div>
  )
}
