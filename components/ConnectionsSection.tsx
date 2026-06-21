'use client'

import React from 'react'
import {
  Brain,
  ShieldCheck,
  Lock,
  LayoutGrid,
  Terminal,
  Share2,
  Smartphone,
  Network,
  FolderGit2,
  ShieldAlert,
  Zap
} from 'lucide-react'

const models = [
  { name: 'Catálogo de Provedores', icon: Brain },
  { name: 'Rotas e Fallbacks Offline', icon: ShieldCheck },
  { name: 'Redacted Secrets Ref', icon: Lock }
]

const tools = [
  { name: 'Integrações Nexus', icon: Network },
  { name: 'Memória Local Mnemos', icon: FolderGit2 },
  { name: 'Sandboxes de Execução', icon: ShieldAlert },
  { name: 'Governed MCP Gate', icon: Zap }
]

const surfaces = [
  { name: 'Dashboard Web', icon: LayoutGrid },
  { name: 'Terminal CLI / TUI', icon: Terminal },
  { name: 'Telegram / Discord Bridges', icon: Share2 },
  { name: 'Satellite Companion', icon: Smartphone }
]

export function ConnectionsSection() {
  return (
    <section id="connections" className="relative bg-[#000000] border-t border-white/[0.06] py-24 sm:py-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/[0.015] blur-[140px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-4xl px-6 relative z-10">
        
        <div className="flex flex-col gap-6 md:flex-row md:gap-12 mb-16 md:items-start">
          <div className="w-full md:w-1/3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500 font-semibold block mb-3">
              03 // COMO CONECTA
            </span>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl leading-none">
              Conexões <br />
              <span className="text-amber-500">do Runtime</span>
            </h2>
          </div>
          <div className="w-full md:w-2/3">
            <p className="text-lg leading-relaxed text-neutral-300 font-light">
              O runtime do Zavorth se integra de forma transparente ao seu ambiente local, orquestrando modelos, Mnemos, sandboxes de execução e canais remotos em um fluxo unificado.
            </p>
          </div>
        </div>

        <div className="space-y-12">
          {/* Modelos */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-medium text-white/90 border-b border-white/[0.06] pb-2">
              Modelos de Linguagem
            </h3>
            <div className="flex flex-wrap gap-3">
              {models.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.name}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm text-sm text-neutral-400 font-normal transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(245,158,11,0.08)] hover:text-white"
                  >
                    <Icon className="w-4 h-4 text-amber-500/80" />
                    <span>{item.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Ferramentas */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-medium text-white/90 border-b border-white/[0.06] pb-2">
              Acessos & Ferramentas
            </h3>
            <div className="flex flex-wrap gap-3">
              {tools.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.name}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm text-sm text-neutral-400 font-normal transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(245,158,11,0.08)] hover:text-white"
                  >
                    <Icon className="w-4 h-4 text-amber-500/80" />
                    <span>{item.name}</span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Superfícies */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-medium text-white/90 border-b border-white/[0.06] pb-2">
              Superfícies de Controle
            </h3>
            <div className="flex flex-wrap gap-3">
              {surfaces.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.name}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-white/[0.06] bg-white/[0.01] backdrop-blur-sm text-sm text-neutral-400 font-normal transition-all duration-300 hover:border-amber-500/40 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(245,158,11,0.08)] hover:text-white"
                  >
                    <Icon className="w-4 h-4 text-amber-500/80" />
                    <span>{item.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
