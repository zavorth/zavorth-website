'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Database, HardDrive, Search, History, Zap, Check } from 'lucide-react'

export function InfiniteMemorySection() {
  const [selectedTurn, setSelectedTurn] = useState<number>(2)

  const turnsDemo = [
    {
      turn: 'Turn 10',
      label: 'Setup Inicial do Projeto',
      tokens: '4.2k tokens brutos',
      compact: '320B compactado em Grafo de Entidades',
      detail: 'Mapeamento inicial de bibliotecas, variáveis de ambiente e arquivos base da aplicação.',
    },
    {
      turn: 'Turn 50',
      label: 'Refatoração da Camada de Rede',
      tokens: '38.5k tokens brutos',
      compact: '1.2KB compactado em AST Semântica',
      detail: 'Preservação de todos os contratos TypeScript e endpoints sem sobrecarregar a memória do modelo.',
    },
    {
      turn: 'Turn 150+',
      label: 'Construção de Novas Features',
      tokens: '140k+ tokens brutos',
      compact: '2.8KB de Contexto Ativo de Alta Fidelidade',
      detail: 'O agente mantém memória de decisões tomadas no início da sessão com precisão cirúrgica.',
    },
  ]

  const memoryFeatures = [
    {
      icon: Database,
      title: 'Compactação de Conhecimento',
      desc: 'O histórico extenso é compactado em grafos semânticos e resumos episódicos, liberando a janela de contexto.',
    },
    {
      icon: HardDrive,
      title: 'Armazenamento em Disco Local',
      desc: 'Todas as memórias, preferências e artefatos ficam armazenados na sua própria máquina (SQLite/JSONL).',
    },
    {
      icon: Search,
      title: 'Recuperação com Latência Zero',
      desc: 'Busca semântica e por entidades com tempo de resposta inferior a 5ms antes de cada rodada do agente.',
    },
  ]

  return (
    <section
      id="memory"
      className="relative overflow-hidden py-28 sm:py-36 bg-black text-white scroll-mt-20 border-t border-white/[0.06]"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md mb-6"
          >
            <Brain className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-300">
              Contexto Infinito &amp; Memória Viva
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.15]"
          >
            Sem perda de informações,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-emerald-400">
              mesmo em centenas de turnos.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light"
          >
            O Zavorth organiza e sintetiza o conhecimento em segundo plano. Detalhes arquiteturais, arquivos tocados e preferências aprendidas permanecem nítidos do início ao fim do projeto.
          </motion.p>
        </div>

        {/* Interactive Memory Timeline Box */}
        <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-neutral-900/40 via-black to-neutral-950/80 p-8 sm:p-12 backdrop-blur-xl mb-12">
          
          <div className="flex flex-col lg:flex-row gap-8 items-stretch">
            
            {/* Left selector */}
            <div className="lg:w-1/3 flex flex-col gap-3">
              <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-500 mb-1">
                Evolução da Sessão
              </span>
              {turnsDemo.map((item, idx) => {
                const isSelected = selectedTurn === idx
                return (
                  <button
                    key={item.turn}
                    type="button"
                    onClick={() => setSelectedTurn(idx)}
                    className={`p-4 rounded-2xl text-left transition-all duration-300 border flex flex-col ${
                      isSelected
                        ? 'bg-white/[0.08] border-emerald-500/40 shadow-[0_0_24px_rgba(16,185,129,0.12)]'
                        : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className={`text-xs font-semibold ${isSelected ? 'text-emerald-400' : 'text-neutral-400'}`}>
                        {item.turn}
                      </span>
                      {isSelected && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      )}
                    </div>
                    <span className="text-xs text-neutral-200 font-medium">{item.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Right Display Area */}
            <div className="lg:w-2/3 p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/[0.06] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-6">
                  <div className="flex items-center gap-2.5">
                    <History className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-semibold text-white">
                      {turnsDemo[selectedTurn].label}
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    ZERO DATA LOSS
                  </span>
                </div>

                <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                  {turnsDemo[selectedTurn].detail}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] font-mono uppercase text-neutral-500 block mb-1">
                      Contexto Bruto Estimado
                    </span>
                    <span className="text-xs font-mono text-neutral-300 font-semibold">
                      {turnsDemo[selectedTurn].tokens}
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20">
                    <span className="text-[10px] font-mono uppercase text-emerald-400/80 block mb-1">
                      Retenção Estruturada
                    </span>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      {turnsDemo[selectedTurn].compact}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.04] flex items-center gap-2 text-xs text-neutral-500">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Memória persistida localmente em formato estruturado auditável</span>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {memoryFeatures.map((feat) => {
            const Icon = feat.icon
            return (
              <div
                key={feat.title}
                className="p-7 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {feat.desc}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
