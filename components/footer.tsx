import Link from 'next/link'
import { getDeadlineState } from '@/lib/rsvp-deadline'

export function Footer() {
  // Server-rendered — deadline-state is a daily-resolution call, so the rare
  // midnight-edge hydration drift is acceptable for a footer line.
  const deadline = getDeadlineState()
  const deadlineFooterText =
    deadline.phase === 'closed-soft'
      ? 'RSVP window closed — message Georg'
      : `RSVP by ${deadline.deadlineLabel}`

  return (
    <footer className="border-t border-c-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10 md:py-14">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="font-serif text-lg font-bold text-c-white">
              The Castle Takeover
            </p>
            <p className="text-c-dim text-sm font-mono tracking-wide mt-1">
              28.08 &ndash; 30.08.2026 &middot; Schloss Dornburg
            </p>
            <p className="text-c-dim/80 text-[10px] font-mono tracking-[0.25em] uppercase mt-2">
              {deadlineFooterText}
            </p>
          </div>

          <div className="flex gap-6">
            {[
              { label: 'Home', href: '/' },
              { label: 'About', href: '/about' },
              { label: 'Venue', href: '/venue' },
              { label: 'RSVP', href: '/tickets' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-c-dim hover:text-c-white text-sm transition-colors min-h-[44px] flex items-center"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
