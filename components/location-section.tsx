import { MapPin } from "lucide-react"

export function LocationSection() {
  return (
    <section id="location" className="relative bg-[#FFF8E7] px-4 py-16 md:py-24">
      {/* Decorative background elements */}
      <div className="absolute left-0 top-0 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFE66D]/30" />
      <div className="absolute right-0 top-1/2 h-24 w-24 translate-x-1/2 rounded-full bg-[#4ECDC4]/20" />
      
      <div className="mx-auto max-w-4xl">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="relative inline-block rotate-[-1deg] border-4 border-[#2D1B4E] bg-[#F38181] px-8 py-4 text-3xl font-bold text-white shadow-[6px_6px_0px_#2D1B4E] md:text-4xl">
            Where is this happening?
          </h2>
        </div>

        {/* Location Card */}
        <div className="relative mx-auto max-w-2xl rotate-[1deg] border-4 border-[#2D1B4E] bg-white p-8 shadow-[8px_8px_0px_#2D1B4E] transition-transform hover:rotate-0">
          {/* Castle Icon */}
          <div className="mb-6 flex justify-center">
            <svg className="h-24 w-24 text-[#FF6B35]" viewBox="0 0 100 100" fill="currentColor">
              <rect x="10" y="60" width="20" height="40" />
              <rect x="40" y="40" width="20" height="60" />
              <rect x="70" y="60" width="20" height="40" />
              <rect x="5" y="50" width="10" height="10" />
              <rect x="25" y="50" width="10" height="10" />
              <rect x="35" y="30" width="10" height="10" />
              <rect x="55" y="30" width="10" height="10" />
              <rect x="65" y="50" width="10" height="10" />
              <rect x="85" y="50" width="10" height="10" />
              <rect x="45" y="70" width="10" height="30" fill="#2D1B4E" />
            </svg>
          </div>

          <h3 className="mb-4 text-center text-2xl font-bold text-[#2D1B4E] md:text-3xl">
            Schloss Dornburg
          </h3>
          
          <div className="flex items-center justify-center gap-2 text-lg text-[#6B4E8E]">
            <MapPin className="h-5 w-5 text-[#FF6B35]" />
            <address className="not-italic">
              Lindenweg 1, 39264 Gommern
            </address>
          </div>

          {/* Decorative signpost */}
          <div className="absolute -right-4 -top-4 rotate-12 rounded-lg border-2 border-[#2D1B4E] bg-[#95E1D3] px-3 py-1 text-sm font-bold text-[#2D1B4E]">
            This way!
          </div>
        </div>
      </div>
    </section>
  )
}
