'use client'

import Link from 'next/link'
import Image from 'next/image'
import { VideoHero } from '@/components/video-hero'
import { Countdown } from '@/components/countdown'
import {
  ArrowRight,
  Music,
  Wine,
  Users,
  Sparkles,
  Flame,
  Sun,
  TreePine,
} from 'lucide-react'

export function HomeContent({ guestName }: { guestName?: string }) {
  const isInvitation = !!guestName

  // Capitalize first letter of each word
  const displayName = guestName
    ?.split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')

  return (
    <>
      {/* ── Hero ── */}
      <VideoHero
        src="/images/hero-loop.mp4"
        poster="/images/castle-exterior.jpeg"
      >
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-c-gold/8 to-transparent z-[1]" />
        <div className="px-6 md:px-8 pt-16 pb-24 md:pt-28 md:pb-40 max-w-5xl mx-auto text-center">
          <p className="font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase text-c-gold/80 mb-8">
            28.08 &mdash; 30.08.2026 &middot; Schloss Dornburg
          </p>

          {isInvitation && (
            <p className="text-c-white/90 text-lg md:text-xl font-serif italic mb-6">
              Dear {displayName}, this is your personal invitation to
            </p>
          )}

          <h1 className="text-shimmer-gold font-serif text-[3.5rem] md:text-[7rem] lg:text-[9rem] font-bold leading-[0.95] tracking-tight mb-2">
            The Castle
          </h1>
          <h1 className="text-shimmer-gold font-serif italic text-[3.5rem] md:text-[7rem] lg:text-[9rem] font-bold leading-[0.95] tracking-tight mb-6">
            Takeover
          </h1>

          <p className="text-shimmer font-mono text-base md:text-lg tracking-[0.3em] uppercase font-bold mb-10">
            Castle. Party. Weekend.
          </p>

          <p className="text-c-white/80 text-lg md:text-xl max-w-lg mx-auto mb-12 leading-relaxed">
            {isInvitation ? (
              <>
                Three days of music, feasts &amp; friends at a baroque
                castle near Magdeburg. A lake. A sauna. Good people. Let&rsquo;s go.
              </>
            ) : (
              <>
                Cari, Peter &amp; Georg are turning 40 and renting an entire
                castle for the weekend. You&rsquo;re invited.
              </>
            )}
          </p>

          <Countdown />

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-14">
            <Link
              href="/tickets"
              className="group inline-flex items-center justify-center gap-2 bg-c-gold text-c-black font-semibold px-10 py-4 rounded-none text-sm tracking-widest uppercase hover:bg-c-gold-light active:scale-[0.98] transition-all min-h-[48px]"
            >
              {isInvitation ? "I'm In" : "I'm In"}
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 border border-c-white/20 text-c-white/80 font-semibold px-10 py-4 rounded-none text-sm tracking-widest uppercase hover:border-c-white/40 hover:text-c-white active:scale-[0.98] transition-all min-h-[48px]"
            >
              Tell Me More
            </Link>
          </div>
        </div>
      </VideoHero>

      {/* ── The Pitch ── */}
      <section className="px-6 md:px-8 py-16 md:py-28 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/castle-interior.jpeg"
              alt="Baroque chandelier and ornate ceiling inside Schloss Dornburg"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-c-black/50 via-transparent to-transparent" />
          </div>

          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-c-white leading-[1.05] mb-6">
              So here&rsquo;s the
              <span className="block italic text-c-gold">idea.</span>
            </h2>
            <div className="space-y-4 text-c-muted leading-relaxed text-[15px]">
              <p>
                We found an 18th-century baroque palace &mdash; built for
                the mother of Catherine the Great, no less &mdash; and
                we&rsquo;re taking it over for three days. The whole thing.
                Every room, every courtyard, every weird corridor.
              </p>
              <p>
                Friday evening to Sunday afternoon. Music in the
                courtyard. Feasts under chandeliers (fully plant-based,
                and genuinely great). Late-night sets in the cellar.
                There&rsquo;s a lake right next to the castle for swimming,
                a sauna to warm up in, and the grounds are huge.
              </p>
              <p>
                About 160 friends from all over. No plus-ones who don&rsquo;t
                know anyone. Everyone is connected. It&rsquo;s going to be
                one of those weekends.
              </p>
            </div>
            <div className="mt-8 pt-8 border-t border-c-border">
              <p className="text-c-white/70 text-sm">
                &mdash; Cari, Peter &amp; Georg
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Saturday Afternoon ── */}
      <div className="rule" />

      <section className="relative overflow-hidden py-24 md:py-40">
        <div className="absolute inset-0 bg-gradient-to-b from-c-surface via-c-black to-c-black" />

        <div className="relative z-10 px-6 md:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold leading-[0.9] tracking-tight">
              <span className="text-c-white">Saturday</span>
              <span className="text-c-gold italic"> Afternoon</span>
              <span className="text-c-gold">.</span>
            </h2>
            <p className="text-c-gold/60 font-mono text-xs tracking-[0.2em] uppercase mt-6">
              The bit between brunch and the evening feast
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            <div className="border border-c-gold/15 p-8 md:p-10 bg-c-gold/[0.03]">
              <TreePine size={24} className="text-c-gold mb-5" strokeWidth={1.5} />
              <h3 className="text-c-white font-semibold text-xl mb-3 tracking-tight">
                The lake
              </h3>
              <p className="text-c-muted leading-relaxed">
                Right next to the castle. Bring your swimwear &mdash;
                August in Sachsen-Anhalt can surprise you. The kind of
                afternoon dip that turns strangers into friends.
              </p>
            </div>

            <div className="border border-c-gold/15 p-8 md:p-10 bg-c-gold/[0.03]">
              <Flame size={24} className="text-c-gold mb-5" strokeWidth={1.5} />
              <h3 className="text-c-white font-semibold text-xl mb-3 tracking-tight">
                The sauna
              </h3>
              <p className="text-c-muted leading-relaxed">
                Warm up after the lake, or just because. Towels
                provided. One of those details that makes the
                weekend feel like a proper retreat.
              </p>
            </div>

            <div className="border border-c-gold/15 p-8 md:p-10 bg-c-gold/[0.03]">
              <Sun size={24} className="text-c-gold mb-5" strokeWidth={1.5} />
              <h3 className="text-c-white font-semibold text-xl mb-3 tracking-tight">
                DJ &amp; drinks
              </h3>
              <p className="text-c-muted leading-relaxed">
                Sun loungers on the grounds. Cold drinks. A DJ set
                outdoors. The slow stretch of afternoon where you
                just &hellip; exist.
              </p>
            </div>
          </div>

          <p className="text-center text-c-gold/50 text-sm italic mt-14 max-w-md mx-auto">
            And if the stars align&hellip; there might be one more surprise waiting. Stay tuned.
          </p>
        </div>
      </section>

      <div className="rule" />

      {/* ── What you get ── */}
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-5xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-c-white text-center mb-12 leading-tight">
          What you&rsquo;re signing up for
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-c-border">
          {[
            { icon: Sparkles, title: 'The whole castle', desc: 'Sleep in it, wander it, explore the towers. It\u2019s ours from Friday to Sunday.' },
            { icon: Music, title: 'Music all weekend', desc: 'Courtyard sessions, cellar sets, music and DJs all weekend long.' },
            { icon: Wine, title: 'Plant-based feasts', desc: 'All meals are vegetarian & vegan \u2014 cooked properly, not as an afterthought. Plus a well-stocked bar.' },
            { icon: TreePine, title: 'Lake & sauna', desc: 'Swim in the lake right next to the castle. Warm up in the sauna. Towels provided.' },
            { icon: Users, title: 'Good people', desc: 'Friends from Berlin, London, New York and beyond. Everyone knows someone. No awkward small talk.' },
          ].map((item) => (
            <div key={item.title} className="p-8 md:p-10 bg-c-surface">
              <item.icon className="mb-5 text-c-gold" size={24} strokeWidth={1.5} />
              <h3 className="text-c-white font-semibold text-lg mb-2 tracking-tight">{item.title}</h3>
              <p className="text-c-muted leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contribution note ── */}
      <div className="rule" />

      <section className="px-6 md:px-8 py-16 md:py-24 max-w-2xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-c-white mb-6">
          The practical bit
        </h2>
        <p className="text-c-muted leading-relaxed text-[15px] mb-6">
          We&rsquo;re asking everyone for a solidarity contribution of around
          &euro;90 to cover food, drinks, music, the venue, and the sauna.
          If you can do more, it helps someone else do less. If it&rsquo;s
          a stretch, pay what you can &mdash; zero guilt, zero questions.
          One thing: castle beds are &euro;90 per person — mostly shared
          rooms, some doubles, and we&rsquo;ll do our best to fit
          everyone&rsquo;s needs. The venue is the biggest cost and
          we need to cover it together.
        </p>
        <p className="text-c-muted leading-relaxed text-[15px]">
          RSVP takes about 2 minutes. You pick your arrival day,
          where you want to sleep, and any dietary notes. That&rsquo;s it.
        </p>
        <Link
          href="/tickets"
          className="group inline-flex items-center justify-center gap-2 bg-c-gold text-c-black font-semibold px-10 py-4 rounded-none text-sm tracking-widest uppercase hover:bg-c-gold-light active:scale-[0.98] transition-all min-h-[48px] mt-10"
        >
          RSVP
          <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </section>

      {/* ── Final CTA ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/castle-exterior.jpeg" alt="" fill className="object-cover object-top" sizes="100vw" aria-hidden="true" />
          <div className="absolute inset-0 bg-c-black/80" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-c-gold/8 to-transparent" />
        </div>

        <div className="relative z-10 px-6 md:px-8 py-20 md:py-32 text-center max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-c-white mb-4 leading-tight">
            {isInvitation
              ? <>{displayName}, see you at the castle.</>
              : <>See you at the castle.</>
            }
          </h2>
          <p className="text-c-muted text-lg mb-12 max-w-md mx-auto">
            Spots are limited. Don&rsquo;t be the one who missed it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tickets"
              className="group inline-flex items-center justify-center gap-2 bg-c-gold text-c-black font-semibold px-12 py-4 rounded-none text-sm tracking-widest uppercase hover:bg-c-gold-light active:scale-[0.98] transition-all min-h-[48px]"
            >
              I&rsquo;m In
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/venue"
              className="inline-flex items-center justify-center gap-2 border border-c-white/20 text-c-white/80 font-semibold px-12 py-4 rounded-none text-sm tracking-widest uppercase hover:border-c-white/40 hover:text-c-white active:scale-[0.98] transition-all min-h-[48px]"
            >
              See the Venue
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
