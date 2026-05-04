import { NextRequest, NextResponse } from 'next/server'

const NOTION_API_KEY = process.env.NOTION_API_KEY!
const DATABASE_ID = process.env.NOTION_GUEST_DS_ID || process.env.NOTION_GUEST_DB_ID || process.env.NOTION_CONFIG_DS_ID!

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

    const {
      name,
      email,
      phone,
      attendance,
      arrivalDay,
      stayDuration,
      accommodationPreference,
      contribution,
      invitedBy,
      notes,
      willingToHelp,
      dietaryRestrictions,
      skills,
      needsShuttle,
      transportMode,
    } = body

    if (!name || !email || !invitedBy) {
      return NextResponse.json(
        { error: 'Name, email, and host are required.' },
        { status: 400 }
      )
    }

    // Build Notion properties
    const properties: Record<string, unknown> = {
      'Name': {
        title: [{ text: { content: name } }],
      },
      'Host': {
        select: { name: invitedBy },
      },
      'Status': {
        select: { name: mapAttendance(attendance) },
      },
      'Kontakt': {
        rich_text: [{ text: { content: email } }],
      },
      ...(phone ? {
        'Telefon': {
          phone_number: phone,
        },
      } : {}),
      'Beitrag €': {
        number: contribution || 90,
      },
      'Helfer': {
        checkbox: willingToHelp || false,
      },
      'Shuttle': {
        checkbox: needsShuttle || false,
      },
    }

    if (stayDuration === 'day-only') {
      properties['Übernachtung'] = { select: { name: 'Nein' } }
    } else if (stayDuration === 'unsure-stay') {
      properties['Übernachtung'] = { select: { name: 'Unklar' } }
      properties['Unterkunft'] = { select: { name: mapAccommodation(accommodationPreference) } }
    } else {
      properties['Übernachtung'] = { select: { name: 'Ja' } }
      properties['Nächte'] = { select: { name: mapStayDuration(stayDuration) } }
      properties['Unterkunft'] = { select: { name: mapAccommodation(accommodationPreference) } }
    }

    // Transport mode → Anreise select
    const transportMap: Record<string, string> = {
      'car': 'Auto',
      'train': 'Zug',
      'carpool': 'Mitfahrgelegenheit',
      'unsure': 'Unklar',
    }
    properties['Anreise'] = { select: { name: transportMap[transportMode] || 'Unklar' } }

    if (dietaryRestrictions) {
      properties['Ernährung'] = { rich_text: [{ text: { content: dietaryRestrictions } }] }
    }

    if (skills) {
      properties['Skills / Beitrag'] = { rich_text: [{ text: { content: skills } }] }
    }

    // Arrival day → Ankunftstag select
    const arrivalMap: Record<string, string> = {
      'friday': 'Freitag',
      'saturday': 'Samstag',
      'unsure-arrival': 'Noch unklar',
    }
    properties['Ankunftstag'] = { select: { name: arrivalMap[arrivalDay] || 'Noch unklar' } }

    // Nachfassen — 7 days from now if confirmed + castle bed
    if (attendance === 'yes' && accommodationPreference === 'castle') {
      const followUp = new Date()
      followUp.setDate(followUp.getDate() + 7)
      properties['Nachfassen'] = { date: { start: followUp.toISOString().split('T')[0] } }
    }

    // Notes — freetext only, plus camping/self info that has no dedicated field
    const noteParts: string[] = []
    if (accommodationPreference === 'camping') noteParts.push('Unterkunft: Camping')
    if (accommodationPreference === 'self') noteParts.push('Unterkunft: Selbst organisiert')
    if (notes) noteParts.push(notes)

    if (noteParts.length > 0) {
      properties['Notizen'] = { rich_text: [{ text: { content: noteParts.join(' | ') } }] }
    }

    // Use raw fetch to Notion API — avoids SDK type-stripping issues
    const notionRes = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2025-09-03',
      },
      body: JSON.stringify({
        parent: { data_source_id: DATABASE_ID },
        properties,
      }),
    })

    if (!notionRes.ok) {
      const errBody = await notionRes.json()
      console.error('Notion API error:', errBody)

      if (errBody.code === 'unauthorized') {
        return NextResponse.json(
          { error: 'Notion API key is invalid. Please check the configuration.' },
          { status: 500 }
        )
      }
      if (errBody.code === 'object_not_found') {
        return NextResponse.json(
          { error: 'Notion database not found. Please check the database ID.' },
          { status: 500 }
        )
      }
      if (errBody.code === 'validation_error') {
        return NextResponse.json(
          { error: `Database field mismatch: ${errBody.message?.slice(0, 300)}` },
          { status: 500 }
        )
      }
      return NextResponse.json(
        { error: 'Something went wrong. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('RSVP submission error:', error?.message)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}
