# Hackathon 2026

Single-page registration site for AstraX Hackathon 2026 — India's first community-run hackathon.

Live domain: https://hackathon.1ax.in

Flow: landing (title, intro, why participate) → Register → entry form (name, email, phone, idea) → confirmation ("we'll get back to you") with a Join Discord CTA. A Sponsors section (placeholder tiers + "Become a sponsor" CTA) sits below the register flow on the same page.

Same visual theme as the main [AstraX](https://astrax.dev) site: Three.js particle background, Space Grotesk / Inter typography, and the AstraX color system. No auth, login, or multi-page routing — this app is intentionally single-page. The header links out to `astrax.dev/about` and `astrax.dev/hackathon` for full community/rules context.

## Quick Start

```bash
npm install
npm run dev
npm run build
npm run preview
```

## SEO / Prebuild

`npm run build` runs `vite build` then `scripts/prebuild-seo.mjs`, which injects a static HTML snapshot of the landing content (headline, why-participate list, sponsor tiers) directly into `dist/index.html`'s `#root`, sourced from the same `src/config/constants.js` used by the live React components. This gives crawlers and no-JS clients real text immediately; React still mounts and takes over `#root` on the client as normal.

(An earlier attempt used `vite-plugin-prerender` + Puppeteer for full prerendering, but the package's bundled Chromium download is broken on modern systems — the zip downloads but doesn't fully extract. The static-snapshot approach above has no headless-browser dependency and is more reliable for both local builds and Netlify's build container.)

`index.html` also carries canonical/OG/Twitter meta tags and an Organization JSON-LD block pointed at `https://hackathon.1ax.in`, plus `public/sitemap.xml` and `public/robots.txt`.

## Netlify Deploy

`netlify.toml` sets `command = "npm run build"` and `publish = "dist"`. Point the `hackathon.1ax.in` DNS/domain alias at this Netlify site.

## Netlify Email

Entries are sent by `netlify/functions/register-entry.mjs` through the same Hostinger SMTP account used by the main AstraX site.

- SMTP user: `contact@astrax.dev`
- Send-to inbox: `contact@astrax.dev`
- From address: `noreply@astrax.dev`
- Required Netlify environment variable: `SMTP_PASS`

```bash
cp .env.example .env
```

For local end-to-end email testing, run the site through Netlify Dev so `/.netlify/functions/register-entry` is available. Plain `npm run dev` only serves the Vite frontend.

## Tech Stack

- React 18
- Vite
- Framer Motion
- Tailwind CSS
- Three.js
