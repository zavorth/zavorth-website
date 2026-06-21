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
const useCases = read('components/UseCasesSection.tsx');
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
]) {
  if (page.includes(removed)) findings.push(`app/page.tsx still renders ${removed}`);
}

for (const required of [
  'ProductIntroSection',
  'UseCasesSection',
  'ConnectionsSection',
  'InstallSection',
  'Footer',
]) {
  if (!page.includes(required)) findings.push(`app/page.tsx missing ${required}`);
}

const expectedOrder = [
  '<ProductIntroSection />',
  '<UseCasesSection />',
  '<ConnectionsSection />',
  '<InstallSection />',
  '<Footer />',
];
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

if (!hero.includes('cursor-container') || !hero.includes('blinking-cursor')) {
  findings.push('Hero missing the moving colored typing cursor');
}

if (!hero.includes('--cursor-pos-x') || !hero.includes('updateTypingCursor')) {
  findings.push('Hero cursor should follow the currently typed character');
}

if (!hero.includes('let elapsed = 0.3') || !hero.includes('let delay = 0.052') || !hero.includes('w-[5px]')) {
  findings.push('Hero typing animation should follow the Gemini-paced entrance with a visible colored cursor');
}

if (!hero.includes("updateTypingCursor(chars[0], 'before')") || !hero.includes("updateTypingCursor(char, 'after')")) {
  findings.push('Hero typing cursor should trail completed characters instead of jumping ahead of the text');
}

if (hero.includes('transition: transform 80ms') || !hero.includes('transition: opacity 180ms ease')) {
  findings.push('Hero typing cursor should move immediately and only fade opacity');
}

if (!hero.includes('h-[165vh]') || !hero.includes('currentProgress - 0.78') || !hero.includes('scale(${1 - currentProgress * 0.36})') || !hero.includes('const scrollableHeight = Math.max(1, rect.height)')) {
  findings.push('Hero scroll behavior should use the whole hero section with a reversible text/canvas exit');
}

if (hero.includes('font-semibold') || hero.includes('font-extrabold') || hero.includes('font-black')) {
  findings.push('Hero title font weight is too heavy for the simplified landing');
}

if (!intro.includes('data-product-intro')) findings.push('ProductIntroSection missing editorial intro marker');
if (!useCases.includes('data-use-case-row')) findings.push('UseCasesSection missing simple use-case rows');
if (!connections.includes('data-connection-line')) findings.push('ConnectionsSection missing simple connection lines');
if (!install.includes('data-ghost-wordmark')) findings.push('InstallSection missing ghost ZAVORTH wordmark');

if (!intro.includes('landing-surface') || !useCases.includes('landing-surface') || !connections.includes('landing-surface-soft')) {
  findings.push('Landing sections should use translucent atmospheric surfaces instead of opaque blocks');
}

if (!globals.includes('.stars::before') || !globals.includes('.stars::after') || !globals.includes('.landing-final-surface')) {
  findings.push('Global landing atmosphere should include starfield, orbital lines, and final surface layers');
}

if (!intro.includes('section-kicker') || !useCases.includes('section-kicker') || !connections.includes('section-kicker')) {
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
]) {
  if ([intro, useCases, connections].some((content) => content.includes(forbiddenSurface))) {
    findings.push(`landing middle still contains heavy surface: ${forbiddenSurface}`);
  }
}

for (const anchor of ['#overview', '#capabilities', '#connections', '#install']) {
  if (!navbar.includes(anchor)) findings.push(`navigation missing ${anchor}`);
}

if (findings.length > 0) {
  console.error('Landing composition check failed:');
  for (const finding of findings) console.error(`- ${finding}`);
  if (requirePass) process.exit(1);
}

console.log(JSON.stringify({
  status: findings.length === 0 ? 'pass' : 'warn',
  findings,
}, null, 2));
