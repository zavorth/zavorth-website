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
  imageSrc?: string
  maskColor?: string
  startRadius?: number
  maxRadius?: number
  radiusVariation?: number
  lifetime?: number
  stampStep?: number
  maxStamps?: number
  className?: string
}

export function InkRevealCanvas({
  imageSrc = '/artwork/hero-bg.png',
  maskColor = '252, 250, 248',
  startRadius = 8,
  maxRadius = 128,
  radiusVariation = 0.45,
  lifetime = 520,
  stampStep = 12,
  maxStamps = 160,
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

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const MASK = maskColor.replace('#fcfaf8', '252, 250, 248').replace('#000000', '0, 0, 0')
    const R_START = startRadius
    const R_END = maxRadius
    const R_VARY = radiusVariation
    const LIFETIME = lifetime
    const STAMP_STEP = stampStep
    const MAX_STAMPS = maxStamps
    const DPR = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)

    let w = 0
    let h = 0

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      w = Math.max(1, Math.round(rect.width))
      h = Math.max(1, Math.round(rect.height))
      canvas.width = Math.round(w * DPR)
      canvas.height = Math.round(h * DPR)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = `rgb(${MASK})`
      ctx.fillRect(0, 0, w, h)
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

    const carveInk = (x: number, y: number, r: number, alpha: number, seed: number) => {
      if (r <= 0 || alpha <= 0.001) return

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

      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = `rgb(${MASK})`
      ctx.fillRect(0, 0, w, h)

      ctx.globalCompositeOperation = 'destination-out'
      for (let i = stamps.length - 1; i >= 0; i--) {
        const t = (now - stamps[i].born) / LIFETIME
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
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        stampAlong(x, y)
        start()
      }
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
  }, [maskColor, startRadius, maxRadius, radiusVariation, lifetime, stampStep, maxStamps])

  const isDark = maskColor.includes('0, 0, 0') || maskColor.includes('0,0,0')

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none ${isDark ? 'bg-black' : 'bg-[#fcfaf8]'} ${className}`}
      style={{ zIndex: 0 }}
    >
      <div
        className="absolute inset-0 w-full h-full transition-opacity duration-300"
        style={{
          backgroundImage: `url("${imageSrc}")`,
          backgroundSize: '1440px 100%',
          backgroundPosition: 'bottom center',
          backgroundRepeat: 'no-repeat',
          filter: isDark ? 'invert(1) hue-rotate(180deg) contrast(1.1) brightness(0.9)' : undefined,
          opacity: 0.95,
        }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}
