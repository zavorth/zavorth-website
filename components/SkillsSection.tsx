'use client'

import { useRef, useCallback } from 'react'
import { Shield, Database, Users, Route, type LucideIcon } from 'lucide-react'

interface Module {
  title: string
  desc: string
  icon: LucideIcon
  span: string
}

const modules: Module[] = [
  {
    title: 'Broker de Segurança',
    desc: 'Audita chamadas de sistema em tempo real, bloqueando ações não autorizadas antes que cheguem ao modelo.',
    icon: Shield,
    span: 'col-span-12 md:col-span-7',
  },
  {
    title: 'Memória Local',
    desc: 'Indexador semântico embarcado que armazena contexto no dispositivo sem depender de nuvem externa.',
    icon: Database,
    span: 'col-span-12 md:col-span-5',
  },
  {
    title: 'Swarm v2',
    desc: 'Orquestração de múltiplos agentes com delegação hierárquica e supervisão centralizada.',
    icon: Users,
    span: 'col-span-12 md:col-span-5',
  },
  {
    title: 'Rotas de Fallback',
    desc: 'Roteamento com contingência automática entre provedores, garantindo uptime mesmo offline.',
    icon: Route,
    span: 'col-span-12 md:col-span-7',
  },
]

export function SkillsSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      const card = cardRefs.current[index]
      if (!card) return
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      card.style.setProperty('--mouse-x', `${x}px`)
      card.style.setProperty('--mouse-y', `${y}px`)
    },
    []
  )

  return (
    <section id="skills" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-14">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-amber-500">
            Módulos Nativos
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Funcionalidades essenciais do runtime.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-5">
          {modules.map((mod, i) => {
            const Icon = mod.icon
            const moduleNumber = String(i + 1).padStart(2, '0')

            return (
              <div
                key={mod.title}
                ref={(el) => { cardRefs.current[i] = el }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                className={`
                  spotlight-card spotlight-border group relative
                  ${mod.span}
                  overflow-hidden rounded-2xl border border-white/[0.06]
                  bg-[#0a0a0a]/80 p-8 backdrop-blur-sm
                  transition-all duration-300 ease-out
                  hover:-translate-y-0.5 hover:border-white/[0.12]
                `}
              >
                {/* Badge row */}
                <div className="mb-5 flex items-center gap-2.5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-500">
                    Módulo {moduleNumber}
                  </span>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-amber-500">
                    Ativo
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-amber-500/10">
                  <Icon className="h-7 w-7 text-amber-500" strokeWidth={1.5} />
                </div>

                {/* Content */}
                <h3 className="mb-2 text-lg font-bold text-white">
                  {mod.title}
                </h3>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {mod.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        .spotlight-card {
          position: relative;
        }
        .spotlight-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          background: radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(245, 158, 11, 0.06),
            transparent 40%
          );
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 1;
        }
        .spotlight-card:hover::before {
          opacity: 1;
        }
        .spotlight-border::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          background: radial-gradient(
            300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(245, 158, 11, 0.15),
            transparent 40%
          );
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          padding: 1px;
          transition: opacity 0.4s ease;
          pointer-events: none;
          z-index: 1;
        }
        .spotlight-card:hover::after {
          opacity: 1;
        }
      `}</style>
    </section>
  )
}
