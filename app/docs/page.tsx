import React from 'react'
import { ContentPageShell } from '../../components/ContentPageShell'
import { externalDocs } from '../../data/external-docs'

export default function DocsPage() {
  return (
    <ContentPageShell
      eyebrow="Documentação"
      title="Docs externas do Zavorth"
      intro="Instalação, primeiro uso, exemplos, segurança local-first e troubleshooting em uma camada pública antes dos internals."
    >
      <section id="external-docs" className="space-y-4">
        <h2 className="text-subheading text-neutral-100">External docs</h2>
        <p className="text-body leading-relaxed text-neutral-500">
          {externalDocs.promise}
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          {externalDocs.guides.map((guide) => (
            <a
              key={guide.id}
              href={guide.links[0]}
              className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-4 transition-colors hover:border-white/[0.13]"
            >
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                {guide.id}
              </p>
              <h3 className="text-[15px] font-semibold text-neutral-100">
                {guide.title}
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed text-neutral-500">
                {guide.summary}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section id="quickstart" className="space-y-4">
        <h2 className="text-subheading text-neutral-100">Quickstart</h2>
        <ol className="list-decimal space-y-3 pl-5 text-body text-neutral-400">
          <li>Abra o pacote ou repositório do Zavorth em um workspace local com Node.js 18 ou mais recente.</li>
          <li>Rode <code className="font-mono text-neutral-200">npm install</code> para preparar dependências.</li>
          <li>Rode <code className="font-mono text-neutral-200">npm run go</code> para iniciar a jornada local supervisionada.</li>
          <li>Use <code className="font-mono text-neutral-200">npm run chat</code> para trabalhar pelo terminal conversacional.</li>
        </ol>
        <div className="rounded-lg border border-white/[0.08] bg-black/25 p-4">
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
            Comandos públicos
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {externalDocs.publicCommands.map((command) => (
              <code key={command} className="rounded-lg bg-white/[0.025] px-3 py-2 font-mono text-[12px] text-neutral-300">
                {command}
              </code>
            ))}
          </div>
        </div>
      </section>

      <section id="first-run" className="space-y-4">
        <h2 className="text-subheading text-neutral-100">Primeiro uso local</h2>
        <p className="text-body leading-relaxed text-neutral-500">
          A rota <a href="/start" className="text-accent transition-colors hover:text-accent-light">/start</a> organiza
          o primeiro contato em detector de requisitos, preview de setup, modo
          fixture, health check e cleanup. O fluxo público usa <code className="font-mono text-neutral-200">npm run go</code> e
          não inicia watcher persistente por padrão.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-subheading text-neutral-100">O que o runtime inclui</h2>
        <p className="text-body leading-relaxed text-neutral-500">
          Controle por linguagem natural, execução governada, uso de tools,
          memória, approvals, artifacts, replay e um runtime único com política
          entre superfícies.
        </p>
      </section>

      <section id="local-first-security" className="space-y-4">
        <h2 className="text-subheading text-neutral-100">Segurança local-first</h2>
        <p className="text-body leading-relaxed text-neutral-500">
          Approvals, replay redigido, artifacts, budget e opt-in aparecem como
          controle leve. Watch mode e qualquer automação persistente ficam fora
          do primeiro uso por padrão.
        </p>
      </section>

      <section id="demo" className="space-y-4">
        <h2 className="text-subheading text-neutral-100">Demo pública</h2>
        <p className="text-body leading-relaxed text-neutral-500">
          A rota <a href="/demo" className="text-accent transition-colors hover:text-accent-light">/demo</a> mostra
          uma história guiada com fixture local, approval, artefato, replay,
          erro, rollback e resumo verificável.
        </p>
      </section>

      <section id="examples" className="space-y-4">
        <h2 className="text-subheading text-neutral-100">Examples</h2>
        <p className="text-body leading-relaxed text-neutral-500">
          A página <a href="/examples" className="text-accent transition-colors hover:text-accent-light">/examples</a> cobre
          engenharia, release, artifacts e replay com comandos públicos e
          guardrails claros.
        </p>
      </section>

      <section id="release-bundle" className="space-y-4">
        <h2 className="text-subheading text-neutral-100">Release bundle</h2>
        <p className="text-body leading-relaxed text-neutral-500">
          A rota <a href="/release" className="text-accent transition-colors hover:text-accent-light">/release</a> documenta
          o pacote público com digest sha256, prévia de instalação, smoke local,
          changelog público e rollback/cleanup limitado. O fluxo usa
          <code className="font-mono text-neutral-200"> npm run release:status:fast</code>,
          <code className="font-mono text-neutral-200"> npm run doctor:fast</code>,
          <code className="font-mono text-neutral-200"> npm run release:changelog</code> e
          <code className="font-mono text-neutral-200"> npm run release:rollback-preview</code>.
        </p>
      </section>

      <section id="release-train" className="space-y-4">
        <h2 className="text-subheading text-neutral-100">Preview release train and stable policy</h2>
        <p className="text-body leading-relaxed text-neutral-500">
          `v0.1 Public Preview` é o baseline público atual. `v0.1.x preview`
          cobre hotfix com escopo estreito, release candidate, changelog público
          e rollback preview. Tags, GitHub Releases, stable e LTS só entram depois
          de decisão explícita de release, bundle real e smoke de distribuição.
          O gate público usa
          <code className="font-mono text-neutral-200"> npm run qa:release-train</code> e
          <code className="font-mono text-neutral-200"> npm run qa:phase:59</code>.
        </p>
      </section>

      <section id="feedback-loop" className="space-y-4">
        <h2 className="text-subheading text-neutral-100">Feedback loop</h2>
        <p className="text-body leading-relaxed text-neutral-500">
          A rota <a href="/feedback" className="text-accent transition-colors hover:text-accent-light">/feedback</a> explica
          telemetria opt-in com preview redigido, revoke/delete local, product
          feedback ledger e agregador sem payload sensível. O fluxo usa
          <code className="font-mono text-neutral-200"> npm run feedback:preview</code>,
          <code className="font-mono text-neutral-200"> npm run feedback:revoke</code> e
          <code className="font-mono text-neutral-200"> npm run feedback:delete</code>.
        </p>
      </section>

      <section id="integration-showcase" className="space-y-4">
        <h2 className="text-subheading text-neutral-100">Integrações e superfície de parceiro</h2>
        <p className="text-body leading-relaxed text-neutral-500">
          A rota <a href="/integrations" className="text-accent transition-colors hover:text-accent-light">/integrations</a> lista
          Slack, GitHub, Vercel e Figma com capacidades, requisito, modo fixture,
          modo local quando existe, credencial real separada, degradação segura,
          aprovações e superfície de parceiro auditável. O fluxo usa
          <code className="font-mono text-neutral-200"> npm run integration-showcase</code> e
          <code className="font-mono text-neutral-200"> npm run qa:integration-showcase</code>.
        </p>
      </section>

      <section id="troubleshooting" className="space-y-4">
        <h2 className="text-subheading text-neutral-100">Troubleshooting</h2>
        <ul className="list-disc space-y-3 pl-5 text-body text-neutral-400">
          {externalDocs.troubleshooting.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="feature-maturity" className="space-y-4">
        <h2 className="text-subheading text-neutral-100">Feature maturity</h2>
        <div className="space-y-3">
          {externalDocs.maturity.map((item) => (
            <div
              key={item.capability}
              className="grid gap-2 rounded-lg border border-white/[0.08] bg-white/[0.018] p-4 sm:grid-cols-[minmax(0,1fr)_110px]"
            >
              <div>
                <h3 className="text-[14px] font-semibold text-neutral-100">
                  {item.capability}
                </h3>
                <p className="mt-1 text-[12px] leading-relaxed text-neutral-500">
                  {item.proof}
                </p>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent sm:text-right">
                {item.maturity}
              </p>
            </div>
          ))}
        </div>
        <p className="text-body leading-relaxed text-neutral-500">
          Tenants, edições, distribuição, bundle e feedback aparecem com maturidade própria. A
          matriz pública fica em <a href="/editions" className="text-accent transition-colors hover:text-accent-light">/editions</a>;
          o caminho de release verificável fica em <a href="/release" className="text-accent transition-colors hover:text-accent-light">/release</a>;
          o loop opt-in fica em <a href="/feedback" className="text-accent transition-colors hover:text-accent-light">/feedback</a>.
        </p>
      </section>

      <section id="distribution-policy" className="space-y-4">
        <h2 className="text-subheading text-neutral-100">Distribution policy</h2>
        <p className="text-body leading-relaxed text-neutral-500">
          A rota <a href="/editions" className="text-accent transition-colors hover:text-accent-light">/editions</a> separa
          Local, Pro Preview, Team Preview e Lab. O core local segue sem cloud
          obrigatória; telemetria, feedback, sync remoto e reports externos
          exigem opt-in e preview.
        </p>
      </section>
    </ContentPageShell>
  )
}
