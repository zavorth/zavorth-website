#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass');

const page = existsSync(join(root, 'app/page.tsx'))
  ? readFileSync(join(root, 'app/page.tsx'), 'utf8')
  : '';

const warmSurfaceCandidates = [
  ['ProductIntroSection', 'components/ProductIntroSection.tsx'],
  ['WhatItDoesSection', 'components/WhatItDoesSection.tsx'],
  ['ConnectionsSection', 'components/ConnectionsSection.tsx'],
  ['FeaturesSection', 'components/FeaturesSection.tsx'],
  ['ProofSection', 'components/ProofSection.tsx'],
  ['InstallSection', 'components/InstallSection.tsx'],
];

const warmSurfaceFiles = warmSurfaceCandidates
  .filter(([token, file]) => page.includes(token) && existsSync(join(root, file)))
  .map(([, file]) => file);

const findings = [];
const coolClassPattern = /\b(?:text|bg|border|from|to|via|hover:text|hover:bg)-(?:cyan|blue|violet|purple|indigo)-/i;

for (const file of warmSurfaceFiles) {
  const content = readFileSync(join(root, file), 'utf8');
  const match = content.match(coolClassPattern);
  if (match) findings.push(`${file}: cool Tailwind class ${match[0]}`);
}

const blackHole = readFileSync(join(root, 'components/BlackHoleCanvas.tsx'), 'utf8');
const hero = readFileSync(join(root, 'components/Hero.tsx'), 'utf8');

// Align with current BlackHoleCanvas defaults (intentional behavior).
if (!/entranceGrowSpeed:\s*[\d.]+/.test(blackHole)) {
  findings.push('components/BlackHoleCanvas.tsx: entrance grow speed should remain paced');
}

if (!hero.includes('startTyping') && !hero.includes('baseCharDelay')) {
  findings.push('components/Hero.tsx: typing intro should always run (not skipped entirely for reduced-motion)');
}

if (!/entranceDelayMs:\s*\d+/.test(blackHole)) {
  findings.push('components/BlackHoleCanvas.tsx: entrance delay setting should be present');
}

if (!/entranceLingerSeconds:\s*[\d.]+/.test(blackHole)) {
  findings.push('components/BlackHoleCanvas.tsx: entrance linger setting should be present');
}

if (!blackHole.includes('particleCount: 46000') || !blackHole.includes('glowSprite.scale.set(fl.eventHorizonRadius * 6.4')) {
  findings.push('components/BlackHoleCanvas.tsx: black hole should keep the denser field and wider halo');
}

if (!blackHole.includes('coronaSprite') || !blackHole.includes('fl.eventHorizonRadius * 10.5')) {
  findings.push('components/BlackHoleCanvas.tsx: black hole should keep the broad opening corona');
}

if (!blackHole.includes('shrinkSpeed:') || !blackHole.includes('uScrollShrinkSpeed')) {
  findings.push('components/BlackHoleCanvas.tsx: black hole scroll collapse should stay shader-synced');
}

if (!blackHole.includes('const scrollableHeight = Math.max(1, heroRect.height)')) {
  findings.push('components/BlackHoleCanvas.tsx: black hole scroll progress should follow the whole hero section');
}

if (!blackHole.includes('targetProgress < scrollRatioCurrent')) {
  findings.push('components/BlackHoleCanvas.tsx: black hole scroll damping should recover on return');
}

if (!blackHole.includes('data-black-hole-canvas')) {
  findings.push('components/BlackHoleCanvas.tsx: missing visible canvas marker');
}

// Align with current Hero.tsx scroll + typing behavior.
if (!hero.includes('BlackHoleCanvas') && !hero.includes('data-black-hole-placeholder')) {
  findings.push('components/Hero.tsx: hero should mount the black hole canvas');
}

if (!hero.includes('const scrollableHeight = Math.max(1, rect.height)')) {
  findings.push('components/Hero.tsx: hero scroll progress should follow the whole hero section, not only the sticky window');
}

if (!hero.includes('h-[165vh]')) {
  findings.push('components/Hero.tsx: hero should keep tall scroll runway for exit');
}

if (!hero.includes('targetProgress > currentProgress')) {
  findings.push('components/Hero.tsx: hero scroll damping should differ on exit vs return');
}

if (!hero.includes('cursor-container') || !hero.includes('blinking-cursor') || !hero.includes('updateTypingCursor')) {
  findings.push('components/Hero.tsx: typing cursor treatment should remain present');
}

if (findings.length > 0) {
  console.error('Hero visual theme check failed:');
  for (const finding of findings) console.error(`- ${finding}`);
  if (requirePass) process.exit(1);
}

console.log(JSON.stringify({
  status: findings.length === 0 ? 'pass' : 'warn',
  findings,
}, null, 2));
