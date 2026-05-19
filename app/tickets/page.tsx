'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────
interface VenueStatus {
  name: string
  price: number
  total: number | null
  taken: number
  available: number | null
}

interface BedData {
  venues: VenueStatus[]
  // Legacy-Felder bleiben für Backward-Compat während Übergangsphase
  castle?: { total: number; taken: number; available: number }
  village?: { total: number; taken: number; available: number }
}

interface SubmitResult {
  eventFee: number
  bedFee: number
  total: number
  venue: string
}

// Fix-Eventbeitrag (Quelle of Truth: Notion Event-Konfiguration).
// Wenn ihr den Wert ändert, hier UND in rsvp-route.ts UND in Notion synchron halten.
const EVENT_FEE = 100

// Fallback-Preise, falls /api/beds noch nicht antwortet oder ein Fehler auftritt.
// Werte synchron mit Notion Event-Konfiguration halten.
const FALLBACK_PRICES: Record<string, number> = {
  castle: 90,
  gelbeshaus: 75,
  schlosskrug: 50,
  deichgraf: 123,
  camping: 0,
  self: 0,
}

// Mapping: interne Form-Keys ↔ Venue-Anzeigename in der API-Antwort
const ACCOMMODATION_OPTIONS: Array<{
  key: string
  apiName: string
  label: string
  desc: string
  hasCapacity: boolean
}> = [
  { key: 'castle', apiName: 'Castle', label: 'Castle', desc: 'Direkt im Schloss', hasCapacity: true },
  { key: 'gelbeshaus', apiName: 'Gelbes Haus', label: 'Gelbes Haus', desc: 'Im Dorf, 5 Min vom Schloss', hasCapacity: true },
  { key: 'schlosskrug', apiName: 'Schlosskrug', label: 'Schlosskrug', desc: 'Im Dorf, 5 Min vom Schloss', hasCapacity: true },
  { key: 'deichgraf', apiName: 'Deichgraf', label: 'Deichgraf Elbpension', desc: 'Premium-Pension, 5 Min vom Schloss', hasCapacity: true },
  { key: 'camping', apiName: 'Camping', label: 'Camping', desc: 'Zelt oder Camper auf dem Gelände', hasCapacity: false },
  { key: 'self', apiName: 'Self-Provided', label: 'Eigene Unterkunft', desc: 'Hotel, Airbnb, etc.', hasCapacity: false },
]

