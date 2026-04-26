import React from 'react'
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  FileJson,
  HeartPulse,
  Play,
  RotateCcw,
  ShieldCheck,
  Terminal,
  Wrench,
} from 'lucide-react'
import { BrandMark } from '../../components/BrandMark'
import { Footer } from '../../components/Footer'
import { firstRunStory } from '../../data/first-run'

const stepIcon = {
  requirements: ClipboardList,
  preview: FileJson,
  install: Wrench,
  'first-run': Play,
  'health-check': HeartPulse,
  cleanup: RotateCcw,
}

export default function StartPage() {
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
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] px-3 py-2 text-[12px] font-medium text-neutral-400 transition-colors hover:text-neutral-100"
          >
            <ArrowLeft size={14} />
            Home
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
        <div className="relative max-w-8xl mx-auto grid gap-10 px-6 py-14 lg:grid-cols-[minmax(0,0.88fr)_minmax(520px,1.12fr)] lg:items-center lg:py-18">
          <div>
            <p className="eyebrow mb-4">First run</p>
            <h1 className="section-title-display text-heading text-neutral-50 sm:text-display-sm">
              {firstRunStory.title}
            </h1>
            <p className="mt-5 max-w-2xl text-body-lg leading-relaxed text-neutral-500">
              {firstRunStory.objective}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href="/start#first-run-checklist"
                className="btn-sheen inline-flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-3 text-[14px] font-semibold text-surface"
              >
                Ver checklist
                <CheckCircle2 size={15} />
              </a>
              <a
                href="/docs#first-run"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-6 py-3 text-[14px] font-medium text-neutral-300 transition-colors hover:text-neutral-100"
              >
                Ler roteiro
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-black/30 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
            <div className="mb-4 flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
                <Terminal size={14} />
                public command
              </span>
              <span className="rounded-full bg-accent/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
                fixture-first
              </span>
            </div>
            <code className="block whitespace-pre-wrap rounded-lg bg-white/[0.025] p-4 font-mono text-[13px] leading-relaxed text-neutral-300">
              {firstRunStory.command}
            </code>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {firstRunStory.safety.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-[12px] text-neutral-400"
                >
                  <ShieldCheck size={14} className="text-accent" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="first-run-checklist" className="section-rhythm">
        <div className="max-w-8xl mx-auto px-6">
          <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="eyebrow mb-4">Checklist</p>
              <h2 className="section-title-display text-heading text-neutral-50">
                Setup previsivel antes de qualquer mutacao.
              </h2>
            </div>
            <p className="text-body leading-relaxed text-neutral-500">
              O onboarding publico mostra detector de requisitos, preview de
              setup, comando de primeira execucao, health check e cleanup. A
              primeira sessao nao exige credenciais externas.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)]">
            <aside className="space-y-3">
              {firstRunStory.requirements.map((requirement) => (
                <article
                  key={requirement.label}
                  className="rounded-2xl border border-white/[0.065] bg-white/[0.018] p-4"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                    {requirement.status}
                  </p>
                  <h3 className="mt-2 text-[15px] font-semibold text-neutral-100">
                    {requirement.label}
                  </h3>
                  <p className="mt-2 text-[12px] leading-relaxed text-neutral-500">
                    {requirement.detail}
                  </p>
                </article>
              ))}
            </aside>

            <div className="space-y-3">
              {firstRunStory.steps.map((step, index) => {
                const Icon = stepIcon[step.state]

                return (
                  <article
                    key={step.state}
                    className="grid gap-4 rounded-2xl border border-white/[0.065] bg-white/[0.018] p-4 sm:grid-cols-[auto_minmax(0,1fr)_minmax(180px,0.55fr)] sm:items-center"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-accent/18 bg-accent/10 text-accent">
                      <Icon size={18} />
                    </span>
                    <div>
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
                        {String(index + 1).padStart(2, '0')} / {step.label}
                      </p>
                      <h3 className="text-[16px] font-semibold text-neutral-100">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[13px] leading-relaxed text-neutral-500">
                        {step.detail}
                      </p>
                    </div>
                    <p className="rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2 font-mono text-[11px] leading-relaxed text-neutral-500">
                      {step.evidence}
                    </p>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.012] py-14">
        <div className="max-w-8xl mx-auto px-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {firstRunStory.statuses.map((status) => (
              <article key={status.label} className="rounded-2xl border border-white/[0.08] bg-surface/70 p-5">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                  {status.label}
                </p>
                <h3 className="text-[15px] font-semibold text-neutral-100">
                  {status.title}
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-neutral-500">
                  {status.detail}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-rhythm">
        <div className="max-w-5xl mx-auto px-6">
          <div className="rounded-2xl border border-white/[0.08] bg-black/25 p-5">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-neutral-600">
              artifacts
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              {firstRunStory.artifacts.map((artifact) => (
                <span
                  key={artifact}
                  className="rounded-lg border border-white/[0.055] bg-white/[0.018] px-3 py-3 font-mono text-[11px] text-neutral-500"
                >
                  {artifact}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
