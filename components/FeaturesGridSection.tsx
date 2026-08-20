'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function FeaturesGridSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const capabilities = [
    {
      kicker: 'AUTO-APRIMORAMENTO',
      title: 'Aprende e se auto-modifica',
      desc: 'Quando o Zavorth encontra um desafio novo, ele é capaz de criar e registrar novas habilidades para si mesmo, evoluindo dia após dia com seu uso.',
    },
    {
      kicker: 'NÍVEL AGNÓSTICO ALTO',
      title: 'Liberdade total de modelos',
      desc: 'Use qualquer modelo avançado na nuvem ou execute modelos 100% offline no seu próprio computador. Seus dados continuam no seu ambiente.',
    },
    {
      kicker: 'ESCALABILIDADE UNIVERSAL',
      title: 'Para todo tipo de usuário',
      desc: 'Tão prático e direto para tarefas simples do dia a dia quanto potente para arquitetar e programar sistemas inteiros de software.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-cap-row',
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
      id="features"
      ref={sectionRef}
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        
        {/* Minimal Kicker */}
        <div className="mb-8 text-center">
          <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
            Auto-Evolução &middot; Liberdade Total
          </span>
        </div>

        {/* Big Editorial Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.15] text-white text-center mb-12">
          <span className="block text-neutral-400">Uma inteligência que</span>
          <span className="block text-white font-medium">se molda ao seu ritmo.</span>
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed text-center max-w-2xl mx-auto mb-24">
          Sem dependências de um único fornecedor e sem barreiras de complexidade. O agente expande as próprias capacidades conforme suas necessidades aumentam.
        </p>

        {/* Linear 3-Capability Flow (Zero Cards, Clean Horizontal Connectors) */}
        <div className="space-y-12 border-t border-white/[0.06] pt-16">
          {capabilities.map((item, idx) => (
            <div
              key={item.title}
              className="gsap-cap-row flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 pb-8 border-b border-white/[0.04] group"
            >
              <div className="sm:w-1/3">
                <span className="font-mono text-xs text-[#00e88f] font-semibold block mb-1">
                  0{idx + 1} / {item.kicker}
                </span>
                <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-[#00e88f] transition-colors">
                  {item.title}
                </h3>
              </div>

              <div className="sm:w-2/3">
                <p className="text-sm text-neutral-400 font-light leading-relaxed">
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
