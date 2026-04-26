'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { FileText, Play, ShieldCheck, UserCheck } from 'lucide-react'
import gsap from 'gsap'
import {
  animateLineDraw,
  attachMagneticGlow,
  createReveal,
  ensureGsapPlugins,
  prefersReducedMotion,
  setupLineDraw,
} from './motion'

type Stage = {
  title: string
  desc: string
  tone: string
  Icon: React.ComponentType<{ size?: number | string; className?: string }>
}

const stages: Stage[] = [
  {
    title: 'Policy',
    desc: 'Rules evaluate actions before they execute, shaping what is allowed in the first place.',
    tone: 'guardrail',
    Icon: ShieldCheck,
  },
  {
    title: 'Approval',
    desc: 'Sensitive paths can pause for human sign-off before anything irreversible happens.',
    tone: 'human gate',
    Icon: UserCheck,
  },
  {
    title: 'Execution',
    desc: 'Tools, skills, and automations run in bounded scope with logging and traceability.',
    tone: 'bounded action',
    Icon: Play,
  },
  {
    title: 'Audit',
    desc: 'The system leaves behind evidence, provenance, and replayable decision history.',
    tone: 'evidence',
    Icon: FileText,
  },
]

const nodeXs = [92, 292, 492, 692]

export function ControlSection() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return

    ensureGsapPlugins()
    const reduce = prefersReducedMotion()

    const ctx = gsap.context(() => {
      createReveal('[data-control-card]', {
        trigger: rootRef.current!,
        start: 'top 76%',
        y: 18,
        duration: 0.8,
        stagger: 0.08,
      })

      const line = rootRef.current!.querySelector<SVGPathElement>('[data-control-line]')
      if (line) {
        setupLineDraw(line)
        animateLineDraw(line, {
          trigger: '[data-control-flow]',
          start: 'top 80%',
          duration: 1.3,
          ease: 'power2.inOut',
        })
      }

      if (!reduce) {
        gsap.to('[data-control-pulse]', {
          scale: 1.35,
          opacity: 0,
          duration: 1.6,
          ease: 'power2.out',
          repeat: -1,
          stagger: 0.24,
        })
      }
    }, rootRef)

    const detachGlow = attachMagneticGlow(rootRef.current, '[data-control-card]')

    return () => {
      detachGlow()
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="control"
      ref={rootRef}
      className="relative section-rhythm section-terminal-bridge border-y border-border-solid bg-surface-raised"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14 md:mb-18">
          <p className="eyebrow mb-4 justify-center mx-auto">04 - Control</p>
          <h2 className="text-heading sm:text-display-sm text-neutral-50 mb-5">
            Built for control
          </h2>
          <p className="text-body-lg text-neutral-500 max-w-2xl mx-auto leading-relaxed">
            Basilisk is strongest when it stays disciplined. Policy, approval,
            execution, and audit remain one continuous chain instead of a set of
            disconnected safety features.
          </p>
        </div>

        <div data-control-flow className="relative mx-auto mb-10 md:mb-14">
          <svg
            viewBox="0 0 780 92"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-3 hidden h-16 w-full md:block"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="ctrlStroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#10b981" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#5b8af5" stopOpacity="0.14" />
              </linearGradient>
            </defs>

            <line
              x1="40"
              y1="34"
              x2="740"
              y2="34"
              stroke="rgba(255,255,255,0.04)"
              strokeWidth="1"
              strokeDasharray="3 7"
            />
            <path
              data-control-line
              d="M 40 34 H 740"
              stroke="url(#ctrlStroke)"
              strokeWidth="1.35"
              fill="none"
              strokeLinecap="round"
            />

            {nodeXs.map((x) => (
              <g key={x}>
                <circle cx={x} cy={34} r="9" fill="rgba(16,185,129,0.06)" />
                <circle data-control-pulse cx={x} cy={34} r="7" fill="rgba(16,185,129,0.14)" />
                <circle cx={x} cy={34} r="5" fill="rgba(12,12,18,0.96)" stroke="rgba(16,185,129,0.35)" strokeWidth="1" />
                <circle cx={x} cy={34} r="2" fill="#10b981" />
              </g>
            ))}
          </svg>

          <div className="hidden grid-cols-4 gap-4 pt-10 md:grid">
            {stages.map((stage) => {
              const { Icon } = stage
              return (
                <div key={stage.title} data-control-card>
                  <div className="rounded-[22px] border border-white/7 bg-white/[0.015] px-5 py-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="icon-badge icon-badge-accent rounded-2xl h-10 w-10">
                        <Icon size={20} />
                      </div>
                      <span className="rounded-full border border-white/7 px-2.5 py-1 text-[9px] font-mono uppercase tracking-[0.14em] text-neutral-500">
                        {stage.tone}
                      </span>
                    </div>

                    <h3 className="mt-4 text-subheading text-neutral-100">
                      {stage.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col gap-4 md:hidden">
            {stages.map((stage) => {
              const { Icon } = stage
              return (
                <div key={stage.title} data-control-card>
                  <div className="rounded-[20px] border border-white/7 bg-white/[0.015] px-4 py-4">
                    <div className="flex items-start gap-4">
                      <div className="icon-badge icon-badge-accent mt-0.5 rounded-2xl h-11 w-11">
                        <Icon size={18} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-caption font-medium text-neutral-100">
                            {stage.title}
                          </span>
                          <span className="text-[9px] font-mono uppercase tracking-[0.14em] text-neutral-600">
                            {stage.tone}
                          </span>
                        </div>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-500">
                          {stage.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
