#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass') || process.argv.includes('--gate');

const checks = [
  checkRequiredFiles(),
  checkFixtureContract(),
  checkRouteCopy(),
  checkPublicLinks(),
  checkForbiddenCopy(),
  checkExportedRoute(),
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
console.log(`[first-run] ok=${failed === 0 ? 'yes' : 'no'} pass=${passed} warn=${warnings} fail=${failed}`);

if (requirePass && failed > 0) {
  process.exitCode = 1;
}

function checkRequiredFiles() {
  const required = ['app/start/page.tsx', 'data/first-run.ts'];
  const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
  return check(
    'required-files',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'rota /start e fixture de first-run existem.'
      : 'rota /start ou fixture de first-run estao ausentes.',
    undefined,
    missing,
  );
}

function checkFixtureContract() {
  const fixture = readText('data/first-run.ts');
  const required = [
    'fixture/basilisk-first-run-workspace',
    'requirements',
    'preview',
    'install',
    'first-run',
    'health-check',
    'cleanup',
    'Ready',
    'Missing requirement',
    'Approval needed',
    'Cleanup available',
    'sem credencial externa obrigatoria',
    'sem watcher persistente por padrao',
    'first-run-plan.json',
    'first-run-health.json',
  ];
  const missing = required.filter((phrase) => !fixture.includes(phrase));
  return check(
    'fixture-contract',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'fixture cobre requisitos, preview, health check, cleanup e modo seguro.'
      : 'fixture de first-run perdeu parte do contrato publico.',
    'data/first-run.ts',
    missing,
  );
}

function checkRouteCopy() {
  const route = `${readText('app/start/page.tsx')}\n${readText('data/first-run.ts')}`;
  const required = [
    'First run',
    'Primeiro uso local',
    'Checklist',
    'Detector de requisitos',
    'Preview de setup',
    'Health check',
    'Rollback e cleanup',
    'npm run go',
  ];
  const missing = required.filter((phrase) => !route.includes(phrase));
  return check(
    'route-copy',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'rota /start apresenta primeiro uso, requisitos, preview, health e cleanup.'
      : 'rota /start perdeu texto ou blocos publicos obrigatorios.',
    'app/start/page.tsx',
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
    'app/start/page.tsx',
  ].map(readText).join('\n');
  const required = ['/start', '/docs#first-run'];
  const missing = required.filter((href) => !source.includes(href));
  return check(
    'public-links',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'site publico aponta para /start e roteiro de first-run.'
      : 'links publicos para /start ou roteiro estao incompletos.',
    undefined,
    missing,
  );
}

function checkForbiddenCopy() {
  const source = readText('app/start/page.tsx') + '\n' + readText('data/first-run.ts');
  const forbidden = [
    /C:\\TESTES DEV/i,
    /(^|[^A-Za-z])sk-[A-Za-z0-9_-]{12,}/,
    /token/i,
    /autonomo sem aprovacao/i,
    /sem limites/i,
    /inicia watcher persistente por padrao/i,
  ];
  const matches = forbidden
    .map((pattern) => source.match(pattern)?.[0] || '')
    .filter(Boolean);
  return check(
    'forbidden-copy',
    matches.length === 0 ? 'pass' : 'fail',
    matches.length === 0
      ? 'first-run nao expoe paths pessoais, secrets ou claims proibidos.'
      : 'first-run contem path pessoal, segredo ou claim proibido.',
    undefined,
    matches,
  );
}

function checkExportedRoute() {
  const outRoot = path.join(root, 'out');
  if (!fs.existsSync(outRoot)) {
    return check(
      'exported-start',
      'warn',
      'out/ ainda nao existe; rode npm run build para validar /start exportado.',
      'out',
    );
  }
  const candidates = [
    path.join(outRoot, 'start.html'),
    path.join(outRoot, 'start', 'index.html'),
  ];
  const exported = candidates.find((candidate) => fs.existsSync(candidate));
  if (!exported) {
    return check(
      'exported-start',
      requirePass ? 'fail' : 'warn',
      requirePass
        ? 'build estatico nao exportou /start.'
        : 'out/ existe, mas ainda nao contem /start; rode npm run build antes do gate.',
      'out',
      ['/start'],
    );
  }
  const html = fs.readFileSync(exported, 'utf8');
  const required = ['Primeiro uso local', 'Health check', 'cleanup'];
  const missing = required.filter((phrase) => !html.includes(phrase));
  return check(
    'exported-start',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? '/start existe no export estatico com conteudo publico essencial.'
      : '/start exportado perdeu conteudo publico essencial.',
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
