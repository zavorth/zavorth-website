'use client'

import React, { useState } from 'react'
import Image from 'next/image'

const proofs = [
  {
    id: 'control',
    tabName: 'Zavorth Control',
    src: '/product/zavorth-control-overview.png',
    alt: 'Zavorth Control — visão geral do painel',
    caption: 'Zavorth Control — acompanhe tarefas em execução, logs de auditoria e gerencie aprovações em tempo real.',
    chrome: 'Zavorth Control App v1.2.4',
    aspect: 'aspect-[16/9] sm:aspect-[21/10]'
  },
  {
    id: 'command',
    tabName: 'Command Center',
    src: '/product/zavorth-command-center.png',
    alt: 'Zavorth — central de comando',
    caption: 'Central de Comando — verifique os nós ativos, orçamentos de contexto consumidos e canais conectados no seu ambiente local.',
    chrome: 'Zavorth Command Center',
    aspect: 'aspect-[16/10]'
  }
] as const

export function FeaturesSection() {
  const [activeProof, setActiveProof] = useState<string>('control')
  const currentProof = proofs.find((p) => p.id === activeProof) || proofs[0]

  return (
    <section
      id="trust"
      data-proof-section
      className="landing-surface relative scroll-mt-20 border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <span className="section-kicker">Interface do Sistema</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-none tracking-tight text-white sm:text-5xl">
            O produto, <span className="text-emerald-400">de verdade</span>
          </h2>
          <p className="mt-5 text-lg font-light leading-relaxed text-neutral-400">
            Nenhuma simulação conceitual ou mockup abstrato. Esta é a interface de controle do Zavorth rodando no seu desktop.
          </p>
        </div>

        {/* Dynamic Image Swapper Tab Selector */}
        <div className="flex gap-2 border-b border-white/[0.06] pb-3 mb-8">
          {proofs.map((proof) => (
            <button
              key={proof.id}
              onClick={() => setActiveProof(proof.id)}
              className={`px-4 py-2 font-mono text-[10px] uppercase tracking-wider transition-all border-b-2 -mb-[14px] ${
                proof.id === activeProof
                  ? 'border-emerald-400 text-white font-bold'
                  : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {proof.tabName}
            </button>
          ))}
        </div>

        {/* Chrome Container */}
        <figure
          data-zavorth-proof
          className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#060807] shadow-[0_30px_80px_rgba(0,0,0,0.65)]"
        >
          {/* Chrome titlebar */}
          <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[9px] uppercase tracking-wider text-neutral-500 select-none">
              {currentProof.chrome}
            </span>
          </div>

          {/* Screenshot Display Area */}
          <div className={`relative w-full bg-[#050807] ${currentProof.aspect}`}>
            <Image
              src={currentProof.src}
              alt={currentProof.alt}
              fill
              className="object-contain object-center p-2 sm:p-4 select-none"
              sizes="100vw"
              priority
            />
          </div>

          {/* Caption */}
          <figcaption className="border-t border-white/[0.06] px-5 py-4 text-xs font-mono leading-relaxed text-neutral-500">
            <span className="text-emerald-400 mr-2">//</span>
            {currentProof.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
