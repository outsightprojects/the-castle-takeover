'use client'

import { useState } from 'react'
import Link from 'next/link'

const TOTAL_CASTLE_BEDS = 40
const BEDS_TAKEN = 12 // This would come from a database in production

export default function TicketsPage() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    invitedBy: '',
    arrivalDay: '',
    accommodation: '',
    nights: 1,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'ABOUT', href: '/about' },
    { label: 'VENUE', href: '/venue' },
    { label: 'RSVP', href: '/tickets' },
    { label: "FAQ'S", href: '/faqs' },
  ]

  const bedsRemaining = TOTAL_CASTLE_BEDS - BEDS_TAKEN

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const calculateTotal = () => {
    if (formData.accommodation === 'castle') {
      return formData.nights * 90
    }
    return 0
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(180deg, #7B8FA1 0%, #8E9AAF 50%, #9BA8B4 100%)' }}>
        {/* Navigation */}
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
            <h2 className="text-3xl font-bold text-white mb-4">You&apos;re on the list!</h2>
            <p className="text-white/90 text-lg mb-6">
              Thank you for your RSVP, {formData.name}. We can&apos;t wait to celebrate with you at Schloss Dornburg!
            </p>
            {formData.accommodation === 'castle' && (
              <p className="text-[#FFE135] font-semibold">
                Castle bed reserved: {formData.nights} night(s) = €{calculateTotal()}
              </p>
            )}
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
      <main className="relative z-10 px-8 py-12 max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-5xl font-bold text-[#FFE135] text-center mb-4" style={{ textShadow: '2px 2px 0 #2D4A3E' }}>
          RSVP
        </h1>
        <p className="text-white text-center text-lg mb-12 max-w-2xl mx-auto">
          Join Cari, Peter & Georg for their 40th birthday celebration at Schloss Dornburg
        </p>

        {/* Bed Availability Banner */}
        <div className="bg-white/20 backdrop-blur rounded-xl p-4 mb-8 flex items-center justify-center gap-4 border border-white/30">
          <div className="text-white">
            <span className="font-semibold">Castle Beds Available:</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold text-[#FFE135]">{bedsRemaining}</span>
            <span className="text-white/80 text-sm">of {TOTAL_CASTLE_BEDS}</span>
          </div>
          <div className="w-32 h-3 bg-white/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#FFE135] rounded-full transition-all"
              style={{ width: `${(bedsRemaining / TOTAL_CASTLE_BEDS) * 100}%` }}
            />
          </div>
        </div>

        {/* RSVP Form Card */}
        <div className="relative">
          {/* Ticket stub shape */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#8E9AAF] rounded-full" />
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#8E9AAF] rounded-full" />
          
          <form 
            onSubmit={handleSubmit}
            className="bg-[#D4726A] rounded-3xl p-8 border-4 border-[#2D4A3E]"
          >
            {/* Dashed line separator */}
            <div className="border-t-2 border-dashed border-[#2D4A3E]/40 mb-8" />

            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-white font-semibold mb-2">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-[#2D4A3E] font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE135]"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
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

              {/* Address */}
              <div className="md:col-span-2">
                <label className="block text-white font-semibold mb-2">Address *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/90 text-[#2D4A3E] font-medium focus:outline-none focus:ring-2 focus:ring-[#FFE135]"
                  placeholder="Your full address"
                />
              </div>

              {/* Invited By */}
              <div>
                <label className="block text-white font-semibold mb-2">Invited by *</label>
                <div className="flex gap-3">
                  {['Georg', 'Cari', 'Peter'].map((host) => (
                    <label
                      key={host}
                      className={`flex-1 text-center py-3 px-4 rounded-lg cursor-pointer transition-all font-semibold ${
                        formData.invitedBy === host
                          ? 'bg-[#FFE135] text-[#2D4A3E] border-2 border-[#2D4A3E]'
                          : 'bg-white/30 text-white border-2 border-transparent hover:bg-white/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="invitedBy"
                        value={host}
                        checked={formData.invitedBy === host}
                        onChange={(e) => setFormData({ ...formData, invitedBy: e.target.value })}
                        className="sr-only"
                        required
                      />
                      {host}
                    </label>
                  ))}
                </div>
              </div>

              {/* Arrival Day */}
              <div>
                <label className="block text-white font-semibold mb-2">Arriving on *</label>
                <div className="flex gap-3">
                  {['Friday', 'Saturday', 'Sunday'].map((day) => (
                    <label
                      key={day}
                      className={`flex-1 text-center py-3 px-2 rounded-lg cursor-pointer transition-all font-semibold text-sm ${
                        formData.arrivalDay === day
                          ? 'bg-[#FFE135] text-[#2D4A3E] border-2 border-[#2D4A3E]'
                          : 'bg-white/30 text-white border-2 border-transparent hover:bg-white/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="arrivalDay"
                        value={day}
                        checked={formData.arrivalDay === day}
                        onChange={(e) => setFormData({ ...formData, arrivalDay: e.target.value })}
                        className="sr-only"
                        required
                      />
                      {day}
                    </label>
                  ))}
                </div>
              </div>

              {/* Accommodation */}
              <div className="md:col-span-2">
                <label className="block text-white font-semibold mb-3">Accommodation *</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {[
                    { value: 'castle', label: 'Castle Bed', price: '€90/night', limited: true },
                    { value: 'tent', label: 'Bring a Tent', price: 'Free', limited: false },
                    { value: 'camper', label: 'Camper/RV', price: 'Free', limited: false },
                    { value: 'village', label: 'Village Nearby', price: 'Self-arrange', limited: false },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all ${
                        formData.accommodation === option.value
                          ? 'bg-[#FFE135] text-[#2D4A3E] border-2 border-[#2D4A3E]'
                          : 'bg-white/30 text-white border-2 border-transparent hover:bg-white/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="accommodation"
                          value={option.value}
                          checked={formData.accommodation === option.value}
                          onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                          className="sr-only"
                          required
                        />
                        <span className="font-semibold">{option.label}</span>
                        {option.limited && (
                          <span className="text-xs bg-[#2D4A3E] text-white px-2 py-0.5 rounded-full">
                            {bedsRemaining} left
                          </span>
                        )}
                      </div>
                      <span className={`font-bold ${formData.accommodation === option.value ? 'text-[#2D4A3E]' : 'text-[#FFE135]'}`}>
                        {option.price}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Number of Nights (only show if castle selected) */}
              {formData.accommodation === 'castle' && (
                <div className="md:col-span-2">
                  <label className="block text-white font-semibold mb-2">How many nights?</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      {[1, 2, 3].map((n) => (
                        <label
                          key={n}
                          className={`w-12 h-12 flex items-center justify-center rounded-lg cursor-pointer transition-all font-bold text-lg ${
                            formData.nights === n
                              ? 'bg-[#FFE135] text-[#2D4A3E] border-2 border-[#2D4A3E]'
                              : 'bg-white/30 text-white border-2 border-transparent hover:bg-white/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name="nights"
                            value={n}
                            checked={formData.nights === n}
                            onChange={() => setFormData({ ...formData, nights: n })}
                            className="sr-only"
                          />
                          {n}
                        </label>
                      ))}
                    </div>
                    <div className="text-white">
                      <span className="text-2xl font-bold text-[#FFE135]">€{formData.nights * 90}</span>
                      <span className="text-white/80 ml-2">total</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dashed line separator */}
            <div className="border-t-2 border-dashed border-[#2D4A3E]/40 my-8" />

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#FFE135] text-[#2D4A3E] font-bold text-xl px-12 py-4 rounded-xl border-2 border-[#2D4A3E] hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? 'Submitting...' : 'RSVP Now'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer note */}
        <p className="text-white/70 text-center text-sm mt-8">
          Questions? Contact us at hello@thecastletakeover.de
        </p>
      </main>
    </div>
  )
}
