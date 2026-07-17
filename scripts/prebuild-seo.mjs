// #genai — post-build: bake a static content snapshot into dist/index.html so
// crawlers and no-JS clients see real copy immediately. React still mounts
// and takes over #root on the client as normal.
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { HACKATHON, SITE, SPONSORS } from '../src/config/constants.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')
const indexPath = path.join(distDir, 'index.html')

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function buildSnapshot() {
  const tierItems = SPONSORS.tiers
    .map(
      (tier) =>
        `<div class="rounded-lg border border-astrax-border/20 bg-astrax-card/20 p-5 text-left"><h3 class="font-heading text-base font-medium text-white">${escapeHtml(tier.name)}</h3><p class="mt-2 text-sm font-body leading-relaxed text-astrax-light/90">${escapeHtml(tier.description)}</p></div>`,
    )
    .join('')

  return `
    <div class="min-h-screen relative z-10 flex flex-col">
      <header class="fixed top-0 left-0 right-0 z-50 bg-astrax-black/60 backdrop-blur-xl border-b border-astrax-border/20">
        <nav class="section-container">
          <div class="flex h-16 items-center lg:h-20">
            <span class="brand-wordmark text-sm text-astrax-white sm:text-base">${escapeHtml(SITE.name)}</span>
          </div>
        </nav>
      </header>
      <main class="flex-1 pt-10 pb-24 lg:pt-10">
        <div class="section-container relative">
          <div class="h-16 sm:h-24"></div>
          <div class="max-w-2xl text-center mx-auto">
            <span class="label-text">${escapeHtml(HACKATHON.label)}</span>
            <h1 class="heading-1"><span class="gradient-text-accent">${escapeHtml(HACKATHON.headline)}</span></h1>
            <p class="body-large mt-6">${escapeHtml(HACKATHON.intro)}</p>
            <a href="${SITE.astraxHackathonUrl}" class="mt-4 inline-flex text-sm font-body font-semibold text-astrax-light">Learn more about the hackathon &rarr;</a>
            <div><span class="btn-primary mt-10">${escapeHtml(HACKATHON.registerCta)}</span></div>
          </div>
          <section class="mt-20 lg:mt-20">
            <div class="max-w-2xl mx-auto text-center">
              <span class="label-text">${escapeHtml(SPONSORS.label)}</span>
              <h2 class="heading-2 mb-4"><span class="gradient-text-accent">${escapeHtml(SPONSORS.headline)}</span></h2>
              <p class="body-large">${escapeHtml(SPONSORS.intro)}</p>
            </div>
            <div class="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-3xl mx-auto">${tierItems}</div>
            <div class="mt-10 text-center">
              <a href="mailto:${escapeHtml(SITE.publicEmail)}" class="btn-primary">${escapeHtml(SPONSORS.ctaLabel)}</a>
            </div>
          </section>
        </div>
      </main>
      <footer class="relative overflow-hidden">
        <div class="section-container relative py-10 text-center">
          <span class="text-sm font-body font-medium text-astrax-light">${escapeHtml(SITE.publicEmail)}</span>
        </div>
      </footer>
    </div>
  `
}

if (!fs.existsSync(indexPath)) {
  console.error('[prebuild-seo] dist/index.html not found — run vite build first')
  process.exit(1)
}

const html = fs.readFileSync(indexPath, 'utf8')
const snapshot = buildSnapshot()
const injected = html.replace('<div id="root"></div>', `<div id="root">${snapshot}</div>`)

if (injected === html) {
  console.error('[prebuild-seo] could not find <div id="root"></div> to inject into')
  process.exit(1)
}

fs.writeFileSync(indexPath, injected, 'utf8')
console.log('[prebuild-seo] static content snapshot injected into dist/index.html')
