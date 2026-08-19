'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Cpu, Layers, ArrowUpRight } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProductIntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const core = coreRef.current
    if (!section || !core) return

    const ctx = gsap.context(() => {
      // Rotating energy aura
      gsap.to('.core-glow-ring', {
        rotation: 360,
        repeat: -1,
        duration: 25,
        ease: 'none',
      })

      // Staggered reveal of capability rings on scroll
      gsap.fromTo(
        '.gsap-core-node',
        { scale: 0.6, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.9,
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

  const corePillars = [
    {
      title: 'Auto-Aprimoramento',
      desc: 'Cria suas próprias ferramentas e scripts sob demanda quando encontra desafios novos.',
    },
    {
      title: 'Execução no seu Sistema',
      desc: 'Opera arquivos, terminais e projetos locais com velocidade nativa e segurança.',
    },
    {
      title: 'Escalabilidade Real',
      desc: 'De tarefas rápidas do dia a dia até a construção de softwares complexos do zero.',
    },
  ]

  return (
    <section
      id="overview"
      ref={sectionRef}
      data-product-intro
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Dynamic ambient energy aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00e88f]/[0.035] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e88f] animate-ping" />
            <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
              O Que é o Zavorth
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-white">
            Um agente autônomo que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              vive no seu sistema.
            </span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            Mais do que um chat de perguntas e respostas. O Zavorth interage com seus arquivos, cria soluções no seu computador e evolui com você a cada objetivo concluído.
          </p>
        </div>

        {/* Central Kinetic Core Stage */}
        <div 
          ref={coreRef}
          className="relative rounded-3xl border border-white/[0.06] bg-neutral-950/60 p-8 sm:p-16 backdrop-blur-2xl overflow-hidden mb-16"
        >
          {/* Rotating ambient core ring */}
          <div className="core-glow-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] rounded-full border border-[#00e88f]/10 pointer-events-none" />

          {/* Central Pulse */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center py-6">
            <div className="w-16 h-16 rounded-2xl bg-[#00e88f]/10 border border-[#00e88f]/30 flex items-center justify-center text-[#00e88f] mb-4 shadow-[0_0_40px_rgba(0,232,143,0.2)]">
              <Cpu className="w-8 h-8" />
            </div>
            <span className="text-xs font-mono text-[#00e88f] tracking-widest uppercase mb-1">
              Motor Cognitivo Local
            </span>
            <p className="text-sm text-neutral-300 font-light max-w-md">
              Raciocínio contínuo conectado ao seu ecossistema sem intermediários.
            </p>
          </div>

          {/* 3 Radiating Pillars */}
          <div className="relative z-10 mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/[0.06]">
            {corePillars.map((p) => (
              <div key={p.title} className="gsap-core-node text-center sm:text-left">
                <h3 className="text-sm font-medium text-white mb-1.5 flex items-center justify-center sm:justify-start gap-1.5">
                  <span className="w-1 h-1 rounded-full bg-[#00e88f]" />
                  {p.title}
                </h3>
                <p className="text-xs text-neutral-400 font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
