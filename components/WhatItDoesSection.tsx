'use client'

import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Network, Sparkles, CheckCircle2, ArrowDown } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Deterministic Pixel Identicon Generator
 */
function Identicon({ seed, className = 'w-8 h-8' }: { seed: string; className?: string }) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }

  const grid: boolean[][] = []
  for (let y = 0; y < 5; y++) {
    grid[y] = []
    for (let x = 0; x < 3; x++) {
      const bitIndex = (y * 3 + x) % 31
      const isFilled = ((hash >> bitIndex) & 1) === 1
      grid[y][x] = isFilled
      grid[y][4 - x] = isFilled
    }
  }

  return (
    <svg viewBox="0 0 5 5" className={className} shapeRendering="crispEdges">
      {grid.map((row, y) =>
        row.map((filled, x) =>
          filled ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#00e88f" />
          ) : (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="rgba(255,255,255,0.05)" />
          )
        )
      )}
    </svg>
  )
}

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const agents = [
    {
      id: 'research',
      name: 'Pesquisador',
      seed: 'agent-research-flow',
      role: 'Busca Referências',
      desc: 'Analisa seus arquivos e documentações em busca do contexto necessário.',
    },
    {
      id: 'plan',
      name: 'Arquiteto',
      seed: 'agent-architect-flow',
      role: 'Monta a Estrutura',
      desc: 'Planeja as etapas e a melhor estratégia para o objetivo.',
    },
    {
      id: 'build',
      name: 'Construtor',
      seed: 'agent-builder-flow',
      role: 'Cria a Solução',
      desc: 'Escreve o código completo e organiza os arquivos locais.',
    },
    {
      id: 'review',
      name: 'Revisor',
      seed: 'agent-auditor-flow',
      role: 'Valida Tudo',
      desc: 'Testa o resultado e garante que nada no seu sistema foi quebrado.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    // Sequential step highlight loop
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4)
    }, 2400)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-swarm-step',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          },
        }
      )
    }, section)

    return () => {
      clearInterval(interval)
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      data-how-it-works
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00e88f]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <Network className="w-3.5 h-3.5 text-[#00e88f]" />
            <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
              Orquestração Swarm
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            Como uma equipe de IA{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              resolve seus pedidos.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Em vez de uma IA genérica tentando fazer tudo ao mesmo tempo, o Zavorth divide o trabalho entre subagentes especializados que operam em sincronia.
          </p>
        </div>

        {/* The Clean, Unified Swarm Pipeline (Crystal Clear & Intuitive) */}
        <div className="relative max-w-3xl mx-auto">
          
          {/* Step 1: User Request */}
          <div className="gsap-swarm-step p-6 rounded-3xl bg-neutral-950/80 border border-white/[0.08] backdrop-blur-xl mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#00e88f]/10 border border-[#00e88f]/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-[#00e88f]" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#00e88f] uppercase tracking-wider block mb-0.5">
                  1. Seu Pedido em Linguagem Natural
                </span>
                <p className="text-sm sm:text-base font-normal text-white">
                  "Crie um site moderno para meu projeto com animações e configure a publicação"
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-neutral-500 shrink-0 self-start sm:self-center uppercase">
              Entrada Única
            </span>
          </div>

          {/* Central Connecting Divider */}
          <div className="flex items-center justify-center my-3 text-neutral-600">
            <div className="h-6 w-px bg-gradient-to-b from-white/20 to-[#00e88f]/40" />
          </div>

          {/* Step 2: 4 Specialized Subagents (Synchronized Team) */}
          <div className="gsap-swarm-step rounded-3xl bg-neutral-950/80 border border-white/[0.08] backdrop-blur-xl p-6 sm:p-8 mb-6">
            <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-[#00e88f] animate-pulse" />
                <span>2. O ZAVORTH DIVIDE O TRABALHO ENTRE 4 ESPECIALISTAS</span>
              </div>
              <span className="text-[10px] font-mono text-[#00e88f]">EM PARALELO</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {agents.map((agent, idx) => {
                const isActive = activeStep === idx
                return (
                  <div
                    key={agent.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all duration-500 flex items-start gap-4 ${
                      isActive
                        ? 'bg-white/[0.06] border-[#00e88f]/50 shadow-[0_0_24px_rgba(0,232,143,0.12)]'
                        : 'bg-white/[0.02] border-white/[0.04]'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-black/60 border border-white/[0.08] flex items-center justify-center shrink-0 p-1.5 shadow-inner">
                      <Identicon seed={agent.seed} className="w-full h-full" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="text-sm font-medium text-white">{agent.name}</h4>
                        <span className="text-[10px] font-mono text-[#00e88f]">{agent.role}</span>
                      </div>
                      <p className="text-xs text-neutral-400 font-light leading-relaxed">
                        {agent.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Central Connecting Divider */}
          <div className="flex items-center justify-center my-3 text-neutral-600">
            <div className="h-6 w-px bg-gradient-to-b from-[#00e88f]/40 to-white/20" />
          </div>

          {/* Step 3: Verified Deliverable */}
          <div className="gsap-swarm-step p-6 rounded-3xl bg-neutral-950/80 border border-white/[0.08] backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-[#00e88f]/10 border border-[#00e88f]/20 flex items-center justify-center shrink-0 text-[#00e88f]">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-[#00e88f] uppercase tracking-wider block mb-0.5">
                  3. Entrega Sintetizada e Testada
                </span>
                <p className="text-sm font-normal text-white">
                  Projeto construído, arquivos organizados e tudo validado no seu computador.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#00e88f] bg-[#00e88f]/10 px-3 py-1 rounded-full shrink-0 self-start sm:self-center border border-[#00e88f]/20">
              PRONTO
            </span>
          </div>

        </div>

      </div>
    </section>
  )
}
