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
  title: 'Build fix com aprovacao e replay',
  objective:
    'Corrigir uma falha de build em um workspace de exemplo, mostrar o plano, pedir aprovacao antes de mutar, gerar artifact e deixar replay auditavel.',
  workspace: 'fixture/basilisk-demo-workspace',
  command: 'basilisk run "corrija o build, rode testes e mostre o que mudou"',
  safety: [
    'fixture local sem secrets',
    'sem rede externa obrigatoria',
    'preview antes de qualquer mutacao',
    'rollback descrito antes de aplicar',
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
      title: 'DAG curta e verificavel',
      detail: 'Basilisk separa leitura, patch, validacao e resumo em etapas pequenas.',
      evidence: '4 etapas, 2 tools, budget local',
    },
    {
      state: 'approval',
      label: 'Aprovacao',
      title: 'Preview do patch',
      detail: 'Antes de escrever, a demo mostra arquivos afetados e rollback previsto.',
      evidence: 'approval ticket demo-approval-001',
    },
    {
      state: 'execution',
      label: 'Execucao',
      title: 'Patch e testes',
      detail: 'A fixture aplica uma correcao pequena e roda o check deterministico.',
      evidence: 'npm test -- --runInBand',
    },
    {
      state: 'artifact',
      label: 'Artifact',
      title: 'Entrega revisavel',
      detail: 'Resumo, diff, logs e resultado ficam empacotados como artifact publico.',
      evidence: 'artifact demo-build-fix-report.md',
    },
    {
      state: 'replay',
      label: 'Replay',
      title: 'Rastro redigido',
      detail: 'A demo mostra a sequencia sem payload sensivel, pronta para auditar.',
      evidence: 'replay demo-run-2026-04-25.json',
    },
    {
      state: 'summary',
      label: 'Resumo',
      title: 'Pronto para revisar',
      detail: 'O operador recebe resultado, risco residual e proximo passo.',
      evidence: 'build pass, 3 arquivos, rollback disponivel',
    },
  ] satisfies PublicDemoStep[],
  statuses: [
    {
      label: 'Success',
      title: 'Build e testes passaram',
      detail: 'A demo fecha com evidencia de comando e resumo legivel.',
    },
    {
      label: 'Error',
      title: 'Falha vira diagnostico',
      detail: 'Se o teste falhar, a pagina mostra causa provavel e proximo passo.',
    },
    {
      label: 'Approval',
      title: 'Mutacao exige sinal',
      detail: 'Nenhum patch sensivel aplica sem preview e aprovacao humana.',
    },
    {
      label: 'Rollback',
      title: 'Volta segura',
      detail: 'Toda alteracao da fixture tem plano de reversao e escopo definido.',
    },
  ] satisfies PublicDemoStatus[],
  artifact: {
    id: 'demo-build-fix-report.md',
    title: 'Artifact publico',
    lines: [
      'Resumo: build corrigido em fixture local.',
      'Arquivos: package.json, src/buildTarget.ts, tests/buildTarget.test.ts.',
      'Validacao: npm test -- --runInBand.',
      'Risco residual: baixo; fixture isolada; rollback registrado.',
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
      'summary.delivered',
    ],
  },
  comparison: [
    {
      label: 'Chat comum',
      text: 'Responde o que talvez esteja errado e deixa voce montar o resto.',
    },
    {
      label: 'Basilisk',
      text: 'Planeja, pede sinal, executa, prova, registra artifact e deixa replay.',
    },
  ],
} as const
