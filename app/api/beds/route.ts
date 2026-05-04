import { NextResponse } from 'next/server'

const NOTION_API_KEY = process.env.NOTION_API_KEY!
const GUEST_DS_ID = process.env.NOTION_GUEST_DS_ID!
const CONFIG_DS_ID = process.env.NOTION_CONFIG_DS_ID!

const HOSTS = ['Georg', 'Cari', 'Peter'] as const

async function notionQuery(dsId: string, filter?: Record<string, unknown>) {
  const res = await fetch(`https://api.notion.com/v1/data_sources/${dsId}/query`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2025-09-03',
    },
    body: JSON.stringify(filter ? { filter } : {}),
  })
  if (!res.ok) return { results: [] }
  return res.json()
}

export async function GET() {
  try {
    // 1. Read per-host castle allocations from config DB
    // (Village/hotel stays are self-arranged; we don't track capacity for them.)
    const configData = await notionQuery(CONFIG_DS_ID)
    const allocations: Record<string, number> = { Georg: 30, Cari: 30, Peter: 30 }

    for (const page of configData.results) {
      const name = page.properties?.Name?.title?.[0]?.plain_text as string
      const wert = page.properties?.Wert?.number as number
      if (name === 'Betten Georg') allocations.Georg = wert
      if (name === 'Betten Cari') allocations.Cari = wert
      if (name === 'Betten Peter') allocations.Peter = wert
    }

    const totalCastleBeds = allocations.Georg + allocations.Cari + allocations.Peter

    // 2. Count confirmed castle guests per host
    // Only Zugesagt and Zugesagt + Bezahlt count against bed availability
    // Vielleicht guests do NOT block beds
    const guestData = await notionQuery(GUEST_DS_ID, {
      and: [
        {
          or: [
            { property: 'Status', select: { equals: 'Zugesagt' } },
            { property: 'Status', select: { equals: 'Zugesagt + Bezahlt' } },
          ],
        },
        { property: 'Übernachtung', select: { equals: 'Ja' } },
        { property: 'Unterkunft', select: { equals: 'Schloss' } },
      ],
    })

    const taken: Record<string, number> = { Georg: 0, Cari: 0, Peter: 0 }

    for (const page of guestData.results) {
      const props = page.properties as Record<string, any>
      const host = props.Host?.select?.name as string
      if (host in taken) taken[host]++
    }

    const totalCastleTaken = taken.Georg + taken.Cari + taken.Peter

    const perHost: Record<string, { total: number; taken: number; available: number }> = {}
    for (const host of HOSTS) {
      perHost[host] = {
        total: allocations[host],
        taken: taken[host],
        available: allocations[host] - taken[host],
      }
    }

    return NextResponse.json({
      castle: {
        total: totalCastleBeds,
        taken: totalCastleTaken,
        available: totalCastleBeds - totalCastleTaken,
      },
      perHost,
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    })
  } catch (error) {
    console.error('Beds query error:', error)
    return NextResponse.json({
      castle: { total: 90, taken: 0, available: 90 },
      perHost: {
        Georg: { total: 30, taken: 0, available: 30 },
        Cari: { total: 30, taken: 0, available: 30 },
        Peter: { total: 30, taken: 0, available: 30 },
      },
    })
  }
}
