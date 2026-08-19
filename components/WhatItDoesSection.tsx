'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Network, Compass, Search, Code2, ShieldCheck, Play, Sparkles } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isSwarmActive, setIsSwarmActive] = useState(false)
  const [activeSubagent, setActiveSubagent] = useState(0)

  const subagents = [
    {
      id: 'architect',
      name: 'Arquiteto',
      role: 'Planejamento & Estrutura',
      icon: Compass,
      desc: 'Analisa o impacto de cada alteração, mapeia dependências e cria um roteiro antes de executar.',
    },
    {
      id: 'researcher',
      name: 'Pesquisador',
      role: 'Contexto & Varredura',
      icon: Search,
      desc: 'Examina seu código, arquivos e documentações em paralelo sem sobrecarregar a memória principal.',
    },
    {
      id: 'builder',
      name: 'Construtor',
      role: 'Implementação Completa',
      icon: Code2,
      desc: 'Escreve código real, tipado e funcional, sem placeholders ou partes incompletas.',
    },
    {
      id: 'auditor',
      name: 'Auditor de Segurança',
      role: 'Validação & Testes',
      icon: ShieldCheck,
      desc: 'Roda testes automatizados e checagens de integridade antes de entregar qualquer resultado.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-swarm-node',
        { scale: 0.8, opacity: 0, y: 20 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const triggerSwarmPulse = () => {
    setIsSwarmActive(true)
    setTimeout(() => setIsSwarmActive(false), 2200)
  }

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      data-how-it-works
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00e88f]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <Network className="w-3.5 h-3.5 text-[#00e88f]" />
            <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
              Orquestração Swarm
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-white">
            Vários especialistas{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              trabalhando em paralelo.
            </span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            Em vez de uma única fila lenta, o Zavorth divide seu objetivo em subagentes autônomos. Enquanto um pesquisa, outro programa e outro audita o resultado simultaneamente.
          </p>
        </div>

        {/* Interactive Swarm Mesh Stage */}
        <div className="rounded-3xl border border-white/[0.06] bg-neutral-950/60 p-6 sm:p-12 backdrop-blur-2xl mb-12">
          
          {/* Top Swarm Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-8">
            <div className="flex items-center gap-2.5">
              <span className={`w-2 h-2 rounded-full bg-[#00e88f] ${isSwarmActive ? 'animate-ping' : ''}`} />
              <span className="text-xs font-mono text-neutral-300 uppercase tracking-wider">
                {isSwarmActive ? 'Subagentes em Execução Concorrente' : 'Enxame Pronto para Disparo'}
              </span>
            </div>

            <button
              type="button"
              onClick={triggerSwarmPulse}
              disabled={isSwarmActive}
              className="px-4 py-2 rounded-full text-xs font-mono font-medium bg-[#00e88f]/10 hover:bg-[#00e88f]/20 text-[#00e88f] border border-[#00e88f]/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>{isSwarmActive ? 'Sincronizando tarefas...' : 'Simular Disparo Swarm'}</span>
            </button>
          </div>

          {/* 4 Specialized Subagent Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {subagents.map((agent, idx) => {
              const Icon = agent.icon
              const isSelected = activeSubagent === idx
              return (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => setActiveSubagent(idx)}
                  className={`gsap-swarm-node p-5 rounded-2xl text-left transition-all duration-300 border relative ${
                    isSelected
                      ? 'bg-white/[0.06] border-[#00e88f]/40 shadow-[0_0_24px_rgba(0,232,143,0.12)]'
                      : 'bg-white/[0.02] border-white/[0.04] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-[#00e88f]/10 border border-[#00e88f]/20 flex items-center justify-center text-[#00e88f] mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-medium text-white mb-0.5">{agent.name}</h3>
                  <p className="text-[11px] text-neutral-400 font-light">{agent.role}</p>
                </button>
              )
            })}
          </div>

          {/* Active Subagent Spotlight (Clean single statement) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSubagent}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-black/50 border border-white/[0.04] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <span className="text-[10px] font-mono text-[#00e88f] uppercase tracking-wider block mb-1">
                  Missão do {subagents[activeSubagent].name}
                </span>
                <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                  {subagents[activeSubagent].desc}
                </p>
              </div>
              <span className="text-[10px] font-mono text-neutral-500 shrink-0 self-start sm:self-auto">
                EXECUÇÃO PARALELA
              </span>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  )
}
