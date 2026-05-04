'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { PageShell } from '@/components/page-shell'

interface HostBeds {
  total: number
  taken: number
  available: number
}

interface BedData {
  castle: { total: number; taken: number; available: number }
  village: { total: number; taken: number; available: number }
  perHost: Record<string, HostBeds>
}

export default function RSVPPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [beds, setBeds] = useState<BedData | null>(null)
  const [customAmount, setCustomAmount] = useState(false)

  const [formData, setFormData] = useState({
    attendance: '',
    invitedBy: '',
    arrivalDay: '',
    stayDuration: '',
    accommodationPreference: '',
    transportMode: '',
    needsShuttle: false,
    contribution: 90,
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
      .catch(() => {
        setBeds({
          castle: { total: 90, taken: 0, available: 90 },
          village: { total: 70, taken: 0, available: 70 },
          perHost: {
            Georg: { total: 30, taken: 0, available: 30 },
            Cari: { total: 30, taken: 0, available: 30 },
            Peter: { total: 30, taken: 0, available: 30 },
          },
        })
      })
  }, [])

  // Per-host castle availability
  const hostBeds = beds?.perHost?.[formData.invitedBy]
  const hostCastleAvailable = hostBeds?.available ?? 30
  const hostCastleTotal = hostBeds?.total ?? 30
  const castleFull = hostCastleAvailable <= 0

  const villageBedsRemaining = beds?.village.available ?? 70
  const totalVillageBeds = beds?.village.total ?? 70

  const isDayOnly = formData.stayDuration === 'day-only'

  // Steps: 1=attendance, 2=host, 3=arrival, 4=accommodation, 5=contribution, 6=contact
  // Day-only skips step 4 (accommodation)
  const stepSequence = isDayOnly ? [1, 2, 3, 5, 6] : [1, 2, 3, 4, 5, 6]
  const totalSteps = stepSequence.length
  const currentStepIndex = stepSequence.indexOf(step)
  const displayStep = currentStepIndex + 1

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
      case 4: return formData.accommodationPreference !== ''
      case 5: return formData.accommodationPreference === 'castle' ? formData.contribution >= 90 : formData.contribution >= 50
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

  // Calendar event details
  const calendarTitle = 'The Castle Takeover — Schloss Dornburg'
  const calendarStart = '20260828T140000'
  const calendarEnd = '20260830T140000'
  const calendarLocation = 'Schloss Dornburg, Lindenweg 1, 39264 Gommern, Germany'
  const calendarDesc = 'Peter, Cari & Georg\'s joint birthday weekend. Castle. Party. Weekend. thecastletakeover.de'

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calendarTitle)}&dates=${calendarStart}/${calendarEnd}&location=${encodeURIComponent(calendarLocation)}&details=${encodeURIComponent(calendarDesc)}`

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${calendarStart}`,
    `DTEND:${calendarEnd}`,
    `SUMMARY:${calendarTitle}`,
    `LOCATION:${calendarLocation}`,
    `DESCRIPTION:${calendarDesc}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\n')

  const icsBlob = typeof window !== 'undefined'
    ? URL.createObjectURL(new Blob([icsContent], { type: 'text/calendar' }))
    : '#'

  const paypalPoolUrl = 'https://www.paypal.com/pool/9nZT9mha8K?sr=wccr'

  // Success screen
  if (isSubmitted) {
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
              href="https://chat.whatsapp.com/LutHT3B7hv00hRN2z41MmC"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-semibold py-4 text-sm tracking-wide hover:bg-[#20BD5A] active:scale-[0.98] transition-all min-h-[48px] mb-6"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Join the WhatsApp Group
            </a>

            {/* Calendar */}
            <div className="bg-c-surface border border-c-border p-6">
              <p className="text-c-white font-medium text-sm mb-4">Save the date</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a href={googleCalUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border border-c-border text-c-muted font-mono text-xs tracking-widest uppercase px-5 py-3 hover:text-c-white hover:border-c-white/20 transition-colors min-h-[48px]">
                  Google Calendar
                </a>
                <a href={icsBlob} download="castle-takeover.ics" className="inline-flex items-center justify-center gap-2 border border-c-border text-c-muted font-mono text-xs tracking-widest uppercase px-5 py-3 hover:text-c-white hover:border-c-white/20 transition-colors min-h-[48px]">
                  Apple Calendar
                </a>
              </div>
              <p className="text-c-dim text-xs mt-3">28 Aug (Fri) 14:00 &ndash; 30 Aug (Sun) 14:00</p>
            </div>

            {/* Payment */}
            <div className="bg-c-surface border border-c-border p-6 mt-4">
              <p className="text-c-muted text-sm mb-1">Your solidarity contribution</p>
              <p className="text-4xl font-serif font-bold text-c-gold mb-6 tabular-nums">&euro;{formData.contribution}</p>
              <div className="border-t border-c-border pt-6">
                <p className="text-c-white font-medium text-sm mb-4">Send to the PayPal Money Pool</p>
                <div className="bg-white rounded p-3 inline-block mb-4">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(paypalPoolUrl)}`} alt="PayPal Money Pool QR Code" width={160} height={160} className="w-40 h-40" />
                </div>
                <p className="text-c-muted text-sm mb-2">Scan the QR code or tap below</p>
                <a href={paypalPoolUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 bg-c-gold text-c-black font-semibold px-6 py-3 text-sm tracking-widest uppercase hover:bg-c-gold-light active:scale-[0.98] transition-all min-h-[48px]">
                  Open PayPal Pool
                </a>
                <p className="text-c-dim text-xs mt-4">
                  Include your name in the payment note so we can match it up.
                </p>
                {formData.accommodationPreference === 'castle' && formData.attendance !== 'yes' && (
                  <p className="text-c-muted text-xs mt-3">
                    Once you&apos;re sure you&apos;re joining, drop us a message — we&apos;ll sort out your castle bed then.
                  </p>
                )}
              </div>
            </div>

            {/* Share */}
            <div className="bg-c-surface border border-c-border p-4 mt-4">
              <p className="text-c-muted text-sm">Want to invite a friend?</p>
              <p className="text-c-gold font-mono text-sm mt-1">thecastletakeover.de</p>
            </div>

            <Link href="/" className="inline-block mt-8 bg-c-gold text-c-black font-semibold px-8 py-3 text-sm tracking-widest uppercase hover:bg-c-gold-light active:scale-[0.98] transition-all min-h-[48px]">
              Back to Home
            </Link>
          </div>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="px-6 md:px-8 py-12 md:py-20 max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-c-gold mb-4">Join Us</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-c-white leading-tight mb-3">RSVP</h1>
          <p className="text-c-muted">Not just a party — a shared weekend with friends old and new.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {stepSequence.map((_, i) => (
            <div key={i} className={`h-0.5 rounded-full transition-all ${i === currentStepIndex ? 'w-8 bg-c-gold' : i < currentStepIndex ? 'w-4 bg-c-gold/40' : 'w-4 bg-c-border'}`} />
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="border border-c-border p-6 md:p-10 min-h-[420px] flex flex-col">

            {/* Step 1: Attendance */}
            {step === 1 && (
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-c-white mb-1 tracking-tight">Are you joining us?</h2>
                <p className="text-c-dim text-sm mb-8 font-mono tracking-wide">28.08 &ndash; 30.08.2026 &middot; Schloss Dornburg</p>
                <div className="space-y-3">
                  {[
                    { value: 'yes', label: 'Yes, definitely' },
                    { value: 'likely', label: 'Most likely' },
                    { value: 'maybe', label: 'Not sure yet' },
                  ].map((option) => (
                    <label key={option.value} className={`block p-4 transition-all min-h-[48px] ${optionClass(formData.attendance === option.value)}`}>
                      <input type="radio" name="attendance" value={option.value} checked={formData.attendance === option.value} onChange={(e) => setFormData({ ...formData, attendance: e.target.value })} className="sr-only" />
                      <span className="font-medium text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
                {formData.attendance && (
                  <div className="border-t border-c-border pt-6 mt-8">
                    <p className="text-c-dim text-sm">Bringing a friend? Share the link — everyone RSVPs individually.</p>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Host */}
            {step === 2 && (
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-c-white mb-1 tracking-tight">Who invited you?</h2>
                <p className="text-c-dim text-sm mb-8">This helps us organise the weekend</p>
                <div className="grid grid-cols-3 gap-3">
                  {['Georg', 'Cari', 'Peter'].map((host) => (
                    <label key={host} className={`text-center py-5 transition-all font-semibold text-lg min-h-[64px] flex items-center justify-center ${optionClass(formData.invitedBy === host)}`}>
                      <input type="radio" name="invitedBy" value={host} checked={formData.invitedBy === host} onChange={(e) => setFormData({ ...formData, invitedBy: e.target.value })} className="sr-only" />
                      {host}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Arrival & Stay */}
            {step === 3 && (
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-c-white mb-1 tracking-tight">When will you be there?</h2>
                <p className="text-c-dim text-sm mb-8">Helps us plan food, logistics, and the flow</p>

                <div className="mb-8">
                  <label className="block text-c-white font-medium text-sm mb-3">Arrival</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'friday', label: 'Friday' },
                      { value: 'saturday', label: 'Saturday' },
                      { value: 'unsure-arrival', label: 'Not sure' },
                    ].map((option) => (
                      <label key={option.value} className={`text-center p-3 transition-all min-h-[48px] flex items-center justify-center ${optionClass(formData.arrivalDay === option.value)}`}>
                        <input type="radio" name="arrivalDay" value={option.value} checked={formData.arrivalDay === option.value} onChange={(e) => { const v = e.target.value; setFormData({ ...formData, arrivalDay: v, stayDuration: v === 'saturday' && formData.stayDuration === 'two-nights' ? '' : formData.stayDuration }) }} className="sr-only" />
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
                        <label key={option.value} className={`text-center p-3 transition-all min-h-[48px] flex items-center justify-center ${optionClass(formData.stayDuration === option.value, disabled)}`}>
                          <input type="radio" name="stayDuration" value={option.value} checked={formData.stayDuration === option.value} disabled={disabled} onChange={(e) => setFormData({ ...formData, stayDuration: e.target.value })} className="sr-only" />
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

            {/* Step 4: Accommodation & Transport */}
            {step === 4 && (() => {
              const isLikely = formData.attendance === 'likely' || formData.attendance === 'maybe'

              return (
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-c-white mb-1 tracking-tight">Where will you sleep?</h2>
                <p className="text-c-dim text-sm mb-8">This helps us plan — nothing&apos;s locked in yet</p>

                <div className="mb-8">
                  <label className="block text-c-white font-medium text-sm mb-3">Accommodation</label>
                  <div className="space-y-2">
                    {[
                      {
                        value: 'castle',
                        label: 'Castle',
                        desc: castleFull
                          ? `Castle beds are currently full`
                          : isLikely
                          ? 'Mostly shared rooms, some doubles \u2014 once you\u2019re sure, let us know'
                          : 'Mostly shared rooms, some doubles \u2014 \u20AC90 per bed',
                        avail: castleFull ? null : `${hostCastleAvailable}/${hostCastleTotal}`,
                        disabled: castleFull,
                      },
                      { value: 'village', label: 'Village', desc: '5 min walk, we help coordinate', avail: `${villageBedsRemaining}/${totalVillageBeds}`, disabled: false },
                      { value: 'camping', label: 'Camping', desc: 'Tent or camper on the grounds', avail: null, disabled: false },
                      { value: 'self', label: 'Own arrangement', desc: 'Hotel, Airbnb, etc.', avail: null, disabled: false },
                    ].map((option) => (
                      <label key={option.value} className={`block p-4 transition-all min-h-[48px] ${optionClass(formData.accommodationPreference === option.value, option.disabled)}`}>
                        <input type="radio" name="accommodationPreference" value={option.value} checked={formData.accommodationPreference === option.value} disabled={option.disabled} onChange={(e) => {
                          const val = e.target.value
                          setFormData({
                            ...formData,
                            accommodationPreference: val,
                            contribution: val === 'castle' && formData.contribution < 90 ? 90 : formData.contribution,
                          })
                        }} className="sr-only" />
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-medium text-sm block">{option.label}</span>
                            <span className={`text-xs ${formData.accommodationPreference === option.value ? 'text-c-black/60' : 'text-c-dim'}`}>{option.desc}</span>
                          </div>
                          {option.avail && (
                            <span className={`font-mono text-xs shrink-0 ml-3 ${formData.accommodationPreference === option.value ? 'text-c-black/60' : 'text-c-dim'}`}>{option.avail}</span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>

                </div>

                <div className="border-t border-c-border pt-6">
                  <label className="block text-c-white font-medium text-sm mb-3">How will you get to the castle?</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'car', label: 'Car' },
                      { value: 'train', label: 'Train' },
                      { value: 'carpool', label: 'Carpool' },
                      { value: 'unsure', label: "Don't know yet" },
                    ].map((mode) => (
                      <label key={mode.value} className={`text-center p-3 transition-all min-h-[48px] flex items-center justify-center ${optionClass(formData.transportMode === mode.value)}`}>
                        <input type="radio" name="transportMode" value={mode.value} checked={formData.transportMode === mode.value} onChange={(e) => setFormData({ ...formData, transportMode: e.target.value })} className="sr-only" />
                        <span className="font-medium text-sm">{mode.label}</span>
                      </label>
                    ))}
                  </div>

                  {formData.transportMode === 'car' && (
                    <p className="text-c-dim text-xs mt-3">~1.5h from Berlin (A2), ~4.5h from Munich, ~4h from Frankfurt. Parking on the castle grounds. If you have space, consider offering a ride!</p>
                  )}
                  {formData.transportMode === 'train' && (
                    <>
                      <p className="text-c-dim text-xs mt-3">Nearest ICE station: Magdeburg Hbf (~1.5h from Berlin, ~3.5h from Frankfurt). From there ~20 min to Gommern by regional train.</p>
                      <label className="flex items-center gap-3 cursor-pointer mt-3 bg-c-surface border border-c-border p-3 min-h-[48px]">
                        <input type="checkbox" checked={formData.needsShuttle} onChange={(e) => setFormData({ ...formData, needsShuttle: e.target.checked })} className="w-4 h-4 accent-c-gold" />
                        <span className="text-c-muted text-sm">I&apos;d need a shuttle from the station</span>
                      </label>
                    </>
                  )}
                  {formData.transportMode === 'carpool' && (
                    <p className="text-c-dim text-xs mt-3">We&apos;ll help connect drivers and riders closer to the date. Just pick this and we&apos;ll sort it out.</p>
                  )}
                  {formData.transportMode === 'unsure' && (
                    <p className="text-c-dim text-xs mt-3">No worries — you can let us know later. Check the venue page for directions when you&apos;re ready.</p>
                  )}
                </div>
              </div>
              )
            })()}

            {/* Step 5: Contribution */}
            {step === 5 && (() => {
              const wantsCastle = formData.accommodationPreference === 'castle'
              const sliderMin = wantsCastle ? 90 : 50
              const sliderMax = 200
              const sliderRange = sliderMax - sliderMin
              const isCustom = customAmount || formData.contribution > sliderMax

              return (
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-c-white mb-1 tracking-tight">Solidarity Contribution</h2>
                  <p className="text-c-dim text-sm mb-8">We don&apos;t want gifts — your contribution to the weekend is the best present we could ask for</p>

                  <div className="bg-c-surface border border-c-border p-5 mb-8">
                    {wantsCastle ? (
                      <p className="text-c-muted text-sm">
                        Castle beds are <span className="text-c-gold font-medium">&euro;90 per person</span>.
                        Mostly shared rooms, some doubles — we&apos;ll do our best to
                        fit everyone&apos;s needs. The venue is the biggest
                        cost of the weekend, so this is about covering it together as a group.
                      </p>
                    ) : (
                      <p className="text-c-muted text-sm">
                        We&apos;re suggesting around &euro;90 per person. If you can do more,
                        it helps someone else do less. If that&apos;s a stretch, pay what
                        works — no questions asked.
                      </p>
                    )}
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between items-end mb-4">
                      <label className="text-c-white font-medium text-sm">Amount</label>
                      {isCustom ? (
                        <div className="flex items-baseline gap-1">
                          <span className="text-c-gold font-serif text-2xl">&euro;</span>
                          <input
                            type="number"
                            min={sliderMin}
                            value={formData.contribution}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || sliderMin
                              setFormData({ ...formData, contribution: Math.max(sliderMin, val) })
                            }}
                            className="w-24 text-4xl font-serif font-bold text-c-gold tabular-nums bg-transparent border-b border-c-gold/40 focus:outline-none focus:border-c-gold text-right"
                          />
                        </div>
                      ) : (
                        <span className="text-4xl font-serif font-bold text-c-gold tabular-nums">&euro;{formData.contribution}</span>
                      )}
                    </div>
                    <input
                      type="range" min={sliderMin} max={sliderMax} step="10"
                      value={Math.min(formData.contribution, sliderMax)}
                      onChange={(e) => {
                        const val = parseInt(e.target.value)
                        if (val >= sliderMax) {
                          setCustomAmount(true)
                          setFormData({ ...formData, contribution: val })
                        } else {
                          setCustomAmount(false)
                          setFormData({ ...formData, contribution: val })
                        }
                      }}
                      className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                      aria-label="Contribution amount"
                      style={{ background: `linear-gradient(to right, #C9A84C 0%, #C9A84C ${((Math.min(formData.contribution, sliderMax) - sliderMin) / sliderRange) * 100}%, rgba(255,255,255,0.08) ${((Math.min(formData.contribution, sliderMax) - sliderMin) / sliderRange) * 100}%, rgba(255,255,255,0.08) 100%)` }}
                    />
                    <div className="flex justify-between text-c-dim text-xs mt-2 font-mono">
                      <span>&euro;{sliderMin}</span>
                      <span>&euro;90 suggested</span>
                      <button
                        type="button"
                        onClick={() => {
                          if (isCustom) {
                            setCustomAmount(false)
                            setFormData({ ...formData, contribution: sliderMax })
                          } else {
                            setCustomAmount(true)
                            setFormData({ ...formData, contribution: sliderMax + 10 })
                          }
                        }}
                        className="text-c-gold hover:text-c-gold-light transition-colors"
                      >
                        {isCustom ? '\u2190 back to slider' : '\u20AC200+'}
                      </button>
                    </div>
                  </div>

                  {formData.contribution >= 150 && (
                    <p className="text-c-gold text-sm text-center">Legend. This helps make the weekend possible for everyone.</p>
                  )}
                  {!wantsCastle && formData.contribution < 60 && (
                    <p className="text-c-muted text-sm text-center">No worries — glad you&apos;re coming.</p>
                  )}
                </div>
              )
            })()}

            {/* Step 6: Contact & Details */}
            {step === 6 && (
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-c-white mb-1 tracking-tight">Almost there</h2>
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
                    <label className="block text-c-white font-medium text-sm mb-2">Allergies or dietary notes</label>
                    <input
                      type="text"
                      value={formData.dietaryRestrictions}
                      onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
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
                      placeholder="Questions, or just say hi..."
                    />
                  </div>

                  <div className="border-t border-c-border pt-5">
                    <label className="flex items-start gap-3 cursor-pointer min-h-[48px]">
                      <input type="checkbox" checked={formData.willingToHelp} onChange={(e) => setFormData({ ...formData, willingToHelp: e.target.checked })} className="w-4 h-4 accent-c-gold mt-0.5" />
                      <div>
                        <span className="text-c-white font-medium text-sm block">I&apos;m happy to help</span>
                        <span className="text-c-dim text-xs">Bar, kitchen, setup — whatever&apos;s needed.</span>
                      </div>
                    </label>
                    {formData.willingToHelp && (
                      <input
                        type="text" value={formData.skills}
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
                <button type="button" onClick={goBack} className="text-c-muted font-medium text-sm hover:text-c-white transition-colors min-h-[48px] px-2">Back</button>
              ) : <div />}

              {currentStepIndex < totalSteps - 1 ? (
                <button type="button" onClick={goNext} disabled={!canProceed()} className="bg-c-gold text-c-black font-semibold px-8 py-3 text-sm tracking-widest uppercase hover:bg-c-gold-light active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed min-h-[48px]">
                  Continue
                </button>
              ) : (
                <button type="submit" disabled={!canProceed() || isSubmitting} className="bg-c-gold text-c-black font-semibold px-8 py-3 text-sm tracking-widest uppercase hover:bg-c-gold-light active:scale-[0.98] transition-all disabled:opacity-30 disabled:cursor-not-allowed min-h-[48px]">
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
