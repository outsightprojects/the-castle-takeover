import { Info, Waves, BedDouble, Clock } from "lucide-react"

export function ArrivalNotes() {
  const notes = [
    {
      icon: Clock,
      text: "Plan your final transfer from the train station or airport"
    },
    {
      icon: Waves,
      text: "The venue includes a castle and pool setting - bring swimwear!"
    },
    {
      icon: BedDouble,
      text: "Reserve a bed in the castle at nosexinthepool.com"
    },
    {
      icon: Info,
      text: "More details about schedules and activities coming soon"
    }
  ]

  return (
    <section className="relative bg-gradient-to-b from-[#FFE4B5] to-[#FFF8E7] px-4 py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute left-0 top-1/4 h-20 w-20 -translate-x-1/2 rounded-full bg-[#F38181]/20" />
      <div className="absolute bottom-1/4 right-0 h-16 w-16 translate-x-1/2 rounded-full bg-[#4ECDC4]/20" />

      <div className="mx-auto max-w-3xl">
        {/* Section Title */}
        <div className="mb-12 text-center">
          <h2 className="relative inline-block rotate-[1deg] border-4 border-[#2D1B4E] bg-[#95E1D3] px-8 py-4 text-3xl font-bold text-[#2D1B4E] shadow-[6px_6px_0px_#2D1B4E] md:text-4xl">
            Good to Know
          </h2>
        </div>

        {/* Notes Grid */}
        <div className="space-y-4">
          {notes.map((note, index) => (
            <div
              key={index}
              className={`flex items-start gap-4 border-4 border-[#2D1B4E] bg-white p-4 shadow-[4px_4px_0px_#2D1B4E] transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2D1B4E] ${
                index % 2 === 0 ? "rotate-[-0.5deg]" : "rotate-[0.5deg]"
              }`}
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#2D1B4E] bg-[#FFE66D]">
                <note.icon className="h-6 w-6 text-[#2D1B4E]" />
              </div>
              <p className="pt-2 text-lg text-[#6B4E8E]">{note.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
