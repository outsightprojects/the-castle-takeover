'use client'

import Link from 'next/link'
import { useState } from 'react'

const navItems = [
  { label: 'HOME', href: '/' },
  { label: 'ABOUT', href: '/about' },
  { label: 'VENUE', href: '/venue' },
  { label: 'RSVP', href: '/tickets' },
]

const galleryImages = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC03822_VSCO-vsSBtcFYAVCSxfu5puHaMMWQafFGwn.jpeg',
    alt: 'Schloss Dornburg front facade',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4616-wvde8nVBfmqH5dsOG8TjlTlQs5XWBC.jpeg',
    alt: 'Schloss Dornburg facade framed by trees',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6363-tCai6Eh7g82lDmAokMkZNuSw2vWyeM.jpeg',
    alt: 'Outdoor dining table set in front of Schloss Dornburg',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PHOTO-2025-08-31-13-45-14-lv1MmWGqlTSWsz6B265K45rdcl6jTT.jpg',
    alt: 'Castle entrance at night with party lighting',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4643-zaKmtTX3veSUwSVO2k0KrXWeocCujs.jpeg',
    alt: 'Grand chandelier beneath baroque painted ceiling',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SchlossDornburg-1-2wawD7dw6P6og2O9T190yHHfcgmTFu.png',
    alt: 'Party dancers in golden light inside Schloss Dornburg',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC03780_VSCO-2-utqXwSJOGKj8gWtNA48GUNCQ0Fu7dB.jpeg',
    alt: 'Ornate iron staircase railing with afternoon light',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5255-zloq7JyG72aMeeAiMuPynAMRUm3nhm.jpeg',
    alt: 'Yellow velvet sofa against distressed blue walls',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5251-t8PB1EK1GFMwIhFKNFKwq9f9hyzlhv.jpeg',
    alt: 'Open castle window looking out to birch trees',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/E97E0F2D-7A6A-4C74-A713-A9D6379FE261-K9GdWg3hA5seapXfYPl6nboP4rDaUH.jpeg',
    alt: 'Bedroom with purple throw and distressed blue walls',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC03786_VSCO-qCONnEif6g8Qs3dwrRf2zNdlC3pUKa.jpeg',
    alt: 'Interior staircase with ornate iron scrollwork',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SchlossDornburg-iLNfrZnNsVTxPTcJ5ziL3B7ee1a8dm.png',
    alt: 'Dramatic light rays through windows during an event',
  },
]

export default function VenuePage() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  return (
    <div className="min-h-screen font-sans relative overflow-hidden">
      {/* Wavy blue-gray background */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: '#6B7B8E',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='%235a6a7a' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content wrapper */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto w-full">
          <Link href="/" className="text-2xl font-bold text-white drop-shadow-md" style={{ letterSpacing: '0.05em' }}>
            THE CASTLE TAKEOVER
          </Link>
          <div className="flex gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() => setHoveredNav(item.label)}
                onMouseLeave={() => setHoveredNav(null)}
                className={`font-semibold text-sm transition-all duration-200 px-3 py-2 drop-shadow-sm ${
                  item.label === 'VENUE' ? 'text-[#FFE135]' : 'text-white hover:text-[#FFE135]'
                }`}
                style={{ transform: hoveredNav === item.label ? 'scale(1.1)' : 'scale(1)' }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center px-8 py-8 gap-8">
          {/* Video Card - at the top */}
          <div className="bg-[#D4726A] rounded-3xl p-6 md:p-8 max-w-5xl w-full border-4 border-[#2D4A3E] shadow-2xl">
            <h1 className="text-3xl font-bold text-white mb-4">Schloss Dornburg</h1>
            <div className="rounded-2xl overflow-hidden border-2 border-[#2D4A3E]">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto"
                src="/videos/background.mp4"
              />
            </div>
          </div>

          {/* Venue Details Card */}
          <div className="bg-[#D4726A] rounded-3xl p-6 md:p-8 max-w-5xl w-full border-4 border-[#2D4A3E] shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Location & Details</h2>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Map */}
              <div className="flex-shrink-0 w-full md:w-[320px] h-[200px] rounded-xl overflow-hidden border-2 border-[#2D4A3E]">
                <iframe
                  title="Schloss Dornburg map"
                  src="https://maps.google.com/maps?q=Schloss+Dornburg,+Dornburg,+Germany&z=13&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col gap-4">
                <div className="bg-white/20 rounded-xl p-4">
                  <h3 className="text-xl font-bold text-white mb-2">SCHLOSS DORNBURG</h3>
                  <p className="text-white/90 leading-relaxed">
                    Dornburg 1, 39264 Dornburg, Germany
                  </p>
                  <p className="text-white/70 text-sm mt-2">
                    2 hours from Berlin · directly on a quiet lake · near the Elbe
                  </p>
                </div>

                <div className="bg-white/20 rounded-xl p-4">
                  <span className="text-white font-semibold text-lg">
                    28 - 30 August 2026
                  </span>
                </div>

                <a
                  href="https://schloss-dornburg.de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FFE135] font-semibold hover:underline"
                >
                  schloss-dornburg.de
                </a>
              </div>
            </div>
          </div>

          {/* Gallery Card */}
          <div className="bg-[#D4726A] rounded-3xl p-6 md:p-8 max-w-5xl w-full border-4 border-[#2D4A3E] shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Gallery</h2>

            <div className="columns-2 md:columns-3 gap-3 space-y-3">
              {galleryImages.map((img) => (
                <div
                  key={img.src}
                  className="break-inside-avoid rounded-xl overflow-hidden border-2 border-white/20"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-auto block hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://schloss-dornburg.de/galerie"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#FFE135] text-[#2D4A3E] font-bold text-base px-8 py-3 rounded-lg border-2 border-[#2D4A3E] hover:scale-105 transition-transform shadow"
              >
                View Full Gallery
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-white/60 text-sm py-8">
          <p>Join us for an unforgettable time and reserve a bed in a real castle</p>
          <p className="mt-1 font-semibold text-white/80">thecastletakeover.de</p>
        </footer>
      </div>
    </div>
  )
}
