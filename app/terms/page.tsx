import React from 'react'
import { ContentPageShell } from '../../components/ContentPageShell'

export default function TermsPage() {
  return (
    <ContentPageShell
      eyebrow="Termos"
      title="Termos de uso"
      intro="Uma página mínima de termos para que o site não entregue navegação legal sem destino."
    >
      <section className="space-y-4">
        <p className="text-body leading-relaxed text-neutral-500">
          Zavorth está em preview público. Use o runtime em workspaces que você
          controla, revise previews antes de aprovar mutações e mantenha secrets
          fora de exemplos, replays e feedback compartilhado. Termos completos
          acompanham o ciclo de distribuição pública.
        </p>
      </section>
    </ContentPageShell>
  )
}
