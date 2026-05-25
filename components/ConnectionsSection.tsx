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
    <section id="connections" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Dot pattern background */}
      <div className="dot-pattern-bg absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-500/80 mb-4 block">
            COMPATIBILIDADE
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-white mt-3 mb-4 tracking-tight">
            Conexão direta com seus modelos e canais.
          </h2>
          <p className="text-neutral-500 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Integre com os principais modelos de IA e canais de comunicação sem configurações complexas.
          </p>
        </div>

        {/* Row 1: AI Models */}
        <div className="mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-600 mb-4 block">
            MODELOS DE IA
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {aiModels.map((name, index) => (
              <div
                key={name}
                className="connection-card group flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-white/[0.05] bg-[#0a0a0a]/60 cursor-default"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <span className="w-1 h-1 rounded-full bg-amber-500/60 shrink-0" />
                <span className="text-sm font-medium text-neutral-300 group-hover:text-neutral-100 transition-colors duration-300">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Channels & Infrastructure */}
        <div className="mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-600 mb-4 block">
            CANAIS & INFRAESTRUTURA
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {channels.map((name, index) => (
              <div
                key={name}
                className="connection-card group flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl border border-white/[0.05] bg-[#0a0a0a]/60 cursor-default"
                style={{ animationDelay: `${(index + aiModels.length) * 60}ms` }}
              >
                <span className="w-1 h-1 rounded-full bg-emerald-400/60 shrink-0" />
                <span className="text-sm font-medium text-neutral-300 group-hover:text-neutral-100 transition-colors duration-300">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <div className="text-center">
          <p className="font-mono text-xs text-neutral-600 tracking-wide">
            + plugins customizáveis · mcp servers · micro-agentes locais
          </p>
        </div>
      </div>

      <style jsx>{`
        .dot-pattern-bg {
          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.03) 1px,
            transparent 1px
          );
          background-size: 24px 24px;
        }

        .connection-card {
          transition: all 300ms ease;
          animation: card-enter 0.5s ease both;
        }

        .connection-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255, 255, 255, 0.12);
          background-color: rgba(10, 10, 10, 0.9);
          box-shadow: 0 4px 24px -4px rgba(245, 158, 11, 0.08),
            0 0 0 1px rgba(245, 158, 11, 0.04);
        }

        @keyframes card-enter {
          from {
            opacity: 0;
            transform: translateY(12px);
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
