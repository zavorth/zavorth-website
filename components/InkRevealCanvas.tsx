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
  /** Mask background color in RGB format e.g. "8, 8, 8" or "0, 0, 0" */
  maskColor?: string
  /** Maximum radius of the ink reveal holes */
  maxRadius?: number
  /** Lifetime in ms before an ink hole fades back to solid */
  lifetime?: number
  /** CSS class names for the container */
  className?: string
}

export function InkRevealCanvas({
  imageSrc = '/artwork/hero-bg.png',
  maskColor = '8, 8, 8',
  maxRadius = 175,
  lifetime = 2000,
  className = '',
}: InkRevealCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const parent = (container.closest('section') || container.parentElement || container) as HTMLElement
    const ctx = canvas.getContext('2d', { willReadFrequently: false })
    if (!ctx) return

    const DPR = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)
    const R_START = 32
    const R_END = maxRadius
    const R_VARY = 0.35
    const MAX_STAMPS = 140
    const STAMP_STEP = 12

    let w = 0
    let h = 0

    const resize = () => {
      const rect = container.getBoundingClientRect()
      w = Math.max(1, Math.round(rect.width))
      h = Math.max(1, Math.round(rect.height))
      canvas.width = Math.round(w * DPR)
      canvas.height = Math.round(h * DPR)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = `rgb(${maskColor})`
      ctx.fillRect(0, 0, w, h)
    }

    resize()

    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        resize()
      })
      resizeObserver.observe(parent)
      resizeObserver.observe(container)
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

    const carveInk = (x: number, y: number, r: number, alpha: number, seed: number) => {
      const g = ctx.createRadialGradient(x, y, r * 0.16, x, y, r)
      g.addColorStop(0, `rgba(0, 0, 0, ${0.98 * alpha})`)
      g.addColorStop(0.6, `rgba(0, 0, 0, ${0.86 * alpha})`)
      g.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = g
      ctx.beginPath()
      const segs = 32
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2
        const wob =
          0.82 +
          0.12 * Math.sin(a * 3 + seed) +
          0.07 * Math.sin(a * 7 + seed * 2.1) +
          0.04 * Math.sin(a * 13 + seed * 0.7)
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

      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = `rgb(${maskColor})`
      ctx.fillRect(0, 0, w, h)

      ctx.globalCompositeOperation = 'destination-out'
      for (let i = stamps.length - 1; i >= 0; i--) {
        const t = (now - stamps[i].born) / lifetime
        if (t >= 1) {
          stamps.splice(i, 1)
          continue
        }
        const ease = 1 - Math.pow(1 - t, 3)
        const r = R_START + (stamps[i].rmax - R_START) * ease
        const alpha = 1 - t * t
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

    const onPointerMove = (e: MouseEvent | PointerEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect()
      let clientX = 0
      let clientY = 0

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
      } else if ('clientX' in e) {
        clientX = e.clientX
        clientY = e.clientY
      }

      const x = clientX - rect.left
      const y = clientY - rect.top

      if (x >= -50 && x <= rect.width + 50 && y >= -50 && y <= rect.height + 50) {
        stampAlong(Math.max(0, Math.min(rect.width, x)), Math.max(0, Math.min(rect.height, y)))
        start()
      } else {
        lastX = null
        lastY = null
      }
    }

    const onPointerLeave = () => {
      lastX = null
      lastY = null
    }

    // Attach pointer listeners to the parent section so movement across the entire section surface is captured
    parent.addEventListener('mousemove', onPointerMove, { passive: true })
    parent.addEventListener('pointermove', onPointerMove, { passive: true })
    parent.addEventListener('touchmove', onPointerMove, { passive: true })
    parent.addEventListener('mouseleave', onPointerLeave)
    parent.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.removeEventListener('resize', resize)
      if (resizeObserver) resizeObserver.disconnect()
      parent.removeEventListener('mousemove', onPointerMove)
      parent.removeEventListener('pointermove', onPointerMove)
      parent.removeEventListener('touchmove', onPointerMove)
      parent.removeEventListener('mouseleave', onPointerLeave)
      parent.removeEventListener('pointerleave', onPointerLeave)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [maskColor, maxRadius, lifetime])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none ${className}`}
      style={{
        zIndex: 0,
      }}
    >
      {/* Background artwork covering 100% of the entire section */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url("${imageSrc}")`,
          opacity: 0.92,
        }}
      />

      {/* Full-bleed procedural canvas mask */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
      />
    </div>
  )
}
