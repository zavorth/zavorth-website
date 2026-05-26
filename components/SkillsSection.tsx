'use client'

import React, { useRef, useCallback } from 'react'
import { Shield, Database, Users, Sparkles, type LucideIcon } from 'lucide-react'

interface Module {
  title: string
  desc: string
  icon: LucideIcon
  span: string
  renderWidget: () => React.ReactNode
}

const modules: Module[] = [
  {
    title: 'Privacidade Total (100% Offline)',
    desc: 'Seus dados e arquivos nunca saem da sua máquina. O processamento é feito localmente, protegendo sua privacidade contra vazamentos na internet.',
    icon: Shield,
    span: 'col-span-12 md:col-span-6',
    renderWidget: () => (
      <div className="relative mt-6 h-28 w-full rounded-lg bg-black/40 border border-white/[0.04] overflow-hidden flex items-center justify-center font-mono text-[11px] text-neutral-400">
        <div className="flex items-center gap-6 z-10 scale-95 sm:scale-100">
          <div className="flex flex-col items-center gap-1">
            <span className="text-lg">📄</span>
            <span className="text-[10px] text-neutral-300">Seu Dado</span>
          </div>
          
          <div className="relative flex items-center justify-center w-10">
            <div className="h-0.5 w-10 bg-neutral-800" />
            <span className="absolute h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
          </div>

          <div className="flex flex-col items-center gap-1">
            <span className="text-lg font-bold text-amber-500">Z</span>
            <span className="text-amber-500 font-semibold text-[10px]">Zavorth</span>
          </div>

          <div className="relative flex items-center justify-center w-10">
            <div className="h-0.5 w-10 bg-red-950" />
            <span className="absolute text-[10px] text-red-500 font-bold">✕</span>
          </div>

          <div className="flex flex-col items-center gap-1 opacity-40">
            <span className="text-lg">☁</span>
            <span className="text-[10px]">Internet</span>
          </div>
        </div>
      </div>
    )
  },
  {
    title: 'IA Gratuita e Ilimitada',
    desc: 'Sem mensalidades, assinaturas ou limites de mensagens. Você tem controle absoluto rodando modelos de IA direto do seu próprio computador.',
    icon: Sparkles,
    span: 'col-span-12 md:col-span-6',
    renderWidget: () => (
      <div className="relative mt-6 h-28 w-full rounded-lg bg-black/40 border border-white/[0.04] overflow-hidden p-4 flex flex-col justify-between font-mono text-[11px]">
        <div className="flex justify-between items-center text-neutral-400">
          <span>PLANO ATUAL</span>
          <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded text-[10px] tracking-wide">LOCAL FOREVER</span>
        </div>
        
        <div className="flex justify-between items-end border-y border-white/[0.03] py-2">
          <div>
            <div className="text-neutral-500 text-[9px]">CUSTO MENSAL</div>
            <div className="text-white text-sm font-bold">R$ 0,00 <span className="text-[10px] font-normal text-neutral-500">/mês</span></div>
          </div>
          <div className="text-right">
            <div className="text-neutral-500 text-[9px]">LIMITE DE MENSAGENS</div>
            <div className="text-emerald-400 font-bold">∞ ILIMITADO</div>
          </div>
        </div>
        
        <div className="text-[9px] text-neutral-500 flex justify-between items-center">
          <span>Sem taxas de servidores</span>
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>
    )
  },
  {
    title: 'Memória Personalizada',
    desc: 'Permita que a IA consulte seus PDFs, anotações e códigos locais. O aprendizado é integrado e a busca de contexto é feita de forma privada.',
    icon: Database,
    span: 'col-span-12 md:col-span-6',
    renderWidget: () => (
      <div className="relative mt-6 h-28 w-full rounded-lg bg-black/40 border border-white/[0.04] overflow-hidden p-4 flex flex-col justify-between font-mono text-[11px]">
        <div className="flex justify-between items-center text-neutral-400">
          <span>BASE DE CONHECIMENTO</span>
          <span className="text-neutral-500 text-[10px] font-semibold">Ativa</span>
        </div>
        
        <div className="space-y-1.5 py-1">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-emerald-400">✓</span>
              <span className="truncate text-neutral-300 text-[11px]">planejamento.pdf</span>
            </div>
            <span className="text-neutral-500 text-[10px] shrink-0">1.2 MB</span>
          </div>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-1.5 truncate">
              <span className="text-emerald-400">✓</span>
              <span className="truncate text-neutral-300 text-[11px]">anotações_reunião.txt</span>
            </div>
            <span className="text-neutral-500 text-[10px] shrink-0">84 KB</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-[9px] text-neutral-500 border-t border-white/[0.03] pt-1.5">
          <span>Indexador de Contexto Local</span>
          <span className="text-amber-500 font-semibold">Seguro</span>
        </div>
      </div>
    )
  },
  {
    title: 'Assistentes Autônomos (Agentes)',
    desc: 'Configure agentes inteligentes que trabalham sozinhos ou em conjunto. Eles podem programar, buscar informações ou organizar relatórios.',
    icon: Users,
    span: 'col-span-12 md:col-span-6',
    renderWidget: () => (
      <div className="relative mt-6 h-28 w-full rounded-lg bg-black/40 border border-white/[0.04] overflow-hidden p-4 flex items-center justify-center font-mono text-[10px] text-neutral-400">
        <div className="flex items-center justify-between w-full max-w-[240px] relative px-2">
          {/* Agent 1 */}
          <div className="flex flex-col items-center gap-1 bg-white/[0.02] border border-white/[0.06] p-2 rounded-lg z-10 w-20">
            <span className="text-base">🤖</span>
            <span className="text-white font-semibold text-[9px]">Líder</span>
          </div>

          {/* Connection line */}
          <div className="absolute left-[65px] top-[22px] right-[65px] h-0.5 bg-neutral-800 z-0 overflow-hidden">
            <div className="absolute top-0 h-full w-4 bg-amber-500 rounded-full" style={{
              animation: 'pulseFlow 1.6s linear infinite'
            }} />
          </div>

          {/* Agent 2 */}
          <div className="flex flex-col items-center gap-1 bg-amber-500/5 border border-amber-500/20 p-2 rounded-lg z-10 w-20">
            <span className="text-base">💻</span>
            <span className="text-amber-500 font-semibold text-[9px]">Dev Agent</span>
          </div>
        </div>
      </div>
    )
  }
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
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl zavorth-heading-display">
            A potência da IA local de forma <span className="text-amber-gradient">simples</span>.
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
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
                  bg-[#0a0a0a]/80 p-6 sm:p-8 backdrop-blur-sm
                  transition-all duration-300 ease-out
                  hover:-translate-y-0.5 hover:border-white/[0.12]
                `}
              >
                {/* Badge row */}
                <div className="mb-4 flex items-center gap-2.5">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-amber-500">
                    Módulo {moduleNumber}
                  </span>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-amber-500">
                    Ativo
                  </span>
                </div>

                {/* Content */}
                <div className="flex gap-4 items-start mb-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                    <Icon className="h-5 w-5 text-amber-500" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                      {mod.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-neutral-400">
                      {mod.desc}
                    </p>
                  </div>
                </div>

                {/* Custom Interactive Widget */}
                {mod.renderWidget()}
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

        @keyframes pulseFlow {
          0% { left: -16px; }
          100% { left: 100%; }
        }
      `}</style>
    </section>
  )
}
