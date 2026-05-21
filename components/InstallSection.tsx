'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Copy, Check, Terminal, ShieldCheck, KeyRound, Sparkles } from 'lucide-react'
import { initSpotlight } from './motion'

type Packager = 'npm' | 'pnpm' | 'yarn'

interface TabContent {
  id: string
  tabName: string
  command: (packager: Packager) => string
  lines: { text: string; color: string; delay: number }[]
}

const RUNTIME_TABS: TabContent[] = [
  {
    id: 'install',
    tabName: '1. Instalar',
    command: (pkg) => {
      if (pkg === 'pnpm') return 'pnpm add -g zavorth@latest'
      if (pkg === 'yarn') return 'yarn global add zavorth'
      return 'npm install -g zavorth@latest'
    },
    lines: [
      { text: 'fetching release manifests from package registry...', color: 'text-text-faint', delay: 100 },
      { text: 'downloading zavorth-runtime-v1.4.2.tgz...', color: 'text-text-muted', delay: 400 },
      { text: '▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰ 100% [added 218 packages]', color: 'text-emerald-400', delay: 800 },
      { text: '✓ zavorth global CLI binaries linked success.', color: 'text-emerald-400', delay: 1200 },
    ],
  },
  {
    id: 'onboard',
    tabName: '2. Onboard',
    command: () => 'zavorth onboard',
    lines: [
      { text: 'initialising local identity broker keys...', color: 'text-text-muted', delay: 100 },
      { text: '✓ generated SEC-256 elliptic key pair.', color: 'text-emerald-400', delay: 400 },
      { text: 'establishing secure handshake with loopback daemon...', color: 'text-text-faint', delay: 700 },
      { text: '✓ encryption broker operational. default policy configured.', color: 'text-amber-500', delay: 1100 },
    ],
  },
  {
    id: 'go',
    tabName: '3. Executar',
    command: () => 'zavorth go',
    lines: [
      { text: 'loading trust definitions from ~/.zavorth/policy.json...', color: 'text-text-muted', delay: 150 },
      { text: 'starting local controller engine at http://localhost:8484', color: 'text-emerald-400', delay: 450 },
      { text: 'listening to mesh channels: telegram [enabled], cli [enabled]', color: 'text-amber-500', delay: 750 },
      { text: 'Zavorth is ready. Waiting for instructions.', color: 'text-text-primary', delay: 1150 },
    ],
  },
]

