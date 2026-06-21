# Simple Product Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current technical, card-heavy landing page with a short editorial product narrative that explains Zavorth truthfully and clearly.

**Architecture:** Keep the black-hole hero as the only immersive visual and preserve the ghosted ZAVORTH installation close. Replace the middle of the page with focused React sections that use typography, whitespace, dividers, and real examples instead of simulated dashboards, large diagrams, and dense cards.

**Tech Stack:** Next.js 14, React 18, TypeScript, Tailwind CSS, Three.js hero canvas.

---

### Task 1: Lock the new landing composition

**Files:**
- Modify: `scripts/landing-composition-check.mjs`
- Modify: `scripts/public-language-polish-check.mjs`
- Modify: `scripts/website-public-check.mjs`

- [ ] Assert the hero contains no CTA or scroll prompt.
- [ ] Assert the rejected product-orbit section is absent.
- [ ] Assert the page renders `ProductIntroSection`, `UseCasesSection`, `ConnectionsSection`, `InstallSection`, then `Footer`.
- [ ] Assert the installation section keeps the ghost wordmark marker.
- [ ] Run `npm run qa:landing-composition --silent` and confirm it fails before implementation.

### Task 2: Simplify the hero and navigation

**Files:**
- Modify: `components/Hero.tsx`
- Modify: `components/Navbar.tsx`
- Modify: `lib/constants.ts`

- [ ] Remove the hero CTA and scroll prompt while preserving the animated title and black-hole canvas.
- [ ] Replace the dropdown navigation with a compact brand, plain section links, and install action.
- [ ] Keep mobile navigation concise and accessible.

### Task 3: Replace the page middle with an editorial product story

**Files:**
- Create: `components/ProductIntroSection.tsx`
- Create: `components/UseCasesSection.tsx`
- Modify: `components/ConnectionsSection.tsx`
- Modify: `app/page.tsx`
- Delete: `components/ProductExperienceSection.tsx`
- Delete: `components/OverviewSection.tsx`
- Delete: `components/SkillsSection.tsx`

- [ ] Explain what Zavorth is in plain product language.
- [ ] Show real use cases as simple full-width rows.
- [ ] Explain providers, tools, channels, memory, and control without claiming unproven live readiness.
- [ ] Avoid nested cards, dashboards, technical simulators, and oversized diagrams.

### Task 4: Preserve and polish the installation close

**Files:**
- Modify: `components/InstallSection.tsx`
- Modify: `components/Footer.tsx`

- [ ] Keep the faded, ghost-like ZAVORTH background wordmark.
- [ ] Keep the copyable install command.
- [ ] Replace time-based setup claims with truthful guided-setup language.
- [ ] Simplify the footer to a compact product close.

### Task 5: Verify the complete experience

**Files:**
- Verify: `components/*.tsx`
- Verify: `scripts/*.mjs`

- [ ] Run `npm run qa:landing-composition --silent`.
- [ ] Run `npm run qa:language-polish --silent`.
- [ ] Run `npm run qa:hero-theme --silent`.
- [ ] Run `npm run qa:black-hole-wave --silent`.
- [ ] Run `npm run qa:website-public --silent`.
- [ ] Run `npx tsc --noEmit`.
- [ ] Capture desktop and mobile screenshots from the local dev server and inspect them.
