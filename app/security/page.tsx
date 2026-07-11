import React from 'react'
import { ContentPageShell } from '../../components/ContentPageShell'

export default function SecurityPage() {
  return (
    <ContentPageShell
      eyebrow="Segurança"
      title="Postura de segurança"
      intro="Um resumo público compacto da postura de lançamento do produto."
    >
      <section className="space-y-4">
        <ul className="list-disc space-y-3 pl-5 text-body text-neutral-400">
          <li>Execução local-first é a postura padrão.</li>
          <li>Aprovações, preview e policy gates ficam entre pedido e ação sensível.</li>
          <li>Logs, artifacts e replay devem ser redigidos antes de qualquer compartilhamento público.</li>
          <li>Watchers, telemetria e feedback público são opt-in, revogáveis e documentados.</li>
        </ul>
      </section>
    </ContentPageShell>
  )
}
