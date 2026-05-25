'use client'

import React, { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ensureGsapPlugins } from './motion'
import { ArrowRight, Play, CheckCircle2, AlertTriangle, HelpCircle, History, Sparkles } from 'lucide-react'

interface FlowTask {
  id: string
  name: string
  command: string
  steps: {
    label: string
    status: 'success' | 'warning' | 'pending'
    description: string
  }[]
}

const SIMULATED_TASKS: FlowTask[] = [
  {
    id: 'organize',
    name: 'Organização de Workspace',
    command: 'zavorth run "Organize meus backups antigos e avise no Slack"',
    steps: [
      { label: 'fs.scan("/backups")', status: 'success', description: 'Escaneamento de 42 arquivos ZIP locais.' },
      { label: 'fs.delete_file(38 files)', status: 'warning', description: 'Ação crítica: Remoção de 38 arquivos antigos.' },
      { label: 'slack.send_message()', status: 'pending', description: 'Notificação de status no canal #infra.' }
    ]
  },
  {
    id: 'report',
    name: 'Relatório Semanal de Vendas',
    command: 'zavorth run "Gere o PDF de vendas e guarde no Drive"',
    steps: [
      { label: 'db.query("SELECT *")', status: 'success', description: 'Consulta no banco PostgreSQL local.' },
      { label: 'pdf.generate()', status: 'success', description: 'Geração de PDF de auditoria.' },
      { label: 'drive.upload()', status: 'warning', description: 'Ação crítica: Upload de arquivo para nuvem externa.' }
    ]
  }
]

