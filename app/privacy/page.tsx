import React from 'react'
import { ContentPageShell } from '../../components/ContentPageShell'

export default function PrivacyPage() {
  return (
    <ContentPageShell
      eyebrow="Privacidade"
      title="Aviso de privacidade"
      intro="Um aviso público mínimo para que o site de lançamento não tenha links legais quebrados."
    >
      <section className="space-y-4">
        <p className="text-body leading-relaxed text-neutral-500">
          Zavorth é apresentado aqui como um runtime local-first. Os materiais
          públicos devem explicar quais dados ficam locais, que tráfego de provedor
          sai da máquina e como logs, rastros e aprovações são tratados. Telemetria
          e feedback público ficam desligados por padrão até o usuário revisar e
          aprovar um pacote redigido.
        </p>
        <p className="text-body leading-relaxed text-neutral-500">
          O fluxo público de feedback fica em <a href="/feedback" className="text-accent transition-colors hover:text-accent-light">/feedback</a> e
          exige preview, redaction local, opt-in explícito e revoke/delete antes
          de qualquer pacote sair da máquina.
        </p>
      </section>
    </ContentPageShell>
  )
}
