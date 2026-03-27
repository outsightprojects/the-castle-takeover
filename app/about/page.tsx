'use client'

import Link from 'next/link'
import { useState } from 'react'

// Castle Takeover - About Page v2
export default function AboutPage() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const [activeSection, setActiveSection] = useState('intro')

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'VENUE', href: '/venue' },
    { label: 'RSVP', href: '/tickets' },
  ]

  const sections = [
    { id: 'intro', label: 'Intro' },
    { id: 'why', label: 'Why' },
    { id: 'energy', label: 'The Vibe' },
    { id: 'contribution', label: 'Contribution' },
    { id: 'program', label: 'Program' },
    { id: 'goal', label: 'The Goal' },
  ]

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen font-sans relative overflow-hidden">
      {/* Wavy blue-gray background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: '#6B7B8E',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23596775' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating decorative elements */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div className="absolute top-[8%] right-[10%] w-28 h-28 rounded-full bg-[#E84B8A]/15 animate-bounce" style={{ animationDuration: '5s' }} />
        <div className="absolute top-[45%] left-[5%] w-20 h-20 rounded-full bg-[#FFE135]/15 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
        <div className="absolute bottom-[20%] right-[15%] w-16 h-16 rounded-full bg-[#4ECDC4]/15 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
        
        <div className="absolute top-[25%] left-[12%] w-3 h-3 rounded-full bg-[#FFE135] animate-ping" style={{ animationDuration: '2.5s' }} />
        <div className="absolute bottom-[35%] left-[8%] w-2 h-2 rounded-full bg-[#E84B8A] animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }} />
        <div className="absolute top-[60%] right-[8%] w-3 h-3 rounded-full bg-white/60 animate-ping" style={{ animationDuration: '2.2s', animationDelay: '1s' }} />
        
        <svg className="absolute top-[12%] left-[20%] w-6 h-6 text-[#FFE135] animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7-6-4.6h7.6z"/>
        </svg>
        <svg className="absolute bottom-[15%] right-[25%] w-5 h-5 text-[#E84B8A] animate-spin" style={{ animationDuration: '8s', animationDelay: '2s' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7L12 16.4 5.7 21l2.3-7-6-4.6h7.6z"/>
        </svg>
      </div>

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
                  item.label === 'ABOUT' ? 'text-[#FFE135]' : 'text-white hover:text-[#FFE135]'
                }`}
                style={{ transform: hoveredNav === item.label ? 'scale(1.1)' : 'scale(1)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 px-8 py-8 max-w-4xl mx-auto w-full">
          <div className="bg-[#D4726A] rounded-3xl border-4 border-[#2D4A3E] p-8 shadow-2xl relative">
            {/* Decorative dots on card */}
            <div className="absolute -top-3 left-8 w-6 h-6 rounded-full bg-[#FFE135] border-2 border-[#2D4A3E]" />
            <div className="absolute -top-2 left-20 w-4 h-4 rounded-full bg-[#4ECDC4] border-2 border-[#2D4A3E]" />
            <div className="absolute -bottom-3 right-12 w-5 h-5 rounded-full bg-[#E84B8A] border-2 border-[#2D4A3E]" />
            
            <h1 className="text-4xl font-bold text-white mb-2">About this Weekend</h1>
            <p className="text-white/80 mb-6">Everything you need to know</p>
            
            {/* Section navigation */}
            <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-white/20">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeSection === section.id
                      ? 'bg-[#FFE135] text-[#2D4A3E]'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Scrollable content */}
            <div className="space-y-8 max-h-[55vh] overflow-y-auto pr-2">
              <section id="intro" className="bg-white/20 rounded-2xl p-6">
                <p className="text-white text-lg leading-relaxed mb-4">
                  We&apos;re turning 40. Which felt like a good enough reason to do something slightly stupid.
                </p>
                <p className="text-[#FFE135] text-2xl font-bold">
                  So yeah — we rented a fucking castle.
                </p>
              </section>

              <section id="why" className="bg-white/20 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-[#FFE135] mb-4">Why this exists</h2>
                <p className="text-white text-lg leading-relaxed mb-4">
                  The three of us are connected through <span className="font-semibold text-[#FFE135]">Kari</span> (the glue in all of this), and somewhere along the way we realized:
                </p>
                <p className="text-white/80 text-lg leading-relaxed mb-4">
                  There&apos;s a group of people around us — from different phases, places, and stories — that we genuinely like.
                </p>
                <p className="text-white text-lg font-medium mb-2">
                  So this is about bringing all of that together.
                </p>
                <p className="text-white/80 text-lg mb-2">Not just a party. A full weekend of:</p>
                <p className="text-white text-lg">
                  music, dancing, talking, swimming, not sleeping, meeting new people, reconnecting, and just vibing.
                </p>
              </section>

              <section id="energy" className="bg-white/20 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-[#FFE135] mb-4">The vibe</h2>
                <p className="text-white text-lg mb-4">Keep it simple:</p>
                <ul className="space-y-2 text-white text-lg">
                  <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#FFE135]" /> be open</li>
                  <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E84B8A]" /> be kind</li>
                  <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#4ECDC4]" /> don&apos;t be weird in a bad way</li>
                  <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#FFE135]" /> respect boundaries</li>
                  <li className="flex items-center gap-3"><span className="w-2 h-2 rounded-full bg-[#E84B8A]" /> connect if it feels right</li>
                </ul>
                <p className="text-white/70 text-lg mt-4 italic">That&apos;s it.</p>
              </section>

              <section id="contribution" className="bg-white/20 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-[#FFE135] mb-4">Making it happen</h2>
                <p className="text-white text-lg leading-relaxed mb-4">
                  A weekend like this doesn&apos;t exist for free. <span className="font-semibold">So everyone chips in.</span>
                </p>
                <p className="text-white/80 text-lg leading-relaxed mb-4">
                  If you&apos;ve ever paid 90 Euro for some tiny house in Brandenburg, you&apos;ll understand: <span className="text-white font-medium">this is a whole weekend in a castle.</span>
                </p>
                <p className="text-white text-lg">
                  So it&apos;s less about paying — more about <span className="text-[#FFE135] font-semibold">making it happen together.</span>
                </p>
              </section>

              <section id="program" className="bg-white/20 rounded-2xl p-6">
                <h2 className="text-2xl font-bold text-[#FFE135] mb-4">What&apos;s going on</h2>
                <p className="text-white text-lg font-medium mb-4">Saturday is the main day.</p>
                <p className="text-white/80 text-lg leading-relaxed mb-4">
                  We&apos;ll gather, have dinner, and then it goes from there: <span className="text-white">music, dancing, chaos (the good kind).</span>
                </p>
                <div className="bg-[#FFE135]/20 border border-[#FFE135]/40 rounded-xl p-4">
                  <p className="text-white text-lg">
                    Also: <span className="font-bold">there&apos;s a pool</span> <span className="text-[#FFE135]">— bring swimwear.</span>
                  </p>
                </div>
              </section>

              <section id="goal" className="bg-white/20 rounded-2xl p-6 text-center">
                <h2 className="text-2xl font-bold text-[#FFE135] mb-4">The point</h2>
                <p className="text-white text-xl leading-relaxed mb-4">
                  People from all over our lives, in one place, for one weekend.
                </p>
                <p className="text-white/70 text-lg mb-4">That&apos;s rare.</p>
                <p className="text-white text-xl font-semibold">Let&apos;s make it count.</p>
              </section>

              {/* CTA */}
              <div className="text-center pt-4 pb-2">
                <p className="text-white/80 text-lg mb-4">Come, be part of it.</p>
                <Link
                  href="/tickets"
                  className="inline-block bg-[#FFE135] text-[#2D4A3E] font-bold text-lg px-10 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                >
                  RSVP Now
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-white/60 text-sm py-6">
          <p className="font-semibold text-white/80">thecastletakeover.de</p>
        </footer>
      </div>
    </div>
  )
}
