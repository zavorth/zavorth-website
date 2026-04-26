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
    'Telemetry desligada por padrao. Feedback opt-in com preview redigido, revoke/delete local, ledger offline e agregacao sem payload sensivel.',
  defaultState: 'off by default',
  controls: [
    {
      id: 'telemetry-off',
      label: 'Telemetry desligada por padrao',
      detail: 'Nenhum pacote sai da maquina no primeiro uso, no first-run ou no bundle publico.',
    },
    {
      id: 'preview-required',
      label: 'Preview obrigatorio',
      detail: 'O usuario revisa campos, redactions e destino antes de qualquer envio opt-in.',
    },
    {
      id: 'redaction',
      label: 'Redaction local',
      detail: 'Tokens, secrets, paths pessoais, payload bruto e logs sensiveis ficam fora do pacote publico.',
    },
    {
      id: 'opt-in-send',
      label: 'Envio opt-in',
      detail: 'O envio e separado do preview e exige confirmacao explicita para cada pacote.',
    },
    {
      id: 'revoke-delete',
      label: 'Revoke/delete local',
      detail: 'O usuario pode revogar consentimento e apagar o ledger local criado pelo feedback.',
    },
    {
      id: 'offline-ledger',
      label: 'Product feedback ledger',
      detail: 'Feedback continua util offline em product-feedback-ledger.json, sem depender de cloud obrigatoria.',
    },
  ] satisfies FeedbackLoopControl[],
  previewPackage: {
    fileName: 'feedback-preview-redacted.json',
    ledger: 'product-feedback-ledger.json',
    includes: [
      'versao publica',
      'canal de release',
      'categoria do evento',
      'comando publico usado',
      'resultado resumido',
      'consentimento opt-in',
    ],
    redacts: [
      'tokens',
      'secrets',
      'paths pessoais',
      'payload bruto',
      'logs sensiveis',
      'conteudo privado do workspace',
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
    'O que voce tentou fazer?',
    'O que aconteceu?',
    'Qual comando publico foi usado?',
    'O preview redigido foi revisado?',
    'Nenhum token, secret ou path pessoal deve ser colado no report.',
  ],
  aggregator: [
    'Agrega categoria, versao, canal e status.',
    'Mantem payload sensivel fora do pacote publico.',
    'Funciona como ledger local mesmo offline.',
  ],
} as const
