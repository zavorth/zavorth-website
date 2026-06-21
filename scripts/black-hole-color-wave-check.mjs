#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass');
const source = readFileSync(join(root, 'components/BlackHoleCanvas.tsx'), 'utf8');

const findings = [];

if (!source.includes('function buildRandomPalette')) {
  findings.push('BlackHoleCanvas should build a fresh randomized palette on click');
}

if (!source.includes('Math.random() * 360')) {
  findings.push('BlackHoleCanvas palette hue should not be locked to a narrow warm range');
}

if (/baseHue\s*=\s*28\s*\+/.test(source)) {
  findings.push('BlackHoleCanvas still has the warm-only baseHue range');
}

if (!source.includes('uColorWaveProgress')) {
  findings.push('BlackHoleCanvas is missing global color-wave progress uniform');
}

if (!source.includes('uColorWaveSoftness')) {
  findings.push('BlackHoleCanvas is missing color-wave softness uniform');
}

if (!source.includes('colorSweepCoord')) {
  findings.push('BlackHoleCanvas should use a per-particle sweep coordinate for whole-object color traversal');
}

if (/float\s+dist\s*=\s*length\(vec3\(px,\s*py,\s*pz\)\s*-\s*uWaveOrigin\)/.test(source)) {
  findings.push('BlackHoleCanvas color transition is still anchored to the clicked region');
}

if (!source.includes('colorWaveProgress = -0.08')) {
  findings.push('BlackHoleCanvas click handler should restart the color wave');
}

if (/float\s+colorSweepCoord\s*=\s*fract\(/.test(source)) {
  findings.push('BlackHoleCanvas color traversal should not repeat with fract; it should cross the whole object once');
}

if (!source.includes('uColorWaveSoftness: { value: 0.085 }')) {
  findings.push('BlackHoleCanvas color wave should use a tighter Gemini-like moving edge');
}

if (!source.includes('haloWaveColor') || !source.includes('glowSpriteMat.color.copy(haloWaveColor)')) {
  findings.push('BlackHoleCanvas halo should participate in the same palette transition');
}

if (/waveRadius\s*>\s*500\.0/.test(source)) {
  findings.push('BlackHoleCanvas still finalizes the palette from a distance-radius wave instead of global progress');
}

if (findings.length > 0) {
  console.error('Black hole color wave check failed:');
  for (const finding of findings) console.error(`- ${finding}`);
  if (requirePass) process.exit(1);
}

console.log(JSON.stringify({
  status: findings.length === 0 ? 'pass' : 'warn',
  findings,
}, null, 2));
