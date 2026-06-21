'use client'

import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ensureGsapPlugins } from './motion'
import { Code2, BookOpen, BarChart3, ChevronsLeftRight } from 'lucide-react'

const SCENARIOS = [
  {
    id: 'devs',
    label: 'Desenvolvedores',
    icon: Code2,
    title: 'Automação de Código',
    accent: '#38bdf8', // sky
    glow: 'from-sky-500/10',
    before: {
      tag: 'MÉTODO ANTIGO',
      title: 'Friction & Chaves de API Expostas',
      desc: 'Desenvolvedores precisam exportar trechos de código manuais, colar em APIs externas e gerenciar chaves de API em variáveis de ambiente expostas na nuvem.',
      code: `cat patch.diff | curl -X POST https://external-review.api/analyze \\
  -H "Authorization: Bearer sk-proj-..."
  
[error] Rate limit exceeded. Try again in 42s.
[warn] API Key exposed in shell history.`,
    },
    after: {
      tag: 'PARADIGMA ZAVORTH',
      title: 'Review Local & Criptografia Selada',
      desc: 'O runtime local executa os testes na sua máquina de forma 100% privada. As chaves de API são resolvidas em runtime local de forma isolada.',
      code: `zavorth review --dry-run

> [agent] Lendo repositório local...
> [policy] Acesso aprovado.
> [done] Patch de correção gerado.`,
    }
  },
  {
    id: 'academics',
    label: 'Pesquisadores',
    icon: BookOpen,
    title: 'Estudo Profundo',
    accent: '#a78bfa', // violet
    glow: 'from-violet-500/10',
    before: {
      tag: 'MÉTODO ANTIGO',
      title: 'Recortes Manuais & Limite de Contexto',
      desc: 'Copiar e colar trechos de PDFs manualmente em janelas de chat de navegadores comerciais, sofrendo com limites de contexto e dados sendo usados para treino.',
      code: `Ctrl+C page 42 -> Paste to browser
Ctrl+C page 43 -> Paste to browser
[error] Context length exceeded (max 8k tokens).
[info] File upload failed: file too large.`,
    },
    after: {
      tag: 'PARADIGMA ZAVORTH',
      title: 'Indexação Vetorial Local & Sem Limites',
      desc: 'Zavorth cria um banco vetorial local indexado e criptografado na sua máquina. O processamento ocorre localmente sem limites de tamanho de arquivos.',
      code: `zavorth chat "Fichar capítulo 3"

> [mnemos] Indexando livro.pdf...
> [agent] Lendo páginas 42-78...
> [done] 5 conceitos mapeados.`,
    }
  },
  {
    id: 'business',
    label: 'Empreendedores',
    icon: BarChart3,
    title: 'Gestão de Dados',
    accent: '#fbbf24', // amber
    glow: 'from-amber-500/10',
    before: {
      tag: 'MÉTODO ANTIGO',
      title: 'Scripts de Terceiros & Dados Vulneráveis',
      desc: 'Subir planilhas de faturamento e dados comerciais sensíveis para ferramentas em nuvem, correndo o risco de vazamentos de dados corporativos.',
      code: `Excel -> Run Macro_Sales()
[runtime error] 1004: Application-defined error
curl -F "data=@vendas.xlsx" https://online-sheets-api...
[warning] Uploading financial data to public cloud.`,
    },
    after: {
      tag: 'PARADIGMA ZAVORTH',
      title: 'Swarm de Agentes Locais & SQLite Isolado',
      desc: 'Zavorth executa scripts de análise e consultas a bancos de dados localmente. Seus números de negócio permanecem sob seu controle absoluto.',
      code: `zavorth run "Relatório do mês"

> [mnemos] Lendo vendas.xlsx...
> [agent] Analisando transações...
> [done] Faturamento: R$ 24.300`,
    }
  }
]

const textAccentClasses: Record<string, string> = {
  devs: 'text-sky-400',
  academics: 'text-violet-400',
  business: 'text-amber-500',
}

