export type FeedbackLoopControl = {
  id: string
  label: string
  detail: string
}

export type FeedbackLoopCommand = {
  label: string
  command: string
  reason: string
}

export const feedbackLoop = {
  title: 'Feedback, telemetry opt-in and product loop',
  route: '/feedback',
  promise:
    'Telemetria desligada por padrão. Feedback opt-in com preview redigido, revoke/delete local, ledger offline e agregação sem payload sensível.',
  defaultState: 'off by default',
  controls: [
    {
      id: 'telemetry-off',
      label: 'Telemetria desligada por padrão',
      detail: 'Nenhum pacote sai da máquina no primeiro uso, no first-run ou no bundle público.',
    },
    {
      id: 'preview-required',
      label: 'Preview obrigatório',
      detail: 'O usuário revisa campos, redações e destino antes de qualquer envio opt-in.',
    },
    {
      id: 'redaction',
      label: 'Redaction local',
      detail: 'Tokens, secrets, paths pessoais, payload bruto e logs sensíveis ficam fora do pacote público.',
    },
    {
      id: 'opt-in-send',
      label: 'Envio opt-in',
      detail: 'O envio é separado do preview e exige confirmação explícita para cada pacote.',
    },
    {
      id: 'revoke-delete',
      label: 'Revoke/delete local',
      detail: 'O usuário pode revogar consentimento e apagar o ledger local criado pelo feedback.',
    },
    {
      id: 'offline-ledger',
      label: 'Product feedback ledger',
      detail: 'Feedback continua útil offline em product-feedback-ledger.json, sem depender de cloud obrigatória.',
    },
  ] satisfies FeedbackLoopControl[],
  previewPackage: {
    fileName: 'feedback-preview-redacted.json',
    ledger: 'product-feedback-ledger.json',
    includes: [
      'versão pública',
      'canal de release',
      'categoria do evento',
      'comando público usado',
      'resultado resumido',
      'consentimento opt-in',
    ],
    redacts: [
      'tokens',
      'secrets',
      'paths pessoais',
      'payload bruto',
      'logs sensíveis',
      'conteúdo privado do workspace',
    ],
  },
  commands: [
    {
      label: 'Preview redigido',
      command: 'npm run feedback:preview',
      reason: 'Mostra exatamente o que seria enviado, sem realizar envio.',
    },
    {
      label: 'Revogar opt-in',
      command: 'npm run feedback:revoke',
      reason: 'Remove consentimento local para novos pacotes de feedback.',
    },
    {
      label: 'Apagar ledger local',
      command: 'npm run feedback:delete',
      reason: 'Limpa somente os artefatos locais do feedback loop.',
    },
  ] satisfies FeedbackLoopCommand[],
  issueTemplate: [
    'O que você tentou fazer?',
    'O que aconteceu?',
    'Qual comando público foi usado?',
    'O preview redigido foi revisado?',
    'Nenhum token, secret ou path pessoal deve ser colado no report.',
  ],
  aggregator: [
    'Agrega categoria, versão, canal e status.',
    'Mantém payload sensível fora do pacote público.',
    'Funciona como ledger local mesmo offline.',
  ],
} as const
