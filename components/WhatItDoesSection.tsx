'use client'

import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Network, Sparkles, CheckCircle2 } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Deterministic 5x5 Symmetric Identicon Generator
 * Converts any name/seed into a unique pixel matrix glyph.
 */
function Identicon({ seed, className = 'w-10 h-10' }: { seed: string; className?: string }) {
  // Simple hash from string
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }

  // 5x5 grid with horizontal symmetry (columns: 0, 1, 2, 1, 0)
  const grid: boolean[][] = []
  for (let y = 0; y < 5; y++) {
    grid[y] = []
    for (let x = 0; x < 3; x++) {
      const bitIndex = (y * 3 + x) % 31
      const isFilled = ((hash >> bitIndex) & 1) === 1
      grid[y][x] = isFilled
      grid[y][4 - x] = isFilled // mirror symmetry
    }
  }

  return (
    <svg viewBox="0 0 5 5" className={className} shapeRendering="crispEdges">
      {grid.map((row, y) =>
        row.map((filled, x) =>
          filled ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill="#00e88f"
              className="transition-opacity duration-300"
            />
          ) : (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill="rgba(255,255,255,0.04)"
            />
          )
        )
      )}
    </svg>
  )
}

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [activeStep, setActiveStep] = useState<string>('Disparo Concorrente')

  const subagents = [
    {
      id: 'architect',
      name: 'agent.architect',
      label: 'Arquiteto',
      role: 'Mapeia Grafo & Dependências',
      seed: 'zavorth-architect-planner',
      x: 15,
      y: 50,
    },
    {
      id: 'researcher',
      name: 'agent.researcher',
      label: 'Pesquisador',
      role: 'Varredura de Código & AST',
      seed: 'zavorth-researcher-engine',
      x: 38,
      y: 50,
    },
    {
      id: 'builder',
      name: 'agent.builder',
      label: 'Construtor',
      role: 'Implementação TypeScript',
      seed: 'zavorth-core-builder',
      x: 62,
      y: 50,
    },
    {
      id: 'auditor',
      name: 'agent.auditor',
      label: 'Auditor',
      role: 'Testes & Anti-Regressão',
      seed: 'zavorth-qa-guardian',
      x: 85,
      y: 50,
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.2,
      defaults: { ease: 'power2.inOut' },
    })

    // Phase 1: Prompt Dispatch
    tl.to('.swarm-prompt-node', {
      scale: 1.08,
      boxShadow: '0 0 35px rgba(0, 232, 143, 0.4)',
      duration: 0.5,
      onStart: () => setActiveStep('1. Objetivo recebido pelo Coordenador'),
    })

    // Phase 2: Beams Shoot from Root to 4 Subagents
    tl.fromTo(
      '.root-beam',
      { strokeDashoffset: 400, opacity: 0.2 },
      { strokeDashoffset: 0, opacity: 1, duration: 0.8, stagger: 0.1 }
    )

    // Phase 3: Subagent Identicons Illuminate
    tl.to(
      '.swarm-agent-box',
      {
        scale: 1.05,
        borderColor: 'rgba(0, 232, 143, 0.5)',
        duration: 0.4,
        stagger: 0.08,
        onStart: () => setActiveStep('2. Enxame de subagentes instanciado em paralelo'),
      },
      '-=0.3'
    )

    // Phase 4: Cross-Mesh Interconnecting Links Flash (Agent Collaboration)
    tl.fromTo(
      '.cross-beam',
      { opacity: 0.05, strokeDashoffset: 300 },
      {
        opacity: 0.85,
        strokeDashoffset: 0,
        duration: 0.9,
        stagger: 0.15,
        onStart: () => setActiveStep('3. Troca de contexto e colaboração na malha'),
      }
    )

    // Phase 5: Convergence to Verified Delivery
    tl.fromTo(
      '.output-beam',
      { strokeDashoffset: 400, opacity: 0.2 },
      {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        onStart: () => setActiveStep('4. Síntese concluída e verificada com zero regressões'),
      }
    )

    tl.to('.swarm-output-node', {
      scale: 1.06,
      borderColor: 'rgba(0, 232, 143, 0.8)',
      boxShadow: '0 0 40px rgba(0, 232, 143, 0.35)',
      duration: 0.5,
    })

    // Fade out and reset for loop
    tl.to(
      ['.root-beam', '.cross-beam', '.output-beam'],
      { opacity: 0.1, duration: 0.6 },
      '+=1.5'
    )
    tl.to(['.swarm-prompt-node', '.swarm-agent-box', '.swarm-output-node'], {
      scale: 1,
      borderColor: 'rgba(255, 255, 255, 0.08)',
      boxShadow: 'none',
      duration: 0.4,
    })

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      data-how-it-works
      className="landing-surface relative overflow-hidden py-32 sm:py-44 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00e88f]/[0.025] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <Network className="w-3.5 h-3.5 text-[#00e88f]" />
            <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
              Malha Swarm em Tempo Real
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            Como funciona a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              orquestração Swarm.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Cada subagente recebe uma identidade única e opera de forma autônoma e interconectada, trocando dados em tempo real para resolver objetivos complexos.
          </p>
        </div>

        {/* Cinematic GSAP Sequential Mesh Visualization */}
        <div className="relative rounded-3xl border border-white/[0.06] bg-neutral-950/70 p-6 sm:p-12 backdrop-blur-2xl overflow-hidden">
          
          {/* Top Live Progress Status Badge */}
          <div className="flex items-center justify-between pb-8 border-b border-white/[0.06] mb-12">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#00e88f] animate-ping" />
              <span className="text-[#00e88f] font-semibold">{activeStep}</span>
            </div>
            <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
              LOOP CONCORRENTE ATIVO
            </span>
          </div>

          {/* Root Coordinator Prompt Node */}
          <div className="flex justify-center mb-16">
            <div className="swarm-prompt-node px-6 py-3.5 rounded-2xl bg-black border border-white/[0.1] transition-all duration-300 flex items-center gap-3.5">
              <Identicon seed="zavorth-root-orchestrator" className="w-6 h-6 shrink-0" />
              <div>
                <span className="text-[10px] font-mono text-[#00e88f] uppercase tracking-wider block">
                  COORDINATOR &middot; INPUT
                </span>
                <span className="text-xs sm:text-sm font-medium text-white">
                  "Construir novo módulo com testes e arquitetura estrita"
                </span>
              </div>
            </div>
          </div>

          {/* SVG Animated Beams Circuit Mesh */}
          <div className="relative my-6">
            <svg
              ref={svgRef}
              viewBox="0 0 1000 240"
              className="w-full h-auto overflow-visible pointer-events-none"
              style={{ minHeight: '140px' }}
            >
              {/* Root -> 4 Subagent Dispatch Beams */}
              <path
                d="M 500 0 C 500 50, 150 50, 150 110"
                fill="none"
                stroke="#00e88f"
                strokeWidth="1.5"
                strokeDasharray="400"
                className="root-beam opacity-20"
              />
              <path
                d="M 500 0 C 500 50, 380 50, 380 110"
                fill="none"
                stroke="#00e88f"
                strokeWidth="1.5"
                strokeDasharray="400"
                className="root-beam opacity-20"
              />
              <path
                d="M 500 0 C 500 50, 620 50, 620 110"
                fill="none"
                stroke="#00e88f"
                strokeWidth="1.5"
                strokeDasharray="400"
                className="root-beam opacity-20"
              />
              <path
                d="M 500 0 C 500 50, 850 50, 850 110"
                fill="none"
                stroke="#00e88f"
                strokeWidth="1.5"
                strokeDasharray="400"
                className="root-beam opacity-20"
              />

              {/* Cross-Mesh Horizontal Interconnect Beams (Subagent to Subagent Collaboration) */}
              <path
                d="M 150 120 C 265 140, 265 140, 380 120"
                fill="none"
                stroke="#00e88f"
                strokeWidth="1.2"
                strokeDasharray="300"
                className="cross-beam opacity-10"
              />
              <path
                d="M 380 120 C 500 140, 500 140, 620 120"
                fill="none"
                stroke="#00e88f"
                strokeWidth="1.2"
                strokeDasharray="300"
                className="cross-beam opacity-10"
              />
              <path
                d="M 620 120 C 735 140, 735 140, 850 120"
                fill="none"
                stroke="#00e88f"
                strokeWidth="1.2"
                strokeDasharray="300"
                className="cross-beam opacity-10"
              />

              {/* 4 Subagents -> Convergence Output Beams */}
              <path
                d="M 150 130 C 150 190, 500 190, 500 240"
                fill="none"
                stroke="#00e88f"
                strokeWidth="1.5"
                strokeDasharray="400"
                className="output-beam opacity-20"
              />
              <path
                d="M 380 130 C 380 190, 500 190, 500 240"
                fill="none"
                stroke="#00e88f"
                strokeWidth="1.5"
                strokeDasharray="400"
                className="output-beam opacity-20"
              />
              <path
                d="M 620 130 C 620 190, 500 190, 500 240"
                fill="none"
                stroke="#00e88f"
                strokeWidth="1.5"
                strokeDasharray="400"
                className="output-beam opacity-20"
              />
              <path
                d="M 850 130 C 850 190, 500 190, 500 240"
                fill="none"
                stroke="#00e88f"
                strokeWidth="1.5"
                strokeDasharray="400"
                className="output-beam opacity-20"
              />
            </svg>
          </div>

          {/* 4 Subagent Identicon Nodes Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 relative z-10">
            {subagents.map((agent) => (
              <div
                key={agent.id}
                className="swarm-agent-box p-4 sm:p-5 rounded-2xl bg-black border border-white/[0.08] transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center p-2 mb-3 shadow-[0_0_20px_rgba(0,232,143,0.1)]">
                  <Identicon seed={agent.seed} className="w-full h-full" />
                </div>
                <span className="text-[10px] font-mono text-[#00e88f] uppercase tracking-wider block mb-0.5">
                  {agent.name}
                </span>
                <h4 className="text-xs font-semibold text-white mb-1">{agent.label}</h4>
                <p className="text-[11px] text-neutral-400 font-light leading-snug">
                  {agent.role}
                </p>
              </div>
            ))}
          </div>

          {/* Output Convergence Node */}
          <div className="flex justify-center">
            <div className="swarm-output-node px-6 py-3.5 rounded-2xl bg-black border border-white/[0.1] transition-all duration-300 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#00e88f]" />
              <div>
                <span className="text-[10px] font-mono text-[#00e88f] uppercase tracking-wider block">
                  ENTREGA SINTETIZADA &middot; VERIFICAÇÃO 100%
                </span>
                <span className="text-xs font-medium text-white">
                  Código completo, dependências resolvidas e 0 regressões
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
