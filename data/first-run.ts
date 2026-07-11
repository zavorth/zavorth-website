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
    'Sair do site para uma primeira sessão local segura: checar requisitos, mostrar plano, rodar modo fixture, verificar saúde e explicar cleanup.',
  workspace: 'fixture/zavorth-first-run-workspace',
  command: 'npm run go',
  followUpCommands: ['npm run doctor', 'npm run chat'],
  safety: [
    'sem credencial externa obrigatória',
    'sem watcher persistente por padrão',
    'preview antes de setup com risco',
    'cleanup limitado aos artefatos do first-run',
  ],
  requirements: [
    {
      label: 'Node.js',
      status: 'necessário',
      detail: 'Node.js 18 ou mais recente para executar scripts e CLI local.',
    },
    {
      label: 'Workspace local',
      status: 'necessário',
      detail: 'Um diretório de trabalho onde o Zavorth pode criar apenas artefatos do first-run.',
    },
    {
      label: 'Rede externa',
      status: 'opcional',
      detail: 'A jornada fixture-first não exige serviço externo obrigatório.',
    },
  ],
  steps: [
    {
      state: 'requirements',
      label: 'Detector de requisitos',
      title: 'Checagem antes de rodar',
      detail: 'O first-run valida Node.js, workspace e comandos públicos antes de sugerir qualquer ação.',
      evidence: 'first-run preflight: node, npm, workspace',
    },
    {
      state: 'preview',
      label: 'Preview de setup',
      title: 'Plano legível primeiro',
      detail: 'A tela mostra o que será criado, o que não será tocado e quando uma aprovação seria exigida.',
      evidence: 'first-run-plan.json',
    },
    {
      state: 'install',
      label: 'Modo local seguro',
      title: 'Execução sem credenciais',
      detail: 'O comando público entra em modo local/fixture e evita dependência externa no primeiro contato.',
      evidence: 'fixture/zavorth-first-run-workspace',
    },
    {
      state: 'first-run',
      label: 'Primeira sessão',
      title: 'Runtime governado aberto',
      detail: 'A pessoa chega no loop com comando, contexto inicial e próximo passo humano.',
      evidence: 'npm run go',
    },
    {
      state: 'health-check',
      label: 'Health check',
      title: 'Diagnóstico amigável',
      detail: 'Falhas comuns viram mensagens acionáveis: dependência ausente, permissão ou workspace inválido.',
      evidence: 'first-run-health.json',
    },
    {
      state: 'cleanup',
      label: 'Rollback e cleanup',
      title: 'Saída controlada',
      detail: 'O cleanup remove apenas artefatos criados pela jornada e preserva arquivos fora do escopo.',
      evidence: 'first-run-cleanup-preview',
    },
  ] satisfies FirstRunStep[],
  statuses: [
    {
      label: 'Ready',
      title: 'Pronto para primeira sessão',
      detail: 'Requisitos mínimos presentes e modo fixture disponível.',
    },
    {
      label: 'Missing requirement',
      title: 'Falta algo local',
      detail: 'A UI explica o requisito ausente e o próximo passo concreto.',
    },
    {
      label: 'Approval needed',
      title: 'Mudança com risco pede sinal',
      detail: 'Qualquer setup que altere ambiente real fica atrás de preview e confirmação.',
    },
    {
      label: 'Cleanup available',
      title: 'Rollback limitado',
      detail: 'A remoção fica restrita ao workspace e aos artefatos gerados no first-run.',
    },
  ] satisfies FirstRunStatus[],
  artifacts: [
    'first-run-plan.json',
    'first-run-health.json',
    'first-run-cleanup-preview',
  ],
} as const
