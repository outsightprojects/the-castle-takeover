'use client'

import Link from 'next/link'

const galleryImages = [
  { src: '/images/schloss-1.jpg', alt: 'Schloss Dornburg exterior' },
  { src: '/images/schloss-2.jpg', alt: 'Schloss Dornburg garden terrace' },
  { src: '/images/schloss-3.jpg', alt: 'Schloss Dornburg grand hall' },
  { src: '/images/schloss-4.jpg', alt: 'Schloss Dornburg lake view' },
  { src: '/images/schloss-5.jpg', alt: 'Schloss Dornburg courtyard' },
  { src: '/images/schloss-6.jpg', alt: 'Schloss Dornburg evening' },
]

export default function VenuePage() {
  return (
    <div
      className="min-h-screen font-sans"
      style={{ background: '#F5E6C8' }}
    >
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
        <Link href="/" className="text-xl font-bold text-[#2D4A3E]" style={{ letterSpacing: '0.05em' }}>
          THE CASTLE TAKEOVER
        </Link>
        <div className="flex gap-8">
          {['HOME', 'ABOUT', 'VENUE', 'TICKETS', "FAQ'S"].map((item) => (
            <Link
              key={item}
              href={item === 'HOME' ? '/' : `/${item.toLowerCase().replace("'s", 's')}`}
              className="text-[#2D4A3E] font-semibold text-sm hover:text-[#E84B8A] transition-colors"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-8 py-8">

        {/* Venue Details */}
        <h2 className="text-4xl font-bold text-[#E84B8A] mb-8">Venue Details</h2>

        <div className="flex gap-10 items-start mb-20">
          {/* Map */}
          <div className="flex-shrink-0 w-[380px] h-[260px] rounded-lg overflow-hidden border border-[#c9b99a] shadow-md">
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
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h3 className="text-3xl font-bold text-[#2D4A3E] leading-tight">
                SCHLOSS<br />DORNBURG
              </h3>
              <p className="text-[#4A6B5D] text-base mt-3 leading-relaxed">
                Dornburg 1, 39264 Dornburg, Germany<br />
                2 hours from Berlin · directly on a quiet lake · near the Elbe
              </p>
            </div>

            <div className="border-2 border-[#2D4A3E] rounded-lg px-6 py-4 inline-block max-w-xs">
              <span className="text-[#2D4A3E] font-semibold text-lg">
                28 – 30 August 2026
              </span>
            </div>

            <a
              href="https://schloss-dornburg.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E84B8A] font-semibold text-sm hover:underline"
            >
              schloss-dornburg.de
            </a>
          </div>
        </div>

        {/* Gallery */}
        <h2 className="text-4xl font-bold text-[#E84B8A] mb-8">Gallery</h2>

        <div className="grid grid-cols-3 gap-4">
          {galleryImages.map((img) => (
            <div
              key={img.src}
              className="aspect-[4/3] rounded-lg overflow-hidden border border-[#c9b99a] shadow-sm"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Visit gallery link */}
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
      </main>

      {/* Footer */}
      <footer className="text-center text-[#4A6B5D] text-sm py-10 mt-12 border-t border-[#c9b99a]">
        <p>Join us for an unforgettable time and reserve a bed in a real castle</p>
        <p className="mt-1 font-semibold">thecastletakeover.de</p>
      </footer>
    </div>
  )
}
