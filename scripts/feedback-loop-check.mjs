#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass') || process.argv.includes('--gate');

const checks = [
  checkRequiredFiles(),
  checkFeedbackContract(),
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
console.log(`[feedback-loop] ok=${failed === 0 ? 'yes' : 'no'} pass=${passed} warn=${warnings} fail=${failed}`);

if (requirePass && failed > 0) {
  process.exitCode = 1;
}

function checkRequiredFiles() {
  const required = ['app/feedback/page.tsx', 'data/feedback-loop.ts'];
  const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
  return check(
    'required-files',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'rota /feedback e fixture de feedback loop existem.'
      : 'rota /feedback ou fixture de feedback loop estao ausentes.',
    undefined,
    missing,
  );
}

function checkFeedbackContract() {
  const source = `${readText('app/feedback/page.tsx')}\n${readText('data/feedback-loop.ts')}`;
  const required = [
    'Feedback, telemetry opt-in and product loop',
    'Telemetry desligada por padrao',
    'Feedback opt-in',
    'preview redigido',
    'revoke/delete local',
    'Product feedback ledger',
    'product-feedback-ledger.json',
    'feedback-preview-redacted.json',
    'npm run feedback:preview',
    'npm run feedback:revoke',
    'npm run feedback:delete',
    'issue/report template',
    'agregador sem payload sensivel',
    'sem depender de cloud obrigatoria',
  ];
  const missing = required.filter((phrase) => !source.includes(phrase));
  return check(
    'feedback-contract',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? '/feedback cobre opt-in, preview, redaction, revoke/delete, ledger e agregacao segura.'
      : '/feedback perdeu parte do contrato publico de feedback/telemetry.',
    'app/feedback/page.tsx',
    missing,
  );
}

function checkPublicLinks() {
  const source = [
    'components/Navbar.tsx',
    'components/CTASection.tsx',
    'components/Footer.tsx',
    'app/docs/page.tsx',
    'app/release/page.tsx',
    'app/changelog/page.tsx',
    'app/privacy/page.tsx',
  ].map(readText).join('\n');
  const required = ['/feedback', '/docs#feedback-loop', '/privacy', '/release'];
  const missing = required.filter((href) => !source.includes(href));
  return check(
    'public-links',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'site publico aponta para feedback, docs, privacidade e release.'
      : 'links publicos de feedback loop estao incompletos.',
    undefined,
    missing,
  );
}

function checkForbiddenCopy() {
  const source = `${readText('app/feedback/page.tsx')}\n${readText('data/feedback-loop.ts')}`;
  const forbidden = [
    /C:\\TESTES DEV/i,
    /(^|[^A-Za-z])sk-[A-Za-z0-9_-]{12,}/,
    /telemetry ligada por padrao/i,
    /envio automatico/i,
    /sem opt-in/i,
    /sem redaction/i,
    /payload bruto enviado/i,
  ];
  const matches = forbidden
    .map((pattern) => source.match(pattern)?.[0] || '')
    .filter(Boolean);
  return check(
    'forbidden-copy',
    matches.length === 0 ? 'pass' : 'fail',
    matches.length === 0
      ? 'feedback loop nao expoe paths pessoais, tokens ou claims proibidos.'
      : 'feedback loop contem path pessoal, token ou claim proibido.',
    undefined,
    matches,
  );
}

function checkExportedRoute() {
  const outRoot = path.join(root, 'out');
  if (!fs.existsSync(outRoot)) {
    return check(
      'exported-feedback',
      'warn',
      'out/ ainda nao existe; rode npm run build para validar /feedback exportado.',
      'out',
    );
  }
  const candidates = [
    path.join(outRoot, 'feedback.html'),
    path.join(outRoot, 'feedback', 'index.html'),
  ];
  const exported = candidates.find((candidate) => fs.existsSync(candidate));
  if (!exported) {
    return check(
      'exported-feedback',
      requirePass ? 'fail' : 'warn',
      requirePass
        ? 'build estatico nao exportou /feedback.'
        : 'out/ existe, mas ainda nao contem /feedback; rode npm run build antes do gate.',
      'out',
      ['/feedback'],
    );
  }
  const html = fs.readFileSync(exported, 'utf8');
  const required = ['Feedback, telemetry opt-in and product loop', 'Telemetry desligada por padrao', 'feedback-preview-redacted.json'];
  const missing = required.filter((phrase) => !html.includes(phrase));
  return check(
    'exported-feedback',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? '/feedback existe no export estatico com conteudo publico essencial.'
      : '/feedback exportado perdeu conteudo publico essencial.',
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
