'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { Check, Copy, Terminal, Sparkles } from 'lucide-react'
import { InkRevealCanvas } from './InkRevealCanvas'

const INSTALL_CMD = 'npm install -g zavorth@latest'

export function InstallSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
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

  // 3D Terminal GSAP Tilt Physics
  useEffect(() => {
    const term = terminalRef.current
    if (!term) return

    const xTo = gsap.quickTo(term, 'rotationY', { duration: 0.5, ease: 'power2.out' })
    const yTo = gsap.quickTo(term, 'rotationX', { duration: 0.5, ease: 'power2.out' })
    const zTo = gsap.quickTo(term, 'z', { duration: 0.5, ease: 'power2.out' })

    const onPointerMove = (e: MouseEvent) => {
      const rect = term.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      
      const rotY = (x / (rect.width / 2)) * 12 // max 12deg tilt
      const rotX = -(y / (rect.height / 2)) * 12

      xTo(rotY)
      yTo(rotX)
      zTo(20)
    }

    const onPointerLeave = () => {
      xTo(0)
      yTo(0)
      zTo(0)
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
      {/* Procedural Ink Reveal Artwork Background */}
      <InkRevealCanvas
        imageSrc="/artwork/hero-bg.png"
        maskColor="#000000"
        maxRadius={160}
        lifetime={1900}
      />

      {/* Subtle Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none select-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
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

        <h3 className="relative text-3xl font-normal tracking-tight text-white sm:text-5xl">
          Instale o runtime local
        </h3>
        <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-neutral-400 font-light">
          Um comando. Zero configurações lentas. O agente fica disponível instantaneamente no seu terminal e sistema.
        </p>

        {/* 3D Perspective Terminal (GSAP Interactive Tilt) */}
        <div 
          className="mx-auto mt-12 max-w-xl"
          style={{ perspective: '1200px' }}
        >
          <div
            ref={terminalRef}
            style={{ transformStyle: 'preserve-3d' }}
            className="group relative rounded-2xl border border-white/[0.12] bg-[#09090b]/95 backdrop-blur-2xl shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(0,232,143,0.06)] hover:border-[#00e88f]/40 transition-colors duration-300"
          >
            {/* Terminal Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-80" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-80" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] opacity-80" />
                <span className="ml-2 text-[11px] font-mono text-neutral-400">zavorth ~ terminal</span>
              </div>
              <span className="text-[10px] font-mono text-[#00e88f] px-2 py-0.5 rounded-full bg-[#00e88f]/10 border border-[#00e88f]/20">
                NPM GLOBAL
              </span>
            </div>

            {/* Terminal Body */}
            <div className="p-6 sm:p-8 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 font-mono text-sm sm:text-base text-neutral-200 overflow-x-auto">
                <span className="text-[#00e88f] font-bold select-none">&gt;</span>
                <span className="text-white font-medium select-all">{INSTALL_CMD}</span>
                <span className="w-2 h-4 bg-[#00e88f] animate-pulse inline-block select-none" />
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="shrink-0 p-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] hover:bg-[#00e88f]/10 hover:border-[#00e88f]/30 text-neutral-300 hover:text-[#00e88f] transition-all duration-200 cursor-pointer group/btn"
                title="Copiar comando"
                aria-label="Copiar comando"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-[#00e88f]" />
                ) : (
                  <Copy className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                )}
              </button>
            </div>

            {/* Terminal Footer Status */}
            <div className="px-6 py-3 border-t border-white/[0.04] bg-white/[0.01] flex items-center justify-between text-[11px] font-mono text-neutral-500">
              <span>Node &gt;= 18 &middot; macOS / Linux / Windows</span>
              <span>{copied ? '✓ Copiado para a área de transferência' : 'Clique para copiar'}</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
