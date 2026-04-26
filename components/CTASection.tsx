'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight, Check, Copy } from 'lucide-react'
import gsap from 'gsap'
import { createReveal, ensureGsapPlugins } from './motion'
import FoxMascot from './FoxMascot'

const INSTALL_CMD = 'npm run go'
const referenceLinks = [
  { label: 'First run', href: '/start' },
  { label: 'Demo', href: '/demo' },
  { label: 'Examples', href: '/examples' },
  { label: 'Editions', href: '/editions' },
  { label: 'Release', href: '/release' },
  { label: 'Feedback', href: '/feedback' },
  { label: 'Integracoes', href: '/integrations' },
  { label: 'Quickstart', href: '/docs#quickstart' },
  { label: 'Seguranca', href: '/security' },
  { label: 'Changelog', href: '/changelog' },
]

export function CTASection() {
  const [copied, setCopied] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Silent fail.
    }
  }

  useLayoutEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      createReveal('[data-cta-header]', {
        trigger: rootRef.current!,
        start: 'top 78%',
        y: 18,
        duration: 0.8,
      })
      createReveal('[data-cta-item]', {
        trigger: '[data-cta-content]',
        start: 'top 82%',
        y: 18,
        duration: 0.75,
        stagger: 0.08,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="get-started"
      ref={rootRef}
      className="relative section-rhythm overflow-hidden"
    >
      {/* Background orbital glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(16, 185, 129, 0.04), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-6">
        <div data-cta-content className="text-center">
          <div data-cta-header>
            <div className="mx-auto mb-6 flex justify-center">
              <FoxMascot size={65} />
            </div>
            <p className="eyebrow mb-4 justify-center mx-auto">05 - Comecar</p>
            <h2 className="section-title-display text-heading sm:text-display-sm text-neutral-50 mb-5">
              Pronto para rodar na<br />
              <span className="signal-text">sua propria maquina.</span>
            </h2>
            <p className="section-lead text-body-lg leading-relaxed text-neutral-500 mb-10">
              Um runtime de agente que voce instala, configura e controla.
              Local-first, governado, auditavel.
            </p>
          </div>

          {/* Install Command */}
          <div data-cta-item className="mx-auto max-w-md mb-8">
            <div className="surface flex items-center gap-3 rounded-2xl px-5 py-4">
              <span className="select-none font-mono text-[14px] text-accent">&gt;</span>
              <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[14px] text-neutral-200">
                {INSTALL_CMD}
              </code>
              <button
                onClick={handleCopy}
                className="shrink-0 rounded-lg p-2 text-neutral-600 transition-all duration-200 hover:bg-surface-raised hover:text-neutral-300"
                aria-label={copied ? 'Copied' : 'Copy install command'}
              >
                {copied ? (
                  <Check size={15} className="text-accent" />
                ) : (
                  <Copy size={15} />
                )}
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div data-cta-item className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href="/start"
              className="btn-sheen group inline-flex items-center gap-2.5 rounded-2xl bg-accent px-10 py-4 text-[15px] font-semibold text-surface transition-all duration-300 hover:bg-accent-light hover:shadow-glow"
            >
              Comecar agora
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="/demo"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-10 py-4 text-[15px] font-medium text-neutral-300 transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]"
            >
              Ver demo
            </a>
          </div>

          {/* Reference Links */}
          <div data-cta-item className="mt-10 flex flex-wrap justify-center gap-x-5 gap-y-3">
            {referenceLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[12px] text-neutral-600 transition-colors hover:text-neutral-300 font-mono uppercase tracking-[0.12em]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
