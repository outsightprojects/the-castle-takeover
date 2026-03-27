'use client'

import Link from 'next/link'

const galleryImages = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC03822_VSCO-vsSBtcFYAVCSxfu5puHaMMWQafFGwn.jpeg',
    alt: 'Schloss Dornburg front facade, cobblestone path and blue sky',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4616-wvde8nVBfmqH5dsOG8TjlTlQs5XWBC.jpeg',
    alt: 'Schloss Dornburg facade framed by trees',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_6363-tCai6Eh7g82lDmAokMkZNuSw2vWyeM.jpeg',
    alt: 'Outdoor dining table set with glasses in front of Schloss Dornburg',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/PHOTO-2025-08-31-13-45-14-lv1MmWGqlTSWsz6B265K45rdcl6jTT.jpg',
    alt: 'Castle entrance at night with dramatic red and blue party lighting',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4643-zaKmtTX3veSUwSVO2k0KrXWeocCujs.jpeg',
    alt: 'Grand chandelier beneath ornate baroque painted ceiling',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SchlossDornburg-1-2wawD7dw6P6og2O9T190yHHfcgmTFu.png',
    alt: 'Party dancers in hazy golden light inside Schloss Dornburg',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC03780_VSCO-2-utqXwSJOGKj8gWtNA48GUNCQ0Fu7dB.jpeg',
    alt: 'Ornate iron staircase railing with afternoon light on wooden floors',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5255-zloq7JyG72aMeeAiMuPynAMRUm3nhm.jpeg',
    alt: 'Yellow velvet sofa against distressed blue-painted walls',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_5251-t8PB1EK1GFMwIhFKNFKwq9f9hyzlhv.jpeg',
    alt: 'Open castle window looking out to autumn birch trees',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/E97E0F2D-7A6A-4C74-A713-A9D6379FE261-K9GdWg3hA5seapXfYPl6nboP4rDaUH.jpeg',
    alt: 'Bedroom with purple throw on white bed and distressed blue walls',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC03786_VSCO-qCONnEif6g8Qs3dwrRf2zNdlC3pUKa.jpeg',
    alt: 'Interior staircase through doorway with ornate iron scrollwork',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SchlossDornburg-iLNfrZnNsVTxPTcJ5ziL3B7ee1a8dm.png',
    alt: 'Dramatic light rays through tall windows during a Schloss Dornburg event',
  },
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

        <div className="columns-3 gap-4 space-y-4">
          {galleryImages.map((img) => (
            <div
              key={img.src}
              className="break-inside-avoid rounded-lg overflow-hidden border border-[#c9b99a] shadow-sm"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto block hover:scale-105 transition-transform duration-300"
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
