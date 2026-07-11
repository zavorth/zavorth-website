'use client'

import React from 'react'
import Image from 'next/image'
import { MessageSquareCode, Cpu, ShieldAlert, Database } from 'lucide-react'

const productPillars = [
  {
    title: 'Conversa (Reach Fabric)',
    description: 'Recebe instruções em linguagem natural pelo terminal, dashboard web ou canais criptografados como Telegram.',
    icon: MessageSquareCode,
    num: '01'
  },
  {
    title: 'Trabalha (Power Fabric)',
    description: 'Orquestra modelos locais e em nuvem, selecionando as ferramentas certas e gerenciando orçamentos de contexto.',
    icon: Cpu,
    num: '02'
  },
  {
    title: 'Acompanha (Trust Gate)',
    description: 'Bloqueia comandos potencialmente perigosos em sandbox e solicita confirmação explícita antes de avançar.',
    icon: ShieldAlert,
    num: '03'
  },
  {
    title: 'Lembra (Local Mnemos)',
    description: 'Mantém uma memória vetorial local detalhada sobre seus projetos, 100% controlável e editável por você.',
    icon: Database,
    num: '04'
  }
] as const

export function ProductIntroSection() {
  return (
    <section
      id="overview"
      data-product-intro
      className="landing-surface relative overflow-hidden border-t border-white/[0.06] py-24 sm:py-32 scroll-mt-20"
    >
      {/* Decorative fine technical grid overlay */}
      <div className="mesh-grid absolute inset-0 opacity-[0.02] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left: Presentation Text */}
          <div className="lg:col-span-7 max-w-2xl text-left">
            <span className="section-kicker">Apresentação</span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Seu computador,{' '}
              <span className="text-emerald-400">suas regras.</span>
            </h2>
            <p className="mt-6 text-base leading-8 text-neutral-400 sm:text-lg">
              O Zavorth é um runtime de IA projetado para rodar localmente no seu computador.
              Ele executa tarefas no seu sistema operacional sob um modelo de governança rígido:
              você aprova cada ação de risco em tempo real.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-4">
              <button
                onClick={() => {
                  const section = document.getElementById('install')
                  if (section) section.scrollIntoView({ behavior: 'smooth' })
                }}
                className="rounded bg-emerald-400 px-5 py-2.5 font-mono text-[11px] font-bold text-[#060809] transition-colors hover:bg-emerald-300 shadow-[0_4px_20px_rgba(0,232,143,0.15)]"
              >
                Primeiros Passos
              </button>
              <a
                href="/docs"
                className="rounded border border-white/[0.08] px-5 py-2.5 font-mono text-[11px] font-semibold text-neutral-300 transition-colors hover:bg-white/[0.04] hover:text-white"
              >
                Documentação &rarr;
              </a>
            </div>
          </div>

          {/* Right: Premium Mascot HUD */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 select-none flex items-center justify-center p-6 rounded-2xl border border-white/[0.06] bg-[#060807]/60 shadow-[0_30px_70px_rgba(0,0,0,0.5)] backdrop-blur-md">
              <div className="absolute inset-0 bg-emerald-400/5 rounded-full blur-3xl pointer-events-none" />
              <div className="brk-overlay rounded-2xl" />
              <div className="relative w-full h-full">
                <Image
                  src="/brand/zavorth-mascot.svg"
                  alt="Mascote Zavorth"
                  fill
                  className="object-contain p-2"
                  sizes="(max-w-768px) 240px, 280px"
                  priority
                />
              </div>
            </div>
          </div>

        </div>

        {/* Unified specs panels */}
        <div className="mx-auto mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productPillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.title}
                className="group relative flex flex-col justify-between rounded-xl border border-white/[0.06] bg-[#050608] p-6 transition-all duration-300 hover:border-emerald-400/20 hover:bg-emerald-400/[0.01]"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded bg-white/[0.02] border border-white/[0.06] text-neutral-400 group-hover:text-emerald-400 group-hover:border-emerald-500/25 transition-colors">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span className="font-mono text-[10px] text-neutral-600 font-bold">{pillar.num}</span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-white tracking-tight">{pillar.title}</h3>
                  <p className="text-xs leading-relaxed text-neutral-400 font-light">{pillar.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
