export type PublicDemoStepState = 'request' | 'plan' | 'approval' | 'execution' | 'artifact' | 'replay' | 'summary'

export type PublicDemoStep = {
  state: PublicDemoStepState
  label: string
  title: string
  detail: string
  evidence: string
}

export type PublicDemoStatus = {
  label: string
  title: string
  detail: string
}

export const publicDemoStory = {
  slug: 'build-fix-governed-run',
  title: 'Build fix com aprovação e replay',
  objective:
    'Corrigir uma falha de build em um workspace de exemplo, mostrar o plano, pedir aprovação antes de mutar, gerar receipt/artifact e deixar replay auditável — Trust Loop, fixture offline, sem runtime ao vivo.',
  workspace: 'fixture/zavorth-demo-workspace',
  command: 'zavorth run "corrija o build, rode testes e mostre o que mudou"',
  safety: [
    'fixture local sem secrets',
    'sem rede externa obrigatória',
    'preview antes de qualquer mutação',
    'rollback descrito antes de aplicar',
    'não é live runtime — demo estática',
  ],
  steps: [
    {
      state: 'request',
      label: 'Objetivo',
      title: 'Pedido de engenharia',
      detail: 'O operador pede uma entrega concreta, com build, testes e resumo final.',
      evidence: 'prompt capturado no run ledger',
    },
    {
      state: 'plan',
      label: 'Plano',
      title: 'DAG curta e verificável',
      detail: 'Zavorth separa leitura, patch, validação e resumo em etapas pequenas.',
      evidence: '4 etapas, 2 tools, budget local',
    },
    {
      state: 'approval',
      label: 'Aprovação',
      title: 'Preview do patch',
      detail: 'Antes de escrever, a demo mostra arquivos afetados e rollback previsto.',
      evidence: 'approval ticket demo-approval-001',
    },
    {
      state: 'execution',
      label: 'Execução',
      title: 'Patch e testes',
      detail: 'A fixture aplica uma correção pequena e roda o check determinístico.',
      evidence: 'npm test -- --runInBand',
    },
    {
      state: 'artifact',
      label: 'Receipt / Artifact',
      title: 'Evidência revisável',
      detail: 'Receipt com id/status, resumo, diff e logs empacotados como artifact público.',
      evidence: 'receipt + artifact demo-build-fix-report.md',
    },
    {
      state: 'replay',
      label: 'Replay',
      title: 'Rastro redigido',
      detail: 'A demo mostra a sequência sem payload sensível, pronta para auditar.',
      evidence: 'replay demo-run-2026-04-25.json',
    },
    {
      state: 'summary',
      label: 'Resumo',
      title: 'Pronto para revisar',
      detail: 'O operador recebe resultado, risco residual e próximo passo — sem claim de live agent.',
      evidence: 'build pass, 3 arquivos, rollback disponível',
    },
  ] satisfies PublicDemoStep[],
  statuses: [
    {
      label: 'Success',
      title: 'Build e testes passaram',
      detail: 'A demo fecha com evidência de comando e resumo legível.',
    },
    {
      label: 'Error',
      title: 'Falha vira diagnóstico',
      detail: 'Se o teste falhar, a página mostra causa provável e próximo passo.',
    },
    {
      label: 'Approval',
      title: 'Mutação exige sinal',
      detail: 'Nenhum patch sensível aplica sem preview e aprovação humana.',
    },
    {
      label: 'Rollback',
      title: 'Volta segura',
      detail: 'Toda alteração da fixture tem plano de reversão e escopo definido.',
    },
  ] satisfies PublicDemoStatus[],
  artifact: {
    id: 'demo-build-fix-report.md',
    title: 'Artifact / receipt público',
    lines: [
      'Resumo: build corrigido em fixture local (não live runtime).',
      'Arquivos: package.json, src/buildTarget.ts, tests/buildTarget.test.ts.',
      'Validação: npm test -- --runInBand.',
      'Risco residual: baixo; fixture isolada; rollback registrado.',
      'Honesty: página e loop são estáticos; receipt ids são fixture.',
    ],
  },
  replay: {
    id: 'demo-run-2026-04-25.json',
    events: [
      'request.received',
      'workspace.scanned',
      'plan.proposed',
      'approval.previewed',
      'patch.applied',
      'tests.completed',
      'artifact.written',
      'receipt.returned',
      'summary.delivered',
    ],
  },
  comparison: [
    {
      label: 'Chat comum',
      text: 'Responde o que talvez esteja errado e deixa você montar o resto.',
    },
    {
      label: 'Zavorth',
      text: 'Planeja, pede sinal, executa, prova com receipt, registra artifact e deixa replay.',
    },
  ],
} as const
