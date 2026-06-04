'use client'

// ─── Live Accommodation List for /venue ─────────────────────────────────────
// Pulls real availability from /api/beds (same source as the RSVP form) so
// "Fully booked" and "Only N left" stay in sync with the Notion bed inventory.
// Static items (Camping, Self-arranged) have no capacity → no badge.

import { useEffect, useState } from 'react'
import {
  BedDouble,
  Tent,
  Home,
  MapPin,
  type LucideIcon,
} from 'lucide-react'

const LOW_THRESHOLD = 3 // ≤ this many beds left → "Only N left" urgency badge

interface VenueStatus {
  name: string
  price: number
  total: number | null
  taken: number
  available: number | null
}

interface BedData {
  venues: VenueStatus[]
}

interface AccommodationItem {
  apiName: string | null // matches VenueStatus.name; null = no live capacity tracking
  icon: LucideIcon
  title: string
  desc: string
  tag: string
}

const ITEMS: AccommodationItem[] = [
  {
    apiName: 'Castle',
    icon: BedDouble,
    title: 'In the Castle',
    desc: 'Around 90 beds — mostly shared rooms, some doubles, a few singles. We assign based on the full guest mix.',
    tag: '€90 pp',
  },
  {
    apiName: 'Gelbes Haus',
    icon: Home,
    title: 'Gelbes Haus',
    desc: 'Village house, ~5 min from the castle. A 5-person room (two shared double beds + one single bed) plus a double room with a shared double bed.',
    tag: '€75 pp',
  },
  {
    apiName: 'Schlosskrug',
    icon: Home,
    title: 'Schlosskrug',
    desc: 'Village inn, ~5 min from the castle. Two double rooms, each with one shared double bed — perfect for a couple or close friends.',
    tag: '€50 pp',
  },
  {
    apiName: 'Deichgraf',
    icon: Home,
    title: 'Deichgraf Elbpension',
    desc: 'Premium pension nearby, ~5 min from the castle. Two double rooms, each with one shared double bed.',
    tag: '€123 pp',
  },
  {
    apiName: null,
    icon: Tent,
    title: 'Camping',
    desc: 'Bring your tent or camper — plenty of space on the grounds. Castle bathrooms available.',
    tag: 'Free',
  },
  {
    apiName: null,
    icon: MapPin,
    title: 'Self-arranged',
    desc: 'Sort out your own bed (hotel, friend’s place, Airbnb). You only pay the event fee.',
    tag: 'Self',
  },
]

export function VenueAccommodationList() {
  const [beds, setBeds] = useState<BedData | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch('/api/beds')
      .then((res) => res.json())
      .then((data: BedData) => {
        if (!cancelled) setBeds(data)
      })
      .catch(() => {
        if (!cancelled) setBeds({ venues: [] })
      })
    return () => {
      cancelled = true
    }
  }, [])

  const lookup = (apiName: string | null): VenueStatus | undefined =>
    apiName ? beds?.venues.find((v) => v.name === apiName) : undefined

  return (
    <div className="space-y-0">
      {ITEMS.map((item, i) => {
        const v = lookup(item.apiName)
        const available = v?.available ?? null
        const isFull = available !== null && available <= 0
        const isLow =
          available !== null && available > 0 && available <= LOW_THRESHOLD

        return (
          <div
            key={item.title}
            className={`flex items-start justify-between gap-4 py-7 ${
              i < ITEMS.length - 1 ? 'border-b border-c-border' : ''
            } ${isFull ? 'opacity-50' : ''}`}
          >
            <div className="flex items-start gap-4 min-w-0">
              <item.icon
                className={`shrink-0 mt-0.5 ${
                  isFull ? 'text-c-dim' : 'text-c-gold'
                }`}
                size={20}
                strokeWidth={1.5}
              />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    className={`font-semibold tracking-tight ${
                      isFull
                        ? 'text-c-dim line-through'
                        : 'text-c-white'
                    }`}
                  >
                    {item.title}
                  </h3>
                  {isFull && (
                    <span className="font-mono text-[9px] tracking-[0.25em] uppercase bg-c-terracotta/15 text-c-terracotta-light border border-c-terracotta/40 px-2 py-0.5">
                      Fully booked
                    </span>
                  )}
                  {isLow && (
                    <span className="font-mono text-[9px] tracking-[0.25em] uppercase bg-c-gold/10 text-c-gold border border-c-gold/40 px-2 py-0.5">
                      Only {available} left
                    </span>
                  )}
                </div>
                <p className="text-c-muted text-sm mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
            <span
              className={`font-mono text-xs tracking-wider shrink-0 mt-1 ${
                isFull
                  ? 'text-c-dim line-through'
                  : 'text-c-gold'
              }`}
            >
              {item.tag}
            </span>
          </div>
        )
      })}
    </div>
  )
}
