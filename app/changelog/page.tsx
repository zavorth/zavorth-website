import React from 'react'
import { ContentPageShell } from '../../components/ContentPageShell'

export default function ChangelogPage() {
  return (
    <ContentPageShell
      eyebrow="Changelog"
      title="Notas da versao publica"
      intro="Uma pagina leve de notas de lancamento para evitar links placeholder e dar ao produto um artefato publico real."
    >
      <section className="space-y-4">
        <h2 className="text-subheading text-neutral-100">v0.1 Public Preview</h2>
        <ul className="list-disc space-y-3 pl-5 text-body text-neutral-400">
          <li>Fase 46 oficializa este repositorio como base do site publico.</li>
          <li>Fase 47 adiciona demo guiada em `/demo` com fixture, approval, artifact e replay.</li>
          <li>Fase 48 adiciona onboarding publico em `/start` com checklist, health check e cleanup.</li>
          <li>Fase 49 organiza docs externas em `/docs` e exemplos publicos em `/examples`.</li>
          <li>Fase 50 adiciona `/editions` com matriz de edicoes, limites e politica de distribuicao.</li>
          <li>Fase 51 adiciona `/release` com bundle verificavel, installer preview, smoke e rollback.</li>
          <li>Fase 52 adiciona `/feedback` com telemetry opt-in, preview redigido e revoke/delete local.</li>
          <li>Fases 53-59 fecham adocao publica, pilotos, integracoes e politica de release train.</li>
          <li>`v0.1.x preview` fica reservado para hotfix estreito com release candidate e rollback claro.</li>
          <li>`v0.2.0 preview` exige planejamento aprovado antes de implementacao.</li>
          <li>Tags e GitHub Releases ficam condicionados a decisao explicita de canal stable.</li>
          <li>LTS fica fora do preview e exige politica propria antes de ser prometido.</li>
          <li>Site publico com narrativa de runtime governado.</li>
          <li>Hero e ritmo de secoes verificados em desktop e mobile.</li>
          <li>Sistema visual e de movimento unificado nas paginas de lancamento.</li>
        </ul>
      </section>
    </ContentPageShell>
  )
}
