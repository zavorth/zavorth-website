'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function FeaturesGridSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const capabilities = [
    {
      number: '01',
      title: 'Auto-Aprimoramento',
      desc: 'Ao encontrar um desafio inédito, o agente escreve novas habilidades para si mesmo e as salva no seu computador.',
    },
    {
      number: '02',
      title: 'Qualquer Modelo de IA',
      desc: 'Conecte-se a modelos de ponta na nuvem ou rode modelos 100% offline em hardware local sem mudar de ferramenta.',
    },
    {
      number: '03',
      title: 'Privacidade Total',
      desc: 'Seus arquivos, códigos e históricos permanecem no seu computador com controle absoluto sobre cada ação.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.google-feat-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
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
      className="landing-surface relative py-28 sm:py-40 bg-black text-white scroll-mt-20 border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Google Style Minimalist Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase block mb-4">
            Liberdade &middot; Evolução
          </span>
          <h2 className="google-feat-item text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            Uma inteligência que se adapta ao seu ritmo.
          </h2>
          <p className="google-feat-item mt-5 text-base sm:text-lg text-neutral-400 font-normal leading-relaxed">
            Sem restrições de provedor e sem barreiras de complexidade. O agente expande as próprias capacidades conforme seus projetos crescem.
          </p>
        </div>

        {/* 3 Open Columns (Google Minimalist Style - Zero Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 pt-8 border-t border-white/[0.08]">
          {capabilities.map((item) => (
            <div key={item.number} className="google-feat-item space-y-3">
              <span className="font-mono text-xs text-[#00e88f] font-semibold block">
                {item.number}
              </span>
              <h3 className="text-lg font-medium text-white">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-400 font-normal leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
