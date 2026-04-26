import React from 'react'
import { ContentPageShell } from '../../components/ContentPageShell'

export default function TermsPage() {
  return (
    <ContentPageShell
      eyebrow="Termos"
      title="Termos de uso"
      intro="Uma pagina minima de termos para que o site nao entregue navegacao legal sem destino."
    >
      <section className="space-y-4">
        <p className="text-body leading-relaxed text-neutral-500">
          Basilisk esta em preview publico. Use o runtime em workspaces que voce
          controla, revise previews antes de aprovar mutacoes e mantenha secrets
          fora de exemplos, replays e feedback compartilhado. Termos completos
          acompanham o ciclo de distribuicao publica.
        </p>
      </section>
    </ContentPageShell>
  )
}
