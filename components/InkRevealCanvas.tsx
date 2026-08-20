'use client'

import React, { useEffect, useRef } from 'react'

interface InkStamp {
  x: number
  y: number
  born: number
  seed: number
  rmax: number
}

export interface InkRevealCanvasProps {
  /** Source URL of the background artwork image to reveal */
  imageSrc?: string
  /** Mask background color in RGB format e.g. "0, 0, 0" */
  maskColor?: string
  /** Maximum radius of each ink dot */
  maxRadius?: number
  /** Lifetime in ms before an ink dot fades back to solid */
  lifetime?: number
  /** CSS class names for the container */
  className?: string
}

export function InkRevealCanvas({
  imageSrc = '/artwork/hero-bg.png',
  maskColor = '0, 0, 0',
  maxRadius = 128,
  lifetime = 520,
  className = '',
}: InkRevealCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const parent = (container.closest('section') || container.parentElement || container) as HTMLElement
    const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches
    if (!canHover) return

    const ctx = canvas.getContext('2d', { willReadFrequently: false })
    if (!ctx) return

    // Exact MiMo Code constants (https://mimo.xiaomi.com/coder)
    const MASK = maskColor.replace('#000000', '0, 0, 0')
    const R_START = 8
    const R_END = maxRadius
    const R_VARY = 0.45
    const LIFETIME = lifetime
    const STAMP_STEP = 12
    const MAX_STAMPS = 160
    const DPR = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)

    let w = 0
    let h = 0

    const fillSolidMask = () => {
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = `rgb(${MASK})`
      ctx.fillRect(0, 0, w, h)
    }

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      w = Math.max(1, Math.round(rect.width))
      h = Math.max(1, Math.round(rect.height))
      canvas.width = Math.round(w * DPR)
      canvas.height = Math.round(h * DPR)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      fillSolidMask()
    }

    resize()

    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => resize())
      resizeObserver.observe(parent)
    }

    window.addEventListener('resize', resize)

    const stamps: InkStamp[] = []
    let lastX: number | null = null
    let lastY: number | null = null
    let running = false
    let animId = 0

    const addStamp = (x: number, y: number) => {
      if (stamps.length >= MAX_STAMPS) stamps.shift()
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: R_END * (1 - R_VARY + Math.random() * R_VARY),
      })
    }

    const stampAlong = (x: number, y: number) => {
      if (lastX === null || lastY === null) {
        addStamp(x, y)
      } else {
        const dx = x - lastX
        const dy = y - lastY
        const dist = Math.hypot(dx, dy)
        const steps = Math.max(1, Math.ceil(dist / STAMP_STEP))
        for (let i = 1; i <= steps; i++) {
          addStamp(lastX + (dx * i) / steps, lastY + (dy * i) / steps)
        }
      }
      lastX = x
      lastY = y
    }

    // Exact MiMo Code procedural organic ink carving algorithm
    const carveInk = (x: number, y: number, r: number, alpha: number, seed: number) => {
      const g = ctx.createRadialGradient(x, y, r * 0.25, x, y, r)
      g.addColorStop(0, `rgba(0, 0, 0, ${0.95 * alpha})`)
      g.addColorStop(0.55, `rgba(0, 0, 0, ${0.88 * alpha})`)
      g.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = g
      ctx.beginPath()
      const segs = 32
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2
        const wob =
          0.78 +
          0.14 * Math.sin(a * 3 + seed) +
          0.08 * Math.sin(a * 7 + seed * 2.1) +
          0.05 * Math.sin(a * 13 + seed * 0.7)
        const rr = r * wob
        const px = x + Math.cos(a) * rr
        const py = y + Math.sin(a) * rr
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fill()
    }

    const loop = () => {
      const now = performance.now()

      // Repaint solid mask
      fillSolidMask()

      ctx.globalCompositeOperation = 'destination-out'
      for (let i = stamps.length - 1; i >= 0; i--) {
        const t = (now - stamps[i].born) / LIFETIME
        if (t >= 1) {
          stamps.splice(i, 1)
          continue
        }
        const ease = 1 - Math.pow(1 - t, 3) // easeOutCubic expansion
        const r = R_START + (stamps[i].rmax - R_START) * ease
        const alpha = 1 - t * t // fade the hole closed as it ages
        carveInk(stamps[i].x, stamps[i].y, r, alpha, stamps[i].seed)
      }

      if (stamps.length > 0) {
        animId = requestAnimationFrame(loop)
      } else {
        running = false
      }
    }

    const start = () => {
      if (!running) {
        running = true
        animId = requestAnimationFrame(loop)
      }
    }

    const onMouseEnter = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      lastX = e.clientX - rect.left
      lastY = e.clientY - rect.top
      stampAlong(lastX, lastY)
      start()
    }

    const onMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      stampAlong(x, y)
      start()
    }

    const onMouseLeave = () => {
      lastX = null
      lastY = null
    }

    parent.addEventListener('mouseenter', onMouseEnter, { passive: true })
    parent.addEventListener('mousemove', onMouseMove, { passive: true })
    parent.addEventListener('mouseleave', onMouseLeave)

    return () => {
      window.removeEventListener('resize', resize)
      if (resizeObserver) resizeObserver.disconnect()
      parent.removeEventListener('mouseenter', onMouseEnter)
      parent.removeEventListener('mousemove', onMouseMove)
      parent.removeEventListener('mouseleave', onMouseLeave)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [maskColor, maxRadius, lifetime])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-black ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Background artwork image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-bottom bg-no-repeat transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url("${imageSrc}")`,
          opacity: 0.95,
        }}
      />

      {/* Full-bleed solid procedural canvas mask */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
      />
    </div>
  )
}
