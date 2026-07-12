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
  checkBrandSurface(),
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
  const ok = pkg?.name === 'zavorth-website' && lock?.name === 'zavorth-website';
  return check(
    'package-name',
    ok ? 'pass' : 'fail',
    ok
      ? 'package.json e package-lock.json identificam o site oficial.'
      : 'package.json e package-lock.json precisam usar name=zavorth-website.',
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
    'components/ProductIntroSection.tsx',
    'components/WhatItDoesSection.tsx',
    'components/FeaturesSection.tsx',
    'components/InstallSection.tsx',
    'components/ContentPageShell.tsx',
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
    '/demo',
    '/start',
    '/changelog',
    '/security',
    '/privacy',
    '/terms',
    '#overview',
    '#how-it-works',
    '#install',
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

function checkBrandSurface() {
  const globals = readText('app/globals.css');
  const layout = readText('app/layout.tsx');
  const favicon = readText('public/favicon.svg');
  const hero = readText('components/Hero.tsx');
  const hard = [];
  const soft = [];

  if (/fontshare/i.test(globals) || /api\.fontshare\.com/i.test(globals)) {
    hard.push('app/globals.css must not import Fontshare');
  }
  if (/Playfair/i.test(layout) || /fonts\.google.*Playfair/i.test(layout)) {
    hard.push('app/layout.tsx must not import Playfair');
  }
  if (/Satoshi|Clash Display|Clash_Display/i.test(`${globals}\n${layout}`)) {
    hard.push('typography stack must not reintroduce Satoshi/Clash Display');
  }
  if (!favicon.includes('#00e88f')) {
    hard.push('public/favicon.svg must use brand green #00e88f');
  }

  const publicDir = path.join(root, 'public');
  if (fs.existsSync(publicDir)) {
    const publicNames = listFilesRecursive(publicDir).map((file) =>
      path.relative(publicDir, file).split(path.sep).join('/').toLowerCase(),
    );
    const banned = publicNames.filter(
      (name) =>
        name.includes('antigravity') ||
        name.includes('zavorth-motion.html') ||
        name.includes('gemini-hero') ||
        name.includes('runtime-approvals') ||
        name.includes('runtime-connected') ||
        name.includes('basilisk'),
    );
    if (banned.length > 0) {
      hard.push(`public/ must not ship banned brand demos: ${banned.join(', ')}`);
    }

    // Real product UI only — current desktop/control shell, never legacy fox mocks.
    const productProofs = [
      'product/zavorth-desktop-shell.png',
      'product/zavorth-control-overview.png',
    ];
    const hasAnyProof = productProofs.some((proof) => publicNames.includes(proof));
    if (!hasAnyProof) {
      hard.push(
        `public/ missing product proof — need one of: ${productProofs.join(', ')}`,
      );
    }
    const bannedLegacyBrand = publicNames.filter(
      (name) =>
        name.includes('zavorth-command-center') ||
        name.includes('command-center.png') ||
        (name.includes('fox') && name.endsWith('.png')),
    );
    if (bannedLegacyBrand.length > 0) {
      hard.push(
        `public/ must not ship abandoned brand assets (fox / old command-center mock): ${bannedLegacyBrand.join(', ')}`,
      );
    }
  }

  const hasReducedMotion =
    /prefers-reduced-motion/i.test(hero) ||
    (/matchMedia\s*\(/.test(hero) && /reduce/i.test(hero));
  if (!hasReducedMotion) {
    soft.push('components/Hero.tsx should honor prefers-reduced-motion / matchMedia reduce on title typing');
  }

  if (hard.length > 0) {
    return check(
      'brand-surface',
      'fail',
      'superficie de marca publica saiu do contrato (tipografia/favicon/assets).',
      undefined,
      hard,
    );
  }
  if (soft.length > 0) {
    return check(
      'brand-surface',
      'warn',
      'brand surface ok com avisos suaves (reduced-motion ainda opcional ate o hero agent aterrissar).',
      undefined,
      soft,
    );
  }
  return check(
    'brand-surface',
    'pass',
    'tipografia local (sem Fontshare/Playfair), favicon #00e88f, public limpo e hero com reduced-motion.',
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

function listFilesRecursive(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...listFilesRecursive(full));
    else out.push(full);
  }
  return out;
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
    'components/ProductIntroSection.tsx',
    'components/WhatItDoesSection.tsx',
    'components/FeaturesSection.tsx',
    'components/InstallSection.tsx',
    'components/Navbar.tsx',
    'components/Footer.tsx',
    'lib/constants.ts',
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
