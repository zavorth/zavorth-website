'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Cpu, Layers, Terminal, Lock } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function FeaturesGridSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const capabilities = [
    {
      kicker: '01 / AUTO-APRIMORAMENTO',
      title: 'Aprende e se auto-modifica',
      desc: 'Quando o Zavorth encontra um desafio novo, ele é capaz de criar e registrar novas habilidades (.agy skills) para si mesmo, evoluindo a cada uso.',
      tag: 'AUTO-SKILL CREATION',
    },
    {
      kicker: '02 / NÍVEL AGNÓSTICO ALTO',
      title: 'Liberdade total de modelos',
      desc: 'Use qualquer modelo avançado na nuvem (OpenAI, Claude, Gemini) ou execute modelos locais 100% offline no seu hardware sem mudar de ferramenta.',
      tag: 'ZERO VENDOR LOCK-IN',
    },
    {
      kicker: '03 / ESCALABILIDADE UNIVERSAL',
      title: 'Para todo tipo de usuário',
      desc: 'Tão simples e direto para organizar notas e arquivos do dia a dia quanto potente para arquitetar e programar sistemas inteiros de software.',
      tag: 'LOCAL RUNTIME',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-cap-strip',
        { opacity: 0, y: 30 },
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
      id="features"
      ref={sectionRef}
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#00e88f]" />
            <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
              Auto-Evolução &middot; Liberdade Total
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight leading-tight text-white">
            Uma inteligência que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              se molda ao seu ritmo.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Sem restrições de ferramentas ou fornecedores. O agente expande as próprias capacidades conforme seus projetos crescem.
          </p>
        </div>

        {/* 3 Sleek High-Craft Capability Strips */}
        <div className="space-y-4 max-w-4xl mx-auto">
          {capabilities.map((item) => (
            <div
              key={item.title}
              className="gsap-cap-strip p-6 sm:p-8 rounded-3xl border border-white/[0.08] bg-neutral-950/80 backdrop-blur-2xl hover:border-[#00e88f]/40 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="md:w-1/3">
                <span className="font-mono text-[10px] text-[#00e88f] font-semibold block mb-1">
                  {item.kicker}
                </span>
                <h3 className="text-base sm:text-lg font-medium text-white">
                  {item.title}
                </h3>
              </div>

              <div className="md:w-1/2">
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="md:w-1/4 flex md:justify-end">
                <span className="text-[10px] font-mono text-neutral-400 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
