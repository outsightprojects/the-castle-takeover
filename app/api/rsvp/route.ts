import { Client } from '@notionhq/client'
import { NextRequest, NextResponse } from 'next/server'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const DATA_SOURCE_ID = process.env.NOTION_GUEST_DS_ID!

// ─── Preismodell ──────────────────────────────────────────────────────────
// Single Source of Truth ist die Notion-Event-Konfiguration. Diese Werte
// hier sind ein Fallback / Performance-Cache. Bei Preisänderung BEIDE Stellen
// aktualisieren.
const EVENT_FEE = 100

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
      invitedBy,
      notes,
      willingToHelp,
      dietaryRestrictions,
      skills,
      needsShuttle,
      transportMode,
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
      // Neue Preisfelder: Event Fee immer 100, Bed Fee abhängig vom Venue.
      'Event Fee €': { number: EVENT_FEE },
      'Bed Fee €': { number: bedFee },
      'Helfer': { checkbox: willingToHelp || false },
      'Shuttle': { checkbox: needsShuttle || false },
    }

    if (isDayOnly) {
      properties['Übernachtung'] = { select: { name: 'Nein' } }
    } else {
      properties['Übernachtung'] = { select: { name: 'Ja' } }
      properties['Nächte'] = { select: { name: mapStayDuration(stayDuration) } }
      properties['Unterkunft'] = { select: { name: venueName } }
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
      eventFee: EVENT_FEE,
      bedFee,
      total: EVENT_FEE + bedFee,
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
