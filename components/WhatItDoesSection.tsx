'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Network, Compass, Search, Code2, ShieldCheck, CheckCircle2, Zap } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTrack, setActiveTrack] = useState<number | null>(null)

  const swarmTracks = [
    {
      id: 'architect',
      tag: '01 / ARQUITETO',
      role: 'Planejamento e Grafo',
      desc: 'Mapeia módulos, contratos de tipos e dependências para garantir que nada seja quebrado.',
      icon: Compass,
      metric: '0 Dependências Cíclicas',
    },
    {
      id: 'researcher',
      tag: '02 / PESQUISADOR',
      role: 'Varredura de Contexto',
      desc: 'Indexa documentações, arquivos e referências sem poluir a memória principal.',
      icon: Search,
      metric: 'Busca Semântica < 10ms',
    },
    {
      id: 'builder',
      tag: '03 / CONSTRUTOR',
      role: 'Implementação de Código',
      desc: 'Escreve o código completo, edita arquivos e cria os recursos necessários sem atalhos.',
      icon: Code2,
      metric: 'Tipagem 100% Estrita',
    },
    {
      id: 'auditor',
      tag: '04 / AUDITOR',
      role: 'Validação e Testes',
      desc: 'Roda testes automatizados, linters e auditorias antes de autorizar a entrega final.',
      icon: ShieldCheck,
      metric: 'Zero Regressões',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-swarm-stream',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
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

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      data-how-it-works
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00e88f]/[0.025] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <Network className="w-3.5 h-3.5 text-[#00e88f]" />
            <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
              Orquestração Swarm
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            Vários especialistas{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              operando em paralelo.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Em vez de uma única IA fazendo tudo em fila lenta, o Zavorth divide o trabalho entre 4 subagentes especializados que operam simultaneamente.
          </p>
        </div>

        {/* The Sleek Multi-Threaded Swarm Stream Console */}
        <div className="rounded-3xl border border-white/[0.08] bg-neutral-950/80 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] max-w-4xl mx-auto overflow-hidden">
          
          {/* Console Header Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-white/[0.06] mb-6 text-xs font-mono">
            <div className="flex items-center gap-2 text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#00e88f] animate-pulse" />
              <span>SWARM CHOREOGRAPHY &middot; 4 THREADS CONCORRENTES</span>
            </div>
            <span className="text-[10px] text-[#00e88f] px-2.5 py-1 rounded-full bg-[#00e88f]/10 border border-[#00e88f]/20">
              EXECUÇÃO PARALELA
            </span>
          </div>

          {/* 4 Multi-Threaded Tracks */}
          <div className="space-y-3.5">
            {swarmTracks.map((track, idx) => {
              const Icon = track.icon
              const isHovered = activeTrack === idx

              return (
                <div
                  key={track.id}
                  onMouseEnter={() => setActiveTrack(idx)}
                  onMouseLeave={() => setActiveTrack(null)}
                  className={`gsap-swarm-stream p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-default ${
                    isHovered
                      ? 'bg-white/[0.05] border-[#00e88f]/50 shadow-[0_0_30px_rgba(0,232,143,0.1)]'
                      : 'bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 sm:w-1/3 shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-[#00e88f]/10 border border-[#00e88f]/20 flex items-center justify-center text-[#00e88f] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#00e88f] block">
                        {track.tag}
                      </span>
                      <span className="text-xs font-medium text-white block">
                        {track.role}
                      </span>
                    </div>
                  </div>

                  <div className="sm:w-1/2">
                    <p className="text-xs text-neutral-300 font-light leading-relaxed">
                      {track.desc}
                    </p>
                  </div>

                  <div className="sm:w-1/4 flex sm:justify-end">
                    <span className="text-[10px] font-mono text-neutral-400 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                      {track.metric}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Convergence Output Footer */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 font-light">
            <div className="flex items-center gap-2 text-white">
              <CheckCircle2 className="w-4 h-4 text-[#00e88f]" />
              <span>Resultados sintetizados e testados com zero regressões</span>
            </div>
            <span className="font-mono text-[11px] text-neutral-500">
              SINCRONIZAÇÃO AUTOMÁTICA
            </span>
          </div>

        </div>

      </div>
    </section>
  )
}
