'use client'

// ─── Sticky RSVP-Deadline Banner ────────────────────────────────────────────
// Slim top bar. Only shows in gentle / last-call / closed-soft phases.
// Dismissable; dismissal stored in localStorage for 48h so we re-surface as
// the deadline approaches and the phase escalates.

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import {
  getDeadlineState,
  deadlineBannerCopy,
  GEORG_WHATSAPP_URL,
  type DeadlinePhase,
} from '@/lib/rsvp-deadline'

const DISMISS_KEY = 'castle-rsvp-banner-dismissed'
const DISMISS_TTL_MS = 48 * 60 * 60 * 1000 // 48h

interface DismissRecord {
  phase: DeadlinePhase
  at: number
}

function readDismiss(): DismissRecord | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(DISMISS_KEY)
    return raw ? (JSON.parse(raw) as DismissRecord) : null
  } catch {
    return null
  }
}

export function RsvpDeadlineBanner() {
  const [mounted, setMounted] = useState(false)
  const [hidden, setHidden] = useState(false)

  // Compute on the client to avoid SSR/CSR mismatch on date math.
  useEffect(() => {
    setMounted(true)
    const dismiss = readDismiss()
    const state = getDeadlineState()
    if (
      dismiss &&
      dismiss.phase === state.phase &&
      Date.now() - dismiss.at < DISMISS_TTL_MS
    ) {
      setHidden(true)
    }
  }, [])

  if (!mounted) return null

  const state = getDeadlineState()
  const copy = deadlineBannerCopy(state)
  if (!copy || hidden) return null

  const isClosed = state.phase === 'closed-soft'
  const isLastCall = state.phase === 'last-call'

  // Phase-driven styling — warmer/brighter as the date approaches.
  const containerClass = isClosed
    ? 'bg-c-surface border-b border-c-gold/40 text-c-white'
    : isLastCall
    ? 'bg-c-gold text-c-black border-b border-c-gold'
    : 'bg-c-surface border-b border-c-border text-c-white'

  const ctaClass = isClosed
    ? 'bg-[#25D366] text-white hover:bg-[#20BD5A]'
    : isLastCall
    ? 'bg-c-black text-c-gold hover:bg-c-black/90'
    : 'bg-c-gold text-c-black hover:bg-c-gold-light'

  const dismiss = () => {
    setHidden(true)
    try {
      const rec: DismissRecord = { phase: state.phase, at: Date.now() }
      window.localStorage.setItem(DISMISS_KEY, JSON.stringify(rec))
    } catch {
      /* ignore */
    }
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className={`sticky top-0 z-40 w-full ${containerClass}`}
    >
      <div className="max-w-6xl mx-auto flex items-center gap-3 px-4 md:px-8 py-2.5 text-sm">
        <span className="flex-1 leading-snug">{copy.text}</span>
        {isClosed ? (
          <a
            href={GEORG_WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`shrink-0 font-semibold uppercase tracking-widest text-[11px] px-3 py-1.5 transition-colors ${ctaClass}`}
          >
            {copy.cta}
          </a>
        ) : (
          <Link
            href="/tickets"
            className={`shrink-0 font-semibold uppercase tracking-widest text-[11px] px-3 py-1.5 transition-colors ${ctaClass}`}
          >
            {copy.cta}
          </Link>
        )}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
