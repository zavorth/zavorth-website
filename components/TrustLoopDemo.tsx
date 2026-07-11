'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  CheckCircle2,
  FileText,
  GitBranch,
  Play,
  RotateCcw,
  ShieldCheck,
  Terminal,
} from 'lucide-react'

type TrustLoopStep = 'idle' | 'plan' | 'awaiting_approval' | 'receipt'

const USER_REQUEST =
  'Corrija o build no workspace de exemplo, rode os testes e mostre exatamente o que mudou.'

const PLAN_BULLETS = [
  { title: 'Ler', detail: 'package.json e fixture de teste com falha (sem escrita)' },
  { title: 'Patch', detail: 'um arquivo de origem para restaurar o alvo de build' },
  { title: 'Validar', detail: 'check determinístico local (sem rede obrigatória)' },
  { title: 'Rollback', detail: 'caminho de reversão registrado antes de aplicar' },
] as const

const STEP_CHIPS = [
  { match: (s: TrustLoopStep) => s === 'idle', label: 'Pedido', index: 0 },
  { match: (s: TrustLoopStep) => s === 'plan', label: 'Plano', index: 1 },
  {
    match: (s: TrustLoopStep) => s === 'awaiting_approval',
    label: 'Aprovar',
    index: 2,
  },
  { match: (s: TrustLoopStep) => s === 'receipt', label: 'Receipt', index: 3 },
] as const

function stepIndex(step: TrustLoopStep): number {
  if (step === 'idle') return 0
  if (step === 'plan') return 1
  if (step === 'awaiting_approval') return 2
  return 3
}

function formatReceiptTime(date: Date) {
  return date.toISOString().replace('T', ' ').replace(/\.\d{3}Z$/, ' UTC')
}

