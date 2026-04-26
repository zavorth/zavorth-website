#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass') || process.argv.includes('--gate');

const checks = [
  checkRequiredFiles(),
  checkReleaseContract(),
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
console.log(`[release-bundle] ok=${failed === 0 ? 'yes' : 'no'} pass=${passed} warn=${warnings} fail=${failed}`);

if (requirePass && failed > 0) {
  process.exitCode = 1;
}

function checkRequiredFiles() {
  const required = ['app/release/page.tsx', 'data/release-bundle.ts'];
  const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
  return check(
    'required-files',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'rota /release e fixture de release bundle existem.'
      : 'rota /release ou fixture de release bundle estao ausentes.',
    undefined,
    missing,
  );
}

function checkReleaseContract() {
  const source = `${readText('app/release/page.tsx')}\n${readText('data/release-bundle.ts')}`;
  const required = [
    'Release bundle and installer distribution',
    'v0.1 Public Preview',
    'basilisk-v0.1-preview.zip',
    'sha256:faae33f9400fdaf6a75a359a883d887cd5079ceff9f0b1011bc63f9078f74f91',
    'Installer preview',
    'Aprovacao explicita',
    'Sem cloud obrigatoria',
    'npm run release:status:fast',
    'npm run doctor:fast',
    'npm run release:changelog',
    'npm run release:rollback-preview',
    'Cleanup limitado',
    'sem rede externa obrigatoria',
    'changelog publico',
  ];
  const missing = required.filter((phrase) => !source.includes(phrase));
  return check(
    'release-contract',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? '/release cobre bundle, digest, installer preview, smoke, rollback e changelog.'
      : '/release perdeu parte do contrato publico de bundle/installer.',
    'app/release/page.tsx',
    missing,
  );
}

function checkPublicLinks() {
  const source = [
    'components/Navbar.tsx',
    'components/CTASection.tsx',
    'components/Footer.tsx',
    'app/docs/page.tsx',
    'app/examples/page.tsx',
    'app/editions/page.tsx',
    'app/changelog/page.tsx',
  ].map(readText).join('\n');
  const required = ['/release', '/docs#release-bundle', '/changelog', '/editions'];
  const missing = required.filter((href) => !source.includes(href));
  return check(
    'public-links',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'site publico aponta para release, docs, changelog e policy.'
      : 'links publicos de release bundle estao incompletos.',
    undefined,
    missing,
  );
}

function checkForbiddenCopy() {
  const source = `${readText('app/release/page.tsx')}\n${readText('data/release-bundle.ts')}`;
  const forbidden = [
    /C:\\TESTES DEV/i,
    /(^|[^A-Za-z])sk-[A-Za-z0-9_-]{12,}/,
    /segredo real/i,
    /path pessoal/i,
    /instala automaticamente/i,
    /cloud obrigatoria para usar/i,
    /telemetry ligada por padrao/i,
  ];
  const matches = forbidden
    .map((pattern) => source.match(pattern)?.[0] || '')
    .filter(Boolean);
  return check(
    'forbidden-copy',
    matches.length === 0 ? 'pass' : 'fail',
    matches.length === 0
      ? 'release bundle nao expoe paths pessoais, secrets ou claims proibidos.'
      : 'release bundle contem path pessoal, segredo ou claim proibido.',
    undefined,
    matches,
  );
}

function checkExportedRoute() {
  const outRoot = path.join(root, 'out');
  if (!fs.existsSync(outRoot)) {
    return check(
      'exported-release',
      'warn',
      'out/ ainda nao existe; rode npm run build para validar /release exportado.',
      'out',
    );
  }
  const candidates = [
    path.join(outRoot, 'release.html'),
    path.join(outRoot, 'release', 'index.html'),
  ];
  const exported = candidates.find((candidate) => fs.existsSync(candidate));
  if (!exported) {
    return check(
      'exported-release',
      requirePass ? 'fail' : 'warn',
      requirePass
        ? 'build estatico nao exportou /release.'
        : 'out/ existe, mas ainda nao contem /release; rode npm run build antes do gate.',
      'out',
      ['/release'],
    );
  }
  const html = fs.readFileSync(exported, 'utf8');
  const required = ['Release bundle and installer distribution', 'basilisk-v0.1-preview.zip', 'Installer preview'];
  const missing = required.filter((phrase) => !html.includes(phrase));
  return check(
    'exported-release',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? '/release existe no export estatico com conteudo publico essencial.'
      : '/release exportado perdeu conteudo publico essencial.',
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
