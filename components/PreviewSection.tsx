'use client'

import React, { useLayoutEffect, useState, useRef, useEffect } from 'react'
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

  useLayoutEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-prev-reveal]',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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

  // Handle simulation run/reset
  const handleApprove = () => {
    if (stepStates !== 'preview') return
    setStepStates('authorizing')

    // Simulate flow authorization execution
    setTimeout(() => {
      setStepStates('completed')
      // Add transaction receipt to history feed
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

  return (
    <section id="preview" ref={rootRef} className="relative section-rhythm overflow-hidden py-24 sm:py-32">
      {/* Background radial lights */}
      <div className="absolute inset-0 bg-[#060608] -z-20" />
      <div className="absolute right-[10%] top-[25%] -z-10 h-[380px] w-[380px] rounded-full bg-[#f59e0b]/3 blur-[120px]" />
      <div className="absolute left-[5%] bottom-[10%] -z-10 h-[340px] w-[340px] rounded-full bg-cyan-500/4 blur-[100px]" />

      <div className="mx-auto max-w-content px-5 sm:px-6 relative z-10">
        
        {/* Header */}
        <div data-prev-reveal className="mb-16 max-w-3xl">
          <p className="eyebrow mb-4">Mecanismo de Transparência</p>
          <h2 className="section-title-display mb-6 text-text-primary">
            Planejamento visível antes da ação.
            <br />
            <span className="text-text-muted">Sem surpresas operacionais.</span>
          </h2>
          <p className="max-w-xl text-body-lg text-text-muted">
            Antes de tocar em qualquer arquivo ou serviço, o Zavorth compila uma árvore lógica de ações e aguarda sua assinatura digital.
          </p>
        </div>

        {/* Dynamic Simulator Widget */}
        <div data-prev-reveal className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          
          {/* Left panel: Task selection and History feed */}
          <div className="flex flex-col gap-6">
            
            {/* Task selector */}
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.06] bg-[#0c0c0e]/30">
              <h3 className="font-bold text-[14px] text-text-primary mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
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
                          ? 'bg-amber-500/[0.04] border-amber-500/30 shadow-md' 
                          : 'bg-transparent border-white/[0.04] hover:bg-white/[0.02]'
                      }`}
                    >
                      <span className={`font-semibold text-[13.5px] ${isActive ? 'text-amber-500' : 'text-text-primary'}`}>
                        {task.name}
                      </span>
                      <span className="font-mono text-[10px] text-text-faint mt-1 truncate w-full">
                        {task.command}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Live operational audit feed */}
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.06] bg-[#0c0c0e]/30 flex-1 flex flex-col">
              <h3 className="font-bold text-[14px] text-text-primary mb-4 flex items-center gap-2">
                <History className="h-4 w-4 text-text-muted" />
                Histórico Operacional (Disco Local)
              </h3>
              
              <div className="flex-1 flex flex-col gap-3 font-mono text-[11px] leading-relaxed max-h-[160px] overflow-y-auto">
                {historyFeed.map((item) => (
                  <div key={item.id} className="flex gap-2 items-start text-text-muted">
                    <span className="text-text-faint shrink-0">[{item.time}]</span>
                    <span className="text-emerald-400 shrink-0">✓</span>
                    <span className="truncate">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right panel: Dynamic flow builder node graph simulation */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/[0.06] bg-[#0c0c0e]/40 backdrop-blur-md shadow-2xl flex flex-col justify-between min-h-[380px]">
            
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.05] pb-4 mb-6">
                <div>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-text-faint">Visualizador de Plano</span>
                  <h4 className="font-bold text-[15px] text-text-primary mt-0.5">{activeTask.name}</h4>
                </div>
                <div className={`px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider ${
                  stepStates === 'preview' 
                    ? 'bg-amber-500/10 text-amber-500' 
                    : stepStates === 'authorizing'
                    ? 'bg-blue-500/10 text-blue-500 animate-pulse'
                    : 'bg-emerald-500/10 text-emerald-500'
                }`}>
                  {stepStates === 'preview' ? 'AGUARDANDO ASSINATURA' : stepStates === 'authorizing' ? 'EXECUTANDO...' : 'EXECUTADO'}
                </div>
              </div>

              {/* Dynamic steps visual flow */}
              <div className="space-y-6 relative pl-6 border-l border-white/[0.06] ml-3.5 py-2">
                {activeTask.steps.map((step, idx) => {
                  let statusColor = 'border-white/10 bg-[#0c0c0e] text-text-faint'
                  let textColor = 'text-text-muted'
                  let icon = <HelpCircle className="h-3.5 w-3.5" />

                  if (step.status === 'success' || (stepStates === 'completed')) {
                    statusColor = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                    textColor = 'text-text-primary'
                    icon = <CheckCircle2 className="h-3.5 w-3.5" />
                  } else if (step.status === 'warning') {
                    if (stepStates === 'preview') {
                      statusColor = 'border-amber-500/40 bg-amber-500/10 text-amber-500 animate-pulse'
                      textColor = 'text-text-primary'
                      icon = <AlertTriangle className="h-3.5 w-3.5" />
                    } else if (stepStates === 'authorizing') {
                      statusColor = 'border-blue-500/40 bg-blue-500/10 text-blue-500 animate-pulse'
                      textColor = 'text-text-primary'
                      icon = <Play className="h-3.5 w-3.5 animate-spin" />
                    }
                  }

                  return (
                    <div key={idx} className="relative transition-all duration-300">
                      {/* Node point marker */}
                      <div 
                        className={`absolute -left-[37px] top-1.5 h-6.5 w-6.5 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${statusColor}`}
                      >
                        {icon}
                      </div>

                      {/* Text content */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`font-mono text-[13px] font-bold ${textColor}`}>
                            {step.label}
                          </span>
                          {step.status === 'warning' && stepStates === 'preview' && (
                            <span className="rounded bg-amber-500/10 px-1.5 py-0.5 text-[8.5px] font-mono font-bold text-amber-500 uppercase tracking-wider">
                              CRÍTICO (Exige Assinatura)
                            </span>
                          )}
                        </div>
                        <p className="text-[12px] text-text-faint mt-0.5">{step.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Interaction CTA */}
            <div className="mt-8 border-t border-white/[0.05] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11.5px] text-text-muted italic max-w-xs text-center sm:text-left">
                {stepStates === 'preview' 
                  ? 'Ações marcadas em âmbar exigem sua confirmação explícita.' 
                  : stepStates === 'authorizing'
                  ? 'Runtime local executando operações em ambiente isolado...'
                  : 'Recibo operacional gerado no disco local com chave criptográfica.'
                }
              </span>

              {stepStates === 'preview' ? (
                <button
                  onClick={handleApprove}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 text-black font-semibold text-[13px] flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors shadow-lg hover:shadow-amber-500/10"
                >
                  <span>Autorizar Plano</span>
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
              ) : (
                <button
                  onClick={() => handleReset(activeTask)}
                  disabled={stepStates === 'authorizing'}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl border text-[13px] font-medium flex items-center justify-center gap-2 transition-colors ${
                    stepStates === 'authorizing'
                      ? 'border-white/5 bg-white/[0.01] text-text-faint cursor-not-allowed'
                      : 'border-white/[0.08] bg-transparent text-text-muted hover:text-text-primary hover:bg-white/[0.02]'
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
