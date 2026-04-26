import React from 'react'
import {
  ArrowLeft,
  Boxes,
  CheckCircle2,
  CloudOff,
  FileKey2,
  Layers3,
  ShieldCheck,
} from 'lucide-react'
import { BrandMark } from '../../components/BrandMark'
import { Footer } from '../../components/Footer'
import { distributionPolicy } from '../../data/distribution-policy'

const editionIcon = {
  local: CloudOff,
  'pro-preview': CheckCircle2,
  'team-preview': Layers3,
  lab: Boxes,
}

export default function EditionsPage() {
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
            href="/docs#distribution-policy"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-[12px] font-medium text-neutral-400 transition-colors hover:text-neutral-100"
          >
            <ArrowLeft size={14} />
            Policy
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden border-b border-white/[0.06]">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.1), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.024), transparent 42%)',
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-8xl mx-auto px-6 py-14 lg:py-18">
          <p className="eyebrow mb-4">Editions</p>
          <h1 className="section-title-display max-w-4xl text-heading text-neutral-50 sm:text-display-sm">
            Editions, plans and distribution policy
          </h1>
          <p className="mt-5 max-w-3xl text-body-lg leading-relaxed text-neutral-500">
            {distributionPolicy.promise}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="/docs#distribution-policy"
              className="btn-sheen inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-[14px] font-semibold text-surface"
            >
              Ler policy
              <FileKey2 size={15} />
            </a>
            <a
              href="/examples"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-[14px] font-medium text-neutral-300 transition-colors hover:text-neutral-100"
            >
              Ver exemplos
            </a>
            <a
              href="/release"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-[14px] font-medium text-neutral-300 transition-colors hover:text-neutral-100"
            >
              Ver release
            </a>
          </div>
        </div>
      </section>

      <section id="edition-matrix" className="section-rhythm">
        <div className="max-w-8xl mx-auto px-6">
          <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="eyebrow mb-4">Matrix</p>
              <h2 className="section-title-display text-heading text-neutral-50">
                Core local primeiro, previews com fronteira clara.
              </h2>
            </div>
            <p className="text-body leading-relaxed text-neutral-500">
              As edicoes abaixo nao bloqueiam o runtime local. Elas explicam
              maturidade, publico, escopo e limites antes de qualquer bundle,
              cloud ou distribuicao comercial.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            {distributionPolicy.editions.map((edition) => {
              const Icon = editionIcon[edition.id as keyof typeof editionIcon]

              return (
                <article
                  id={edition.id}
                  key={edition.id}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-5"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/18 bg-accent/10 text-accent">
                    <Icon size={18} />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {edition.status}
                  </p>
                  <h3 className="mt-2 text-[18px] font-semibold text-neutral-100">
                    {edition.name}
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-neutral-500">
                    {edition.audience}
                  </p>
                  <div className="mt-5 space-y-4">
                    <div>
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                        Inclui
                      </p>
                      <ul className="space-y-2">
                        {edition.includes.map((item) => (
                          <li key={item} className="text-[12px] leading-relaxed text-neutral-400">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                        Limites
                      </p>
                      <ul className="space-y-2">
                        {edition.boundaries.map((item) => (
                          <li key={item} className="text-[12px] leading-relaxed text-neutral-500">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="distribution-policy" className="border-y border-white/[0.06] bg-white/[0.012] py-14">
        <div className="max-w-8xl mx-auto px-6">
          <div className="grid gap-4 md:grid-cols-2">
            {distributionPolicy.policies.map((policy) => (
              <article key={policy.label} className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-accent/18 bg-accent/10 text-accent">
                  <ShieldCheck size={17} />
                </div>
                <h3 className="text-[16px] font-semibold text-neutral-100">
                  {policy.label}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
                  {policy.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-rhythm">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-lg border border-white/[0.08] bg-black/25 p-5">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
              release channels
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {distributionPolicy.releaseChannels.map((channel) => (
                <span
                  key={channel}
                  className="rounded-lg border border-white/[0.055] bg-white/[0.018] px-3 py-3 text-[12px] leading-relaxed text-neutral-500"
                >
                  {channel}
                </span>
              ))}
            </div>
            <a
              href="/docs#release-bundle"
              className="mt-5 inline-flex text-[12px] font-medium text-accent transition-colors hover:text-accent-light"
            >
              Ver bundle e installer distribution
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
