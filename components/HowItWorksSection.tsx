'use client'

import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import { ensureGsapPlugins } from './motion'
import { Terminal, Shield, KeyRound, Play, FileText, CheckCircle2, ChevronRight } from 'lucide-react'

interface Phase {
  id: string
  number: string
  label: string
  title: string
  description: string
  terminalTitle: string
  icon: React.ReactNode
  colorClass: string
  accentColor: string
  lines: { prefix: string; text: string; color: string }[]
}

const PIPELINE_PHASES: Phase[] = [
  {
    id: 'request',
    number: '01',
    label: 'Requisição',
    title: 'Linguagem natural vira uma missão estruturada',
    description: 'Você escreve como fala. O runtime transforma a instrução em uma missão estruturada contendo escopo de arquivos, controle de canais e artefatos de saída.',
    terminalTitle: 'zavorth — parser.js',
    colorClass: 'text-violet-400 border-violet-500/30',
    accentColor: '#a78bfa',
    icon: <Terminal className="h-5 w-5" />,
    lines: [
      { prefix: '❯', text: '"Organize meus arquivos e avise no Telegram"', color: 'text-text-secondary' },
      { prefix: '⌁', text: 'mission.parse() → scope: filesystem, channel: telegram', color: 'text-text-faint' },
      { prefix: '⌁', text: 'risk: medium → requires approval envelope', color: 'text-amber-500' },
      { prefix: '✓', text: 'Mission structured. Forwarding to Policy Broker.', color: 'text-emerald-400' },
    ],
  },
  {
    id: 'policy',
    number: '02',
    label: 'Policy Broker',
    title: 'Um único plano de decisão governa tudo',
    description: 'Ferramentas, provedores, canais, skills, web fetch e gravações locais passam pelo mesmo árbitro de regras.',
    terminalTitle: 'zavorth — policy-broker.py',
    colorClass: 'text-blue-400 border-blue-500/30',
    accentColor: '#60a5fa',
    icon: <Shield className="h-5 w-5" />,
    lines: [
      { prefix: '⌁', text: 'policy.evaluate(mission)', color: 'text-text-faint' },
      { prefix: '│', text: 'tools: [fs.move, fs.mkdir] → ALLOWED', color: 'text-emerald-400' },
      { prefix: '│', text: 'channel: telegram.send → ALLOWED (configured)', color: 'text-emerald-400' },
      { prefix: '│', text: 'action: fs.delete → BLOCKED (requires approval)', color: 'text-amber-500' },
      { prefix: '✓', text: 'Policy resolved. 1 gate pending.', color: 'text-text-secondary' },
    ],
  },
  {
    id: 'approval',
    number: '03',
    label: 'Approval Gate',
    title: 'Ações sensíveis param aqui até você decidir',
    description: 'Aprovações são escopadas e auditáveis. Dashboard, CLI, Telegram ou Satellite — qualquer superfície resolve o envelope.',
    terminalTitle: 'zavorth — approval-gate.go',
    colorClass: 'text-amber-400 border-amber-500/30',
    accentColor: '#f59e0b',
    icon: <KeyRound className="h-5 w-5" />,
    lines: [
      { prefix: '⏳', text: 'Awaiting operator decision...', color: 'text-amber-500' },
      { prefix: '│', text: 'action: delete 3 files from /backup', color: 'text-text-faint' },
      { prefix: '│', text: 'surface: dashboard | cli | telegram | satellite', color: 'text-text-faint' },
      { prefix: '│', text: 'envelope: scoped, auditable, reversible', color: 'text-text-faint' },
      { prefix: '✓', text: 'Approved via Dashboard. Receipt generated.', color: 'text-emerald-400' },
    ],
  },
  {
    id: 'execution',
    number: '04',
    label: 'Execução',
    title: 'O runtime executa com sandbox e rollback',
    description: 'Subagentes, skills e ferramentas operam dentro de budgets e gates. Nada escala silenciosamente no terminal.',
    terminalTitle: 'zavorth — runtime.rs',
    colorClass: 'text-cyan-400 border-cyan-500/30',
    accentColor: '#22d3ee',
    icon: <Play className="h-5 w-5" />,
    lines: [
      { prefix: '▸', text: 'runtime.execute(mission, approval_envelope)', color: 'text-text-secondary' },
      { prefix: '│', text: 'mkdir /Trabalho/Faculdade', color: 'text-emerald-400' },
      { prefix: '│', text: 'move 36 files → /Trabalho', color: 'text-text-secondary' },
      { prefix: '│', text: 'telegram.send(summary) → delivered', color: 'text-emerald-400' },
      { prefix: '✓', text: 'Mission complete. Generating receipt.', color: 'text-emerald-400' },
    ],
  },
  {
    id: 'receipt',
    number: '05',
    label: 'Receipt',
    title: 'Cada ação gera um recibo operacional',
    description: 'O que aconteceu, o que mudou, o que foi bloqueado, se rollback existe. Exportável e auditável para governança completa.',
    terminalTitle: 'zavorth — receipt.json',
    colorClass: 'text-emerald-400 border-emerald-500/30',
    accentColor: '#34d399',
    icon: <FileText className="h-5 w-5" />,
    lines: [
      { prefix: '◉', text: 'Receipt #ZV-2026-0517-0042', color: 'text-amber-500' },
      { prefix: '│', text: 'actions: 37 executed, 0 failed, 3 blocked', color: 'text-text-secondary' },
      { prefix: '│', text: 'channels: telegram (delivered)', color: 'text-text-secondary' },
      { prefix: '│', text: 'approval: operator via dashboard', color: 'text-text-secondary' },
      { prefix: '│', text: 'rollback: available (24h window)', color: 'text-emerald-400' },
      { prefix: '✓', text: 'Receipt stored. Auditable.', color: 'text-emerald-400' },
    ],
  },
]

