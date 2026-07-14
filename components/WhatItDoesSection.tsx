'use client'

import React, { useEffect, useRef, useState } from 'react'

const steps = [
  {
    id: 'intent',
    num: '01',
    title: 'Intenção',
    description: 'Você define o objetivo em linguagem natural.',
    detail: 'O pedido entra pelo painel local ou canais autorizados. O processador local interpreta a sua intenção sem enviar seus dados confidenciais para fora da rede.',
  },
  {
    id: 'plan',
    num: '02',
    title: 'Planejamento',
    description: 'O runtime elabora um plano de ação completo.',
    detail: 'O agente escreve um arquivo de plano contendo cada comando, modificação de arquivo e chamada externa de API. Nenhum código roda ainda nesta fase.',
  },
  {
    id: 'gate',
    num: '03',
    title: 'Aprovação Obrigatória',
    description: 'Operações críticas aguardam sua decisão.',
    detail: 'Modificações no sistema e ações sensíveis são bloqueadas em um portal de controle. Você audita o plano e as alterações pendentes e decide se aprova ou rejeita.',
  },
  {
    id: 'proof',
    num: '04',
    title: 'Prova de Execução',
    description: 'Ação isolada com recibo criptográfico local.',
    detail: 'Após sua aprovação, o runtime executa as ações em sandbox seguro e grava um recibo de auditoria inalterável (hash SHA-256) diretamente no seu disco.',
  },
] as const

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const totalScrollable = el.offsetHeight - vh
      
      // Calculate progress relative to the section scroll
      const currentScroll = -rect.top
      const p = Math.max(0, Math.min(1, currentScroll / totalScrollable))
      setProgress(p)

      // Determine active index based on scroll progress
      let activeIndex = Math.min(steps.length - 1, Math.floor(p * steps.length))
      if (p >= 0.98) activeIndex = steps.length - 1
      setActive(activeIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="landing-surface relative border-t border-white/[0.06] scroll-mt-20"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 flex min-h-screen items-center py-20 overflow-hidden">
        <div className="relative mx-auto w-full max-w-5xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Lado Esquerdo: Textos Editoriais Fixos */}
            <div className="lg:col-span-6 flex flex-col justify-center min-h-[50vh] pr-4">
              <span className="section-kicker">O Ciclo de Confiança</span>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Transparência absoluta <br />
                <span className="text-emerald-400">em cada execução.</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
                O Zavorth funciona através de um ciclo de controle inalterável. Role para ver como o runtime processa objetivos com governança local.
              </p>

              {/* Bloco de Etapa Ativa com transição visual */}
              <div className="mt-12 min-h-[220px] transition-all duration-500">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded-md">
                    Etapa {steps[active].num}
                  </span>
                  <div className="h-[1px] flex-1 bg-white/10" />
                </div>
                <h3 className="mt-6 text-xl sm:text-2xl font-medium text-white transition-colors duration-300">
                  {steps[active].title}
                </h3>
                <p className="mt-3 text-sm text-neutral-300 font-medium">
                  {steps[active].description}
                </p>
                <p className="mt-4 text-xs leading-relaxed text-neutral-500">
                  {steps[active].detail}
                </p>
              </div>

              {/* Progresso visual minimalista */}
              <div className="mt-8 flex items-center gap-4">
                <span className="font-mono text-[10px] text-neutral-500">INIT</span>
                <div className="relative h-[2px] flex-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-emerald-400 transition-all duration-200"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-emerald-400">{Math.round(progress * 100)}%</span>
              </div>
            </div>

            {/* Lado Direito: Diagrama Vetorial Interativo (SVG) */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative w-full max-w-[420px] aspect-[4/3] bg-neutral-950/40 rounded-3xl border border-white/5 p-8 backdrop-blur-md">
                <svg
                  viewBox="0 0 400 300"
                  className="w-full h-full text-neutral-700"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Definições de gradiente e filtros */}
                  <defs>
                    <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                    <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="6" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* Caminho do Fluxo Principal (Linha de Conexão Central) */}
                  <path
                    d="M 50,150 L 150,150 L 250,150 L 350,150"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeOpacity="0.2"
                  />
                  {/* Linha de Progresso Ativa no Diagrama */}
                  <path
                    d="M 50,150 L 150,150 L 250,150 L 350,150"
                    stroke="#00e88f"
                    strokeWidth="2"
                    strokeDasharray="400"
                    strokeDashoffset={400 - progress * 300}
                    className="transition-[stroke-dashoffset] duration-300"
                    filter="url(#glow-emerald)"
                  />

                  {/* NÓ 1: INTENÇÃO (01) */}
                  <g transform="translate(50, 150)">
                    <circle
                      r="22"
                      fill={active >= 0 ? '#0a0a0d' : '#030303'}
                      stroke={active >= 0 ? '#00e88f' : 'currentColor'}
                      strokeWidth={active >= 0 ? '2' : '1'}
                      className="transition-colors duration-300"
                    />
                    <text
                      textAnchor="middle"
                      dy="5"
                      fill={active >= 0 ? '#00e88f' : '#888'}
                      className="font-mono text-[10px] font-bold"
                    >
                      INT
                    </text>
                    <circle
                      r="28"
                      stroke="#00e88f"
                      strokeWidth="1"
                      strokeOpacity={active === 0 ? '0.4' : '0'}
                      strokeDasharray="3 3"
                      className="animate-[spin_10s_linear_infinite]"
                    />
                  </g>

                  {/* NÓ 2: PLANEJAMENTO (02) */}
                  <g transform="translate(150, 150)">
                    <circle
                      r="22"
                      fill={active >= 1 ? '#0a0a0d' : '#030303'}
                      stroke={active >= 1 ? '#00e88f' : 'currentColor'}
                      strokeWidth={active >= 1 ? '2' : '1'}
                      className="transition-colors duration-300"
                    />
                    <text
                      textAnchor="middle"
                      dy="5"
                      fill={active >= 1 ? '#00e88f' : '#888'}
                      className="font-mono text-[10px] font-bold"
                    >
                      PLAN
                    </text>
                    {active >= 1 && (
                      <g className="animate-pulse">
                        <line x1="-10" y1="35" x2="10" y2="35" stroke="#00e88f" strokeWidth="1" strokeOpacity="0.5" />
                        <line x1="-8" y1="42" x2="8" y2="42" stroke="#00e88f" strokeWidth="1" strokeOpacity="0.5" />
                      </g>
                    )}
                  </g>

                  {/* NÓ 3: GATE DE APROVAÇÃO (03) */}
                  <g transform="translate(250, 150)">
                    {/* Indicador de bloqueio / Gate */}
                    <circle
                      r="24"
                      fill={active >= 2 ? '#0a0a0d' : '#030303'}
                      stroke={active === 2 ? '#F59E0B' : active > 2 ? '#00e88f' : 'currentColor'}
                      strokeWidth={active >= 2 ? '2' : '1'}
                      filter={active === 2 ? 'url(#glow-amber)' : active > 2 ? 'url(#glow-emerald)' : ''}
                      className="transition-all duration-300"
                    />
                    
                    {/* Ícone de Cadeado minimalista */}
                    {active < 3 ? (
                      /* Fechado (Orange/Gray) */
                      <path
                        d="M -6,2 L 6,2 L 6,-6 L -6,-6 Z M -3,-6 L -3,-10 C -3,-13 3,-13 3,-10 L 3,-6"
                        stroke={active === 2 ? '#F59E0B' : 'currentColor'}
                        strokeWidth="1.5"
                        fill="none"
                      />
                    ) : (
                      /* Aberto (Emerald) */
                      <path
                        d="M -6,2 L 6,2 L 6,-6 L -6,-6 Z M -3,-6 L -3,-10 C -3,-13 3,-13 3,-10 L 3,-8"
                        stroke="#00e88f"
                        strokeWidth="1.5"
                        fill="none"
                        className="animate-pulse"
                      />
                    )}
                  </g>

                  {/* NÓ 4: PROVA / EXECUÇÃO (04) */}
                  <g transform="translate(350, 150)">
                    <circle
                      r="22"
                      fill={active >= 3 ? '#0a0a0d' : '#030303'}
                      stroke={active >= 3 ? '#00e88f' : 'currentColor'}
                      strokeWidth={active >= 3 ? '2' : '1'}
                      className="transition-colors duration-300"
                    />
                    <text
                      textAnchor="middle"
                      dy="5"
                      fill={active >= 3 ? '#00e88f' : '#888'}
                      className="font-mono text-[10px] font-bold"
                    >
                      SIGN
                    </text>
                  </g>
                </svg>

                {/* Status flutuante do Diagrama */}
                <div className="absolute bottom-5 left-5 right-5 flex justify-between font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
                  <span>SYSTEM_FLOW: ACTIVE</span>
                  {active === 2 ? (
                    <span className="text-amber-500 font-semibold animate-pulse">Awaiting Approval</span>
                  ) : active === 3 ? (
                    <span className="text-emerald-400 font-semibold">Sandbox Executed</span>
                  ) : (
                    <span>Monitoring</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
