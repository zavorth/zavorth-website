import React from 'react'
import { ArrowLeft, CheckCircle2, FileText, GitBranch, ShieldCheck, Terminal } from 'lucide-react'
import { BrandMark } from '../../components/BrandMark'
import { Footer } from '../../components/Footer'
import { externalDocs } from '../../data/external-docs'

const exampleIcon = {
  engineering: GitBranch,
  release: CheckCircle2,
  'replay-artifacts': FileText,
}

export default function ExamplesPage() {
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
            href="/docs"
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
              'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.1), transparent 34%), linear-gradient(180deg, rgba(255,255,255,0.024), transparent 42%)',
          }}
          aria-hidden="true"
        />
        <div className="relative max-w-8xl mx-auto px-6 py-14 lg:py-18">
          <p className="eyebrow mb-4">Examples</p>
          <h1 className="section-title-display max-w-4xl text-heading text-neutral-50 sm:text-display-sm">
            Exemplos externos por caso de uso
          </h1>
          <p className="mt-5 max-w-3xl text-body-lg leading-relaxed text-neutral-500">
            Casos publicos para engenharia, release e artifacts/replay. Cada
            exemplo aponta comando, resultado esperado e guardrail antes de
            qualquer automacao real.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="/docs#external-docs"
              className="btn-sheen inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-[14px] font-semibold text-surface"
            >
              Ler docs externas
              <Terminal size={15} />
            </a>
            <a
              href="/demo"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-[14px] font-medium text-neutral-300 transition-colors hover:text-neutral-100"
            >
              Ver demo
            </a>
            <a
              href="/editions"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-[14px] font-medium text-neutral-300 transition-colors hover:text-neutral-100"
            >
              Ver edicoes
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

      <section className="section-rhythm">
        <div className="max-w-8xl mx-auto px-6">
          <div className="grid gap-4 lg:grid-cols-3">
            {externalDocs.examples.map((example) => {
              const Icon = exampleIcon[example.id as keyof typeof exampleIcon]

              return (
                <article
                  id={example.id}
                  key={example.id}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-5"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/18 bg-accent/10 text-accent">
                    <Icon size={18} />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {example.audience}
                  </p>
                  <h2 className="mt-2 text-[18px] font-semibold text-neutral-100">
                    {example.title}
                  </h2>
                  <code className="mt-4 block rounded-lg border border-white/[0.06] bg-black/25 px-3 py-3 font-mono text-[12px] text-neutral-300">
                    {example.command}
                  </code>
                  <p className="mt-4 text-[13px] leading-relaxed text-neutral-500">
                    {example.outcome}
                  </p>
                  <p className="mt-3 inline-flex items-start gap-2 text-[12px] leading-relaxed text-neutral-500">
                    <ShieldCheck size={14} className="mt-0.5 shrink-0 text-accent" />
                    {example.guardrail}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.012] py-14">
        <div className="max-w-8xl mx-auto px-6">
          <div className="grid gap-4 md:grid-cols-2">
            {externalDocs.guides.map((guide) => (
              <article key={guide.id} className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  {guide.id}
                </p>
                <h2 className="text-[16px] font-semibold text-neutral-100">
                  {guide.title}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
                  {guide.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {guide.links.map((href) => (
                    <a
                      key={href}
                      href={href}
                      className="rounded-lg border border-white/[0.07] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-500 transition-colors hover:text-neutral-200"
                    >
                      {href}
                    </a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
