'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { Box, Lock, RefreshCw, Route, ScrollText } from 'lucide-react'
import gsap from 'gsap'
import { createReveal, ensureGsapPlugins } from './motion'

const features = [
  {
    icon: Route,
    title: 'Roteamento inteligente',
    desc: 'Escolhe modelos, tools, skills e MCP sem obrigar voce a decidir o caminho.',
    tag: 'Router',
  },
  {
    icon: Box,
    title: 'Sandbox por tarefa',
    desc: 'Cada acao roda com escopo e permissoes temporarias.',
    tag: 'Scoped',
  },
  {
    icon: Lock,
    title: 'Preview e aprovacao',
    desc: 'Mutacoes aparecem antes de aplicar, com rollback quando necessario.',
    tag: 'Safe',
  },
  {
    icon: RefreshCw,
    title: 'Receitas reutilizaveis',
    desc: 'Fluxos bons viram padroes locais para repetir depois.',
    tag: 'Recipe',
  },
  {
    icon: ScrollText,
    title: 'Logs legiveis',
    desc: 'Cada run gera resumo claro, proveniencia e rastro auditavel.',
    tag: 'Audit',
  },
]

const flow = [
  { num: '01', label: 'Entender' },
  { num: '02', label: 'Contexto' },
  { num: '03', label: 'Executar' },
  { num: '04', label: 'Entregar' },
]

export function FeaturesSection() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      createReveal('[data-feat-header]', {
        trigger: rootRef.current!,
        start: 'top 78%',
        y: 18,
        duration: 0.8,
      })
      createReveal('[data-feat-item]', {
        trigger: '[data-feat-content]',
        start: 'top 82%',
        y: 16,
        duration: 0.75,
        stagger: 0.055,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="governance" ref={rootRef} className="relative section-rhythm">
      <div className="section-divider max-w-content mx-auto mb-16 lg:mb-20" />

      <div className="max-w-6xl mx-auto px-6">
        <div data-feat-header className="text-center mb-12 md:mb-14">
          <p className="eyebrow mb-4 justify-center mx-auto">03 - Capacidades</p>
          <h2 className="section-title-display text-heading sm:text-display-sm text-neutral-50 mb-5">
            Execucao com <span className="signal-text">governanca real.</span>
          </h2>
          <p className="section-lead text-body-lg text-neutral-500 leading-relaxed">
            Em vez de um bloco pesado, o Basilisk aplica pequenas camadas de controle
            ao longo do fluxo.
          </p>
        </div>

        <div data-feat-content className="governance-rail">
          <div className="governance-rail__flow" data-feat-item aria-label="Fluxo de execucao">
            {flow.map((step) => (
              <span key={step.num}>
                <b>{step.num}</b>
                {step.label}
              </span>
            ))}
          </div>

          <div className="governance-rail__layers">
            {features.map((feature, index) => {
              const FeatureIcon = feature.icon

              return (
                <article key={feature.title} className="governance-layer" data-feat-item>
                  <span className="governance-layer__index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="governance-layer__icon">
                    <FeatureIcon size={18} />
                  </span>
                  <div>
                    <p>{feature.tag}</p>
                    <h3>{feature.title}</h3>
                    <small>{feature.desc}</small>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
