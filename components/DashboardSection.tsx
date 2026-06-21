'use client'

import React, { useEffect, useState } from 'react'

export function DashboardSection() {
  const [budget, setBudget] = useState(1.4245)
  const [agents, setAgents] = useState([
    { name: 'File Classifier', task: 'fs.scan("/downloads")', status: 'active' },
    { name: 'Readiness Helper', task: 'review.ready()', status: 'active' },
    { name: 'Slack Reporter', task: 'idle', status: 'idle' }
  ])

  // Oscillate values for dynamic feel without heavy card container
  useEffect(() => {
    const timer = setInterval(() => {
      setBudget(prev => prev + Math.random() * 0.0003)
      setAgents(prev => prev.map((agent, i) => {
        if (i === 0) return { ...agent, task: Math.random() > 0.5 ? 'fs.classify(pdf)' : 'fs.scan("/downloads")' }
        if (i === 1) return { ...agent, task: Math.random() > 0.5 ? 'review.setup()' : 'review.ready()' }
        return agent
      }))
    }, 2000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="dashboard"
      className="relative bg-[#050505] border-t border-white/[0.05] py-16 sm:py-20 overflow-hidden"
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Column: Direct message */}
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-amber-500 font-semibold block">
              Controle remoto simples
            </span>
            <h2 className="font-mono text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              Acompanhe a IA trabalhando na sua maquina.
            </h2>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Veja o que esta rodando, o que precisa da sua decisao e quais canais estao prontos. Se uma acao merecer cuidado, Zavorth pausa e mostra uma previa objetiva.
            </p>
            <ul className="space-y-2.5 text-xs text-neutral-300 font-light">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-mono">✓</span>
                <span><strong>Chaves locais:</strong> Credenciais ficam no seu ambiente e aparecem para o agente como referencias seguras.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-mono">✓</span>
                <span><strong>Acessos temporarios:</strong> Permissoes expiram junto com a tarefa.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-mono">✓</span>
                <span><strong>Aprovacao rapida:</strong> Responda pelo celular para liberar, negar ou pedir uma previa melhor.</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Clean text-only system monitor */}
          <div className="space-y-6 pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/[0.05] md:pl-10">
            <div>
              <span className="block font-mono text-[9px] uppercase tracking-widest text-neutral-500 font-bold mb-3">Monitor de Atividades</span>
              
              <div className="space-y-4 font-mono text-xs">
                
                {/* Metric line 1 */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-neutral-500">Orçamento Limite</span>
                  <span className="text-white font-medium">${budget.toFixed(4)} <span className="text-neutral-500 text-[10px]">/ $5.00</span></span>
                </div>
                
                {/* Metric line 2 */}
                <div className="flex justify-between items-center py-1 border-t border-white/[0.03]">
                  <span className="text-neutral-500">Estado do Daemon</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    ONLINE
                  </span>
                </div>

                {/* Subagents activity list */}
                <div className="pt-3 border-t border-white/[0.03] space-y-2">
                  <span className="block text-[9px] uppercase text-neutral-500 font-bold">Subagentes Operando</span>
                  {agents.map((agent, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[11px] text-neutral-400">
                      <div className="flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${agent.status === 'active' ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-600'}`} />
                        <span className="text-neutral-300 font-medium">{agent.name}</span>
                      </div>
                      <span className="text-neutral-500 text-[10px] truncate max-w-[150px]">{agent.task}</span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
