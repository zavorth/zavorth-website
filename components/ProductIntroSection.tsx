'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProductIntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const textEl = textRef.current
    if (!section || !textEl) return

    const words = textEl.querySelectorAll('.scroll-word')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.15, y: 10 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          ease: 'power2.out',
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

  const editorialWords = [
    'O', 'Zavorth', 'é', 'um', 'assistente', 'inteligente', 'que', 'opera', 'diretamente', 'no', 'seu', 'computador.',
    'Você', 'diz', 'o', 'que', 'precisa', 'em', 'português', 'simples,', 'e', 'ele', 'planeja,', 'constrói', 'e', 'organiza',
    'suas', 'tarefas', 'locais', '—', 'mantendo', 'seus', 'dados', 'privados', 'e', 'você', 'sempre', 'no', 'controle.'
  ]

  return (
    <section
      id="overview"
      ref={sectionRef}
      data-product-intro
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Subtle single emerald ambient aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#00e88f]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        
        {/* Minimal Kicker */}
        <div className="mb-10">
          <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
            Visão Geral
          </span>
        </div>

        {/* Minimalist Scroll-Illuminated Editorial Paragraph */}
        <p
          ref={textRef}
          className="text-2xl sm:text-4xl lg:text-5xl font-normal leading-[1.3] sm:leading-[1.25] tracking-tight text-white max-w-3xl mx-auto"
        >
          {editorialWords.map((word, i) => (
            <span
              key={i}
              className={`scroll-word inline-block mr-[0.28em] transition-colors duration-200 ${
                word.includes('Zavorth') || word.includes('computador') || word.includes('controle')
                  ? 'text-[#00e88f]'
                  : 'text-white'
              }`}
            >
              {word}
            </span>
          ))}
        </p>

        {/* 3 Clean Minimalist Steps (Zero Card Borders) */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-10 text-left border-t border-white/[0.06] pt-12">
          <div>
            <span className="font-mono text-xs text-[#00e88f] font-semibold block mb-2">01 / INTENÇÃO</span>
            <h3 className="text-sm font-medium text-white mb-1">Você define o objetivo</h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Diga o que deseja em linguagem natural. Sem necessidade de prompts complexos.
            </p>
          </div>

          <div>
            <span className="font-mono text-xs text-[#00e88f] font-semibold block mb-2">02 / EXECUÇÃO</span>
            <h3 className="text-sm font-medium text-white mb-1">O agente constrói</h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Escreve código completo, organiza arquivos e realiza tarefas no seu computador.
            </p>
          </div>

          <div>
            <span className="font-mono text-xs text-[#00e88f] font-semibold block mb-2">03 / GOVERNANÇA</span>
            <h3 className="text-sm font-medium text-white mb-1">Você no controle</h3>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Ações sensíveis aguardam sua aprovação explícita antes de qualquer alteração.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
