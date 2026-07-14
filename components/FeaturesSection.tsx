'use client'

import React, { useEffect, useState } from 'react'
import { ZCursor, ZRow, ZSurface } from './ZSurface'

/**
 * Single product console — shell + plan + gate as panes of one surface.
 * Not three generic macOS windows.
 */

export function FeaturesSection() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => (t + 1) % 6), 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="trust"
      data-proof-section
      className="landing-surface relative scroll-mt-20 border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_0%,rgba(0,232,143,0.06),transparent_48%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="mb-12 max-w-2xl">
          <span className="section-kicker">Runtime</span>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Runtime, plano e{' '}
            <span className="text-emerald-400">aprovação</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-400 sm:text-lg">
            Shell, planejamento e gate no mesmo console. O operador acompanha cada etapa antes de
            qualquer alteração no sistema.
          </p>
        </div>

        <div data-zavorth-proof className="zs-console">
          <ZSurface
            label="zavorth control"
            meta="core · local"
            status="ready"
            tall
            footer={
              <>
                <span className="zs-foot-ok">ciclo de confiança</span>
                <span className="zs-foot-dim">policy on</span>
                <span className="zs-foot-dim">ses-a1</span>
                <span className="zs-foot-dim zs-foot-end">24ms gateway</span>
              </>
            }
          >
            <div className="zs-panes">
              {/* Shell */}
              <div className="zs-pane">
                <div className="zs-pane-label">shell</div>
                <ZRow tone="mute">boot · portable-pty</ZRow>
                <ZRow tone="cmd">
                  <span className="zs-prompt">❯</span>
                  zavorth start
                  {tick === 0 ? <ZCursor /> : null}
                </ZRow>
                <ZRow tone="dim" faint={tick < 1}>
                  resolving runtime · local core
                </ZRow>
                <ZRow tone="ok" faint={tick < 2}>
                  gateway :33333 · 24ms
                </ZRow>
                <ZRow tone="ok" faint={tick < 3}>
                  memory · skills · policy
                </ZRow>
                <ZRow tone="ok" faint={tick < 4}>
                  ready · waiting for intent
                </ZRow>
                {tick >= 4 ? (
                  <ZRow tone="cmd">
                    <span className="zs-prompt">❯</span>
                    <ZCursor />
                  </ZRow>
                ) : null}
              </div>

              {/* Plan */}
              <div className="zs-pane">
                <div className="zs-pane-label">
                  plan
                  <span className="zs-tag is-warn">write</span>
                </div>
                <ZRow tone="mute">plan.md · 6 passos</ZRow>
                <ZRow tone="dim">
                  <span className="zs-idx">01</span> list invoices/
                </ZRow>
                <ZRow tone="dim">
                  <span className="zs-idx">02</span> group by month
                </ZRow>
                <ZRow tone="wait">
                  <span className="zs-idx">03</span> move → archived/
                </ZRow>
                <ZRow tone="dim">
                  <span className="zs-idx">04</span> telegram notify
                </ZRow>
                <ZRow tone="ok">sem execução ainda</ZRow>
              </div>

              {/* Gate */}
              <div className="zs-pane zs-pane-gate">
                <div className="zs-pane-label">
                  gate
                  <span className="zs-tag is-live">pending</span>
                </div>
                <ZRow tone="mute">ação sensível bloqueada</ZRow>
                <ZRow tone="wait">12 arquivos · diff +12 / −3</ZRow>
                <div className="zs-keys" aria-hidden>
                  <span className="is-primary">aprovar</span>
                  <span>rejeitar</span>
                  <span>editar</span>
                </div>
                <ZRow tone="dim">prova após confirmação</ZRow>
              </div>
            </div>
          </ZSurface>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-neutral-500">
          Runtime local · plano legível · aprovação antes de mutar · prova local
        </p>
      </div>
    </section>
  )
}
