# The Exchange

Website for [The Exchange](https://theexchange.studio) — conversations with principals and operators shaping New York commercial real estate.

Live: [theexchange.studio](https://theexchange.studio) · Vercel project: `project-z9jcr`

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS 4
- Episodes pulled from the YouTube channel RSS feed (hourly ISR)
- Guest roster and headshots in `lib/guests.ts` + `public/guests/`

## Local development

```bash
npm install
npm run dev -- --port 3847
```

Open [http://localhost:3847](http://localhost:3847).

Optional env vars are documented in `.env.example` (YouTube / Spotify / social URLs). Defaults in `lib/` work without a `.env`.

## Useful paths

| Path | Purpose |
|------|---------|
| `/` | Guest mosaic + latest episode + carousel |
| `/guests` | Browse guests |
| `/guests/[slug]` | Guest bio + linked episode |
| `/episodes` | Episode index |
| `/sponsors` | Sponsors |

## Scripts

- `npm run build` — production build
- `node scripts/check-guest-matches.mjs` — audit guest↔episode matching against the RSS feed
