'use client'

import React from 'react'
import { Terminal, ShieldAlert, FileText, ArrowRight } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

interface Step {
  num: string
  title: string
  subtitle: string
  desc: string
  icon: LucideIcon
  colorClass: string
  bgClass: string
}

const steps: Step[] = [
  {
    num: '01',
    title: 'Pedido em linguagem natural',
    subtitle: 'ENTENDIMENTO',
    desc: 'Voce escreve em texto normal. Zavorth entende se e conversa, organizacao, codigo, arquivo, canal ou rotina e mostra o proximo passo util.',
    icon: Terminal,
    colorClass: 'text-amber-500',
    bgClass: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    num: '02',
    title: 'Previa antes de mudar algo',
    subtitle: 'PREVIEW',
    desc: 'Se o pedido puder alterar arquivos, enviar mensagem ou rodar comandos, Zavorth mostra o antes e depois esperado. Nada importante muda sem o seu OK.',
    icon: ShieldAlert,
    colorClass: 'text-amber-500',
    bgClass: 'bg-amber-500/10 border-amber-500/20',
  },
  {
    num: '03',
    title: 'Execucao com historico claro',
    subtitle: 'ACOMPANHAMENTO',
    desc: 'Depois da aprovacao, a tarefa roda no ambiente configurado e deixa um resumo local com o que foi feito, por que foi feito e como revisar.',
    icon: FileText,
    colorClass: 'text-amber-500',
    bgClass: 'bg-amber-500/10 border-amber-500/20',
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-transparent py-24 sm:py-32 overflow-hidden">

      {/* Dynamic ambient grid overlay */}
      <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">

        {/* Header */}
        <div className="mb-20 text-center">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full w-fit mx-auto">
            Fluxo simples
          </span>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl zavorth-heading-display">
            Como funciona o <span className="text-amber-gradient">Zavorth Runtime</span>
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Do pedido ao resultado, Zavorth mostra o suficiente para voce confiar sem precisar entender a arquitetura.
          </p>
        </div>

        {/* Cinematic Step Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {steps.map((step, i) => {
            const Icon = step.icon

            return (
              <div
                key={step.num}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.09] p-7 transition-all duration-300 shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] hover:-translate-y-1"
              >
                {/* Visual Glow overlay */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/[0.01] group-hover:bg-amber-500/[0.02] rounded-full blur-2xl pointer-events-none transition-all duration-300" />

                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${step.bgClass} ${step.colorClass} shadow-inner`}>
                      <Icon size={20} strokeWidth={1.8} />
                    </div>
                    <span className="font-mono text-4xl font-extrabold text-white/5 select-none tracking-tighter">
                      {step.num}
                    </span>
                  </div>

                  {/* Step Subtitle */}
                  <span className={`block font-mono text-[9px] font-bold tracking-widest ${step.colorClass} uppercase mb-2`}>
                    {step.subtitle}
                  </span>

                  {/* Step Title */}
                  <h3 className="text-[17px] font-bold text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="text-xs leading-relaxed text-neutral-400">
                    {step.desc}
                  </p>
                </div>

                {/* Card Indicator */}
                <div className="mt-8 pt-4 border-t border-white/[0.03] flex items-center justify-between text-neutral-500 group-hover:text-amber-500 transition-colors">
                  <span className="text-[10px] uppercase font-mono tracking-wider font-semibold">SAIBA MAIS</span>
                  <ArrowRight size={12} className="transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
