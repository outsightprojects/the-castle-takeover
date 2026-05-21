import { PageShell } from '@/components/page-shell'
import { Sunrise, Sun, Moon, Music2 } from 'lucide-react'

export const metadata = {
  title: 'Lineup — The Castle Takeover',
  description:
    'The DJ lineup is still being shaped. While we book it, drop your tracks into the shared playlist — that is what the DJs will draw from.',
}

interface Slot {
  time: string
  title: string
  location: string
}

interface Day {
  label: string
  date: string
  icon: typeof Sunrise
  slots: Slot[]
}

const SCHEDULE: Day[] = [
  {
    label: 'Friday',
    date: '28.08.2026',
    icon: Sunrise,
    slots: [
      { time: '18:00', title: 'Welcome drinks', location: 'Courtyard' },
      { time: '20:00', title: 'Dinner music', location: 'Courtyard' },
      { time: '22:30', title: 'Opening set', location: 'Courtyard' },
      { time: '01:00', title: 'Late set', location: 'Cellar' },
    ],
  },
  {
    label: 'Saturday',
    date: '29.08.2026',
    icon: Sun,
    slots: [
      { time: '11:00', title: 'Slow brunch', location: 'Courtyard' },
      { time: '15:00', title: 'Lake & sauna afternoon', location: 'Outdoor' },
      { time: '18:00', title: 'Aperitif hour', location: 'Courtyard' },
      { time: '20:00', title: 'Dinner', location: 'Courtyard' },
      { time: '22:30', title: 'Main set', location: 'Courtyard' },
      { time: '01:00', title: 'Cellar peak', location: 'Cellar' },
      { time: '04:00', title: 'Sunrise set', location: 'Cellar' },
    ],
  },
  {
    label: 'Sunday',
    date: '30.08.2026',
    icon: Moon,
    slots: [
      { time: '11:00', title: 'Recovery brunch', location: 'Courtyard' },
      { time: '14:00', title: 'Goodbyes', location: '—' },
    ],
  },
]

export default function LineupPage() {
  return (
    <PageShell>
      {/* Header */}
      <section className="px-6 md:px-8 pt-12 pb-12 md:pt-20 md:pb-16 max-w-3xl mx-auto text-center">
        <p className="font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase text-c-gold/80 mb-6">
          The schedule
        </p>
        <h1 className="font-serif text-5xl md:text-7xl font-bold text-c-white leading-[0.95] mb-6">
          The
          <span className="block italic text-c-gold">Lineup</span>
        </h1>
        <p className="text-c-muted text-lg leading-relaxed max-w-xl mx-auto">
          The DJ lineup is still being shaped — names and slots are coming.
          While we book it, drop your tracks into the shared playlist below.
          That&rsquo;s where the DJs will draw from.
        </p>
      </section>

      <div className="rule" />

      {/* Spotify playlist — pulled to the top so we collect requests
          before the DJ lineup is finalised. */}
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-c-gold mb-4">
            Step one
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-c-white mb-4">
            Drop your tracks
          </h2>
          <p className="text-c-muted text-sm leading-relaxed max-w-lg mx-auto">
            A shared playlist for the weekend. Add the songs you want to
            hear — chillout, peak-hour, sunrise, whatever. The DJs use it for
            inspiration; we use it to warm up.
          </p>
        </div>

        <div className="border border-c-border p-2">
          <iframe
            data-testid="embed-iframe"
            style={{ borderRadius: 12 }}
            src="https://open.spotify.com/embed/playlist/2HaleMU3pAfnBgP0Gx0V3U?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder={0}
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="The Castle Takeover — shared playlist"
          />
        </div>

        <p className="text-c-dim text-xs text-center mt-6">
          Don&rsquo;t see the playlist? Open it directly{' '}
          <a
            href="https://open.spotify.com/playlist/2HaleMU3pAfnBgP0Gx0V3U?si=77a5c842e09c41c2&pt=2745ee67ab09e31c3c98ae80e75dbe3f"
            target="_blank"
            rel="noopener noreferrer"
            className="text-c-gold hover:text-c-gold-light underline underline-offset-4"
          >
            on Spotify
          </a>
          .
        </p>
      </section>

      <div className="rule" />

      {/* Timetable */}
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-3xl mx-auto">
        <div className="space-y-14">
          {SCHEDULE.map((day, dayIdx) => {
            const Icon = day.icon
            return (
              <div key={day.label}>
                <div className="flex items-baseline gap-4 mb-6">
                  <Icon className="text-c-gold shrink-0" size={20} strokeWidth={1.5} />
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-c-white">
                    {day.label}
                  </h2>
                  <span className="font-mono text-[11px] text-c-dim tracking-[0.2em] uppercase">
                    {day.date}
                  </span>
                </div>
                <div className="space-y-0">
                  {day.slots.map((slot, i) => (
                    <div
                      key={i}
                      className={`grid grid-cols-[64px_1fr_auto] md:grid-cols-[80px_1fr_auto] gap-4 py-4 ${
                        i < day.slots.length - 1 ? 'border-b border-c-border' : ''
                      }`}
                    >
                      <span className="font-mono text-sm text-c-gold tabular-nums">
                        {slot.time}
                      </span>
                      <div className="min-w-0">
                        <p className="text-c-white font-medium text-sm">{slot.title}</p>
                        <p className="text-c-dim text-xs">{slot.location}</p>
                      </div>
                      <span className="font-mono text-[10px] text-c-dim self-start tracking-[0.2em] uppercase mt-0.5">
                        tbd
                      </span>
                    </div>
                  ))}
                </div>
                {dayIdx < SCHEDULE.length - 1 && (
                  <div className="mt-8 rule" />
                )}
              </div>
            )
          })}
        </div>

        <p className="text-c-dim text-xs italic text-center mt-12 max-w-md mx-auto">
          Times are roughly indicative. The actual flow will breathe — long
          afternoons, late-late mornings — depending on who&rsquo;s in the
          mood for what.
        </p>
      </section>

      <div className="rule" />

      {/* DJ signup CTA */}
      <section className="px-6 md:px-8 py-16 md:py-24 max-w-3xl mx-auto">
        <div className="border border-c-gold/30 p-8 md:p-12 bg-c-gold/[0.03]">
          <Music2 className="text-c-gold mb-5" size={24} strokeWidth={1.5} />
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-c-gold mb-3">
            Can you press play?
          </p>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-c-white mb-4 leading-tight">
            Tell us if you want a slot.
          </h3>
          <p className="text-c-muted text-sm leading-relaxed mb-6">
            DJs, producers, anyone with a laptop and a vision — drop us a line.
            We&rsquo;ll find you a slot that fits, whether it&rsquo;s a chill
            afternoon by the lake or a peak-hour cellar moment.
          </p>
          <a
            href="https://chat.whatsapp.com/LutHT3B7hv00hRN2z41MmC"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-c-gold text-c-black font-semibold px-8 py-3 text-sm tracking-widest uppercase hover:bg-c-gold-light active:scale-[0.98] transition-all min-h-[48px]"
          >
            Reach out via WhatsApp
          </a>
        </div>
      </section>
    </PageShell>
  )
}
