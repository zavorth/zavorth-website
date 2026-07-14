'use client'

import React from 'react'

/**
 * Editorial intro — what Zavorth is.
 * Clear product language for a local agent launch.
 */

const beats = [
  {
    title: 'Entrada em linguagem natural',
    text: 'Instruções pelo painel, pelo terminal ou por um canal autorizado — sem depender de um formato rígido de prompt.',
  },
  {
    title: 'Execução no ambiente local',
    text: 'O agente opera no seu computador: arquivos, comandos e ferramentas do runtime, não apenas respostas em chat.',
  },
  {
    title: 'Controle antes de ações sensíveis',
    text: 'Alterações de risco exigem plano visível e aprovação explícita. Nada avança sem confirmação.',
  },
  {
    title: 'Aprendizado com o uso',
    text: 'Memória e preferências permanecem no ambiente local. O agente se adapta ao fluxo de trabalho com o tempo.',
  },
] as const

export function ProductIntroSection() {
  return (
    <section
      id="overview"
      data-product-intro
      className="landing-surface relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32 scroll-mt-20"
    >
      <div className="mesh-grid absolute inset-0 opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="max-w-3xl">
          <span className="section-kicker">O agente</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Um agente de IA local.{' '}
            <span className="text-emerald-400">Com governança embutida.</span>
          </h2>
          <p className="mt-6 text-base leading-8 text-neutral-400 sm:text-lg">
            O Zavorth é um runtime de agente projetado para operar no seu computador. Ele interpreta
            objetivos, apresenta um plano, solicita aprovação em operações sensíveis e registra prova
            de execução — com memória e habilidades que evoluem com o uso.
          </p>
        </div>

        <div className="mt-16 sm:mt-20">
          <ol className="story-list">
            {beats.map((beat, i) => (
              <li key={beat.title} className="story-row">
                <span className="story-num" aria-hidden>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="story-copy">
                  <h3 className="story-title">{beat.title}</h3>
                  <p className="story-text">{beat.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <p className="mt-14 max-w-2xl text-sm leading-7 text-neutral-500">
          Habilidades, memória e sessões permanecem no ambiente do operador. Sem provider inventado.
          Sem mutação fora da política de aprovação.
        </p>
      </div>
    </section>
  )
}