export default function RSVPPage() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null)
  const [beds, setBeds] = useState<BedData | null>(null)

  const [formData, setFormData] = useState({
    // Step 1: Attendance
    attendance: '',

    // Step 2: Arrival & Stay
    arrivalDay: '',
    stayDuration: '',

    // Step 3: Accommodation & Transport
    accommodationPreference: '',
    transportMode: '',
    needsShuttle: false,

    // Step 5: Contact & Details
    name: '',
    email: '',
    phone: '',
    invitedBy: '',
    dietaryRestrictions: '',
    skills: '',
    notes: '',
    willingToHelp: false,
  })

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'VENUE', href: '/venue' },
    { label: 'RSVP', href: '/tickets' },
  ]

  // Live-Bettverfügbarkeit aus dem neuen /api/beds Endpoint
  useEffect(() => {
    fetch('/api/beds')
      .then((res) => res.json())
      .then((data) => setBeds(data))
      .catch(() => {
        // Fallback, falls die API noch nicht erreichbar ist
        setBeds({ venues: [] })
      })
  }, [])

  // Helper: aktuelle Verfügbarkeit für ein Venue
  const venueByApiName = (apiName: string): VenueStatus | undefined =>
    beds?.venues.find((v) => v.name === apiName)

  // Day-only visitors skip the accommodation step entirely
  const isDayOnly = formData.stayDuration === 'day-only'

  // Step-Sequenz: 4 = Kostenübersicht (neu), 5 = Kontakt
  const stepSequence = isDayOnly ? [1, 2, 4, 5] : [1, 2, 3, 4, 5]
  const totalSteps = stepSequence.length
  const currentStepIndex = stepSequence.indexOf(step)
  const displayStep = currentStepIndex + 1

  // Kostenberechnung — live im Frontend, finaler Wert kommt von der API zurück
  const selectedVenueOption = ACCOMMODATION_OPTIONS.find(
    (o) => o.key === formData.accommodationPreference
  )
  const computedBedFee =
    isDayOnly || !selectedVenueOption
      ? 0
      : venueByApiName(selectedVenueOption.apiName)?.price ??
        FALLBACK_PRICES[selectedVenueOption.key] ??
        0
  const computedTotal = EVENT_FEE + computedBedFee

  // PayPal-Link mit vorbefülltem Betrag
  const paypalLink = (amount: number) =>
    `https://paypal.me/castletakeover/${amount}EUR`

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
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.attendance !== ''
      case 2:
        return formData.arrivalDay !== '' && formData.stayDuration !== ''
      case 3:
        return formData.accommodationPreference !== ''
      case 4:
        // Reine Anzeige-Step — immer weitergehen erlaubt
        return true
      case 5:
        return (
          formData.name !== '' &&
          formData.email !== '' &&
          formData.invitedBy !== ''
        )
      default:
        return false
    }
  }

  const goNext = () => {
    const nextIndex = currentStepIndex + 1
    if (nextIndex < stepSequence.length) {
      setStep(stepSequence[nextIndex])
    }
  }

  const goBack = () => {
    const prevIndex = currentStepIndex - 1
    if (prevIndex >= 0) {
      setStep(stepSequence[prevIndex])
    }
  }

  // ─── Success Screen ────────────────────────────────────────────────────
  if (isSubmitted && submitResult) {
    return (
      <div
        className="min-h-screen font-sans"
        style={{
          background:
            'linear-gradient(180deg, #7B8FA1 0%, #8E9AAF 50%, #9BA8B4 100%)',
        }}
      >
        <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
          <Link href="/" className="text-2xl font-bold text-white">
            THE CASTLE TAKEOVER
          </Link>
          <div className="flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white font-semibold text-sm transition-all duration-200 px-3 py-2 hover:text-[#FFE135]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        <main className="flex flex-col items-center justify-center px-8 py-12">
          <div className="bg-[#D4726A] rounded-3xl p-8 md:p-12 max-w-xl text-center border-4 border-[#2D4A3E]">
            <h2 className="text-3xl font-bold text-white mb-4">You&apos;re in!</h2>
            <p className="text-white/90 text-lg mb-6">
              Danke, {formData.name}! Wir freuen uns riesig auf dich am Schloss Dornburg.
            </p>

            {formData.willingToHelp && (
              <p className="text-[#FFE135] font-medium mb-4">
                Danke für deine Hilfsbereitschaft — wir melden uns näher am Event!
              </p>
            )}

            {/* Kostenübersicht */}
            <div className="bg-white/20 rounded-xl p-6 mt-6 text-left">
              <p className="text-white font-semibold mb-3 text-center">Deine Kostenübersicht</p>

              <div className="space-y-2 text-white/90 text-sm">
                <div className="flex justify-between">
                  <span>Eventbeitrag</span>
                  <span>{'€'}{submitResult.eventFee}</span>
                </div>
                {submitResult.bedFee > 0 && (
                  <div className="flex justify-between">
                    <span>Bett ({submitResult.venue})</span>
                    <span>{'€'}{submitResult.bedFee}</span>
                  </div>
                )}
                <div className="border-t border-white/30 mt-2 pt-2 flex justify-between font-bold text-white text-lg">
                  <span>Gesamt</span>
                  <span className="text-[#FFE135]">{'€'}{submitResult.total}</span>
                </div>
              </div>

              <div className="border-t border-white/20 pt-4 mt-6">
                <p className="text-white font-semibold mb-3 text-center">
                  Bitte zahle deinen Beitrag via PayPal
                </p>

                <div className="bg-white rounded-lg p-4 inline-block mb-4 mx-auto block w-fit">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(paypalLink(submitResult.total))}`}
                    alt="PayPal QR Code"
                    className="w-36 h-36"
                  />
                </div>

                <a
                  href={paypalLink(submitResult.total)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-[#FFE135] text-[#2D4A3E] font-bold px-6 py-2 rounded-lg border-2 border-[#2D4A3E] hover:scale-105 transition-transform mb-3"
                >
                  Jetzt {'€'}{submitResult.total} via PayPal zahlen
                </a>

                <p className="text-white/80 text-xs mt-2 px-4 text-center">
                  Bitte deinen Namen im Verwendungszweck mit angeben. Frühzahler bekommen ihr Wunschbett im Schloss zuerst.
                </p>
              </div>
            </div>

            <p className="text-white/80 text-sm mt-6">
              Wir melden uns mit mehr Details, sobald es näher rückt.
            </p>

            {/* Share link */}
            <div className="bg-white/10 rounded-lg p-4 mt-6">
              <p className="text-white/80 text-sm mb-2">Du willst jemanden mitbringen?</p>
              <p className="text-[#FFE135] font-medium text-sm">
                Teile thecastletakeover.de — jeder meldet sich einzeln an.
              </p>
            </div>

            <Link
              href="/"
              className="inline-block mt-8 bg-[#FFE135] text-[#2D4A3E] font-bold px-8 py-3 rounded-lg border-2 border-[#2D4A3E] hover:scale-105 transition-transform"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    )
  }

  // ─── Form ──────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen font-sans"
      style={{
        background:
          'linear-gradient(180deg, #7B8FA1 0%, #8E9AAF 50%, #9BA8B4 100%)',
      }}
    >
      {/* Wavy pattern overlay */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-white">
          THE CASTLE TAKEOVER
        </Link>
        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => setHoveredNav(item.label)}
              onMouseLeave={() => setHoveredNav(null)}
              className="text-white font-semibold text-sm transition-all duration-200 px-3 py-2 hover:text-[#FFE135]"
              style={{
                transform: hoveredNav === item.label ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 px-8 py-12 max-w-2xl mx-auto">
        {/* Header */}
        <h1
          className="text-5xl font-bold text-[#FFE135] text-center mb-4"
          style={{ textShadow: '2px 2px 0 #2D4A3E' }}
        >
          Join Us
        </h1>
        <p className="text-white text-center text-lg mb-8 max-w-xl mx-auto">
          This is not just a party — it&apos;s a shared weekend with friends old and new.
        </p>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {stepSequence.map((s, i) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                i === currentStepIndex
                  ? 'w-8 bg-[#FFE135]'
                  : i < currentStepIndex
                  ? 'w-4 bg-[#FFE135]/60'
                  : 'w-4 bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-[#D4726A] rounded-3xl p-8 border-4 border-[#2D4A3E] min-h-[400px] flex flex-col">

            {/* ─── Step 1: Attendance ─────────────────────────────── */}
            {step === 1 && (
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Are you joining us?</h2>
                <p className="text-white/80 mb-6">28 - 30 August 2026 at Schloss Dornburg</p>

                <div className="space-y-3 mb-8">
                  {[
                    { value: 'yes', label: 'Yes, definitely!' },
                    { value: 'likely', label: 'Most likely' },
                    { value: 'maybe', label: 'Not sure yet' },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`block p-4 rounded-xl cursor-pointer transition-all ${
                        formData.attendance === option.value
                          ? 'bg-[#FFE135] text-[#2D4A3E] border-2 border-[#2D4A3E]'
                          : 'bg-white/20 text-white border-2 border-transparent hover:bg-white/30'
                      }`}
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value={option.value}
                        checked={formData.attendance === option.value}
                        onChange={(e) =>
                          setFormData({ ...formData, attendance: e.target.value })
                        }
                        className="sr-only"
                      />
                      <span className="font-semibold">{option.label}</span>
                    </label>
                  ))}
                </div>

                {formData.attendance && (
                  <div className="border-t border-white/20 pt-6">
                    <p className="text-white/80 text-sm">
                      Du willst jemanden mitbringen? Teile den Link — jeder meldet sich einzeln an, damit wir sauber planen können.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ─── Step 2: Arrival & Stay ─────────────────────────── */}
            {step === 2 && (
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">When will you be there?</h2>
                <p className="text-white/80 mb-6">Hilft uns mit Essen, Logistik und Wochenend-Flow</p>

                <div className="mb-6">
                  <label className="block text-white font-semibold mb-3">Wann reist du an?</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'friday', label: 'Freitag' },
                      { value: 'saturday', label: 'Samstag' },
                      { value: 'unsure-arrival', label: 'Unklar' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`text-center p-3 rounded-xl cursor-pointer transition-all ${
                          formData.arrivalDay === option.value
                            ? 'bg-[#FFE135] text-[#2D4A3E] border-2 border-[#2D4A3E]'
                            : 'bg-white/20 text-white border-2 border-transparent hover:bg-white/30'
                        }`}
                      >
                        <input
                          type="radio"
                          name="arrivalDay"
                          value={option.value}
                          checked={formData.arrivalDay === option.value}
                          onChange={(e) => {
                            const newArrival = e.target.value
                            const invalidCombo =
                              newArrival === 'saturday' &&
                              formData.stayDuration === 'two-nights'
                            setFormData({
                              ...formData,
                              arrivalDay: newArrival,
                              stayDuration: invalidCombo ? '' : formData.stayDuration,
                            })
                          }}
                          className="sr-only"
                        />
                        <span className="font-semibold text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-3">Wie lange bleibst du?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'day-only', label: 'Nur Tag', disabledWhen: [] as string[] },
                      { value: 'one-night', label: 'Eine Nacht', disabledWhen: [] as string[] },
                      { value: 'two-nights', label: 'Zwei Nächte (Fr–So)', disabledWhen: ['saturday'] },
                      { value: 'unsure-stay', label: 'Unklar', disabledWhen: [] as string[] },
                    ].map((option) => {
                      const isDisabled = option.disabledWhen.includes(formData.arrivalDay)
                      return (
                        <label
                          key={option.value}
                          className={`text-center p-3 rounded-xl transition-all ${
                            isDisabled
                              ? 'opacity-30 cursor-not-allowed bg-white/10 border-2 border-transparent'
                              : formData.stayDuration === option.value
                              ? 'bg-[#FFE135] text-[#2D4A3E] border-2 border-[#2D4A3E] cursor-pointer'
                              : 'bg-white/20 text-white border-2 border-transparent hover:bg-white/30 cursor-pointer'
                          }`}
                        >
                          <input
                            type="radio"
                            name="stayDuration"
                            value={option.value}
                            checked={formData.stayDuration === option.value}
                            disabled={isDisabled}
                            onChange={(e) =>
                              setFormData({ ...formData, stayDuration: e.target.value })
                            }
                            className="sr-only"
                          />
                          <span className="font-semibold text-sm">{option.label}</span>
                        </label>
                      )
                    })}
                  </div>
                  {formData.arrivalDay === 'saturday' && (
                    <p className="mt-3 text-[#FFE135] text-sm">
                      Bei Samstag-Anreise: maximal eine Nacht — das Event endet Sonntag.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* ─── Step 3: Accommodation (Venue mit Preis) + Transport ─── */}
            {step === 3 && (
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Wo schläfst du?</h2>
                <p className="text-white/80 mb-6">
                  Wähle dein Wunsch-Venue — wir teilen die Zimmer dann passend zu.
                </p>

                <div className="mb-6">
                  <label className="block text-white font-semibold mb-3">Unterkunft</label>
                  <div className="space-y-3">
                    {ACCOMMODATION_OPTIONS.map((option) => {
                      const v = venueByApiName(option.apiName)
                      const price = v?.price ?? 0
                      const available = v?.available
                      const isFull =
                        option.hasCapacity && available !== null && available !== undefined && available <= 0

                      const availabilityText = option.hasCapacity
                        ? available === null || available === undefined
                          ? null
                          : `${available} von ${v?.total ?? 0} Betten frei`
                        : 'Genug Platz'

                      return (
                        <label
                          key={option.key}
                          className={`block p-4 rounded-xl transition-all ${
                            isFull
                              ? 'opacity-50 cursor-not-allowed bg-white/10 border-2 border-transparent'
                              : formData.accommodationPreference === option.key
                              ? 'bg-[#FFE135] text-[#2D4A3E] border-2 border-[#2D4A3E] cursor-pointer'
                              : 'bg-white/20 text-white border-2 border-transparent hover:bg-white/30 cursor-pointer'
                          }`}
                        >
                          <input
                            type="radio"
                            name="accommodationPreference"
                            value={option.key}
                            checked={formData.accommodationPreference === option.key}
                            disabled={isFull}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                accommodationPreference: e.target.value,
                              })
                            }
                            className="sr-only"
                          />
                          <div className="flex justify-between items-start gap-3">
                            <div className="flex-1">
                              <span className="font-semibold block">{option.label}</span>
                              <span
                                className={`text-sm ${
                                  formData.accommodationPreference === option.key
                                    ? 'text-[#2D4A3E]/70'
                                    : 'text-white/70'
                                }`}
                              >
                                {option.desc}
                              </span>
                              {availabilityText && (
                                <span
                                  className={`text-xs block mt-1 ${
                                    formData.accommodationPreference === option.key
                                      ? 'text-[#2D4A3E]/60'
                                      : 'text-white/60'
                                  }`}
                                >
                                  {availabilityText}
                                </span>
                              )}
                            </div>
                            <div
                              className={`text-right shrink-0 ${
                                formData.accommodationPreference === option.key
                                  ? 'text-[#2D4A3E]'
                                  : 'text-white'
                              }`}
                            >
                              <span className="font-bold text-lg">
                                {price === 0 ? 'frei' : `${'€'}${price}`}
                              </span>
                              {price > 0 && (
                                <span
                                  className={`block text-xs ${
                                    formData.accommodationPreference === option.key
                                      ? 'text-[#2D4A3E]/70'
                                      : 'text-white/70'
                                  }`}
                                >
                                  pro Bett
                                </span>
                              )}
                            </div>
                          </div>
                        </label>
                      )
                    })}
                  </div>
                  <p className="text-white/70 text-xs mt-3">
                    Bett-Zuteilung erfolgt durch uns. Bei Doppelzimmer-Wünschen bitte im Notizfeld später angeben.
                  </p>
                </div>

                {/* Transport */}
                <div className="border-t border-white/20 pt-6">
                  <label className="block text-white font-semibold mb-3">Wie kommst du hin?</label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {[
                      { value: 'car', label: 'Auto' },
                      { value: 'train', label: 'Zug' },
                      { value: 'carpool', label: 'Mitfahrt' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`text-center p-3 rounded-xl cursor-pointer transition-all ${
                          formData.transportMode === option.value
                            ? 'bg-[#FFE135] text-[#2D4A3E] border-2 border-[#2D4A3E]'
                            : 'bg-white/20 text-white border-2 border-transparent hover:bg-white/30'
                        }`}
                      >
                        <input
                          type="radio"
                          name="transportMode"
                          value={option.value}
                          checked={formData.transportMode === option.value}
                          onChange={(e) =>
                            setFormData({ ...formData, transportMode: e.target.value })
                          }
                          className="sr-only"
                        />
                        <span className="font-semibold text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>

                  {formData.transportMode === 'train' && (
                    <label className="flex items-center gap-3 cursor-pointer mt-3 bg-white/10 rounded-xl p-3">
                      <input
                        type="checkbox"
                        checked={formData.needsShuttle}
                        onChange={(e) =>
                          setFormData({ ...formData, needsShuttle: e.target.checked })
                        }
                        className="w-5 h-5 rounded accent-[#FFE135]"
                      />
                      <span className="text-white text-sm">
                        Ich bräuchte einen Shuttle vom Bahnhof
                      </span>
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* ─── Step 4: Kostenübersicht (Reveal) ───────────────── */}
            {step === 4 && (
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Dein Beitrag</h2>
                <p className="text-white/80 mb-6">
                  Ein faires, durchgerechnetes Modell — Eventbeitrag deckt Essen, Drinks, Musik, Deko, Versicherung. Bettkosten gehen 1:1 an die Unterkünfte.
                </p>

                <div className="bg-white/10 rounded-xl p-6 mb-6">
                  <div className="space-y-3 text-white">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">Eventbeitrag</p>
                        <p className="text-white/60 text-xs">Essen, Drinks, Musik, Deko</p>
                      </div>
                      <span className="text-xl font-bold">{'€'}{EVENT_FEE}</span>
                    </div>

                    {!isDayOnly && selectedVenueOption && (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold">Bett — {selectedVenueOption.label}</p>
                          <p className="text-white/60 text-xs">
                            {computedBedFee === 0
                              ? 'Kostenlos'
                              : '1 Bett, 1–2 Nächte'}
                          </p>
                        </div>
                        <span className="text-xl font-bold">
                          {computedBedFee === 0 ? 'frei' : `${'€'}${computedBedFee}`}
                        </span>
                      </div>
                    )}

                    <div className="border-t border-white/30 pt-3 flex justify-between items-center">
                      <p className="font-bold text-lg">Gesamt</p>
                      <span className="text-3xl font-bold text-[#FFE135]">
                        {'€'}{computedTotal}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4 text-white/80 text-sm space-y-2">
                  <p>
                    <strong>So läuft die Zahlung:</strong> Nach dem Absenden des
                    RSVPs bekommst du auf der Bestätigungsseite einen
                    PayPal-Link mit vorbefülltem Betrag. Bitte deinen Namen im
                    Verwendungszweck mit angeben.
                  </p>
                  <p className="text-white/60 text-xs">
                    Frühzahler bekommen ihr Wunschzimmer im Schloss als erste.
                  </p>
                </div>
              </div>
            )}

            {/* ─── Step 5: Contact & Details ──────────────────────── */}
            {step === 5 && (
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Fast geschafft!</h2>
                <p className="text-white/80 mb-6">Nur noch ein paar Details, damit wir Kontakt halten können</p>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Dein Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/90 text-[#2D4A3E] font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE135]"
                      placeholder="Dein voller Name"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/90 text-[#2D4A3E] font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE135]"
                      placeholder="deine@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Telefon (optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/90 text-[#2D4A3E] font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE135]"
                      placeholder="Für Last-Minute-Updates"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Wer hat dich eingeladen? *</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['Georg', 'Cari', 'Peter'].map((host) => (
                        <label
                          key={host}
                          className={`text-center py-3 rounded-lg cursor-pointer transition-all font-semibold ${
                            formData.invitedBy === host
                              ? 'bg-[#FFE135] text-[#2D4A3E] border-2 border-[#2D4A3E]'
                              : 'bg-white/20 text-white border-2 border-transparent hover:bg-white/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name="invitedBy"
                            value={host}
                            checked={formData.invitedBy === host}
                            onChange={(e) =>
                              setFormData({ ...formData, invitedBy: e.target.value })
                            }
                            className="sr-only"
                          />
                          {host}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Ernährung (optional)</label>
                    <input
                      type="text"
                      value={formData.dietaryRestrictions}
                      onChange={(e) =>
                        setFormData({ ...formData, dietaryRestrictions: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-lg bg-white/90 text-[#2D4A3E] font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE135]"
                      placeholder="Vegetarisch, vegan, Allergien..."
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">
                      Sonst noch was? (optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/90 text-[#2D4A3E] font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE135] resize-none"
                      rows={3}
                      placeholder="Doppelzimmer-Wunsch, Fragen, oder einfach Hi sagen..."
                    />
                  </div>

                  <div className="border-t border-white/20 pt-4 mt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.willingToHelp}
                        onChange={(e) =>
                          setFormData({ ...formData, willingToHelp: e.target.checked })
                        }
                        className="w-5 h-5 rounded accent-[#FFE135] mt-0.5"
                      />
                      <div>
                        <span className="text-white font-semibold block">
                          Ich helfe gerne mit
                        </span>
                        <span className="text-white/70 text-sm">
                          Bar-Schicht, Küche, Auf-/Abbau — was gerade gebraucht wird.
                        </span>
                      </div>
                    </label>

                    {formData.willingToHelp && (
                      <div className="mt-3">
                        <input
                          type="text"
                          value={formData.skills}
                          onChange={(e) =>
                            setFormData({ ...formData, skills: e.target.value })
                          }
                          className="w-full px-4 py-3 rounded-lg bg-white/90 text-[#2D4A3E] font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE135]"
                          placeholder="Deine Skills: DJ, Kochen, Deko, Bar..."
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {submitError && (
              <div className="bg-red-500/20 border border-red-400/50 rounded-lg p-3 mt-4">
                <p className="text-white text-sm">{submitError}</p>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
              {currentStepIndex > 0 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="text-white font-semibold hover:text-[#FFE135] transition-colors"
                >
                  Zurück
                </button>
              ) : (
                <div />
              )}

              {currentStepIndex < totalSteps - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="bg-[#FFE135] text-[#2D4A3E] font-bold px-8 py-3 rounded-lg border-2 border-[#2D4A3E] hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Weiter
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canProceed() || isSubmitting}
                  className="bg-[#FFE135] text-[#2D4A3E] font-bold px-8 py-3 rounded-lg border-2 border-[#2D4A3E] hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Wird abgeschickt...' : 'Count me in!'}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Step indicator text */}
        <p className="text-white/50 text-center text-sm mt-4">
          Schritt {displayStep} von {totalSteps}
        </p>
      </main>
    </div>
  )
}
