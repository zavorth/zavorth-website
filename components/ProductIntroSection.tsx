'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, ArrowDown, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react'

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
        '.gsap-cinematic-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      )

      gsap.fromTo(
        '.gsap-cinematic-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
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

  const milestones = [
    {
      step: '01',
      title: 'Planeja e Estrutura',
      desc: 'Analisa seu pedido, mapeia seus arquivos locais e traça um plano de execução seguro.',
    },
    {
      step: '02',
      title: 'Escreve e Constrói',
      desc: 'Cria código real completo, organiza pastas e resolve dependências no seu sistema.',
    },
    {
      step: '03',
      title: 'Testa e Entrega',
      desc: 'Valida tudo com testes automáticos e entrega a solução pronta no seu computador.',
    },
  ]

  return (
    <section
      id="overview"
      ref={sectionRef}
      data-product-intro
      className="landing-surface relative overflow-hidden py-36 sm:py-52 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Subtle Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#00e88f]/[0.02] rounded-full blur-[220px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Kicker */}
        <div className="text-center mb-8">
          <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
            A Nova Realidade da IA
          </span>
        </div>

        {/* Big Apple-Style Cinematic Headline */}
        <div className="gsap-cinematic-title text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-white">
            Você diz o que quer.{' '}
            <span className="block font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              Ele constrói no seu computador.
            </span>
          </h2>

          <p className="mt-8 text-base sm:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Diferente de chats comuns que apenas conversam no navegador, o Zavorth opera diretamente no seu sistema operacional — criando arquivos, rodando comandos e resolvendo tarefas reais.
          </p>
        </div>

        {/* Central Visual Transformation Showcase */}
        <div className="gsap-cinematic-card relative mx-auto max-w-3xl rounded-3xl border border-white/[0.08] bg-[#09090b]/80 backdrop-blur-2xl p-8 sm:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.9)] mb-16 overflow-hidden">
          
          {/* User Request Bubble */}
          <div className="p-6 rounded-2xl bg-black/80 border border-white/[0.08] relative">
            <span className="text-[10px] font-mono text-[#00e88f] uppercase tracking-wider block mb-2">
              Seu Pedido em Linguagem Natural
            </span>
            <p className="text-base sm:text-lg text-white font-normal">
              "Crie uma aplicação moderna com interface elegante, testes e deploy automático"
            </p>
          </div>

          {/* Central Vertical Connector Beam */}
          <div className="flex flex-col items-center justify-center my-6 gap-2 text-[#00e88f]">
            <div className="w-px h-8 bg-gradient-to-b from-[#00e88f]/80 to-[#00e88f]/20" />
            <span className="text-[10px] font-mono tracking-widest text-[#00e88f] uppercase bg-[#00e88f]/10 px-3 py-1 rounded-full border border-[#00e88f]/20">
              O ZAVORTH EXECUTA NO SEU COMPUTADOR
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-[#00e88f]/20 to-[#00e88f]/80" />
          </div>

          {/* 3 Result Milestones */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {milestones.map((item) => (
              <div
                key={item.step}
                className="p-5 rounded-2xl bg-black/60 border border-white/[0.04] flex flex-col justify-between"
              >
                <div>
                  <span className="text-xs font-mono text-[#00e88f] font-semibold block mb-1">
                    {item.step}
                  </span>
                  <h4 className="text-sm font-medium text-white mb-1.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Security Guarantee */}
          <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2 text-[#00e88f]">
              <CheckCircle2 className="w-4 h-4" />
              <span>100% Local &middot; Privacidade Total &middot; 0 Dados Vazados</span>
            </div>
            <span className="text-[10px] text-neutral-500 hidden sm:inline">CONTROLE TOTAL</span>
          </div>

        </div>

      </div>
    </section>
  )
}
