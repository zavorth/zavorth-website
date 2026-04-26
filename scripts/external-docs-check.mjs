#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requirePass = process.argv.includes('--require-pass') || process.argv.includes('--gate');

const checks = [
  checkRequiredFiles(),
  checkDocsContract(),
  checkExamplesContract(),
  checkPublicLinks(),
  checkForbiddenCopy(),
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
console.log(`[external-docs] ok=${failed === 0 ? 'yes' : 'no'} pass=${passed} warn=${warnings} fail=${failed}`);

if (requirePass && failed > 0) {
  process.exitCode = 1;
}

function checkRequiredFiles() {
  const required = ['app/docs/page.tsx', 'app/examples/page.tsx', 'data/external-docs.ts'];
  const missing = required.filter((file) => !fs.existsSync(path.join(root, file)));
  return check(
    'required-files',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'docs externas, exemplos e fixture existem.'
      : 'docs externas, exemplos ou fixture estao ausentes.',
    undefined,
    missing,
  );
}

function checkDocsContract() {
  const source = `${readText('app/docs/page.tsx')}\n${readText('data/external-docs.ts')}`;
  const required = [
    'External docs',
    'Quickstart',
    'Primeiro uso local',
    'Seguranca local-first',
    'Examples',
    'Troubleshooting',
    'Feature maturity',
    'npm run go',
    'npm run chat',
    'npm run doctor',
    'Approvals',
    'artifacts',
    'replay',
    'Tenants',
  ];
  const missing = required.filter((phrase) => !source.includes(phrase));
  return check(
    'docs-contract',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? '/docs cobre instalacao, first-run, seguranca, exemplos, troubleshooting e maturidade.'
      : '/docs perdeu parte do contrato publico externo.',
    'app/docs/page.tsx',
    missing,
  );
}

function checkExamplesContract() {
  const source = `${readText('app/examples/page.tsx')}\n${readText('data/external-docs.ts')}`;
  const required = [
    'Exemplos externos por caso de uso',
    'Engenharia',
    'Release',
    'Artifacts',
    'replay',
    'npm run chat',
    'npm run release:status:fast',
    'npm run status:fast',
    'guardrail',
  ];
  const missing = required.filter((phrase) => !source.includes(phrase));
  return check(
    'examples-contract',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? '/examples cobre engenharia, release, artifacts/replay e guardrails.'
      : '/examples perdeu caso de uso ou guardrail obrigatorio.',
    'app/examples/page.tsx',
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
    'app/changelog/page.tsx',
    'data/external-docs.ts',
  ].map(readText).join('\n');
  const required = ['/examples', '/docs#external-docs', '/docs#examples', '/start', '/demo'];
  const missing = required.filter((href) => !source.includes(href));
  return check(
    'public-links',
    missing.length === 0 ? 'pass' : 'fail',
    missing.length === 0
      ? 'site publico aponta para docs externas, exemplos, first-run e demo.'
      : 'links publicos de docs/examples estao incompletos.',
    undefined,
    missing,
  );
}

function checkForbiddenCopy() {
  const source = [
    'app/docs/page.tsx',
    'app/examples/page.tsx',
    'data/external-docs.ts',
  ].map(readText).join('\n');
  const forbidden = [
    /C:\\TESTES DEV/i,
    /(^|[^A-Za-z])sk-[A-Za-z0-9_-]{12,}/,
    /autonomo sem aprovacao/i,
    /sem limites/i,
    /sempre ligado por padrao/i,
  ];
  const matches = forbidden
    .map((pattern) => source.match(pattern)?.[0] || '')
    .filter(Boolean);
  return check(
    'forbidden-copy',
    matches.length === 0 ? 'pass' : 'fail',
    matches.length === 0
      ? 'docs externas nao expoem paths pessoais, secrets ou claims proibidos.'
      : 'docs externas contem path pessoal, segredo ou claim proibido.',
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
      'out/ ainda nao existe; rode npm run build para validar docs/examples exportados.',
      'out',
    );
  }
  const routes = [
    { route: '/docs', candidates: ['docs.html', path.join('docs', 'index.html')], phrases: ['External docs', 'Feature maturity'] },
    { route: '/examples', candidates: ['examples.html', path.join('examples', 'index.html')], phrases: ['Exemplos externos por caso de uso', 'guardrail'] },
  ];
  const evidence = [];
  for (const route of routes) {
    const filePath = route.candidates
      .map((candidate) => path.join(outRoot, candidate))
      .find((candidate) => fs.existsSync(candidate));
    if (!filePath) {
      evidence.push(`rota ausente: ${route.route}`);
      continue;
    }
    const html = fs.readFileSync(filePath, 'utf8');
    for (const phrase of route.phrases) {
      if (!html.includes(phrase)) {
        evidence.push(`${route.route} sem ${phrase}`);
      }
    }
  }
  if (evidence.length > 0 && !requirePass) {
    return check(
      'exported-routes',
      'warn',
      'out/ existe, mas ainda nao contem docs/examples atualizados; rode npm run build antes do gate.',
      'out',
      evidence,
    );
  }
  return check(
    'exported-routes',
    evidence.length === 0 ? 'pass' : 'fail',
    evidence.length === 0
      ? '/docs e /examples existem no export estatico com conteudo essencial.'
      : 'export estatico perdeu rota ou conteudo de docs/examples.',
    'out',
    evidence,
  );
}

function readText(relativePath) {
  const target = path.join(root, relativePath);
  return fs.existsSync(target) ? fs.readFileSync(target, 'utf8') : '';
}

function check(title, status, reason, filePath, evidence = []) {
  return { title, status, reason, path: filePath, evidence };
}
