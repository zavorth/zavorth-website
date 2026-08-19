'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Users2, Sparkles, LayoutTemplate, ShieldCheck, CheckCircle2 } from 'lucide-react'

export function FeaturesSection() {
  const teamPerks = [
    {
      title: 'Planejamento e Pesquisa',
      desc: 'Analisa o cenário, pesquisa a documentação e monta a estratégia ideal antes de começar.',
    },
    {
      title: 'Construção Completa',
      desc: 'Cria o código e os recursos necessários de ponta a ponta, sem atalhos ou partes incompletas.',
    },
    {
      title: 'Auditoria e Testes',
      desc: 'Roda verificações automatizadas para garantir que tudo funcione perfeitamente antes de entregar.',
    },
  ]

  return (
    <section
      id="features"
      data-proof-section
      className="landing-surface relative overflow-hidden py-32 sm:py-44 border-t border-white/[0.06] text-white scroll-mt-20"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-8">
            <Users2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="section-kicker text-xs font-medium tracking-widest uppercase text-neutral-300">
              Colaboração Invisível
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.08]">
            Multiplique sua capacidade por dez,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-white">
              sem esforço extra.
            </span>
          </h2>

          <p className="mt-8 text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Enquanto você foca nas decisões importantes, o Zavorth divide o trabalho pesado entre tarefas simultâneas — pesquisando, construindo e testando tudo para você.
          </p>
        </div>

        {/* 3 Core Highlights (Simple & Clear) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {teamPerks.map((perk) => (
            <div
              key={perk.title}
              className="p-8 rounded-3xl border border-white/[0.08] bg-neutral-950/70 backdrop-blur-2xl text-center sm:text-left"
            >
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 mx-auto sm:mx-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{perk.title}</h3>
              <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>

        {/* Real Product Proof Display */}
        <div 
          data-zavorth-proof 
          className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-neutral-900/40 via-black to-neutral-950/80 p-8 sm:p-12 overflow-hidden backdrop-blur-2xl"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-white/[0.06]">
            <div>
              <h3 className="text-base font-semibold text-white">Do Desktop ao Navegador</h3>
              <p className="text-xs text-neutral-400 font-light mt-0.5">Use o Zavorth onde for mais confortável para o seu dia a dia.</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              DESKTOP &amp; WEB CONSOLE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-black/60 p-2.5 group">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                <Image
                  src="/product/zavorth-desktop-shell.png"
                  alt="Zavorth Desktop Shell"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-white">Aplicativo Desktop</p>
                <p className="text-[11px] text-neutral-400 font-light">Atalhos globais rápidos, overlay discreto e resposta instantânea.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-black/60 p-2.5 group">
              <div className="relative aspect-[16/10] rounded-xl overflow-hidden">
                <Image
                  src="/product/zavorth-control-overview.png"
                  alt="Zavorth Control Overview"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
              </div>
              <div className="p-3">
                <p className="text-xs font-semibold text-white">Console Web de Controle</p>
                <p className="text-[11px] text-neutral-400 font-light">Visão panorâmica dos seus projetos e histórico completo.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