function HighFidelityTerminal({ phase }: { phase: Phase }) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])

  useEffect(() => {
    setDisplayedLines([])
    let lineIdx = 0
    let charIdx = 0
    let currentLineText = ''
    let interval: NodeJS.Timeout

    const typeNextChar = () => {
      if (lineIdx >= phase.lines.length) {
        clearInterval(interval)
        return
      }

      const fullText = phase.lines[lineIdx].text
      if (charIdx < fullText.length) {
        currentLineText += fullText[charIdx]
        setDisplayedLines(prev => {
          const next = [...prev]
          next[lineIdx] = currentLineText
          return next
        })
        charIdx++
      } else {
        lineIdx++
        charIdx = 0
        currentLineText = ''
      }
    }

    interval = setInterval(typeNextChar, 12)
    return () => clearInterval(interval)
  }, [phase])

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c0e]/80 backdrop-blur-2xl shadow-[0_24px_60px_rgba(0,0,0,0.8)] transition-all duration-500 hover:border-white/[0.12]">
      {/* Glow highlight */}
      <div 
        className="absolute -right-20 -top-20 h-40 w-40 rounded-full blur-[80px] opacity-40 transition-all duration-700" 
        style={{ backgroundColor: phase.accentColor }}
      />

      {/* Header bar styled like VS Code */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-[#070709]/90 px-4 py-3">
        <div className="flex items-center gap-2">
          {/* Mac controls */}
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]/80 transition-colors hover:bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]/80 transition-colors hover:bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]/80 transition-colors hover:bg-[#27c93f]" />
          </div>
          {/* Active file tab */}
          <div className="ml-4 flex items-center gap-1.5 rounded-t-md bg-[#0c0c0e] px-3 py-1 border border-b-0 border-white/[0.06] text-[11px] font-mono text-text-primary">
            <span style={{ color: phase.accentColor }}>{phase.icon}</span>
            <span>{phase.terminalTitle}</span>
          </div>
        </div>
        <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-text-faint">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          SYSTEM LIVE
        </span>
      </div>

      {/* Terminal Area */}
      <div className="p-6 font-mono text-[12.5px] leading-[1.8] text-text-secondary min-h-[190px]">
        {phase.lines.map((line, i) => {
          const isFinished = i < displayedLines.length
          const currentText = displayedLines[i] || ''
          if (i > displayedLines.length) return null

          return (
            <div key={i} className="flex gap-3">
              <span className="shrink-0 select-none text-text-faint text-right w-4">{i + 1}</span>
              <span className="shrink-0 select-none text-amber-500/70">{line.prefix}</span>
              <span className={line.color}>
                {currentText}
                {!isFinished && i === displayedLines.length - 1 && (
                  <span className="animate-pulse bg-amber-400 text-transparent ml-0.5 select-none">|</span>
                )}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export function HowItWorksSection() {
  const rootRef = useRef<HTMLElement>(null)
  const [activePhase, setActivePhase] = useState(0)
  const detailCardRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()
    const ctx = gsap.context(() => {
      // General section stagger entrance
      gsap.fromTo('[data-pipeline-reveal]', 
        { y: 30, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current!,
            start: 'top 80%',
            once: true
          }
        }
      )
    }, rootRef)
    return () => ctx.revert()
  }, [])

  // Fade transition for phase details card
  useEffect(() => {
    if (!detailCardRef.current) return
    gsap.fromTo(detailCardRef.current,
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
    )
  }, [activePhase])

  return (
    <section id="how-it-works" ref={rootRef} className="relative section-rhythm overflow-hidden py-24 sm:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#060608] -z-20" />
      <div 
        className="absolute left-1/2 top-1/2 -z-10 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px] transition-all duration-1000 ease-out"
        style={{ 
          backgroundColor: PIPELINE_PHASES[activePhase].accentColor,
          opacity: 0.08
        }}
      />
      
      {/* Grid line details in background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] -z-15 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

      <div className="mx-auto max-w-content px-5 sm:px-6 relative z-10">
        {/* Header */}
        <div data-pipeline-reveal className="mb-20 max-w-3xl">
          <p className="eyebrow mb-4">Pipeline de Execução</p>
          <h2 className="section-title-display mb-6 text-text-primary">
            Pedido. Política. Aprovação.
            <br />
            <span className="text-text-muted">Execução. Recibo operacional.</span>
          </h2>
          <p className="max-w-xl text-body-lg text-text-muted">
            Cada comando e ação do agente atravessa cinco etapas rígidas do nosso runtime 
            para garantir total segurança, privacidade local e controle absoluto.
          </p>
        </div>

        {/* Horizontal Timeline Connector Diagram */}
        <div data-pipeline-reveal className="mb-16 relative">
          {/* Glowing pathway */}
          <div className="absolute left-[5%] right-[5%] top-[24px] hidden h-[2px] bg-white/[0.04] md:block">
            {/* The active color gradient fill */}
            <div 
              className="h-full transition-all duration-700 ease-in-out rounded-full"
              style={{ 
                width: `${(activePhase / 4) * 100}%`,
                backgroundColor: PIPELINE_PHASES[activePhase].accentColor,
                boxShadow: `0 0 12px ${PIPELINE_PHASES[activePhase].accentColor}`
              }}
            />
          </div>

          {/* Timeline Nodes */}
          <div className="grid grid-cols-2 gap-4 md:flex md:justify-between md:gap-0">
            {PIPELINE_PHASES.map((phase, i) => {
              const isActive = activePhase === i
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(i)}
                  className={`group relative flex flex-col items-center p-4 rounded-xl transition-all duration-300 md:w-[18%] ${
                    isActive ? 'bg-white/[0.03] border border-white/[0.06] shadow-lg' : 'border border-transparent hover:bg-white/[0.01]'
                  }`}
                >
                  {/* Glowing connector point for active */}
                  <div 
                    className={`flex h-12 w-12 items-center justify-center rounded-full border-2 font-mono text-[12px] font-bold transition-all duration-500 ${
                      isActive
                        ? 'bg-black text-text-primary'
                        : 'border-white/10 bg-[#0c0c0e] text-text-faint group-hover:border-white/20 group-hover:text-text-muted'
                    }`}
                    style={{
                      borderColor: isActive ? phase.accentColor : 'transparent',
                      boxShadow: isActive ? `0 0 20px ${phase.accentColor}40` : 'none'
                    }}
                  >
                    <span className="transition-transform duration-300 group-hover:scale-110" style={{ color: isActive ? phase.accentColor : undefined }}>
                      {phase.icon}
                    </span>
                  </div>
                  
                  {/* Step details below */}
                  <span className={`mt-3 font-mono text-[10px] font-bold uppercase tracking-[0.12em] transition-colors duration-300 ${
                    isActive ? 'text-text-primary' : 'text-text-faint group-hover:text-text-muted'
                  }`}>
                    {phase.label}
                  </span>
                  
                  <span className="mt-1 font-mono text-[9px] text-text-faint font-medium">
                    Etapa {phase.number}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Cinematic Grid: Details Card & High-Fidelity Terminal */}
        <div data-pipeline-reveal className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-14 items-center">
          {/* Left: Dynamic glassmorphism Card */}
          <div 
            ref={detailCardRef}
            className="glass-panel p-8 rounded-2xl relative overflow-hidden min-h-[240px] border border-white/[0.06] shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-white/[0.01]"
          >
            {/* Visual glow indicator border */}
            <div 
              className="absolute left-0 top-0 bottom-0 w-[4px] transition-all duration-500"
              style={{ backgroundColor: PIPELINE_PHASES[activePhase].accentColor }}
            />
            
            <div className="flex items-center gap-2 mb-3">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: PIPELINE_PHASES[activePhase].accentColor }}>
                RUNTIME PHASE {PIPELINE_PHASES[activePhase].number}
              </span>
              <ChevronRight size={10} className="text-text-faint" />
              <span className="font-mono text-[10px] text-text-faint font-medium">
                {PIPELINE_PHASES[activePhase].id.toUpperCase()}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-text-primary leading-tight tracking-tight mb-4">
              {PIPELINE_PHASES[activePhase].title}
            </h3>
            
            <p className="text-[14px] leading-relaxed text-text-muted">
              {PIPELINE_PHASES[activePhase].description}
            </p>
          </div>

          {/* Right: Coding terminal simulation */}
          <div>
            <HighFidelityTerminal phase={PIPELINE_PHASES[activePhase]} />
          </div>
        </div>
      </div>
    </section>
  )
}
