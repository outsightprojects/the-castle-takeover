"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"

export function HeroSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Gemini_Generated_Image_qp0sxnqp0sxnqp0s.png-qbCevOjxCNwTB0RwQ7qZO6JhQhhoG8.jpeg"
          alt="Castle Birthday Bash - Illustrated poster showing a vibrant pool party at Schloss Dornburg with musicians, bounce castles, and celebrating guests"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFF8E7]/90" />
      </div>

      {/* Floating CTA Buttons */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col gap-4 sm:flex-row">
        <Button
          onClick={() => scrollToSection("map")}
          className="group relative rotate-[-2deg] border-4 border-[#2D1B4E] bg-[#FF6B35] px-6 py-6 text-lg font-bold text-white shadow-[4px_4px_0px_#2D1B4E] transition-all hover:rotate-0 hover:bg-[#FF8555] hover:shadow-[6px_6px_0px_#2D1B4E]"
        >
          <MapPin className="mr-2 h-5 w-5" />
          Open Map
        </Button>
        <Button
          onClick={() => scrollToSection("travel")}
          className="group relative rotate-[2deg] border-4 border-[#2D1B4E] bg-[#4ECDC4] px-6 py-6 text-lg font-bold text-white shadow-[4px_4px_0px_#2D1B4E] transition-all hover:rotate-0 hover:bg-[#6ED9D2] hover:shadow-[6px_6px_0px_#2D1B4E]"
        >
          <Navigation className="mr-2 h-5 w-5" />
          How to Get There
        </Button>
      </div>

      {/* Decorative floating elements */}
      <div className="pointer-events-none absolute left-4 top-4 z-10 hidden animate-bounce md:block">
        <div className="rounded-full border-4 border-[#2D1B4E] bg-[#FFE66D] px-4 py-2 text-sm font-bold text-[#2D1B4E] shadow-[3px_3px_0px_#2D1B4E]">
          40th Birthday!
        </div>
      </div>
    </section>
  )
}
