#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass') || process.argv.includes('--gate');

const checks = [
  checkRequiredFiles(),
  checkPolicyContract(),
  checkDocsLinks(),
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
console.log(`[distribution-policy] ok=${failed === 0 ? 'yes' : 'no'} pass=${passed} warn=${warnings} fail=${failed}`);

if (requirePass && failed > 0) {
  process.exitCode = 1;
}

function checkRequiredFiles() {
  const required = ['app/editions/page.tsx', 'data/distribution-policy.ts'];
  const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
  return check(
    'required-files',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'rota /editions e fixture de policy existem.'
      : 'rota /editions ou fixture de policy estao ausentes.',
    undefined,
    missing,
  );
}

function checkPolicyContract() {
  const source = `${readText('app/editions/page.tsx')}\n${readText('data/distribution-policy.ts')}`;
  const required = [
    'Editions, plans and distribution policy',
    'Local',
    'Pro Preview',
    'Team Preview',
    'Lab',
    'local-first',
    'Telemetry desligada por padrao',
    'cloud obrigatoria',
    'opt-in',
    'Privacidade e dados',
    'Atualizacoes',
    'Plugins e skills externos',
    'Licenciamento inicial',
    'alpha',
    'beta',
    'stable',
  ];
  const missing = required.filter((phrase) => !source.includes(phrase));
  return check(
    'policy-contract',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? '/editions cobre edicoes, privacidade, updates, plugins, licenciamento e canais.'
      : '/editions perdeu parte do contrato publico de distribuicao.',
    'app/editions/page.tsx',
    missing,
  );
}

function checkDocsLinks() {
  const source = [
    'components/Navbar.tsx',
    'components/CTASection.tsx',
    'components/Footer.tsx',
    'app/docs/page.tsx',
    'app/examples/page.tsx',
    'app/changelog/page.tsx',
  ].map(readText).join('\n');
  const required = ['/editions', '/docs#distribution-policy', '/examples'];
  const missing = required.filter((href) => !source.includes(href));
  return check(
    'public-links',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'site publico aponta para edicoes, policy e exemplos.'
      : 'links publicos de edicoes/policy estao incompletos.',
    undefined,
    missing,
  );
}

function checkForbiddenCopy() {
  const source = `${readText('app/editions/page.tsx')}\n${readText('data/distribution-policy.ts')}`;
  const forbidden = [
    /C:\\TESTES DEV/i,
    /(^|[^A-Za-z])sk-[A-Za-z0-9_-]{12,}/,
    /autonomo sem aprovacao/i,
    /sem limites/i,
    /telemetry ligada por padrao/i,
    /cloud obrigatoria para usar/i,
  ];
  const matches = forbidden
    .map((pattern) => source.match(pattern)?.[0] || '')
    .filter(Boolean);
  return check(
    'forbidden-copy',
    matches.length === 0 ? 'pass' : 'fail',
    matches.length === 0
      ? 'policy nao expoe paths pessoais, secrets ou claims proibidos.'
      : 'policy contem path pessoal, segredo ou claim proibido.',
    undefined,
    matches,
  );
}

function checkExportedRoute() {
  const outRoot = path.join(root, 'out');
  if (!fs.existsSync(outRoot)) {
    return check(
      'exported-editions',
      'warn',
      'out/ ainda nao existe; rode npm run build para validar /editions exportado.',
      'out',
    );
  }
  const candidates = [
    path.join(outRoot, 'editions.html'),
    path.join(outRoot, 'editions', 'index.html'),
  ];
  const exported = candidates.find((candidate) => fs.existsSync(candidate));
  if (!exported) {
    return check(
      'exported-editions',
      requirePass ? 'fail' : 'warn',
      requirePass
        ? 'build estatico nao exportou /editions.'
        : 'out/ existe, mas ainda nao contem /editions; rode npm run build antes do gate.',
      'out',
      ['/editions'],
    );
  }
  const html = fs.readFileSync(exported, 'utf8');
  const required = ['Editions, plans and distribution policy', 'Pro Preview', 'Team Preview'];
  const missing = required.filter((phrase) => !html.includes(phrase));
  return check(
    'exported-editions',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? '/editions existe no export estatico com conteudo publico essencial.'
      : '/editions exportado perdeu conteudo publico essencial.',
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
