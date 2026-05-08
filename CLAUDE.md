# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev      # next dev — http://localhost:3000
npm run build    # next build
npm run start    # serve the production build
npm run lint     # next lint
```

There is no test suite.

## Architecture

This is a **single-page documentation site** (Next.js App Router + Tailwind + Recharts) that presents the findings of a YOLOv8 adversarial-attack study. The entire content lives in `app/page.tsx` as one long scrolling document; everything else exists to render that page.

Three cross-cutting systems tie the page together — touching one usually means touching the others:

1. **Section IDs are the contract between the page and the sidebar.** `components/sidebar.tsx` hardcodes a `SECTIONS` array of `{ id, label, num }`. `app/page.tsx` must render a matching element with that `id` (the hero uses `id="overview"` on a `<header>`; the rest use `<Section id=... number=...>` from `components/section.tsx`). The sidebar's active-link highlight is driven by an `IntersectionObserver` over those IDs, so a renamed/missing ID silently breaks scroll-spy. When adding a section, update both files and keep the `number` / `num` in sync.

2. **Theming is class-based with CSS variables, set pre-paint.** `app/layout.tsx` injects an inline script that reads `localStorage.theme` and toggles `document.documentElement.classList` *before* the body renders, to avoid a flash. `app/globals.css` defines color tokens as `--bg`, `--fg`, `--fg-muted`, `--rule`, `--accent`, `--accent-warm`, `--surface-elev` under `:root` (light) and `.dark` (dark). Components consume them via inline `style={{ color: "rgb(var(--accent))" }}` rather than Tailwind color classes — follow that pattern for new UI so dark mode keeps working. The toggle in `components/theme-toggle.tsx` writes back to localStorage.

3. **Charts and image swappers are client components; everything else is server-rendered.** Files marked `"use client"` (sidebar, theme-toggle, image-swapper, figure modal, the two charts under `components/charts/`) are the only interactive parts. The chart data is hardcoded inline (e.g. the `DATA` array in `fgsm-aggregate-chart.tsx`) — there is no data layer, no fetching, no API. To update numbers, edit the component.

### Other conventions

- **Path alias**: `@/*` maps to repo root (see `tsconfig.json`). Imports look like `@/components/section`.
- **Figures**: drop PNGs into `public/figures/` and reference them as `/figures/<name>.png`. `next.config.js` sets `images.unoptimized: true`, so `<img>` and `next/image` both work without the optimizer.
- **Typography primitives**: use `Section`, `P`, `Lead`, `FigureBlock` from `components/section.tsx` rather than raw tags — they encode the doc's spacing, rule lines, and small-caps section numbers.
- **Fonts** (EB Garamond, Newsreader, JetBrains Mono) are loaded from Google Fonts in `globals.css`, not via `next/font`.
