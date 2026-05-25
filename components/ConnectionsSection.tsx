'use client'

import React, { useEffect, useRef } from 'react'
import {
  Send,
  MessageSquare,
  Hash,
  LayoutDashboard,
  Webhook,
  Brain,
  Box,
  Globe,
  Bot,
  Sparkles,
} from 'lucide-react'
import gsap from 'gsap'
import { ensureGsapPlugins } from './motion'
import { LocalStackMarquee } from './LocalStackMarquee'

interface Connector {
  name: string
  desc: string
  Icon: React.ElementType
  accent: string
}

const connectors: Connector[] = [
  {
    name: 'Telegram',
    desc: 'Aprovações e controle remoto em tempo real.',
    Icon: Send,
    accent: '#38bdf8',
  },
  {
    name: 'Discord',
    desc: 'Gerenciamento de tarefas por bots isolados.',
    Icon: MessageSquare,
    accent: '#818cf8',
  },
  {
    name: 'Slack',
    desc: 'Notificações e briefs diários automatizados.',
    Icon: Hash,
    accent: '#e879f9',
  },
  {
    name: 'Command Center',
    desc: 'Painel local de governança e auditoria.',
    Icon: LayoutDashboard,
    accent: '#f59e0b',
  },
  {
    name: 'MCP Protocol',
    desc: 'Integre qualquer ferramenta pelo padrão MCP.',
    Icon: Webhook,
    accent: '#fb923c',
  },
  {
    name: 'Mnemos Memory',
    desc: 'Banco vetorial local para PDFs e arquivos.',
    Icon: Brain,
    accent: '#2dd4bf',
  },
  {
    name: 'Docker Sandbox',
    desc: 'Ambientes isolados para execução segura.',
    Icon: Box,
    accent: '#22d3ee',
  },
  {
    name: 'Browser Controller',
    desc: 'Navegação e extração web em sandbox.',
    Icon: Globe,
    accent: '#34d399',
  },
  {
    name: 'Ollama',
    desc: 'DeepSeek, Llama, Mistral — 100% local.',
    Icon: Bot,
    accent: '#fb7185',
  },
  {
    name: 'Google Gemini',
    desc: 'Modelos de última geração otimizados.',
    Icon: Sparkles,
    accent: '#60a5fa',
  },
  {
    name: 'Anthropic Claude',
    desc: 'Mapeamento de intenções em sandbox.',
    Icon: Brain,
    accent: '#fbbf24',
  },
  {
    name: 'OpenAI GPT',
    desc: 'Inteligência avançada para fluxos complexos.',
    Icon: Sparkles,
    accent: '#a1a1aa',
  },
]

export function ConnectionsSection() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-conn-item]',
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rootRef.current!,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="connections"
      ref={rootRef}
      className="relative bg-[#060606] border-t border-white/[0.04] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <div data-conn-item className="text-center mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-4">
            Integrações
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white leading-snug">
            Tudo que você já usa, conectado.
          </h2>
        </div>

        {/* Grid — clean rows */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-0 gap-y-0">
          {connectors.map((c) => {
            const Icon = c.Icon
            return (
              <div
                key={c.name}
                data-conn-item
                className="group relative px-5 py-6 border-b border-r border-white/[0.04] last:border-r-0 [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(3n)]:border-r lg:[&:nth-child(4n)]:border-r-0 hover:bg-white/[0.015] transition-colors duration-300"
              >
                {/* Icon */}
                <div className="mb-3">
                  <Icon
                    className="h-5 w-5 transition-colors duration-300"
                    style={{ color: c.accent }}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Name */}
                <p className="text-[13px] font-medium text-neutral-200 mb-1">
                  {c.name}
                </p>

                {/* Description */}
                <p className="text-[11px] text-neutral-600 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            )
          })}
        </div>

        {/* Relocated Entry Surfaces Marquee */}
        <div data-conn-item className="mt-20 w-full pointer-events-auto">
          <LocalStackMarquee />
        </div>

        {/* Footnote */}
        <div data-conn-item className="mt-16">
          <p className="text-center font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
            + plugins customizáveis &middot; mcp servers &middot; micro-agentes locais
          </p>
        </div>
      </div>
    </section>
  )
}
