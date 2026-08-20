'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { Check, Copy } from 'lucide-react'
import { Magnet } from './reactbits/Magnet'
import { DecryptedText } from './reactbits/DecryptedText'

const INSTALL_CMD = 'npm install -g zavorth@latest'

export function InstallSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const sheenRef = useRef<HTMLDivElement>(null)
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

  // Refined 3D Terminal GSAP Tilt & Sheen Reflection
  useEffect(() => {
    const term = terminalRef.current
    const sheen = sheenRef.current
    if (!term) return

    const xTo = gsap.quickTo(term, 'rotationY', { duration: 0.4, ease: 'power2.out' })
    const yTo = gsap.quickTo(term, 'rotationX', { duration: 0.4, ease: 'power2.out' })
    const zTo = gsap.quickTo(term, 'z', { duration: 0.4, ease: 'power2.out' })

    const onPointerMove = (e: MouseEvent) => {
      const rect = term.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      const rotY = (x / (rect.width / 2)) * 10
      const rotX = -(y / (rect.height / 2)) * 10

      xTo(rotY)
      yTo(rotX)
      zTo(15)

      if (sheen) {
        const sheenX = ((e.clientX - rect.left) / rect.width) * 100
        const sheenY = ((e.clientY - rect.top) / rect.height) * 100
        gsap.to(sheen, {
          background: `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(0, 232, 143, 0.12) 0%, transparent 60%)`,
          duration: 0.2,
        })
      }
    }

    const onPointerLeave = () => {
      xTo(0)
      yTo(0)
      zTo(0)
      if (sheen) {
        gsap.to(sheen, {
          background: 'transparent',
          duration: 0.4,
        })
      }
    }

    term.addEventListener('mousemove', onPointerMove)
    term.addEventListener('mouseleave', onPointerLeave)

    return () => {
      term.removeEventListener('mousemove', onPointerMove)
      term.removeEventListener('mouseleave', onPointerLeave)
    }
  }, [])

  return (
    <section
      id="install"
      ref={sectionRef}
      className="landing-final-surface relative scroll-mt-20 overflow-hidden py-32 sm:py-48 bg-black text-white"
    >
      {/* Subtle Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none select-none opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          zIndex: 1,
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        
        {/* ZAVORTH (top) · mascot (middle) · AGENT (legs) — hero stack with pixel mascot */}
        <div
          data-ghost-wordmark
          className="install-agent-mark pointer-events-none relative mx-auto mb-8 select-none"
          aria-hidden="true"
        >
          <div className="install-agent-stage">
            <p className="install-agent-text install-agent-back text-white/20">ZAVORTH</p>
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
            <p className="install-agent-text install-agent-front text-white">AGENT</p>
          </div>
        </div>

        <h3 className="relative text-3xl font-normal tracking-tight text-white sm:text-5xl">
          Instale o runtime local
        </h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-400 font-light">
          Um comando simples. Zero configurações pesadas. O agente fica disponível instantaneamente no seu terminal.
        </p>

        {/* Razor-Thin 3D Luxury Terminal (GSAP Smooth Tilt & Specular Sheen) */}
        <div 
          className="mx-auto mt-10 max-w-lg"
          style={{ perspective: '1200px' }}
        >
          <div
            ref={terminalRef}
            style={{ transformStyle: 'preserve-3d' }}
            className="group relative rounded-2xl border border-white/[0.1] bg-black/80 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(0,232,143,0.05)] hover:border-[#00e88f]/40 transition-colors duration-300 overflow-hidden"
          >
            {/* Dynamic Specular Sheen Layer */}
            <div
              ref={sheenRef}
              className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
            />

            {/* Terminal Header Bar (Compact & Razor Thin) */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/90" />
                <span className="ml-2 text-[10px] font-mono text-neutral-400">
                  <DecryptedText text="~/zavorth" speed={40} animateOn="hover" />
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#00e88f] px-2 py-0.5 rounded-md bg-[#00e88f]/10">
                NPM GLOBAL
              </span>
            </div>

            {/* Terminal Command Line Body */}
            <div className="px-5 py-4 sm:py-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm text-neutral-200 overflow-x-auto select-all">
                <span className="text-[#00e88f] font-bold select-none">$</span>
                <span className="text-white font-normal">{INSTALL_CMD}</span>
                <span className="w-1.5 h-3.5 bg-[#00e88f] animate-pulse inline-block select-none" />
              </div>

              <Magnet magnetStrength={0.3} padding={20}>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="shrink-0 p-2 rounded-lg border border-white/[0.08] bg-white/[0.04] hover:bg-[#00e88f]/10 hover:border-[#00e88f]/30 text-neutral-400 hover:text-[#00e88f] transition-all duration-200 cursor-pointer"
                  title="Copiar comando"
                  aria-label="Copiar comando"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-[#00e88f]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </Magnet>
            </div>

            {/* Terminal Footer Info */}
            <div className="px-5 py-2.5 border-t border-white/[0.04] bg-white/[0.01] flex items-center justify-between text-[10px] font-mono text-neutral-500">
              <span>Node &gt;= 18 &middot; macOS, Linux, Windows</span>
              <span className={copied ? 'text-[#00e88f]' : ''}>
                {copied ? '✓ Copiado!' : 'Clique no ícone para copiar'}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
