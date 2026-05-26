'use client'

import React from 'react'

const aiModels = [
  'Ollama',
  'DeepSeek',
  'Claude 3.5',
  'OpenAI GPT-4',
  'Gemini Pro',
  'Llama 3',
  'Groq API',
  'Mistral AI',
]

const channels = [
  'Telegram Bot',
  'Discord App',
  'Slack Webhook',
  'Docker Sandbox',
  'SQLite DB',
  'MCP Protocol',
  'Local Git',
  'Web Browser',
]

export function ConnectionsSection() {
  return (
    <section id="connections" className="relative py-24 sm:py-32 overflow-hidden bg-[#030303]">
      {/* Soft ambient background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] opacity-40 z-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245,158,11,0.04) 0%, rgba(34,197,94,0.01) 50%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-500/85 mb-4 block">
            Compatibilidade
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4 tracking-tight zavorth-heading-display">
            Conexão direta com seus modelos e canais.
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Integre o runtime do Zavorth de forma nativa e sem fricção com seus modelos locais, serviços de nuvem e ferramentas de desenvolvimento.
          </p>
        </div>

        {/* Unified Integration Cloud */}
        <div className="flex flex-wrap gap-2.5 justify-center max-w-3xl mx-auto mb-12">
          {aiModels.map((name) => (
            <div
              key={name}
              className="connection-pill group flex items-center gap-2 py-2 px-4 rounded-full border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/[0.08] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500/60 shadow-[0_0_8px_rgba(245,158,11,0.4)]" />
              <span className="text-xs sm:text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
                {name}
              </span>
            </div>
          ))}
          {channels.map((name) => (
            <div
              key={name}
              className="connection-pill group flex items-center gap-2 py-2 px-4 rounded-full border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.04] hover:border-white/[0.08] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-default"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
              <span className="text-xs sm:text-sm font-medium text-neutral-400 group-hover:text-white transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <div className="text-center">
          <p className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
            + plugins customizáveis · mcp servers · micro-agentes locais
          </p>
        </div>
      </div>
    </section>
  )
}
