'use client'

import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { Shield, Database, Users, Sparkles, Terminal, ChevronRight } from 'lucide-react'

interface Feature {
  title: string
  subtitle: string
  desc: string
  icon: any
}

const features: Feature[] = [
  {
    title: 'Gateway de Intenção',
    subtitle: 'Classificação & Roteamento',
    desc: 'Recebe comandos em linguagem natural e classifica o fluxo em chat, skills, providers ou execuções locais de forma segura.',
    icon: Sparkles,
  },
  {
    title: 'Transaction Plane',
    subtitle: 'Simulação & Mandato',
    desc: 'Qualquer ação de alteração do sistema ou gravação vira um preview. Riscos críticos requerem aprovação explícita em sandbox.',
    icon: Shield,
  },
  {
    title: 'Mnemos Local Memory',
    subtitle: 'Vector Store Embarcado',
    desc: 'Indexador semântico local que lê e estrutura documentos (PDFs, código, logs) localmente sem expor segredos à nuvem.',
    icon: Database,
  },
  {
    title: 'Swarm v2 Multi-Agent',
    subtitle: 'Orquestração Governada',
    desc: 'Divisão de tarefas complexas entre múltiplos agentes cooperativos com limites de orçamento, auditoria e rollback.',
    icon: Users,
  },
]

