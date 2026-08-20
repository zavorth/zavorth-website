'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Network, Compass, Search, Code2, ShieldCheck, CheckCircle2, Zap } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const pillars = [
    {
      number: '01',
      kicker: 'ARQUITETO',
      title: 'Planejamento e Grafo',
      desc: 'Mapeia seus arquivos, analisa contratos de tipos e traça um plano de execução claro antes de começar.',
      icon: Compass,
    },
    {
      number: '02',
      kicker: 'PESQUISADOR',
      title: 'Varredura de Contexto',
      desc: 'Encontra referências, documentações e dados em milissegundos sem poluir a memória principal.',
      icon: Search,
    },
    {
      number: '03',
      kicker: 'CONSTRUTOR',
      title: 'Implementação Real',
      desc: 'Escreve o código completo, edita arquivos e cria os recursos necessários de ponta a ponta sem atalhos.',
      icon: Code2,
    },
    {
      number: '04',
      kicker: 'AUDITOR',
      title: 'Testes e Integridade',
      desc: 'Executa testes automáticos e linters para garantir que nenhuma regressão foi introduzida no sistema.',
      icon: ShieldCheck,
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-swarm-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      )

      gsap.fromTo(
        '.gsap-swarm-card-new',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
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
      className="landing-surface relative overflow-hidden py-36 sm:py-52 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#00e88f]/[0.02] rounded-full blur-[220px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Kicker */}
        <div className="text-center mb-8">
          <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
            Orquestração Swarm
          </span>
        </div>

        {/* Big Apple-Style Cinematic Headline */}
        <div className="gsap-swarm-title text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-white">
            4 especialistas operando em{' '}
            <span className="block font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              perfeita sincronia.
            </span>
          </h2>

          <p className="mt-8 text-base sm:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Em vez de uma única IA sobrecarregada que comete erros, o Zavorth divide o trabalho entre 4 subagentes especializados que operam simultaneamente em segundo plano.
          </p>
        </div>

        {/* 4 Clean, Beautiful Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.number}
                className="gsap-swarm-card-new p-8 rounded-3xl border border-white/[0.08] bg-[#09090b]/80 backdrop-blur-2xl hover:border-[#00e88f]/40 transition-all duration-300 flex flex-col justify-between min-h-[240px] shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-[#00e88f]/10 border border-[#00e88f]/20 flex items-center justify-center text-[#00e88f]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-neutral-500 font-medium">
                      {pillar.number}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-[#00e88f] uppercase tracking-wider block mb-1">
                    {pillar.kicker}
                  </span>
                  <h3 className="text-lg sm:text-xl font-medium text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/[0.04] flex items-center justify-between text-[10px] font-mono text-neutral-500">
                  <span>EXECUÇÃO PARALELA</span>
                  <span className="text-[#00e88f]">ATIVO</span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Synthesis Delivery Bar */}
        <div className="gsap-swarm-card-new p-6 rounded-2xl border border-white/[0.08] bg-black/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-3 text-white">
            <CheckCircle2 className="w-5 h-5 text-[#00e88f]" />
            <span className="text-sm font-normal">Resultado consolidado e validado antes da entrega final</span>
          </div>
          <span className="text-[10px] text-[#00e88f] px-3 py-1 rounded-full bg-[#00e88f]/10 border border-[#00e88f]/20 shrink-0 self-start sm:self-center">
            0 REGRESSÕES
          </span>
        </div>

      </div>
    </section>
  )
}
