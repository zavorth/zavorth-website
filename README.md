# Basilisk Website

Official public website base for Basilisk Public Productization phases 46-52.

The site explains Basilisk as a local-first, governed agent runtime. It is the
public entrypoint for the demo, quickstart, integration surface, security
posture and changelog.

## Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS 3

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
  page.tsx
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
  Hero.tsx
  DemoSection.tsx
  RuntimeSection.tsx
  FeaturesSection.tsx
  ConnectsSection.tsx
  CTASection.tsx
  Footer.tsx
scripts/
  website-public-check.mjs
  public-demo-check.mjs
  first-run-check.mjs
  external-docs-check.mjs
  distribution-policy-check.mjs
  release-bundle-check.mjs
  feedback-loop-check.mjs
  integration-showcase-check.mjs
public/
  favicon.svg
```

## Public Contract

- Product signal appears in the first viewport.
- Primary CTAs point to demo/product context and local quickstart.
- Public claims stay tied to implemented phases, scripts or documented
  blueprints.
- Links for docs, quickstart, security, privacy, terms and changelog must stay
  valid.
- The public demo at `/demo` must remain fixture-first, offline-friendly and
  preview-first.
- The first-run route at `/start` must keep requirements, preview, health check
  and cleanup visible before a user mutates a local environment.
- External docs at `/docs` and examples at `/examples` must teach installation,
  security, troubleshooting, feature maturity and public use cases before internals.
- Distribution policy at `/editions` must keep editions, limits, privacy,
  update channels, plugins and licensing boundaries explicit.
- Release bundle at `/release` must keep digest, installer preview, smoke,
  changelog and rollback/cleanup visible before install claims.
- Feedback loop at `/feedback` must keep telemetry off by default, preview
  redacted, opt-in explicit, and revoke/delete local.
- Integration showcase at `/integrations` must keep vendors optional, credentials
  gated, degradation visible and partner claims conservative.
- No personal paths, secrets, placeholder legal copy or persistent background claims.

## Design Principles

- Product first, not abstract AI myth.
- Local-first trust story.
- Preview, approval, audit and budget as lightweight control planes.
- Dark, focused, restrained UI with concrete runtime language.
- Mobile and desktop must both preserve the first-viewport product signal.

## License

Private preview.
