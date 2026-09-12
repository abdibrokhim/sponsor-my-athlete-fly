# Ad on my body

A Three.js auction for ad space on a very swole fruit fly. The fly spins
front-and-center in a 3D viewer; brands bid on its spots (wings, compound eyes,
thorax, abdomen, thighs and more) and winning logos render right onto the fly.

## Tech

- Next.js 16 (App Router) + React 19
- `three`, `@react-three/fiber`, `@react-three/drei` — the 3D viewer & fly
- Tailwind CSS v4 + shadcn/ui

## Running locally

```bash
npm install
npm run dev
```

No backend is required — bids are held in local component state so you can try
the full flow immediately.

## How it works

- `public/fruit-fly.glb` — the character model (loaded & normalized by
  `components/three/FruitFlyModel.tsx`).
- `components/three/ViewerScene.tsx` — the rotating viewer, pedestal and HUD.
- `components/three/BodySpotLayer.tsx` — the interactive bid markers.
- `components/spot-ad-dialog.tsx` — pick a brand name, upload a logo and bid.
- `components/body-hud.tsx` — HUD + local bid state.
- `lib/body-spots.ts` — the 14 spots, 3D anchor positions and tiered prices.
- `lib/fly.ts` — the single fly listing and its pre-placed sponsor logos.

## Project structure

- `app/` — routes (`/`, `/how-it-works`)
- `components/three/` — `ViewerScene`, `FruitFlyModel`, `BodySpotLayer`
- `components/` — HUD, bid dialog, spot list sheet, countdown, live feed

## Optional: Convex

`convex/` still contains the schema and `claimSpot` mutation if you later want
to persist bids. To enable it, create a Convex project, run `npx convex dev` and
set `NEXT_PUBLIC_CONVEX_URL` in `.env.local`.
