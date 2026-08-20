'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, ArrowRight } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProductIntroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-linear-text',
        { opacity: 0.15, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'center 45%',
            scrub: 0.6,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const linearFlow = [
    {
      step: '01',
      title: 'Você define o objetivo',
      desc: 'Diga o que precisa em português simples. Sem prompts complexos ou configurações manuais.',
    },
    {
      step: '02',
      title: 'O agente executa no seu sistema',
      desc: 'Cria código real, manipula pastas, organiza arquivos e executa comandos diretamente na sua máquina.',
    },
    {
      step: '03',
      title: 'Controle e privacidade total',
      desc: 'Seus dados nunca saem do seu computador e ações críticas sempre exigem a sua confirmação.',
    },
  ]

  return (
    <section
      id="overview"
      ref={sectionRef}
      data-product-intro
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        
        {/* Minimal Kicker */}
        <div className="mb-8 text-center">
          <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
            O Que É o Zavorth
          </span>
        </div>

        {/* Big Editorial Statement */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.15] text-white text-center mb-12">
          <span className="block gsap-linear-text text-neutral-400">Um assistente autônomo que</span>
          <span className="block gsap-linear-text text-white font-medium">vive no seu computador.</span>
        </h2>

        <p className="text-base sm:text-lg text-neutral-300 font-light leading-relaxed text-center max-w-2xl mx-auto mb-24">
          Diferente de chats presos na nuvem, o Zavorth opera como um colega de trabalho no seu sistema operacional — planejando, criando e executando tarefas reais com autonomia e segurança.
        </p>

        {/* Linear 3-Step Flow (Zero Cards, Clean Horizontal Connectors) */}
        <div className="space-y-12 border-t border-white/[0.06] pt-16">
          {linearFlow.map((item) => (
            <div
              key={item.step}
              className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 pb-8 border-b border-white/[0.04] group"
            >
              <div className="sm:w-1/3 flex items-baseline gap-3">
                <span className="font-mono text-xs text-[#00e88f] font-semibold">
                  {item.step}
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
