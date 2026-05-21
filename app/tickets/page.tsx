'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PageShell } from '@/components/page-shell'

// ─── Types ────────────────────────────────────────────────────────────────
interface VenueStatus {
  name: string
  price: number
  total: number | null
  taken: number
  available: number | null
}

interface HostStats {
  castle_quota: number
  castle_used: number
  castle_available: number
  castle_full: boolean
  doubles_quota: number
  doubles_used: number
  doubles_available: number
  doubles_full: boolean
}

interface BedData {
  venues: VenueStatus[]
  castle?: { total: number; taken: number; available: number }
  village?: { total: number; taken: number; available: number }
  hosts?: Record<string, HostStats>
}

interface SubmitResult {
  eventFee: number
  bedFee: number
  total: number
  venue: string
}

// ─── Constants ────────────────────────────────────────────────────────────
// Quelle of Truth: Notion Event-Konfiguration. Bei Preisänderung dort UND
// hier UND in rsvp-route.ts synchron halten.
const EVENT_FEE_MIN = 100
const EVENT_FEE_MAX = 300
const EVENT_FEE_STEP = 5

const FALLBACK_PRICES: Record<string, number> = {
  castle: 90,
  gelbeshaus: 75,
  schlosskrug: 50,
  deichgraf: 123,
  camping: 0,
  self: 0,
}

// Bett-Typ sub-options pro Pension (B+a+i Variante).
// 'double-shared' = halbes Doppelbett, geteilt mit einem anderen Gast.
// 'single' = eigenes Einzelbett (nur Gelbes Haus 5er-Zimmer).
type BedTypeKey = 'double-shared' | 'single'

interface BedTypeOption {
  key: BedTypeKey
  apiName: string // wird so an Notion-Property "Bett-Typ" geschrieben
  label: string
  desc: string
}

const ACCOMMODATION_OPTIONS: Array<{
  key: string
  apiName: string
  label: string
  desc: string
  hasCapacity: boolean
  bedTypes?: BedTypeOption[] // wenn gesetzt → Sub-Auswahl in Step 4 nach Pension-Klick
  bedTypesNote?: string // Erklärtext über der Sub-Auswahl
}> = [
  {
    key: 'castle',
    apiName: 'Castle',
    label: 'Castle',
    desc: 'Inside the castle — mix of room types',
    hasCapacity: true,
  },
  {
    key: 'gelbeshaus',
    apiName: 'Gelbes Haus',
    label: 'Gelbes Haus',
    desc: 'Village house, 5 min from castle',
    hasCapacity: true,
    bedTypesNote:
      'Gelbes Haus has two rooms: a 5-person room with two double beds and one single bed, plus a double room with one double bed. Pick what you want.',
    bedTypes: [
      {
        key: 'double-shared',
        apiName: 'Doppelbett-Slot',
        label: 'Half of a shared double bed',
        desc: "You'll share a double bed with one other guest (couple, friend, or we'll match you).",
      },
      {
        key: 'single',
        apiName: 'Einzelbett',
        label: 'Single bed (in the 5-person room)',
        desc: 'Your own single bed inside the shared 5-person room. Only one of these in the whole house.',
      },
    ],
  },
  {
    key: 'schlosskrug',
    apiName: 'Schlosskrug',
    label: 'Schlosskrug',
    desc: 'Village inn, 5 min from castle',
    hasCapacity: true,
    bedTypesNote:
      'Two double rooms, each with one double bed. By picking a bed here, you book half of a shared double bed in a double room.',
    bedTypes: [
      {
        key: 'double-shared',
        apiName: 'Doppelbett-Slot',
        label: 'Half of a shared double bed, in a double room',
        desc: "You'll share a double bed with one other guest (couple, friend, or we'll match you).",
      },
    ],
  },
  {
    key: 'deichgraf',
    apiName: 'Deichgraf',
    label: 'Deichgraf Elbpension',
    desc: 'Premium pension, 5 min from castle',
    hasCapacity: true,
    bedTypesNote:
      'Two double rooms, each with one double bed. By picking a bed here, you book half of a shared double bed in a double room.',
    bedTypes: [
      {
        key: 'double-shared',
        apiName: 'Doppelbett-Slot',
        label: 'Half of a shared double bed, in a double room',
        desc: "You'll share a double bed with one other guest (couple, friend, or we'll match you).",
      },
    ],
  },
  { key: 'camping', apiName: 'Camping', label: 'Camping', desc: 'Tent or camper on the grounds', hasCapacity: false },
  { key: 'self', apiName: 'Self-Provided', label: 'Self-arranged', desc: 'Hotel, Airbnb — your call', hasCapacity: false },
]

