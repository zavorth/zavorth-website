'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'

const INSTALL_CMD = 'npm install -g zavorth@latest'

/* ── Smoke / Fog Canvas ── */
function SmokeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let w = 0
    let h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    // Smoke particles
    interface Particle {
      x: number; y: number; r: number; vx: number; vy: number; alpha: number; decay: number
    }

    const particles: Particle[] = []
    const PARTICLE_COUNT = 60

    const spawnParticle = (): Particle => ({
      x: w * 0.3 + Math.random() * w * 0.4,
      y: h * 0.5 + (Math.random() - 0.5) * h * 0.3,
      r: 40 + Math.random() * 80,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.15 - Math.random() * 0.25,
      alpha: 0.02 + Math.random() * 0.03,
      decay: 0.0001 + Math.random() * 0.0002,
    })

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = spawnParticle()
      // Scatter initial positions
      p.y = Math.random() * h
      p.x = Math.random() * w
      particles.push(p)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.r += 0.08
        p.alpha -= p.decay

        if (p.alpha <= 0) {
          particles[i] = spawnParticle()
          continue
        }

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
        grad.addColorStop(0, `rgba(180, 160, 140, ${p.alpha})`)
        grad.addColorStop(0.4, `rgba(120, 100, 80, ${p.alpha * 0.5})`)
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ opacity: 0.6 }}
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
        {/* ── Smoke canvas background ── */}
        <div className="absolute inset-0 z-0">
          <SmokeCanvas />
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
          {/* Giant ZAVORTH watermark — Grok-style ghost text */}
          <div
            className="relative -mb-6 flex select-none items-center justify-center overflow-hidden sm:-mb-10"
            style={{
              height: 'clamp(5rem, 18vw, 14rem)',
              maskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.08))',
              WebkitMaskImage:
                'linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.08))',
            }}
          >
            <h2
              className="pointer-events-none whitespace-nowrap text-center font-extrabold leading-none tracking-[-0.07em]"
              style={{
                fontSize: 'clamp(5rem, 18vw, 14rem)',
                backgroundImage:
                  'linear-gradient(to bottom, #5a5a5a 0%, #2a2a2a 40%, transparent 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                textShadow: 'none',
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
