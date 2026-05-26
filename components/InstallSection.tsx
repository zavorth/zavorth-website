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
        className="relative bg-[#050505] py-16 sm:py-20 overflow-hidden"
      >
        <div className="mx-auto max-w-4xl px-6 relative z-10 text-center">
          
          {/* Giant ZAVORTH watermark */}
          <div className="relative flex select-none items-center justify-center mb-2">
            <h2
              className="pointer-events-none whitespace-nowrap text-center font-extrabold leading-[0.8] tracking-[-0.06em]"
              style={{
                fontSize: 'clamp(3rem, 10vw, 8rem)',
                background: 'linear-gradient(to bottom, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.01) 90%)',
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
          <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Pronto para rodar localmente?
          </h3>

          {/* Subtitle */}
          <p className="mx-auto mt-2 max-w-xl text-xs sm:text-sm leading-relaxed text-neutral-400 font-light">
            Instale o CLI do Zavorth globalmente via npm e configure o runtime local em menos de um minuto.
          </p>

          {/* Minimalist Command Pill with Border Beam animation */}
          <div className="mt-8 max-w-[340px] mx-auto border-beam-wrapper rounded-full">
            <div className="bg-[#07070a] py-1.5 pl-4 pr-1.5 flex items-center justify-between shadow-inner rounded-full w-full border border-white/[0.04]">
              <div className="flex items-center gap-2 truncate font-mono text-xs text-neutral-200">
                <span className="text-neutral-600 select-none">$</span>
                <span className="font-light tracking-tight">{INSTALL_CMD}</span>
              </div>
              
              <button 
                onClick={handleCopy}
                className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/[0.05] transition-all shrink-0"
                aria-label="Copiar comando"
              >
                {copied ? (
                  <Check size={13} className="text-emerald-400" />
                ) : (
                  <Copy size={13} />
                )}
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-[11px] font-mono text-neutral-500 uppercase tracking-wider">
            <span>Requisitos: Node.js 18+</span>
            <span>&middot;</span>
            <span>Compatível: macOS, Linux, Windows</span>
          </div>

        </div>
      </section>

      {/* Styled JSX for Border Beam effect */}
      <style jsx>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes border-beam-rotate {
          from {
            --angle: 0deg;
          }
          to {
            --angle: 360deg;
          }
        }

        .border-beam-wrapper {
          position: relative;
          padding: 1px;
          background: transparent;
          border-radius: 9999px;
        }

        .border-beam-wrapper::before {
          content: "";
          position: absolute;
          inset: 0;
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
          pointer-events: none;
        }

        .border-beam-wrapper::after {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: inherit;
          background: #050507;
          z-index: 1;
          pointer-events: none;
        }

        .border-beam-wrapper > * {
          position: relative;
          z-index: 2;
        }
      `}</style>
    </>
  )
}
