'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Layers, Cpu, Shield, ArrowRight } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function FeaturesGridSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-feat-title',
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
        '.gsap-feat-box',
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

  return (
    <section
      id="features"
      ref={sectionRef}
      className="landing-surface relative overflow-hidden py-36 sm:py-52 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[450px] bg-[#00e88f]/[0.02] rounded-full blur-[220px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Kicker */}
        <div className="text-center mb-8">
          <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
            Auto-Evolução &middot; Liberdade Total
          </span>
        </div>

        {/* Big Apple-Style Cinematic Headline */}
        <div className="gsap-feat-title text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.08] text-white">
            Uma inteligência que{' '}
            <span className="block font-normal text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              se adapta ao seu ritmo.
            </span>
          </h2>

          <p className="mt-8 text-base sm:text-xl text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Sem limites impostos por um único provedor. O Zavorth aprende suas rotinas, expande as próprias habilidades e roda onde você quiser.
          </p>
        </div>

        {/* 2 Clean Cinematic Feature Showcases */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Showcase 1: Auto-Skill Evolution */}
          <div className="gsap-feat-box p-8 sm:p-10 rounded-3xl border border-white/[0.08] bg-[#09090b]/80 backdrop-blur-2xl flex flex-col justify-between shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00e88f]/10 border border-[#00e88f]/20 flex items-center justify-center text-[#00e88f] mb-8">
                <Layers className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-mono text-[#00e88f] uppercase tracking-wider block mb-2">
                Auto-Aprimoramento Contínuo
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">
                Cria as próprias habilidades
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                Ao encontrar um desafio novo ou uma API desconhecida, o agente escreve scripts especializados e registra uma nova <span className="text-white font-mono">habilidade (.agy skill)</span> salva diretamente no seu computador para uso futuro.
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>PERSISTÊNCIA LOCAL</span>
              <span className="text-[#00e88f]">AUTÔNOMO</span>
            </div>
          </div>

          {/* Showcase 2: Zero Lock-in & Privacy */}
          <div className="gsap-feat-box p-8 sm:p-10 rounded-3xl border border-white/[0.08] bg-[#09090b]/80 backdrop-blur-2xl flex flex-col justify-between shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#00e88f]/10 border border-[#00e88f]/20 flex items-center justify-center text-[#00e88f] mb-8">
                <Cpu className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-mono text-[#00e88f] uppercase tracking-wider block mb-2">
                Agnosticismo Radical
              </span>
              <h3 className="text-2xl sm:text-3xl font-medium text-white mb-4">
                Qualquer modelo. Zero lock-in.
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">
                Conecte-se aos maiores modelos de IA do mundo (OpenAI, Claude, Gemini, DeepSeek) ou execute modelos locais 100% offline via Ollama em hardware próprio sem enviar um único caractere para a internet.
              </p>
            </div>

            <div className="pt-6 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>NUVEM OU 100% OFFLINE</span>
              <span className="text-[#00e88f]">PRIVACIDADE TOTAL</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