export function SkillsSection() {
  const [activeTab, setActiveTab] = useState(0)
  const simulatorCardRef = useRef<HTMLDivElement>(null)

  // Subtle 3D tilt on the simulator preview container on mouse move
  useEffect(() => {
    const card = simulatorCardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const xc = rect.width / 2
      const yc = rect.height / 2
      
      const rotX = -(y - yc) / 25
      const rotY = (x - xc) / 30
      
      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        scale: 1.01,
        duration: 0.4,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 4,
        rotateY: -4,
        rotateZ: 0.5,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    // Initial subtle tilt
    gsap.set(card, {
      rotateX: 4,
      rotateY: -4,
      rotateZ: 0.5,
    })

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [activeTab]) // Re-run when tab changes to preserve tilt state

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden bg-[#030303]">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-35"
        style={{
          background:
            'radial-gradient(circle at center, rgba(245,158,11,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Header */}
        <div className="mb-16 text-center md:text-left">
          <span className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-amber-500">
            Arquitetura Core
          </span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl zavorth-heading-display">
            A infraestrutura segura do <span className="text-amber-gradient">Zavorth Runtime</span>.
          </h2>
          <p className="mt-4 text-neutral-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Esqueça bots superficiais. Zavorth funciona como um sistema governado que classifica intenções,
            cria mandatos de transação e isola a execução no seu próprio computador.
          </p>
        </div>

        {/* Dashboard Split Container */}
        <div className="grid grid-cols-12 gap-8 items-center">
          
          {/* Left: Tab Control list */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-3">
            {features.map((feat, i) => {
              const Icon = feat.icon
              const isActive = activeTab === i

              return (
                <button
                  key={feat.title}
                  onClick={() => setActiveTab(i)}
                  className={`flex items-start text-left gap-4 p-4 rounded-xl border transition-all duration-300 group
                    ${isActive 
                      ? 'bg-amber-500/[0.04] border-amber-500/20 shadow-[inset_0_1px_0_rgba(245,158,11,0.05)]' 
                      : 'bg-transparent border-transparent hover:bg-white/[0.02] hover:border-white/[0.04]'
                    }
                  `}
                >
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors
                    ${isActive ? 'bg-amber-500/10 text-amber-500' : 'bg-white/[0.04] text-neutral-500 group-hover:text-neutral-300'}
                  `}>
                    <Icon size={18} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className={`text-sm font-semibold transition-colors
                      ${isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}
                    `}>
                      {feat.title}
                    </h3>
                    <p className="text-[11px] text-neutral-500 mt-0.5 uppercase tracking-wider font-mono">
                      {feat.subtitle}
                    </p>
                    {isActive && (
                      <p className="text-xs text-neutral-400 mt-2 leading-relaxed transition-all duration-300">
                        {feat.desc}
                      </p>
                    )}
                  </div>
                  <ChevronRight 
                    size={14} 
                    className={`ml-auto mt-1 transition-all duration-300
                      ${isActive ? 'text-amber-500 translate-x-0' : 'text-neutral-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}
                    `} 
                  />
                </button>
              )
            })}
          </div>

          {/* Right: Premium Dynamic Sandbox Simulator */}
          <div className="col-span-12 md:col-span-7 flex justify-center" style={{ perspective: '1200px' }}>
            <div
              ref={simulatorCardRef}
              className="w-full max-w-[460px] h-[280px] rounded-2xl border border-white/[0.06] bg-[#07070a]/90 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out flex flex-col overflow-hidden"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'center center',
              }}
            >
              {/* Header macOS style */}
              <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.01] px-4 py-3 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] opacity-80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] opacity-80" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] opacity-80" />
                  <span className="ml-3 font-mono text-[10px] tracking-wide text-neutral-500 uppercase flex items-center gap-1">
                    <Terminal size={10} className="text-neutral-600" />
                    zavorth-runtime
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-neutral-500 bg-black/40 px-2 py-0.5 border border-white/[0.04] rounded-full">
                  <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse" />
                  <span>ONLINE</span>
                </div>
              </div>

              {/* Dynamic screen area */}
              <div className="flex-1 overflow-hidden relative">
                
                {/* Screen 0: Intent Gateway */}
                {activeTab === 0 && (
                  <div className="flex flex-col h-full font-mono text-[11px] text-neutral-300 p-4 justify-between animate-fadeInFast">
                    <div className="flex items-center justify-between border-b border-white/[0.04] pb-2 text-[9px] text-neutral-500">
                      <span>INTENT CLASSIFIER v2.4</span>
                      <span className="text-amber-500 font-semibold animate-pulse">● AVALIANDO</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-neutral-500 font-bold">ENTRADA DO OPERADOR:</span>
                        <p className="text-white mt-1 font-sans bg-white/[0.02] border border-white/[0.04] p-2 rounded leading-relaxed text-xs">
                          "Analise os arquivos do repositório, faça um patch de segurança e mande o resumo no Telegram"
                        </p>
                      </div>
                      <div className="space-y-1.5 border-t border-white/[0.03] pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-500">Classificação:</span>
                          <span className="text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded text-[9px]">TOOL_EXECUTION + CHANNEL_OUT</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-500">Política de Segurança:</span>
                          <span className="text-red-400 font-bold bg-red-400/10 px-2 py-0.5 rounded text-[9px]">REQUER APROVAÇÃO (CRÍTICO)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Screen 1: Transaction Plane */}
                {activeTab === 1 && (
                  <div className="flex flex-col h-full font-mono text-[11px] p-4 justify-between animate-fadeInFast">
                    <div className="flex items-center justify-between border-b border-white/[0.04] pb-2 text-[9px] text-neutral-500">
                      <span>TRANSACTION MANDATE GATE</span>
                      <span className="text-red-500 font-semibold animate-pulse">▲ AGUARDANDO AUTORIZAÇÃO</span>
                    </div>
                    <div className="bg-[#100808]/80 border border-red-500/15 rounded-xl p-3.5 space-y-2.5">
                      <div className="flex justify-between items-center text-[9px] text-red-400 font-semibold">
                        <span>TRANSAÇÃO DETIDA (ALTO RISCO)</span>
                        <span>mandate: required</span>
                      </div>
                      <div className="space-y-1 py-1.5 border-y border-white/[0.03] text-[10px]">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Ação:</span>
                          <span className="text-white font-medium">patch --apply (src/core/auth.ts)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Canal:</span>
                          <span className="text-white font-medium">CLI Local (Trust Mode)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Impacto:</span>
                          <span className="text-red-400 font-medium">Modificação de código de autenticação</span>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-0.5">
                        <button className="flex-1 bg-red-950/40 hover:bg-red-950/80 border border-red-500/30 text-red-400 rounded-lg py-1.5 text-center text-[9px] font-bold transition-all">
                          Rejeitar
                        </button>
                        <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black rounded-lg py-1.5 text-center text-[9px] font-bold transition-all shadow-[0_0_10px_rgba(16,185,129,0.25)]">
                          Aprovar Mandato
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Screen 2: Mnemos Local Memory */}
                {activeTab === 2 && (
                  <div className="flex flex-col h-full font-mono text-[11px] text-neutral-300 p-4 justify-between animate-fadeInFast">
                    <div className="flex items-center justify-between border-b border-white/[0.04] pb-2 text-[9px] text-neutral-500">
                      <span>MNEMOS LOCAL KNOWLEDGE</span>
                      <span className="text-emerald-500 font-semibold">● ACTIVE STORE</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white/[0.02] border border-white/[0.04] rounded-lg p-2.5">
                        <div>
                          <div className="text-white font-semibold text-[11px]">Vector Memory</div>
                          <div className="text-neutral-500 text-[9px] mt-0.5">Busca semântica no dispositivo</div>
                        </div>
                        <div className="text-right">
                          <div className="text-emerald-400 font-bold text-[11px]">1,512 vetores</div>
                          <div className="text-neutral-500 text-[8px] mt-0.5">Sincronizado</div>
                        </div>
                      </div>
                      <div className="space-y-1.5 border-t border-white/[0.03] pt-2.5">
                        <div className="text-[9px] text-neutral-500">ARQUIVOS RECENTES DO CORE INDEXADOS:</div>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-neutral-300">
                            <span>📄 src/core/bootstrap.ts</span>
                            <span className="text-emerald-500 text-[8px]">100% Indexado</span>
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-neutral-400">
                            <span>📄 config/credentials.yml (Ignorado)</span>
                            <span className="text-red-400 text-[8px] font-semibold">BLOCKED (PII Policy)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Screen 3: Swarm v2 Multi-Agent */}
                {activeTab === 3 && (
                  <div className="flex flex-col h-full font-mono text-[11px] text-neutral-300 p-4 justify-between animate-fadeInFast">
                    <div className="flex items-center justify-between border-b border-white/[0.04] pb-2 text-[9px] text-neutral-500">
                      <span>SWARM v2 PLANNER</span>
                      <span className="text-amber-500 font-semibold animate-pulse">● SIMULANDO SWARM</span>
                    </div>
                    <div className="space-y-2 flex-1 flex flex-col justify-center text-[10px] sm:text-[11px] leading-relaxed">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-500 shrink-0">[leader]</span>
                        <span>Planejando divisão de trabalho para o Swarm...</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-400 shrink-0">[git-agent]</span>
                        <span className="truncate">Lendo commits recentes na branch main...</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-purple-400 shrink-0">[review-agent]</span>
                        <span>Análise de segurança em andamento (Patch Check)...</span>
                      </div>
                      <div className="flex items-start gap-2 text-emerald-400">
                        <span className="text-emerald-500 font-bold shrink-0">[done]</span>
                        <span>Sucesso. Receipts e logs gerados no Ledger local.</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .terminal-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(236, 72, 153, 0.15) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 10;
        }

        @keyframes pulseFlow {
          0% { left: -16px; }
          100% { left: 100%; }
        }

        .animate-fadeInFast {
          animation: fadeInFast 0.3s ease-out forwards;
        }

        @keyframes fadeInFast {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
