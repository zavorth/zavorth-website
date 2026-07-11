export type ExternalDocExample = {
  id: string
  title: string
  audience: string
  command: string
  outcome: string
  guardrail: string
}

export type ExternalDocGuide = {
  id: string
  title: string
  summary: string
  links: string[]
}

export type ExternalDocMaturity = {
  capability: string
  maturity: 'public' | 'preview' | 'planned'
  proof: string
}

export const externalDocs = {
  title: 'Docs externas e exemplos',
  promise:
    'Documentação pública para instalar, rodar o primeiro fluxo, entender segurança local-first e escolher exemplos sem ler internals cedo demais.',
  publicCommands: [
    'npm install',
    'npm run go',
    'npm run chat',
    'npm run doctor',
    'npm run status:fast',
    'npm run release:status:fast',
    'npm run release:rollback-preview',
    'npm run feedback:preview',
    'npm run integration-showcase',
  ],
  guides: [
    {
      id: 'installation',
      title: 'Instalação pública',
      summary: 'Requisitos, comandos iniciais, first-run e cleanup ficam juntos antes de qualquer fluxo real.',
      links: ['/start', '/docs#first-run', '/docs#quickstart', '/docs#troubleshooting'],
    },
    {
      id: 'security',
      title: 'Segurança local-first',
      summary: 'Preview, aprovação, opt-in, replay redigido e limites de watcher persistente ficam explícitos.',
      links: ['/security', '/docs#local-first-security', '/privacy'],
    },
    {
      id: 'examples',
      title: 'Exemplos por caso de uso',
      summary: 'Engenharia, release e artifacts/replay mostram o Zavorth como parceiro operacional auditável.',
      links: ['/examples', '/docs#examples', '/demo', '/docs#feature-maturity'],
    },
    {
      id: 'release',
      title: 'Bundle e installer',
      summary: 'Bundle verificável, digest, prévia de instalação, smoke local, changelog e rollback ficam juntos.',
      links: ['/release', '/docs#release-bundle', '/changelog', '/editions'],
    },
    {
      id: 'feedback',
      title: 'Feedback opt-in',
      summary: 'Telemetria desligada, preview redigido, revoke/delete local e ledger offline fecham o loop público.',
      links: ['/feedback', '/docs#feedback-loop', '/privacy', '/release'],
    },
    {
      id: 'integrations',
      title: 'Integration showcase',
      summary:
        'Slack, GitHub, Vercel e Figma aparecem por fixture, degradação segura, aprovações e superfície de parceiro auditável.',
      links: ['/integrations', '/docs#integration-showcase', '/docs#local-first-security'],
    },
  ] satisfies ExternalDocGuide[],
  examples: [
    {
      id: 'engineering',
      title: 'Engenharia: corrigir build com approval',
      audience: 'Desenvolvedor local',
      command: 'npm run chat',
      outcome: 'Plano, patch pequeno, validação e artifact revisável.',
      guardrail: 'Preview antes de escrever e rollback descrito.',
    },
    {
      id: 'release',
      title: 'Release: revisar estado antes de publicar',
      audience: 'Operador de release',
      command: 'npm run release:status:fast',
      outcome: 'Status de release, risco e próximo passo sem publicar automaticamente.',
      guardrail: 'Nenhum publish sem comando explícito e aprovação.',
    },
    {
      id: 'replay-artifacts',
      title: 'Artifacts e replay: auditar uma entrega',
      audience: 'Revisor técnico',
      command: 'npm run status:fast',
      outcome: 'Resumo de evidências, artifacts e trilha de replay redigida.',
      guardrail: 'Payload sensível fica fora do pacote público.',
    },
  ] satisfies ExternalDocExample[],
  maturity: [
    {
      capability: 'Website público',
      maturity: 'public',
      proof: 'Site público com build, links e screenshots verificáveis.',
    },
    {
      capability: 'Demo guiada',
      maturity: 'public',
      proof: 'Demo com fixture local, aprovação, artifact e replay.',
    },
    {
      capability: 'First run local',
      maturity: 'public',
      proof: 'Checklist de instalação, health check e cleanup.',
    },
    {
      capability: 'Docs externas e exemplos',
      maturity: 'public',
      proof: 'Docs públicas, exemplos e troubleshooting.',
    },
    {
      capability: 'Edições e distribuição',
      maturity: 'public',
      proof: 'Matriz de edições, limites, privacidade e canais.',
    },
    {
      capability: 'Release bundle',
      maturity: 'public',
      proof: 'Bundle com digest, prévia de instalação, smoke e rollback.',
    },
    {
      capability: 'Feedback opt-in',
      maturity: 'public',
      proof: 'Preview redigido, revoke/delete local e ledger offline.',
    },
    {
      capability: 'Integration showcase',
      maturity: 'public',
      proof: 'Slack, GitHub, Vercel e Figma em modo fixture com aprovação e trilha de auditoria visíveis.',
    },
  ] satisfies ExternalDocMaturity[],
  troubleshooting: [
    'Dependência ausente: rode npm install e repita npm run doctor.',
    'Workspace inválido: abra uma pasta local e rode npm run go novamente.',
    'Gate falhou: leia o bloco do gate antes de tentar reparar.',
    'Permissão negada: revise o preview e confirme apenas mudanças esperadas.',
  ],
} as const
