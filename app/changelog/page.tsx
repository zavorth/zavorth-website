import React from 'react'
import { ContentPageShell } from '../../components/ContentPageShell'

export default function ChangelogPage() {
  return (
    <ContentPageShell
      eyebrow="Changelog"
      title="Notas da versão pública"
      intro="Uma página leve de notas de lançamento para evitar links placeholder e dar ao produto um artefato público real."
    >
      <section className="space-y-4">
        <h2 className="text-subheading text-neutral-100">v0.1 Public Preview</h2>
        <ul className="list-disc space-y-3 pl-5 text-body text-neutral-400">
          <li>Site público com repositório base, narrativa e sistema visual unificado.</li>
          <li>Demo guiada em `/demo` com fixture, approval, artifact e replay.</li>
          <li>Onboarding público em `/start` com checklist, health check e cleanup.</li>
          <li>Docs externas em `/docs` e exemplos públicos em `/examples`.</li>
          <li>Matriz de edições em `/editions` com limites e política de distribuição.</li>
          <li>Bundle verificável em `/release` com prévia de instalação, smoke e rollback.</li>
          <li>Feedback opt-in em `/feedback` com preview redigido e revoke/delete local.</li>
          <li>Showcase de integrações, pilotos e política de release train no caminho público.</li>
          <li>`v0.1.x preview` fica reservado para hotfix estreito com release candidate e rollback claro.</li>
          <li>`v0.2.0 preview` exige planejamento aprovado antes de implementação.</li>
          <li>Tags e GitHub Releases ficam condicionados a decisão explícita de canal stable.</li>
          <li>LTS fica fora do preview e exige política própria antes de ser prometido.</li>
          <li>Hero e ritmo de seções verificados em desktop e mobile.</li>
        </ul>
      </section>
    </ContentPageShell>
  )
}