export function PreviewSection() {
  const rootRef = useRef<HTMLElement>(null)
  const [activeTask, setActiveTask] = useState<FlowTask>(SIMULATED_TASKS[0])
  const [stepStates, setStepStates] = useState<'preview' | 'authorizing' | 'completed'>('preview')
  const [historyFeed, setHistoryFeed] = useState<{ id: string; time: string; text: string }[]>([
    { id: 'h1', time: '10:42', text: 'Zavorth inicializado no escopo /home/workspace' },
    { id: 'h2', time: '11:05', text: 'Permissões do Slack validadas via SecretRef' }
  ])

  useEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-prev-reveal]',
        { y: 25, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.08,
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

  const handleApprove = () => {
    if (stepStates !== 'preview') return
    setStepStates('authorizing')

    // Simulate flow authorization execution
    setTimeout(() => {
      setStepStates('completed')
      const now = new Date()
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
      setHistoryFeed(prev => [
        {
          id: String(Date.now()),
          time: timeStr,
          text: `Executado com sucesso: ${activeTask.name}`
        },
        ...prev
      ])
    }, 1200)
  }

  const handleReset = (task: FlowTask) => {
    setActiveTask(task)
    setStepStates('preview')
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <section id="preview" ref={rootRef} className="relative section-rhythm overflow-hidden py-24 sm:py-32">
      {/* Background radial lights */}
      <div className="absolute inset-0 bg-[#060608] -z-20" />
      <div className="absolute right-[10%] top-[25%] -z-10 h-[380px] w-[380px] rounded-full bg-[#f59e0b]/3 blur-[120px] pointer-events-none" />
      <div className="absolute left-[5%] bottom-[10%] -z-10 h-[340px] w-[340px] rounded-full bg-cyan-500/4 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        
        {/* Header */}
        <div data-prev-reveal className="mb-16 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500 mb-4">Mecanismo de Transparência</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight mb-6">
            Planejamento visível antes da ação.
            <br />
            <span className="text-neutral-500">Sem surpresas operacionais.</span>
          </h2>
          <p className="max-w-xl text-sm sm:text-base leading-relaxed text-neutral-400">
            Antes de tocar em qualquer arquivo ou serviço, o Zavorth compila uma árvore lógica de ações e aguarda sua assinatura digital.
          </p>
        </div>

        {/* Dynamic Simulator Widget */}
        <div data-prev-reveal className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          
          {/* Left panel: Task selection and History feed */}
          <div className="flex flex-col gap-6">
            
            {/* Task selector */}
            <div
              onMouseMove={handleMouseMove}
              className="spotlight-card spotlight-border relative p-6 rounded-2xl border border-white/[0.06] bg-[#0c0c0e]/30 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
            >
              <h3 className="font-bold text-[14px] text-white mb-4 flex items-center gap-2 select-none">
                <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
                Selecione uma tarefa simulada:
              </h3>
              
              <div className="flex flex-col gap-2.5">
                {SIMULATED_TASKS.map((task) => {
                  const isActive = activeTask.id === task.id
                  return (
                    <button
                      key={task.id}
                      onClick={() => handleReset(task)}
                      className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all duration-300 ${
                        isActive 
                          ? 'bg-amber-500/10 border-amber-500/30 shadow-[inset_0_1px_1px_rgba(245,158,11,0.05)]' 
                          : 'bg-transparent border-white/[0.04] hover:bg-white/[0.02] border-transparent'
                      }`}
                    >
                      <span className={`font-semibold text-[13.5px] ${isActive ? 'text-amber-400' : 'text-neutral-200'}`}>
                        {task.name}
                      </span>
                      <span className="font-mono text-[10px] text-neutral-500 mt-1.5 truncate w-full">
                        {task.command}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Live operational audit feed */}
            <div
              onMouseMove={handleMouseMove}
              className="spotlight-card spotlight-border relative p-6 rounded-2xl border border-white/[0.06] bg-[#0c0c0e]/30 flex-1 flex flex-col overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
            >
              <h3 className="font-bold text-[14px] text-white mb-4 flex items-center gap-2 select-none">
                <History className="h-4 w-4 text-neutral-400" />
                Histórico Operacional (Disco Local)
              </h3>
              
              <div className="flex-1 flex flex-col gap-3 font-mono text-[11px] leading-relaxed max-h-[160px] overflow-y-auto">
                {historyFeed.map((item) => (
                  <div key={item.id} className="flex gap-2 items-start text-neutral-400">
                    <span className="text-neutral-600 shrink-0">[{item.time}]</span>
                    <span className="text-emerald-400 shrink-0 font-bold">✓</span>
                    <span className="truncate">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right panel: Dynamic flow builder node graph simulation */}
          <div
            onMouseMove={handleMouseMove}
            className="spotlight-card spotlight-border relative p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-[#0c0c0e]/40 backdrop-blur-md shadow-[0_24px_50px_-15px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[420px] overflow-hidden"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-4 mb-6">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 select-none">Visualizador de Plano</span>
                  <h4 className="font-bold text-[15px] text-white mt-0.5">{activeTask.name}</h4>
                </div>
                <div className={`px-3 py-1 rounded-full text-[9px] font-mono font-bold tracking-wider ${
                  stepStates === 'preview' 
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                    : stepStates === 'authorizing'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse'
                    : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                }`}>
                  {stepStates === 'preview' ? 'AGUARDANDO ASSINATURA' : stepStates === 'authorizing' ? 'EXECUTANDO...' : 'EXECUTADO'}
                </div>
              </div>

              {/* Dynamic steps visual flow */}
              <div className="space-y-6 relative pl-7 ml-4 py-2">
                {/* Glowing vertical connector line */}
                <div className={`absolute left-0 top-3 bottom-3 w-[2px] rounded-full transition-all duration-500 ${
                  stepStates === 'completed' 
                    ? 'bg-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : stepStates === 'authorizing'
                    ? 'bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                    : 'bg-white/[0.06]'
                }`} />

                {activeTask.steps.map((step, idx) => {
                  let statusColor = 'border-white/10 bg-[#0c0c0e] text-neutral-600'
                  let textColor = 'text-neutral-400'
                  let icon = <HelpCircle className="h-3.5 w-3.5" />
                  let isPulse = false

                  if (step.status === 'success' || (stepStates === 'completed')) {
                    statusColor = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    textColor = 'text-white'
                    icon = <CheckCircle2 className="h-3.5 w-3.5" />
                  } else if (step.status === 'warning') {
                    if (stepStates === 'preview') {
                      statusColor = 'border-amber-500/50 bg-amber-500/10 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.15)]'
                      textColor = 'text-neutral-200'
                      icon = <AlertTriangle className="h-3.5 w-3.5" />
                      isPulse = true
                    } else if (stepStates === 'authorizing') {
                      statusColor = 'border-blue-500/50 bg-blue-500/10 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                      textColor = 'text-neutral-200'
                      icon = <Play className="h-3.5 w-3.5 animate-pulse" fill="currentColor" />
                      isPulse = true
                    }
                  }

                  return (
                    <div key={idx} className="relative transition-all duration-300">
                      {/* Node point marker */}
                      <div 
                        className={`absolute -left-[38px] top-1 h-7 w-7 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-500 ${statusColor} ${isPulse ? 'animate-pulse' : ''}`}
                      >
                        {icon}
                      </div>

                      {/* Text content */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <span className={`font-mono text-[12.5px] font-bold ${textColor}`}>
                            {step.label}
                          </span>
                          {step.status === 'warning' && stepStates === 'preview' && (
                            <span className="rounded bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[8px] font-mono font-extrabold text-amber-400 uppercase tracking-wider w-fit mt-1 sm:mt-0 select-none">
                              CRÍTICO (Exige Assinatura)
                            </span>
                          )}
                        </div>
                        <p className="text-[11.5px] text-neutral-500 mt-1">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Interaction CTA */}
            <div className="mt-8 border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] text-neutral-500 italic max-w-xs text-center sm:text-left leading-relaxed">
                {stepStates === 'preview' 
                  ? 'Ações marcadas com tarjas de risco exigem sua autorização explícita.' 
                  : stepStates === 'authorizing'
                  ? 'Runtime local executando operações seguras em ambiente isolado...'
                  : 'Recibo operacional gerado e assinado no disco local.'
                }
              </span>

              {stepStates === 'preview' ? (
                <button
                  onClick={handleApprove}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 font-semibold text-[13px] flex items-center justify-center gap-2 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.12)] hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:scale-[1.03] active:scale-[0.97]"
                >
                  <span>Autorizar Plano</span>
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </button>
              ) : (
                <button
                  onClick={() => handleReset(activeTask)}
                  disabled={stepStates === 'authorizing'}
                  className={`w-full sm:w-auto px-6 py-2.5 rounded-full border text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 ${
                    stepStates === 'authorizing'
                      ? 'border-white/5 bg-white/[0.01] text-neutral-600 cursor-not-allowed'
                      : 'border-white/[0.08] bg-[#0c0c0e]/60 hover:bg-white/[0.04] text-neutral-300 hover:text-white hover:scale-[1.02]'
                  }`}
                >
                  Simular Novamente
                </button>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
