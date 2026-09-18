# mcu-website-next

Static Next.js (App Router, `output: "export"`) port of the **frontend only** from
`../mcu-website/frontend/mcu-react-vite` (React 19 + Vite). Original design and
layout preserved 1:1 — all `.css` files copied verbatim, same class names, same
page structure.

Fully static: no CMS/backend calls. Content comes from `lib/data.ts` (mirrors the
static fallbacks of the original app) and `lib/programmes.ts` (copied verbatim).

## Routes

| Route | Source |
|---|---|
| `/` | Home: Hero, Latest Articles, Board Groups, Why MCU, Partnerships |
| `/about` | About MCU/TSU/KMITL/Thaksin/MRU + map |
| `/article`, `/article/[slug]` | Blog grid (6 bundled articles, search + category filter) |
| `/gallery` | Gallery groups + lightbox |
| `/programme/[category]/[slug]` (+ `[subSlug]`) | Programme detail, 21 + 12 static paths |
| `/contact`, `/student/register` | Forms with validation, demo submit (no backend) |

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
```

Serve the export with any static server, e.g. `python3 -m http.server --directory out`.
