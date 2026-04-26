import React from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  FileArchive,
  FileText,
  RotateCcw,
  ShieldCheck,
  Terminal,
} from 'lucide-react'
import { BrandMark } from '../../components/BrandMark'
import { Footer } from '../../components/Footer'
import { releaseBundle } from '../../data/release-bundle'

export default function ReleasePage() {
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
            href="/changelog"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-[12px] font-medium text-neutral-400 transition-colors hover:text-neutral-100"
          >
            <ArrowLeft size={14} />
            Changelog
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
          <p className="eyebrow mb-4">Release</p>
          <h1 className="section-title-display max-w-4xl text-heading text-neutral-50 sm:text-display-sm">
            {releaseBundle.title}
          </h1>
          <p className="mt-5 max-w-3xl text-body-lg leading-relaxed text-neutral-500">
            {releaseBundle.promise}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="/docs#release-bundle"
              className="btn-sheen inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-[14px] font-semibold text-surface"
            >
              Ler fluxo de release
              <FileText size={15} />
            </a>
            <a
              href="/editions"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-[14px] font-medium text-neutral-300 transition-colors hover:text-neutral-100"
            >
              Ver policy
            </a>
            <a
              href="/feedback"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-[14px] font-medium text-neutral-300 transition-colors hover:text-neutral-100"
            >
              Ver feedback
            </a>
          </div>
        </div>
      </section>

      <section id="release-bundle" className="section-rhythm">
        <div className="max-w-8xl mx-auto px-6">
          <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="eyebrow mb-4">Bundle</p>
              <h2 className="section-title-display text-heading text-neutral-50">
                Artefato verificavel antes de instalacao.
              </h2>
            </div>
            <p className="text-body leading-relaxed text-neutral-500">
              O pacote publico precisa ser legivel como produto: versao, canal,
              digest, conteudo, exclusoes e smoke aparecem antes de qualquer
              install real.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <article className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-5">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/18 bg-accent/10 text-accent">
                <FileArchive size={18} />
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                {releaseBundle.version} / {releaseBundle.channel}
              </p>
              <h3 className="mt-2 text-[18px] font-semibold text-neutral-100">
                {releaseBundle.bundle.fileName}
              </h3>
              <p className="mt-3 break-all font-mono text-[12px] leading-relaxed text-neutral-400">
                {releaseBundle.bundle.digest}
              </p>
              <p className="mt-4 text-[12px] leading-relaxed text-neutral-500">
                Status: {releaseBundle.bundle.status}. Tamanho: {releaseBundle.bundle.size}.
              </p>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-5">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                  inclui
                </p>
                <ul className="space-y-2">
                  {releaseBundle.bundle.contents.map((item) => (
                    <li key={item} className="flex gap-2 text-[12px] leading-relaxed text-neutral-400">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-5">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                  exclui
                </p>
                <ul className="space-y-2">
                  {releaseBundle.bundle.excludes.map((item) => (
                    <li key={item} className="flex gap-2 text-[12px] leading-relaxed text-neutral-500">
                      <ShieldCheck size={14} className="mt-0.5 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="installer-preview" className="border-y border-white/[0.06] bg-white/[0.012] py-14">
        <div className="max-w-8xl mx-auto px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {releaseBundle.installerPreview.map((step) => (
              <article key={step.id} className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
                <h3 className="text-[16px] font-semibold text-neutral-100">
                  {step.label}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
                  {step.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="package-smoke" className="section-rhythm">
        <div className="max-w-8xl mx-auto px-6">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-4">Smoke</p>
              <h2 className="section-title-display text-heading text-neutral-50">
                Pacote testavel sem rede externa obrigatoria.
              </h2>
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {releaseBundle.smokePlan.map((item) => (
              <article key={item.command} className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-5">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/18 bg-accent/10 text-accent">
                  <Terminal size={18} />
                </div>
                <h3 className="text-[16px] font-semibold text-neutral-100">
                  {item.label}
                </h3>
                <code className="mt-4 block overflow-x-auto rounded-lg border border-white/[0.06] bg-black/25 px-3 py-3 font-mono text-[12px] text-neutral-300">
                  {item.command}
                </code>
                <p className="mt-4 text-[13px] leading-relaxed text-neutral-500">
                  {item.reason}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="rollback-cleanup" className="border-y border-white/[0.06] bg-white/[0.012] py-14">
        <div className="max-w-8xl mx-auto px-6">
          <div className="grid gap-4 md:grid-cols-3">
            {releaseBundle.rollbackPlan.map((step) => (
              <article key={step.id} className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg border border-accent/18 bg-accent/10 text-accent">
                  <RotateCcw size={17} />
                </div>
                <h3 className="text-[16px] font-semibold text-neutral-100">
                  {step.label}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
                  {step.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="release-changelog" className="section-rhythm">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-lg border border-white/[0.08] bg-black/25 p-5">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
              changelog publico
            </p>
            <ul className="space-y-3">
              {releaseBundle.changelog.map((item) => (
                <li key={item} className="text-[13px] leading-relaxed text-neutral-500">
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
              <a
                href="/changelog"
                className="inline-flex items-center gap-2 text-[12px] font-medium text-accent transition-colors hover:text-accent-light"
              >
                Abrir changelog
                <FileText size={14} />
              </a>
              <a
                href="/docs#feedback-loop"
                className="inline-flex items-center gap-2 text-[12px] font-medium text-accent transition-colors hover:text-accent-light"
              >
                Ver feedback opt-in
                <FileText size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="release-train" className="border-t border-white/[0.06] bg-white/[0.012] py-14">
        <div className="max-w-8xl mx-auto px-6">
          <div className="mb-8 grid gap-4 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)]">
            <div>
              <p className="eyebrow mb-4">Release train</p>
              <h2 className="section-title-display text-heading text-neutral-50">
                {releaseBundle.releaseTrain.title}
              </h2>
            </div>
            <p className="text-body leading-relaxed text-neutral-500">
              {releaseBundle.releaseTrain.policy}
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            <article className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                baseline
              </p>
              <h3 className="mt-2 text-[18px] font-semibold text-neutral-100">
                {releaseBundle.releaseTrain.baseline}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
                Baseline estavel para tags, GitHub Releases, hotfix e rollback.
              </p>
            </article>
            <article className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                patch
              </p>
              <h3 className="mt-2 text-[18px] font-semibold text-neutral-100">
                {releaseBundle.releaseTrain.patchLane}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
                Hotfix pequeno, changelog publico, release candidate e rollback
                preview antes de publicar.
              </p>
            </article>
            <article className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                minor
              </p>
              <h3 className="mt-2 text-[18px] font-semibold text-neutral-100">
                {releaseBundle.releaseTrain.minorLane}
              </h3>
              <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
                Novo ciclo de feature so entra com planejamento aprovado e gate
                de fase explicito.
              </p>
            </article>
          </div>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            <article className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                cadencia leve
              </p>
              <ul className="space-y-3">
                {releaseBundle.releaseTrain.cadence.map((item) => (
                  <li key={item} className="text-[13px] leading-relaxed text-neutral-500">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                gates
              </p>
              <ul className="space-y-3">
                {releaseBundle.releaseTrain.checklist.map((item) => (
                  <li key={item} className="text-[13px] leading-relaxed text-neutral-500">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
