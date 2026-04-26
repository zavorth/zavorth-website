'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { CheckCircle, Database, MessageSquareMore, ShieldCheck, Wrench } from 'lucide-react'
import gsap from 'gsap'
import {
  animateLineDraw,
  attachMagneticGlow,
  createReveal,
  ensureGsapPlugins,
  prefersReducedMotion,
  setupLineDraw,
} from './motion'

type Step = {
  n: string
  label: string
  desc: string
  tone: string
  Icon: React.ComponentType<{ size?: number | string; className?: string }>
}

const steps: Step[] = [
  {
    n: '01',
    label: 'Request',
    desc: 'Language enters from a human surface, another runtime, or an API edge.',
    tone: 'ingress',
    Icon: MessageSquareMore,
  },
  {
    n: '02',
    label: 'Context',
    desc: 'Session state, memory, and environment load before anything irreversible happens.',
    tone: 'state',
    Icon: Database,
  },
  {
    n: '03',
    label: 'Policy',
    desc: 'The path is constrained by risk, approvals, and operator rules before execution.',
    tone: 'control',
    Icon: ShieldCheck,
  },
  {
    n: '04',
    label: 'Tools',
    desc: 'Skills, MCPs, subagents, and local capabilities execute within a governed frame.',
    tone: 'action',
    Icon: Wrench,
  },
  {
    n: '05',
    label: 'Response',
    desc: 'The result returns with auditability, provenance, and the right surface shape.',
    tone: 'resolution',
    Icon: CheckCircle,
  },
]

export function FlowSection() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return

    ensureGsapPlugins()
    const reduce = prefersReducedMotion()

    const ctx = gsap.context(() => {
      createReveal('[data-flow-card]', {
        trigger: rootRef.current!,
        start: 'top 76%',
        y: 22,
        duration: 0.8,
        stagger: 0.1,
      })

      const path = rootRef.current!.querySelector<SVGPathElement>('[data-flow-path]')
      if (path) {
        setupLineDraw(path)
        animateLineDraw(path, {
          trigger: '[data-flow-scene]',
          start: 'top 80%',
          end: 'bottom 45%',
          scrub: 0.7,
          duration: 1,
          ease: 'none',
        })
      }

      const vpath = rootRef.current!.querySelector<SVGPathElement>('[data-flow-vpath]')
      if (vpath) {
        setupLineDraw(vpath)
        animateLineDraw(vpath, {
          trigger: '[data-flow-mobile]',
          start: 'top 85%',
          end: 'bottom 30%',
          scrub: 0.6,
          duration: 1,
          ease: 'none',
        })
      }

      if (!reduce) {
        gsap.to('[data-flow-signal]', {
          xPercent: 8,
          duration: 1.8,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          stagger: 0.14,
        })
      }
    }, rootRef)

    const detachGlow = attachMagneticGlow(rootRef.current, '[data-flow-card]')

    return () => {
      detachGlow()
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="flow"
      ref={rootRef}
      className="relative section-rhythm section-terminal-bridge border-y border-border-solid bg-surface-raised"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 text-center md:mb-18">
          <p className="eyebrow mb-4 justify-center mx-auto">02 - Flow</p>
          <h2 className="text-heading sm:text-display-sm text-neutral-50 mb-5">
            From language to governed action
          </h2>
          <p className="text-body-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            The point is not only execution. Basilisk shapes intent into an auditable
            path before it touches tools, operators, or local systems.
          </p>
        </div>

        <div data-flow-scene className="relative hidden md:block">
          <svg
            viewBox="0 0 1180 180"
            className="pointer-events-none absolute inset-x-0 top-12 h-28 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="flowLineStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
                <stop offset="40%" stopColor="#10b981" stopOpacity="0.5" />
                <stop offset="75%" stopColor="#5b8af5" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#5b8af5" stopOpacity="0.08" />
              </linearGradient>
            </defs>

            <path
              d="M 92 78 H 1088"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
              strokeDasharray="3 8"
            />
            <path
              data-flow-path
              d="M 92 78 C 192 78, 192 78, 320 78 S 444 78, 572 78 S 700 78, 828 78 S 958 78, 1088 78"
              fill="none"
              stroke="url(#flowLineStroke)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>

          <ol className="relative grid grid-cols-5 gap-4">
            {steps.map((step) => {
              const { Icon } = step
              return (
                <li key={step.n} data-flow-card className="relative">
                  <div className="relative flex h-full min-h-[214px] flex-col rounded-[22px] border border-white/7 bg-white/[0.015] px-5 py-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="icon-badge icon-badge-accent rounded-2xl h-11 w-11">
                        <Icon size={20} />
                      </div>
                      <span className="rounded-full border border-white/7 px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.14em] text-neutral-500">
                        {step.tone}
                      </span>
                    </div>

                    <div className="mt-5 flex items-center gap-3">
                      <span className="text-[10px] font-mono tracking-[0.18em] text-neutral-600">
                        {step.n}
                      </span>
                      <h3 className="text-lg font-semibold text-neutral-100">
                        {step.label}
                      </h3>
                    </div>

                    <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
                      {step.desc}
                    </p>

                    <div className="mt-auto pt-5">
                      <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-600">
                        <span
                          data-flow-signal
                          className="h-2 w-2 rounded-full bg-accent shadow-glow-sm"
                        />
                        governed step
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div data-flow-mobile className="relative mx-auto max-w-md md:hidden">
          <svg
            viewBox="0 0 40 620"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-[22px] top-6 h-[calc(100%-3rem)] w-[2px]"
            aria-hidden="true"
          >
            <path
              data-flow-vpath
              d="M 20 0 L 20 620"
              stroke="#10b981"
              strokeOpacity="0.42"
              strokeWidth="1.25"
              fill="none"
            />
          </svg>

          <ol className="flex flex-col gap-5">
            {steps.map((step) => {
              const { Icon } = step
              return (
                <li key={step.n} data-flow-card className="relative">
                  <div className="rounded-[20px] border border-white/7 bg-white/[0.015] px-4 py-4">
                    <div className="flex items-start gap-4">
                      <div className="icon-badge icon-badge-accent mt-0.5 h-11 w-11 rounded-2xl">
                        <Icon size={18} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono tracking-[0.14em] text-neutral-600">
                            {step.n}
                          </span>
                          <span className="text-caption font-medium text-neutral-100">
                            {step.label}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
                          {step.desc}
                        </p>
                        <div className="mt-3 text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-600">
                          {step.tone}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
