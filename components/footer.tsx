export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#2D1B4E] px-4 py-12">
      {/* Decorative confetti */}
      <div className="absolute left-10 top-4 h-3 w-3 rotate-45 bg-[#FF6B35]" />
      <div className="absolute left-20 top-8 h-2 w-2 rounded-full bg-[#4ECDC4]" />
      <div className="absolute left-32 top-3 h-2 w-4 rotate-12 bg-[#FFE66D]" />
      <div className="absolute right-10 top-6 h-3 w-3 rotate-12 bg-[#F38181]" />
      <div className="absolute right-24 top-10 h-2 w-2 rounded-full bg-[#95E1D3]" />
      <div className="absolute right-40 top-4 h-2 w-4 -rotate-12 bg-[#FFE66D]" />

      <div className="mx-auto max-w-4xl text-center">
        {/* Names with 40 */}
        <div className="mb-6">
          <h3 className="inline-block rounded-lg border-4 border-[#FF6B35] bg-[#FFE66D] px-6 py-3 text-2xl font-bold text-[#2D1B4E] shadow-[4px_4px_0px_#FF6B35] md:text-3xl">
            Cari &middot; Peter &middot; Georg &mdash; 40
          </h3>
        </div>

        {/* Tagline */}
        <p className="mb-4 text-lg text-[#95E1D3]">
          Celebrating 40 years and the people we&apos;ve met throughout our lives
        </p>

        {/* Invitation note */}
        <div className="inline-block rotate-[-1deg] rounded-lg border-2 border-[#F38181] bg-[#F38181]/20 px-4 py-2">
          <p className="text-sm font-medium text-[#F38181]">
            By invitation only
          </p>
        </div>

        {/* Date reminder */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="text-[#FFE66D]">28 &middot; 29 &middot; 30</span>
          <span className="text-white">August</span>
          <span className="text-[#4ECDC4]">2026</span>
        </div>

        {/* Castle silhouette decoration */}
        <div className="mt-8 flex justify-center opacity-30">
          <svg className="h-12 w-48 text-[#FFE66D]" viewBox="0 0 200 50" fill="currentColor">
            <rect x="0" y="30" width="20" height="20" />
            <rect x="0" y="20" width="8" height="10" />
            <rect x="12" y="20" width="8" height="10" />
            <rect x="30" y="20" width="30" height="30" />
            <rect x="30" y="10" width="10" height="10" />
            <rect x="50" y="10" width="10" height="10" />
            <rect x="70" y="25" width="20" height="25" />
            <rect x="70" y="15" width="8" height="10" />
            <rect x="82" y="15" width="8" height="10" />
            <rect x="100" y="15" width="40" height="35" />
            <rect x="100" y="5" width="12" height="10" />
            <rect x="128" y="5" width="12" height="10" />
            <rect x="150" y="25" width="25" height="25" />
            <rect x="150" y="15" width="10" height="10" />
            <rect x="165" y="15" width="10" height="10" />
            <rect x="180" y="30" width="20" height="20" />
            <rect x="180" y="20" width="8" height="10" />
            <rect x="192" y="20" width="8" height="10" />
          </svg>
        </div>
      </div>
    </footer>
  )
}
