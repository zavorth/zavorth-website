'use client'

import React, { useState } from 'react'
import { Check, Copy } from 'lucide-react'

const INSTALL_CMD = 'npm install -g zavorth@latest'

export function InstallSection() {
  const [copied, setCopied] = useState(false)

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

  return (
    <section id="install" className="landing-final-surface relative overflow-hidden py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div
          data-ghost-wordmark
          aria-hidden="true"
          className="pointer-events-none relative mb-2 flex select-none items-center justify-center overflow-hidden"
        >
          <h2
            className="whitespace-nowrap text-center font-extrabold leading-[0.8] tracking-[-0.06em]"
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

        <h3 className="relative text-3xl font-semibold tracking-normal text-white sm:text-4xl">
          Comece pelo setup guiado.
        </h3>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-500">
          Instale o CLI, conecte um provedor e abra o dashboard. O Zavorth mostra o proximo passo
          e o que ainda precisa ser configurado.
        </p>

        <div className="border-beam-wrapper mx-auto mt-9 max-w-[380px] rounded-full">
          <div className="flex w-full items-center justify-between rounded-full border border-white/[0.05] bg-[#07070a] py-1.5 pl-4 pr-1.5 shadow-inner">
            <div className="flex min-w-0 items-center gap-2 truncate font-mono text-xs text-neutral-200">
              <span className="select-none text-neutral-600">$</span>
              <span className="truncate font-light">{INSTALL_CMD}</span>
            </div>
            <button
              onClick={handleCopy}
              className="shrink-0 rounded-full p-2 text-neutral-400 transition-colors hover:bg-white/[0.05] hover:text-white"
              aria-label="Copiar comando"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-neutral-600">
          <span>Requisitos: Node.js 18+</span>
          <span>&middot;</span>
          <span>macOS, Linux e Windows</span>
        </div>
      </div>

      <style jsx>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes border-beam-rotate {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }

        .border-beam-wrapper {
          position: relative;
          padding: 1px;
          background: transparent;
        }

        .border-beam-wrapper::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: conic-gradient(
            from var(--angle),
            transparent 50%,
            #f59e0b 66%,
            #fbbf24 75%,
            transparent 90%
          );
          animation: border-beam-rotate 4s linear infinite;
          pointer-events: none;
        }

        .border-beam-wrapper::after {
          content: '';
          position: absolute;
          inset: 1px;
          z-index: 1;
          border-radius: inherit;
          background: #050507;
          pointer-events: none;
        }

        .border-beam-wrapper > * {
          position: relative;
          z-index: 2;
        }
      `}</style>
    </section>
  )
}
