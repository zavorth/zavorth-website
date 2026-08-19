'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Wand2, FolderTree, Code2, Rocket, ArrowRight } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProductIntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIdea, setActiveIdea] = useState(0)

  const ideas = [
    {
      icon: Wand2,
      label: 'Criar um Projeto',
      prompt: 'Crie uma landing page moderna e elegante para o meu novo produto',
      output: 'Layout desenhado, código gerado, componentes estilizados e publicado em segundos.',
      color: 'from-emerald-400 to-teal-300',
    },
    {
      icon: FolderTree,
      label: 'Organizar Meu Computador',
      prompt: 'Organize minhas notas, recibos e documentos da semana em pastas limpas',
      output: 'Arquivos renomeados, duplicatas eliminadas e relatórios gerados sem você mover um dedo.',
      color: 'from-blue-400 to-cyan-300',
    },
    {
      icon: Rocket,
      label: 'Automatizar Tarefas',
      prompt: 'Analise meus dados e envie um resumo visual direto no meu canal preferido',
      output: 'Dados processados, gráficos gerados e notificação entregue no horário marcado.',
      color: 'from-purple-400 to-pink-300',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.kinetic-title-word',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
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
      className="landing-surface relative overflow-hidden py-32 sm:py-44 border-t border-white/[0.06] text-white scroll-mt-20"
    >
      {/* Dynamic ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/5 to-transparent rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Kinetic Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-8">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="section-kicker text-xs font-medium tracking-widest uppercase text-neutral-300">
              Simples &amp; Poderoso
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.08]">
            <span className="inline-block kinetic-title-word">Você</span>{' '}
            <span className="inline-block kinetic-title-word">imagina.</span>{' '}
            <span className="inline-block kinetic-title-word text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-white">
              O Zavorth realiza.
            </span>
          </h2>

          <p className="mt-8 text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Sem telas complicadas ou comandos chatos. Diga o que você quer em português simples e veja suas ideias ganharem vida diretamente no seu computador.
          </p>
        </div>

        {/* Cinematic Kinetic Idea Morphing Console */}
        <div className="relative rounded-3xl border border-white/[0.08] bg-neutral-950/70 p-6 sm:p-12 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Interactive Idea Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {ideas.map((item, idx) => {
              const Icon = item.icon
              const isActive = activeIdea === idx
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveIdea(idx)}
                  className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2.5 ${
                    isActive
                      ? 'bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.25)] scale-105'
                      : 'bg-white/[0.04] text-neutral-400 hover:bg-white/[0.08] hover:text-white border border-white/[0.05]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-emerald-400'}`} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* Morphing Thought-to-Result Stage */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdea}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="p-6 sm:p-10 rounded-2xl bg-black/60 border border-white/[0.06] relative"
            >
              <div className="mb-6 pb-6 border-b border-white/[0.06]">
                <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 block mb-2">
                  O que você pede:
                </span>
                <p className="text-lg sm:text-2xl font-light text-white leading-relaxed">
                  "{ideas[activeIdea].prompt}"
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 block mb-2">
                  O que o Zavorth faz no seu computador:
                </span>
                <p className="text-sm sm:text-base font-light text-neutral-300 leading-relaxed flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                  {ideas[activeIdea].output}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Bottom subtle trust seal */}
          <div className="mt-8 text-center text-xs text-neutral-500 font-light flex items-center justify-center gap-2">
            <span>Tudo acontece localmente na sua máquina, com total privacidade e sem esforço.</span>
          </div>

        </div>

      </div>
    </section>
  )
}
