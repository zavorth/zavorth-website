'use client'

import React from 'react'

export function AboutSection() {
  return (
    <section id="about" className="relative bg-[#000000] border-t border-white/[0.06] py-24 sm:py-32 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-amber-500/[0.02] blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-12 md:gap-16 items-start">
          
          <div className="w-full md:col-span-5">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500 font-semibold block mb-3">
              01 // O QUE É
            </span>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl leading-none">
              Governança <br />
              <span className="text-amber-500">Operacional</span>
            </h2>
          </div>

          <div className="w-full md:col-span-7 space-y-6">
            <p className="text-lg leading-relaxed text-neutral-200 font-normal">
              Zavorth é um <strong className="text-white font-medium">sistema operacional local</strong> para agentes de IA que prioriza o controle do operador, a privacidade física de arquivos e a validação ativa de riscos.
            </p>
            <p className="text-sm leading-relaxed text-neutral-400 font-light">
              Em vez de entregar o controle do seu computador para serviços autônomos sem limites de ação, o Zavorth atua como um portão de segurança na sua máquina. O runtime local recebe metas em linguagem natural, planeja e divide o trabalho e submete qualquer ação sensível (como gravação de código ou acessos à rede externa) para a sua validação explícita antes que qualquer modificação aconteça no sistema.
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
