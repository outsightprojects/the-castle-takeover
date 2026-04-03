'use client'

import { useRef, useEffect } from 'react'

export function VideoHero({
  src,
  poster,
  children,
}: {
  src: string
  poster: string
  children: React.ReactNode
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.play().catch(() => {})
  }, [])

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={poster}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src={src} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-c-black/70 via-c-black/55 to-c-black" />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  )
}
