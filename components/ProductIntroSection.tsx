'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DecryptedText } from './reactbits/DecryptedText'
import { BlurText } from './reactbits/BlurText'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProductIntroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const items = [
    {
      number: '01',
      title: 'Você pede em português simples',
      desc: 'Diga o que você precisa fazer sem se preocupar com prompts longos ou configurações complicadas.',
    },
    {
      number: '02',
      title: 'O agente constrói no seu disco',
      desc: 'Cria arquivos reais, escreve código completo e executa rotinas diretamente no seu computador.',
    },
    {
      number: '03',
      title: 'Você mantém o controle total',
      desc: 'Seus dados não saem da sua máquina e nenhuma ação sensível é executada sem sua confirmação.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.google-fade-in',
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
      id="overview"
      ref={sectionRef}
      data-product-intro
      className="landing-surface relative py-28 sm:py-40 bg-black text-white scroll-mt-20"
    >
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Google Style Minimalist Header with React Bits */}
        <div className="max-w-3xl mb-16 sm:mb-24">
          <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase block mb-4">
            <DecryptedText text="Visão Geral" speed={30} maxIterations={8} />
          </span>
          
          <BlurText
            text="Um assistente de IA que trabalha no seu computador."
            className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight"
            delay={40}
          />
          
          <p className="google-fade-in mt-5 text-base sm:text-lg text-neutral-400 font-normal leading-relaxed">
            Em vez de apenas sugerir respostas em uma janela de chat, o Zavorth executa tarefas reais no seu sistema: cria arquivos, escreve código, organiza pastas e testa tudo localmente.
          </p>
        </div>

        {/* 3 Open Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 pt-2">
          {items.map((item) => (
            <div key={item.number} className="google-fade-in space-y-3">
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
