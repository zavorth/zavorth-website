'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const steps = [
    {
      number: '01',
      kicker: 'PESQUISAR',
      title: 'Busca Contexto',
      desc: 'Varre seus arquivos locais e documentações em milissegundos para entender o cenário.',
    },
    {
      number: '02',
      kicker: 'PLANEJAR',
      title: 'Estrutura o Plano',
      desc: 'Mapeia dependências e contratos para garantir que nada no seu projeto seja quebrado.',
    },
    {
      number: '03',
      kicker: 'CONSTRUIR',
      title: 'Escreve a Solução',
      desc: 'Gera o código completo, cria os arquivos e organiza tudo sem atalhos ou placeholders.',
    },
    {
      number: '04',
      kicker: 'VALIDAR',
      title: 'Testa Tudo',
      desc: 'Roda testes e verificações antes de entregar o resultado pronto no seu computador.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.google-swarm-item',
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
      id="how-it-works"
      ref={sectionRef}
      data-how-it-works
      className="landing-surface relative py-28 sm:py-40 bg-black text-white scroll-mt-20 border-t border-white/[0.06]"
    >
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Google Style Minimalist Header */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase block mb-4">
            Sistema Swarm
          </span>
          <h2 className="google-swarm-item text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            Como o Zavorth resolve tarefas complexas.
          </h2>
          <p className="google-swarm-item mt-5 text-base sm:text-lg text-neutral-400 font-normal leading-relaxed">
            Em vez de uma única IA fazendo tudo em fila lenta, o trabalho é distribuído entre especialistas que colaboram em paralelo em segundo plano.
          </p>
        </div>

        {/* 4 Open Columns (Google Minimalist Style - Zero Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 pt-8 border-t border-white/[0.08]">
          {steps.map((step) => (
            <div key={step.number} className="google-swarm-item space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-[#00e88f] font-semibold">
                  {step.number}
                </span>
                <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider">
                  {step.kicker}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-medium text-white">
                {step.title}
              </h3>
              <p className="text-sm text-neutral-400 font-normal leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
