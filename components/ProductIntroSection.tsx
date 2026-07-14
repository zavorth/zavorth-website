'use client'

import React from 'react'

const beats = [
  {
    title: 'Linguagem Natural',
    text: 'Instruções pelo painel, pelo terminal ou por um canal autorizado — sem depender de um formato rígido de prompt.',
  },
  {
    title: 'Ambiente Local',
    text: 'O agente opera no seu computador: arquivos, comandos e ferramentas do runtime, não apenas respostas em chat.',
  },
  {
    title: 'Aprovação por Design',
    text: 'Alterações de risco exigem plano visível e aprovação explícita. Nada avança sem confirmação.',
  },
  {
    title: 'Memória Evolutiva',
    text: 'Preferências e históricos permanecem no ambiente local. O agente se adapta ao fluxo de trabalho com o tempo.',
  },
] as const

export function ProductIntroSection() {
  return (
    <section
      id="overview"
      data-product-intro
      className="landing-surface relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32 scroll-mt-20"
    >
      <div className="mesh-grid absolute inset-0 opacity-[0.015] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
          {/* Lado Esquerdo - Editorial */}
          <div className="lg:col-span-7 max-w-2xl">
            <span className="section-kicker">O Agente</span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Um runtime de IA local.{' '}
              <span className="text-emerald-400 block sm:inline">Com governança embutida.</span>
            </h2>
            <p className="mt-8 text-base leading-8 text-neutral-400 sm:text-lg">
              O Zavorth é projetado para operar inteiramente no seu computador. Ele interpreta
              seus objetivos, apresenta um plano de execução claro, solicita aprovação em operações
              sensíveis e grava recibos de auditoria local — garantindo privacidade absoluta por design.
            </p>

            <div className="mt-12 grid gap-8 sm:grid-cols-2">
              {beats.map((beat, i) => (
                <div key={beat.title} className="relative group">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-emerald-400/70" aria-hidden>
                      0{i + 1}
                    </span>
                    <h3 className="text-sm font-semibold text-white tracking-wide uppercase">
                      {beat.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-neutral-500 group-hover:text-neutral-400 transition-colors">
                    {beat.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Lado Direito - Diagrama de Soberania Local */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[320px] aspect-square flex items-center justify-center">
              {/* Círculo do limite de segurança */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full text-emerald-500/20"
                aria-hidden="true"
              >
                {/* Linha orbital externa (Nuvem / APIs) */}
                <circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  className="animate-[spin_40s_linear_infinite]"
                />

                {/* Limite de Segurança Local (Borda sólida) */}
                <circle
                  cx="100"
                  cy="100"
                  r="66"
                  fill="none"
                  stroke="#00e88f"
                  strokeWidth="1.5"
                  strokeOpacity="0.8"
                  className="shadow-inner"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(0, 232, 143, 0.3))' }}
                />

                {/* Órbita de dados interna */}
                <circle
                  cx="100"
                  cy="100"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="8 4"
                  className="animate-[spin_15s_linear_infinite_reverse]"
                />

                {/* Conexões de Dados Seguras (linhas radiais finas) */}
                <line x1="100" y1="100" x2="100" y2="10" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                <line x1="100" y1="100" x2="10" y2="100" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                <line x1="100" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                <line x1="100" y1="100" x2="100" y2="190" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />

                {/* Núcleo Local (CPU / Operador) */}
                <circle cx="100" cy="100" r="16" fill="#00e88f" fillOpacity="0.1" stroke="#00e88f" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="6" fill="#00e88f" className="animate-pulse" />
              </svg>

              {/* Rótulos de texto flutuantes minimalistas */}
              <div className="absolute top-4 left-4 font-mono text-[9px] uppercase tracking-wider text-neutral-500">
                EXTERNAL_APIS
              </div>
              <div className="absolute top-24 left-[54px] font-mono text-[9px] uppercase tracking-wider text-emerald-400 font-semibold">
                LOCAL_BOUNDARY
              </div>
              <div className="absolute bottom-8 right-8 font-mono text-[9px] uppercase tracking-wider text-neutral-500">
                AUDIT_TRAIL
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