export function InstallSection() {
  const [activeTab, setActiveTab] = useState(0)
  const [copied, setCopied] = useState(false)
  const [packager, setPackager] = useState<Packager>('npm')
  const [terminalLines, setTerminalLines] = useState<string[]>([])
  const [typedCommand, setTypedCommand] = useState('')
  const terminalRef = useRef<HTMLDivElement>(null)

  // Copy installation command
  const handleCopy = async () => {
    const activeTabObj = RUNTIME_TABS[activeTab]
    const cmdText = activeTabObj.command(packager)
    try {
      await navigator.clipboard.writeText(cmdText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
      const textArea = document.createElement('textarea')
      textArea.value = cmdText
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  // Spotlight card initialization
  useEffect(() => {
    const el = terminalRef.current
    if (el) {
      initSpotlight(el)
    }
  }, [])

  // Terminal Typing & Diagnostics sequence simulator
  useEffect(() => {
    setTypedCommand('')
    setTerminalLines([])
    
    const activeTabObj = RUNTIME_TABS[activeTab]
    const cmdStr = activeTabObj.command(packager)
    let charIndex = 0
    let cmdTimeout: NodeJS.Timeout
    const lineTimeouts: NodeJS.Timeout[] = []

    // Phase 1: Type out command char by char
    const typeCommandChar = () => {
      if (charIndex <= cmdStr.length) {
        setTypedCommand(cmdStr.substring(0, charIndex))
        charIndex++
        cmdTimeout = setTimeout(typeCommandChar, 25)
      } else {
        // Phase 2: Render diagnostics log lines after dynamic delays
        activeTabObj.lines.forEach((line) => {
          const timeout = setTimeout(() => {
            setTerminalLines((prev) => [...prev, line.text])
          }, line.delay)
          lineTimeouts.push(timeout)
        })
      }
    }

    cmdTimeout = setTimeout(typeCommandChar, 100)

    return () => {
      clearTimeout(cmdTimeout)
      lineTimeouts.forEach((t) => clearTimeout(t))
    }
  }, [activeTab, packager])

  return (
    <section id="install" className="relative section-rhythm overflow-hidden py-24 sm:py-32">
      {/* Background radial highlight */}
      <div className="absolute left-1/2 bottom-[-10%] -z-10 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-amber-500/5 blur-[100px]" />
      <div className="absolute inset-0 bg-[#060608] -z-20" />

      <div className="mx-auto max-w-content px-5 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          {/* Header */}
          <p className="eyebrow mb-4 justify-center">Instalação</p>
          <h2 className="section-title-display mb-5 text-text-primary">
            Comece no seu terminal.
          </h2>
          <p className="mb-10 text-body-lg text-text-muted max-w-xl mx-auto">
            O Zavorth foi projetado para colocar a IA no controle de tarefas sem retirar a governança da sua máquina. Inicialize o runtime local em segundos.
          </p>

          {/* Controls Panel */}
          <div className="mb-6 flex flex-col sm:flex-row justify-center items-center gap-3 max-w-lg mx-auto">
            {/* Tab selector buttons */}
            <div className="flex gap-1 rounded-xl border border-white/[0.05] bg-[#0c0c0e] p-1 w-full sm:flex-1">
              {RUNTIME_TABS.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex-1 rounded-lg py-2 font-mono text-[10.5px] font-bold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === idx
                      ? 'bg-white/[0.04] border border-white/[0.05] text-amber-500'
                      : 'text-text-faint hover:text-text-muted'
                  }`}
                >
                  {tab.tabName}
                </button>
              ))}
            </div>

            {/* Packager Selector (visible only for installation tab) */}
            {activeTab === 0 && (
              <div className="flex gap-1 rounded-xl border border-white/[0.05] bg-[#0c0c0e] p-1 w-auto shrink-0">
                {(['npm', 'pnpm', 'yarn'] as Packager[]).map((pkg) => (
                  <button
                    key={pkg}
                    onClick={() => setPackager(pkg)}
                    className={`px-2.5 py-1.5 rounded-lg font-mono text-[10px] font-bold transition-all duration-300 uppercase ${
                      packager === pkg
                        ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                        : 'text-text-faint hover:text-text-muted'
                    }`}
                  >
                    {pkg}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Terminal Panel */}
          <div 
            ref={terminalRef}
            className="spotlight-card spotlight-border mx-auto max-w-lg text-left overflow-hidden rounded-2xl border border-white/[0.06] bg-black/60 backdrop-blur-md shadow-[0_20px_45px_rgba(0,0,0,0.6)]"
          >
            {/* Window Topbar Chrome */}
            <div className="flex items-center justify-between border-b border-white/[0.05] bg-[#0c0c0e]/80 px-4 py-3">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/30" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/30" />
                <span className="ml-3 font-mono text-[10px] text-text-faint flex items-center gap-1.5">
                  <Terminal size={11} className="text-amber-500/70" /> terminal — local bash
                </span>
              </div>

              {/* Copy action */}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 rounded px-2.5 py-1 text-text-faint transition-colors hover:bg-white/[0.04] hover:text-text-muted"
                aria-label="Copiar comando de terminal"
              >
                {copied ? (
                  <>
                    <Check size={11} className="text-emerald-400" />
                    <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy size={11} />
                    <span className="font-mono text-[9px] uppercase tracking-wider">Copiar</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulated Live Output Screen */}
            <div className="p-6 font-mono text-[12.5px] leading-relaxed min-h-[190px]">
              {/* Command line */}
              <div className="flex items-center gap-2">
                <span className="text-amber-500 select-none font-bold">❯</span>
                <span className="text-text-primary font-bold">
                  {typedCommand}
                  <span className="animate-pulse bg-amber-500 text-transparent ml-0.5 select-none font-normal">|</span>
                </span>
              </div>

              {/* Simulated execution output logs */}
              <div className="mt-4 space-y-1.5">
                {terminalLines.map((line, idx) => (
                  <div key={idx} className="transition-all duration-300">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Secure details indicators */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-text-faint font-mono text-[10.5px]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>SANDBOX OPERACIONAL ATIVO</span>
            </div>
            <div className="flex items-center gap-1.5">
              <KeyRound className="h-4 w-4 text-amber-500" />
              <span>CONEXÕES RESOLVIDAS LOCALMENTE</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              <span>100% AUDITÁVEL EM DISCO</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
