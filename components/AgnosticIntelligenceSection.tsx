'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, Network, Terminal, Shield, RefreshCw, Zap } from 'lucide-react'

export function AgnosticIntelligenceSection() {
  const [hoveredFamily, setHoveredFamily] = useState<number | null>(null)

  const providerFamilies = [
    {
      id: 'family-1',
      icon: '/logos/anthropic.svg',
      desc: 'Raciocínio analítico avançado e refatorações arquiteturais profundas.',
      badge: 'Reasoning Engine',
    },
    {
      id: 'family-2',
      icon: '/logos/openai.svg',
      desc: 'Orquestração multi-etapas e síntese de contexto de alta velocidade.',
      badge: 'Cognitive Core',
    },
    {
      id: 'family-3',
      icon: '/logos/googlegemini.svg',
      desc: 'Processamento multimodal nativo e janelas de contexto estendidas.',
      badge: 'Multimodal Stream',
    },
    {
      id: 'family-4',
      icon: '/logos/shell.svg',
      desc: 'Execução 100% offline e privada em hardware local sem envio de dados.',
      badge: 'Local-First Runtime',
    },
  ]

  const pillars = [
    {
      icon: Network,
      title: 'Zero Vendor Lock-in',
      text: 'O runtime opera através de adaptadores intercambiáveis. O código nunca fica preso a um ecossistema proprietário.',
    },
    {
      icon: Zap,
      title: 'Roteamento Inteligente',
      text: 'A IA encaminha dinamicamente tarefas leves para modelos ultra-rápidos e problemas complexos para modelos de alto raciocínio.',
    },
    {
      icon: Shield,
      title: 'Prioridade Local e Privada',
      text: 'Suporte de primeira classe para modelos rodando em Ollama ou vLLM locais, mantendo seu código 100% no seu computador.',
    },
  ]

  return (
    <section
      id="intelligence"
      className="relative overflow-hidden py-28 sm:py-36 bg-black text-white scroll-mt-20 border-t border-white/[0.06]"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-500/[0.03] rounded-full blur-[160px] pointer-events-none" />

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
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-300">
              Arquitetura Agnóstica
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.15]"
          >
            Compatibilidade universal com as{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-emerald-400">
              maiores famílias de IA.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Sem restrições de provedor. O Zavorth conecta-se diretamente aos modelos de ponta da nuvem ou ao seu ambiente local privado, unificando contratos e ferramentas em uma única interface inteligente.
          </motion.p>
        </div>

        {/* Central Core with Orbiting Provider Glyphs */}
        <div className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-b from-neutral-900/40 via-black to-neutral-950/80 p-8 sm:p-14 backdrop-blur-xl mb-14 overflow-hidden">
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 relative z-10">
            {providerFamilies.map((fam, idx) => {
              const isHovered = hoveredFamily === idx
              return (
                <motion.div
                  key={fam.id}
                  onMouseEnter={() => setHoveredFamily(idx)}
                  onMouseLeave={() => setHoveredFamily(null)}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center cursor-default ${
                    isHovered
                      ? 'bg-white/[0.08] border-emerald-500/40 shadow-[0_0_30px_rgba(16,185,129,0.15)]'
                      : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.12]'
                  }`}
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center mb-5 relative group">
                    <Image
                      src={fam.icon}
                      alt="Model Family"
                      width={28}
                      height={28}
                      className="opacity-75 group-hover:opacity-100 transition-opacity filter invert brightness-200"
                    />
                    {isHovered && (
                      <span className="absolute inset-0 rounded-2xl bg-emerald-400/20 blur-md -z-10" />
                    )}
                  </div>

                  <span className="text-[10px] font-mono font-medium text-emerald-400 mb-2 uppercase tracking-wider">
                    {fam.badge}
                  </span>

                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {fam.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Central Connecting Status Beam */}
          <div className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400 font-light">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Pluggable Adapter Runtime · Detecção automática de chave e endpoint</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[11px] text-neutral-500">
              <span>UNIFIED TOOL CONTRACTS</span>
              <span>&middot;</span>
              <span>PARALLEL INFERENCE</span>
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="p-7 rounded-2xl border border-white/[0.06] bg-white/[0.015] hover:bg-white/[0.03] transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">
                  {pillar.text}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
