'use client'

import React from 'react'

const beats = [
  {
    title: 'Linguagem Natural',
    text: 'Instruções pelo painel, terminal ou canal autorizado — sem depender de formatos rígidos de prompt.',
  },
  {
    title: 'Ambiente Local',
    text: 'O agente opera na sua máquina: arquivos, comandos e ferramentas, não apenas respostas textuais.',
  },
  {
    title: 'Aprovação Obrigatória',
    text: 'Alterações sensíveis exigem plano de ação legível e confirmação explícita do operador.',
  },
  {
    title: 'Memória Evolutiva',
    text: 'Históricos, preferências e aprendizados ficam armazenados em disco local, sob seu controle.',
  },
] as const

export function ProductIntroSection() {
  return (
    <section
      id="overview"
      data-product-intro
      className="landing-surface relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32 scroll-mt-20"
    >
      <div className="mesh-grid absolute inset-0 opacity-[0.012] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Editorial Text Center */}
        <div className="mx-auto max-w-3xl">
          <span className="section-kicker">O Agente</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Um runtime de IA local.{' '}
            <span className="text-emerald-400 block sm:inline">Com governança embutida.</span>
          </h2>
          <p className="mt-8 text-base leading-8 text-neutral-400 sm:text-lg max-w-2xl mx-auto">
            O Zavorth é projetado para operar inteiramente no seu computador. Ele interpreta
            seus objetivos, apresenta um plano de execução claro, solicita aprovação em operações
            sensíveis e grava recibos de auditoria local — garantindo privacidade absoluta por design.
          </p>
        </div>

        {/* 4-column horizontal features row at the bottom with thin dividers */}
        <div className="mt-20 grid gap-8 border-t border-white/5 pt-12 sm:grid-cols-2 lg:grid-cols-4 text-left">
          {beats.map((beat, i) => (
            <div key={beat.title} className="relative group">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-emerald-400/60 font-semibold" aria-hidden>
                  0{i + 1}
                </span>
                <h3 className="text-xs font-semibold text-white tracking-wider uppercase">
                  {beat.title}
                </h3>
              </div>
              <p className="mt-3.5 text-xs leading-relaxed text-neutral-500 group-hover:text-neutral-400 transition-colors">
                {beat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
