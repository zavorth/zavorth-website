'use client'

import React, { useState } from 'react'
import { Terminal, Shield, FileCheck, HelpCircle, Check, Play, AlertTriangle } from 'lucide-react'

const steps = [
  {
    num: '01',
    title: 'Comando Natural',
    description: 'Insira suas metas em linguagem humana livre pelo Dashboard, TUI ou canais integrados autorizados.'
  },
  {
    num: '02',
    title: 'Análise e Plano',
    description: 'O compilador local analisa o objetivo, mapeia arquivos, reúne ferramentas e propõe um plano de execução.'
  },
  {
    num: '03',
    title: 'Portão de Decisão',
    description: 'Ações que possam modificar arquivos ou acessar a rede geram uma prévia de risco e aguardam sua aprovação.'
  },
  {
    num: '04',
    title: 'Recibo Assinado',
    description: 'Após a execução em sandbox local, o Zavorth salva um registro de auditoria criptografado e legível no disco.'
  }
] as const

export function WhatItDoesSection() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <section
      id="how-it-works"
      className="landing-surface relative border-t border-white/[0.06] py-24 sm:py-32 overflow-hidden scroll-mt-20"
    >
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-[300px] w-[500px] rounded-full bg-emerald-500/[0.01] blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        
        {/* Header Block */}
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-start md:gap-12 text-left">
          <div className="w-full md:w-1/3">
            <span className="section-kicker">Ciclo Operacional</span>
            <h2 className="mt-6 font-display text-4xl font-semibold leading-none tracking-tight text-white sm:text-5xl">
              Como o agente<br />
              <span className="text-emerald-400">executa tarefas</span>
            </h2>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg leading-relaxed text-neutral-300 font-light">
              O Zavorth segue um fluxo contínuo e governado localmente, garantindo que cada comando passe por planejamento, análise de segurança e confirmação manual do operador antes da execução. Passe o cursor sobre os passos para inspecionar o comportamento do terminal.
            </p>
          </div>
        </div>

        {/* 2-Column Layout */}
        <div className="grid gap-8 lg:grid-cols-12 items-center">
          
          {/* Left Column: Interactive Steps List */}
          <div className="lg:col-span-5 flex flex-col gap-4 text-left">
            {steps.map((step, idx) => {
              const isActive = idx === activeStep
              return (
                <div
                  key={step.num}
                  className={`flex gap-4 p-5 rounded-xl border transition-all duration-300 cursor-pointer ${
                    isActive 
                      ? 'border-emerald-500/20 bg-emerald-500/[0.02] shadow-[0_4px_20px_rgba(16,185,129,0.04)]' 
                      : 'border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08]'
                  }`}
                  onMouseEnter={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                    isActive 
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400' 
                      : 'border-white/[0.06] bg-white/[0.02] text-neutral-400'
                  }`}>
                    <span className="font-mono text-xs font-bold">{step.num}</span>
                  </div>
                  <div>
                    <h3 className={`font-display text-sm font-semibold transition-colors duration-300 ${
                      isActive ? 'text-emerald-400' : 'text-white'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-neutral-400 font-light">
                      {step.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right Column: Dynamic Terminal View */}
          <div className="lg:col-span-7 h-[280px] flex flex-col rounded-xl border border-white/[0.08] bg-[#050608] shadow-[0_24px_50px_rgba(0,0,0,0.6)] overflow-hidden">
            
            {/* Terminal Top Bar */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3 select-none">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[8px] uppercase tracking-wider text-neutral-500">
                {activeStep === 0 && 'ZAVORTH INPUT GATE'}
                {activeStep === 1 && 'ZAVORTH COMPILER PLANNER'}
                {activeStep === 2 && 'ZAVORTH SECURITY WATCH'}
                {activeStep === 3 && 'ZAVORTH AUDIT SIGNER'}
              </span>
            </div>

            {/* Terminal Window Content */}
            <div className="p-6 flex-1 font-mono text-[10px] sm:text-[11px] leading-relaxed text-neutral-300 select-none text-left overflow-y-auto">
              
              {activeStep === 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-1.5 text-white">
                    <span className="text-emerald-400">❯</span>
                    <span className="after:content-['_'] after:animate-ping">zavorth compile e deploy do microserviço</span>
                  </div>
                  <div className="text-neutral-500">// Parsing natural language intent...</div>
                  <div className="text-neutral-400">
                    Target identified: <span className="text-emerald-400">agendamento-service</span>
                  </div>
                  <div className="text-neutral-400">
                    Intent mapped: <span className="text-emerald-400">COMPILE_AND_DEPLOY</span>
                  </div>
                  <div className="text-neutral-500">// Checking local environment variables...</div>
                  <div className="text-emerald-400/90 font-bold">✓ Intent parsed successfully. Ready for planning.</div>
                </div>
              )}

              {activeStep === 1 && (
                <div className="space-y-3">
                  <div className="text-blue-400 flex items-center gap-1.5 font-bold">
                    <Play size={10} className="shrink-0" />
                    <span>ESTRUTURA DE PASSOS GERADA:</span>
                  </div>
                  <div className="pl-3 text-neutral-300 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>1. Mapear arquivos schema <span className="text-neutral-500">(prisma/schema.prisma)</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>2. Validar tipos de rotas <span className="text-neutral-500">(src/app/api)</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-emerald-400">✓</span>
                      <span>3. Transpilar código compilado <span className="text-neutral-500">(dist/sandbox)</span></span>
                    </div>
                  </div>
                  <div className="text-neutral-500">// Analyzing safety check metrics...</div>
                  <div className="text-amber-400 font-semibold">Warning: 1 local write action detected. Triggering approval gate.</div>
                </div>
              )}

              {activeStep === 2 && (
                <div className="space-y-3">
                  <div className="text-amber-500 flex items-center gap-1.5 font-bold">
                    <AlertTriangle size={11} className="shrink-0 animate-pulse" />
                    <span>PERMISSÃO DE ESCRITA SOLICITADA</span>
                  </div>
                  <div className="p-2.5 rounded border border-amber-500/20 bg-amber-500/5 text-neutral-300 text-[10px] space-y-1">
                    <div>Operação: <span className="text-amber-400 font-bold">write_file</span></div>
                    <div>Caminho: <code className="text-neutral-400">/src/pages/api/booking.ts</code></div>
                    <div>Risco: <span className="text-amber-400">Modificação de código fonte no repositório</span></div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button className="bg-amber-500/10 border border-amber-500/30 text-amber-500 px-3 py-1 rounded text-[8px] font-bold shadow-[0_0_10px_rgba(245,158,11,0.1)]">
                      Shift+Tab Aceitar
                    </button>
                    <button className="bg-white/5 border border-white/10 text-neutral-400 px-3 py-1 rounded text-[8px]">
                      Recusar
                    </button>
                  </div>
                </div>
              )}

              {activeStep === 3 && (
                <div className="space-y-3">
                  <div className="text-emerald-400 flex items-center gap-1.5 font-bold">
                    <Check size={11} className="shrink-0" />
                    <span>LOG DE EXECUÇÃO ASSINADO E COMPILADO</span>
                  </div>
                  <div className="pl-3 text-[10px] text-neutral-400 space-y-1">
                    <div>Hash do recibo: <span className="text-neutral-200 font-mono">sha256-b4a78c1c5e0e5a9f3b6c2d1e0f9a8b7c</span></div>
                    <div>Caminho físico: <code className="text-neutral-200">~/.zavorth/logs/receipt-4402.json</code></div>
                    <div>Garantia: <span className="text-emerald-400 font-semibold">Integridade garantida por assinatura local</span></div>
                  </div>
                  <div className="text-neutral-500">// Audit status: green. Sandbox successfully clean. PTY detached.</div>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
