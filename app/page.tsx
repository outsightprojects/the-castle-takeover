import { HeroSection } from "@/components/hero-section"
import { LocationSection } from "@/components/location-section"
import { TravelSection } from "@/components/travel-section"
import { MapSection } from "@/components/map-section"
import { ArrivalNotes } from "@/components/arrival-notes"
import { Footer } from "@/components/footer"
import { StickyNav } from "@/components/sticky-nav"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <HeroSection />
      <LocationSection />
      <TravelSection />
      <MapSection />
      <ArrivalNotes />
      <Footer />
      <StickyNav />
    </div>
  )
}
