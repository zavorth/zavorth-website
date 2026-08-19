'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, HeartHandshake, FolderHeart, Sparkles, CheckCircle2 } from 'lucide-react'

export function FeaturesGridSection() {
  const [activeMemory, setActiveMemory] = useState(0)

  const memoryMoments = [
    {
      title: 'Seu Estilo e Preferências',
      badge: 'Gosto Pessoal',
      desc: 'O Zavorth aprende como você gosta dos seus códigos, textos e designs. Não é preciso repetir instruções a cada conversa.',
      example: '"Lembrei que você prefere explicações diretas e código tipado em TypeScript sem comentários desnecessários."',
    },
    {
      title: 'Projetos e Contexto Passado',
      badge: 'Continuidade Total',
      desc: 'Retome um projeto semanas depois. O agente sabe exatamente o que foi feito, onde parou e qual era o próximo objetivo.',
      example: '"Continuando a refatoração do site de onde paramos na última terça-feira..."',
    },
    {
      title: 'Evolução Contínua',
      badge: 'Fica Melhor Todo Dia',
      desc: 'Quanto mais você usa, mais rápido ele executa suas tarefas e antecipa suas necessidades.',
      example: '"Apliquei o mesmo padrão visual que você aprovou no projeto anterior."',
    },
  ]

  return (
    <section
      id="features"
      className="landing-surface relative overflow-hidden py-32 sm:py-44 border-t border-white/[0.06] text-white scroll-mt-20"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-8">
            <Brain className="w-3.5 h-3.5 text-emerald-400" />
            <span className="section-kicker text-xs font-medium tracking-widest uppercase text-neutral-300">
              Memória Real
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.08]">
            Uma IA que realmente{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-white">
              lembra de você.
            </span>
          </h2>

          <p className="mt-8 text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Chats convencionais esquecem tudo assim que você fecha a janela. O Zavorth guarda seus aprendizados e preferências em disco local, tornando-se o seu parceiro digital definitivo.
          </p>
        </div>

        {/* Interactive Living Memory Showcase */}
        <div className="rounded-3xl border border-white/[0.08] bg-neutral-950/70 p-6 sm:p-12 backdrop-blur-2xl overflow-hidden">
          
          {/* 3 Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {memoryMoments.map((mom, idx) => {
              const isSelected = activeMemory === idx
              return (
                <button
                  key={mom.title}
                  type="button"
                  onClick={() => setActiveMemory(idx)}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 border ${
                    isSelected
                      ? 'bg-white/[0.08] border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                      : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.05]'
                  }`}
                >
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                    {mom.badge}
                  </span>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    {mom.title}
                  </p>
                </button>
              )
            })}
          </div>

          {/* Active Memory Visualizer */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMemory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/[0.06]"
            >
              <div className="mb-4 pb-4 border-b border-white/[0.06]">
                <p className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed">
                  {memoryMoments[activeMemory].desc}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm font-light text-emerald-300 italic bg-emerald-500/[0.05] p-4 rounded-xl border border-emerald-500/20">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 not-italic" />
                <span>{memoryMoments[activeMemory].example}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 text-center text-xs text-neutral-500 font-light">
            <span>Seus dados nunca saem da sua máquina. Você pode limpar ou editar a memória a qualquer momento.</span>
          </div>

        </div>

      </div>
    </section>
  )
}
