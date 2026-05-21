/**
 * Host-Kontingente: dynamisch aus Notion Bed-Inventory + Gästeliste abgeleitet.
 *
 * Drei Hosts (Cari, Peter, Georg) teilen sich Castle-Betten und Doppelzimmer
 * gleichmäßig. Quotas werden hier zentral berechnet, damit Beds-API und
 * RSVP-Server-Validierung dieselbe Wahrheit teilen.
 *
 * - Castle-Bett-Quota pro Host = floor(Castle-Total-Slots / 3)
 * - DZ-Quota pro Host         = floor(Anzahl Double Rooms / 3)
 *
 * "Used" wird zweistufig gezählt:
 *   1) Im Inventar zugewiesene Slots/Räume → via Gast→Host-Auflösung
 *   2) Pending: Gäste die per RSVP Castle/DZ gewählt haben, aber noch keinen
 *      konkreten Bed-Slot zugewiesen bekamen
 */

import type { Client } from '@notionhq/client'

export const HOSTS = ['Cari', 'Peter', 'Georg'] as const
export type Host = (typeof HOSTS)[number]

// Aliasing für abweichende Venue-Namen im Bed-Inventory.
const BED_VENUE_ALIAS: Record<string, string> = {
  'Deichgraf Elbpension': 'Deichgraf',
  'Self-Accommodation': 'Self-Provided',
}

export interface HostStats {
  castle_quota: number
  castle_used: number
  castle_available: number
  castle_full: boolean
  doubles_quota: number
  doubles_used: number
  doubles_available: number
  doubles_full: boolean
}

export interface HostQuotaResult {
  hosts: Record<Host, HostStats>
  // Hilfsdaten für ergänzende Auswertungen (z.B. freie Betten pro Venue)
  totals: Record<string, number> // verfügbare Betten pro Venue (Status=Available)
  taken: Record<string, number> // pending Gäste ohne Bed-Slot, pro Venue
  castleTotalSlots: number
  doubleRoomTotal: number
}

