'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'

const INSTALL_CMD = 'npm install -g zavorth@latest'

/* ── Cinematic Terminal Rain Canvas ── */
function MatrixRainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let w = 0
    let h = 0
    let columns = 0
    const fontSize = 14
    const drops: number[] = []
    
    // Characters to use (hex, binary, and some tech symbols)
    const charset = '01ZAVORTH01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789'.split('')

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
      
      columns = Math.floor(w / fontSize)
      
      // Initialize drops array if resizing makes it larger
      while (drops.length < columns) {
        drops.push(Math.random() * -100) // Start off-screen randomly
      }
    }

    resize()
    window.addEventListener('resize', resize)

    // Slower frame rate for cinematic feel
    let lastTime = 0
    const fps = 24
    const interval = 1000 / fps

    const draw = (currentTime: number) => {
      animId = requestAnimationFrame(draw)

      const deltaTime = currentTime - lastTime
      if (deltaTime < interval) return
      lastTime = currentTime - (deltaTime % interval)

      // Translucent black background to create trail effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.15)'
      ctx.fillRect(0, 0, w, h)

      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = charset[Math.floor(Math.random() * charset.length)]
        
        // 5% chance for an amber highlight, otherwise very subtle gray
        if (Math.random() > 0.95) {
          ctx.fillStyle = 'rgba(245, 158, 11, 0.4)' // Amber
        } else {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.04)' // Faint white/gray
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Reset drop to top randomly after it crosses the screen
        if (drops[i] * fontSize > h && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Move drop down
        drops[i]++
      }
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.8 }}
    />
  )
}

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
      {/* Border-beam animation */}
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
        {/* ── Cinematic Terminal Rain canvas background ── */}
        <div className="absolute inset-0 z-0">
          <MatrixRainCanvas />
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
