'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Terminal, Code2, FolderTree, Cpu, CheckCircle2 } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProductIntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState(0)

  const scenarios = [
    {
      id: 'create',
      label: 'Criar Código',
      icon: Code2,
      prompt: 'Crie uma página moderna em Next.js com animações e tipagem estrita',
      steps: [
        'Analisando contratos TypeScript e dependências...',
        'Gerando componentes modulares com Framer Motion...',
        'Executando build estático local: 16 páginas compiladas com 0 erros.',
      ],
      result: 'Código completo publicado no localhost:3000',
    },
    {
      id: 'organize',
      label: 'Organizar Workspace',
      icon: FolderTree,
      prompt: 'Organize minhas notas, documentos e relatórios do mês em pastas limpas',
      steps: [
        'Varrendo 142 arquivos sem extensão ou duplicados...',
        'Categorizando por data, projeto e relevância semântica...',
        'Gerando prévia segura: 0 arquivos sobrescritos sem aprovação.',
      ],
      result: 'Workspace limpo e estruturado em disco',
    },
    {
      id: 'automate',
      label: 'Automatizar Rotina',
      icon: Cpu,
      prompt: 'Monitore novos dados da API e envie um resumo visual direto no meu canal',
      steps: [
        'Configurando agendador cron local em background...',
        'Processando métricas e gerando gráficos vetoriais...',
        'Disparando notificação criptografada de alta prioridade.',
      ],
      result: 'Automação ativa e rodando 100% em segundo plano',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-intro-fade',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
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
      id="overview"
      ref={sectionRef}
      data-product-intro
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00e88f]/[0.025] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#00e88f]" />
            <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
              O Que É o Zavorth
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-tight text-white">
            Um assistente autônomo que{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              vive no seu sistema.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Diga o que você precisa em português simples. O Zavorth interage com seus arquivos, cria projetos no seu computador e executa tarefas com total privacidade.
          </p>
        </div>

        {/* The Live Interactive Agent Cockpit */}
        <div className="gsap-intro-fade rounded-3xl border border-white/[0.08] bg-neutral-950/80 backdrop-blur-2xl p-6 sm:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.8)] max-w-4xl mx-auto overflow-hidden">
          
          {/* Top Pill Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-8 border-b border-white/[0.06] mb-8">
            {scenarios.map((item, idx) => {
              const Icon = item.icon
              const isActive = activeTab === idx
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                      : 'bg-white/[0.03] text-neutral-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.05]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-[#00e88f]'}`} />
                  <span>{item.label}</span>
                </button>
              )
            })}
          </div>

          {/* Dynamic Prompt & Live Local Execution Stream */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* User Prompt */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/60 border border-white/[0.06]">
                <span className="text-[10px] font-mono text-[#00e88f] uppercase tracking-wider block mb-1">
                  Seu Pedido em Linguagem Natural
                </span>
                <p className="text-sm sm:text-base text-white font-light">
                  "{scenarios[activeTab].prompt}"
                </p>
              </div>

              {/* Execution Feed */}
              <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-white/[0.04] space-y-2.5 font-mono text-xs text-neutral-400">
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-2">
                  Execução Nativa no Sistema
                </span>
                {scenarios[activeTab].steps.map((step, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-neutral-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00e88f]" />
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {/* Deliverable Status */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-2 text-[#00e88f]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{scenarios[activeTab].result}</span>
                </div>
                <span className="text-[10px] text-neutral-500">100% LOCAL &middot; PRIVADO</span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  )
}
