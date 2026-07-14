'use client'

import React, { useEffect, useRef, useState } from 'react'

/**
 * Trust loop — scroll-scrubbed, refined panel.
 * Clear product language. Elevated visual density without cards-for-cards.
 */

const steps = [
  {
    id: 'intent',
    num: '01',
    title: 'Intenção',
    line: 'Descreva o objetivo em linguagem natural.',
    detail:
      'O pedido entra pelo painel, pelo terminal ou por um canal autorizado e permanece no ambiente local.',
    facts: [
      { k: 'Origem', v: 'Painel local' },
      { k: 'Pedido', v: 'organize invoices/' },
      { k: 'Estado', v: 'Registrada' },
    ],
  },
  {
    id: 'plan',
    num: '02',
    title: 'Plano',
    line: 'O runtime elabora o plano e sinaliza riscos.',
    detail:
      'Nenhuma ação é executada nesta etapa. Os passos e o escopo ficam legíveis antes de qualquer alteração.',
    facts: [
      { k: 'Artefato', v: 'plan.md · 6 passos' },
      { k: 'Escopo', v: '42 caminhos' },
      { k: 'Risco', v: 'Escrita · médio' },
    ],
  },
  {
    id: 'gate',
    num: '03',
    title: 'Aprovação',
    line: 'Operações sensíveis aguardam confirmação explícita.',
    detail:
      'Diff, escopo e tipo de ação permanecem visíveis. Sem aprovação, o sistema não é modificado.',
    facts: [
      { k: 'Status', v: 'Aguardando operador' },
      { k: 'Diff', v: '+12 / −3' },
      { k: 'Opções', v: 'Aprovar · rejeitar' },
    ],
  },
  {
    id: 'receipt',
    num: '04',
    title: 'Recibo',
    line: 'A execução ocorre em sandbox e gera prova local.',
    detail:
      'Resultado e trilha de auditoria ficam no ambiente do operador, disponíveis para revisão e retomada.',
    facts: [
      { k: 'Sandbox', v: 'Exit 0' },
      { k: 'Prova', v: 'sha256 local' },
      { k: 'Próximo', v: 'Canal, se autorizado' },
    ],
  },
] as const

function progressFromSection(section: HTMLElement): number {
  const rect = section.getBoundingClientRect()
  const vh = window.innerHeight
  const total = Math.max(1, rect.height - vh)
  return Math.max(0, Math.min(1, -rect.top / total))
}

function stepFromProgress(p: number): number {
  if (p >= 0.97) return 3
  return Math.min(3, Math.floor(p * 4))
}

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const p = progressFromSection(el)
      setProgress(p)
      setActive(stepFromProgress(p))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [mounted])

  const scrollToStep = (index: number) => {
    const el = sectionRef.current
    if (!el) return
    const top = window.scrollY + el.getBoundingClientRect().top
    const travel = Math.max(1, el.offsetHeight - window.innerHeight)
    window.scrollTo({ top: top + ((index + 0.45) / 4) * travel, behavior: 'smooth' })
  }

  const current = steps[active]
  const pct = Math.round(progress * 100)

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="tl-section landing-surface relative border-t border-white/[0.06] scroll-mt-20"
      style={{ height: '210vh' }}
    >
      <div className="sticky top-0 flex min-h-[100svh] items-center py-14 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 72% 48%, rgba(0,232,143,0.06), transparent 68%), radial-gradient(ellipse 40% 30% at 12% 20%, rgba(255,255,255,0.02), transparent 50%)',
          }}
        />

        <div className="relative mx-auto w-full max-w-5xl px-6">
          <header className="max-w-2xl">
            <span className="section-kicker">Como funciona</span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Intenção, plano, aprovação{' '}
              <span className="text-emerald-400">e prova.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-neutral-500 sm:text-[15px]">
              O ciclo de confiança do Zavorth. Role para percorrer cada etapa com o runtime.
            </p>
          </header>

          <nav className="tl-rail mt-12 sm:mt-14" aria-label="Etapas do ciclo">
            <div className="tl-rail-track" aria-hidden>
              <div className="tl-rail-fill" style={{ width: `${progress * 100}%` }} />
            </div>
            <ol className="tl-rail-steps">
              {steps.map((step, i) => {
                const isActive = i === active
                const isDone = i < active
                return (
                  <li key={step.id}>
                    <button
                      type="button"
                      onClick={() => scrollToStep(i)}
                      className={`tl-rail-btn ${isActive ? 'is-active' : ''} ${isDone ? 'is-done' : ''}`}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <span className="tl-rail-dot" />
                      <span className="tl-rail-label">
                        <span className="tl-rail-num">{step.num}</span>
                        <span className="tl-rail-name">{step.title}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </nav>

          <div className="tl-panel mt-10 sm:mt-12">
            <div className="tl-panel-bar" aria-hidden>
              <div className="tl-panel-bar-fill" style={{ width: `${progress * 100}%` }} />
            </div>

            <div key={current.id} className="tl-panel-body">
              <div className="tl-panel-left">
                <div className="tl-panel-meta">
                  <span className="tl-panel-step">Etapa {current.num}</span>
                  <span className="tl-panel-pct">{pct}%</span>
                </div>
                <p className="tl-stage-eyebrow">{current.title}</p>
                <h3 className="tl-stage-title">{current.line}</h3>
                <p className="tl-stage-detail">{current.detail}</p>

                <div className="tl-panel-links">
                  <span className="tl-note">
                    <span className="tl-note-dot" />
                    Ações sensíveis exigem aprovação · prova permanece local
                  </span>
                  <a href="/demo" className="tl-panel-cta">
                    Abrir demonstração do ciclo →
                  </a>
                </div>
              </div>

              <div className="tl-panel-right">
                <div className="tl-panel-num" aria-hidden>
                  {current.num}
                </div>
                <dl className="tl-metrics">
                  {current.facts.map((f) => (
                    <div key={f.k} className="tl-metric">
                      <dt>{f.k}</dt>
                      <dd>{f.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
