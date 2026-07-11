export type IntegrationShowcaseMode = 'fixture' | 'local' | 'credencial real'

export type IntegrationShowcaseItem = {
  id: string
  name: string
  category: string
  route: string
  modes: IntegrationShowcaseMode[]
  capabilities: string[]
  requirement: string
  fixture: string
  degradation: string
  trustPlane: string[]
  partnerSurface: string
}

export const integrationShowcase = {
  title: 'Integration Showcase And Partner Surface',
  route: '/integrations',
  promise:
    'Integrações reais aparecem como showcase auditável: fixture primeiro, modo local quando possível, credencial real somente por opt-in e degradação segura quando secrets faltam.',
  defaultMode: 'fixture primeiro',
  controls: [
    'fixture, local e credencial real ficam separados no copy público',
    'degradação segura explica o que não roda quando secret está ausente',
    'aprovação, política, budget e trilha de auditoria ficam visíveis',
    'superfície de parceiro auditável não promete parceria formal sem registro',
  ],
  integrations: [
    {
      id: 'slack',
      name: 'Slack',
      category: 'Collaboration',
      route: '/integrations#slack',
      modes: ['fixture', 'credencial real'],
      capabilities: ['receber contexto', 'responder threads', 'triagem de feedback'],
      requirement: 'Token real só entra depois de approval e escopo explícito.',
      fixture: 'Fixture simula canal, thread, autor e resposta sem rede externa.',
      degradation: 'Sem token, a demo mostra preview redigido e não envia mensagem.',
      trustPlane: ['approval antes de envio', 'redaction local', 'audit trail'],
      partnerSurface: 'Compatibilidade técnica documentada; sem parceria formal prometida.',
    },
    {
      id: 'github',
      name: 'GitHub',
      category: 'Code hosting',
      route: '/integrations#github',
      modes: ['fixture', 'local', 'credencial real'],
      capabilities: ['abrir PR', 'ler checks', 'preparar release notes'],
      requirement: 'Credencial real exige gh autenticado e repo autorizado.',
      fixture: 'Fixture usa diff, checks e PR sintético para demonstrar fluxo.',
      degradation: 'Sem auth, o Zavorth gera plano, patch e corpo de PR sem publicar.',
      trustPlane: ['preview de diff', 'permissão por repo', 'rollback descrito'],
      partnerSurface: 'Compatibilidade via API/CLI pública; sem endosso de vendor.',
    },
    {
      id: 'vercel',
      name: 'Vercel',
      category: 'Deployment',
      route: '/integrations#vercel',
      modes: ['fixture', 'credencial real'],
      capabilities: ['preview deploy', 'logs de runtime', 'rollback assistido'],
      requirement: 'Token real e projeto linkado somente para operação de deploy.',
      fixture: 'Fixture cobre status, URL de preview e rollback sem publicar build.',
      degradation: 'Sem token, o smoke valida contrato e mostra comando seguro.',
      trustPlane: ['budget de deploy', 'approval de publish', 'audit trail'],
      partnerSurface: 'Superfície de parceiro e catálogo; sem prometer parceria oficial.',
    },
    {
      id: 'figma',
      name: 'Figma',
      category: 'Design',
      route: '/integrations#figma',
      modes: ['fixture', 'credencial real'],
      capabilities: ['mapear componentes', 'gerar handoff', 'auditar design tokens'],
      requirement: 'Arquivo e token reais entram apenas para operação aprovada.',
      fixture: 'Fixture descreve node, componente e mapping sem acessar arquivo privado.',
      degradation: 'Sem acesso, o fluxo cria checklist de handoff e gaps públicos.',
      trustPlane: ['escopo por arquivo', 'preview de alterações', 'audit trail'],
      partnerSurface: 'Integra como superfície auditável, sem claim de parceria formal.',
    },
  ] satisfies IntegrationShowcaseItem[],
  smoke: {
    command: 'npm run integration-showcase',
    gate: 'npm run qa:integration-showcase',
    artifact: 'integration-smoke.json',
    networkRequired: false,
    secretsRequired: false,
  },
} as const
