'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Cpu, GitBranch, ArrowUpRight } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function FeaturesGridSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const capabilities = [
    {
      kicker: '01 / AUTO-APRIMORAMENTO',
      title: 'Aprende e se auto-modifica',
      desc: 'Quando o Zavorth encontra uma tarefa nova, ele cria e registra novas habilidades para si mesmo, ficando mais inteligente a cada dia.',
    },
    {
      kicker: '02 / NÍVEL AGNÓSTICO ALTO',
      title: 'Livre de dependências',
      desc: 'Troque ou combine modelos de nuvem e modelos 100% offline locais sem mexer em código. Seus dados continuam seguros na sua máquina.',
    },
    {
      kicker: '03 / ESCALABILIDADE REAL',
      title: 'Para todo tipo de usuário',
      desc: 'Tão simples quanto organizar pastas e notas do dia a dia, tão poderoso quanto orquestrar e programar sistemas completos do zero.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-evolve-row',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.18,
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
      id="features"
      ref={sectionRef}
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#00e88f]" />
            <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
              Auto-Evolução &amp; Flexibilidade
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-white">
            Uma IA feita para{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              evoluir com você.
            </span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            Sem restrições de ferramentas ou fornecedores. O agente expande as próprias capacidades e se molda ao seu ritmo de trabalho.
          </p>
        </div>

        {/* 3 Lightweight Horizontal Evolution Rows */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {capabilities.map((item) => (
            <div
              key={item.title}
              className="gsap-evolve-row p-8 rounded-3xl border border-white/[0.06] bg-neutral-950/40 hover:border-[#00e88f]/30 transition-all duration-300 flex flex-col md:flex-row md:items-baseline justify-between gap-6"
            >
              <div className="md:w-1/3">
                <span className="font-mono text-[11px] text-[#00e88f] font-semibold block mb-2">
                  {item.kicker}
                </span>
                <h3 className="text-lg font-medium text-white">
                  {item.title}
                </h3>
              </div>

              <div className="md:w-2/3">
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
