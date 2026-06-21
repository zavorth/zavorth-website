#!/usr/bin/env node

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const qaDistDir = '.next-zavorth-qa';
const buildRoot = path.join(os.tmpdir(), `zavorth-website-build-${Date.now()}`);

removeGeneratedBuildDir(qaDistDir);
removeGeneratedBuildDir('out');
prepareIsolatedBuildRoot(buildRoot);

const env = {
  ...process.env,
  ZAVORTH_NEXT_DIST_DIR: qaDistDir,
  NEXT_TELEMETRY_DISABLED: '1',
};

const nextCli = path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next');
const result = spawnSync(process.execPath, [nextCli, 'build'], {
  cwd: buildRoot,
  stdio: 'inherit',
  shell: false,
  env,
});

if (result.error) {
  throw result.error;
}
if (typeof result.status === 'number' && result.status !== 0) {
  process.exit(result.status);
}
if (result.signal) {
  console.error(`build encerrado por sinal ${result.signal}`);
  process.exit(1);
}

const exportRoot = [
  path.join(buildRoot, qaDistDir),
  path.join(buildRoot, 'out'),
].find((candidate) => fs.existsSync(path.join(candidate, 'index.html')));
const outRoot = path.join(root, 'out');
if (exportRoot) {
  if (fs.existsSync(outRoot)) {
    fs.rmSync(outRoot, { recursive: true, force: true });
  }
  fs.cpSync(exportRoot, outRoot, { recursive: true });
  fs.cpSync(exportRoot, path.join(root, qaDistDir), { recursive: true });
} else {
  console.error('build concluido, mas nenhum export estatico foi encontrado.');
  process.exitCode = 1;
}
fs.rmSync(buildRoot, { recursive: true, force: true });

function prepareIsolatedBuildRoot(targetRoot) {
  if (fs.existsSync(targetRoot)) {
    fs.rmSync(targetRoot, { recursive: true, force: true });
  }
  fs.mkdirSync(targetRoot, { recursive: true });

  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (shouldSkipBuildCopy(entry.name)) continue;

    const source = path.join(root, entry.name);
    const target = path.join(targetRoot, entry.name);
    fs.cpSync(source, target, {
      recursive: entry.isDirectory(),
      filter: (sourcePath) => !shouldSkipNestedBuildCopy(path.relative(root, sourcePath)),
    });
  }

  fs.symlinkSync(path.join(root, 'node_modules'), path.join(targetRoot, 'node_modules'), 'junction');
}

function shouldSkipBuildCopy(name) {
  return [
    '.git',
    '.next',
    '.next-zavorth-qa',
    'node_modules',
    'out',
    'tmp',
    'artifacts',
  ].includes(name) || name.startsWith('.next-dev-') || name === '.codex-next-3002.log';
}

function shouldSkipNestedBuildCopy(relativePath) {
  const normalized = relativePath.replaceAll(path.sep, '/');
  return normalized.startsWith('.git/')
    || normalized.startsWith('.next/')
    || normalized.startsWith('.next-zavorth-qa/')
    || normalized.startsWith('node_modules/')
    || normalized.startsWith('out/')
    || normalized.startsWith('tmp/')
    || normalized.startsWith('artifacts/');
}

function removeGeneratedBuildDir(dirName) {
  const resolvedRoot = path.resolve(root);
  const target = path.resolve(resolvedRoot, dirName);
  const relative = path.relative(resolvedRoot, target);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error(`recusando remover diretorio fora do site: ${target}`);
  }
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}
