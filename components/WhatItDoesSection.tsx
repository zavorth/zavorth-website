'use client'

import React from 'react'

const steps = [
  {
    num: '01',
    title: 'Comando Natural',
    description: 'Insira suas metas em linguagem humana livre pelo Dashboard, TUI ou canais integrados autorizados.'
  },
  {
    num: '02',
    title: 'Análise e Plano',
    description: 'O compilador local analisa o objetivo, mapeia arquivos, reúne ferramentas e propõe um plano de execução.'
  },
  {
    num: '03',
    title: 'Portão de Decisão',
    description: 'Ações que possam modificar arquivos ou acessar a rede geram uma prévia de risco e aguardam sua aprovação.'
  },
  {
    num: '04',
    title: 'Recibo Assinado',
    description: 'Após a execução em sandbox local, o Zavorth salva um registro de auditoria criptografado e legível no disco.'
  }
] as const

export function WhatItDoesSection() {
  return (
    <section id="what-it-does" className="relative bg-[#000000] border-t border-white/[0.06] py-24 sm:py-32 overflow-hidden">
      {/* Soft atmospheric gradient */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-amber-500/[0.01] blur-[150px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        
        <div className="flex flex-col gap-6 md:flex-row md:gap-12 mb-16 md:items-start">
          <div className="w-full md:w-1/3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500 font-semibold block mb-3">
              02 // O QUE FAZ
            </span>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl leading-none">
              O Ciclo <br />
              <span className="text-amber-500">Operacional</span>
            </h2>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg leading-relaxed text-neutral-300 font-light">
              Zavorth opera em um ciclo contínuo de planejamento, governança e registro para que você saiba exatamente o que a IA está executando.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-md transition-all duration-300 hover:border-amber-500/30 hover:scale-[1.02] hover:shadow-[0_8px_30px_rgba(245,158,11,0.06)]"
            >
              <span className="font-mono text-xs font-bold text-amber-500 block border-b border-white/[0.08] pb-3 mb-4 transition-colors group-hover:text-amber-400">
                {step.num}
              </span>
              <h3 className="font-display text-base font-semibold text-white mb-2">
                {step.title}
              </h3>
              <p className="text-xs leading-relaxed text-neutral-400 font-light group-hover:text-neutral-300 transition-colors">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
