'use client'

import React from 'react'
import { ShieldAlert, KeyRound, Network, ClipboardList } from 'lucide-react'

const features = [
  {
    title: 'Políticas de Risco',
    description: 'Estabeleça orçamentos rígidos de tokens, regras de execução de comandos em sandbox e restrições de rede locais.',
    icon: ShieldAlert
  },
  {
    title: 'Memória Local Criptografada',
    description: 'Bancos vetoriais persistidos na sua máquina, garantindo que o contexto do agente continue privado e sob seu controle.',
    icon: KeyRound
  },
  {
    title: 'Planejamento Swarm',
    description: 'Decompõe tarefas complexas e delega para sub-agentes isolados com checagens redundantes de qualidade e conformidade.',
    icon: Network
  },
  {
    title: 'Auditoria de Ações',
    description: 'Geração de logs legíveis por humanos e assinaturas de transação salvas localmente para que você revise cada passo.',
    icon: ClipboardList
  }
] as const

export function FeaturesSection() {
  return (
    <section id="features" className="relative bg-[#000000] border-t border-white/[0.06] py-24 sm:py-32 overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute top-0 right-1/3 w-[400px] h-[400px] bg-amber-500/[0.01] blur-[130px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        
        <div className="flex flex-col gap-6 md:flex-row md:gap-12 mb-16 md:items-start">
          <div className="w-full md:w-1/3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500 font-semibold block mb-3">
              04 // FUNCIONALIDADES
            </span>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl leading-none">
              Recursos <br />
              <span className="text-amber-500">Premium</span>
            </h2>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg leading-relaxed text-neutral-300 font-light">
              Construído para fornecer a camada mais segura e robusta de automação local com inteligência artificial.
            </p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-md transition-all duration-300 hover:border-amber-500/30 hover:scale-[1.01] hover:shadow-[0_12px_40px_rgba(245,158,11,0.06)]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.02] text-amber-500 group-hover:border-amber-500/30 group-hover:text-amber-400 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-neutral-400 font-light group-hover:text-neutral-300 transition-colors">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
