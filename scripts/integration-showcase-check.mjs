#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass') || process.argv.includes('--gate');

const checks = [
  checkRequiredFiles(),
  checkShowcaseContract(),
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
console.log(`[integration-showcase] ok=${failed === 0 ? 'yes' : 'no'} pass=${passed} warn=${warnings} fail=${failed}`);

if (requirePass && failed > 0) {
  process.exitCode = 1;
}

function checkRequiredFiles() {
  const required = [
    'app/integrations/page.tsx',
    'data/integration-showcase.ts',
  ];
  const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
  return check(
    'required-files',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'rota /integrations e fixture de integration showcase existem.'
      : 'rota /integrations ou fixture de integration showcase estao ausentes.',
    undefined,
    missing,
  );
}

function checkShowcaseContract() {
  const source = `${readText('app/integrations/page.tsx')}\n${readText('data/integration-showcase.ts')}`;
  const required = [
    'Integration Showcase And Partner Surface',
    'Slack',
    'GitHub',
    'Vercel',
    'Figma',
    'fixture',
    'local',
    'credencial real',
    'degradacao segura',
    'Trust Plane',
    'approval',
    'audit trail',
    'partner surface auditavel',
    'sem parceria formal prometida',
    'npm run integration-showcase',
    'npm run qa:integration-showcase',
  ];
  const missing = required.filter((phrase) => !source.includes(phrase));
  return check(
    'showcase-contract',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? '/integrations cobre vendors, modos, fixture, degradacao segura, Trust Plane e partner surface.'
      : '/integrations perdeu parte do contrato publico de integracoes.',
    'app/integrations/page.tsx',
    missing,
  );
}

function checkPublicLinks() {
  const source = [
    'components/Navbar.tsx',
    'components/CTASection.tsx',
    'components/Footer.tsx',
    'components/ConnectsSection.tsx',
    'app/docs/page.tsx',
  ].map(readText).join('\n');
  const required = ['/integrations', '/docs#integration-showcase'];
  const missing = required.filter((href) => !source.includes(href));
  return check(
    'public-links',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'site publico aponta para /integrations e docs da showcase.'
      : 'links publicos da integration showcase estao incompletos.',
    undefined,
    missing,
  );
}

function checkForbiddenCopy() {
  const source = `${readText('app/integrations/page.tsx')}\n${readText('data/integration-showcase.ts')}`;
  const forbidden = [
    /C:\\TESTES DEV/i,
    /(^|[^A-Za-z])sk-[A-Za-z0-9_-]{12,}/,
    /parceria oficial garantida/i,
    /somos parceiro oficial/i,
    /official partner/i,
    /vendor endorsed/i,
    /credencial obrigatoria/i,
    /sem Trust Plane/i,
    /bypass(?:ar)? Trust Plane/i,
    /cloud obrigatoria/i,
  ];
  const matches = forbidden
    .map((pattern) => source.match(pattern)?.[0] || '')
    .filter(Boolean);
  return check(
    'forbidden-copy',
    matches.length === 0 ? 'pass' : 'fail',
    matches.length === 0
      ? 'showcase nao expoe path pessoal, token ou claim proibido de parceria.'
      : 'showcase contem path pessoal, token ou claim proibido.',
    undefined,
    matches,
  );
}

function checkExportedRoute() {
  const outRoot = path.join(root, 'out');
  if (!fs.existsSync(outRoot)) {
    return check(
      'exported-integrations',
      'warn',
      'out/ ainda nao existe; rode npm run build para validar /integrations exportado.',
      'out',
    );
  }
  const candidates = [
    path.join(outRoot, 'integrations.html'),
    path.join(outRoot, 'integrations', 'index.html'),
  ];
  const exported = candidates.find((candidate) => fs.existsSync(candidate));
  if (!exported) {
    return check(
      'exported-integrations',
      requirePass ? 'fail' : 'warn',
      requirePass
        ? 'build estatico nao exportou /integrations.'
        : 'out/ existe, mas ainda nao contem /integrations; rode npm run build antes do gate.',
      'out',
      ['/integrations'],
    );
  }
  const html = fs.readFileSync(exported, 'utf8');
  const required = ['Integration Showcase And Partner Surface', 'Trust Plane', 'Slack', 'GitHub', 'Vercel', 'Figma'];
  const missing = required.filter((phrase) => !html.includes(phrase));
  return check(
    'exported-integrations',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? '/integrations existe no export estatico com conteudo publico essencial.'
      : '/integrations exportado perdeu conteudo publico essencial.',
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
