import React from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  GitBranch,
  Hash,
  KeyRound,
  Palette,
  Rocket,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import { BrandMark } from '../../components/BrandMark'
import { Footer } from '../../components/Footer'
import { integrationShowcase } from '../../data/integration-showcase'

const iconByIntegration = {
  slack: Hash,
  github: GitBranch,
  vercel: Rocket,
  figma: Palette,
}

export default function IntegrationsPage() {
  return (
    <main className="min-h-screen bg-surface text-neutral-100">
      <header className="border-b border-white/[0.06] bg-surface/88">
        <div className="max-w-8xl mx-auto flex items-center justify-between px-6 py-5">
          <a href="/" className="inline-flex items-center gap-2.5" aria-label="Voltar para a home do Basilisk">
            <BrandMark className="h-7 w-7" />
            <span className="text-[15px] font-semibold tracking-tight text-neutral-100">
              Basilisk
            </span>
          </a>
          <a
            href="/docs#integration-showcase"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-[12px] font-medium text-neutral-400 transition-colors hover:text-neutral-100"
          >
            <ArrowLeft size={14} />
            Docs
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(56,189,248,0.1), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.024), transparent 42%)',
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-8xl mx-auto px-6 py-14 lg:py-18">
          <p className="eyebrow mb-4">Integracoes</p>
          <h1 className="section-title-display max-w-4xl text-heading text-neutral-50 sm:text-display-sm">
            {integrationShowcase.title}
          </h1>
          <p className="mt-5 max-w-3xl text-body-lg leading-relaxed text-neutral-500">
            {integrationShowcase.promise}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#showcase"
              className="btn-sheen inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-[14px] font-semibold text-surface"
            >
              Ver showcase
              <CheckCircle2 size={15} />
            </a>
            <a
              href="/docs#integration-showcase"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-[14px] font-medium text-neutral-300 transition-colors hover:text-neutral-100"
            >
              Ler contrato publico
            </a>
          </div>
        </div>
      </section>

      <section id="showcase" className="section-rhythm">
        <div className="max-w-8xl mx-auto px-6">
          <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="eyebrow mb-4">Showcase</p>
              <h2 className="section-title-display text-heading text-neutral-50">
                Vendor real, dependencia opcional.
              </h2>
            </div>
            <p className="text-body leading-relaxed text-neutral-500">
              Cada integracao lista capacidade, requisito, modo fixture e
              degradacao segura. Credencial real fica separada do caminho local.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {integrationShowcase.integrations.map((item) => {
              const Icon = iconByIntegration[item.id as keyof typeof iconByIntegration]

              return (
                <article
                  id={item.id}
                  key={item.id}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-5"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-accent/18 bg-accent/10 text-accent">
                        <Icon size={19} />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                          {item.category}
                        </p>
                        <h3 className="text-[18px] font-semibold text-neutral-100">
                          {item.name}
                        </h3>
                      </div>
                    </div>
                    <span className="rounded-lg border border-white/[0.08] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                      fixture
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                        capacidades
                      </p>
                      <ul className="space-y-2">
                        {item.capabilities.map((capability) => (
                          <li key={capability} className="flex gap-2 text-[12px] leading-relaxed text-neutral-400">
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent" />
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                        modos
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.modes.map((mode) => (
                          <span key={mode} className="rounded-lg bg-white/[0.035] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">
                            {mode}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <p className="rounded-lg border border-white/[0.06] bg-black/20 p-3 text-[12px] leading-relaxed text-neutral-500">
                      <strong className="font-semibold text-neutral-300">Requisito:</strong> {item.requirement}
                    </p>
                    <p className="rounded-lg border border-white/[0.06] bg-black/20 p-3 text-[12px] leading-relaxed text-neutral-500">
                      <strong className="font-semibold text-neutral-300">Fixture:</strong> {item.fixture}
                    </p>
                    <p className="rounded-lg border border-white/[0.06] bg-black/20 p-3 text-[12px] leading-relaxed text-neutral-500">
                      <strong className="font-semibold text-neutral-300">Degradacao segura:</strong> {item.degradation}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="trust-plane" className="border-y border-white/[0.06] bg-white/[0.012] py-14">
        <div className="max-w-8xl mx-auto px-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <article className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/18 bg-accent/10 text-accent">
                <ShieldCheck size={18} />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                Trust Plane
              </p>
              <h2 className="mt-2 text-[18px] font-semibold text-neutral-100">
                Controle aparece antes da credencial.
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
                Approval, policy, budget e audit trail ficam visiveis no showcase,
                nao escondidos como detalhe interno.
              </p>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              {integrationShowcase.controls.map((control) => (
                <article key={control} className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
                  <CheckCircle2 size={16} className="mb-4 text-accent" />
                  <p className="text-[13px] leading-relaxed text-neutral-500">
                    {control}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="partner-surface" className="section-rhythm">
        <div className="max-w-8xl mx-auto px-6">
          <div className="mb-8">
            <p className="eyebrow mb-4">Partner surface auditavel</p>
            <h2 className="section-title-display text-heading text-neutral-50">
              Compatibilidade publica sem inflar claim.
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-5">
              <KeyRound size={18} className="mb-5 text-accent" />
              <h3 className="text-[16px] font-semibold text-neutral-100">
                Credenciais sob demanda
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
                Tokens reais entram apenas em operacao aprovada e nunca sao
                requisito para entender a integracao.
              </p>
            </article>
            <article className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-5">
              <Terminal size={18} className="mb-5 text-accent" />
              <h3 className="text-[16px] font-semibold text-neutral-100">
                Smoke sem rede externa
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
                {integrationShowcase.smoke.command} gera artifact fixture e{' '}
                {integrationShowcase.smoke.gate} fecha o gate local.
              </p>
            </article>
            <article className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-5">
              <ShieldCheck size={18} className="mb-5 text-accent" />
              <h3 className="text-[16px] font-semibold text-neutral-100">
                Sem parceria formal prometida
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
                O copy publico fala de compatibilidade tecnica, fixture e API
                publica. Parceria formal exige registro auditavel.
              </p>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
