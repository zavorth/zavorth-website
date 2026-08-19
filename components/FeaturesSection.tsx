'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-proof-frame',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
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
      id="features"
      ref={sectionRef}
      data-proof-section
      className="landing-surface relative overflow-hidden py-36 sm:py-52 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        
        {/* Minimalist Kicker */}
        <div className="mb-8">
          <span className="section-kicker text-xs font-mono tracking-widest text-emerald-400 uppercase">
            Experiência
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.05] max-w-4xl mx-auto mb-12">
          <span className="block text-neutral-400">Desenhado para o</span>
          <span className="block text-white font-medium">seu fluxo de trabalho.</span>
        </h2>

        <p className="text-base sm:text-xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed mb-20">
          Aplicativo Desktop com atalhos instantâneos e Console Web para controle visual dos seus projetos.
        </p>

        {/* Minimalist Side-by-Side Floating Product Displays */}
        <div 
          data-zavorth-proof
          className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
        >
          <div className="gsap-proof-frame group rounded-3xl border border-white/[0.08] bg-neutral-950/40 p-4 hover:border-white/20 transition-all duration-500">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
              <Image
                src="/product/zavorth-desktop-shell.png"
                alt="Zavorth Desktop Shell"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
            </div>
            <div className="px-2 pb-2">
              <h3 className="text-sm font-semibold text-white">Aplicativo Desktop</h3>
              <p className="text-xs text-neutral-400 font-light mt-0.5">Atalhos globais, overlay rápido e resposta instantânea.</p>
            </div>
          </div>

          <div className="gsap-proof-frame group rounded-3xl border border-white/[0.08] bg-neutral-950/40 p-4 hover:border-white/20 transition-all duration-500">
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-4">
              <Image
                src="/product/zavorth-control-overview.png"
                alt="Zavorth Control Overview"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
              />
            </div>
            <div className="px-2 pb-2">
              <h3 className="text-sm font-semibold text-white">Console Web</h3>
              <p className="text-xs text-neutral-400 font-light mt-0.5">Painel visual para acompanhar o histórico e auditoria.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
