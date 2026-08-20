'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Network, Compass, Search, Code2, ShieldCheck, CheckCircle2, ArrowRight, Activity } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeRole, setActiveRole] = useState(0)

  const agents = [
    {
      id: 'architect',
      number: '01',
      name: 'Arquiteto',
      role: 'agent.architect',
      title: 'Planejamento e Grafo de Dependências',
      desc: 'Mapeia a árvore de arquivos, identifica contratos de tipagem e traça um plano modular estrito antes de qualquer alteração.',
      metric: '0 Quebras de Contrato',
      icon: Compass,
      tags: ['AST Graph', 'Dependency Analysis', 'Safe Execution'],
    },
    {
      id: 'researcher',
      number: '02',
      name: 'Pesquisador',
      role: 'agent.researcher',
      title: 'Varredura Semântica de Contexto',
      desc: 'Varre repositórios, documentações e históricos locais em milissegundos sem sobrecarregar a janela de contexto principal.',
      metric: 'Varredura < 8ms',
      icon: Search,
      tags: ['Semantic Search', 'Vector Indexing', 'Fast Retrieval'],
    },
    {
      id: 'builder',
      number: '03',
      name: 'Construtor',
      role: 'agent.builder',
      title: 'Implementação de Código Real',
      desc: 'Escreve o código completo, funcional e tipado de ponta a ponta. Sem atalhos, comentários preguiçosos ou placeholders.',
      metric: 'Tipagem 100% Estrita',
      icon: Code2,
      tags: ['TypeScript / Rust / Python', 'Zero Any', 'Full Implementation'],
    },
    {
      id: 'auditor',
      number: '04',
      name: 'Auditor',
      role: 'agent.auditor',
      title: 'Testes e Anti-Regressão',
      desc: 'Executa a suíte de testes automatizados, linters e verificações de integridade antes de autorizar a entrega final.',
      metric: 'Zero Regressões',
      icon: ShieldCheck,
      tags: ['Automated Tests', 'Linters & QA', 'Pre-Commit Gate'],
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-swarm-headline',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      )

      gsap.fromTo(
        '.gsap-swarm-card',
        { opacity: 0, y: 25 },
        {
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

  const selectedAgent = agents[activeRole]

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      data-how-it-works
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00e88f]/[0.025] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <Network className="w-3.5 h-3.5 text-[#00e88f]" />
            <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
              Orquestração Swarm
            </span>
          </div>

          <h2 className="gsap-swarm-headline text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-white">
            4 especialistas operando em{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              perfeita sincronia.
            </span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Em vez de uma única IA sobrecarregada, o Zavorth decompõe seu pedido em um enxame concorrente de subagentes com papéis focados e não-bloqueantes.
          </p>
        </div>

        {/* 4 Multi-Thread Interactive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {agents.map((agent, idx) => {
            const Icon = agent.icon
            const isSelected = activeRole === idx

            return (
              <button
                key={agent.id}
                type="button"
                onClick={() => setActiveRole(idx)}
                className={`gsap-swarm-card p-6 rounded-3xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px] ${
                  isSelected
                    ? 'bg-[#09090b] border-[#00e88f]/50 shadow-[0_0_30px_rgba(0,232,143,0.12)] -translate-y-1'
                    : 'bg-neutral-950/60 border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.02]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-9 h-9 rounded-2xl flex items-center justify-center border ${
                      isSelected
                        ? 'bg-[#00e88f]/10 border-[#00e88f]/30 text-[#00e88f]'
                        : 'bg-white/[0.03] border-white/[0.06] text-neutral-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono text-neutral-500">
                      {agent.number}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-[#00e88f] block mb-0.5">
                    {agent.role}
                  </span>
                  <h3 className="text-base font-medium text-white mb-2">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-2">
                    {agent.title}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-neutral-400">
                  <span>{agent.metric}</span>
                  <span className={isSelected ? 'text-[#00e88f]' : 'text-neutral-600'}>
                    {isSelected ? 'ATIVO' : 'PARALELO'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Live Subagent Telemetry Focus Bar */}
        <div className="rounded-3xl border border-white/[0.08] bg-[#09090b]/90 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedAgent.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2 md:w-2/3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00e88f] animate-pulse" />
                  <h4 className="text-sm font-semibold text-white font-mono">
                    {selectedAgent.role} &mdash; {selectedAgent.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  {selectedAgent.desc}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {selectedAgent.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono text-neutral-300 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="md:w-1/3 flex md:justify-end">
                <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.06] text-left space-y-1 w-full md:w-auto">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">
                    Garantia de Execução
                  </span>
                  <div className="flex items-center gap-2 text-xs font-mono text-[#00e88f]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{selectedAgent.metric}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
