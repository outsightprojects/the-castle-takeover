import { ExternalLink, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"

export function MapSection() {
  const googleMapsUrl = "https://www.google.com/maps/place/Schloss+Dornburg/@52.0183,11.8347,17z"
  
  return (
    <section id="map" className="relative bg-[#87CEEB] px-4 py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute left-5 top-10 h-20 w-40 rounded-full bg-white/40" />
      <div className="absolute left-12 top-16 h-14 w-24 rounded-full bg-white/40" />
      <div className="absolute bottom-20 right-10 h-16 w-32 rounded-full bg-white/30" />
      <div className="absolute bottom-16 right-20 h-10 w-20 rounded-full bg-white/30" />

      <div className="mx-auto max-w-4xl">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="relative inline-block rotate-[-1deg] border-4 border-[#2D1B4E] bg-[#FFE66D] px-8 py-4 text-3xl font-bold text-[#2D1B4E] shadow-[6px_6px_0px_#2D1B4E] md:text-4xl">
            Find Us on the Map
          </h2>
        </div>

        {/* Map Container */}
        <div className="relative rotate-[0.5deg] border-4 border-[#2D1B4E] bg-white p-4 shadow-[8px_8px_0px_#2D1B4E]">
          {/* Stylized Map Frame */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border-4 border-[#2D1B4E] bg-[#95E1D3]">
            {/* Illustrated map background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                {/* Castle illustration */}
                <svg className="mx-auto mb-4 h-32 w-32 text-[#FF6B35]" viewBox="0 0 100 100" fill="currentColor">
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
                
                {/* Decorative roads */}
                <div className="absolute bottom-10 left-0 right-0 h-3 bg-[#FFE66D]" />
                <div className="absolute bottom-0 left-1/2 h-20 w-3 -translate-x-1/2 bg-[#FFE66D]" />
                
                {/* Map pin */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full animate-bounce">
                  <MapPin className="h-12 w-12 text-[#FF6B35] drop-shadow-lg" fill="#FF6B35" />
                </div>

                {/* Trees */}
                <div className="absolute bottom-14 left-10">
                  <div className="h-8 w-8 rounded-full bg-[#4ECDC4]" />
                  <div className="mx-auto -mt-1 h-4 w-2 bg-[#8B4513]" />
                </div>
                <div className="absolute bottom-14 right-10">
                  <div className="h-8 w-8 rounded-full bg-[#4ECDC4]" />
                  <div className="mx-auto -mt-1 h-4 w-2 bg-[#8B4513]" />
                </div>
                <div className="absolute bottom-16 left-24">
                  <div className="h-6 w-6 rounded-full bg-[#95E1D3]" />
                  <div className="mx-auto -mt-1 h-3 w-1.5 bg-[#8B4513]" />
                </div>
              </div>
            </div>

            {/* Location label */}
            <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-lg border-2 border-[#2D1B4E] bg-white px-4 py-2 font-bold text-[#2D1B4E]">
              Schloss Dornburg
            </div>
          </div>

          {/* Address and CTA */}
          <div className="mt-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 text-[#6B4E8E]">
              <MapPin className="h-5 w-5 text-[#FF6B35]" />
              <span className="font-medium">Lindenweg 1, 39264 Gommern</span>
            </div>
            
            <Button
              asChild
              className="rotate-[-1deg] border-4 border-[#2D1B4E] bg-[#FF6B35] px-6 py-3 font-bold text-white shadow-[4px_4px_0px_#2D1B4E] transition-all hover:rotate-0 hover:bg-[#FF8555] hover:shadow-[6px_6px_0px_#2D1B4E]"
            >
              <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in Google Maps
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
