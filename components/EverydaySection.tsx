'use client'

import React, { useLayoutEffect, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { User, Palette, Code2, Briefcase, Zap, CheckSquare, Square, Play, RotateCcw } from 'lucide-react'
import { ensureGsapPlugins, initSpotlight, initTilt3D } from './motion'

// Personal Checkbox Demo Component
function PersonalDemo() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Organizar PDFs da Faculdade', completed: true },
    { id: 2, text: 'Mandar backup semanal p/ nuvem', completed: false },
    { id: 3, text: 'Enviar relatório via Telegram', completed: false }
  ])

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  return (
    <div className="rounded-xl border border-white/[0.05] bg-black/40 p-4 font-sans mt-4">
      <span className="font-mono text-[9px] text-text-faint uppercase tracking-wider block mb-2">Simulação de Rotina</span>
      <div className="space-y-2">
        {tasks.map(t => (
          <div 
            key={t.id} 
            onClick={() => toggleTask(t.id)}
            className="flex items-center gap-2.5 cursor-pointer select-none text-[12px] transition-colors hover:text-text-primary"
          >
            {t.completed ? (
              <CheckSquare className="h-4.5 w-4.5 text-amber-500 shrink-0" />
            ) : (
              <Square className="h-4.5 w-4.5 text-text-faint shrink-0" />
            )}
            <span className={t.completed ? 'line-through text-text-faint' : 'text-text-secondary'}>
              {t.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Creators Markdown Editor Demo Component
function CreatorsDemo() {
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor')
  const [content, setContent] = useState('# Roteiro Zavorth\n\n- [x] Gravar introdução local\n- [ ] Explicar SecretRef no vídeo\n- [ ] Mostrar sandbox local')

  return (
    <div className="rounded-xl border border-white/[0.05] bg-black/40 overflow-hidden mt-4">
      <div className="flex border-b border-white/[0.05] bg-[#09090b]/80 px-2 py-1.5 justify-between items-center">
        <span className="font-mono text-[9px] text-text-faint uppercase tracking-wider pl-1.5">Markdown Workspace</span>
        <div className="flex gap-1">
          <button 
            onClick={() => setActiveTab('editor')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono ${activeTab === 'editor' ? 'bg-white/[0.06] text-amber-500' : 'text-text-faint'}`}
          >
            EDIT
          </button>
          <button 
            onClick={() => setActiveTab('preview')}
            className={`px-2 py-0.5 rounded text-[10px] font-mono ${activeTab === 'preview' ? 'bg-white/[0.06] text-amber-500' : 'text-text-faint'}`}
          >
            PREVIEW
          </button>
        </div>
      </div>
      <div className="p-3 font-mono text-[11px] leading-relaxed min-h-[90px]">
        {activeTab === 'editor' ? (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent text-text-secondary outline-none border-none resize-none min-h-[80px]"
          />
        ) : (
          <div className="text-text-secondary space-y-1.5">
            <h4 className="font-bold border-b border-white/[0.04] pb-1 text-[12px]">{content.split('\n')[0].replace('# ', '')}</h4>
            <ul className="list-disc pl-4 space-y-1 text-text-muted">
              <li>Gravar introdução local ✓</li>
              <li>Explicar SecretRef no vídeo</li>
              <li>Mostrar sandbox local</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

// Developers Log Terminal Component
function DevelopersDemo() {
  const [logs, setLogs] = useState<string[]>([
    'zavorth config load... OK',
    'scanning workspace for vulnerability tests...'
  ])
  const [isRunning, setIsRunning] = useState(false)

  const runAudit = () => {
    if (isRunning) return
    setIsRunning(true)
    setLogs(prev => [...prev, 'Running static analysis security-audit.js...'])
    
    setTimeout(() => {
      setLogs(prev => [
        ...prev,
        '✓ 0 security issues found in client code',
        '✓ local credentials properly wrapped in SecretRef broker.'
      ])
      setIsRunning(false)
    }, 1000)
  }

  return (
    <div className="rounded-xl border border-white/[0.05] bg-[#070709] overflow-hidden mt-4">
      <div className="flex items-center justify-between border-b border-white/[0.05] bg-[#0c0c0e]/80 px-3 py-2">
        <span className="font-mono text-[9px] text-text-faint uppercase tracking-wider">Audit Console</span>
        <button 
          onClick={runAudit}
          disabled={isRunning}
          className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.05] text-[10px] font-mono text-text-secondary hover:text-amber-500 transition-colors"
        >
          <Play className="h-2.5 w-2.5" /> RUN
        </button>
      </div>
      <div className="p-3 font-mono text-[10px] text-emerald-400/80 leading-normal space-y-1 min-h-[85px] max-h-[120px] overflow-y-auto">
        {logs.map((log, idx) => (
          <div key={idx} className="truncate">
            <span className="text-text-faint select-none">❯ </span>
            {log}
          </div>
        ))}
      </div>
    </div>
  )
}

// Business Metrics SVG Graph Component
function BusinessDemo() {
  return (
    <div className="rounded-xl border border-white/[0.05] bg-black/40 p-4 mt-4 flex flex-col justify-between">
      <div className="flex justify-between items-center mb-3">
        <span className="font-mono text-[9px] text-text-faint uppercase tracking-wider">Horas de Operação Automatizadas</span>
        <span className="font-mono text-[11px] text-emerald-400 font-bold">14.2x Economia</span>
      </div>
      {/* SVG Sparkline Graph */}
      <svg viewBox="0 0 100 30" className="w-full h-10 overflow-visible">
        <defs>
          <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Fill area */}
        <path d="M 0,30 L 0,22 L 20,24 L 40,15 L 60,18 L 80,5 L 100,2 L 100,30 Z" fill="url(#chart-grad)" />
        {/* Stroke line */}
        <path 
          d="M 0,22 L 20,24 L 40,15 L 60,18 L 80,5 L 100,2" 
          fill="none" 
          stroke="#f59e0b" 
          strokeWidth="1.5" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Reference points */}
        <circle cx="80" cy="5" r="1.5" fill="#fbbf24" />
        <circle cx="100" cy="2" r="1.5" fill="#fbbf24" />
      </svg>
    </div>
  )
}

// Power Users Mesh Simulator Component
function PowerUsersDemo() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  return (
    <div className="rounded-xl border border-white/[0.05] bg-[#070709] p-4 mt-4">
      <div className="flex justify-between items-center mb-3">
        <span className="font-mono text-[9px] text-text-faint uppercase tracking-wider">Mesh Node Router</span>
        <span className="font-mono text-[9px] text-text-secondary uppercase">Status: OK</span>
      </div>
      {/* Interlinked layout */}
      <div className="flex justify-between items-center font-mono text-[10px] text-text-secondary">
        {['CLI', 'WEB', 'NOTION', 'TELEGRAM'].map(node => {
          const isSelected = activeNode === node
          return (
            <div 
              key={node}
              onMouseEnter={() => setActiveNode(node)}
              onMouseLeave={() => setActiveNode(null)}
              className={`px-2 py-1 rounded border cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.25)]' 
                  : 'border-white/[0.05] bg-white/[0.01] hover:border-white/[0.1]'
              }`}
            >
              {node}
            </div>
          )
        })}
      </div>
    </div>
  )
}

interface BentoCardProps {
  label: string
  headline: string
  description: string
  index: number
  colSpanClass: string
}

function BentoCard({ 
  label,
  headline,
  description,
  index, 
  colSpanClass 
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const icons = [
    <User key="u" size={16} />,
    <Palette key="p" size={16} />,
    <Code2 key="c" size={16} />,
    <Briefcase key="b" size={16} />,
    <Zap key="z" size={16} />,
  ]

  // Micro-interactive preview showcase selector
  const rendersDemo = () => {
    switch (index) {
      case 0: return <PersonalDemo />
      case 1: return <CreatorsDemo />
      case 2: return <DevelopersDemo />
      case 3: return <BusinessDemo />
      case 4: return <PowerUsersDemo />
      default: return null
    }
  }

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const cleanupSpotlight = initSpotlight(card)
    const cleanupTilt = initTilt3D(card, 3) // Gentle tilt

    return () => {
      cleanupSpotlight()
      cleanupTilt()
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`spotlight-card spotlight-border glass-panel group flex flex-col justify-between p-6 transition-all duration-300 hover:border-amber-500/15 ${colSpanClass}`}
    >
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Header */}
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.03] border border-white/[0.05] text-text-muted transition-all duration-300 group-hover:bg-amber-500/10 group-hover:text-amber-500">
              {icons[index]}
            </div>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text-faint">
              {label}
            </span>
          </div>

          {/* Texts */}
          <h3 className="mb-2 text-[17px] font-bold leading-snug tracking-tight text-text-primary zavorth-display">
            {headline}
          </h3>
          <p className="text-[13px] leading-relaxed text-text-muted">
            {description}
          </p>
        </div>

        {/* Live Interactive Component */}
        <div className="mt-4">
          {rendersDemo()}
        </div>
      </div>
    </div>
  )
}

export function EverydaySection() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-everyday-reveal]',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current!,
            start: 'top 80%',
            once: true,
          }
        }
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const colSpans = [
    'col-span-12 md:col-span-6', // Personal
    'col-span-12 md:col-span-6', // Creators
    'col-span-12 lg:col-span-4 md:col-span-6', // Developers
    'col-span-12 lg:col-span-4 md:col-span-6', // Business
    'col-span-12 lg:col-span-4 md:col-span-12', // Power Users
  ]

  // Data mapping from AUDIENCES (we will keep descriptions/headlines consistent but enrich structures)
  const AUDIENCES_DATA = [
    {
      label: 'Uso pessoal',
      headline: 'Organize sua rotina com controle',
      description: 'Organize arquivos, resuma informações e automatize tarefas recorrentes sem expor seus diretórios na nuvem.'
    },
    {
      label: 'Criadores',
      headline: 'Roteirize e crie com segurança',
      description: 'Estruture roteiros, publique posts integrados e edite rascunhos em markdown sob auditoria local.'
    },
    {
      label: 'Desenvolvedores',
      headline: 'Analise código e rode testes locais',
      description: 'Busque brechas de segurança estáticas nos arquivos locais e mantenha relatórios de erros auditáveis.'
    },
    {
      label: 'Negócios',
      headline: 'Automatize operações com controle',
      description: 'Conecte tabelas, execute faturamentos automáticos e reduza custos operacionais sob recibo criptográfico.'
    },
    {
      label: 'Power users',
      headline: 'Combine tudo sem vazar dados',
      description: 'Una APIs locais, Web Scrapers e roteadores de mensageria em uma única árvore operacional transparente.'
    }
  ]

  return (
    <section id="everyday" ref={rootRef} className="relative section-rhythm overflow-hidden py-24 sm:py-32">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[#060608] -z-20" />
      <div className="absolute right-[10%] top-[10%] -z-10 h-[320px] w-[320px] rounded-full bg-amber-500/4 blur-[110px]" />
      <div className="absolute left-[15%] bottom-[10%] -z-10 h-[300px] w-[300px] rounded-full bg-cyan-500/4 blur-[100px]" />

      <div className="mx-auto max-w-content px-5 sm:px-6 relative z-10">
        {/* Header */}
        <div data-everyday-reveal className="mb-16 max-w-3xl">
          <p className="eyebrow mb-4">Caso de Uso</p>
          <h2 className="section-title-display mb-6 text-text-primary">
            Da organização do dia a dia
            <br />
            <span className="text-text-muted">aos fluxos avançados de negócios.</span>
          </h2>
          <p className="max-w-xl text-body-lg text-text-muted">
            O runtime do Zavorth foi construído para servir como um assistente de ação multi-perfil, mantendo sempre o sandbox e a aprovação ativa.
          </p>
        </div>

        {/* Bento Grid */}
        <div 
          data-everyday-reveal 
          className="grid grid-cols-12 gap-5"
        >
          {AUDIENCES_DATA.map((aud, i) => (
            <BentoCard
              key={aud.label}
              label={aud.label}
              headline={aud.headline}
              description={aud.description}
              index={i}
              colSpanClass={colSpans[i]}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
