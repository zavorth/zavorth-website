'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { Code2, Eye, MessageCircle } from 'lucide-react'
import gsap from 'gsap'
import { createReveal, ensureGsapPlugins } from './motion'

type Audience = {
  label: string
  title: string
  desc: string
  Icon: React.ComponentType<{ size?: number | string; className?: string }>
}

const audiences: Audience[] = [
  {
    label: 'Everyday users',
    title: 'Just talk. Let it work.',
    desc: 'A natural-language interface with sensible defaults, guided setup, and one-tap approvals. No configuration needed - just say what you want done.',
    Icon: MessageCircle,
  },
  {
    label: 'Operators',
    title: 'Full visibility. Clear control.',
    desc: 'Edit policies, inspect live traces, replay sessions, and manage workspaces. Every decision the runtime makes is observable and reversible.',
    Icon: Eye,
  },
  {
    label: 'Developers',
    title: 'Build on solid ground.',
    desc: 'A typed tool manifest, a skill SDK, first-class MCP servers, and surface adapters. Extend Basilisk without fighting the runtime.',
    Icon: Code2,
  },
]

export function UsersSection() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return

    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      createReveal('[data-audience]', {
        trigger: rootRef.current!,
        start: 'top 72%',
        y: 18,
        duration: 0.7,
        stagger: 0.1,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="users" ref={rootRef} className="relative section-rhythm section-terminal-bridge">
      <div className="section-divider max-w-content mx-auto mb-14 lg:mb-18" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-14 md:mb-18">
          <p className="eyebrow mb-4 justify-center mx-auto">05 - Audiences</p>
          <h2 className="text-heading sm:text-display-sm text-neutral-50 mb-5">
            Fits how you already work
          </h2>
          <p className="text-body-lg text-neutral-500 max-w-xl mx-auto leading-relaxed">
            Simple for users. Observable for operators. Extensible for
            developers. One runtime meets all three without compromise.
          </p>
        </div>

        <div className="mx-auto max-w-4xl divide-y divide-border-solid/80 border-y border-border-solid/80">
          {audiences.map((audience) => {
            const { Icon } = audience
            return (
              <article
                key={audience.label}
                data-audience
                className="grid grid-cols-1 gap-4 px-1 py-7 md:grid-cols-[190px_1fr] md:gap-10 md:px-0 md:py-9"
              >
                <div className="flex items-start gap-3 pt-1">
                  <div className="icon-badge icon-badge-sm icon-badge-accent shrink-0">
                    <Icon size={18} />
                  </div>
                  <p className="pt-2 text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-600">
                    {audience.label}
                  </p>
                </div>
                <div className="max-w-2xl">
                  <h3 className="mb-2 text-[1.7rem] font-medium tracking-tight text-neutral-100 md:text-[2rem]">
                    {audience.title}
                  </h3>
                  <p className="text-body leading-relaxed text-neutral-500">
                    {audience.desc}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
