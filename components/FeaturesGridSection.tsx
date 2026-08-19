'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Brain, Sparkles, HeartHandshake, Shield } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function FeaturesGridSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const memoryTraits = [
    {
      title: 'Seu Estilo',
      text: 'Aprende suas preferências para que você não precise repetir instruções.',
    },
    {
      title: 'Seus Projetos',
      text: 'Retome um trabalho semanas depois exatamente do ponto onde parou.',
    },
    {
      title: 'Sua Privacidade',
      text: 'Tudo armazenado no seu disco local. Zero dados vazando para fora.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-memory-card',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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
      className="landing-surface relative overflow-hidden py-36 sm:py-52 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        
        {/* Minimalist Kicker */}
        <div className="mb-8">
          <span className="section-kicker text-xs font-mono tracking-widest text-emerald-400 uppercase">
            Memória Real
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.05] max-w-4xl mx-auto mb-12">
          <span className="block text-neutral-400">Ele aprende com você.</span>
          <span className="block text-white font-medium">E nunca esquece.</span>
        </h2>

        <p className="text-base sm:text-xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed mb-20">
          Diferente de chats comuns que apagam tudo ao fechar a página, o Zavorth evolui a cada uso e guarda suas preferências no seu próprio computador.
        </p>

        {/* 3 Lightweight Floating Pillars (Zero heavy border spam) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-left">
          {memoryTraits.map((trait) => (
            <div
              key={trait.title}
              className="gsap-memory-card p-8 rounded-3xl bg-neutral-950/40 border border-white/[0.05] hover:border-white/[0.12] transition-colors"
            >
              <h3 className="text-lg font-medium text-white mb-2">{trait.title}</h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">{trait.text}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