// Calendar event details (Schloss Dornburg, 28-30 Aug 2026)
const CALENDAR_TITLE = 'The Castle Takeover — Schloss Dornburg'
const CALENDAR_START = '20260828T140000'
const CALENDAR_END = '20260830T140000'
const CALENDAR_LOCATION = 'Schloss Dornburg, Lindenweg 1, 39264 Gommern, Germany'
const CALENDAR_DESC = "Peter, Cari & Georg's joint birthday weekend. Castle. Party. Weekend. thecastletakeover.de"

const PAYPAL_POOL_URL = 'https://www.paypal.com/pool/9nZT9mha8K?sr=wccr'
const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/LutHT3B7hv00hRN2z41MmC'

export default function RSVPPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null)
  const [beds, setBeds] = useState<BedData | null>(null)

  const [formData, setFormData] = useState({
    attendance: '',
    invitedBy: '',
    arrivalDay: '',
    stayDuration: '',
    accommodationPreference: '',
    bedTypePreference: '', // 'double-shared' | 'single' | '' (Pensionen only)
    transportMode: '',
    needsShuttle: false,
    eventFee: EVENT_FEE_MIN,
    name: '',
    email: '',
    phone: '',
    dietaryRestrictions: '',
    skills: '',
    notes: '',
    willingToHelp: false,
  })

  useEffect(() => {
    fetch('/api/beds')
      .then((res) => res.json())
      .then((data) => setBeds(data))
      .catch(() => setBeds({ venues: [] }))
  }, [])

  const venueByApiName = (apiName: string): VenueStatus | undefined =>
    beds?.venues.find((v) => v.name === apiName)

  const isDayOnly = formData.stayDuration === 'day-only'

  // Steps: 1=attendance, 2=host, 3=arrival+stay, 4=accommodation+transport, 5=cost review, 6=contact
  // Day-only skips step 4 (accommodation)
  const stepSequence = isDayOnly ? [1, 2, 3, 5, 6] : [1, 2, 3, 4, 5, 6]
  const totalSteps = stepSequence.length
  const currentStepIndex = stepSequence.indexOf(step)
  const displayStep = currentStepIndex + 1

  // Live cost calc — finaler Wert kommt von der API zurück
  const selectedVenueOption = ACCOMMODATION_OPTIONS.find(
    (o) => o.key === formData.accommodationPreference
  )
  const computedBedFee =
    isDayOnly || !selectedVenueOption
      ? 0
      : venueByApiName(selectedVenueOption.apiName)?.price ??
        FALLBACK_PRICES[selectedVenueOption.key] ??
        0
  // Event fee ist jetzt variabel: min 100, max 300. Werte aus formData kommen
  // direkt vom Slider in Step 5.
  const computedEventFee = Math.max(
    EVENT_FEE_MIN,
    Math.min(EVENT_FEE_MAX, formData.eventFee || EVENT_FEE_MIN)
  )
  const computedTotal = computedEventFee + computedBedFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Something went wrong')
      }

      const data: SubmitResult & { success: boolean } = await res.json()
      setSubmitResult({
        eventFee: data.eventFee,
        bedFee: data.bedFee,
        total: data.total,
        venue: data.venue,
      })
      setIsSubmitted(true)
      window.scrollTo({ top: 0 })
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1: return formData.attendance !== ''
      case 2: return formData.invitedBy !== ''
      case 3: return formData.arrivalDay !== '' && formData.stayDuration !== ''
      case 4: {
        if (formData.accommodationPreference === '') return false
        // Pensionen mit mehr als einer Bett-Variante (aktuell nur Gelbes Haus)
        // brauchen eine explizite Bett-Typ-Wahl.
        const opt = ACCOMMODATION_OPTIONS.find((o) => o.key === formData.accommodationPreference)
        if (opt?.bedTypes && opt.bedTypes.length > 1) {
          return formData.bedTypePreference !== ''
        }
        return true
      }
      case 5: return true // cost review is read-only
      case 6: return formData.name !== '' && formData.email !== ''
      default: return false
    }
  }

  const goNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < stepSequence.length) setStep(stepSequence[nextIndex])
  }

  const goBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) setStep(stepSequence[prevIndex])
  }

  const optionClass = (selected: boolean, disabled = false) =>
    disabled
      ? 'opacity-30 cursor-not-allowed bg-c-surface border border-c-border'
      : selected
      ? 'bg-c-gold text-c-black border border-c-gold cursor-pointer'
      : 'bg-c-surface text-c-white border border-c-border cursor-pointer hover:border-c-muted'

  // Calendar URLs
  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(CALENDAR_TITLE)}&dates=${CALENDAR_START}/${CALENDAR_END}&location=${encodeURIComponent(CALENDAR_LOCATION)}&details=${encodeURIComponent(CALENDAR_DESC)}`

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${CALENDAR_START}`,
    `DTEND:${CALENDAR_END}`,
    `SUMMARY:${CALENDAR_TITLE}`,
    `LOCATION:${CALENDAR_LOCATION}`,
    `DESCRIPTION:${CALENDAR_DESC}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n')

  const icsBlob =
    typeof window !== 'undefined'
      ? URL.createObjectURL(new Blob([icsContent], { type: 'text/calendar' }))
      : '#'

  // ─── Success Screen ────────────────────────────────────────────────────
  if (isSubmitted && submitResult) {
    return (
      <PageShell>
        <div className="flex flex-col items-center justify-center px-6 md:px-8 py-16 md:py-24">
          <div className="border border-c-border p-8 md:p-12 max-w-xl w-full text-center">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-c-gold mb-4">
              Confirmed
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-c-white mb-4">
              You&apos;re in.
            </h2>
            <p className="text-c-muted text-lg mb-8">
              Thank you, {formData.name}. See you at Schloss Dornburg.
            </p>

            {formData.willingToHelp && (
              <p className="text-c-gold text-sm mb-6">
                Thanks for offering to help — we&apos;ll reach out closer to the event.
              </p>
            )}

            {/* WhatsApp group */}
            <a
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-semibold py-4 text-sm tracking-wide hover:bg-[#20BD5A] active:scale-[0.98] transition-all min-h-[48px] mb-6"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Join the WhatsApp Group
            </a>

            {/* Calendar */}
            <div className="bg-c-surface border border-c-border p-6">
              <p className="text-c-white font-medium text-sm mb-4">Save the date</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={googleCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-c-border text-c-muted font-mono text-xs tracking-widest uppercase px-5 py-3 hover:text-c-white hover:border-c-white/20 transition-colors min-h-[48px]"
                >
                  Google Calendar
                </a>
                <a
                  href={icsBlob}
                  download="castle-takeover.ics"
                  className="inline-flex items-center justify-center gap-2 border border-c-border text-c-muted font-mono text-xs tracking-widest uppercase px-5 py-3 hover:text-c-white hover:border-c-white/20 transition-colors min-h-[48px]"
                >
                  Apple Calendar
                </a>
              </div>
              <p className="text-c-dim text-xs mt-3">
                28 Aug (Fri) 14:00 &ndash; 30 Aug (Sun) 14:00
              </p>
            </div>

            {/* Cost breakdown + payment */}
            <div className="bg-c-surface border border-c-border p-6 mt-4">
              <p className="text-c-muted text-sm mb-4">Your contribution</p>

              <div className="space-y-2 text-left text-sm mb-5">
                <div className="flex justify-between text-c-muted">
                  <span>Event fee</span>
                  <span className="font-mono tabular-nums">&euro;{submitResult.eventFee}</span>
                </div>
                {submitResult.bedFee > 0 && (
                  <div className="flex justify-between text-c-muted">
                    <span>Bed &middot; {submitResult.venue}</span>
                    <span className="font-mono tabular-nums">&euro;{submitResult.bedFee}</span>
                  </div>
                )}
                <div className="border-t border-c-border pt-2 flex justify-between text-c-white font-medium">
                  <span>Total</span>
                  <span className="font-serif text-2xl text-c-gold tabular-nums">
                    &euro;{submitResult.total}
                  </span>
                </div>
              </div>

              <div className="border-t border-c-border pt-6">
                <p className="text-c-white font-medium text-sm mb-4">
                  Send to the PayPal Money Pool
                </p>
                <div className="bg-white rounded p-3 inline-block mb-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(PAYPAL_POOL_URL)}`}
                    alt="PayPal Money Pool QR Code"
                    width={160}
                    height={160}
                    className="w-40 h-40"
                  />
                </div>
                <p className="text-c-muted text-sm mb-2">Scan the QR code or tap below</p>
                <a
                  href={PAYPAL_POOL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-c-gold text-c-black font-semibold px-6 py-3 text-sm tracking-widest uppercase hover:bg-c-gold-light active:scale-[0.98] transition-all min-h-[48px]"
                >
                  Open PayPal Pool
                </a>
                <p className="text-c-dim text-xs mt-4">
                  Include your name in the payment note so we can match it up.
                </p>
                {submitResult.bedFee === 0 && submitResult.venue !== 'Noch offen' && (
                  <p className="text-c-muted text-xs mt-3">
                    {submitResult.venue === 'Camping'
                      ? "Camping is free — only the event fee applies."
                      : "No bed cost — only the event fee applies."}
                  </p>
                )}
              </div>
            </div>

            {/* Share */}
            <div className="bg-c-surface border border-c-border p-4 mt-4">
              <p className="text-c-muted text-sm">Want to invite a friend?</p>
              <p className="text-c-gold font-mono text-sm mt-1">thecastletakeover.de</p>
            </div>

            <Link
              href="/"
              className="inline-block mt-8 bg-c-gold text-c-black font-semibold px-8 py-3 text-sm tracking-widest uppercase hover:bg-c-gold-light active:scale-[0.98] transition-all min-h-[48px]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </PageShell>
    )
  }

  // ─── Form ──────────────────────────────────────────────────────────────
  return (
    <PageShell>
      <div className="px-6 md:px-8 py-12 md:py-20 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-c-gold mb-4">
            Join Us
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-c-white leading-tight mb-3">
            RSVP
          </h1>
          <p className="text-c-muted">
            Not just a party — a shared weekend with friends old and new.
          </p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {stepSequence.map((_, i) => (
            <div
              key={i}
              className={`h-0.5 rounded-full transition-all ${
                i === currentStepIndex
                  ? 'w-8 bg-c-gold'
                  : i < currentStepIndex
                  ? 'w-4 bg-c-gold/40'
                  : 'w-4 bg-c-border'
              }`}
            />
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="border border-c-border p-6 md:p-10 min-h-[420px] flex flex-col">

            {/* ─── Step 1: Attendance ────────────────────────── */}
            {step === 1 && (
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-c-white mb-1 tracking-tight">
                  Are you joining us?
                </h2>
                <p className="text-c-dim text-sm mb-8 font-mono tracking-wide">
                  28.08 &ndash; 30.08.2026 &middot; Schloss Dornburg
                </p>
                <div className="space-y-3">
                  {[
                    { value: 'yes', label: 'Yes, definitely' },
                    { value: 'likely', label: 'Most likely' },
                    { value: 'maybe', label: 'Not sure yet' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`block p-4 transition-all min-h-[48px] ${optionClass(formData.attendance === option.value)}`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value={option.value}
                        checked={formData.attendance === option.value}
                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                        className="sr-only"
                      />
                      <span className="font-medium text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
                {formData.attendance && (
                  <div className="border-t border-c-border pt-6 mt-8">
                    <p className="text-c-dim text-sm">
                      Bringing a friend? Share the link — everyone RSVPs individually.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ─── Step 2: Host ──────────────────────────────── */}
            {step === 2 && (
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-c-white mb-1 tracking-tight">
                  Who invited you?
                </h2>
                <p className="text-c-dim text-sm mb-8">This helps us organise the weekend</p>
                <div className="grid grid-cols-3 gap-3">
                  {['Georg', 'Cari', 'Peter'].map((host) => (
                    <label
                      key={host}
                      className={`text-center py-5 transition-all font-semibold text-lg min-h-[64px] flex items-center justify-center ${optionClass(formData.invitedBy === host)}`}
                    >
                      <input
                        type="radio"
                        name="invitedBy"
                        value={host}
                        checked={formData.invitedBy === host}
                        onChange={(e) => setFormData({ ...formData, invitedBy: e.target.value })}
                        className="sr-only"
                      />
                      {host}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Step 3: Arrival & Stay ────────────────────── */}
            {step === 3 && (
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-c-white mb-1 tracking-tight">
                  When will you be there?
                </h2>
                <p className="text-c-dim text-sm mb-8">Helps us plan food, logistics, and the flow</p>

                <div className="mb-8">
                  <label className="block text-c-white font-medium text-sm mb-3">Arrival</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'friday', label: 'Friday' },
                      { value: 'saturday', label: 'Saturday' },
                      { value: 'unsure-arrival', label: 'Not sure' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`text-center p-3 transition-all min-h-[48px] flex items-center justify-center ${optionClass(formData.arrivalDay === option.value)}`}
                      >
                        <input
                          type="radio"
                          name="arrivalDay"
                          value={option.value}
                          checked={formData.arrivalDay === option.value}
                          onChange={(e) => {
                            const v = e.target.value
                            setFormData({
                              ...formData,
                              arrivalDay: v,
                              stayDuration:
                                v === 'saturday' && formData.stayDuration === 'two-nights'
                                  ? ''
                                  : formData.stayDuration,
                            })
                          }}
                          className="sr-only"
                        />
                        <span className="font-medium text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-c-white font-medium text-sm mb-3">Duration</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'day-only', label: 'Day only', disabledWhen: [] as string[] },
                      { value: 'one-night', label: 'One night', disabledWhen: [] as string[] },
                      { value: 'two-nights', label: 'Two nights', disabledWhen: ['saturday'] },
                      { value: 'unsure-stay', label: 'Not sure', disabledWhen: [] as string[] },
                    ].map((option) => {
                      const disabled = option.disabledWhen.includes(formData.arrivalDay)
                      return (
                        <label
                          key={option.value}
                          className={`text-center p-3 transition-all min-h-[48px] flex items-center justify-center ${optionClass(formData.stayDuration === option.value, disabled)}`}
                        >
                          <input
                            type="radio"
                            name="stayDuration"
                            value={option.value}
                            checked={formData.stayDuration === option.value}
                            disabled={disabled}
                            onChange={(e) =>
                              setFormData({ ...formData, stayDuration: e.target.value })
                            }
                            className="sr-only"
                          />
                          <span className="font-medium text-sm">{option.label}</span>
                        </label>
                      )
                    })}
                  </div>
                  {formData.arrivalDay === 'saturday' && (
                    <p className="mt-3 text-c-gold text-xs">Saturday arrival = one night max.</p>
                  )}
                </div>
              </div>
            )}

            {/* ─── Step 4: Accommodation & Transport ─────────── */}
            {step === 4 && (
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-c-white mb-1 tracking-tight">
                  Where will you sleep?
                </h2>
                <p className="text-c-dim text-sm mb-8">
                  We&apos;ll assign rooms based on your venue choice
                </p>

                <div className="mb-8">
                  <label className="block text-c-white font-medium text-sm mb-3">Accommodation</label>
                  <div className="space-y-2">
                    {ACCOMMODATION_OPTIONS.map((option) => {
                      const v = venueByApiName(option.apiName)
                      const price = v?.price ?? FALLBACK_PRICES[option.key] ?? 0
                      const available = v?.available
                      const total = v?.total
                      const inventoryFull =
                        option.hasCapacity &&
                        available !== null &&
                        available !== undefined &&
                        available <= 0

                      // Host-Kontingent für Castle: pro Host nur ein begrenztes
                      // Castle-Kontingent. Wenn Caris/Peters/Georgs Liste voll
                      // ist, wird Castle für ihre Gäste ausgegraut. Greift nur
                      // für die Castle-Option und nur wenn ein Host in Step 2
                      // gewählt wurde.
                      const hostStats =
                        formData.invitedBy && beds?.hosts
                          ? beds.hosts[formData.invitedBy]
                          : undefined
                      const castleHostFull =
                        option.key === 'castle' && !!hostStats && hostStats.castle_full

                      const isFull = inventoryFull || castleHostFull

                      // Castle bei voller Host-Quota: kein Inventory-Counter
                      // zeigen — der Disable-Grund kommt aus der Host-Logik,
                      // nicht aus dem freien Castle-Inventar.
                      const availText =
                        castleHostFull
                          ? null
                          : option.hasCapacity
                          ? available !== null && available !== undefined && total !== null && total !== undefined
                            ? `${available}/${total}`
                            : null
                          : null

                      const priceText: string | null =
                        option.key === 'self'
                          ? null
                          : price === 0
                          ? 'No bed cost'
                          : `€${price} per bed · whole weekend`
                      const selected = formData.accommodationPreference === option.key
                      const showCastleNote = selected && option.key === 'castle'
                      const showBedTypePicker = selected && !!option.bedTypes
                      const multi = !!option.bedTypes && option.bedTypes.length > 1

                      return (
                        <div key={option.key}>
                          <label
                            className={`block p-4 transition-all min-h-[48px] ${optionClass(selected, isFull)}`}
                          >
                            <input
                              type="radio"
                              name="accommodationPreference"
                              value={option.key}
                              checked={selected}
                              disabled={isFull}
                              onChange={(e) => {
                                // Wenn die Pension nur einen Bett-Typ hat, gleich
                                // auto-setzen. Bei mehreren (Gelbes Haus) leer
                                // lassen, damit der Gast aktiv wählen muss.
                                const newOpt = ACCOMMODATION_OPTIONS.find((o) => o.key === e.target.value)
                                const defaultBedType =
                                  newOpt?.bedTypes && newOpt.bedTypes.length === 1
                                    ? newOpt.bedTypes[0].key
                                    : ''
                                setFormData({
                                  ...formData,
                                  accommodationPreference: e.target.value,
                                  bedTypePreference: defaultBedType,
                                })
                              }}
                              className="sr-only"
                            />
                            <div className="flex justify-between items-start gap-3">
                              <div className="min-w-0">
                                <span className="font-medium text-sm block">{option.label}</span>
                                <span
                                  className={`text-xs ${
                                    selected ? 'text-c-black/60' : 'text-c-dim'
                                  }`}
                                >
                                  {castleHostFull
                                    ? `${formData.invitedBy}’s castle slots are all booked — try a different venue`
                                    : isFull
                                    ? 'Currently full'
                                    : option.desc}
                                </span>
                                {priceText && (
                                  <span
                                    className={`font-mono text-[11px] tracking-wide block mt-1 ${
                                      selected ? 'text-c-black/50' : 'text-c-dim'
                                    }`}
                                  >
                                    {priceText}
                                  </span>
                                )}
                              </div>
                              {availText && (
                                <span
                                  className={`font-mono text-xs shrink-0 mt-0.5 ${
                                    selected ? 'text-c-black/60' : 'text-c-dim'
                                  }`}
                                >
                                  {availText}
                                </span>
                              )}
                            </div>
                          </label>

                          {/* Inline expand: Castle note */}
                          {showCastleNote && (
                            <div className="bg-c-surface border border-c-gold/30 p-4 mt-2 space-y-3">
                              <div>
                                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-c-gold mb-2">
                                  A note on castle rooms
                                </p>
                                <p className="text-c-muted text-xs leading-relaxed">
                                  The castle has a mix of rooms — singles, doubles, shared rooms with a mezzanine, and a dorm.
                                  Not everyone can get a private double; we&apos;ll arrange beds based on the full guest mix
                                  (couples together, friends near each other, etc.) and let you know in good time.
                                </p>
                              </div>
                              {/* DZ-Kontingent für den gewählten Host voll —
                                  freundlicher Hinweis, kein Hard-Block. */}
                              {hostStats && hostStats.doubles_full && (
                                <div className="border-t border-c-gold/20 pt-3">
                                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-c-gold mb-2">
                                    Heads up — double rooms
                                  </p>
                                  <p className="text-c-muted text-xs leading-relaxed">
                                    {formData.invitedBy}&rsquo;s double-room quota is fully booked.
                                    A private double won&apos;t be possible, but we&apos;ll absolutely
                                    find you a great place to sleep — couples and pairs together where we can.
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Inline expand: Bett-Typ Sub-Auswahl für die Pensionen */}
                          {showBedTypePicker && option.bedTypes && (
                            <div className="bg-c-surface border border-c-gold/30 p-4 mt-2">
                              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-c-gold mb-2">
                                What bed are you booking?
                              </p>
                              {option.bedTypesNote && (
                                <p className="text-c-muted text-xs leading-relaxed mb-4">
                                  {option.bedTypesNote}
                                </p>
                              )}
                              <div className="space-y-2">
                                {option.bedTypes.map((bt) => {
                                  const btSelected = formData.bedTypePreference === bt.key
                                  return (
                                    <label
                                      key={bt.key}
                                      className={`block p-3 transition-all ${optionClass(btSelected)}`}
                                    >
                                      <input
                                        type="radio"
                                        name="bedTypePreference"
                                        value={bt.key}
                                        checked={btSelected}
                                        onChange={(e) =>
                                          setFormData({
                                            ...formData,
                                            bedTypePreference: e.target.value,
                                          })
                                        }
                                        disabled={!multi}
                                        className="sr-only"
                                      />
                                      <span className="font-medium text-sm block">{bt.label}</span>
                                      <span
                                        className={`text-xs ${
                                          btSelected ? 'text-c-black/60' : 'text-c-dim'
                                        }`}
                                      >
                                        {bt.desc}
                                      </span>
                                    </label>
                                  )
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  <p className="text-c-dim text-xs mt-3">
                    Travelling as a couple, or want a specific roommate? Add a note in step 6 — we&apos;ll coordinate.
                  </p>
                </div>

                <div className="border-t border-c-border pt-6">
                  <label className="block text-c-white font-medium text-sm mb-3">
                    How will you get to the castle?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'car', label: 'Car' },
                      { value: 'train', label: 'Train' },
                      { value: 'carpool', label: 'Carpool' },
                      { value: 'unsure', label: "Don't know yet" },
                    ].map((mode) => (
                      <label
                        key={mode.value}
                        className={`text-center p-3 transition-all min-h-[48px] flex items-center justify-center ${optionClass(formData.transportMode === mode.value)}`}
                      >
                        <input
                          type="radio"
                          name="transportMode"
                          value={mode.value}
                          checked={formData.transportMode === mode.value}
                          onChange={(e) =>
                            setFormData({ ...formData, transportMode: e.target.value })
                          }
                          className="sr-only"
                        />
                        <span className="font-medium text-sm">{mode.label}</span>
                      </label>
                    ))}
                  </div>

                  {formData.transportMode === 'car' && (
                    <p className="text-c-dim text-xs mt-3">
                      ~1.5h from Berlin (A2), ~4.5h from Munich, ~4h from Frankfurt. Parking on the castle grounds. If you have space, consider offering a ride!
                    </p>
                  )}
                  {formData.transportMode === 'train' && (
                    <>
                      <p className="text-c-dim text-xs mt-3">
                        Nearest ICE station: Magdeburg Hbf (~1.5h from Berlin, ~3.5h from Frankfurt). From there ~20 min to Gommern by regional train.
                      </p>
                      <label className="flex items-center gap-3 cursor-pointer mt-3 bg-c-surface border border-c-border p-3 min-h-[48px]">
                        <input
                          type="checkbox"
                          checked={formData.needsShuttle}
                          onChange={(e) =>
                            setFormData({ ...formData, needsShuttle: e.target.checked })
                          }
                          className="w-4 h-4 accent-c-gold"
                        />
                        <span className="text-c-muted text-sm">
                          I&apos;d need a shuttle from the station
                        </span>
                      </label>
                    </>
                  )}
                  {formData.transportMode === 'carpool' && (
                    <p className="text-c-dim text-xs mt-3">
                      We&apos;ll help connect drivers and riders closer to the date.
                    </p>
                  )}
                  {formData.transportMode === 'unsure' && (
                    <p className="text-c-dim text-xs mt-3">
                      No worries — you can let us know later.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ─── Step 5: Cost Review ───────────────────────── */}
            {step === 5 && (
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-c-white mb-1 tracking-tight">
                  Your contribution
                </h2>
                <p className="text-c-dim text-sm mb-8">
                  Event fee helps cover parts of the food, drinks, music, and deco.
                  Bed fee goes 1:1 to the venues.
                </p>

                <div className="bg-c-surface border border-c-border p-6 mb-6">
                  <div className="space-y-5">
                    {/* Event fee row with slider */}
                    <div>
                      <div className="flex justify-between items-baseline">
                        <div>
                          <p className="text-c-white font-medium text-sm">Event fee</p>
                          <p className="text-c-dim text-xs">
                            {computedEventFee > EVENT_FEE_MIN
                              ? `Base €${EVENT_FEE_MIN} + €${computedEventFee - EVENT_FEE_MIN} birthday gift — thank you`
                              : `Base €${EVENT_FEE_MIN} — slide up to add a birthday gift`}
                          </p>
                        </div>
                        <span
                          className={`font-serif text-2xl tabular-nums ${
                            computedEventFee > EVENT_FEE_MIN ? 'text-c-gold' : 'text-c-white'
                          }`}
                        >
                          &euro;{computedEventFee}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={EVENT_FEE_MIN}
                        max={EVENT_FEE_MAX}
                        step={EVENT_FEE_STEP}
                        value={computedEventFee}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            eventFee: parseInt(e.target.value) || EVENT_FEE_MIN,
                          })
                        }
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer mt-4"
                        aria-label="Event fee amount"
                        style={{
                          background: `linear-gradient(to right, #C9A84C 0%, #C9A84C ${
                            ((computedEventFee - EVENT_FEE_MIN) /
                              (EVENT_FEE_MAX - EVENT_FEE_MIN)) *
                            100
                          }%, rgba(255,255,255,0.08) ${
                            ((computedEventFee - EVENT_FEE_MIN) /
                              (EVENT_FEE_MAX - EVENT_FEE_MIN)) *
                            100
                          }%, rgba(255,255,255,0.08) 100%)`,
                        }}
                      />
                      <div className="flex justify-between text-c-dim text-xs mt-2 font-mono">
                        <span>€{EVENT_FEE_MIN}</span>
                        <span>€{Math.round((EVENT_FEE_MIN + EVENT_FEE_MAX) / 2)}</span>
                        <span>€{EVENT_FEE_MAX}</span>
                      </div>
                    </div>

                    {!isDayOnly && selectedVenueOption && (
                      <div className="flex justify-between items-baseline">
                        <div>
                          <p className="text-c-white font-medium text-sm">
                            Bed &middot; {selectedVenueOption.label}
                          </p>
                          <p className="text-c-dim text-xs">
                            {computedBedFee === 0
                              ? 'Free'
                              : '1 bed · whole weekend'}
                          </p>
                        </div>
                        <span className="font-serif text-xl text-c-white tabular-nums">
                          {computedBedFee === 0 ? 'free' : `€${computedBedFee}`}
                        </span>
                      </div>
                    )}

                    <div className="border-t border-c-border pt-3 flex justify-between items-baseline">
                      <p className="text-c-white font-medium">Total</p>
                      <span className="font-serif text-3xl font-bold text-c-gold tabular-nums">
                        &euro;{computedTotal}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border border-c-gold/30 bg-c-gold/[0.04] p-5 mb-6">
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-c-gold mb-2">
                    A small note
                  </p>
                  <p className="text-c-muted text-sm leading-relaxed">
                    Anything you add above the &euro;{EVENT_FEE_MIN} base fee for the event
                    you can see as a birthday gift to Cari, Peter &amp; Georg — we&rsquo;d be
                    more than happy about it. No pressure though, &euro;{EVENT_FEE_MIN} is
                    completely fine.
                  </p>
                </div>

                <p className="text-c-dim text-xs leading-relaxed">
                  After you submit, you&apos;ll get a confirmation with a PayPal link.
                  Early payers get first dibs on castle rooms.
                </p>
              </div>
            )}

            {/* ─── Step 6: Contact & Details ─────────────────── */}
            {step === 6 && (
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-c-white mb-1 tracking-tight">
                  Almost there
                </h2>
                <p className="text-c-dim text-sm mb-8">So we can stay in touch</p>

                <div className="space-y-5">
                  {[
                    { label: 'Name *', type: 'text', key: 'name', placeholder: 'Full name', required: true },
                    { label: 'Email *', type: 'email', key: 'email', placeholder: 'your@email.com', required: true },
                    { label: 'Phone', type: 'tel', key: 'phone', placeholder: 'For last-minute updates', required: false },
                  ].map((field) => (
                    <div key={field.key}>
                      <label className="block text-c-white font-medium text-sm mb-2">{field.label}</label>
                      <input
                        type={field.type}
                        required={field.required}
                        value={formData[field.key as keyof typeof formData] as string}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                        className="w-full px-4 py-3 bg-c-surface border border-c-border text-c-white text-sm focus:outline-none focus:border-c-gold min-h-[48px] placeholder:text-c-dim"
                        placeholder={field.placeholder}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-c-white font-medium text-sm mb-2">
                      Allergies or dietary notes
                    </label>
                    <input
                      type="text"
                      value={formData.dietaryRestrictions}
                      onChange={(e) =>
                        setFormData({ ...formData, dietaryRestrictions: e.target.value })
                      }
                      className="w-full px-4 py-3 bg-c-surface border border-c-border text-c-white text-sm focus:outline-none focus:border-c-gold min-h-[48px] placeholder:text-c-dim"
                      placeholder="All food is plant-based — note any allergies here"
                    />
                  </div>

                  <div>
                    <label className="block text-c-white font-medium text-sm mb-2">Anything else?</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 bg-c-surface border border-c-border text-c-white text-sm focus:outline-none focus:border-c-gold resize-none placeholder:text-c-dim"
                      rows={3}
                      placeholder="Double-room wish, questions, or just say hi..."
                    />
                  </div>

                  <div className="border-t border-c-border pt-5">
                    <label className="flex items-start gap-3 cursor-pointer min-h-[48px]">
                      <input
                        type="checkbox"
                        checked={formData.willingToHelp}
                        onChange={(e) =>
                          setFormData({ ...formData, willingToHelp: e.target.checked })
                        }
                        className="w-4 h-4 accent-c-gold mt-0.5"
                      />
                      <div>
                        <span className="text-c-white font-medium text-sm block">
                          I&apos;m happy to help
                        </span>
                        <span className="text-c-dim text-xs">
                          Bar, kitchen, setup — whatever&apos;s needed.
                        </span>
                      </div>
                    </label>
                    {formData.willingToHelp && (
                      <input
                        type="text"
                        value={formData.skills}
                        onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                        className="w-full mt-3 px-4 py-3 bg-c-surface border border-c-border text-c-white text-sm focus:outline-none focus:border-c-gold min-h-[48px] placeholder:text-c-dim"
                        placeholder="Skills: DJ, cooking, decoration, bar..."
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Error */}
            {submitError && (
              <div className="bg-c-terracotta/10 border border-c-terracotta/30 p-3 mt-4" role="alert">
                <p className="text-c-terracotta-light text-sm">{submitError}</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center mt-10 pt-6 border-t border-c-border">
              {currentStepIndex > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="text-c-muted font-medium text-sm hover:text-c-white transition-colors min-h-[48px] px-2"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStepIndex < totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="bg-c-gold text-c-black font-semibold px-8 py-3 text-sm tracking-widest uppercase hover:bg-c-gold-light active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed min-h-[48px]"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canProceed() || isSubmitting}
                  className="bg-c-gold text-c-black font-semibold px-8 py-3 text-sm tracking-widest uppercase hover:bg-c-gold-light active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed min-h-[48px]"
                >
                  {isSubmitting ? 'Submitting...' : 'Count me in'}
                </button>
              )}
            </div>
          </div>
        </form>

        <p className="text-c-dim text-center text-xs mt-4 font-mono tracking-wide">
          Step {displayStep} of {totalSteps}
        </p>
      </div>
    </PageShell>
  )
}
