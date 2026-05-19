import { Client } from '@notionhq/client'
import { NextResponse } from 'next/server'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const GUEST_DS_ID = process.env.NOTION_GUEST_DS_ID!
const BED_INVENTORY_DS_ID = process.env.NOTION_BED_INVENTORY_DS_ID!

// Venue-Preise (Quelle: Event Konfiguration in Notion).
// Hardcoded hier als Fallback und für schnelle Antworten ohne extra Notion-Roundtrip.
// Wenn ihr Preise ändert: Notion Event Konfig + hier synchron halten.
const VENUE_PRICES: Record<string, number> = {
  Castle: 90,
  'Gelbes Haus': 75,
  Schlosskrug: 50,
  Deichgraf: 123,
  Camping: 0,
  'Self-Provided': 0,
}

// Reihenfolge im Frontend
const VENUE_ORDER = [
  'Castle',
  'Gelbes Haus',
  'Schlosskrug',
  'Deichgraf',
  'Camping',
  'Self-Provided',
] as const

// Camping/Self-Provided sind kapazitäts-unbegrenzt
const UNLIMITED_VENUES = new Set(['Camping', 'Self-Provided'])

interface VenueStatus {
  name: string
  price: number
  total: number | null // null = unbegrenzt
  taken: number
  available: number | null // null = unbegrenzt
}

export async function GET() {
  try {
    // 1) Bed Inventory: wie viele physische Betten existieren pro Venue?
    const totals: Record<string, number> = {}
    let bedCursor: string | undefined = undefined
    do {
      const bedResp: any = await notion.dataSources.query({
        data_source_id: BED_INVENTORY_DS_ID,
        start_cursor: bedCursor,
        page_size: 100,
      })
      for (const page of bedResp.results) {
        if (!('properties' in page)) continue
        const venue = (page.properties as any)['Venue']?.select?.name
        if (!venue) continue
        totals[venue] = (totals[venue] || 0) + 1
      }
      bedCursor = bedResp.has_more ? bedResp.next_cursor : undefined
    } while (bedCursor)

    // 2) Gästeliste: wie viele Gäste haben welches Venue gewählt (und nicht abgesagt)?
    const taken: Record<string, number> = {}
    let guestCursor: string | undefined = undefined
    do {
      const guestResp: any = await notion.dataSources.query({
        data_source_id: GUEST_DS_ID,
        filter: {
          and: [
            { property: 'Status', select: { does_not_equal: 'Abgesagt' } },
            { property: 'Übernachtung', select: { does_not_equal: 'Nein' } },
          ],
        },
        start_cursor: guestCursor,
        page_size: 100,
      })
      for (const page of guestResp.results) {
        if (!('properties' in page)) continue
        const unterkunft = (page.properties as any)['Unterkunft']?.select?.name
        if (!unterkunft) continue
        // Legacy-Werte auf neue mappen, damit alte RSVPs mitgezählt werden
        const normalized =
          unterkunft === 'Schloss' ? 'Castle' :
          unterkunft === 'Dorf' ? 'Gelbes Haus' : // Default-Bucket für unspezifisches Dorf
          unterkunft
        taken[normalized] = (taken[normalized] || 0) + 1
      }
      guestCursor = guestResp.has_more ? guestResp.next_cursor : undefined
    } while (guestCursor)

    const venues: VenueStatus[] = VENUE_ORDER.map((name) => {
      const unlimited = UNLIMITED_VENUES.has(name)
      const total = unlimited ? null : (totals[name] || 0)
      const t = taken[name] || 0
      return {
        name,
        price: VENUE_PRICES[name],
        total,
        taken: t,
        available: unlimited ? null : Math.max(0, (total ?? 0) - t),
      }
    })

    // Backwards-compat-Block für die alte Frontend-Logik (castle/village).
    // Kann entfernt werden, sobald das neue Frontend live ist.
    const castle = venues.find((v) => v.name === 'Castle')!
    const villageTotal =
      (totals['Gelbes Haus'] || 0) + (totals['Schlosskrug'] || 0) + (totals['Deichgraf'] || 0)
    const villageTaken =
      (taken['Gelbes Haus'] || 0) + (taken['Schlosskrug'] || 0) + (taken['Deichgraf'] || 0)

    return NextResponse.json(
      {
        venues,
        castle: {
          total: castle.total ?? 0,
          taken: castle.taken,
          available: castle.available ?? 0,
        },
        village: {
          total: villageTotal,
          taken: villageTaken,
          available: Math.max(0, villageTotal - villageTaken),
        },
      },
      {
        headers: {
          'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        },
      }
    )
  } catch (error) {
    console.error('Beds query error:', error)
    // Fallback: Fixwerte, damit die Seite trotzdem rendert
    const venues: VenueStatus[] = VENUE_ORDER.map((name) => ({
      name,
      price: VENUE_PRICES[name],
      total: UNLIMITED_VENUES.has(name) ? null : 0,
      taken: 0,
      available: UNLIMITED_VENUES.has(name) ? null : 0,
    }))
    return NextResponse.json({
      venues,
      castle: { total: 88, taken: 0, available: 88 },
      village: { total: 15, taken: 0, available: 15 },
    })
  }
}
