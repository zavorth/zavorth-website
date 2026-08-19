'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe2 } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const providerIcons = [
    { src: '/logos/anthropic.svg', alt: 'Anthropic' },
    { src: '/logos/openai.svg', alt: 'OpenAI' },
    { src: '/logos/googlegemini.svg', alt: 'Google Gemini' },
    { src: '/logos/shell.svg', alt: 'Local Offline' },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-model-item',
        { scale: 0.8, opacity: 0, y: 30 },
        {
          scale: 1,
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
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
      id="how-it-works"
      ref={sectionRef}
      data-how-it-works
      className="landing-surface relative overflow-hidden py-36 sm:py-52 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        
        {/* Minimalist Kicker */}
        <div className="mb-8">
          <span className="section-kicker text-xs font-mono tracking-widest text-emerald-400 uppercase">
            Agnóstico
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.05] max-w-4xl mx-auto mb-12">
          <span className="block text-neutral-400">Conectado a todas as IAs.</span>
          <span className="block text-white font-medium">Preso a nenhuma.</span>
        </h2>

        <p className="text-base sm:text-xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed mb-20">
          Acesse os melhores cérebros do mundo em uma única interface ou execute 100% offline no seu próprio computador.
        </p>

        {/* Floating Minimalist Provider Glyphs (Zero heavy card boxes) */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 my-12">
          {providerIcons.map((item) => (
            <div
              key={item.alt}
              className="gsap-model-item w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/40 hover:bg-white/[0.05] transition-all duration-500 flex items-center justify-center backdrop-blur-xl group cursor-pointer"
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={36}
                height={36}
                className="opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter invert brightness-200"
              />
            </div>
          ))}
        </div>

        {/* Subtle Minimal Statement */}
        <div className="mt-16 text-xs text-neutral-500 font-mono tracking-wider uppercase">
          Zero Vendor Lock-in &middot; Suporte a Nuvem e Modelos Locais &middot; Privacidade Absoluta
        </div>

      </div>
    </section>
  )
}
