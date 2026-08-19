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
  /** Mask background color in RGB format e.g. "10, 10, 10" or "0, 0, 0" */
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
  maxRadius = 140,
  lifetime = 1600,
  className = '',
}: InkRevealCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const ctx = canvas.getContext('2d', { willReadFrequently: false })
    if (!ctx) return

    const DPR = Math.min(window.devicePixelRatio || 1, 2)
    const R_START = 24
    const R_END = maxRadius
    const R_VARY = 0.35
    const MAX_STAMPS = 90
    const STAMP_STEP = 16

    let w = 0
    let h = 0

    const resize = () => {
      const rect = container.getBoundingClientRect()
      w = rect.width
      h = rect.height
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
      const g = ctx.createRadialGradient(x, y, r * 0.2, x, y, r)
      g.addColorStop(0, `rgba(0, 0, 0, ${0.95 * alpha})`)
      g.addColorStop(0.55, `rgba(0, 0, 0, ${0.85 * alpha})`)
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

    const handleMouseEnter = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      lastX = e.clientX - rect.left
      lastY = e.clientY - rect.top
      stampAlong(lastX, lastY)
      start()
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      stampAlong(e.clientX - rect.left, e.clientY - rect.top)
      start()
    }

    const handleMouseLeave = () => {
      lastX = null
      lastY = null
    }

    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', resize)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [maskColor, maxRadius, lifetime])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 overflow-hidden pointer-events-auto ${className}`}
      style={{
        zIndex: 0,
      }}
    >
      {/* Underlying artwork background layer */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url("${imageSrc}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          opacity: 0.85,
        }}
      />

      {/* Procedural ink reveal canvas mask */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full cursor-crosshair"
      />
    </div>
  )
}
