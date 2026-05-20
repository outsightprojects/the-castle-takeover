import { Client } from '@notionhq/client'
import { NextRequest, NextResponse } from 'next/server'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const DATA_SOURCE_ID = process.env.NOTION_GUEST_DS_ID!

// ─── Preismodell ──────────────────────────────────────────────────────────
// Single Source of Truth ist die Notion-Event-Konfiguration. Diese Werte
// hier sind ein Fallback / Performance-Cache. Bei Preisänderung BEIDE Stellen
// aktualisieren.
// Event Fee ist variabel: Slider im UI 100-300, API clampt großzügiger
// (bis 1000), falls jemand händisch postet.
const EVENT_FEE_MIN = 100
const EVENT_FEE_MAX_HARD = 1000

const VENUE_PRICES: Record<string, number> = {
  castle: 90,
  gelbeshaus: 75,
  schlosskrug: 50,
  deichgraf: 123,
  camping: 0,
  self: 0,
}

const VENUE_NAMES: Record<string, string> = {
  castle: 'Castle',
  gelbeshaus: 'Gelbes Haus',
  schlosskrug: 'Schlosskrug',
  deichgraf: 'Deichgraf',
  camping: 'Camping',
  self: 'Self-Provided',
}

// ─── Mapping-Helper ───────────────────────────────────────────────────────
function mapAttendance(attendance: string): string {
  switch (attendance) {
    case 'yes':
    case 'likely':
      return 'Zugesagt'
    case 'maybe':
      return 'Vielleicht'
    default:
      return 'Offen'
  }
}

function mapStayDuration(stayDuration: string): string {
  switch (stayDuration) {
    case 'two-nights':
      return 'Fr+Sa (2 Nächte)'
    case 'one-night':
      return 'Sa (1 Nacht)'
    default:
      return 'Sa (1 Nacht)'
  }
}

function mapTransport(mode: string): string {
  switch (mode) {
    case 'car':
      return 'Auto'
    case 'train':
      return 'Zug'
    case 'carpool':
      return 'Mitfahrgelegenheit'
    default:
      return 'Unklar'
  }
}

// Frontend-Key → Notion-Select-Option für "Bett-Typ".
// Nur relevant für Pensionen (gelbeshaus/schlosskrug/deichgraf).
function mapBedType(bedType: string | undefined): string | null {
  switch (bedType) {
    case 'double-shared':
      return 'Doppelbett-Slot'
    case 'single':
      return 'Einzelbett'
    default:
      return null
  }
}

// ─── Route ────────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      name,
      email,
      phone,
      attendance,
      arrivalDay,
      stayDuration,
      accommodationPreference,
      bedTypePreference,
      invitedBy,
      notes,
      willingToHelp,
      dietaryRestrictions,
      skills,
      needsShuttle,
      transportMode,
      eventFee,
    } = body

    // Pflichtfelder
    if (!name || !email || !invitedBy) {
      return NextResponse.json(
        { error: 'Name, email, and host are required.' },
        { status: 400 }
      )
    }

    const isDayOnly = stayDuration === 'day-only'

    // Bed Fee nur, wenn Gast übernachtet UND ein bezahlt-pflichtiges Venue gewählt hat
    const venueKey = accommodationPreference as string | undefined
    const venueName = venueKey && VENUE_NAMES[venueKey] ? VENUE_NAMES[venueKey] : 'Noch offen'
    const bedFee = isDayOnly || !venueKey ? 0 : (VENUE_PRICES[venueKey] ?? 0)

    // Event Fee: variabel, mindestens 100, maximal 1000 (UI begrenzt auf 300,
    // hier defensiver Hard-Cap gegen Spam/Tippfehler).
    const eventFeeAmount = Math.max(
      EVENT_FEE_MIN,
      Math.min(EVENT_FEE_MAX_HARD, parseInt(String(eventFee ?? EVENT_FEE_MIN)) || EVENT_FEE_MIN)
    )

    // Properties für Notion zusammenbauen
    const properties: Record<string, unknown> = {
      'Name': { title: [{ text: { content: name } }] },
      'Host': { select: { name: invitedBy } },
      'Status': { select: { name: mapAttendance(attendance) } },
      'Kontakt': {
        rich_text: [
          { text: { content: [email, phone].filter(Boolean).join(' | ') } },
        ],
      },
      // Preisfelder: Event Fee variabel (min 100), Bed Fee abhängig vom Venue.
      // Tip-Feld bleibt in Notion bestehen (Formula "Offen €" referenziert es),
      // wird aber vom neuen RSVP-Flow nicht mehr gesetzt — Default 0.
      'Event Fee €': { number: eventFeeAmount },
      'Bed Fee €': { number: bedFee },
      'Tip €': { number: 0 },
      'Helfer': { checkbox: willingToHelp || false },
      'Shuttle': { checkbox: needsShuttle || false },
    }

    if (isDayOnly) {
      properties['Übernachtung'] = { select: { name: 'Nein' } }
    } else {
      properties['Übernachtung'] = { select: { name: 'Ja' } }
      properties['Nächte'] = { select: { name: mapStayDuration(stayDuration) } }
      properties['Unterkunft'] = { select: { name: venueName } }

      // Bett-Typ: nur für die Pensionen relevant. Castle/Camping/Self erhalten
      // die Property nicht (Notion lässt sie dann einfach leer).
      const bedTypeName = mapBedType(bedTypePreference)
      if (bedTypeName) {
        properties['Bett-Typ'] = { select: { name: bedTypeName } }
      }
    }

    if (transportMode) {
      properties['Anreise'] = { select: { name: mapTransport(transportMode) } }
    }

    if (dietaryRestrictions) {
      properties['Ernährung'] = {
        rich_text: [{ text: { content: dietaryRestrictions } }],
      }
    }

    if (skills) {
      properties['Skills / Beitrag'] = {
        rich_text: [{ text: { content: skills } }],
      }
    }

    const noteParts: string[] = []
    if (arrivalDay) noteParts.push(`Anreise: ${arrivalDay}`)
    if (notes) noteParts.push(notes)
    if (noteParts.length > 0) {
      properties['Notizen'] = {
        rich_text: [{ text: { content: noteParts.join(' | ') } }],
      }
    }

    await notion.pages.create({
      parent: { data_source_id: DATA_SOURCE_ID },
      properties: properties as any,
    })

    // Total für die Erfolgsseite zurückgeben — der Client zeigt den Betrag
    // direkt im UI und im PayPal-Link an.
    return NextResponse.json({
      success: true,
      eventFee: eventFeeAmount,
      bedFee,
      total: eventFeeAmount + bedFee,
      venue: venueName,
    })
  } catch (error) {
    console.error('RSVP submission error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
