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
    'Documentacao publica para instalar, rodar primeiro fluxo, entender seguranca local-first e escolher exemplos sem ler internals cedo demais.',
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
      title: 'Instalacao publica',
      summary: 'Requisitos, comandos iniciais, first-run e cleanup ficam juntos antes de qualquer fluxo real.',
      links: ['/start', '/docs#first-run', '/docs#quickstart', '/docs#troubleshooting'],
    },
    {
      id: 'security',
      title: 'Seguranca local-first',
      summary: 'Preview, aprovacao, opt-in, replay redigido e limites de watcher persistente ficam explicitos.',
      links: ['/security', '/docs#local-first-security', '/privacy'],
    },
    {
      id: 'examples',
      title: 'Exemplos por caso de uso',
      summary: 'Engenharia, release e artifacts/replay mostram o Basilisk como parceiro operacional auditavel.',
      links: ['/examples', '/docs#examples', '/demo', '/docs#feature-maturity'],
    },
    {
      id: 'release',
      title: 'Bundle e installer',
      summary: 'Bundle verificavel, digest, preview de instalacao, smoke local, changelog e rollback ficam juntos.',
      links: ['/release', '/docs#release-bundle', '/changelog', '/editions'],
    },
    {
      id: 'feedback',
      title: 'Feedback opt-in',
      summary: 'Telemetry desligada, preview redigido, revoke/delete local e ledger offline fecham o loop publico.',
      links: ['/feedback', '/docs#feedback-loop', '/privacy', '/release'],
    },
    {
      id: 'integrations',
      title: 'Integration showcase',
      summary: 'Slack, GitHub, Vercel e Figma aparecem por fixture, degradacao segura, Trust Plane e partner surface auditavel.',
      links: ['/integrations', '/docs#integration-showcase', '/docs#local-first-security'],
    },
  ] satisfies ExternalDocGuide[],
  examples: [
    {
      id: 'engineering',
      title: 'Engenharia: corrigir build com approval',
      audience: 'Desenvolvedor local',
      command: 'npm run chat',
      outcome: 'Plano, patch pequeno, validacao e artifact revisavel.',
      guardrail: 'Preview antes de escrever e rollback descrito.',
    },
    {
      id: 'release',
      title: 'Release: revisar estado antes de publicar',
      audience: 'Operador de release',
      command: 'npm run release:status:fast',
      outcome: 'Status de release, risco e proximo passo sem publicar automaticamente.',
      guardrail: 'Nenhum publish sem comando explicito e aprovacao.',
    },
    {
      id: 'replay-artifacts',
      title: 'Artifacts e replay: auditar uma entrega',
      audience: 'Revisor tecnico',
      command: 'npm run status:fast',
      outcome: 'Resumo de evidencias, artifacts e trilha de replay redigida.',
      guardrail: 'Payload sensivel fica fora do pacote publico.',
    },
  ] satisfies ExternalDocExample[],
  maturity: [
    {
      capability: 'Website publico',
      maturity: 'public',
      proof: 'Fase 46 com build, links e screenshots.',
    },
    {
      capability: 'Demo guiada',
      maturity: 'public',
      proof: 'Fase 47 com fixture, approval, artifact e replay.',
    },
    {
      capability: 'First run local',
      maturity: 'public',
      proof: 'Fase 48 com requisitos, health check e cleanup.',
    },
    {
      capability: 'Docs externas e exemplos',
      maturity: 'public',
      proof: 'Fase 49 com docs, exemplos e troubleshooting.',
    },
    {
      capability: 'Edicoes e distribuicao',
      maturity: 'public',
      proof: 'Fase 50 com matriz de edicoes, limites, privacidade e canais.',
    },
    {
      capability: 'Release bundle',
      maturity: 'public',
      proof: 'Fase 51 com bundle, digest, installer preview, smoke e rollback.',
    },
    {
      capability: 'Feedback opt-in',
      maturity: 'public',
      proof: 'Fase 52 com preview redigido, revoke/delete local e ledger offline.',
    },
    {
      capability: 'Integration showcase',
      maturity: 'public',
      proof: 'Fase 58 com Slack, GitHub, Vercel e Figma em fixture mode e Trust Plane visivel.',
    },
  ] satisfies ExternalDocMaturity[],
  troubleshooting: [
    'Dependencia ausente: rode npm install e repita npm run doctor.',
    'Workspace invalido: abra uma pasta local e rode npm run go novamente.',
    'Gate falhou: leia o bloco do gate antes de tentar reparar.',
    'Permissao negada: revise o preview e confirme apenas mudancas esperadas.',
  ],
} as const
