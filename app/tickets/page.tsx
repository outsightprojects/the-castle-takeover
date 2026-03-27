'use client'

import { useState } from 'react'
import Link from 'next/link'

const TOTAL_CASTLE_BEDS = 90
const VILLAGE_BEDS = 70
const BEDS_TAKEN_CASTLE = 23
const BEDS_TAKEN_VILLAGE = 12

export default function RSVPPage() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    // Step 1: Attendance
    attendance: '',
    plusOne: false,
    plusOneName: '',
    
    // Step 2: Arrival & Stay
    arrivalDay: '',
    stayDuration: '',
    
    // Step 3: Accommodation
    stayingOvernight: '',
    accommodationPreference: '',
    
    // Step 4: Contribution
    contribution: 90,
    
    // Step 5: Contact
    name: '',
    email: '',
    phone: '',
    invitedBy: '',
    notes: '',
  })

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'VENUE', href: '/venue' },
    { label: 'RSVP', href: '/tickets' },
    { label: "FAQ'S", href: '/faqs' },
  ]

  const castleBedsRemaining = TOTAL_CASTLE_BEDS - BEDS_TAKEN_CASTLE
  const villageBedsRemaining = VILLAGE_BEDS - BEDS_TAKEN_VILLAGE

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.attendance !== ''
      case 2:
        return formData.arrivalDay !== '' && formData.stayDuration !== ''
      case 3:
        return formData.stayingOvernight !== '' && 
          (formData.stayingOvernight === 'no' || formData.accommodationPreference !== '')
      case 4:
        return formData.contribution >= 20
      case 5:
        return formData.name !== '' && formData.email !== '' && formData.invitedBy !== ''
      default:
        return false
    }
  }

  const totalSteps = 5

  // Success screen
  if (isSubmitted) {
    return (
      <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(180deg, #7B8FA1 0%, #8E9AAF 50%, #9BA8B4 100%)' }}>
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

        <main className="flex flex-col items-center justify-center px-8 py-20">
          <div className="bg-[#D4726A] rounded-3xl p-12 max-w-lg text-center border-4 border-[#2D4A3E]">
            <h2 className="text-3xl font-bold text-white mb-4">You&apos;re in!</h2>
            <p className="text-white/90 text-lg mb-6">
              Thank you, {formData.name}! We&apos;re so excited to have you join us at Schloss Dornburg.
            </p>
            <p className="text-white/80 text-sm mb-4">
              We&apos;ll be in touch with more details as the event approaches.
            </p>
            {formData.plusOne && formData.plusOneName && (
              <p className="text-[#FFE135] font-medium mb-4">
                + {formData.plusOneName} is coming too!
              </p>
            )}
            <div className="bg-white/20 rounded-lg p-4 mt-6">
              <p className="text-white/90 text-sm">Your contribution</p>
              <p className="text-3xl font-bold text-[#FFE135]">{'\u20AC'}{formData.contribution}</p>
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

  return (
    <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(180deg, #7B8FA1 0%, #8E9AAF 50%, #9BA8B4 100%)' }}>
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
        <h1 className="text-5xl font-bold text-[#FFE135] text-center mb-4" style={{ textShadow: '2px 2px 0 #2D4A3E' }}>
          Join Us
        </h1>
        <p className="text-white text-center text-lg mb-8 max-w-xl mx-auto">
          This is not just a party — it&apos;s a shared weekend with friends old and new.
        </p>

        {/* Progress indicator */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === step ? 'w-8 bg-[#FFE135]' : s < step ? 'w-4 bg-[#FFE135]/60' : 'w-4 bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit}>
          <div className="bg-[#D4726A] rounded-3xl p-8 border-4 border-[#2D4A3E] min-h-[400px] flex flex-col">
            
            {/* Step 1: Attendance */}
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
                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                        className="sr-only"
                      />
                      <span className="font-semibold">{option.label}</span>
                    </label>
                  ))}
                </div>

                {formData.attendance && (
                  <div className="border-t border-white/20 pt-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.plusOne}
                        onChange={(e) => setFormData({ ...formData, plusOne: e.target.checked, plusOneName: '' })}
                        className="w-5 h-5 rounded accent-[#FFE135]"
                      />
                      <span className="text-white font-medium">I&apos;m bringing a +1</span>
                    </label>
                    {formData.plusOne && (
                      <input
                        type="text"
                        value={formData.plusOneName}
                        onChange={(e) => setFormData({ ...formData, plusOneName: e.target.value })}
                        placeholder="Their name"
                        className="mt-3 w-full px-4 py-3 rounded-lg bg-white/90 text-[#2D4A3E] font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE135]"
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Arrival & Stay */}
            {step === 2 && (
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">When will you be there?</h2>
                <p className="text-white/80 mb-6">Help us plan food, logistics, and the weekend flow</p>
                
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-3">When do you plan to arrive?</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'friday', label: 'Friday' },
                      { value: 'saturday', label: 'Saturday' },
                      { value: 'unsure-arrival', label: 'Not sure yet' },
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
                            // Clear two-nights if switching to Saturday since it's not available
                            const invalidCombo = newArrival === 'saturday' && formData.stayDuration === 'two-nights'
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
                  <label className="block text-white font-semibold mb-3">How long will you stay?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'day-only', label: 'Just for the day', disabledWhen: [] },
                      { value: 'one-night', label: 'One night', disabledWhen: [] },
                      { value: 'two-nights', label: 'Two nights (Fri–Sun)', disabledWhen: ['saturday'] },
                      { value: 'unsure-stay', label: 'Not sure yet', disabledWhen: [] },
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
                            onChange={(e) => setFormData({ ...formData, stayDuration: e.target.value })}
                            className="sr-only"
                          />
                          <span className="font-semibold text-sm">{option.label}</span>
                        </label>
                      )
                    })}
                  </div>
                  {formData.arrivalDay === 'saturday' && (
                    <p className="mt-3 text-[#FFE135] text-sm">
                      Arriving Saturday means one night maximum — the event ends Sunday.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Accommodation */}
            {step === 3 && (
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Where will you sleep?</h2>
                <p className="text-white/80 mb-6">We&apos;ll coordinate based on preferences — this isn&apos;t a hard booking</p>
                
                <div className="mb-6">
                  <label className="block text-white font-semibold mb-3">Do you plan to stay overnight?</label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'yes', label: 'Yes' },
                      { value: 'no', label: 'No, just visiting' },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`text-center p-4 rounded-xl cursor-pointer transition-all ${
                          formData.stayingOvernight === option.value
                            ? 'bg-[#FFE135] text-[#2D4A3E] border-2 border-[#2D4A3E]'
                            : 'bg-white/20 text-white border-2 border-transparent hover:bg-white/30'
                        }`}
                      >
                        <input
                          type="radio"
                          name="stayingOvernight"
                          value={option.value}
                          checked={formData.stayingOvernight === option.value}
                          onChange={(e) => setFormData({ ...formData, stayingOvernight: e.target.value, accommodationPreference: '' })}
                          className="sr-only"
                        />
                        <span className="font-semibold">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {formData.stayingOvernight === 'yes' && (
                  <div>
                    <label className="block text-white font-semibold mb-3">Accommodation preference</label>
                    <div className="space-y-3">
                      {[
                        { 
                          value: 'castle', 
                          label: 'Castle', 
                          desc: 'Sleep in the castle itself',
                          availability: `${castleBedsRemaining} of ${TOTAL_CASTLE_BEDS} beds available`,
                        },
                        { 
                          value: 'village', 
                          label: 'Village nearby', 
                          desc: '5 min away, we help coordinate',
                          availability: `${villageBedsRemaining} of ${VILLAGE_BEDS} beds available`,
                        },
                        { 
                          value: 'camping', 
                          label: 'Camping', 
                          desc: 'Tent or camper on the grounds',
                          availability: 'Plenty of space',
                        },
                        { 
                          value: 'self', 
                          label: 'I\'ll arrange my own', 
                          desc: 'Hotel, Airbnb, etc.',
                          availability: null,
                        },
                      ].map((option) => (
                        <label
                          key={option.value}
                          className={`block p-4 rounded-xl cursor-pointer transition-all ${
                            formData.accommodationPreference === option.value
                              ? 'bg-[#FFE135] text-[#2D4A3E] border-2 border-[#2D4A3E]'
                              : 'bg-white/20 text-white border-2 border-transparent hover:bg-white/30'
                          }`}
                        >
                          <input
                            type="radio"
                            name="accommodationPreference"
                            value={option.value}
                            checked={formData.accommodationPreference === option.value}
                            onChange={(e) => setFormData({ ...formData, accommodationPreference: e.target.value })}
                            className="sr-only"
                          />
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="font-semibold block">{option.label}</span>
                              <span className={`text-sm ${formData.accommodationPreference === option.value ? 'text-[#2D4A3E]/70' : 'text-white/70'}`}>
                                {option.desc}
                              </span>
                            </div>
                            {option.availability && (
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                formData.accommodationPreference === option.value
                                  ? 'bg-[#2D4A3E]/20 text-[#2D4A3E]'
                                  : 'bg-white/20 text-white/80'
                              }`}>
                                {option.availability}
                              </span>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Contribution */}
            {step === 4 && (
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Solidarity Contribution</h2>
                <p className="text-white/80 mb-6">
                  This weekend has real costs — venue, food, drinks, music, and more. 
                  We&apos;re asking everyone to contribute what they can.
                </p>

                <div className="bg-white/10 rounded-xl p-5 mb-6">
                  <p className="text-white/90 text-sm mb-2">
                    <strong>How this works:</strong> Our target is around {'\u20AC'}90 per person on average. 
                    If that&apos;s comfortable for you, great. If you can contribute more, it helps others. 
                    If less works better for you, that&apos;s completely okay — no questions asked.
                  </p>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between items-end mb-3">
                    <label className="text-white font-semibold">Your contribution</label>
                    <span className="text-4xl font-bold text-[#FFE135]">{'\u20AC'}{formData.contribution}</span>
                  </div>
                  
                  <input
                    type="range"
                    min="20"
                    max="200"
                    step="10"
                    value={formData.contribution}
                    onChange={(e) => setFormData({ ...formData, contribution: parseInt(e.target.value) })}
                    className="w-full h-3 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #FFE135 0%, #FFE135 ${((formData.contribution - 20) / 180) * 100}%, rgba(255,255,255,0.3) ${((formData.contribution - 20) / 180) * 100}%, rgba(255,255,255,0.3) 100%)`,
                    }}
                  />
                  
                  <div className="flex justify-between text-white/60 text-sm mt-2">
                    <span>{'\u20AC'}20</span>
                    <span className="text-white/80">suggested: {'\u20AC'}90</span>
                    <span>{'\u20AC'}200+</span>
                  </div>
                </div>

                {formData.contribution >= 120 && (
                  <p className="text-[#FFE135] text-sm text-center">
                    Thank you for your generosity — this helps make the weekend accessible for everyone.
                  </p>
                )}
                {formData.contribution < 60 && (
                  <p className="text-white/80 text-sm text-center">
                    No worries — we&apos;re glad you&apos;re joining us regardless.
                  </p>
                )}
              </div>
            )}

            {/* Step 5: Contact */}
            {step === 5 && (
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Almost there!</h2>
                <p className="text-white/80 mb-6">Just a few details so we can stay in touch</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-semibold mb-2">Your name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/90 text-[#2D4A3E] font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE135]"
                      placeholder="Your full name"
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
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Phone (optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/90 text-[#2D4A3E] font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE135]"
                      placeholder="For last-minute updates"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Who invited you? *</label>
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
                            onChange={(e) => setFormData({ ...formData, invitedBy: e.target.value })}
                            className="sr-only"
                          />
                          {host}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-white font-semibold mb-2">Anything else? (optional)</label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-white/90 text-[#2D4A3E] font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE135] resize-none"
                      rows={3}
                      placeholder="Dietary restrictions, questions, or just say hi..."
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="text-white font-semibold hover:text-[#FFE135] transition-colors"
                >
                  Back
                </button>
              ) : (
                <div />
              )}

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="bg-[#FFE135] text-[#2D4A3E] font-bold px-8 py-3 rounded-lg border-2 border-[#2D4A3E] hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Continue
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!canProceed() || isSubmitting}
                  className="bg-[#FFE135] text-[#2D4A3E] font-bold px-8 py-3 rounded-lg border-2 border-[#2D4A3E] hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? 'Submitting...' : 'Count me in!'}
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Step indicator text */}
        <p className="text-white/50 text-center text-sm mt-4">
          Step {step} of {totalSteps}
        </p>
      </main>
    </div>
  )
}
