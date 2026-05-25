'use client'

import React, { useState } from 'react'
import { Copy, Check } from 'lucide-react'

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
        {/* ── Animated gradient orbs (CSS-only, ultra-lightweight) ── */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          {/* Primary orb — slow drift top-right */}
          <div
            className="absolute rounded-full blur-[120px] opacity-[0.07]"
            style={{
              width: '600px',
              height: '600px',
              top: '-10%',
              right: '-5%',
              background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
              animation: 'installOrb1 18s ease-in-out infinite',
            }}
          />
          {/* Secondary orb — slow drift bottom-left */}
          <div
            className="absolute rounded-full blur-[100px] opacity-[0.05]"
            style={{
              width: '500px',
              height: '500px',
              bottom: '-15%',
              left: '-8%',
              background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
              animation: 'installOrb2 22s ease-in-out infinite',
            }}
          />
          {/* Tertiary accent — subtle amber warmth at center */}
          <div
            className="absolute rounded-full blur-[140px] opacity-[0.04]"
            style={{
              width: '400px',
              height: '400px',
              top: '40%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)',
              animation: 'installOrb3 15s ease-in-out infinite',
            }}
          />
        </div>

        {/* ── Subtle grid pattern ── */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* ── Radial vignette ── */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 30%, rgba(5,5,5,0.8) 100%)',
          }}
        />

        {/* ── Content ── */}
        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center">
          {/* Giant ZAVORTH watermark */}
          <div className="relative flex select-none items-center justify-center -mb-8 sm:-mb-14 pb-8">
            <h2
              className="pointer-events-none whitespace-nowrap text-center font-extrabold leading-[0.8] tracking-[-0.06em]"
              style={{
                fontSize: 'clamp(4.5rem, 15vw, 11rem)',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 40%, rgba(30,30,30,0) 80%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
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

      {/* Keyframe animations for the gradient orbs */}
      <style jsx>{`
        @keyframes installOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, 30px) scale(1.1); }
          66% { transform: translate(20px, -20px) scale(0.95); }
        }
        @keyframes installOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -25px) scale(1.08); }
          66% { transform: translate(-25px, 15px) scale(0.92); }
        }
        @keyframes installOrb3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.04; }
          50% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.06; }
        }
      `}</style>
    </>
  )
}
