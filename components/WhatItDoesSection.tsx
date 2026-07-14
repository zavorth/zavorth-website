'use client'

import React, { useEffect, useRef, useState } from 'react'

const steps = [
  {
    id: 'intent',
    num: '01',
    title: 'Intenção',
    description: 'Você define o objetivo em linguagem natural.',
    detail: 'O pedido entra pelo painel local ou canais autorizados. O processador local interpreta a sua intenção sem enviar seus dados confidenciais para fora da rede.',
    panel: (
      <div className="font-mono text-[11px] leading-relaxed text-neutral-400 space-y-2">
        <div className="text-neutral-600 border-b border-white/5 pb-2 mb-3">session_input · local</div>
        <div className="flex items-center gap-2 text-white">
          <span className="text-emerald-400">❯</span>
          <span>zavorth run "organizar faturas de janeiro"</span>
        </div>
        <div className="text-neutral-500">[info] analisando workspace...</div>
        <div className="text-neutral-500">[info] parsing local concluído em 12ms</div>
      </div>
    )
  },
  {
    id: 'plan',
    num: '02',
    title: 'Planejamento',
    description: 'O runtime elabora um plano de ação completo.',
    detail: 'O agente escreve um arquivo de plano contendo cada comando, modificação de arquivo e chamada externa de API. Nenhum código roda ainda nesta fase.',
    panel: (
      <div className="font-mono text-[11px] leading-relaxed text-neutral-400 space-y-2">
        <div className="text-neutral-600 border-b border-white/5 pb-2 mb-3">plan.md · 3 passos gerados</div>
        <div className="text-neutral-500">passos recomendados:</div>
        <div className="text-emerald-400 font-semibold">+ criar diretório: /arquivados/2026-01/</div>
        <div className="text-emerald-400 font-semibold">+ mover: faturas/fat_01.pdf {"->"} /arquivados/2026-01/</div>
        <div className="text-emerald-400 font-semibold">+ mover: faturas/fat_02.pdf {"->"} /arquivados/2026-01/</div>
      </div>
    )
  },
  {
    id: 'gate',
    num: '03',
    title: 'Aprovação Obrigatória',
    description: 'Operações críticas aguardam sua decisão.',
    detail: 'Modificações no sistema e ações sensíveis são bloqueadas em um portal de controle. Você audita o plano e as alterações pendentes e decide se aprova ou rejeita.',
    panel: (
      <div className="font-mono text-[11px] leading-relaxed text-neutral-400 space-y-3">
        <div className="text-amber-500 border-b border-amber-500/10 pb-2 mb-2 flex items-center justify-between">
          <span>approval_gate · pending</span>
          <span className="animate-pulse text-[8px] bg-amber-500/10 px-1.5 py-0.5 rounded text-amber-500 font-bold">Aguardando</span>
        </div>
        <div className="text-neutral-300">Alteração de escrita detectada:</div>
        <div className="text-neutral-500 font-mono text-[10px]">risco: escrita de arquivos · modificações: 2</div>
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
          <div className="border border-emerald-500/30 bg-emerald-500/5 text-emerald-400 text-center py-1.5 rounded font-semibold cursor-default text-[10px]">
            [ APROVAR ]
          </div>
          <div className="border border-white/10 text-neutral-500 text-center py-1.5 rounded cursor-default text-[10px]">
            [ REJEITAR ]
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'proof',
    num: '04',
    title: 'Prova de Execução',
    description: 'Ação isolada com recibo criptográfico local.',
    detail: 'Após sua aprovação, o runtime executa as ações em sandbox seguro e grava um recibo de auditoria inalterável (hash SHA-256) diretamente no seu disco.',
    panel: (
      <div className="font-mono text-[11px] leading-relaxed text-neutral-400 space-y-2">
        <div className="text-emerald-400 border-b border-emerald-400/10 pb-2 mb-3 flex items-center justify-between">
          <span>sandbox_execution · success</span>
          <span className="text-[8px] bg-emerald-400/10 px-1.5 py-0.5 rounded text-emerald-400 font-bold">Exit 0</span>
        </div>
        <div className="text-neutral-500">[sandbox] gravando faturas arquivadas...</div>
        <div className="text-neutral-300">✔ Prova criptográfica gerada localmente:</div>
        <div className="bg-white/[0.02] border border-white/5 p-2 rounded text-[10px] text-emerald-400 break-all select-all select-none">
          sha256:fbea87f2ea304fd4d5fc92c0a006638b0a8aa6
        </div>
      </div>
    )
  },
] as const

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const totalScrollable = el.offsetHeight - vh
      
      const currentScroll = -rect.top
      const p = Math.max(0, Math.min(1, currentScroll / totalScrollable))
      setProgress(p)

      let activeIndex = Math.min(steps.length - 1, Math.floor(p * steps.length))
      if (p >= 0.98) activeIndex = steps.length - 1
      setActive(activeIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="landing-surface relative border-t border-white/[0.06] scroll-mt-20"
      style={{ height: '300vh' }}
    >
      <div className="sticky top-0 flex min-h-screen items-center py-20 overflow-hidden">
        <div className="relative mx-auto w-full max-w-5xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Lado Esquerdo - Textos editoriais */}
            <div className="lg:col-span-6 flex flex-col justify-center min-h-[50vh] pr-4">
              <span className="section-kicker">O Ciclo de Confiança</span>
              <h2 className="mt-5 font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Transparência absoluta <br />
                <span className="text-emerald-400">em cada execução.</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
                O Zavorth funciona através de um ciclo de controle inalterável. Role para ver como o runtime processa objetivos com governança local.
              </p>

              {/* Etapa Ativa */}
              <div className="mt-12 min-h-[220px]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-emerald-400 border border-emerald-400/30 px-2 py-0.5 rounded-md">
                    Etapa {steps[active].num}
                  </span>
                  <div className="h-[1px] flex-1 bg-white/10" />
                </div>
                <h3 className="mt-6 text-xl sm:text-2xl font-medium text-white">
                  {steps[active].title}
                </h3>
                <p className="mt-3 text-sm text-neutral-300 font-medium">
                  {steps[active].description}
                </p>
                <p className="mt-4 text-xs leading-relaxed text-neutral-500">
                  {steps[active].detail}
                </p>
              </div>

              {/* Progresso scroll */}
              <div className="mt-8 flex items-center gap-4">
                <span className="font-mono text-[10px] text-neutral-500">INIT</span>
                <div className="relative h-[2px] flex-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-emerald-400"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-emerald-400">{Math.round(progress * 100)}%</span>
              </div>
            </div>

            {/* Lado Direito - Painel de Diff do Plano de Ação */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="w-full max-w-[420px] aspect-[4/3] bg-[#070708] rounded-2xl border border-white/5 p-6 shadow-2xl backdrop-blur-md flex flex-col justify-between">
                
                {/* Janela de Simulação do Plano */}
                <div className="flex-1 flex flex-col justify-center">
                  {steps[active].panel}
                </div>

                {/* Rodapé técnico */}
                <div className="mt-6 border-t border-white/5 pt-4 flex justify-between font-mono text-[9px] text-neutral-600 uppercase tracking-widest">
                  <span>zavorth_cycle_status</span>
                  <span className="text-emerald-400/80">secured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
