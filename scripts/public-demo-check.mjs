#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass') || process.argv.includes('--gate');

const checks = [
  checkRequiredFiles(),
  checkFixtureContract(),
  checkDemoRouteCopy(),
  checkPublicLinks(),
  checkForbiddenDemoCopy(),
  checkExportedDemo(),
];

const failed = checks.filter((check) => check.status === 'fail').length;
const warnings = checks.filter((check) => check.status === 'warn').length;
const passed = checks.filter((check) => check.status === 'pass').length;

for (const check of checks) {
  const suffix = check.path ? ` (${check.path})` : '';
  console.log(`[${check.status}] ${check.title}${suffix}`);
  console.log(`  ${check.reason}`);
  for (const evidence of check.evidence || []) {
    console.log(`  - ${evidence}`);
  }
}

console.log('');
console.log(`[public-demo] ok=${failed === 0 ? 'yes' : 'no'} pass=${passed} warn=${warnings} fail=${failed}`);

if (requirePass && failed > 0) {
  process.exitCode = 1;
}

function checkRequiredFiles() {
  const required = ['app/demo/page.tsx', 'data/public-demo.ts'];
  const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
  return check(
    'required-files',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'rota /demo e fixture publica existem.'
      : 'rota /demo ou fixture publica estao ausentes.',
    undefined,
    missing,
  );
}

function checkFixtureContract() {
  const fixture = readText('data/public-demo.ts');
  const required = [
    'fixture/basilisk-demo-workspace',
    'approval',
    'artifact',
    'replay',
    'rollback',
    'Success',
    'Error',
    'Approval',
    'Rollback',
    'sem rede externa obrigatoria',
  ];
  const missing = required.filter((phrase) => !fixture.includes(phrase));
  return check(
    'fixture-contract',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'fixture cobre objetivo, approval, artifact, replay, erro e rollback.'
      : 'fixture da demo perdeu parte do contrato publico.',
    'data/public-demo.ts',
    missing,
  );
}

function checkDemoRouteCopy() {
  const route = `${readText('app/demo/page.tsx')}\n${readText('data/public-demo.ts')}`;
  const required = [
    'Public demo',
    'Guided story',
    'Um fluxo completo',
    'Estados cobertos',
    'Chat comum',
    'Basilisk',
    'Ver run guiado',
  ];
  const missing = required.filter((phrase) => !route.includes(phrase));
  return check(
    'route-copy',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'rota /demo apresenta historia guiada e comparacao publica.'
      : 'rota /demo perdeu texto ou blocos publicos obrigatorios.',
    'app/demo/page.tsx',
    missing,
  );
}

function checkPublicLinks() {
  const source = [
    'components/Hero.tsx',
    'components/Navbar.tsx',
    'components/CTASection.tsx',
    'components/Footer.tsx',
    'app/docs/page.tsx',
    'app/demo/page.tsx',
  ].map(readText).join('\n');
  const required = ['/demo', '/docs#demo'];
  const missing = required.filter((href) => !source.includes(href));
  return check(
    'public-links',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'site publico aponta para /demo e roteiro da demo.'
      : 'links publicos para a demo estao incompletos.',
    undefined,
    missing,
  );
}

function checkForbiddenDemoCopy() {
  const source = readText('app/demo/page.tsx') + '\n' + readText('data/public-demo.ts');
  const forbidden = [
    /C:\\TESTES DEV/i,
    /(^|[^A-Za-z])sk-[A-Za-z0-9_-]{12,}/,
    /token/i,
    /autonomo sem aprovacao/i,
    /sem limites/i,
  ];
  const matches = forbidden
    .map((pattern) => source.match(pattern)?.[0] || '')
    .filter(Boolean);
  return check(
    'forbidden-copy',
    matches.length === 0 ? 'pass' : 'fail',
    matches.length === 0
      ? 'demo nao expoe paths pessoais, secrets, tokens ou claims proibidos.'
      : 'demo contem path pessoal, segredo, token ou claim proibido.',
    undefined,
    matches,
  );
}

function checkExportedDemo() {
  const outRoot = path.join(root, 'out');
  if (!fs.existsSync(outRoot)) {
    return check(
      'exported-demo',
      'warn',
      'out/ ainda nao existe; rode npm run build para validar /demo exportado.',
      'out',
    );
  }
  const candidates = [
    path.join(outRoot, 'demo.html'),
    path.join(outRoot, 'demo', 'index.html'),
  ];
  const exported = candidates.find((candidate) => fs.existsSync(candidate));
  if (!exported) {
    return check(
      'exported-demo',
      requirePass ? 'fail' : 'warn',
      requirePass
        ? 'build estatico nao exportou /demo.'
        : 'out/ existe, mas ainda nao contem /demo; rode npm run build antes do gate.',
      'out',
      ['/demo'],
    );
  }
  const html = fs.readFileSync(exported, 'utf8');
  const required = ['Build fix com aprovacao e replay', 'Chat comum', 'artifact'];
  const missing = required.filter((phrase) => !html.includes(phrase));
  return check(
    'exported-demo',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? '/demo existe no export estatico com conteudo publico essencial.'
      : '/demo exportado perdeu conteudo publico essencial.',
    'out',
    missing,
  );
}

function readText(relativePath) {
  const target = path.join(root, relativePath);
  return fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
}

function check(title, status, reason, filePath, evidence = []) {
  return { title, status, reason, path: filePath, evidence };
}
