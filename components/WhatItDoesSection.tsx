'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Terminal, Cpu, Shield, FileCheck } from 'lucide-react'

/**
 * Trust loop — fast scroll scrub + refined UI.
 * Middle ground: not heavy cards, not sparse rail — product-grade panel.
 */

const steps = [
  {
    id: 'intent',
    num: '01',
    kicker: 'Entrada',
    title: 'Intenção',
    description:
      'Você descreve o objetivo em linguagem natural no dashboard, no CLI ou em um canal autorizado.',
    icon: Terminal,
    panel: {
      badge: 'entrada',
      headline: 'Comando capturado',
      detail: 'Sem executar ainda — só a intenção e a origem.',
      rows: [
        { k: 'origem', v: 'dashboard · local' },
        { k: 'pedido', v: 'organize invoices/ e avise no Telegram' },
        { k: 'estado', v: 'intenção pronta' },
      ],
      accent: 'intent',
    },
  },
  {
    id: 'plan',
    num: '02',
    kicker: 'Análise',
    title: 'Plano local',
    description:
      'O runtime indexa o workspace, monta o plano e lista ferramentas e riscos — sem rodar nada sensível.',
    icon: Cpu,
    panel: {
      badge: 'plano',
      headline: 'Plano montado',
      detail: 'Arquivos, passos e risco visíveis antes do portão.',
      rows: [
        { k: 'arquivo', v: 'plan.md · 6 passos' },
        { k: 'escopo', v: '42 caminhos mapeados' },
        { k: 'risco', v: 'write · network · medium' },
      ],
      accent: 'plan',
    },
  },
  {
    id: 'gate',
    num: '03',
    kicker: 'Governança',
    title: 'Portão de decisão',
    description:
      'Ações sensíveis ficam bloqueadas até você aprovar. Diff, destino e permissões legíveis.',
    icon: Shield,
    panel: {
      badge: 'portão',
      headline: 'Aguardando você',
      detail: 'Nada sai do sandbox sem confirmação explícita.',
      rows: [
        { k: 'gate', v: 'awaiting operator' },
        { k: 'diff', v: '+12 / −3 caminhos' },
        { k: 'ações', v: 'aprovar · rejeitar · editar' },
      ],
      accent: 'gate',
    },
  },
  {
    id: 'receipt',
    num: '04',
    kicker: 'Auditoria',
    title: 'Recibo assinado',
    description:
      'Sandbox executa e grava um recibo local — o que rodou, o que mudou, o que restou.',
    icon: FileCheck,
    panel: {
      badge: 'recibo',
      headline: 'Recibo gravado',
      detail: 'Prova legível no disco, pronta para auditoria.',
      rows: [
        { k: 'sandbox', v: 'isolado · exit 0' },
        { k: 'receipt', v: 'sha256 · data/runtime/' },
        { k: 'próximo', v: 'notificar canal se autorizado' },
      ],
      accent: 'receipt',
    },
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
  const [activeStep, setActiveStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const onScroll = () => {
      const section = sectionRef.current
      if (!section) return
      const p = progressFromSection(section)
      setProgress(p)
      setActiveStep(stepFromProgress(p))
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
    const section = sectionRef.current
    if (!section) return
    const top = window.scrollY + section.getBoundingClientRect().top
    const travel = Math.max(1, section.offsetHeight - window.innerHeight)
    window.scrollTo({ top: top + ((index + 0.45) / 4) * travel, behavior: 'smooth' })
  }

  const current = steps[activeStep]
  const Icon = current.icon

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="how-section relative border-t border-white/[0.06] bg-black scroll-mt-20"
      style={{ height: '240vh' }}
    >
      <div className="sticky top-0 flex min-h-[100svh] items-center py-14 sm:py-16">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-2xl">
            <span className="section-kicker">Como funciona</span>
            <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Loop de confiança, <span className="text-emerald-400">não de surpresa.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-neutral-400 sm:text-base">
              Role para ver intenção → plano → portão → recibo — o mesmo fluxo do runtime.
            </p>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-center">
            {/* Left rail — refined, not empty, not heavy cards */}
            <div className="lg:col-span-5">
              <div className="how-steps">
                {steps.map((step, index) => {
                  const StepIcon = step.icon
                  const active = index === activeStep
                  const done = index < activeStep
                  return (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => scrollToStep(index)}
                      className={`how-step ${active ? 'is-active' : ''} ${done ? 'is-done' : ''}`}
                    >
                      <span className="how-step-index">
                        <span className="how-step-num">{step.num}</span>
                        <span className="how-step-track" aria-hidden />
                      </span>
                      <span className="how-step-content">
                        <span className="how-step-kicker">{step.kicker}</span>
                        <span className="how-step-title">
                          <StepIcon size={15} className="how-step-icon" aria-hidden />
                          {step.title}
                        </span>
                        <span className="how-step-desc">{step.description}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right proof panel */}
            <div className="lg:col-span-7">
              <div className="how-surface">
                <div className="how-surface-progress" style={{ width: `${Math.round(progress * 100)}%` }} />

                <div className="how-surface-head">
                  <span className="how-surface-badge">
                    <span className="how-surface-badge-dot" />
                    {current.panel.badge}
                  </span>
                  <span className="how-surface-count">
                    {String(activeStep + 1).padStart(2, '0')}
                    <span> / 04</span>
                  </span>
                </div>

                <div key={current.id} className="how-mock-fade">
                  <div className="how-surface-icon">
                    <Icon size={20} />
                  </div>
                  <h3 className="how-surface-title">{current.panel.headline}</h3>
                  <p className="how-surface-detail">{current.panel.detail}</p>

                  <div className="how-surface-grid">
                    {current.panel.rows.map((row) => (
                      <div key={row.k} className="how-surface-row">
                        <span className="how-surface-k">{row.k}</span>
                        <span className="how-surface-v">{row.v}</span>
                      </div>
                    ))}
                  </div>

                  <div className="how-surface-foot">
                    <span className="how-surface-check">✓</span>
                    sem inventar provider · sem ação fora do portão
                  </div>
                </div>

                <div className="how-surface-dots" aria-hidden>
                  {steps.map((s, i) => (
                    <span key={s.id} className={i <= activeStep ? 'on' : ''} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
