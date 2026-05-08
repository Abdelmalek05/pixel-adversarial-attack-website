# Adversarial Attacks on a YOLOv8 Aircraft Detector — Project Site

A documentation-style website presenting the project's findings.
Built with Next.js 14 (App Router), Tailwind CSS, and Recharts.

## Features

- **Documentation layout** — sticky sidebar nav with auto-tracking active section
- **Light & dark themes** — toggle saved to localStorage, persists across visits
- **Interactive plots** — three-tab FGSM aggregate chart, patch-size sweep with hover tooltips
- **Image swappers** — switch between test images and ε values for FGSM strips
- **Click-to-zoom** on every figure
- **Responsive** — mobile sidebar collapses behind a menu button

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Build

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. Go to https://vercel.com/new and import the repo.
3. Vercel auto-detects Next.js — accept the defaults and click Deploy.

That's it. Free tier handles this site easily.

## Project structure

```
app/
  layout.tsx          — root layout with theme bootstrap
  page.tsx            — single long-form documentation page (all sections)
  globals.css         — Tailwind + custom design tokens
components/
  sidebar.tsx         — left nav with section scroll-spy
  theme-toggle.tsx    — light/dark switch
  section.tsx         — Section, P, Lead, FigureBlock primitives
  figure.tsx          — static figure with click-to-zoom modal
  image-swapper.tsx   — tabbed image variants
  stat.tsx            — large-number display
  charts/
    fgsm-aggregate-chart.tsx  — interactive Recharts component (3 tabs)
    patch-sweep-chart.tsx     — patch-size threshold visualisation
public/
  figures/            — all PNG figures from the report
```

## Customising

- **Update the YouTube and code links** in `app/page.tsx` under the `team` section (look for the three resource cards with `href="#"`).
- **Tweak the colour palette** in `app/globals.css` — CSS variables under `:root` (light) and `.dark` (dark).
- **Add more figures** — drop PNGs into `public/figures/` and reference them in `page.tsx`.
