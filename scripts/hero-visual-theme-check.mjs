#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass');

const warmSurfaceFiles = [
  'components/ProductIntroSection.tsx',
  'components/UseCasesSection.tsx',
  'components/ConnectionsSection.tsx',
  'components/InstallSection.tsx',
];

const findings = [];
const coolClassPattern = /\b(?:text|bg|border|from|to|via|hover:text|hover:bg)-(?:cyan|blue|violet|purple|indigo)-/i;

for (const file of warmSurfaceFiles) {
  const content = readFileSync(join(root, file), 'utf8');
  const match = content.match(coolClassPattern);
  if (match) findings.push(`${file}: cool Tailwind class ${match[0]}`);
}

const blackHole = readFileSync(join(root, 'components/BlackHoleCanvas.tsx'), 'utf8');

if (!blackHole.includes('entranceDelayMs: 300')) {
  findings.push('components/BlackHoleCanvas.tsx: entrance delay should match the Gemini-style delayed reveal');
}

if (!blackHole.includes('entranceGrowSpeed: 0.8') || !blackHole.includes('entranceLingerSeconds: 3')) {
  findings.push('components/BlackHoleCanvas.tsx: entrance grow and linger timing should match the reference pacing');
}

if (blackHole.includes('pointsObject.scale.set(0, 0, 0)')) {
  findings.push('components/BlackHoleCanvas.tsx: points start fully collapsed instead of softly delayed');
}

if (!blackHole.includes('particleCount: 46000') || !blackHole.includes('glowSprite.scale.set(fl.eventHorizonRadius * 6.4')) {
  findings.push('components/BlackHoleCanvas.tsx: black hole should keep the denser premium field and wider halo');
}

if (!blackHole.includes('coronaSprite') || !blackHole.includes('fl.eventHorizonRadius * 10.5')) {
  findings.push('components/BlackHoleCanvas.tsx: black hole should keep the broad opening corona');
}

const hero = readFileSync(join(root, 'components/Hero.tsx'), 'utf8');

if (!hero.includes('Math.max(0.28, 1 - exitProgress)')) {
  findings.push('components/Hero.tsx: scroll return should keep a visible canvas floor until the hero exits');
}

if (!hero.includes('targetProgress > currentProgress ? 0.22 : 0.3')) {
  findings.push('components/Hero.tsx: hero scroll return damping should recover quickly');
}

if (!blackHole.includes('targetProgress < scrollRatioCurrent ? 0.34 : 0.2')) {
  findings.push('components/BlackHoleCanvas.tsx: black hole scroll return damping should recover quickly');
}

if (!blackHole.includes('shrinkSpeed: 1.18') || !blackHole.includes('uScrollShrinkSpeed')) {
  findings.push('components/BlackHoleCanvas.tsx: black hole scroll collapse should stay gradual and shader-synced');
}

if (!hero.includes('const scrollableHeight = Math.max(1, rect.height)')) {
  findings.push('components/Hero.tsx: hero scroll progress should follow the whole hero section, not only the sticky window');
}

if (!blackHole.includes('const scrollableHeight = Math.max(1, heroRect.height)')) {
  findings.push('components/BlackHoleCanvas.tsx: black hole scroll progress should follow the whole hero section');
}

if (!blackHole.includes('data-black-hole-canvas')) {
  findings.push('components/BlackHoleCanvas.tsx: missing visible canvas marker');
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
