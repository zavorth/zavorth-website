#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass');
const read = (file) => {
  const target = join(root, file);
  return existsSync(target) ? readFileSync(target, 'utf8') : '';
};

// Landing composition lives in LandingPage.tsx (app/page.tsx only dynamic-imports it).
const page = read('components/LandingPage.tsx') || read('app/page.tsx');
const hero = read('components/Hero.tsx');
const intro = read('components/ProductIntroSection.tsx');
const whatItDoes = read('components/WhatItDoesSection.tsx');
const features = read('components/FeaturesSection.tsx');
const install = read('components/InstallSection.tsx');
const globals = read('app/globals.css');
const navbar = read('lib/constants.ts') + '\n' + read('components/Navbar.tsx');

const findings = [];

for (const removed of [
  'ConnectionsSection',
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
  if (page.includes(removed) || page.includes(`<${removed}`)) {
    // ConnectionsSection is intentionally removed from the live landing.
    if (removed === 'ConnectionsSection' && !page.includes('ConnectionsSection')) continue;
    if (removed === 'ConnectionsSection') {
      findings.push('landing still renders ConnectionsSection (removed â€” animation was broken)');
      continue;
    }
    if (page.includes(removed)) findings.push(`landing still renders ${removed}`);
  }
}

for (const required of [
  'Hero',
  'ProductIntroSection',
  'WhatItDoesSection',
  'InstallSection',
  'Footer',
]) {
  if (!page.includes(required)) findings.push(`landing missing ${required}`);
}

const expectedOrder = [
  '<Hero />',
  '<ProductIntroSection />',
  '<WhatItDoesSection />',
  page.includes('<FeaturesGridSection />') ? '<FeaturesGridSection />' : null,
  '<InstallSection />',
  '<Footer />',
].filter(Boolean);

let lastIndex = -1;
for (const item of expectedOrder) {
  const index = page.indexOf(item);
  if (index === -1 || index <= lastIndex) {
    findings.push(`landing content order is wrong at ${item}`);
    break;
  }
  lastIndex = index;
}

for (const forbiddenHeroContent of ['ComeÃ§ar agora', 'ComeÃƒÂ§ar agora', 'Role para continuar', 'scroll-indicator']) {
  if (hero.includes(forbiddenHeroContent)) findings.push(`Hero should only show title and animation: ${forbiddenHeroContent}`);
}

if (!hero.includes('BlackHoleCanvas') && !hero.includes('data-black-hole-placeholder')) {
  findings.push('Hero missing BlackHoleCanvas / black hole treatment');
}

if (!hero.includes('cursor-container') || !hero.includes('blinking-cursor')) {
  findings.push('Hero missing the moving colored typing cursor');
}

if (!intro.includes('data-product-intro') && !intro.includes('id="overview"')) {
  findings.push('ProductIntroSection missing data-product-intro or id="overview"');
}

if (!whatItDoes.includes('data-how-it-works') && !whatItDoes.includes('id="how-it-works"') && !whatItDoes.includes('id="what-it-does"')) {
  findings.push('WhatItDoesSection missing how-it-works / what-it-does marker');
}

if (!install.includes('data-ghost-wordmark')) {
  findings.push('InstallSection missing ghost ZAVORTH wordmark');
}

if (page.includes('FeaturesSection') || page.includes('ProofSection')) {
  if (!features.includes('data-proof-section') && !features.includes('id="trust"') && !features.includes('id="features"')) {
    findings.push('FeaturesSection should act as trust/proof surface');
  }
  if (
    !features.includes('zavorth-control-overview') &&
    !features.includes('zavorth-desktop-shell') &&
    !features.includes('data-zavorth-proof')
  ) {
    findings.push('FeaturesSection should show real Zavorth product proof assets');
  }
}

if (!intro.includes('landing-surface') || !whatItDoes.includes('landing-surface')) {
  findings.push('Landing sections should use translucent atmospheric surfaces instead of opaque blocks');
}

if (!globals.includes('.landing-final-surface') || !globals.includes('.landing-surface')) {
  findings.push('Global landing atmosphere should include surface layers');
}

if (!intro.includes('section-kicker') || !whatItDoes.includes('section-kicker')) {
  findings.push('Editorial sections should use the modern section-kicker treatment');
}

if (!globals.includes('.section-kicker')) {
  findings.push('Missing section-kicker CSS');
}

for (const forbiddenSurface of [
  'Google Antigravity',
  'gemini-hero',
  'IntegraÃ§Ãµes Nexus',
  'Basilisk',
  'BASILISK',
  'runtime-approvals.png',
  'runtime-connected.png',
]) {
  if ([intro, whatItDoes, features, page, hero].some((content) => content.includes(forbiddenSurface))) {
    findings.push(`landing still contains heavy/outdated surface: ${forbiddenSurface}`);
  }
}

const brandWarnings = [];
if (/fontshare/i.test(globals)) brandWarnings.push('globals.css imports fontshare');
if (/Playfair/i.test(read('app/layout.tsx'))) brandWarnings.push('layout.tsx imports Playfair');
if (!read('public/favicon.svg').includes('#00e88f')) brandWarnings.push('favicon missing brand green #00e88f');

for (const anchor of ['#overview', '#how-it-works', '#install']) {
  if (!navbar.includes(anchor)) findings.push(`navigation missing ${anchor}`);
}

if (navbar.includes('#connections')) {
  findings.push('navigation still links to removed #connections section');
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
