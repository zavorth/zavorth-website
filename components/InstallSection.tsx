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
      {/* Border-beam animation styles using @property */}
      <style>{`
        @property --angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes border-beam-rotate {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }

        .border-beam-wrapper {
          position: relative;
          border-radius: 9999px;
        }

        .border-beam-wrapper::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: conic-gradient(
            from var(--angle),
            transparent 50%,
            #f59e0b 65%,
            #fbbf24 75%,
            transparent 90%
          );
          animation: border-beam-rotate 4s linear infinite;
          z-index: 0;
        }

        .border-beam-wrapper::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: #09090b;
          z-index: 1;
        }

        .border-beam-wrapper > * {
          position: relative;
          z-index: 2;
        }
      `}</style>

      <section
        id="install"
        className="relative bg-[#050505] py-32 sm:py-44 overflow-hidden"
      >
        {/* Subtle radial glow */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-500/[0.03] blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          {/* Giant ZAVORTH watermark */}
          <h2
            className="select-none pointer-events-none font-extrabold tracking-[-0.07em] leading-none text-center"
            style={{
              fontSize: 'clamp(4rem, 16vw, 12rem)',
              backgroundImage:
                'linear-gradient(to bottom, #f59e0b, transparent)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              maskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.05))',
              WebkitMaskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.05))',
            }}
          >
            ZAVORTH
          </h2>

          {/* Heading — overlapping the watermark via negative margin */}
          <h3 className="-mt-10 sm:-mt-16 text-3xl sm:text-5xl font-bold text-white">
            Instale no seu terminal.
          </h3>

          {/* Subtitle */}
          <p className="mt-5 text-base sm:text-lg text-white/50 max-w-xl mx-auto leading-relaxed">
            Instale o runtime local do Zavorth em segundos e coloque agentes
            autônomos sob o controle da sua máquina — sem dependências em nuvem.
          </p>

          {/* Install Pill with border-beam */}
          <div className="mt-10 flex justify-center">
            <div className="border-beam-wrapper">
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-zinc-950 px-4 py-3">
                <code className="font-mono text-sm sm:text-base whitespace-nowrap">
                  <span className="text-[#CCC]">npm install -g </span>
                  <span className="text-amber-500">zavorth@latest</span>
                </code>

                <button
                  onClick={handleCopy}
                  className="ml-1 flex-shrink-0 rounded-md p-1.5 transition-colors hover:bg-white/[0.06]"
                  aria-label="Copiar comando"
                >
                  {copied ? (
                    <Check size={16} className="text-emerald-400" />
                  ) : (
                    <Copy size={16} className="text-white/60" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
