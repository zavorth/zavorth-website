'use client'

import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Layers, Cpu, Shield, Bot, Check, ArrowRight } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function FeaturesGridSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [offlineMode, setOfflineMode] = useState(false)

  const models = [
    { name: 'Claude 3.7 Sonnet', provider: 'Anthropic', type: 'cloud' },
    { name: 'GPT-4o', provider: 'OpenAI', type: 'cloud' },
    { name: 'Gemini 2.0 Flash', provider: 'Google', type: 'cloud' },
    { name: 'DeepSeek R1', provider: 'DeepSeek', type: 'cloud' },
    { name: 'Llama 3.3 / Qwen', provider: 'Ollama (100% Local)', type: 'local' },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-feat-headline',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      )

      gsap.fromTo(
        '.gsap-feat-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
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
      id="features"
      ref={sectionRef}
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00e88f]/[0.025] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#00e88f]" />
            <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
              Auto-Evolução &middot; Liberdade Total
            </span>
          </div>

          <h2 className="gsap-feat-headline text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-white">
            Uma inteligência que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              se adapta a você.
            </span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Sem amarras a um único fornecedor. O Zavorth aprende suas preferências, cria novas habilidades sob demanda e roda com qualquer modelo.
          </p>
        </div>

        {/* 2-Column Asymmetrical Visual Feature Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Card 1: Auto-Skill Creation */}
          <div className="gsap-feat-card p-8 rounded-3xl border border-white/[0.08] bg-[#09090b]/90 backdrop-blur-2xl flex flex-col justify-between shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
            <div>
              <div className="w-10 h-10 rounded-2xl bg-[#00e88f]/10 border border-[#00e88f]/20 flex items-center justify-center text-[#00e88f] mb-6">
                <Layers className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-mono text-[#00e88f] uppercase tracking-wider block mb-1">
                Auto-Aprimoramento Contínuo
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-3">
                Cria as próprias habilidades
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6">
                Ao encontrar um desafio inédito ou uma ferramenta nova, o agente escreve scripts especializados e registra uma nova <span className="font-mono text-[#00e88f]">.agy skill</span> persistida localmente.
              </p>

              {/* Visual Micro Skill Terminal */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/[0.04] font-mono text-xs text-neutral-300 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-neutral-500 pb-2 border-b border-white/[0.04]">
                  <span>~/.gemini/skills/</span>
                  <span className="text-[#00e88f]">AUTO-GENERATED</span>
                </div>
                <div className="flex items-center gap-2 text-[#00e88f]">
                  <span>+</span>
                  <span className="text-white">skill: custom-api-scraper</span>
                </div>
                <div className="text-[11px] text-neutral-400 pl-3 border-l border-white/[0.08]">
                  Compilando scripts/ e gerando documentação SKILL.md...
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>ZERO INTERVENÇÃO MANUAL</span>
              <span className="text-[#00e88f]">PERSISTÊNCIA VIVA</span>
            </div>
          </div>

          {/* Card 2: Zero Lock-in Model Hub */}
          <div className="gsap-feat-card p-8 rounded-3xl border border-white/[0.08] bg-[#09090b]/90 backdrop-blur-2xl flex flex-col justify-between shadow-[0_20px_80px_rgba(0,0,0,0.8)]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-2xl bg-[#00e88f]/10 border border-[#00e88f]/20 flex items-center justify-center text-[#00e88f]">
                  <Cpu className="w-5 h-5" />
                </div>

                <button
                  type="button"
                  onClick={() => setOfflineMode(!offlineMode)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs font-mono text-neutral-300 hover:border-[#00e88f]/40 cursor-pointer"
                >
                  <span className={`w-2 h-2 rounded-full ${offlineMode ? 'bg-[#00e88f]' : 'bg-neutral-500'}`} />
                  <span>{offlineMode ? 'Modo 100% Local (Ollama)' : 'Modo Nuvem & Local'}</span>
                </button>
              </div>

              <span className="text-[10px] font-mono text-[#00e88f] uppercase tracking-wider block mb-1">
                Agnosticismo Radical
              </span>
              <h3 className="text-xl sm:text-2xl font-medium text-white mb-3">
                Zero dependência de fornecedor
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed mb-6">
                Conecte-se aos maiores provedores de IA ou execute modelos offline em hardware local sem trocar de aplicativo ou reescrever seus fluxos.
              </p>

              {/* Interactive Model Compatibility List */}
              <div className="space-y-2">
                {models.map((m, idx) => {
                  const isMatch = offlineMode ? m.type === 'local' : true
                  return (
                    <div
                      key={idx}
                      className={`px-3.5 py-2.5 rounded-xl border flex items-center justify-between text-xs font-mono transition-all duration-200 ${
                        isMatch
                          ? 'bg-black/50 border-white/[0.06] text-neutral-200'
                          : 'bg-black/20 border-white/[0.02] text-neutral-600 opacity-40'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${isMatch ? 'bg-[#00e88f]' : 'bg-neutral-700'}`} />
                        <span className="font-medium">{m.name}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400">{m.provider}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-neutral-500">
              <span>PRIVACIDADE GARANTIDA</span>
              <span className="text-[#00e88f]">AIR-GAPPED COMPLIANT</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
