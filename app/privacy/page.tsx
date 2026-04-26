import React from 'react'
import { ContentPageShell } from '../../components/ContentPageShell'

export default function PrivacyPage() {
  return (
    <ContentPageShell
      eyebrow="Privacidade"
      title="Aviso de privacidade"
      intro="Um aviso publico minimo para que o site de lancamento nao tenha links legais quebrados."
    >
      <section className="space-y-4">
        <p className="text-body leading-relaxed text-neutral-500">
          Basilisk e apresentado aqui como um runtime local-first. Os materiais
          publicos devem explicar quais dados ficam locais, que trafego de provedor
          sai da maquina e como logs, rastros e aprovacoes sao tratados. Telemetria
          e feedback publico ficam desligados por padrao ate o usuario revisar e
          aprovar um pacote redigido.
        </p>
        <p className="text-body leading-relaxed text-neutral-500">
          O fluxo publico de feedback fica em <a href="/feedback" className="text-accent transition-colors hover:text-accent-light">/feedback</a> e
          exige preview, redaction local, opt-in explicito e revoke/delete antes
          de qualquer pacote sair da maquina.
        </p>
      </section>
    </ContentPageShell>
  )
}
