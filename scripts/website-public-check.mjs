#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass') || process.argv.includes('--gate');

const checks = [
  checkPackageName(),
  checkNextExport(),
  checkRequiredFiles(),
  checkRequiredSourceLinks(),
  checkForbiddenPublicCopy(),
  checkExportedRoutes(),
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
console.log(`[website-public] ok=${failed === 0 ? 'yes' : 'no'} pass=${passed} warn=${warnings} fail=${failed}`);

if (requirePass && failed > 0) {
  process.exitCode = 1;
}

function checkPackageName() {
  const pkg = readJson('package.json');
  const lock = readJson('package-lock.json');
  const ok = pkg?.name === 'basilisk-website' && lock?.name === 'basilisk-website';
  return check(
    'package-name',
    ok ? 'pass' : 'fail',
    ok
      ? 'package.json e package-lock.json identificam o site oficial.'
      : 'package.json e package-lock.json precisam usar name=basilisk-website.',
    'package.json',
    [`package=${pkg?.name || '<ausente>'}`, `lock=${lock?.name || '<ausente>'}`],
  );
}

function checkNextExport() {
  const config = readText('next.config.js');
  const ok = config.includes("output: 'export'") && config.includes('unoptimized: true');
  return check(
    'next-static-export',
    ok ? 'pass' : 'fail',
    ok
      ? 'next.config.js esta configurado para export estatico.'
      : 'next.config.js precisa manter output export e imagens unoptimized.',
    'next.config.js',
  );
}

function checkRequiredFiles() {
  const required = [
    'app/page.tsx',
    'app/docs/page.tsx',
    'app/changelog/page.tsx',
    'app/security/page.tsx',
    'app/privacy/page.tsx',
    'app/terms/page.tsx',
    'components/Hero.tsx',
    'components/DemoSection.tsx',
    'components/RuntimeSection.tsx',
    'components/FeaturesSection.tsx',
    'components/ConnectsSection.tsx',
    'components/CTASection.tsx',
  ];
  const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
  return check(
    'required-files',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'rotas e componentes publicos obrigatorios existem.'
      : 'faltam rotas ou componentes publicos obrigatorios.',
    undefined,
    missing,
  );
}

function checkRequiredSourceLinks() {
  const source = readSources();
  const required = [
    '/docs',
    '/docs#quickstart',
    '/changelog',
    '/security',
    '/privacy',
    '/terms',
    '#product',
    '#runtime',
    '#governance',
    '#connects',
    '#get-started',
  ];
  const missing = required.filter((link) => !source.includes(link));
  return check(
    'source-links',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'links principais de produto, docs e paginas publicas estao presentes.'
      : 'links principais do site publico estao ausentes ou quebrados na fonte.',
    undefined,
    missing,
  );
}

function checkForbiddenPublicCopy() {
  const source = readSources();
  const forbidden = [
    /C:\\TESTES DEV/i,
    /sk-[A-Za-z0-9_-]{12,}/,
    /Substitua este resumo/i,
    /100% seguro/i,
    /sem limites/i,
    /always-on/i,
    /autonomo sem aprovacao/i,
  ];
  const matches = forbidden
    .map((pattern) => source.match(pattern)?.[0] || '')
    .filter(Boolean);
  return check(
    'forbidden-copy',
    matches.length === 0 ? 'pass' : 'fail',
    matches.length === 0
      ? 'copy publica nao expoe paths pessoais, secrets, placeholders ou claims proibidos.'
      : 'copy publica contem placeholder, segredo, path pessoal ou claim proibido.',
    undefined,
    matches,
  );
}

function checkExportedRoutes() {
  const outRoot = path.join(root, 'out');
  if (!fs.existsSync(outRoot)) {
    return check(
      'exported-routes',
      'warn',
      'out/ ainda nao existe; rode npm run build para validar rotas exportadas.',
      'out',
    );
  }
  const routes = ['/', '/docs', '/changelog', '/security', '/privacy', '/terms'];
  const missing = routes.filter((route) => !findExportedHtml(outRoot, route));
  return check(
    'exported-routes',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'rotas publicas principais existem no export estatico.'
      : 'alguma rota publica principal nao foi gerada no export estatico.',
    'out',
    missing,
  );
}

function findExportedHtml(outRoot, route) {
  if (route === '/') {
    return fs.existsSync(path.join(outRoot, 'index.html'));
  }
  const clean = route.replace(/^\/+/, '');
  const candidates = [
    path.join(outRoot, `${clean}.html`),
    path.join(outRoot, clean, 'index.html'),
  ];
  return candidates.some((candidate) => fs.existsSync(candidate));
}

function readSources() {
  return [
    'app/page.tsx',
    'app/docs/page.tsx',
    'app/changelog/page.tsx',
    'app/security/page.tsx',
    'app/privacy/page.tsx',
    'app/terms/page.tsx',
    'components/Hero.tsx',
    'components/Navbar.tsx',
    'components/CTASection.tsx',
    'components/Footer.tsx',
  ].map(readText).join('\n');
}

function readText(relativePath) {
  const target = path.join(root, relativePath);
  return fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
}

function readJson(relativePath) {
  try {
    return JSON.parse(readText(relativePath));
  } catch {
    return null;
  }
}

function check(title, status, reason, filePath, evidence = []) {
  return { title, status, reason, path: filePath, evidence };
}
