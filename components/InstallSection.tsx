'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { Check, Copy, Play, RefreshCw } from 'lucide-react'
import { ZRow, ZSurface } from './ZSurface'
import { InkRevealCanvas } from './InkRevealCanvas'

const INSTALL_CMD = 'npm install -g zavorth@latest'

const logSteps = [
  { text: 'fetching package metadata...', delay: 350 },
  { text: 'unpacking library contents... [14.2MB]', delay: 450 },
  { text: 'verifying local environment node >= 18... [OK]', delay: 300 },
  { text: 'allocating secure local memory sandbox... [OK]', delay: 400 },
  { text: 'generating local cryptographic checksums... [OK]', delay: 500 },
  { text: '✓ zavorth 1.0.0 installed successfully in ~/bin/zavorth!', delay: 350 },
]

export function InstallSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const [simulating, setSimulating] = useState(false)
  const [simDone, setSimDone] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = INSTALL_CMD
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const startSimulation = async () => {
    if (simulating) return
    setSimulating(true)
    setSimDone(false)
    setLogs([])

    const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

    // Start simulation steps
    await sleep(200)

    for (let i = 0; i < logSteps.length; i++) {
      setLogs(prev => [...prev, logSteps[i].text])
      await sleep(logSteps[i].delay)
    }

    setSimulating(false)
    setSimDone(true)
  }

  const resetSimulation = () => {
    setLogs([])
    setSimDone(false)
    setSimulating(false)
  }

  return (
    <section
      id="install"
      ref={sectionRef}
      className="landing-final-surface relative scroll-mt-20 overflow-hidden py-24 sm:py-32"
    >
      {/* Procedural Ink Reveal Artwork Background */}
      <InkRevealCanvas
        imageSrc="/artwork/hero-bg.png"
        maskColor="8, 8, 8"
        maxRadius={150}
        lifetime={1800}
      />

      {/* Subtle Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none select-none opacity-[0.04] bg-grid-pattern"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        
        {/* ZAVORTH (top) · mascot (middle) · AGENT (legs) — hero stack with pixel mascot */}
        <div
          data-ghost-wordmark
          className="install-agent-mark pointer-events-none relative mx-auto mb-8 select-none"
          aria-hidden="true"
        >
          <div className="install-agent-stage">
            <p className="install-agent-text install-agent-back">ZAVORTH</p>
            <div className="install-agent-mascot">
              <span className="install-agent-glow" />
              <Image
                src="/brand/zavorth-mascot.svg"
                alt=""
                width={210}
                height={210}
                className="install-agent-mascot-img"
                unoptimized
                priority
              />
            </div>
            <p className="install-agent-text install-agent-front">AGENT</p>
          </div>
        </div>

        <h3 className="relative text-3xl font-semibold tracking-normal text-white sm:text-4xl">
          Instale o runtime local
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-500 font-light">
          Um comando. Runtime no seu ambiente. Habilidades, memória e aprovação de risco desde o primeiro start.
        </p>

        <div className="mx-auto mt-10 max-w-xl text-left">
          <ZSurface
            label="install"
            meta="npm · global"
            status={simDone ? 'ready' : simulating ? 'running' : 'idle'}
            footer={
              <>
                {!simulating && !simDone ? (
                  <button
                    type="button"
                    onClick={startSimulation}
                    className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-wide text-emerald-400 hover:text-emerald-300"
                  >
                    <Play size={10} />
                    Simular instalação
                  </button>
                ) : null}
                {simDone ? (
                  <button
                    type="button"
                    onClick={resetSimulation}
                    className="inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-wide text-neutral-400 hover:text-white"
                  >
                    <RefreshCw size={10} />
                    Limpar
                  </button>
                ) : null}
                {simulating ? <span className="zs-foot-dim">instalando…</span> : null}
                <button
                  type="button"
                  onClick={handleCopy}
                  className="ml-auto inline-flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-wide text-neutral-400 hover:text-white"
                >
                  {copied ? (
                    <>
                      <Check size={10} className="text-emerald-400" />
                      <span className="text-emerald-400">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy size={10} />
                      Copiar
                    </>
                  )}
                </button>
              </>
            }
          >
            <ZRow tone="cmd">
              <span className="zs-prompt">❯</span>
              {INSTALL_CMD}
            </ZRow>
            {logs.map((log) => (
              <ZRow key={log} tone={log.startsWith('✓') ? 'ok' : 'dim'}>
                {log}
              </ZRow>
            ))}
            {simulating ? (
              <ZRow tone="ok">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping mr-2" />
                resolvendo pacote local…
              </ZRow>
            ) : null}
          </ZSurface>
        </div>

        {/* TUI Keycaps and requirements */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 font-mono text-[9px] tracking-wide text-neutral-600">
            <span>REQUISITOS: Node.js 18+</span>
            <span>&middot;</span>
            <span>OS: macOS / Linux / Windows</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <a
              href="/demo"
              className="text-[13px] font-medium text-emerald-400 transition-colors hover:text-emerald-300"
            >
              Ver demonstração sem instalar →
            </a>
            <a
              href="/start"
              className="text-[13px] font-medium text-neutral-400 transition-colors hover:text-white"
            >
              Guia do primeiro uso
            </a>
          </div>

          {/* Styled Developer Keycaps */}
          <div className="flex items-center gap-1.5 mt-2 select-none">
            <span className="px-1.5 py-0.5 font-mono text-[9px] font-bold border border-white/10 rounded bg-white/5 text-neutral-400 shadow-[0_2px_4px_rgba(0,0,0,0.5)]">NPM</span>
            <span className="px-1.5 py-0.5 font-mono text-[9px] font-bold border border-white/10 rounded bg-white/5 text-neutral-400 shadow-[0_2px_4px_rgba(0,0,0,0.5)]">INSTALL</span>
            <span className="text-neutral-600 font-mono text-[9px] px-0.5">&amp;</span>
            <span className="px-1.5 py-0.5 font-mono text-[9px] font-bold border border-emerald-500/20 rounded bg-emerald-500/5 text-emerald-400 shadow-[0_2px_6px_rgba(16,185,129,0.1)]">ZAVORTH</span>
            <span className="px-1.5 py-0.5 font-mono text-[9px] font-bold border border-emerald-500/20 rounded bg-emerald-500/5 text-emerald-400 shadow-[0_2px_6px_rgba(16,185,129,0.1)]">START</span>
          </div>
        </div>
      </div>
    </section>
  )
}
