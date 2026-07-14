'use client'

import React, { useState } from 'react'

const abilities = [
  {
    id: 'skills',
    num: '01',
    name: 'Habilidades sob demanda',
    text: 'Capacidades programáveis que você acopla ao runtime — arquivos, comandos de terminal ou ações automatizadas.',
    icon: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 text-emerald-400 stroke-current fill-none" strokeWidth="1.5">
        <path d="M 20,30 L 80,30 M 20,50 L 60,50 M 20,70 L 80,70" strokeDasharray="3 3" />
        <circle cx="20" cy="30" r="3" fill="#00e88f" />
        <circle cx="20" cy="50" r="3" fill="#00e88f" />
        <circle cx="20" cy="70" r="3" fill="#00e88f" />
        <circle cx="80" cy="30" r="4" className="animate-ping" />
        <circle cx="60" cy="50" r="4" className="animate-pulse" />
      </svg>
    )
  },
  {
    id: 'learning',
    num: '02',
    name: 'Aprendizado contínuo',
    text: 'Cada plano aprovado e executado enriquece o contexto do agente. Ele reutiliza aprendizados para simplificar os próximos passos.',
    icon: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 text-emerald-400 stroke-current fill-none" strokeWidth="1.5">
        <path d="M 50,50 A 20,20 0 1,0 30,50 A 20,20 0 1,0 50,50 Z" strokeDasharray="2 2" className="animate-[spin_10s_linear_infinite]" />
        <path d="M 50,50 A 20,20 0 1,1 70,50 A 20,20 0 1,1 50,50 Z" strokeDasharray="2 2" className="animate-[spin_15s_linear_infinite_reverse]" />
        <circle cx="50" cy="50" r="6" fill="#00e88f" className="animate-pulse" />
      </svg>
    )
  },
  {
    id: 'memory',
    num: '03',
    name: 'Memória persistente',
    text: 'Seus dados, histórico de execução e aprendizados são salvos localmente. Você decide quando limpar ou compartilhar.',
    icon: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 text-emerald-400 stroke-current fill-none" strokeWidth="1.5">
        <path d="M 30,30 C 30,20 70,20 70,30 L 70,70 C 70,80 30,80 30,70 Z" />
        <path d="M 30,42 C 30,48 70,48 70,42" />
        <path d="M 30,56 C 30,62 70,62 70,56" />
        <circle cx="50" cy="33" r="2" fill="#00e88f" />
        <circle cx="50" cy="45" r="2" fill="#00e88f" />
        <circle cx="50" cy="59" r="2" fill="#00e88f" />
      </svg>
    )
  },
  {
    id: 'continuity',
    num: '04',
    name: 'Retomada de Sessão',
    text: 'O runtime armazena o estado das tarefas de forma transacional. Se a execução for interrompida, retome exatamente de onde parou.',
    icon: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 text-emerald-400 stroke-current fill-none" strokeWidth="1.5">
        <circle cx="50" cy="50" r="30" strokeDasharray="6 6" className="animate-[spin_25s_linear_infinite]" />
        <line x1="50" y1="50" x2="50" y2="28" stroke="#00e88f" strokeWidth="2" className="origin-[50px_50px] animate-[spin_6s_linear_infinite]" />
        <line x1="50" y1="50" x2="68" y2="50" stroke="#00e88f" strokeWidth="1.5" className="origin-[50px_50px] animate-[spin_30s_linear_infinite]" />
      </svg>
    )
  },
  {
    id: 'channels',
    num: '05',
    name: 'Canais Autorizados',
    text: 'Zavorth escuta e responde via Telegram, Web e CLI, porém a governança local sempre filtra as ações que exigem aprovação.',
    icon: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 text-emerald-400 stroke-current fill-none" strokeWidth="1.5">
        <circle cx="50" cy="50" r="8" fill="#00e88f" />
        <circle cx="20" cy="30" r="5" />
        <circle cx="80" cy="30" r="5" />
        <circle cx="50" cy="80" r="5" />
        <line x1="50" y1="50" x2="20" y2="30" stroke="currentColor" strokeDasharray="3 3" />
        <line x1="50" y1="50" x2="80" y2="30" stroke="currentColor" strokeDasharray="3 3" />
        <line x1="50" y1="50" x2="50" y2="80" stroke="currentColor" strokeDasharray="3 3" />
        <circle cx="35" cy="40" r="2" fill="#00e88f" className="animate-[ping_3s_infinite]" />
        <circle cx="65" cy="40" r="2" fill="#00e88f" className="animate-[ping_2s_infinite]" />
      </svg>
    )
  },
  {
    id: 'proofs',
    num: '06',
    name: 'Trilhas de Auditoria',
    text: 'Toda alteração gera um log estruturado em disco local. O agente assina criptograficamente o histórico para assegurar integridade.',
    icon: (
      <svg viewBox="0 0 100 100" className="w-24 h-24 text-emerald-400 stroke-current fill-none" strokeWidth="1.5">
        <path d="M 50,20 L 80,32 L 80,62 C 80,78 50,88 50,88 C 50,88 20,78 20,62 L 20,32 Z" />
        <path d="M 38,50 L 46,58 L 62,42" stroke="#00e88f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
] as const

export function FeaturesGridSection() {
  const [active, setActive] = useState<number | null>(0)

  return (
    <section
      id="features"
      className="landing-surface relative border-t border-white/[0.06] py-24 sm:py-32 scroll-mt-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,232,143,0.03),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Cabeçalho Editorial */}
        <div className="max-w-2xl">
          <span className="section-kicker">Capacidades</span>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Habilidades desenhadas <br />
            <span className="text-emerald-400">para o operador.</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-400 sm:text-[17px]">
            Um runtime resiliente que evolui de acordo com a sua rotina, mantendo todos os blocos de dados salvos na sua própria infraestrutura local.
          </p>
        </div>

        {/* Layout de Duas Colunas: Lista Tipográfica vs Painel Visual */}
        <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:items-center">
          {/* Lado Esquerdo: Lista Interativa */}
          <div className="lg:col-span-7">
            <ul className="flex flex-col gap-6" onMouseLeave={() => setActive(0)}>
              {abilities.map((item, index) => {
                const isFocused = active === index
                const isDimmed = active !== null && active !== index

                return (
                  <li
                    key={item.num}
                    className="group border-b border-white/5 pb-6 transition-opacity duration-300"
                    style={{ opacity: isDimmed ? 0.35 : 1 }}
                    onMouseEnter={() => setActive(index)}
                  >
                    <div className="flex items-start gap-4 cursor-default">
                      <span className="font-mono text-xs text-neutral-500 mt-1">{item.num}</span>
                      <div className="flex-1">
                        <h3 className="text-lg sm:text-xl font-medium text-white group-hover:text-emerald-400 transition-colors duration-300">
                          {item.name}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-neutral-500 max-w-lg">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Lado Direito: Visualizador de Tecnologia Minimalista */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[280px] aspect-square rounded-2xl border border-white/5 bg-neutral-950/60 p-6 flex flex-col items-center justify-center backdrop-blur-sm relative overflow-hidden">
              {/* Moldura técnica flutuante */}
              <div className="absolute top-3 left-4 font-mono text-[8px] text-neutral-600 uppercase tracking-widest">
                {active !== null ? `cap_node_0${active + 1}` : 'monitoring'}
              </div>

              {/* Renderização do SVG da habilidade ativa */}
              <div className="flex-1 flex items-center justify-center">
                {active !== null ? abilities[active].icon : (
                  <svg viewBox="0 0 100 100" className="w-24 h-24 text-neutral-800 stroke-current fill-none" strokeWidth="1.5">
                    <circle cx="50" cy="50" r="30" />
                    <circle cx="50" cy="50" r="10" className="animate-pulse" />
                  </svg>
                )}
              </div>

              {/* Detalhe técnico rodapé */}
              <div className="absolute bottom-3 right-4 font-mono text-[8px] text-neutral-600 tracking-wider">
                ZAVORTH_LOCAL_V1
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
