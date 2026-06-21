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
  const [displayedCommand, setDisplayedCommand] = useState(SIMULATED_TASKS[0].command)
  const [historyFeed, setHistoryFeed] = useState<{ id: string; time: string; text: string }[]>([
    { id: 'h1', time: '10:42', text: 'Zavorth inicializado no escopo /home/workspace' },
    { id: 'h2', time: '11:05', text: 'Permissões do Slack validadas via SecretRef' }
  ])

  // Autotyping simulator for selected task command
  useEffect(() => {
    setDisplayedCommand('')
    let currentIdx = 0
    const cmd = activeTask.command
    const interval = setInterval(() => {
      setDisplayedCommand(prev => prev + cmd.charAt(currentIdx))
      currentIdx++
      if (currentIdx >= cmd.length) {
        clearInterval(interval)
      }
    }, 15)
    return () => clearInterval(interval)
  }, [activeTask])

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
    <section id="preview" ref={rootRef} className="relative section-rhythm overflow-hidden py-16 sm:py-20">
      {/* Background radial lights */}
      <div className="absolute inset-0 bg-[#060608] -z-20" />
      <div className="absolute right-[10%] top-[25%] -z-10 h-[380px] w-[380px] rounded-full bg-[#f59e0b]/3 blur-[120px] pointer-events-none" />
      <div className="absolute left-[5%] bottom-[10%] -z-10 h-[340px] w-[340px] rounded-full bg-cyan-500/4 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        
        {/* Header */}
        <div data-prev-reveal className="mb-10 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500 mb-3">Mecanismo de Transparência</p>
          <h2 className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight mb-4">
            Planejamento visível antes da ação.
            <br />
            <span className="text-neutral-500">Sem surpresas operacionais.</span>
          </h2>
          <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-neutral-400">
            Antes de tocar em qualquer arquivo ou serviço, o Zavorth compila uma árvore lógica de ações e aguarda sua assinatura digital.
          </p>
        </div>

        {/* Dynamic Simulator Widget */}
        <div data-prev-reveal className="grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:gap-8">
          
          {/* Left panel: Task selection and History feed */}
          <div className="flex flex-col gap-4">
            
            {/* Task selector */}
            <div
              onMouseMove={handleMouseMove}
              className="spotlight-card spotlight-border relative p-4.5 rounded-2xl border border-white/[0.06] bg-[#0c0c0e]/30 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
            >
              <h3 className="font-bold text-[12.5px] text-white mb-3 flex items-center gap-2 select-none">
                <Sparkles className="h-3.5 w-3.5" style={{ color: '#f59e0b' }} />
                Selecione uma tarefa simulada:
              </h3>
              
              <div className="flex flex-col gap-2">
                {SIMULATED_TASKS.map((task) => {
                  const isActive = activeTask.id === task.id
                  return (
                    <button
                      key={task.id}
                      onClick={() => handleReset(task)}
                      className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-300 ${
                        isActive 
                          ? 'bg-amber-500/10 border-amber-500/30 shadow-[inset_0_1px_1px_rgba(245,158,11,0.05)]' 
                          : 'bg-transparent border-white/[0.04] hover:bg-white/[0.02] border-transparent'
                      }`}
                    >
                      <span className={`font-semibold text-[12.5px] ${isActive ? 'text-amber-400' : 'text-neutral-200'}`}>
                        {task.name}
                      </span>
                      <span className="font-mono text-[9px] text-neutral-500 mt-1 truncate w-full">
                        {isActive ? (
                          <>
                            {displayedCommand}
                            {displayedCommand.length < task.command.length && (
                              <span className="animate-pulse text-amber-500">|</span>
                            )}
                          </>
                        ) : (
                          task.command
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Live operational audit feed */}
            <div
              onMouseMove={handleMouseMove}
              className="spotlight-card spotlight-border relative p-4.5 rounded-2xl border border-white/[0.06] bg-[#0c0c0e]/30 flex-1 flex flex-col overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]"
            >
              <h3 className="font-bold text-[12.5px] text-white mb-3 flex items-center gap-2 select-none">
                <History className="h-3.5 w-3.5 text-neutral-400" />
                Histórico Operacional (Disco Local)
              </h3>
              
              <div className="flex-1 flex flex-col gap-2.5 font-mono text-[10px] leading-relaxed max-h-[110px] overflow-y-auto">
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
            className="spotlight-card spotlight-border relative p-4.5 sm:p-5.5 rounded-2xl border border-white/[0.06] bg-[#0c0c0e]/40 backdrop-blur-md shadow-[0_24px_50px_-15px_rgba(0,0,0,0.85)] flex flex-col justify-between min-h-[350px] overflow-hidden"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-3 mb-4">
                <div>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-500 select-none">Visualizador de Plano</span>
                  <h4 className="font-bold text-[14px] text-white mt-0.5">{activeTask.name}</h4>
                </div>
                <div className={`px-2.5 py-0.5 rounded-full text-[8px] font-mono font-bold tracking-wider ${
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
              <div className="space-y-4 relative pl-6 ml-3 py-1">
                {/* Glowing vertical connector line */}
                <div className={`absolute left-0 top-2.5 bottom-2.5 w-[2px] rounded-full transition-all duration-500 ${
                  stepStates === 'completed' 
                    ? 'bg-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]'
                    : stepStates === 'authorizing'
                    ? 'bg-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.3)]'
                    : 'bg-white/[0.06]'
                }`} />

                {activeTask.steps.map((step, idx) => {
                  let statusColor = 'border-white/10 bg-[#0c0c0e] text-neutral-600'
                  let textColor = 'text-neutral-400'
                  let icon = <HelpCircle className="h-3 w-3" />
                  let isPulse = false

                  if (step.status === 'success' || (stepStates === 'completed')) {
                    statusColor = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    textColor = 'text-white'
                    icon = <CheckCircle2 className="h-3 w-3" />
                  } else if (step.status === 'warning') {
                    if (stepStates === 'preview') {
                      statusColor = 'border-amber-500/50 bg-amber-500/10 text-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.15)]'
                      textColor = 'text-neutral-200'
                      icon = <AlertTriangle className="h-3 w-3" />
                      isPulse = true
                    } else if (stepStates === 'authorizing') {
                      statusColor = 'border-blue-500/50 bg-blue-500/10 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.15)]'
                      textColor = 'text-neutral-200'
                      icon = <Play className="h-3 w-3 animate-pulse" fill="currentColor" />
                      isPulse = true
                    }
                  }

                  return (
                    <div key={idx} className="relative transition-all duration-300">
                      {/* Node point marker */}
                      <div 
                        className={`absolute -left-[31px] top-0.5 h-5 w-5 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-500 ${statusColor} ${isPulse ? 'animate-pulse' : ''}`}
                      >
                        {icon}
                      </div>

                      {/* Text content */}
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                          <span className={`font-mono text-[11.5px] font-bold ${textColor}`}>
                            {step.label}
                          </span>
                          {step.status === 'warning' && stepStates === 'preview' && (
                            <span className="rounded bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 text-[7px] font-mono font-extrabold text-amber-400 uppercase tracking-wider w-fit mt-0.5 sm:mt-0 select-none">
                              CRÍTICO (Exige Assinatura)
                            </span>
                          )}
                        </div>
                        <p className="text-[10.5px] text-neutral-500 mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Interaction CTA */}
            <div className="mt-5 border-t border-white/[0.05] pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[10px] text-neutral-500 italic max-w-xs text-center sm:text-left leading-relaxed">
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
                  className="w-full sm:w-auto px-4.5 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 font-semibold text-[12px] flex items-center justify-center gap-1.5 hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.12)] hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:scale-[1.03] active:scale-[0.97]"
                >
                  <span>Autorizar Plano</span>
                  <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                </button>
              ) : (
                <button
                  onClick={() => handleReset(activeTask)}
                  disabled={stepStates === 'authorizing'}
                  className={`w-full sm:w-auto px-4.5 py-2 rounded-full border text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 ${
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
