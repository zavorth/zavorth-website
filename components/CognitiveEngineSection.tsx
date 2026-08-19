'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Cpu, 
  GitBranch, 
  ShieldCheck, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react'

export function CognitiveEngineSection() {
  const [activeStep, setActiveStep] = useState<number>(0)
  const [testSimulating, setTestSimulating] = useState<boolean>(false)
  const [testsPassed, setTestsPassed] = useState<boolean>(true)

  const handleRunVerification = () => {
    setTestSimulating(true)
    setTimeout(() => {
      setTestSimulating(false)
      setTestsPassed(true)
    }, 1200)
  }

  const loopStages = [
    {
      icon: Layers,
      title: 'Decomposição de Metas',
      desc: 'Metas complexas são convertidas em grafos atômicos de tarefas com análise de dependência antes de qualquer alteração.',
      tag: 'Planning Core',
    },
    {
      icon: ShieldCheck,
      title: 'Sandbox de Risco',
      desc: 'Operações sensíveis são isoladas e validadas por contratos de integridade antes da execução em disco.',
      tag: 'Risk Grading',
    },
    {
      icon: CheckCircle2,
      title: 'Portais de Verificação',
      desc: 'Suítes de testes, checagem de tipos (Zero Any) e linters são executados autonomamente para blindar o código.',
      tag: 'Automated Gate',
    },
    {
      icon: RotateCcw,
      title: 'Rollback Cirúrgico',
      desc: 'Em caso de divergência, o agente restaura cirurgicamente apenas os arquivos afetados, preservando o progresso válido.',
      tag: 'Self-Healing',
    },
  ]

  return (
    <section
      id="engine"
      className="relative overflow-hidden py-28 sm:py-36 bg-black text-white scroll-mt-20"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[340px] bg-emerald-500/[0.04] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md mb-6"
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-300">
              O Motor Cognitivo
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.15]"
          >
            Autonomia guiada por{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-emerald-400">
              verificação em tempo real.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light"
          >
            O Zavorth não é apenas um gerador de texto. Ele é um sistema de execução de ciclo fechado:
            decompondo objetivos, aplicando código sem atalhos e testando cada linha antes de considerar a tarefa concluída.
          </motion.p>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: Autonomous Loop Decomposition (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-7 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-neutral-900/60 to-neutral-950/80 p-8 relative overflow-hidden backdrop-blur-xl group hover:border-white/[0.15] transition-all duration-500"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <GitBranch className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Decomposição em Grafo</h3>
                  <p className="text-[11px] text-neutral-500 font-mono">execution_plan.graph</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ACTIVE PIPELINE
              </span>
            </div>

            {/* Interactive Stage Selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {loopStages.map((stage, idx) => {
                const Icon = stage.icon
                const isActive = activeStep === idx
                return (
                  <button
                    key={stage.title}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`p-4 rounded-2xl text-left transition-all duration-300 border ${
                      isActive
                        ? 'bg-white/[0.06] border-emerald-500/40 shadow-[0_0_24px_rgba(16,185,129,0.12)]'
                        : 'bg-white/[0.02] border-white/[0.05] hover:bg-white/[0.04]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-neutral-400'}`} />
                      <span className="text-[9px] font-mono uppercase tracking-wider text-neutral-500">
                        {stage.tag}
                      </span>
                    </div>
                    <p className={`text-xs font-medium ${isActive ? 'text-white' : 'text-neutral-300'}`}>
                      {stage.title}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Active Stage Detailed Breakdown */}
            <div className="p-5 rounded-2xl bg-black/50 border border-white/[0.06] relative">
              <div className="flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-white mb-1">
                    {loopStages[activeStep].title}
                  </p>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {loopStages[activeStep].desc}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bento Card 2: Automated Verification Gate (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="md:col-span-5 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-neutral-900/60 to-neutral-950/80 p-8 flex flex-col justify-between backdrop-blur-xl group hover:border-white/[0.15] transition-all duration-500"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">Portal de Verificação</h3>
                    <p className="text-[11px] text-neutral-500 font-mono">zero_regression_gate</p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed mb-6 font-light">
                Nenhuma tarefa é dada como concluída sem execução real da suíte de verificação automatizada.
              </p>

              {/* Real-time Verification Badges */}
              <div className="space-y-2.5 mb-8">
                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/[0.04]">
                  <span className="text-xs text-neutral-300 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Typecheck (TypeScript Strict)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">0 ERRORS</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/[0.04]">
                  <span className="text-xs text-neutral-300 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Linter & Clean Code Hygiene
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">CLEAN</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/[0.04]">
                  <span className="text-xs text-neutral-300 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Unit & Integration Tests
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold">21/21 PASSING</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleRunVerification}
              disabled={testSimulating}
              className="w-full py-3 px-4 rounded-xl font-medium text-xs bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1] transition-all flex items-center justify-center gap-2"
            >
              {testSimulating ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  <span>Auditando integridade do runtime...</span>
                </>
              ) : (
                <>
                  <span>Simular Verificação Contínua</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </>
              )}
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
