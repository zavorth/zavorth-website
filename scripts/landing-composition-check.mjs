#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass');
const read = (file) => {
  const target = join(root, file);
  return existsSync(target) ? readFileSync(target, 'utf8') : '';
};

const page = read('app/page.tsx');
const hero = read('components/Hero.tsx');
const intro = read('components/ProductIntroSection.tsx');
const whatItDoes = read('components/WhatItDoesSection.tsx');
const features = read('components/FeaturesSection.tsx');
const connections = read('components/ConnectionsSection.tsx');
const install = read('components/InstallSection.tsx');
const globals = read('app/globals.css');
const navbar = read('lib/constants.ts') + '\n' + read('components/Navbar.tsx');

const findings = [];

for (const removed of [
  'ProductExperienceSection',
  'OverviewSection',
  'SkillsSection',
  'CTASection',
  'ValuePropositionSection',
  'CapabilitiesSection',
  'TechnicalSection',
  'AboutSection',
  'EverydaySection',
  'DashboardSection',
  'PreviewSection',
  'HowItWorksSection',
  'LocalStackMarquee',
  'ZavorthCosmicCanvas',
  'SpotlightSmokeCanvas',
  'AuroraMeshGradient',
  'UseCasesSection',
]) {
  if (page.includes(removed)) findings.push(`app/page.tsx still renders ${removed}`);
}

for (const required of [
  'Hero',
  'ProductIntroSection',
  'WhatItDoesSection',
  'ConnectionsSection',
  'InstallSection',
  'Footer',
]) {
  if (!page.includes(required)) findings.push(`app/page.tsx missing ${required}`);
}

// Order matches current home composition (Features/Proof optional between middle sections).
const expectedOrder = [
  '<Hero />',
  '<ProductIntroSection />',
  '<WhatItDoesSection />',
  page.includes('<FeaturesSection />') ? '<FeaturesSection />' : page.includes('<ProofSection />') ? '<ProofSection />' : null,
  '<ConnectionsSection />',
  '<InstallSection />',
  '<Footer />',
].filter(Boolean);

let lastIndex = -1;
for (const item of expectedOrder) {
  const index = page.indexOf(item);
  if (index === -1 || index <= lastIndex) {
    findings.push(`app/page.tsx content order is wrong at ${item}`);
    break;
  }
  lastIndex = index;
}

for (const forbiddenHeroContent of ['Começar agora', 'ComeÃ§ar agora', 'Role para continuar', 'scroll-indicator']) {
  if (hero.includes(forbiddenHeroContent)) findings.push(`Hero should only show title and animation: ${forbiddenHeroContent}`);
}

if (!hero.includes('BlackHoleCanvas') && !hero.includes('data-black-hole-placeholder')) {
  findings.push('Hero missing BlackHoleCanvas / black hole treatment');
}

if (!hero.includes('cursor-container') || !hero.includes('blinking-cursor')) {
  findings.push('Hero missing the moving colored typing cursor');
}

if (!hero.includes('updateTypingCursor') || !hero.includes("updateTypingCursor(chars[0], 'before')") || !hero.includes("updateTypingCursor(char, 'after')")) {
  findings.push('Hero typing cursor should trail completed characters via transform updates');
}

if (hero.includes('--cursor-pos-x')) {
  findings.push('Hero should position the typing cursor with transform, not CSS vars --cursor-pos-x');
}

if (!hero.includes('w-[5px]')) {
  findings.push('Hero typing cursor should remain a visible colored bar');
}

if (!hero.includes('h-[165vh]') || !hero.includes('const scrollableHeight = Math.max(1, rect.height)')) {
  findings.push('Hero scroll behavior should use the whole hero section height');
}

if (hero.includes('font-semibold') || hero.includes('font-extrabold') || hero.includes('font-black')) {
  findings.push('Hero title font weight is too heavy for the simplified landing');
}

if (!hero.includes('você') && !hero.includes('voc\u00ea')) {
  findings.push('Hero title should use proper Portuguese accent on você');
}

if (!intro.includes('data-product-intro') && !intro.includes('id="overview"')) {
  findings.push('ProductIntroSection missing data-product-intro or id="overview"');
}

if (!whatItDoes.includes('data-how-it-works') && !whatItDoes.includes('id="how-it-works"') && !whatItDoes.includes('id="what-it-does"')) {
  findings.push('WhatItDoesSection missing how-it-works / what-it-does marker');
}

