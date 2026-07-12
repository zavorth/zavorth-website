# Zavorth Website

Official public website for Zavorth — a local-first, governed agent runtime.
Public entrypoint for demo, quickstart, integrations, security posture and changelog.

## Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS 3
- Three.js (black hole hero canvas)
- GSAP (hero typing cursor)

## Getting Started

```bash
npm install
npm run dev
npm run build
npm run qa:website-public
npm run start
```

## Project Structure

```text
app/
  globals.css
  layout.tsx
  page.tsx                 # Landing composition below
  demo/page.tsx
  start/page.tsx
  examples/page.tsx
  editions/page.tsx
  release/page.tsx
  feedback/page.tsx
  integrations/page.tsx
  docs/page.tsx
  changelog/page.tsx
  security/page.tsx
  privacy/page.tsx
  terms/page.tsx
components/
  Navbar.tsx
  Hero.tsx                 # BlackHoleCanvas + typing title
  BlackHoleCanvas.tsx
  BrandMark.tsx
  ProductIntroSection.tsx  # overview
  WhatItDoesSection.tsx    # how it works
  FeaturesSection.tsx      # trust / proof
  ConnectionsSection.tsx
  InstallSection.tsx
  Footer.tsx
  ContentPageShell.tsx     # shared shell for content routes
lib/
  constants.ts
scripts/
  website-public-check.mjs
  landing-composition-check.mjs
  public-language-polish-check.mjs
  hero-visual-theme-check.mjs
  black-hole-color-wave-check.mjs
  public-demo-check.mjs
  first-run-check.mjs
  external-docs-check.mjs
  distribution-policy-check.mjs
  release-bundle-check.mjs
  feedback-loop-check.mjs
  integration-showcase-check.mjs
public/
  favicon.svg
  product/                 # proof screenshots
```

## Landing composition

```text
Navbar
Hero                 (BlackHoleCanvas + typing cursor)
ProductIntroSection  (#overview)
WhatItDoesSection    (#how-it-works)
FeaturesSection      (#trust — proof surface)
ConnectionsSection   (#connections)
InstallSection       (#install)
Footer
```

## Public Contract

- Product signal appears in the first viewport.
- Primary CTAs point to demo/product context and local quickstart.
- Public claims stay tied to implemented phases, scripts or documented blueprints.
- Links for docs, quickstart, security, privacy, terms and changelog must stay valid.
- The public demo at `/demo` must remain fixture-first, offline-friendly and preview-first.
- The first-run route at `/start` must keep requirements, preview, health check and cleanup visible before a user mutates a local environment.
- External docs at `/docs` and examples at `/examples` must teach installation, security, troubleshooting, feature maturity and public use cases before internals.
- Distribution policy at `/editions` must keep editions, limits, privacy, update channels, plugins and licensing boundaries explicit.
- Release bundle at `/release` must keep digest, installer preview, smoke, changelog and rollback/cleanup visible before install claims.
- Feedback loop at `/feedback` must keep telemetry off by default, preview redacted, opt-in explicit, and revoke/delete local.
- Integration showcase at `/integrations` must keep vendors optional, credentials gated, degradation visible and partner claims conservative.
- No personal paths, secrets, placeholder legal copy or persistent background claims.

## Design Principles

- Local-first trust story: runtime, memory and approvals stay on the operator machine.
- **Typography:** ZavorthSans (local) + JetBrains Mono only — no Fontshare, Playfair, Satoshi or Clash Display.
- **Brand green:** `#00e88f` for product chrome, favicon mark, CTAs, glows and positive status.
- **Black hole hero:** preserve `BlackHoleCanvas` as the primary first-viewport signature; do not reintroduce Antigravity / gemini-hero / external motion demos.
- **prefers-reduced-motion:** hero title typing and scroll treatment honor `prefers-reduced-motion` / `matchMedia('(prefers-reduced-motion: reduce)')` (instant title, milder scroll).
- **Mascote oficial:** green pixel SVG from desktop — `public/brand/zavorth-mascot.svg` (same as `apps/zavorth-desktop/public/zavorth-mascot.svg`). Never the old snake (`zavorthmascote.png`) nor the cyber-head PNGs (removed). Place sparingly (intro + footer), never as a watermark over the black hole.
- **Public language:** no internal phase numbers (`Fase N`), no heavy governance jargon, no “Recursos Premium” / “Integrações Nexus” marketing leftovers.
- **Product proof:** landing screenshots must be the current Zavorth Control UI (`public/product/zavorth-control-overview.png`). Never ship the abandoned white-fox / old Command Center marketing mock.
- Product first, not abstract AI myth.
- Preview, approval, audit and budget as lightweight control planes.
- Dark, focused, restrained UI with concrete runtime language.
- Mobile and desktop must both preserve the first-viewport product signal.

### Residual public assets

- `public/zavorth-cosmic-bg.html` is an unused particle demo left for reference only; the live landing uses `BlackHoleCanvas`, not this file. Do not wire it into the app shell unless deliberately productized.

## QA gates (public surface)

```bash
node scripts/landing-composition-check.mjs --require-pass
node scripts/public-language-polish-check.mjs --require-pass
node scripts/hero-visual-theme-check.mjs --require-pass
node scripts/website-public-check.mjs --require-pass
```

`website-public-check` includes brand-surface gates (no Fontshare/Playfair, favicon `#00e88f`, banned public demos). Hero reduced-motion is soft-warn there and hard-covered once present in `Hero.tsx`.

## License

Private preview.
