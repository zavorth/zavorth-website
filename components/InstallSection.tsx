'use client'

import React, { useState, useRef } from 'react'
import { Check, Copy, Terminal as TermIcon, Play, RefreshCw } from 'lucide-react'

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
  
  // Spotlight position state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return
    const rect = sectionRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

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
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="landing-final-surface relative scroll-mt-20 overflow-hidden py-24 sm:py-32"
    >
      {/* Interactive Grid Background */}
      <div 
        className="absolute inset-0 pointer-events-none select-none opacity-[0.05] bg-grid-pattern transition-opacity duration-500"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Dynamic Cursor Spotlight Beam */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none transition-all duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 232, 143, 0.08), transparent 80%)`
          }}
        />
      )}

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        
        {/* Ghost Wordmark */}
        <div
          data-ghost-wordmark
          aria-hidden="true"
          className="pointer-events-none relative mb-2 flex select-none items-center justify-center overflow-hidden"
        >
          <h2
            className="whitespace-nowrap text-center font-extrabold leading-[0.8] tracking-[-0.06em]"
            style={{
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.01) 90%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
            }}
          >
            ZAVORTH
          </h2>
        </div>

        <h3 className="relative text-3xl font-semibold tracking-normal text-white sm:text-4xl">
          Pronto para começar?
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-500 font-light">
          Rode o instalador global, configure o sandbox seguro localmente e gerencie seus agentes diretamente do terminal.
        </p>

        {/* Premium Interactive Console Terminal */}
        <div className="mx-auto mt-10 max-w-xl rounded-xl border border-white/[0.08] bg-[#050608] shadow-[0_24px_50px_rgba(0,0,0,0.65)] overflow-hidden text-left">
          
          {/* Tab Header bar */}
          <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-3 select-none">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              <div className="ml-4 flex items-center gap-1.5 rounded bg-white/5 border border-white/5 px-2 py-0.5 font-mono text-[9px] text-neutral-400">
                <TermIcon size={8} />
                <span>install.sh</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={handleCopy}
                className="flex items-center gap-1 font-mono text-[9.5px] text-neutral-400 hover:text-white transition-colors bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1 rounded border border-white/[0.05]"
              >
                {copied ? (
                  <>
                    <Check size={9} className="text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy size={9} />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Console Output Screen */}
          <div className="p-6 font-mono text-[10.5px] sm:text-[11.5px] leading-relaxed min-h-[180px] flex flex-col justify-between">
            <div className="space-y-2 select-text">
              <div className="flex items-center gap-2 text-white">
                <span className="text-emerald-400">❯</span>
                <span>{INSTALL_CMD}</span>
              </div>
              
              {/* Animated log lines */}
              <div className="space-y-1.5 text-neutral-400">
                {logs.map((log, idx) => {
                  const isSuccess = log.startsWith('✓')
                  return (
                    <div key={idx} className={isSuccess ? 'text-emerald-400 font-bold' : ''}>
                      {log}
                    </div>
                  )
                })}
              </div>

              {simulating && (
                <div className="flex items-center gap-1 text-emerald-400 mt-2 select-none">
                  <span className="h-1 w-1 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[10px] text-neutral-500">instalando arquivos locais...</span>
                </div>
              )}
            </div>

            {/* Interactive Controller footer inside Terminal */}
            <div className="mt-6 flex items-center justify-between border-t border-white/[0.04] pt-4 select-none">
              {!simulating && !simDone && (
                <button
                  onClick={startSimulation}
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors text-[10px]"
                >
                  <Play size={10} />
                  <span>Simular Instalação Local</span>
                </button>
              )}

              {simDone && (
                <button
                  onClick={resetSimulation}
                  className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors text-[10px]"
                >
                  <RefreshCw size={10} />
                  <span>Limpar Console</span>
                </button>
              )}

              <span className="text-[9.5px] text-neutral-500">Unix build stable</span>
            </div>
          </div>
        </div>

        {/* TUI Keycaps and requirements */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 font-mono text-[9px] tracking-wide text-neutral-600">
            <span>REQUISITOS: Node.js 18+</span>
            <span>&middot;</span>
            <span>OS: macOS / Linux / Windows</span>
          </div>

          <a
            href="/demo#trust-loop"
            className="text-[12px] font-medium text-accent transition-colors hover:text-accent-light"
          >
            Ver loop aprovar → receipt (demo estática)
          </a>

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
