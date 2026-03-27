"use client"

import { useState, useEffect } from "react"
import { MapPin, Navigation, Info, Home } from "lucide-react"

export function StickyNav() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero section
      setIsVisible(window.scrollY > window.innerHeight * 0.8)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const navItems = [
    { id: "top", icon: Home, label: "Top" },
    { id: "location", icon: MapPin, label: "Where" },
    { id: "travel", icon: Navigation, label: "Travel" },
    { id: "map", icon: MapPin, label: "Map" },
  ]

  return (
    <nav
      className={`fixed bottom-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      <div className="flex gap-2 rounded-full border-4 border-[#2D1B4E] bg-white/95 p-2 shadow-[4px_4px_0px_#2D1B4E] backdrop-blur-sm">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-bold transition-colors hover:bg-[#FFE66D] ${
              index === 0 ? "bg-[#FF6B35] text-white hover:bg-[#FF8555]" : "text-[#2D1B4E]"
            }`}
            aria-label={`Go to ${item.label}`}
          >
            <item.icon className="h-4 w-4" />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