export function EverydaySection() {
  const rootRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<'devs' | 'academics' | 'business'>('devs')
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)

  const activeScenario = SCENARIOS.find((s) => s.id === activeTab) || SCENARIOS[0]

  useEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-ev-reveal]',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPos(Math.max(0, Math.min(100, percentage)))
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    handleMove(e.clientX)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX)
    }
  }

  useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX)
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDragging])

  return (
    <section
      ref={rootRef}
      id="everyday"
      className="relative bg-[#050505] border-t border-white/[0.04] py-16 sm:py-20 overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-white/[0.015] blur-[100px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[1100px] px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
            Zavorth na Prática
          </p>
          <h2 className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-[1.2] mb-3">
            Poderoso. Invisível. Para você.
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-light">
            Não importa se você está escrevendo código, estudando para uma tese ou gerenciando um negócio — compare o método tradicional com o ganho de privacidade e agilidade do Zavorth.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-3 mb-8">
          {SCENARIOS.map((s) => {
            const Icon = s.icon
            const isActive = s.id === activeTab
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-medium font-mono uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-white/5 text-white'
                    : 'bg-transparent border-white/[0.05] text-neutral-500 hover:text-neutral-300 hover:border-white/[0.12]'
                }`}
                style={{
                  borderColor: isActive ? s.accent : undefined,
                  boxShadow: isActive ? `0 0 15px ${s.accent}20` : undefined,
                }}
              >
                <Icon className="w-3 h-3" style={{ color: isActive ? s.accent : '#737373' }} />
                {s.label}
              </button>
            )
          })}
        </div>

        {/* Interactive Split Comparison Slider */}
        <div data-ev-reveal className="space-y-3">
          <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            className="relative w-full h-[520px] sm:h-[430px] md:h-[350px] rounded-3xl border border-white/[0.06] bg-[#07070a]/40 overflow-hidden select-none cursor-ew-resize"
          >
            {/* 1. Left Pane (Traditional - Before) */}
            <div className="absolute inset-0 w-full h-full p-5 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#08080a]">
              {/* Left Content column */}
              <div className="flex-1 space-y-3 text-left max-w-md">
                <span className="inline-block font-mono text-[8px] font-bold uppercase tracking-wider text-red-500 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                  {activeScenario.before.tag}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-neutral-200 tracking-tight">
                  {activeScenario.before.title}
                </h4>
                <p className="text-[11.5px] sm:text-xs text-neutral-400 leading-relaxed font-light">
                  {activeScenario.before.desc}
                </p>
              </div>

              {/* Left Terminal Window */}
              <div className="w-full md:w-[365px] shrink-0 rounded-2xl border border-red-950/45 bg-[#0a0505]/90 overflow-hidden shadow-2xl">
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-red-950/10 border-b border-red-950/20">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/30" />
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                    <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
                  </div>
                  <span className="font-mono text-[8px] text-red-500/60 ml-2 uppercase tracking-widest font-bold">Fluxo Legado</span>
                </div>
                <div className="p-4 font-mono text-[10px] sm:text-[11px] leading-normal text-red-300/80 min-h-[110px]">
                  {activeScenario.before.code.split('\n').map((line, idx) => {
                    if (line.startsWith('cat') || line.startsWith('Ctrl+C') || line.startsWith('Excel')) {
                      return (
                        <div key={idx} className="text-neutral-400 mb-1.5">
                          <span className="text-neutral-700 mr-1.5">$</span>
                          {line}
                        </div>
                      )
                    }
                    return <div key={idx} className="text-red-400/80">{line}</div>
                  })}
                </div>
              </div>
            </div>

            {/* 2. Right Pane (Zavorth - After) - Clipped dynamically by sliderPos */}
            <div
              className="absolute inset-0 w-full h-full p-5 sm:p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#040405]"
              style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
            >
              {/* Right Content column */}
              <div className="flex-1 space-y-3 text-left max-w-md">
                <span
                  className="inline-block font-mono text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border"
                  style={{
                    color: activeScenario.accent,
                    borderColor: `${activeScenario.accent}33`,
                    backgroundColor: `${activeScenario.accent}11`,
                  }}
                >
                  {activeScenario.after.tag}
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {activeScenario.after.title}
                </h4>
                <p className="text-[11.5px] sm:text-xs text-neutral-300 leading-relaxed font-light">
                  {activeScenario.after.desc}
                </p>
              </div>

              {/* Right Terminal Window */}
              <div
                className="w-full md:w-[365px] shrink-0 rounded-2xl border bg-black/90 overflow-hidden shadow-2xl"
                style={{ borderColor: `${activeScenario.accent}44` }}
              >
                <div className="flex items-center gap-1.5 px-4 py-2.5 border-b" style={{ borderColor: `${activeScenario.accent}1a`, backgroundColor: `${activeScenario.accent}05` }}>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/40" />
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40" />
                  </div>
                  <span className="font-mono text-[8px] ml-2 uppercase tracking-widest font-bold" style={{ color: activeScenario.accent }}>Zavorth Runtime</span>
                </div>
                <div className="p-4 font-mono text-[10px] sm:text-[11px] leading-normal text-neutral-300 min-h-[110px]">
                  {activeScenario.after.code.split('\n').map((line, idx) => {
                    if (line.startsWith('zavorth')) {
                      return (
                        <div key={idx} className="text-white mb-1.5">
                          <span className="text-neutral-600 mr-1.5">$</span>
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
                        tagColor = `${textAccentClasses[activeScenario.id] || 'text-amber-500'} opacity-80`
                      }
                      if (tag.includes('done')) tagColor = 'text-emerald-400 opacity-80'
                      
                      return (
                        <div key={idx} className="flex gap-1.5">
                          <span className="text-neutral-700 select-none">›</span>
                          <div>
                            <span className={tagColor}>{tag}</span>
                            {' '}
                            <span className="text-neutral-400">{text}</span>
                          </div>
                        </div>
                      )
                    }
                    return <div key={idx} className="min-h-[12px]" />
                  })}
                </div>
              </div>
            </div>

            {/* 3. Slider Divider Line */}
            <div
              className="absolute top-0 bottom-0 w-[2px] pointer-events-none z-20"
              style={{
                left: `${sliderPos}%`,
                background: `linear-gradient(to bottom, transparent, ${activeScenario.accent}, transparent)`,
              }}
            />

            {/* 4. Slider Handle Button */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-zinc-950 border border-white/20 flex items-center justify-center pointer-events-none z-30 transition-shadow duration-300"
              style={{
                left: `${sliderPos}%`,
                boxShadow: `0 0 12px ${activeScenario.accent}44`,
              }}
            >
              <ChevronsLeftRight className="w-3.5 h-3.5" style={{ color: activeScenario.accent }} />
            </div>
          </div>

          <div className="flex justify-between items-center px-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
            <span>← Modo Tradicional</span>
            <span>Arraste para comparar</span>
            <span>Fluxo Zavorth →</span>
          </div>
        </div>

      </div>
    </section>
  )
}
