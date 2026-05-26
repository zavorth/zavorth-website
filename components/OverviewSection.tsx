'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function OverviewSection() {
  const cardRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  const commandText = 'zavorth run "analisar codigo.py"'

  // Dynamic 3D tilt effect on mouse move
  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const xc = rect.width / 2
      const yc = rect.height / 2
      
      const rotX = -(y - yc) / 18 // max tilt ~10deg
      const rotY = (x - xc) / 22
      
      gsap.to(card, {
        rotateX: rotX,
        rotateY: rotY,
        scale: 1.02,
        boxShadow: `${-rotY * 1.5}px ${rotX * 1.5}px 35px rgba(245, 158, 11, 0.12), 0 20px 45px rgba(0, 0, 0, 0.7)`,
        duration: 0.5,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 8,
        rotateY: -8,
        rotateZ: 1.5,
        scale: 1,
        boxShadow: '10px 15px 35px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(245, 158, 11, 0.02)',
        duration: 0.8,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    
    // Set initial 3D tilt
    gsap.set(card, {
      rotateX: 8,
      rotateY: -8,
      rotateZ: 1.5,
      scale: 1,
      boxShadow: '10px 15px 35px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(245, 158, 11, 0.02)',
    })

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Staggered character typing and outputs animation loop
  useEffect(() => {
    if (!terminalRef.current) return

    const chars = Array.from(terminalRef.current.querySelectorAll('.cmd-char')) as HTMLSpanElement[]
    const lines = Array.from(terminalRef.current.querySelectorAll('.terminal-output-line')) as HTMLDivElement[]
    const cmdCursor = terminalRef.current.querySelector('.cmd-cursor') as HTMLSpanElement

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 5,
      })

      // Reset states
      gsap.set(chars, { display: 'none' })
      gsap.set(lines, { opacity: 0, y: 5 })
      gsap.set(cmdCursor, { opacity: 1, display: 'inline-block' })

      // 1. Type command characters
      chars.forEach((char, i) => {
        tl.to(char, {
          display: 'inline-block',
          duration: 0.001,
        }, i * 0.045) // typing speed
      })

      const typingEndTime = chars.length * 0.045

      // 2. Hide cmdCursor when typing is complete
      tl.set(cmdCursor, { display: 'none', opacity: 0 }, typingEndTime + 0.2)

      // 3. Stagger output lines
      lines.forEach((line, i) => {
        tl.to(line, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: 'power2.out',
        }, typingEndTime + 0.4 + (i * 0.8))
      })

    }, terminalRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="overview" className="relative bg-[#050505] py-24 sm:py-32 overflow-hidden">
      {/* Ambient glow behind terminal */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-75"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(245,158,11,0.06) 0%, rgba(245,158,11,0.02) 40%, transparent 70%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        
        {/* Heading */}
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl zavorth-heading-display">
          Inteligência Artificial Executada <span className="text-amber-gradient">Localmente</span>.
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg">
          Zavorth é um runtime local e seguro que executa modelos de IA diretamente na sua máquina,
          sem enviar dados para a nuvem. Cada ação é isolada, auditada e assinada criptograficamente.
        </p>

        {/* 3D Terminal Container */}
        <div className="relative mx-auto mt-14 max-w-2xl" style={{ perspective: '1200px' }}>
          <div
            ref={cardRef}
            className="terminal-card group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/60 shadow-2xl backdrop-blur-xl transition-all duration-300 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center',
            }}
          >
            {/* Scan line */}
            <div className="terminal-scanline pointer-events-none absolute inset-0 z-20" />

            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F56] opacity-80" />
                <span className="h-3 w-3 rounded-full bg-[#FFBD2E] opacity-80" />
                <span className="h-3 w-3 rounded-full bg-[#27C93F] opacity-80" />
                
                {/* Modern active tab */}
                <div className="ml-4 flex items-center gap-1.5 rounded-t-lg bg-black/40 border-t border-x border-white/[0.06] px-3.5 py-1.5 mt-[-6px] text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="font-mono text-[10px] tracking-wide text-neutral-300">zavorth-session</span>
                </div>
              </div>

              {/* Status parameters */}
              <div className="flex items-center gap-3 text-[10px] font-mono text-neutral-500">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  LOCAL
                </span>
                <span className="hidden sm:inline">VRAM: 4.8GB</span>
                <span className="hidden sm:inline text-amber-500/80">OLLAMA: READY</span>
              </div>
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              className="relative min-h-[240px] p-6 text-left font-mono text-[13px] leading-7 sm:text-[14px] sm:leading-8 text-neutral-300"
            >
              {/* Line 1: Command */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-amber-500 font-bold">$</span>
                <span className="text-white font-medium">
                  {commandText.split('').map((char, index) => (
                    <span key={index} className="cmd-char" style={{ display: 'none' }}>
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
                <span className="cmd-cursor inline-block text-amber-500 animate-pulse">█</span>
              </div>

              {/* Outputs */}
              <div className="mt-3 space-y-1">
                <div className="terminal-output-line opacity-0 text-neutral-400">
                  <span className="text-amber-500/80 mr-2">›</span> Analisando intenção do comando...
                </div>
                <div className="terminal-output-line opacity-0 text-emerald-400">
                  <span className="text-emerald-500 mr-2">✓</span> Aprovado: Ação isolada em sandbox local.
                </div>
                <div className="terminal-output-line opacity-0 text-neutral-400">
                  <span className="text-amber-500/80 mr-2">›</span> Resolvendo modelo via Ollama (DeepSeek)...
                </div>
                <div className="terminal-output-line opacity-0 text-emerald-400">
                  <span className="text-emerald-500 mr-2">✓</span> Análise concluída com sucesso.
                </div>
              </div>

              {/* Bottom prompt line */}
              <div className="terminal-output-line bottom-prompt opacity-0 mt-3 flex items-center gap-1.5">
                <span className="text-amber-500 font-bold">$</span>
                <span className="terminal-cursor text-amber-500">█</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .terminal-card {
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .terminal-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(255, 255, 255, 0.04) 50%, rgba(236, 72, 153, 0.15) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 10;
        }

        /* Cursor blink */
        .terminal-cursor {
          animation: terminalCursorBlink 1s step-end infinite;
        }

        @keyframes terminalCursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* Scan line */
        .terminal-scanline {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(245, 158, 11, 0.02) 50%,
            transparent 100%
          );
          background-size: 100% 6px;
          animation: scanMove 8s linear infinite;
        }

        @keyframes scanMove {
          0% { background-position: 0 -100%; }
          100% { background-position: 0 200%; }
        }
      `}</style>
    </section>
  )
}
