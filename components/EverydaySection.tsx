'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ensureGsapPlugins } from './motion'
import { Code2, BookOpen, BarChart3 } from 'lucide-react'

const SCENARIOS = [
  {
    id: 'devs',
    label: 'Desenvolvedores',
    icon: Code2,
    title: 'Automação de Código',
    desc: 'O Zavorth lê seus repositórios, sugere melhorias e executa testes localmente. Nenhuma linha de código vai para APIs externas.',
    accent: '#38bdf8', // sky
    glow: 'from-sky-500/10',
    code: `zavorth review --dry-run

> [agent] Lendo repositório local...
> [policy] Acesso aprovado.
> [done] Patch de correção gerado.`,
  },
  {
    id: 'academics',
    label: 'Pesquisadores',
    icon: BookOpen,
    title: 'Estudo Profundo',
    desc: 'Consuma PDFs acadêmicos e livros inteiros. O banco vetorial local indexa tudo na sua máquina para buscas sem delay.',
    accent: '#a78bfa', // violet
    glow: 'from-violet-500/10',
    code: `zavorth chat "Fichar capítulo 3"

> [mnemos] Indexando livro.pdf...
> [agent] Lendo páginas 42-78...
> [done] 5 conceitos mapeados.`,
  },
  {
    id: 'business',
    label: 'Empreendedores',
    icon: BarChart3,
    title: 'Gestão de Dados',
    desc: 'Extraia insights de planilhas e estruture dados comerciais. Seus números de negócio nunca saem do seu computador.',
    accent: '#fbbf24', // amber
    glow: 'from-amber-500/10',
    code: `zavorth run "Relatório do mês"

> [mnemos] Lendo vendas.xlsx...
> [agent] Analisando transações...
> [done] Faturamento: R$ 24.300`,
  },
]

const textAccentClasses: Record<string, string> = {
  devs: 'text-sky-400',
  academics: 'text-violet-400',
  business: 'text-amber-500',
}

export function EverydaySection() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-ev-card]',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current!,
            start: 'top 75%',
            once: true,
          },
        }
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="everyday"
      className="relative bg-[#050505] border-t border-white/[0.04] py-24 sm:py-32 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-white/[0.015] blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[1100px] px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-5">
            Zavorth na Prática
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white leading-[1.2] mb-5">
            Poderoso. Invisível. Para você.
          </h2>
          <p className="text-[15px] text-neutral-400 leading-relaxed">
            Não importa se você está escrevendo código, estudando para uma tese ou gerenciando um negócio — o agente se adapta ao seu fluxo com 100% de privacidade.
          </p>
        </div>

        {/* 3-Column Premium Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {SCENARIOS.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.id}
                data-ev-card
                className="group relative flex flex-col rounded-3xl border border-white/[0.06] bg-[#0a0a0c] overflow-hidden transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_0_40px_rgba(255,255,255,0.02)]"
              >
                {/* Hover Top Glow */}
                <div className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${s.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                {/* Content Area */}
                <div className="p-8 sm:p-10 flex-1 relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    {/* Icon Box */}
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.05] shadow-inner group-hover:scale-105 transition-transform duration-500">
                      <Icon className="w-5 h-5 drop-shadow-md" style={{ color: s.accent }} strokeWidth={1.5} />
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-neutral-500 font-medium">
                      {s.label}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-medium text-neutral-100 mb-4 tracking-tight">
                    {s.title}
                  </h3>
                  <p className="text-[14px] text-neutral-400 leading-[1.7] font-light">
                    {s.desc}
                  </p>
                </div>

                {/* Nested Terminal Box */}
                <div className="relative z-10 mx-6 mb-6 rounded-2xl border border-white/[0.05] bg-[#000] shadow-[inset_0_1px_0_rgba(255,255,255,0.02)] overflow-hidden transition-transform duration-500 group-hover:-translate-y-1">
                  
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 px-5 py-3.5 bg-white/[0.01] border-b border-white/[0.04]">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-white/[0.1] group-hover:bg-[#ff5f56] transition-colors duration-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/[0.1] group-hover:bg-[#ffbd2e] transition-colors duration-300 delay-75" />
                      <div className="w-2.5 h-2.5 rounded-full bg-white/[0.1] group-hover:bg-[#27c93f] transition-colors duration-300 delay-150" />
                    </div>
                  </div>

                  {/* Terminal Body */}
                  <div className="p-5 font-mono text-[12px] leading-[1.7] text-neutral-400">
                    {s.code.split('\n').map((line, idx) => {
                      if (line.startsWith('zavorth')) {
                        return (
                          <div key={idx} className="text-neutral-200 mb-3">
                            <span className="text-neutral-600 mr-2">$</span>
                            {line}
                          </div>
                        )
                      }
                      
                      if (line.startsWith('> [')) {
                        const tagEnd = line.indexOf(']')
                        const tag = line.substring(2, tagEnd + 1)
                        const text = line.substring(tagEnd + 2)
                        
                        let tagColor = 'text-neutral-500'
                        if (tag.includes('agent') || tag.includes('mnemos')) {
                          tagColor = `${textAccentClasses[s.id] || 'text-amber-500'} opacity-80`
                        }
                        if (tag.includes('done')) tagColor = 'text-emerald-400 opacity-80'
                        
                        return (
                          <div key={idx} className="flex gap-2">
                            <span className="text-neutral-700 select-none">›</span>
                            <div>
                              <span className={tagColor}>
                                {tag}
                              </span>
                              {' '}
                              <span className="text-neutral-400/80">{text}</span>
                            </div>
                          </div>
                        )
                      }
                      
                      return <div key={idx} className="min-h-[14px]" />
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
