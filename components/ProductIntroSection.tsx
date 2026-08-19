'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, ArrowRight, Wand2, FolderHeart, Zap } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProductIntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState(0)

  const scenarios = [
    {
      icon: Wand2,
      label: 'Criar',
      input: 'Crie uma landing page moderna em React para o meu novo projeto',
      result: 'Código completo, tipado e publicado localmente em segundos.',
    },
    {
      icon: FolderHeart,
      label: 'Organizar',
      input: 'Organize minhas fotos, notas e notas fiscais por mês e categoria',
      result: 'Arquivos renomeados, pastas limpas e relatório de tudo o que mudou.',
    },
    {
      icon: Zap,
      label: 'Automatizar',
      input: 'Monitore novos dados e me avise com um resumo visual quando terminar',
      result: 'Rotina executada em segundo plano com notificações instantâneas.',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-intro-text',
        { opacity: 0.15, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 30%',
            scrub: 0.5,
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
      className="landing-surface relative overflow-hidden py-36 sm:py-52 bg-black text-white scroll-mt-20"
    >
      {/* Soft ambient gradient aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/[0.05] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        
        {/* Minimalist Kicker */}
        <div className="mb-8">
          <span className="section-kicker text-xs font-mono tracking-widest text-emerald-400 uppercase">
            Sem Atrito
          </span>
        </div>

        {/* Big Editorial Headline (Google Launch Style) */}
        <h2 className="text-4xl sm:text-7xl lg:text-8xl font-normal tracking-tight leading-[1.05] max-w-4xl mx-auto mb-12">
          <span className="block gsap-intro-text text-neutral-400">Pense no que você quer.</span>
          <span className="block gsap-intro-text text-white font-medium">O Zavorth realiza.</span>
        </h2>

        <p className="text-base sm:text-xl text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed mb-20">
          Você não precisa aprender comandos complexos. Converse em português simples e veja seu computador trabalhar por você.
        </p>

        {/* Minimalist Floating Interactive Beam */}
        <div className="max-w-3xl mx-auto">
          {/* Interactive Floating Pill Switcher */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {scenarios.map((item, idx) => {
              const Icon = item.icon
              const isActive = activeTab === idx
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.3)] scale-105'
                      : 'bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-emerald-400'}`} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* Minimalist Thought Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="relative p-8 sm:p-12 rounded-3xl bg-neutral-950/60 border border-white/[0.06] backdrop-blur-2xl text-left"
            >
              <div className="mb-6">
                <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest block mb-2">
                  Você pede
                </span>
                <p className="text-lg sm:text-2xl text-white font-light leading-snug">
                  "{scenarios[activeTab].input}"
                </p>
              </div>

              <div className="pt-6 border-t border-white/[0.04] flex items-center gap-3 text-sm text-emerald-400 font-light">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{scenarios[activeTab].result}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
