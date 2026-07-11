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
    'Uma política pública para separar core local, recursos preview, uso em time, labs experimentais e distribuição sem cloud obrigatória.',
  route: '/editions',
  editions: [
    {
      id: 'local',
      name: 'Local',
      status: 'public',
      audience: 'Pessoa rodando Zavorth na própria máquina.',
      includes: [
        'Runtime local-first',
        'CLI, docs, demo e first-run',
        'Approvals, artifacts e replay local',
        'Telemetria desligada por padrão',
      ],
      boundaries: [
        'Sem cloud obrigatória',
        'Sem sync remoto por padrão',
        'Sem watcher persistente no primeiro uso',
      ],
    },
    {
      id: 'pro-preview',
      name: 'Pro Preview',
      status: 'preview',
      audience: 'Operador que quer fluxos avançados e release UX com mais conveniência.',
      includes: [
        'Release status e rollback preview',
        'Artifact/replay workbench',
        'Self-heal supervisionado quando habilitado',
        'Budget e observability locais',
      ],
      boundaries: [
        'Publicação exige comando explícito',
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
        'Aprovações e permissão por escopo',
        'Relatórios redigidos para revisão',
      ],
      boundaries: [
        'Dados compartilhados exigem configuração explícita',
        'Sync remoto e telemetria são opt-in',
        'Local-first continua funcional sem conta cloud',
      ],
    },
    {
      id: 'lab',
      name: 'Lab',
      status: 'lab',
      audience: 'Exploração de hardware, mesh federado e automações mais profundas.',
      includes: [
        'Federated mesh experimental',
        'Hardware action plane supervisionado',
        'Skill evolution em sandbox',
        'Automations com approval e budget',
      ],
      boundaries: [
        'Não é canal stable',
        'Ações destrutivas ficam preview-first',
        'Sandbox e permissão são obrigatórios para risco alto',
      ],
    },
  ] satisfies EditionPolicy[],
  policies: [
    {
      label: 'Privacidade e dados',
      detail:
        'O core local não envia payload sensível por padrão. Telemetria, feedback, sync remoto e reports externos exigem opt-in e preview.',
    },
    {
      label: 'Atualizações',
      detail:
        'Canais alpha, beta e stable devem declarar risco, rollback e changelog antes de distribuição pública.',
    },
    {
      label: 'Plugins e skills externos',
      detail:
        'Itens externos entram por trust policy, proveniência, allowlist quando aplicável e aprovação antes de mutação.',
    },
    {
      label: 'Licenciamento inicial',
      detail:
        'Preview público enquanto stable não for aprovado; qualquer licença pública deve vir com escopo explícito.',
    },
  ] satisfies DistributionPolicyItem[],
  releaseChannels: [
    'alpha: rápido, experimental e sujeito a mudanças',
    'beta: preview mais estável com changelog e rollback',
    'stable: canal público depois de bundle e smoke de distribuição',
  ],
} as const
