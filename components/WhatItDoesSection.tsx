'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Network, 
  Compass, 
  Search, 
  Code2, 
  ShieldCheck, 
  CheckCircle2,
  Cpu,
  Terminal
} from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeHover, setActiveHover] = useState<number | null>(null)

  const swarmTracks = [
    {
      id: 'architect',
      tag: 'ARQUITETO',
      icon: Compass,
      status: 'Resolvido',
      action: 'Decompondo grafo de módulos e contratos de interface',
      metric: 'Zero dependências cíclicas',
      progress: '100%',
    },
    {
      id: 'researcher',
      tag: 'PESQUISADOR',
      icon: Search,
      status: 'Concluído',
      action: 'Indexando símbolos TypeScript e documentação local',
      metric: 'Varredura em 8ms',
      progress: '100%',
    },
    {
      id: 'builder',
      tag: 'CONSTRUTOR',
      icon: Code2,
      status: 'Gerado',
      action: 'Escrevendo implementação estrita sem placeholders',
      metric: 'Tipagem 100% estrita',
      progress: '100%',
    },
    {
      id: 'auditor',
      tag: 'AUDITOR',
      icon: ShieldCheck,
      status: 'Validado',
      action: 'Executando testes unitários e verificação de regressão',
      metric: '0 falhas detectadas',
      progress: '100%',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-track-row',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          duration: 0.7,
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
      className="landing-surface relative overflow-hidden py-28 sm:py-40 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Subtle ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00e88f]/[0.025] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <Network className="w-3.5 h-3.5 text-[#00e88f]" />
            <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
              Orquestração Concorrente
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            Execução paralela,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-[#00e88f]">
              sem gargalos.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Tarefas complexas são divididas automaticamente em threads autônomas que rodam de forma simultânea no seu computador.
          </p>
        </div>

        {/* Unified Multi-Track Swarm Console (Linear/DAW style) */}
        <div className="rounded-3xl border border-white/[0.08] bg-neutral-950/80 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Top Console Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-white/[0.06] mb-6">
            <div className="flex items-center gap-2.5 text-xs font-mono text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-[#00e88f] animate-pulse" />
              <span>SWARM ENGINE &middot; 4 THREADS CONCORRENTES</span>
            </div>
            <span className="text-[11px] font-mono text-neutral-500">
              SINCRONIZAÇÃO EM TEMPO REAL
            </span>
          </div>

          {/* 4 Multi-Threaded Tracks */}
          <div className="space-y-3">
            {swarmTracks.map((track, idx) => {
              const Icon = track.icon
              const isHovered = activeHover === idx
              return (
                <div
                  key={track.id}
                  onMouseEnter={() => setActiveHover(idx)}
                  onMouseLeave={() => setActiveHover(null)}
                  className={`gsap-track-row p-4 sm:p-5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isHovered
                      ? 'bg-white/[0.06] border-[#00e88f]/40'
                      : 'bg-white/[0.02] border-white/[0.04] hover:border-white/[0.08]'
                  }`}
                >
                  {/* Left: Identity */}
                  <div className="flex items-center gap-3.5 sm:w-1/3 shrink-0">
                    <div className="w-8 h-8 rounded-xl bg-[#00e88f]/10 border border-[#00e88f]/20 flex items-center justify-center text-[#00e88f] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-[#00e88f] uppercase tracking-wider block">
                        {track.tag}
                      </span>
                      <span className="text-xs font-medium text-white">
                        {track.status}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Live Action Stream */}
                  <div className="sm:w-1/2">
                    <p className="text-xs text-neutral-300 font-light truncate">
                      {track.action}
                    </p>
                  </div>

                  {/* Right: Metric Badge */}
                  <div className="sm:w-1/4 flex sm:justify-end">
                    <span className="text-[10px] font-mono text-neutral-400 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                      {track.metric}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom Consolidated State */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-400 font-light">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#00e88f]" />
              <span>Resultados sintetizados e entregues em uma única etapa segura</span>
            </div>
            <span className="font-mono text-[11px] text-neutral-500">
              LATÊNCIA MÍNIMA &middot; EXECUÇÃO NATIVA
            </span>
          </div>

        </div>

      </div>
    </section>
  )
}
