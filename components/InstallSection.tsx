'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { AuroraMeshGradient } from './AuroraMeshGradient'

const INSTALL_CMD = 'npm install -g zavorth@latest'

export function InstallSection() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = INSTALL_CMD
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <section
        id="install"
        className="relative bg-[#050505] py-32 sm:py-44 overflow-hidden"
      >
        {/* ── Premium Aurora Mesh Gradient background ── */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <AuroraMeshGradient />
        </div>

        {/* ── CRT scanline overlay ── */}
        <div
          className="pointer-events-none absolute inset-0 z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.5) 1px, rgba(255,255,255,0.5) 2px)',
            backgroundSize: '100% 2px',
          }}
        />

        {/* ── Radial vignette ── */}
        <div
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* ── Faint geometric scratch lines (like x.ai) ── */}
        <svg
          className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-[0.015]"
          preserveAspectRatio="none"
        >
          <line x1="10%" y1="0%" x2="90%" y2="100%" stroke="white" strokeWidth="0.5" />
          <line x1="55%" y1="0%" x2="25%" y2="100%" stroke="white" strokeWidth="0.4" />
          <line x1="30%" y1="70%" x2="70%" y2="75%" stroke="white" strokeWidth="0.35" />
          <line x1="0%" y1="55%" x2="95%" y2="0%" stroke="white" strokeWidth="0.25" />
        </svg>

        {/* ── Content ── */}
        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center">
          {/* Giant ZAVORTH watermark — Grok-style animated ghost text */}
          <div className="relative flex select-none items-center justify-center -mb-8 sm:-mb-14 pb-8">
            <h2
              className="pointer-events-none whitespace-nowrap text-center font-extrabold leading-[0.8] tracking-[-0.06em]"
              style={{
                fontSize: 'clamp(4.5rem, 15vw, 11rem)',
                background: 'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(130,130,130,1) 30%, rgba(30,30,30,0) 80%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
                maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)',
              }}
            >
              ZAVORTH
            </h2>
          </div>

          {/* Heading */}
          <h3 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Instale no seu terminal.
          </h3>

          {/* Subtitle */}
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/45 sm:text-lg">
            Instale o runtime local do Zavorth em segundos e coloque agentes
            autônomos sob o controle da sua máquina — sem dependências em nuvem.
          </p>

          {/* Install Pill with border-beam */}
          <div className="mt-10 flex justify-center">
            <div className="border-beam-wrapper">
              <div
                className="group flex cursor-pointer items-center gap-3 rounded-full border border-white/10 bg-zinc-950 px-4 py-3 shadow-xl ring-1 ring-inset ring-white/5 transition-[border-color,box-shadow] hover:border-white/20 hover:ring-white/10"
                onClick={handleCopy}
                role="button"
                tabIndex={0}
                aria-label="Copiar comando de instalação"
              >
                <code className="whitespace-nowrap font-mono text-sm text-white sm:text-base">
                  <span className="text-[#CCC]">npm install -g </span>
                  <span className="text-amber-500">zavorth@latest</span>
                </code>

                <div className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center text-white/60">
                  {copied ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Copy size={16} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
