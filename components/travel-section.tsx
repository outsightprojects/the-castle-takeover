import { Car, Train, Plane } from "lucide-react"

export function TravelSection() {
  const travelOptions = [
    {
      icon: Car,
      title: "By Car",
      color: "#FF6B35",
      bgColor: "#FFE4B5",
      rotation: "-rotate-2",
      content: [
        "Use navigation to Schloss Dornburg",
        "Address: Lindenweg 1, 39264 Gommern",
        "Parking available at the venue"
      ]
    },
    {
      icon: Train,
      title: "By Train",
      color: "#4ECDC4",
      bgColor: "#E8FAF8",
      rotation: "rotate-1",
      content: [
        "Nearest station: Prodel (~2.6 km)",
        "Short transfer to castle required",
        "Contact us for pickup coordination"
      ]
    },
    {
      icon: Plane,
      title: "By Air",
      color: "#F38181",
      bgColor: "#FDE8E8",
      rotation: "-rotate-1",
      content: [
        "Nearest airports: Leipzig/Halle, Berlin",
        "Continue via train or rental car",
        "~1.5h from either airport"
      ]
    }
  ]

  return (
    <section id="travel" className="relative overflow-hidden bg-gradient-to-b from-[#FFF8E7] to-[#FFE4B5] px-4 py-16 md:py-24">
      {/* Decorative clouds */}
      <div className="absolute left-10 top-10 h-16 w-32 rounded-full bg-white/60" />
      <div className="absolute left-20 top-14 h-12 w-20 rounded-full bg-white/60" />
      <div className="absolute right-20 top-20 h-14 w-28 rounded-full bg-white/50" />
      <div className="absolute right-16 top-24 h-10 w-16 rounded-full bg-white/50" />

      <div className="mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2 className="relative inline-block rotate-[1deg] border-4 border-[#2D1B4E] bg-[#4ECDC4] px-8 py-4 text-3xl font-bold text-white shadow-[6px_6px_0px_#2D1B4E] md:text-4xl">
            How to Get There
          </h2>
        </div>

        {/* Travel Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {travelOptions.map((option, index) => (
            <div
              key={option.title}
              className={`${option.rotation} border-4 border-[#2D1B4E] p-6 shadow-[6px_6px_0px_#2D1B4E] transition-all hover:rotate-0 hover:shadow-[8px_8px_0px_#2D1B4E]`}
              style={{ backgroundColor: option.bgColor }}
            >
              {/* Icon */}
              <div 
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#2D1B4E]"
                style={{ backgroundColor: option.color }}
              >
                <option.icon className="h-8 w-8 text-white" />
              </div>

              {/* Title */}
              <h3 className="mb-4 text-xl font-bold text-[#2D1B4E]">
                {option.title}
              </h3>

              {/* Content */}
              <ul className="space-y-2">
                {option.content.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#6B4E8E]">
                    <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full" style={{ backgroundColor: option.color }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
