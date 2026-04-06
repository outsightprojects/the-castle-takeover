# The Castle Takeover

A private event website for a joint 40th birthday celebration at Schloss Dornburg, a baroque castle near Magdeburg, Germany. August 28-30, 2026.

**Live:** [thecastletakeover.de](https://www.thecastletakeover.de)

---

## What This Is

Three friends are renting an 18th-century castle for a weekend and inviting 160 people. This website handles the invitation, event information, and RSVP flow — including accommodation preferences, transport, solidarity contributions, and per-host bed allocation.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **Notion API** as the backend database
- **Vercel** for hosting

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with video hero, pool party section, countdown |
| `/about` | Event story, weekend schedule, FAQ |
| `/venue` | Photo gallery, castle history, map, directions, accommodation |
| `/tickets` | Multi-step RSVP form with Notion integration |
| `/invitation/[name]` | Personalized invitation (e.g. `/invitation/sarah`) |

## RSVP Flow

Six-step form that adapts based on user selections:

1. **Attendance** — yes / most likely / not sure
2. **Host** — who invited you (Georg / Cari / Peter)
3. **Arrival & Stay** — day and duration (day-only skips accommodation step)
4. **Accommodation & Transport** — castle beds gated by host contingent, transport with contextual info
5. **Contribution** — solidarity slider (€90 min for castle beds)
6. **Contact** — name, email, phone, dietary notes, volunteer opt-in

After submission: WhatsApp group link, calendar integration (Google + Apple), PayPal money pool with QR code.

## Notion Integration

Two databases:

**Gastelist** (Guest List) — one row per RSVP:
`Name`, `Host`, `Status`, `Kontakt`, `Telefon`, `Beitrag €`, `Ubernachtung`, `Nachte`, `Unterkunft`, `Anreise`, `Ankunftstag`, `Shuttle`, `Helfer`, `Ernahrung`, `Skills / Beitrag`, `Notizen`, `Nachfassen`

**Event Konfiguration** — config values:
`Schloss Betten`, `Dorf Betten`, `Betten Georg`, `Betten Cari`, `Betten Peter`

### Bed Allocation

Castle beds are split into per-host contingents (configurable in Notion). The `/api/beds` endpoint reads allocations from the config DB and counts confirmed guests per host. Users see availability for their host's contingent. Hosts can shift beds between each other by changing the numbers in Notion.

### Priority System

- **Zugesagt + Bezahlt** — bed is locked
- **Zugesagt** — counts against contingent, `Nachfassen` date set for 7-day follow-up
- **Vielleicht** — does NOT count against contingent, sees a note that beds aren't reserved yet

## Design

Dark cinematic editorial aesthetic with a dual-tone accent system:

| Role | Color |
|---|---|
| Background | `#0A0A0A` |
| Surface | `#141414` |
| Gold (castle) | `#C9A84C` |
| Aqua (pool) | `#4ECDC4` |
| Text | `#F5F5F0` |

Fonts: **Playfair Display** (display), **Inter** (body), **JetBrains Mono** (labels). Film grain texture overlay. Sharp edges, no border-radius on buttons. Wave SVG dividers for pool sections.

## Development

```bash
npm install
npm run dev
```

### Environment Variables

```
NOTION_API_KEY=           # Notion integration token
NOTION_GUEST_DS_ID=       # Gastelist data source ID
NOTION_CONFIG_DS_ID=      # Event Konfiguration data source ID
```

## Deploy

```bash
npx vercel --prod
```

Or push to `main` — Vercel auto-deploys from the linked repo.

## Project Structure

```
app/
  about/page.tsx          # About page
  api/beds/route.ts       # Bed availability API
  api/rsvp/route.ts       # RSVP submission API
  globals.css             # Tailwind config, colors, animations
  invitation/[name]/      # Personalized invitation pages
  layout.tsx              # Root layout with fonts
  page.tsx                # Homepage
  tickets/page.tsx        # RSVP form
  venue/page.tsx          # Venue info + gallery
components/
  countdown.tsx           # Live countdown to event
  footer.tsx              # Site footer
  home-content.tsx        # Shared homepage content (used by / and /invitation/[name])
  nav.tsx                 # Responsive nav with mobile hamburger
  page-shell.tsx          # Layout wrapper
  video-hero.tsx          # Looping video background component
public/images/            # Castle photos + video loops
```
