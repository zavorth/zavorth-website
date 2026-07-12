#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass');

const page = existsSync(join(root, 'app/page.tsx'))
  ? readFileSync(join(root, 'app/page.tsx'), 'utf8')
  : '';

// Components actually composed on the landing, plus always-on chrome/canvas.
const landingCandidates = [
  'components/Hero.tsx',
  'components/Navbar.tsx',
  'components/Footer.tsx',
  'components/BlackHoleCanvas.tsx',
  'components/ProductIntroSection.tsx',
  'components/WhatItDoesSection.tsx',
  'components/FeaturesSection.tsx',
  'components/ProofSection.tsx',
  'components/InstallSection.tsx',
  'components/ContentPageShell.tsx',
];

const pageTokens = [
  ['ProductIntroSection', 'components/ProductIntroSection.tsx'],
  ['WhatItDoesSection', 'components/WhatItDoesSection.tsx'],
  ['FeaturesSection', 'components/FeaturesSection.tsx'],
  ['ProofSection', 'components/ProofSection.tsx'],
  ['InstallSection', 'components/InstallSection.tsx'],
  ['Hero', 'components/Hero.tsx'],
  ['Navbar', 'components/Navbar.tsx'],
  ['Footer', 'components/Footer.tsx'],
];

const onLanding = new Set([
  'components/Hero.tsx',
  'components/Navbar.tsx',
  'components/Footer.tsx',
  'components/BlackHoleCanvas.tsx',
  'components/ContentPageShell.tsx',
]);

for (const [token, file] of pageTokens) {
  if (page.includes(token)) onLanding.add(file);
}

// Public data fixtures + main content routes (always checked when present).
// docs/superpowers is intentionally excluded — internal planning may mention phase numbers.
const publicSurfaceCandidates = [
  'app/page.tsx',
  'app/layout.tsx',
  'app/demo/page.tsx',
  'app/start/page.tsx',
  'app/docs/page.tsx',
  'app/examples/page.tsx',
  'app/editions/page.tsx',
  'app/release/page.tsx',
  'app/feedback/page.tsx',
  'app/integrations/page.tsx',
  'app/changelog/page.tsx',
  'app/security/page.tsx',
  'app/privacy/page.tsx',
  'app/terms/page.tsx',
  'lib/constants.ts',
  'data/distribution-policy.ts',
  'data/external-docs.ts',
  'data/feedback-loop.ts',
  'data/first-run.ts',
  'data/integration-showcase.ts',
  'data/public-demo.ts',
  'data/release-bundle.ts',
];

const landingFiles = landingCandidates.filter(
  (file) => onLanding.has(file) && existsSync(join(root, file)),
);
const surfaceFiles = publicSurfaceCandidates.filter((file) => existsSync(join(root, file)));
const files = [...new Set([...landingFiles, ...surfaceFiles])].filter((file) => {
  const normalized = file.split(/[/\\]/).join('/');
  return !normalized.startsWith('docs/superpowers/');
});

const publicHeavyTerms = [
  /\btransaction plane\b/i,
  /\bpolicy broker\b/i,
  /\bmandate\b/i,
  /\bzero-trust\b/i,
  /\bquarantine\b/i,
  /inspired by/i,
  /gemini-hero/i,
  /Google Antigravity/i,
  /Recursos Premium/i,
  /Integrações Nexus/i,
  /Integracoes Nexus/i,
  /\bBasilisk\b/i,
  /BASILISK/,
  /runtime-approvals\.png/i,
  /runtime-connected\.png/i,
  /Fase 4/,
  /Fase 5/,
  /Fase \d+/i,
  /Fases\s+\d+/i,
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
  checkedFiles: files,
  findings,
}, null, 2));
