import React from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  FileText,
  RotateCcw,
  ShieldCheck,
  Terminal,
  Trash2,
} from 'lucide-react'
import { BrandMark } from '../../components/BrandMark'
import { Footer } from '../../components/Footer'
import { feedbackLoop } from '../../data/feedback-loop'

const controlIcon = {
  'telemetry-off': ShieldCheck,
  'preview-required': Eye,
  redaction: ShieldCheck,
  'opt-in-send': CheckCircle2,
  'revoke-delete': RotateCcw,
  'offline-ledger': FileText,
}

export default function FeedbackPage() {
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
            href="/privacy"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-[12px] font-medium text-neutral-400 transition-colors hover:text-neutral-100"
          >
            <ArrowLeft size={14} />
            Privacidade
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
          <p className="eyebrow mb-4">Feedback</p>
          <h1 className="section-title-display max-w-4xl text-heading text-neutral-50 sm:text-display-sm">
            {feedbackLoop.title}
          </h1>
          <p className="mt-5 max-w-3xl text-body-lg leading-relaxed text-neutral-500">
            {feedbackLoop.promise}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="/docs#feedback-loop"
              className="btn-sheen inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-[14px] font-semibold text-surface"
            >
              Ler feedback loop
              <FileText size={15} />
            </a>
            <a
              href="/privacy"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-5 py-3 text-[14px] font-medium text-neutral-300 transition-colors hover:text-neutral-100"
            >
              Ver privacidade
            </a>
          </div>
        </div>
      </section>

      <section id="feedback-loop" className="section-rhythm">
        <div className="max-w-8xl mx-auto px-6">
          <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="eyebrow mb-4">Opt-in</p>
              <h2 className="section-title-display text-heading text-neutral-50">
                Produto aprende sem assumir coleta.
              </h2>
            </div>
            <p className="text-body leading-relaxed text-neutral-500">
              O loop publico protege soberania local: nada sai por padrao,
              preview vem antes do envio, redaction acontece localmente e o
              ledger continua util mesmo offline.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {feedbackLoop.controls.map((control) => {
              const Icon = controlIcon[control.id as keyof typeof controlIcon]

              return (
                <article
                  key={control.id}
                  className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-5"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/18 bg-accent/10 text-accent">
                    <Icon size={18} />
                  </div>
                  <h3 className="text-[16px] font-semibold text-neutral-100">
                    {control.label}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
                    {control.detail}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="telemetry-preview" className="border-y border-white/[0.06] bg-white/[0.012] py-14">
        <div className="max-w-8xl mx-auto px-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
            <article className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                {feedbackLoop.defaultState}
              </p>
              <h2 className="mt-2 text-[18px] font-semibold text-neutral-100">
                {feedbackLoop.previewPackage.fileName}
              </h2>
              <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
                O preview mostra campos redigidos antes de qualquer envio opt-in.
                O ledger local fica em {feedbackLoop.previewPackage.ledger}.
              </p>
              <code className="mt-4 block overflow-x-auto rounded-lg border border-white/[0.06] bg-black/25 px-3 py-3 font-mono text-[12px] text-neutral-300">
                npm run feedback:preview
              </code>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                  inclui
                </p>
                <ul className="space-y-2">
                  {feedbackLoop.previewPackage.includes.map((item) => (
                    <li key={item} className="flex gap-2 text-[12px] leading-relaxed text-neutral-400">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                  redige
                </p>
                <ul className="space-y-2">
                  {feedbackLoop.previewPackage.redacts.map((item) => (
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

      <section id="feedback-commands" className="section-rhythm">
        <div className="max-w-8xl mx-auto px-6">
          <div className="mb-8">
            <p className="eyebrow mb-4">Commands</p>
            <h2 className="section-title-display text-heading text-neutral-50">
              Revisar, revogar e apagar continuam comandos locais.
            </h2>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {feedbackLoop.commands.map((item) => (
              <article key={item.command} className="rounded-lg border border-white/[0.08] bg-white/[0.018] p-5">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/18 bg-accent/10 text-accent">
                  {item.command.includes('delete') ? <Trash2 size={18} /> : <Terminal size={18} />}
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

      <section id="feedback-report-template" className="border-y border-white/[0.06] bg-white/[0.012] py-14">
        <div className="max-w-8xl mx-auto px-6">
          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                issue/report template
              </p>
              <ul className="space-y-3">
                {feedbackLoop.issueTemplate.map((item) => (
                  <li key={item} className="text-[13px] leading-relaxed text-neutral-500">
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-lg border border-white/[0.08] bg-surface/70 p-5">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                agregador sem payload sensivel
              </p>
              <ul className="space-y-3">
                {feedbackLoop.aggregator.map((item) => (
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