export async function computeHostQuotas(
  notion: Client,
  guestDsId: string,
  bedInventoryDsId: string
): Promise<HostQuotaResult> {
  // ─── 1) Bed Inventory einlesen ────────────────────────────────────────
  const totals: Record<string, number> = {}
  let castleTotalSlots = 0
  const castleAssignedGuestIds: string[] = []
  const doubleRoomGuestIds: Record<string, string[]> = {}

  let bedCursor: string | undefined = undefined
  do {
    const bedResp: any = await notion.dataSources.query({
      data_source_id: bedInventoryDsId,
      start_cursor: bedCursor,
      page_size: 100,
    })
    for (const page of bedResp.results) {
      if (!('properties' in page)) continue
      const props = page.properties as any
      const rawVenue = props['Venue']?.select?.name
      if (!rawVenue) continue
      const status = props['Status']?.select?.name
      const venue = BED_VENUE_ALIAS[rawVenue] ?? rawVenue
      const roomId = (props['Room ID']?.rich_text?.[0]?.plain_text || '').trim()
      const roomType = props['Room Type']?.select?.name
      const guestId =
        (props['Guest']?.relation?.[0]?.id as string | undefined) ?? null

      if (status === 'Available') {
        totals[venue] = (totals[venue] || 0) + 1
      }

      if (venue === 'Castle') {
        castleTotalSlots++
        if (guestId && status !== 'Available') {
          castleAssignedGuestIds.push(guestId)
        }
      }

      if (roomType === 'Double Room' && roomId) {
        if (!doubleRoomGuestIds[roomId]) doubleRoomGuestIds[roomId] = []
        if (guestId) doubleRoomGuestIds[roomId].push(guestId)
      }
    }
    bedCursor = bedResp.has_more ? bedResp.next_cursor : undefined
  } while (bedCursor)

  const doubleRoomTotal = Object.keys(doubleRoomGuestIds).length

  // ─── 2) Gästeliste vollständig einlesen ──────────────────────────────
  interface GuestInfo {
    id: string
    host: Host | null
    unterkunft: string | null
    status: string | null
    ubernachtung: string | null
    hasBedSlot: boolean
  }
  const guests: GuestInfo[] = []

  let guestCursor: string | undefined = undefined
  do {
    const guestResp: any = await notion.dataSources.query({
      data_source_id: guestDsId,
      start_cursor: guestCursor,
      page_size: 100,
    })
    for (const page of guestResp.results) {
      if (!('properties' in page)) continue
      const props = page.properties as any
      const hostName = (props['Host']?.select?.name as string | null) ?? null
      guests.push({
        id: page.id,
        host: (HOSTS as readonly string[]).includes(hostName ?? '')
          ? (hostName as Host)
          : null,
        unterkunft: props['Unterkunft']?.select?.name ?? null,
        status: props['Status']?.select?.name ?? null,
        ubernachtung: props['Übernachtung']?.select?.name ?? null,
        hasBedSlot: (props['Bed Slot']?.relation?.length || 0) > 0,
      })
    }
    guestCursor = guestResp.has_more ? guestResp.next_cursor : undefined
  } while (guestCursor)

  // ─── 3) guestId → Host Map ───────────────────────────────────────────
  const guestHost: Record<string, Host | null> = {}
  for (const g of guests) guestHost[g.id] = g.host

  // ─── 4) "Taken" pro Venue (für ältere Frontend-Logik) ────────────────
  const taken: Record<string, number> = {}
  for (const g of guests) {
    if (
      !g.unterkunft ||
      g.status === 'Abgesagt' ||
      g.ubernachtung === 'Nein' ||
      g.hasBedSlot
    ) {
      continue
    }
    const normalized =
      g.unterkunft === 'Schloss'
        ? 'Castle'
        : g.unterkunft === 'Dorf'
        ? 'Gelbes Haus'
        : g.unterkunft
    taken[normalized] = (taken[normalized] || 0) + 1
  }

  // ─── 5) Per-Host Stats berechnen ─────────────────────────────────────
  const castleQuotaPerHost = Math.floor(castleTotalSlots / HOSTS.length)
  const doublesQuotaPerHost = Math.floor(doubleRoomTotal / HOSTS.length)

  const hostStats: Record<Host, HostStats> = {} as Record<Host, HostStats>

  for (const host of HOSTS) {
    // a) Castle-used: Inventar-Slots + pending RSVPs
    let castleUsed = 0
    for (const gid of castleAssignedGuestIds) {
      if (guestHost[gid] === host) castleUsed++
    }
    for (const g of guests) {
      if (g.host !== host) continue
      if (g.status === 'Abgesagt' || g.ubernachtung === 'Nein') continue
      if (g.hasBedSlot) continue
      const norm = g.unterkunft === 'Schloss' ? 'Castle' : g.unterkunft
      if (norm === 'Castle') castleUsed++
    }

    // b) Doubles-used: distinct DZ-Räume mit mindestens einem Slot des Hosts
    const usedRooms = new Set<string>()
    for (const [roomId, guestIds] of Object.entries(doubleRoomGuestIds)) {
      for (const gid of guestIds) {
        if (guestHost[gid] === host) {
          usedRooms.add(roomId)
          break
        }
      }
    }
    const doublesUsed = usedRooms.size

    hostStats[host] = {
      castle_quota: castleQuotaPerHost,
      castle_used: castleUsed,
      castle_available: Math.max(0, castleQuotaPerHost - castleUsed),
      castle_full: castleUsed >= castleQuotaPerHost,
      doubles_quota: doublesQuotaPerHost,
      doubles_used: doublesUsed,
      doubles_available: Math.max(0, doublesQuotaPerHost - doublesUsed),
      doubles_full: doublesUsed >= doublesQuotaPerHost,
    }
  }

  return {
    hosts: hostStats,
    totals,
    taken,
    castleTotalSlots,
    doubleRoomTotal,
  }
}
