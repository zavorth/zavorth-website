'use client'

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { createReveal, ensureGsapPlugins, attachMagneticGlow } from './motion'

type GovernanceStage = {
  n: string
  label: string
  kicker: string
  desc: string
  emphasis?: boolean
}

const stages: GovernanceStage[] = [
  {
    n: '01',
    label: 'Politica',
    kicker: 'Antes da execucao',
    desc: 'Regras definem o que e permitido, bloqueado ou escalado antes de qualquer tool rodar.',
  },
  {
    n: '02',
    label: 'Aprovacao',
    kicker: 'Quando o risco sobe',
    desc: 'Acoes sensiveis param para revisao humana em vez de seguirem em silencio.',
    emphasis: true,
  },
  {
    n: '03',
    label: 'Execucao',
    kicker: 'Dentro do escopo',
    desc: 'Tools e automacoes rodam com o contexto correto e limites ja definidos.',
  },
  {
    n: '04',
    label: 'Evidencia',
    kicker: 'Depois do run',
    desc: 'Cada resultado volta com rastreabilidade, proveniencia e historico revisavel.',
  },
]

export function GovernedPathSection() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return

    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      createReveal('[data-governance-header]', {
        trigger: rootRef.current!,
        start: 'top 78%',
        y: 18,
        duration: 0.8,
      })

      createReveal('[data-governance-stage]', {
        trigger: '[data-governance-grid]',
        start: 'top 82%',
        y: 18,
        duration: 0.75,
        stagger: 0.08,
      })
    }, rootRef)

    const cleanupGlow = attachMagneticGlow(rootRef.current!)

    return () => {
      ctx.revert()
      cleanupGlow()
    }
  }, [])

  return (
    <section
      id="governance"
      ref={rootRef}
      className="relative section-rhythm section-terminal-bridge border-t border-border-solid/60"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14 text-center md:mb-18" data-governance-header>
          <p className="eyebrow mb-4 justify-center mx-auto">02 - Execucao governada</p>
          <h2 className="section-title-display section-title-accent text-heading sm:text-display-sm text-neutral-50 mb-5">
            Governanca nao e um recurso.
            <br />
            <span className="signal-text">E a arquitetura.</span>
          </h2>
          <p className="section-lead text-body-lg text-neutral-500 leading-relaxed">
            O ponto nao e apenas executar. Basilisk mantem politica, aprovacao,
            execucao e evidencia dentro de uma cadeia continua.
          </p>
        </div>

        <div className="mx-auto max-w-5xl">
          <div
            className="mb-8 flex items-center justify-center gap-3 text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-600"
            data-governance-header
          >
            <span className="h-px w-8 bg-white/[0.06]" aria-hidden="true" />
            politica
            <span className="text-neutral-700">/</span>
            aprovacao
            <span className="text-neutral-700">/</span>
            execucao
            <span className="text-neutral-700">/</span>
            evidencia
            <span className="h-px w-8 bg-white/[0.06]" aria-hidden="true" />
          </div>

          <div data-governance-grid>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {stages.map((stage, index) => (
                <div
                  key={stage.n}
                  data-governance-stage
                  className="card-premium magnetic-glow rounded-[24px] p-6 lg:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-600">
                      {stage.n}
                    </span>
                    <span
                      className={[
                        'text-[10px] font-mono uppercase tracking-[0.18em]',
                        stage.emphasis ? 'text-accent' : 'text-neutral-600',
                      ].join(' ')}
                    >
                      {stage.kicker}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[1.08rem] font-medium tracking-[-0.02em] text-neutral-100">
                    {stage.label}
                  </h3>

                  <p className="mt-3 text-[13px] leading-relaxed text-neutral-500">
                    {stage.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-center text-[13px] leading-relaxed text-neutral-600">
            Governanca nao deve ficar ao lado do fluxo como um pacote separado.
            Ela deve moldar o run desde o inicio.
          </p>
        </div>
      </div>
    </section>
  )
}
