#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = process.cwd();
const qaDistDir = '.next-basilisk-qa';

removeGeneratedBuildDir(qaDistDir);
removeGeneratedBuildDir('out');

const env = {
  ...process.env,
  BASILISK_NEXT_DIST_DIR: qaDistDir,
  NEXT_TELEMETRY_DISABLED: '1',
};

const nextCli = path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next');
const result = spawnSync(process.execPath, [nextCli, 'build'], {
  cwd: root,
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

const exportRoot = path.join(root, qaDistDir);
const outRoot = path.join(root, 'out');
if (fs.existsSync(path.join(exportRoot, 'index.html'))) {
  if (fs.existsSync(outRoot)) {
    fs.rmSync(outRoot, { recursive: true, force: true });
  }
  fs.cpSync(exportRoot, outRoot, { recursive: true });
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
