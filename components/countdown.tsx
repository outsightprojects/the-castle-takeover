'use client'

import { useState, useEffect } from 'react'

const EVENT_DATE = new Date('2026-08-28T14:00:00+02:00')

function calcTimeLeft() {
  const now = new Date()
  const diff = EVENT_DATE.getTime() - now.getTime()

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export function Countdown() {
  const [time, setTime] = useState(calcTimeLeft)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setInterval(() => setTime(calcTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [])

  const blocks = [
    { value: mounted ? time.days : null, label: 'Days' },
    { value: mounted ? time.hours : null, label: 'Hrs' },
    { value: mounted ? time.minutes : null, label: 'Min' },
    { value: mounted ? time.seconds : null, label: 'Sec' },
  ]

  return (
    <div className="flex gap-4 md:gap-6 justify-center" aria-label="Countdown to event">
      {blocks.map((block) => (
        <div key={block.label} className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl font-serif font-bold text-c-gold tabular-nums leading-none tracking-tight">
            {block.value !== null ? String(block.value).padStart(2, '0') : '--'}
          </span>
          <span className="text-c-dim text-[10px] md:text-xs font-mono tracking-[0.2em] uppercase mt-2">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  )
}
