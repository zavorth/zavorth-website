'use client'

import React from 'react'
import { Lock, Smartphone, RefreshCw, type LucideIcon, ShieldCheck } from 'lucide-react'

interface SecurityCard {
  title: string
  desc: string
  icon: LucideIcon
  accentColor: string
  accentBg: string
  accentBar: string
}

const cards: SecurityCard[] = [
  {
    title: 'Credenciais privadas',
    desc: 'Chaves de API e segredos ficam no seu ambiente local e aparecem para o agente apenas como referencias seguras.',
    icon: Lock,
    accentColor: 'text-amber-500',
    accentBg: 'bg-amber-500/10 border-amber-500/20',
    accentBar: 'bg-amber-500',
  },
  {
    title: 'Aprovacao rapida pelo celular',
    desc: 'Quando algo importante precisa do seu OK, Zavorth mostra uma previa clara e permite aprovar ou rejeitar pelo Telegram.',
    icon: Smartphone,
    accentColor: 'text-amber-500',
    accentBg: 'bg-amber-500/10 border-amber-500/20',
    accentBar: 'bg-amber-500',
  },
  {
    title: 'Continua local quando precisa',
    desc: 'Se um provedor externo nao estiver pronto, Zavorth explica o bloqueio, usa rotas locais quando possivel e mantem o trabalho previsivel.',
    icon: RefreshCw,
    accentColor: 'text-amber-500',
    accentBg: 'bg-amber-500/10 border-amber-500/20',
    accentBar: 'bg-amber-500',
  },
]

export function SecuritySection() {
  return (
    <section id="security" className="relative py-24 sm:py-32 overflow-hidden bg-transparent">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/[0.02] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">

          {/* Left Column — Core Posture */}
          <div className="lg:col-span-5 text-left">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full w-fit">
              Privacidade & Controle
            </span>

            <h2 className="mt-6 font-mono text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem] tracking-tight zavorth-heading-display">
              Privado por design. <br />
              <span className="text-amber-gradient">Claro no dia a dia.</span>
            </h2>

            <p className="mt-5 text-[15px] leading-relaxed text-neutral-400">
              Zavorth ajuda voce a trabalhar com IA local, arquivos, canais e provedores sem transformar cada tarefa em um ritual tecnico.
              Acoes simples fluem quietas; mudancas importantes aparecem com previa, motivo e botao de desfazer.
            </p>

            {/* List of High-End Posture Bullet points */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 mt-0.5">
                  <ShieldCheck size={12} />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-white">Controle sem atrito</span>
                  <p className="text-[11px] text-neutral-500 mt-0.5">O que for simples segue; o que for sensivel pede seu OK com contexto.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 mt-0.5">
                  <ShieldCheck size={12} />
                </div>
                <div>
                  <span className="block text-xs font-semibold text-white">Historico claro</span>
                  <p className="text-[11px] text-neutral-500 mt-0.5">Cada decisao importante fica revisavel, sem expor segredo bruto.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Metric and Feature Cards */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {cards.map((card) => {
              const Icon = card.icon

              return (
                <div
                  key={card.title}
                  className="group relative flex items-start gap-5 overflow-hidden rounded-2xl border border-white/[0.04] bg-[#07070a]/80 p-6 transition-all duration-300 hover:border-white/[0.09] hover:bg-white/[0.02] shadow-lg hover:shadow-[0_10px_25px_rgba(0,0,0,0.4)]"
                >
                  {/* Accent bar */}
                  <div
                    className={`absolute left-0 top-0 h-full w-1 rounded-l ${card.accentBar}`}
                  />

                  {/* Icon */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${card.accentBg} ${card.accentColor}`}
                  >
                    <Icon
                      className="h-5 w-5"
                      strokeWidth={1.8}
                    />
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                      {card.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
