// ─── RSVP Deadline State Machine ────────────────────────────────────────────
// Single source of truth for how the deadline is communicated across the site.
// Phases auto-roll over based on the current date — change DEADLINE once,
// every component reacts.
//
// Soft deadline: after the deadline, the RSVP form stays open, but we surface
// a clearer "this is past the cutoff, message Georg directly" affordance so
// catering planning isn't silently broken.

export const RSVP_DEADLINE_ISO = '2026-07-01T23:59:59+02:00' // CEST end of day
export const GEORG_WHATSAPP_NUMBER = '+491752252614' // wa.me format, no spaces
export const GEORG_WHATSAPP_DISPLAY = '+49 175 2252614'
export const GEORG_WHATSAPP_URL = `https://wa.me/${GEORG_WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}`

export type DeadlinePhase = 'info' | 'gentle' | 'last-call' | 'closed-soft'

export interface DeadlineState {
  phase: DeadlinePhase
  daysLeft: number          // negative once past deadline
  deadlineDate: Date
  deadlineLabel: string     // "1 July 2026"
  isPast: boolean
}

// Phase transitions (days before deadline):
//   > 14 days  → info       (passive: only static line + footer)
//   3–14 days  → gentle     (countdown line + sticky banner)
//   0–2 days   → last-call  (stronger banner, emphasized submit button)
//   < 0        → closed-soft (form still works, contact-Georg card prominent)
const GENTLE_AT_DAYS_LEFT = 14
const LAST_CALL_AT_DAYS_LEFT = 2

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

export function getDeadlineState(now: Date = new Date()): DeadlineState {
  const deadlineDate = new Date(RSVP_DEADLINE_ISO)
  const msPerDay = 1000 * 60 * 60 * 24
  const daysLeft = Math.ceil(
    (startOfDay(deadlineDate).getTime() - startOfDay(now).getTime()) / msPerDay
  )

  let phase: DeadlinePhase
  if (daysLeft < 0) phase = 'closed-soft'
  else if (daysLeft <= LAST_CALL_AT_DAYS_LEFT) phase = 'last-call'
  else if (daysLeft <= GENTLE_AT_DAYS_LEFT) phase = 'gentle'
  else phase = 'info'

  return {
    phase,
    daysLeft,
    deadlineDate,
    deadlineLabel: deadlineDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    isPast: daysLeft < 0,
  }
}

// ─── Copy ───────────────────────────────────────────────────────────────────
// Centralized so we can tweak tone in one place. All English (site language).

export function deadlineHeroLine(state: DeadlineState): string {
  switch (state.phase) {
    case 'info':
      return `RSVP by ${state.deadlineLabel}`
    case 'gentle':
      return `RSVP by ${state.deadlineLabel} — ${state.daysLeft} days left`
    case 'last-call':
      return state.daysLeft === 0
        ? `Last day to RSVP — until tonight`
        : state.daysLeft === 1
        ? `Last call — RSVP by tomorrow`
        : `Last call — ${state.daysLeft} days to RSVP`
    case 'closed-soft':
      return `RSVP window closed — message Georg directly`
  }
}

export function deadlineBannerCopy(state: DeadlineState): {
  text: string
  cta: string
} | null {
  switch (state.phase) {
    case 'info':
      return null // no banner — keep early weeks quiet
    case 'gentle':
      return {
        text: `RSVP closes ${state.deadlineLabel} — ${state.daysLeft} days to go.`,
        cta: 'Count me in',
      }
    case 'last-call':
      return {
        text:
          state.daysLeft <= 0
            ? `Today is the last day to RSVP.`
            : state.daysLeft === 1
            ? `Last call — RSVP closes tomorrow.`
            : `Last call — ${state.daysLeft} days until RSVP closes.`,
        cta: 'RSVP now',
      }
    case 'closed-soft':
      return {
        text: `The official RSVP window has closed — still want in? Message Georg.`,
        cta: 'Message on WhatsApp',
      }
  }
}

export function deadlineSubmitButtonCopy(state: DeadlineState): string {
  switch (state.phase) {
    case 'info':
    case 'gentle':
      return 'Count me in'
    case 'last-call':
      return `Count me in — before ${state.deadlineLabel}`
    case 'closed-soft':
      return 'Send late RSVP'
  }
}
