'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const capabilities = [
    {
      kicker: '01 / FLEXIBILIDADE',
      title: 'Agnóstico por Design',
      desc: 'Use qualquer modelo de ponta da nuvem ou execute modelos locais com zero dependência de um único fornecedor.',
    },
    {
      kicker: '02 / PRIVACIDADE',
      title: '100% Local & Seguro',
      desc: 'Seus códigos, pastas e documentos permanecem na sua máquina. Nada é enviado para a nuvem sem autorização.',
    },
    {
      kicker: '03 / CONTINUIDADE',
      title: 'Memória que Evolui',
      desc: 'O assistente aprende suas preferências, retoma projetos antigos e se torna mais rápido e preciso a cada dia.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-cap-item',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
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
      id="how-it-works"
      ref={sectionRef}
      data-how-it-works
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        
        {/* Minimal Kicker */}
        <div className="text-center mb-16">
          <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
            Capacidades
          </span>
          <h2 className="mt-4 text-2xl sm:text-4xl font-normal tracking-tight text-white">
            Poder de engenharia.{' '}
            <span className="text-neutral-400 font-light">Com total simplicidade.</span>
          </h2>
        </div>

        {/* 3 Lightweight Horizontal Minimal Rows (Zero Card Boxes) */}
        <div className="space-y-12">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="gsap-cap-item flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 border-b border-white/[0.06] group"
            >
              <div className="sm:w-1/3">
                <span className="font-mono text-xs text-[#00e88f] font-semibold block mb-1">
                  {cap.kicker}
                </span>
                <h3 className="text-base sm:text-lg font-medium text-white group-hover:text-[#00e88f] transition-colors">
                  {cap.title}
                </h3>
              </div>
              <div className="sm:w-2/3">
                <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
