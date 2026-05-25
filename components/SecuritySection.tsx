'use client'

import { Lock, Smartphone, RefreshCw, type LucideIcon } from 'lucide-react'

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
    title: 'Privacidade por padrão (SecretRef)',
    desc: 'Chaves de API e tokens resolvem apenas no runtime local, nunca expostos em logs ou requisições externas.',
    icon: Lock,
    accentColor: 'text-amber-500',
    accentBg: 'bg-amber-500/10',
    accentBar: 'bg-amber-500',
  },
  {
    title: 'Aprovação remota via Telegram',
    desc: 'Ações críticas disparam notificações no seu celular e aguardam aprovação explícita antes de executar.',
    icon: Smartphone,
    accentColor: 'text-emerald-400',
    accentBg: 'bg-emerald-400/10',
    accentBar: 'bg-emerald-400',
  },
  {
    title: 'Fallback inteligente local',
    desc: 'Se a conexão externa cair, o roteador migra automaticamente para modelos locais sem perder contexto.',
    icon: RefreshCw,
    accentColor: 'text-cyan-400',
    accentBg: 'bg-cyan-400/10',
    accentBar: 'bg-cyan-400',
  },
]

export function SecuritySection() {
  return (
    <section id="security" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background radial glow */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/[0.03] blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl px-6">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left — Copy */}
          <div>
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-amber-500">
              Vantagens
            </span>

            <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
              IA local com{' '}
              <span className="text-white">governança real.</span>
            </h2>

            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-neutral-400">
              Diga adeus a vazamentos de dados, latências de rede e
              configurações complexas.
            </p>

            <a
              href="#"
              className="group mt-8 inline-flex items-center gap-1.5 rounded-lg border border-white/[0.08] px-5 py-2.5 text-sm font-medium text-neutral-300 transition-all duration-300 hover:border-white/[0.15] hover:text-white"
            >
              Saiba mais
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </div>

          {/* Right — Metric Cards */}
          <div className="flex flex-col gap-4">
            {cards.map((card) => {
              const Icon = card.icon

              return (
                <div
                  key={card.title}
                  className="group relative flex items-start gap-4 overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.03]"
                >
                  {/* Accent bar */}
                  <div
                    className={`absolute left-0 top-0 h-full w-1 rounded-l ${card.accentBar}`}
                  />

                  {/* Icon */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${card.accentBg}`}
                  >
                    <Icon
                      className={`h-5 w-5 ${card.accentColor}`}
                      strokeWidth={1.5}
                    />
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold text-white">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-neutral-400">
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
