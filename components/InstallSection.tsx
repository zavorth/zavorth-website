'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'

const INSTALL_CMD = 'npm install -g zavorth@latest'

/* ── Neural Mesh Canvas ── */
function NeuralMeshCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = 0
    let w = 0
    let h = 0

    // Mouse interaction state
    let mouseX = -1000
    let mouseY = -1000

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouseX = -1000
      mouseY = -1000
    }

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

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

    // Particles setup
    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      radius: number
    }

    const particles: Particle[] = []
    // Adjust particle count based on screen width for performance
    const PARTICLE_COUNT = window.innerWidth > 768 ? 100 : 50
    const CONNECTION_DISTANCE = 120
    const MOUSE_DISTANCE = 180

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.5 + 0.5,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges smoothly
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)'
        ctx.fill()

        // Connect to mouse
        const dxMouse = mouseX - p.x
        const dyMouse = mouseY - p.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

        if (distMouse < MOUSE_DISTANCE) {
          ctx.beginPath()
          ctx.moveTo(p.x, p.y)
          ctx.lineTo(mouseX, mouseY)
          const opacity = 1 - distMouse / MOUSE_DISTANCE
          // Amber color connection to mouse
          ctx.strokeStyle = `rgba(245, 158, 11, ${opacity * 0.4})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < CONNECTION_DISTANCE) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            const opacity = 1 - dist / CONNECTION_DISTANCE
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
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
        {/* ── Neural Mesh canvas background ── */}
        <div className="absolute inset-0 z-0">
          <NeuralMeshCanvas />
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
