'use client'

import React, { useLayoutEffect, useRef } from 'react'
import {
  Bot,
  Box,
  Brain,
  FileSearch,
  Globe,
  Hash,
  MessageCircle,
  MessageSquare,
  Send,
  Sparkles,
  Webhook,
} from 'lucide-react'
import gsap from 'gsap'
import { createReveal, ensureGsapPlugins } from './motion'

const integrations = [
  {
    name: 'Telegram',
    tag: 'Chat',
    Icon: Send,
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.11)',
    border: 'rgba(56, 189, 248, 0.22)',
  },
  {
    name: 'Discord',
    tag: 'Chat',
    Icon: MessageSquare,
    color: '#818cf8',
    bg: 'rgba(129, 140, 248, 0.12)',
    border: 'rgba(129, 140, 248, 0.23)',
  },
  {
    name: 'Slack',
    tag: 'Chat',
    Icon: Hash,
    color: '#e879f9',
    bg: 'rgba(232, 121, 249, 0.11)',
    border: 'rgba(232, 121, 249, 0.23)',
  },
  {
    name: 'WhatsApp',
    tag: 'Chat',
    Icon: MessageCircle,
    color: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.11)',
    border: 'rgba(34, 197, 94, 0.23)',
  },
  {
    name: 'Browser',
    tag: 'Tool',
    Icon: Globe,
    color: '#60a5fa',
    bg: 'rgba(96, 165, 250, 0.1)',
    border: 'rgba(96, 165, 250, 0.22)',
  },
  {
    name: 'Docker',
    tag: 'Runtime',
    Icon: Box,
    color: '#38bdf8',
    bg: 'rgba(56, 189, 248, 0.1)',
    border: 'rgba(56, 189, 248, 0.2)',
  },
  {
    name: 'MCP',
    tag: 'Protocol',
    Icon: Webhook,
    color: '#34d399',
    bg: 'rgba(52, 211, 153, 0.11)',
    border: 'rgba(52, 211, 153, 0.22)',
  },
  {
    name: 'Ollama',
    tag: 'Local',
    Icon: Bot,
    color: '#a7f3d0',
    bg: 'rgba(167, 243, 208, 0.09)',
    border: 'rgba(167, 243, 208, 0.18)',
  },
  {
    name: 'OpenAI',
    tag: 'API',
    Icon: Sparkles,
    color: '#f8fafc',
    bg: 'rgba(248, 250, 252, 0.08)',
    border: 'rgba(248, 250, 252, 0.16)',
  },
  {
    name: 'Anthropic',
    tag: 'API',
    Icon: Brain,
    color: '#fbbf24',
    bg: 'rgba(251, 191, 36, 0.1)',
    border: 'rgba(251, 191, 36, 0.2)',
  },
  {
    name: 'Google AI',
    tag: 'API',
    Icon: Sparkles,
    color: '#93c5fd',
    bg: 'rgba(147, 197, 253, 0.1)',
    border: 'rgba(147, 197, 253, 0.2)',
  },
  {
    name: 'Filesystem',
    tag: 'Tool',
    Icon: FileSearch,
    color: '#cbd5e1',
    bg: 'rgba(203, 213, 225, 0.08)',
    border: 'rgba(203, 213, 225, 0.16)',
  },
]

export function ConnectsSection() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      createReveal('[data-conn-header]', {
        trigger: rootRef.current!,
        start: 'top 78%',
        y: 18,
        duration: 0.8,
      })
      createReveal('[data-conn-item]', {
        trigger: '[data-conn-content]',
        start: 'top 82%',
        y: 18,
        duration: 0.75,
        stagger: 0.045,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="connects" ref={rootRef} className="relative section-rhythm">
      <div className="section-divider max-w-content mx-auto mb-16 lg:mb-20" />

      <div className="max-w-6xl mx-auto px-6">
        <div data-conn-header className="text-center mb-12 md:mb-14">
          <p className="eyebrow mb-4 justify-center mx-auto">04 - Conexoes</p>
          <h2 className="section-title-display text-heading sm:text-display-sm text-neutral-50 mb-5">
            Conecta com o que <span className="signal-text">ja existe.</span>
          </h2>
          <p className="section-lead text-body-lg text-neutral-500 leading-relaxed">
            O Basilisk se integra ao ecosistema que voce ja usa, sem trocar de stack.
          </p>
        </div>

        <div
          data-conn-content
          className="relative overflow-hidden rounded-[26px] border border-white/[0.06] bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.08),transparent_42%),rgba(255,255,255,0.018)] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.25)] sm:p-3"
        >
          <div
            className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-emerald-200/30 to-transparent"
            aria-hidden="true"
          />

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {integrations.map((item) => {
              const Icon = item.Icon

              return (
                <div
                  key={item.name}
                  data-conn-item
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.055] bg-white/[0.025] p-3 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.11] hover:bg-white/[0.04]"
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-10 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: item.color }}
                    aria-hidden="true"
                  />

                  <div className="relative flex items-center gap-3">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105"
                      style={{
                        background: item.bg,
                        borderColor: item.border,
                        color: item.color,
                      }}
                    >
                      <Icon size={17} strokeWidth={2.2} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-[13px] font-semibold leading-tight text-neutral-100">
                        {item.name}
                      </p>
                      <span
                        className="mt-1 inline-flex rounded-full px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.12em]"
                        style={{
                          color: item.color,
                          background: item.bg,
                        }}
                      >
                        {item.tag}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div data-conn-item className="mt-6 text-center">
          <p className="text-[12px] text-neutral-600 font-mono uppercase tracking-[0.16em]">
            + skills customizaveis - MCP servers - subagentes
          </p>
          <a
            href="/integrations"
            className="mt-4 inline-flex rounded-lg border border-white/[0.08] px-4 py-2 text-[12px] font-medium text-neutral-400 transition-colors hover:text-neutral-100"
          >
            Ver integration showcase
          </a>
        </div>
      </div>
    </section>
  )
}
