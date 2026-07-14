'use client'

import React, { useEffect, useState } from 'react'
import { ZCursor, ZRow, ZSurface } from './ZSurface'

/**
 * Capacities — editorial grid + one branded surface (not a generic terminal).
 */

const abilities = [
  {
    num: '01',
    name: 'Habilidades',
    text: 'Capacidades sob demanda — arquivos, canais, comandos e fluxos definidos pelo operador.',
  },
  {
    num: '02',
    name: 'Aprendizado contínuo',
    text: 'Cada execução gera contexto. O runtime reutiliza o que funcionou, localmente.',
  },
  {
    num: '03',
    name: 'Memória local',
    text: 'Preferências e histórico no ambiente do operador — legíveis, editáveis e sob controle.',
  },
  {
    num: '04',
    name: 'Continuidade',
    text: 'Interrompa e retome com o mesmo contexto, as mesmas provas e a mesma política.',
  },
  {
    num: '05',
    name: 'Canais autorizados',
    text: 'Telegram e outros canais apenas com permissão. Mesma regra: plano, aprovação, ação.',
  },
  {
    num: '06',
    name: 'Prova local',
    text: 'Recibos e trilhas ficam no disco do operador, prontos para revisão e retomada.',
  },
] as const

function useTypeLine(full: string, delay = 400, speed = 20) {
  const [out, setOut] = useState('')
  useEffect(() => {
    let i = 0
    let t: ReturnType<typeof setTimeout>
    const start = setTimeout(() => {
      const tick = () => {
        i += 1
        setOut(full.slice(0, i))
        if (i < full.length) t = setTimeout(tick, speed)
      }
      tick()
    }, delay)
    return () => {
      clearTimeout(start)
      clearTimeout(t)
    }
  }, [full, delay, speed])
  return out
}

function RunSurface() {
  const cmd = 'zavorth run "organize invoices/ e avise no Telegram"'
  const line = useTypeLine(cmd, 450, 16)
  const done = line.length >= cmd.length
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!done) {
      setStep(0)
      return
    }
    const id = window.setInterval(() => {
      setStep((s) => (s >= 5 ? 5 : s + 1))
    }, 650)
    return () => clearInterval(id)
  }, [done])

  return (
    <ZSurface
      label="session"
      meta="skills · local"
      status="gated"
      className="cap-surface"
      footer={
        <>
          <span className="zs-foot-ok">ciclo de confiança</span>
          <span className="zs-foot-dim">approvals on</span>
          <span className="zs-foot-dim zs-foot-end">ses-a1</span>
        </>
      }
    >
      <ZRow tone="mute">intent · files + telegram</ZRow>
      <ZRow tone="cmd">
        <span className="zs-prompt">❯</span>
        {line}
        {!done ? <ZCursor /> : null}
      </ZRow>
      {step >= 1 ? <ZRow tone="dim">intent capturada · ses-a1</ZRow> : null}
      {step >= 2 ? <ZRow tone="dim">plan.md · 6 passos · risco write</ZRow> : null}
      {step >= 2 ? <ZRow tone="dim">escopo · 12 arquivos · invoices/</ZRow> : null}
      {step >= 3 ? <ZRow tone="wait">gate · aguardando aprovação</ZRow> : null}
      {step >= 4 ? (
        <div className="zs-keys" aria-hidden>
          <span className="is-primary">aprovar</span>
          <span>rejeitar</span>
          <span>ver diff</span>
        </div>
      ) : null}
      {step >= 5 ? <ZRow tone="ok">sandbox idle · prova pendente</ZRow> : null}
      {step >= 5 ? (
        <ZRow tone="cmd">
          <span className="zs-prompt">❯</span>
          <ZCursor />
        </ZRow>
      ) : null}
    </ZSurface>
  )
}

export function FeaturesGridSection() {
  return (
    <section
      id="features"
      className="landing-surface relative border-t border-white/[0.06] py-24 sm:py-32 scroll-mt-20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,232,143,0.05),transparent_55%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        <div className="max-w-2xl">
          <span className="section-kicker">Capacidades</span>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Habilidades que evoluem{' '}
            <span className="text-emerald-400">com o uso</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-400 sm:text-[17px]">
            Capacidades sob demanda, memória local e um ciclo de confiança que aprende com a
            operação — sob controle do operador.
          </p>
        </div>

        <ul className="cap-grid mt-14 sm:mt-16">
          {abilities.map((item) => (
            <li key={item.num} className="cap-item">
              <span className="cap-num" aria-hidden>
                {item.num}
              </span>
              <div className="cap-copy">
                <h3 className="cap-name">{item.name}</h3>
                <p className="cap-text">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-14 sm:mt-16">
          <RunSurface />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-neutral-500 max-w-xl">
              Linguagem natural → plano legível → aprovação → prova local.
            </p>
            <a
              href="/demo"
              className="inline-flex text-sm font-medium text-emerald-400 transition-colors hover:text-emerald-300 shrink-0"
            >
              Ver demonstração →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
