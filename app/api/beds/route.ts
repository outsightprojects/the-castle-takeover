import { Client } from '@notionhq/client'
import { NextResponse } from 'next/server'

const notion = new Client({ auth: process.env.NOTION_API_KEY })
const DATA_SOURCE_ID = process.env.NOTION_GUEST_DS_ID!

const TOTAL_CASTLE_BEDS = 90
const TOTAL_VILLAGE_BEDS = 70

export async function GET() {
  try {
    const response = await notion.dataSources.query({
      data_source_id: DATA_SOURCE_ID,
      filter: {
        and: [
          { property: 'Status', select: { equals: 'Zugesagt' } },
          { property: 'Übernachtung', select: { equals: 'Ja' } },
        ],
      },
    })

    let castleTaken = 0
    let villageTaken = 0

    for (const page of response.results) {
      if (!('properties' in page)) continue
      const props = page.properties as Record<string, any>
      const unterkunft = props['Unterkunft']?.select?.name

      if (unterkunft === 'Schloss') castleTaken++
      else if (unterkunft === 'Dorf') villageTaken++
    }

    return NextResponse.json({
      castle: { total: TOTAL_CASTLE_BEDS, taken: castleTaken, available: TOTAL_CASTLE_BEDS - castleTaken },
      village: { total: TOTAL_VILLAGE_BEDS, taken: villageTaken, available: TOTAL_VILLAGE_BEDS - villageTaken },
    }, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    })
  } catch (error) {
    console.error('Beds query error:', error)
    return NextResponse.json({
      castle: { total: TOTAL_CASTLE_BEDS, taken: 0, available: TOTAL_CASTLE_BEDS },
      village: { total: TOTAL_VILLAGE_BEDS, taken: 0, available: TOTAL_VILLAGE_BEDS },
    })
  }
      }
