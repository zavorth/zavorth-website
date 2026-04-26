export type EditionPolicy = {
  id: string
  name: string
  status: 'public' | 'preview' | 'lab'
  audience: string
  includes: string[]
  boundaries: string[]
}

export type DistributionPolicyItem = {
  label: string
  detail: string
}

export const distributionPolicy = {
  title: 'Editions, plans and distribution policy',
  promise:
    'Uma politica publica para separar core local, recursos preview, uso em time, labs experimentais e distribuicao sem cloud obrigatoria.',
  route: '/editions',
  editions: [
    {
      id: 'local',
      name: 'Local',
      status: 'public',
      audience: 'Pessoa rodando Basilisk na propria maquina.',
      includes: [
        'Runtime local-first',
        'CLI, docs, demo e first-run',
        'Approvals, artifacts e replay local',
        'Telemetry desligada por padrao',
      ],
      boundaries: [
        'Sem cloud obrigatoria',
        'Sem sync remoto por padrao',
        'Sem watcher persistente no primeiro uso',
      ],
    },
    {
      id: 'pro-preview',
      name: 'Pro Preview',
      status: 'preview',
      audience: 'Operador que quer fluxos avancados e release UX com mais conveniencia.',
      includes: [
        'Release status e rollback preview',
        'Artifact/replay workbench',
        'Self-heal supervisionado quando habilitado',
        'Budget e observability locais',
      ],
      boundaries: [
        'Publicacao exige comando explicito',
        'Capacidades remotas continuam opt-in',
        'Recursos preview podem mudar antes de stable',
      ],
    },
    {
      id: 'team-preview',
      name: 'Team Preview',
      status: 'preview',
      audience: 'Times que precisam de policy, tenants e auditoria compartilhada.',
      includes: [
        'Tenant/team ops',
        'Policy ledger',
        'Aprovacoes e permissao por escopo',
        'Relatorios redigidos para revisao',
      ],
      boundaries: [
        'Dados compartilhados exigem configuracao explicita',
        'Sync remoto e telemetry sao opt-in',
        'Local-first continua funcional sem conta cloud',
      ],
    },
    {
      id: 'lab',
      name: 'Lab',
      status: 'lab',
      audience: 'Exploracao de hardware, mesh federado e automacoes mais profundas.',
      includes: [
        'Federated mesh experimental',
        'Hardware action plane supervisionado',
        'Skill evolution em sandbox',
        'Automations com approval e budget',
      ],
      boundaries: [
        'Nao e canal stable',
        'Acoes destrutivas ficam preview-first',
        'Sandbox e permissao sao obrigatorios para risco alto',
      ],
    },
  ] satisfies EditionPolicy[],
  policies: [
    {
      label: 'Privacidade e dados',
      detail: 'O core local nao envia payload sensivel por padrao. Telemetry, feedback, sync remoto e reports externos exigem opt-in e preview.',
    },
    {
      label: 'Atualizacoes',
      detail: 'Canais alpha, beta e stable devem declarar risco, rollback e changelog antes de distribuicao publica.',
    },
    {
      label: 'Plugins e skills externos',
      detail: 'Itens externos entram por trust policy, proveniencia, allowlist quando aplicavel e aprovacao antes de mutacao.',
    },
    {
      label: 'Licenciamento inicial',
      detail: 'Preview publico enquanto stable nao for aprovado; qualquer licenca publica deve vir com escopo explicito.',
    },
  ] satisfies DistributionPolicyItem[],
  releaseChannels: [
    'alpha: rapido, experimental e sujeito a mudancas',
    'beta: preview mais estavel com changelog e rollback',
    'stable: canal publico depois de bundle e smoke de distribuicao',
  ],
} as const