if (!connections.includes('data-connection-line') && !connections.includes('id="connections"')) {
  findings.push('ConnectionsSection missing connections marker/id');
}

if (!install.includes('data-ghost-wordmark')) {
  findings.push('InstallSection missing ghost ZAVORTH wordmark');
}

if (page.includes('FeaturesSection') || page.includes('ProofSection')) {
  if (!features.includes('data-proof-section') && !features.includes('id="trust"') && !features.includes('id="features"')) {
    findings.push('FeaturesSection should act as trust/proof surface');
  }
  if (features.includes('runtime-approvals') || features.includes('runtime-connected')) {
    findings.push('FeaturesSection must not use Basilisk/OpenClaw screenshot assets (runtime-approvals / runtime-connected)');
  }
  if (!features.includes('zavorth-control-overview') && !features.includes('zavorth-command-center') && !features.includes('data-zavorth-proof')) {
    findings.push('FeaturesSection should show real Zavorth Control product proof assets');
  }
}

if (!intro.includes('landing-surface') || !whatItDoes.includes('landing-surface') || !connections.includes('landing-surface-soft')) {
  findings.push('Landing sections should use translucent atmospheric surfaces instead of opaque blocks');
}

if (!globals.includes('.landing-final-surface') || !globals.includes('.landing-surface')) {
  findings.push('Global landing atmosphere should include surface layers');
}

if (!intro.includes('section-kicker') || !whatItDoes.includes('section-kicker') || !connections.includes('section-kicker')) {
  findings.push('Editorial sections should use the modern section-kicker treatment');
}

if (!globals.includes('.section-kicker')) {
  findings.push('Missing section-kicker CSS');
}

if (globals.includes('width: 2.75rem') || globals.includes('linear-gradient(90deg, rgba(245, 158, 11, 0.9)')) {
  findings.push('Section kicker should not use the old long top-bar treatment');
}

if (!install.includes("fontSize: 'clamp(3rem, 10vw, 8rem)'") || !install.includes('className="pointer-events-none relative mb-2')) {
  findings.push('Install ghost wordmark should stay smaller and sit above the setup heading');
}

for (const forbiddenSurface of [
  'data-product-orbit',
  'terminal-card',
  'simulatorCardRef',
  'Dynamic Integration Grid',
  'Recursos Premium',
  'Google Antigravity',
  'gemini-hero',
  'Integrações Nexus',
  'Governed MCP Gate',
  'Basilisk',
  'BASILISK',
  'runtime-approvals.png',
  'runtime-connected.png',
  'Fase 4',
  'Fase 5',
]) {
  if ([intro, whatItDoes, features, connections, page, hero].some((content) => content.includes(forbiddenSurface))) {
    findings.push(`landing still contains heavy/outdated surface: ${forbiddenSurface}`);
  }
}

// Soft brand surface (hard brand gate lives in website-public-check).
const brandWarnings = [];
if (/fontshare/i.test(globals)) brandWarnings.push('globals.css imports fontshare');
if (/Playfair/i.test(read('app/layout.tsx'))) brandWarnings.push('layout.tsx imports Playfair');
if (!read('public/favicon.svg').includes('#00e88f')) brandWarnings.push('favicon missing brand green #00e88f');
const hasReducedMotion =
  /prefers-reduced-motion/i.test(hero) ||
  (/matchMedia\s*\(/.test(hero) && /reduce/i.test(hero));
if (!hasReducedMotion) {
  brandWarnings.push('Hero should mention prefers-reduced-motion or matchMedia reduce (soft until fully landed)');
}

for (const anchor of ['#overview', '#how-it-works', '#connections', '#install']) {
  if (!navbar.includes(anchor)) findings.push(`navigation missing ${anchor}`);
}

if (findings.length > 0) {
  console.error('Landing composition check failed:');
  for (const finding of findings) console.error(`- ${finding}`);
  if (requirePass) process.exit(1);
}

if (brandWarnings.length > 0) {
  console.warn('Landing brand surface warnings (soft):');
  for (const warning of brandWarnings) console.warn(`- ${warning}`);
}

console.log(JSON.stringify({
  status: findings.length === 0 ? 'pass' : 'warn',
  findings,
  brandWarnings,
  composition: expectedOrder,
}, null, 2));
