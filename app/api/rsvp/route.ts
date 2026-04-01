import { Client } from '@notionhq/client'
import { NextRequest, NextResponse } from 'next/server'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const DATA_SOURCE_ID = process.env.NOTION_GUEST_DS_ID!

function mapAttendance(attendance: string): string {
  switch (attendance) {
    case 'yes': return 'Zugesagt'
    case 'likely': return 'Zugesagt'
    case 'maybe': return 'Vielleicht'
    default: return 'Offen'
  }
}

function mapStayDuration(stayDuration: string): string {
  switch (stayDuration) {
    case 'two-nights': return 'Fr+Sa (2 Nächte)'
    case 'one-night': return 'Sa (1 Nacht)'
    default: return 'Sa (1 Nacht)'
  }
}

function mapAccommodation(pref: string): string {
  switch (pref) {
    case 'castle': return 'Schloss'
    case 'village': return 'Dorf'
    default: return 'Noch offen'
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, attendance, arrivalDay, stayDuration, accommodationPreference, contribution, invitedBy, notes, willingToHelp, dietaryRestrictions, skills, needsShuttle, transportMode } = body

    if (!name || !email || !invitedBy) {
      return NextResponse.json({ error: 'Name, email, and host are required.' }, { status: 400 })
    }

    const properties: Record<string, unknown> = {
      'Name': { title: [{ text: { content: name } }] },
      'Host': { select: { name: invitedBy } },
      'Status': { select: { name: mapAttendance(attendance) } },
      'Kontakt': { rich_text: [{ text: { content: [email, phone].filter(Boolean).join(' | ') } }] },
      'Beitrag €': { number: contribution || 90 },
      'Helfer': { checkbox: willingToHelp || false },
      'Shuttle': { checkbox: needsShuttle || false },
    }

    if (stayDuration !== 'day-only') {
      properties['Übernachtung'] = { select: { name: 'Ja' } }
      properties['Nächte'] = { select: { name: mapStayDuration(stayDuration) } }
      properties['Unterkunft'] = { select: { name: mapAccommodation(accommodationPreference) } }
    } else {
      properties['Übernachtung'] = { select: { name: 'Nein' } }
    }

    if (transportMode) {
      const transportMap: Record<string, string> = { 'car': 'Auto', 'train': 'Zug', 'carpool': 'Mitfahrgelegenheit' }
      properties['Anreise'] = { select: { name: transportMap[transportMode] || 'Unklar' } }
    }

    if (dietaryRestrictions) {
      properties['Ernährung'] = { rich_text: [{ text: { content: dietaryRestrictions } }] }
    }

    if (skills) {
      properties['Skills / Beitrag'] = { rich_text: [{ text: { content: skills } }] }
    }

    const noteParts: string[] = []
    if (arrivalDay) noteParts.push('Anreise: ' + arrivalDay)
    if (notes) noteParts.push(notes)

    if (noteParts.length > 0) {
      properties['Notizen'] = { rich_text: [{ text: { content: noteParts.join(' | ') } }] }
    }

    await notion.pages.create({
      parent: { data_source_id: DATA_SOURCE_ID },
      properties: properties as any,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('RSVP submission error:', error)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
