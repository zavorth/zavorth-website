#!/usr/bin/env node
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass');

const files = [
  'components/Hero.tsx',
  'components/ProductIntroSection.tsx',
  'components/UseCasesSection.tsx',
  'components/ConnectionsSection.tsx',
  'components/InstallSection.tsx',
  'components/Navbar.tsx',
  'components/Footer.tsx',
  'components/BlackHoleCanvas.tsx',
];

const publicHeavyTerms = [
  /\btransaction plane\b/i,
  /\bpolicy broker\b/i,
  /\bmandate\b/i,
  /\bzero-trust\b/i,
  /\bquarantine\b/i,
  /inspired by/i,
  /gemini-hero/i,
  /Plano de Transa/i,
  /Fluxo Transacional/i,
  /Ledger de Seguran/i,
  /Ambiente Totalmente Governan/i,
];

const findings = [];

for (const file of files) {
  const content = readFileSync(join(root, file), 'utf8');
  for (const pattern of publicHeavyTerms) {
    if (pattern.test(content)) {
      findings.push(`${file}: ${pattern}`);
    }
  }
}

if (findings.length > 0) {
  console.error('Public language polish failed:');
  for (const finding of findings) {
    console.error(`- ${finding}`);
  }
  if (requirePass) process.exit(1);
}

console.log(JSON.stringify({
  status: findings.length === 0 ? 'pass' : 'warn',
  checkedFiles: files.length,
  findings,
}, null, 2));
