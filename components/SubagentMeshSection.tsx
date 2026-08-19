'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Compass, 
  Search, 
  Code2, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Activity,
  Layers
} from 'lucide-react'

export function SubagentMeshSection() {
  const [selectedAgent, setSelectedAgent] = useState<number>(0)
  const [isOrchestrating, setIsOrchestrating] = useState<boolean>(false)

  const agents = [
    {
      id: 'architect',
      name: 'Architect Subagent',
      role: 'Design & Dependências',
      icon: Compass,
      tag: 'PLANNER',
      status: 'Ready',
      mission: 'Mapeia a arquitetura do projeto, analisa impacto de mudanças e cria planos de execução estruturados.',
      action: 'Decompondo grafo de módulos e contratos de interface...',
      metrics: 'Zero Dependência Cíclica · Inversão de Controle',
    },
    {
      id: 'researcher',
      name: 'Research Subagent',
      role: 'Varredura de Código & Docs',
      icon: Search,
      tag: 'DISCOVERY',
      status: 'Active',
      mission: 'Explora repositórios, documentações e logs históricos em paralelo sem poluir a janela de contexto principal.',
      action: 'Indexando símbolos TypeScript e referências de API...',
      metrics: 'Busca Semântica < 15ms · AST Traversals',
    },
    {
      id: 'engineer',
      name: 'Core Engineer Subagent',
      role: 'Implementação de Código',
      icon: Code2,
      tag: 'BUILDER',
      status: 'Active',
      mission: 'Escreve código completo, tipado e funcional seguindo a política anti-regressão e sem placeholders preguiçosos.',
      action: 'Gerando componentes modulares com Strict Typing (Zero Any)...',
      metrics: '100% Código Real · Anti-Placeholder Policy',
    },
    {
      id: 'auditor',
      name: 'QA & Verification Subagent',
      role: 'Auditoria & Testes',
      icon: CheckCircle2,
      tag: 'GUARDIAN',
      status: 'Verified',
      mission: 'Executa suítes de testes automatizados, checagens de tipos e linters antes de validar qualquer entrega.',
      action: 'Executando testes unitários e validação de regressão...',
      metrics: '21/21 Suítes Passando · 0 Erros de Compilação',
    },
  ]

  const handleSimulateSwarm = () => {
    setIsOrchestrating(true)
    setTimeout(() => {
      setIsOrchestrating(false)
    }, 2000)
  }

  return (
    <section
      id="subagents"
      className="relative overflow-hidden py-28 sm:py-36 bg-black text-white scroll-mt-20 border-t border-white/[0.06]"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-500/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md mb-6"
          >
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-300">
              Mesh de Subagentes
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.15]"
          >
            Um time de engenharia autônomo{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-emerald-400">
              sob seu comando.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light"
          >
            O Zavorth orquestra subagentes especializados em paralelo. Enquanto um pesquisa o codebase, outro planeja as interfaces e outro valida a segurança em tempo real.
          </motion.p>
        </div>

        {/* Interactive Swarm Mesh Console */}
        <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-neutral-900/50 via-black to-neutral-950/80 p-8 sm:p-12 backdrop-blur-xl mb-12">
          
          {/* Swarm Status Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/[0.06] mb-8">
            <div className="flex items-center gap-3">
              <span className={`w-2.5 h-2.5 rounded-full ${isOrchestrating ? 'bg-emerald-400 animate-ping' : 'bg-emerald-400'}`} />
              <span className="text-xs font-semibold text-white tracking-wide">
                ORQUESTRAÇÃO CONCORRENTE ATIVA
              </span>
            </div>
            
            <button
              type="button"
              onClick={handleSimulateSwarm}
              disabled={isOrchestrating}
              className="py-2 px-4 rounded-xl text-xs font-medium bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all flex items-center gap-2"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isOrchestrating ? 'Sincronizando subagentes...' : 'Disparar Loop Concorrente'}</span>
            </button>
          </div>

          {/* 4 Agent Nodes Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {agents.map((agent, idx) => {
              const Icon = agent.icon
              const isSelected = selectedAgent === idx
              return (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => setSelectedAgent(idx)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 border relative ${
                    isSelected
                      ? 'bg-white/[0.08] border-emerald-500/50 shadow-[0_0_24px_rgba(16,185,129,0.14)]'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/[0.05] text-neutral-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-mono font-semibold text-neutral-500 px-2 py-0.5 rounded bg-white/[0.03]">
                      {agent.tag}
                    </span>
                  </div>

                  <h3 className="text-xs font-semibold text-white mb-0.5">{agent.name}</h3>
                  <p className="text-[11px] text-neutral-400 font-light mb-3">{agent.role}</p>

                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{agent.status}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected Agent Mission & Live Telemetry */}
          <AnimatePresence mode="wait">
            <motion.div
              key={agents[selectedAgent].id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6 sm:p-8 rounded-2xl bg-black/60 border border-white/[0.06]"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/[0.04]">
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {agents[selectedAgent].name} — {agents[selectedAgent].role}
                  </h4>
                  <p className="text-xs text-neutral-400 font-light mt-1">
                    {agents[selectedAgent].mission}
                  </p>
                </div>
                <span className="text-[10px] font-mono font-medium text-emerald-400/80 bg-emerald-500/[0.06] border border-emerald-500/20 px-3 py-1.5 rounded-xl self-start md:self-auto">
                  {agents[selectedAgent].metrics}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-neutral-300 bg-white/[0.02] p-3.5 rounded-xl border border-white/[0.04]">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-neutral-400">Ação atual:</span>
                <span className="text-white">{agents[selectedAgent].action}</span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  )
}
