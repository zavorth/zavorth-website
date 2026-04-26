export type ReleaseBundleStep = {
  id: string
  label: string
  detail: string
}

export type ReleaseBundleCommand = {
  label: string
  command: string
  reason: string
}

export const releaseBundle = {
  title: 'Release bundle and installer distribution',
  route: '/release',
  version: 'v0.1 Public Preview',
  channel: 'preview',
  promise:
    'Um caminho publico para baixar, verificar, instalar em preview, rodar smoke local e desfazer o setup sem depender de cloud obrigatoria.',
  bundle: {
    id: 'basilisk-v0.1-public-preview-bundle',
    fileName: 'basilisk-v0.1-preview.zip',
    status: 'preview release candidate',
    digest: 'sha256:faae33f9400fdaf6a75a359a883d887cd5079ceff9f0b1011bc63f9078f74f91',
    size: 'artifact fixture',
    contents: [
      'runtime local-first',
      'CLI publica',
      'docs externas',
      'fixtures de demo e first-run',
      'manifesto de release',
    ],
    excludes: [
      'secrets',
      'caches pessoais',
      'paths locais',
      'logs sensiveis',
      'watchers persistentes',
    ],
  },
  installerPreview: [
    {
      id: 'preview',
      label: 'Installer preview',
      detail: 'Mostra pasta alvo, arquivos planejados, scripts que seriam criados e rollback antes de alterar o ambiente.',
    },
    {
      id: 'confirm',
      label: 'Aprovacao explicita',
      detail: 'A instalacao real so acontece depois de o usuario revisar o preview e confirmar o escopo.',
    },
    {
      id: 'local-first',
      label: 'Sem cloud obrigatoria',
      detail: 'O bundle inicia em modo local e usa feedback, telemetry ou sync remoto apenas com opt-in posterior.',
    },
  ] satisfies ReleaseBundleStep[],
  smokePlan: [
    {
      label: 'Status de release',
      command: 'npm run release:status:fast',
      reason: 'Confirma canal, risco e proximo passo sem publicar automaticamente.',
    },
    {
      label: 'Doctor local',
      command: 'npm run doctor:fast',
      reason: 'Valida requisitos locais e falhas acionaveis sem rede externa obrigatoria.',
    },
    {
      label: 'Changelog',
      command: 'npm run release:changelog',
      reason: 'Gera notas publicas com versao, risco e rollback.',
    },
  ] satisfies ReleaseBundleCommand[],
  rollbackPlan: [
    {
      id: 'rollback-preview',
      label: 'Rollback preview',
      detail: 'npm run release:rollback-preview lista o que seria removido antes de qualquer cleanup.',
    },
    {
      id: 'scoped-cleanup',
      label: 'Cleanup limitado',
      detail: 'Remove apenas artefatos criados pelo bundle e nunca apaga arquivos fora do escopo instalado.',
    },
    {
      id: 'offline-safe',
      label: 'Smoke offline',
      detail: 'O smoke do pacote usa fixtures locais e nao exige rede externa para provar o caminho basico.',
    },
  ] satisfies ReleaseBundleStep[],
  changelog: [
    'Basilisk v0.1 Public Preview publica a productizacao publica com bundle verificavel e digest sha256.',
    'Installer opera preview-first com aprovacao explicita.',
    'Rollback/cleanup ficam limitados ao escopo instalado.',
  ],
  releaseTrain: {
    title: 'Preview release train and stable policy',
    baseline: 'v0.1 Public Preview',
    patchLane: 'v0.1.x preview',
    minorLane: 'v0.2.0 preview',
    policy:
      'Preview release tem escopo estreito, smoke local e rollback claro. Stable so pode ser declarado depois de bundle real, tag, smoke de distribuicao e decisao explicita de release.',
    cadence: [
      'release candidate sob demanda, sem processo sempre ligado',
      'tag e GitHub Releases so entram quando o canal stable for aprovado',
      'hotfix sai de baseline/tag estavel e volta com changelog publico',
      'LTS fica fora do preview e exige politica propria antes de ser prometido',
    ],
    checklist: [
      'qa:release-train',
      'qa:phase:59',
      'release:status:fast',
      'release:rollback-preview',
      'release:changelog',
    ],
  },
} as const