function makeReceiptId(seq: number) {
  return `rcpt-web-demo-${String(seq).padStart(4, '0')}`
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function TrustLoopDemo() {
  const [step, setStep] = useState<TrustLoopStep>('idle')
  const [seq, setSeq] = useState(1)
  const [receipt, setReceipt] = useState<{ id: string; time: string; status: string } | null>(
    null,
  )
  const sectionRef = useRef<HTMLElement | null>(null)
  const planTimerRef = useRef<number | null>(null)

  const active = useMemo(() => stepIndex(step), [step])

  useEffect(() => {
    return () => {
      if (planTimerRef.current != null) {
        window.clearTimeout(planTimerRef.current)
      }
    }
  }, [])

  const clearPlanTimer = () => {
    if (planTimerRef.current != null) {
      window.clearTimeout(planTimerRef.current)
      planTimerRef.current = null
    }
  }

  const start = () => {
    clearPlanTimer()
    setReceipt(null)
    if (prefersReducedMotion()) {
      // Skip intermediate plan flash for reduced-motion users.
      setStep('awaiting_approval')
      return
    }
    setStep('plan')
    planTimerRef.current = window.setTimeout(() => {
      setStep((current) => (current === 'plan' ? 'awaiting_approval' : current))
      planTimerRef.current = null
    }, 280)
  }

  const approve = () => {
    if (step === 'plan') return
    const nextSeq = seq
    setSeq((value) => value + 1)
    setReceipt({
      id: makeReceiptId(nextSeq),
      time: formatReceiptTime(new Date()),
      status: 'approved · applied',
    })
    setStep('receipt')
  }

  const reset = () => {
    clearPlanTimer()
    setReceipt(null)
    setStep('idle')
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null
    if (
      target &&
      (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
    ) {
      return
    }

    if (event.key === 'Enter' || event.key === ' ') {
      if (step === 'idle') {
        event.preventDefault()
        start()
      } else if (step === 'awaiting_approval') {
        event.preventDefault()
        approve()
      }
      return
    }

    if (event.key === 'a' || event.key === 'A') {
      if (step === 'awaiting_approval') {
        event.preventDefault()
        approve()
      }
      return
    }

    if (event.key === 'Escape' || event.key === 'r' || event.key === 'R') {
      if (step === 'plan' || step === 'awaiting_approval' || step === 'receipt') {
        event.preventDefault()
        reset()
      }
    }
  }

  const showPlan = step === 'plan' || step === 'awaiting_approval' || step === 'receipt'

  return (
    <section
      ref={sectionRef}
      id="trust-loop"
      data-trust-loop-demo
      data-trust-loop-step={step}
      className="rounded-2xl border border-accent/25 bg-gradient-to-b from-accent/[0.07] to-white/[0.018] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-6"
      aria-label="Loop interativo de confiança: pedido, plano, aprovação e receipt"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
            Trust Loop
          </p>
          <h2 className="text-[20px] font-semibold tracking-tight text-neutral-50 sm:text-[22px]">
            Pedido → prévia → aprovar → receipt
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">
            Mini-loop estático alinhado ao produto: nenhuma mutação silenciosa, evidência depois
            da aprovação. Fixture offline — não é uma sessão de agente ao vivo.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-amber-300">
            fixture / offline
          </span>
          <span className="rounded-full border border-white/[0.08] bg-black/30 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-400">
            not live runtime
          </span>
        </div>
      </div>

      <ol className="mb-5 flex flex-wrap gap-2" aria-hidden="true">
        {STEP_CHIPS.map((chip) => {
          const isActive = chip.match(step)
          const isDone = active > chip.index
          return (
            <li
              key={chip.label}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] ${
                isActive
                  ? 'border-accent/40 bg-accent/10 font-semibold text-accent'
                  : isDone
                    ? 'border-white/[0.08] bg-white/[0.03] text-neutral-300'
                    : 'border-white/[0.06] bg-black/20 text-neutral-600'
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                  isActive ? 'bg-accent font-bold text-surface' : 'bg-white/[0.06]'
                }`}
              >
                {chip.index + 1}
              </span>
              {chip.label}
            </li>
          )
        })}
      </ol>

      <div className="grid gap-4">
        <div className="rounded-xl border border-white/[0.07] bg-black/30 p-4">
          <div className="mb-2 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-600">
            <Terminal size={13} className="text-accent" />
            Pedido do operador
          </div>
          <p className="text-[14px] leading-relaxed text-neutral-200">“{USER_REQUEST}”</p>
        </div>

        {showPlan && (
          <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-neutral-600">
              <GitBranch size={13} className="text-accent" />
              Prévia de mudanças
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {PLAN_BULLETS.map((item) => (
                <li
                  key={item.title}
                  className="rounded-lg border border-white/[0.06] bg-black/20 px-3 py-2.5 text-[12px] leading-relaxed text-neutral-400"
                >
                  <span className="font-semibold text-neutral-100">{item.title}</span>
                  <span className="mt-0.5 block">{item.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {step === 'awaiting_approval' && (
          <div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] p-4">
            <div className="mb-1 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-amber-300">
              <ShieldCheck size={13} />
              Aguardando aprovação
            </div>
            <p className="text-[13px] leading-relaxed text-neutral-400">
              Nenhuma escrita aplica sem o seu sinal. A prévia acima é o contrato da mutação.
            </p>
          </div>
        )}

        {step === 'receipt' && receipt && (
          <div className="rounded-xl border border-accent/30 bg-accent/[0.06] p-4">
            <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
              <FileText size={13} />
              Receipt (fixture)
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                  Id
                </p>
                <p className="mt-1 break-all font-mono text-[12px] text-neutral-100">{receipt.id}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                  Hora
                </p>
                <p className="mt-1 font-mono text-[12px] text-neutral-100">{receipt.time}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-neutral-600">
                  Status
                </p>
                <p className="mt-1 font-mono text-[12px] text-neutral-100">{receipt.status}</p>
              </div>
            </div>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent/10 px-3 py-1.5 font-mono text-[11px] font-semibold text-accent">
              <CheckCircle2 size={13} />
              receipt returned · audited
            </p>
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {step === 'idle' && (
          <button
            type="button"
            onClick={start}
            className="btn-sheen inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[13px] font-semibold text-surface"
            aria-keyshortcuts="Enter Space"
          >
            <Play size={14} />
            Iniciar
          </button>
        )}

        {(step === 'plan' || step === 'awaiting_approval') && (
          <>
            <button
              type="button"
              onClick={approve}
              disabled={step === 'plan'}
              className="btn-sheen inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-[13px] font-semibold text-surface disabled:cursor-wait disabled:opacity-60"
              aria-keyshortcuts="Enter Space a"
            >
              <ShieldCheck size={14} />
              Aprovar
            </button>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-[13px] font-medium text-neutral-300 transition-colors hover:text-neutral-100"
              aria-keyshortcuts="Escape r"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </>
        )}

        {step === 'receipt' && (
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-[13px] font-medium text-neutral-300 transition-colors hover:text-neutral-100"
            aria-keyshortcuts="Escape r"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        )}
      </div>

      <p className="mt-4 border-t border-white/[0.06] pt-4 text-[11px] leading-relaxed text-neutral-600">
        Disclaimer: demo de produto estática. Não há runtime de agente ao vivo, secrets ou rede
        externa. Receipts e ids são fixture para explicar o Trust Loop. Teclado: Enter/Espaço
        inicia ou aprova; A aprova; Esc/R reseta.
      </p>
    </section>
  )
}
