import React from 'react'
import { ContentPageShell } from '../../components/ContentPageShell'

export default function SecurityPage() {
  return (
    <ContentPageShell
      eyebrow="Seguranca"
      title="Postura de seguranca"
      intro="Um resumo publico compacto da postura de lancamento do produto."
    >
      <section className="space-y-4">
        <ul className="list-disc space-y-3 pl-5 text-body text-neutral-400">
          <li>Execucao local-first e a postura padrao.</li>
          <li>Aprovacoes, preview e policy gates ficam entre pedido e acao sensivel.</li>
          <li>Logs, artifacts e replay devem ser redigidos antes de qualquer compartilhamento publico.</li>
          <li>Watchers, telemetria e feedback publico sao opt-in, revogaveis e documentados.</li>
        </ul>
      </section>
    </ContentPageShell>
  )
}
