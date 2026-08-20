'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Network, CheckCircle2 } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const swarmPillars = [
    {
      kicker: 'PESQUISA',
      title: 'Varredura de Contexto',
      desc: 'Analisa seus arquivos, histórico e documentações locais em milissegundos para entender o cenário antes de começar.',
    },
    {
      kicker: 'ARQUITETURA',
      title: 'Planejamento e Grafo',
      desc: 'Mapeia dependências e monta uma estratégia clara de execução para garantir que nada no seu projeto seja corrompido.',
    },
    {
      kicker: 'CONSTRUÇÃO',
      title: 'Implementação Real',
      desc: 'Escreve o código completo, edita os arquivos e cria os recursos necessários de ponta a ponta sem atalhos.',
    },
    {
      kicker: 'AUDITORIA',
      title: 'Validação e Testes',
      desc: 'Executa testes automatizados e checagens de integridade antes de entregar o resultado pronto no seu computador.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-swarm-row',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
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

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      data-how-it-works
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        
        {/* Minimal Kicker */}
        <div className="mb-8 text-center">
          <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
            Sistema Swarm &middot; Como Opera
          </span>
        </div>

        {/* Big Editorial Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.15] text-white text-center mb-12">
          <span className="block text-neutral-400">Vários especialistas de IA</span>
          <span className="block text-white font-medium">trabalhando em paralelo.</span>
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed text-center max-w-2xl mx-auto mb-24">
          Quando você define um objetivo, o Zavorth não faz tudo em uma fila lenta. Ele divide a demanda entre subagentes especializados que colaboram ao mesmo tempo.
        </p>

        {/* Linear 4-Role Flow (Zero Cards, Clean Horizontal Connectors) */}
        <div className="space-y-12 border-t border-white/[0.06] pt-16">
          {swarmPillars.map((pillar, idx) => (
            <div
              key={pillar.title}
              className="gsap-swarm-row flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 pb-8 border-b border-white/[0.04] group"
            >
              <div className="sm:w-1/3">
                <span className="font-mono text-xs text-[#00e88f] font-semibold block mb-1">
                  0{idx + 1} / {pillar.kicker}
                </span>
                <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-[#00e88f] transition-colors">
                  {pillar.title}
                </h3>
              </div>

              <div className="sm:w-2/3">
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
