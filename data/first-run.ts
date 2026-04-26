export type FirstRunStepState =
  | 'requirements'
  | 'preview'
  | 'install'
  | 'first-run'
  | 'health-check'
  | 'cleanup'

export type FirstRunStep = {
  state: FirstRunStepState
  label: string
  title: string
  detail: string
  evidence: string
}

export type FirstRunStatus = {
  label: string
  title: string
  detail: string
}

export const firstRunStory = {
  slug: 'public-first-run-local',
  title: 'Primeiro uso local com preview',
  objective:
    'Sair do site para uma primeira sessao local segura: checar requisitos, mostrar plano, rodar modo fixture, verificar saude e explicar cleanup.',
  workspace: 'fixture/basilisk-first-run-workspace',
  command: 'npm run go',
  followUpCommands: ['npm run doctor', 'npm run chat'],
  safety: [
    'sem credencial externa obrigatoria',
    'sem watcher persistente por padrao',
    'preview antes de setup com risco',
    'cleanup limitado aos artefatos do first-run',
  ],
  requirements: [
    {
      label: 'Node.js',
      status: 'necessario',
      detail: 'Node.js 18 ou mais recente para executar scripts e CLI local.',
    },
    {
      label: 'Workspace local',
      status: 'necessario',
      detail: 'Um diretorio de trabalho onde o Basilisk pode criar apenas artefatos do first-run.',
    },
    {
      label: 'Rede externa',
      status: 'opcional',
      detail: 'A jornada fixture-first nao exige servico externo obrigatorio.',
    },
  ],
  steps: [
    {
      state: 'requirements',
      label: 'Detector de requisitos',
      title: 'Checagem antes de rodar',
      detail: 'O first-run valida Node.js, workspace e comandos publicos antes de sugerir qualquer acao.',
      evidence: 'first-run preflight: node, npm, workspace',
    },
    {
      state: 'preview',
      label: 'Preview de setup',
      title: 'Plano legivel primeiro',
      detail: 'A tela mostra o que sera criado, o que nao sera tocado e quando uma aprovacao seria exigida.',
      evidence: 'first-run-plan.json',
    },
    {
      state: 'install',
      label: 'Modo local seguro',
      title: 'Execucao sem credenciais',
      detail: 'O comando publico entra em modo local/fixture e evita dependencia externa no primeiro contato.',
      evidence: 'fixture/basilisk-first-run-workspace',
    },
    {
      state: 'first-run',
      label: 'Primeira sessao',
      title: 'Runtime governado aberto',
      detail: 'A pessoa chega no loop com comando, contexto inicial e proximo passo humano.',
      evidence: 'npm run go',
    },
    {
      state: 'health-check',
      label: 'Health check',
      title: 'Diagnostico amigavel',
      detail: 'Falhas comuns viram mensagens acionaveis: dependencia ausente, permissao ou workspace invalido.',
      evidence: 'first-run-health.json',
    },
    {
      state: 'cleanup',
      label: 'Rollback e cleanup',
      title: 'Saida controlada',
      detail: 'O cleanup remove apenas artefatos criados pela jornada e preserva arquivos fora do escopo.',
      evidence: 'first-run-cleanup-preview',
    },
  ] satisfies FirstRunStep[],
  statuses: [
    {
      label: 'Ready',
      title: 'Pronto para primeira sessao',
      detail: 'Requisitos minimos presentes e modo fixture disponivel.',
    },
    {
      label: 'Missing requirement',
      title: 'Falta algo local',
      detail: 'A UI explica o requisito ausente e o proximo passo concreto.',
    },
    {
      label: 'Approval needed',
      title: 'Mudanca com risco pede sinal',
      detail: 'Qualquer setup que altere ambiente real fica atras de preview e confirmacao.',
    },
    {
      label: 'Cleanup available',
      title: 'Rollback limitado',
      detail: 'A remocao fica restrita ao workspace e aos artefatos gerados no first-run.',
    },
  ] satisfies FirstRunStatus[],
  artifacts: [
    'first-run-plan.json',
    'first-run-health.json',
    'first-run-cleanup-preview',
  ],
} as const
