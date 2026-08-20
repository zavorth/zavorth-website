'use client'

import React, { useEffect, useRef } from 'react'

interface InkStamp {
  x: number
  y: number
  born: number
  phase: number
  rmax: number
  weight: number
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
  lifetime = 580,
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

    const MASK = maskColor.replace('#000000', '0, 0, 0')
    const R_START = 12
    const R_END = maxRadius
    const LIFETIME = lifetime
    const STAMP_STEP = 8
    const MAX_STAMPS = 240
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
    let cumulativeDist = 0

    const addStamp = (x: number, y: number, weight = 1) => {
      if (stamps.length >= MAX_STAMPS) stamps.shift()
      stamps.push({
        x,
        y,
        born: performance.now(),
        phase: cumulativeDist * 0.04,
        rmax: R_END * (0.8 + 0.2 * Math.sin(cumulativeDist * 0.02)) * weight,
        weight,
      })
    }

    const stampAlong = (x: number, y: number) => {
      if (lastX === null || lastY === null) {
        addStamp(x, y, 1)
      } else {
        const dx = x - lastX
        const dy = y - lastY
        const dist = Math.hypot(dx, dy)
        cumulativeDist += dist
        const steps = Math.max(1, Math.ceil(dist / STAMP_STEP))
        
        // Velocity-adaptive stroke weight for fluid calligraphy
        const speed = dist / Math.max(1, steps)
        const weight = Math.min(1.15, Math.max(0.7, 1 - speed * 0.015))

        for (let i = 1; i <= steps; i++) {
          const px = lastX + (dx * i) / steps
          const py = lastY + (dy * i) / steps
          addStamp(px, py, weight)
        }
      }
      lastX = x
      lastY = y
    }

    // Silky organic harmonic contour with multi-stop feathered gradient
    const carveInk = (x: number, y: number, r: number, alpha: number, phase: number) => {
      if (r <= 0 || alpha <= 0.001) return

      const g = ctx.createRadialGradient(x, y, r * 0.1, x, y, r)
      g.addColorStop(0, `rgba(0, 0, 0, ${0.98 * alpha})`)
      g.addColorStop(0.3, `rgba(0, 0, 0, ${0.85 * alpha})`)
      g.addColorStop(0.55, `rgba(0, 0, 0, ${0.58 * alpha})`)
      g.addColorStop(0.8, `rgba(0, 0, 0, ${0.25 * alpha})`)
      g.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = g
      ctx.beginPath()
      const segs = 36
      for (let i = 0; i <= segs; i++) {
        const a = (i / segs) * Math.PI * 2
        // Continuous harmonic undulating contour (ultra-smooth fluid silhouette)
        const wob =
          0.84 +
          0.10 * Math.sin(a * 3 + phase) +
          0.05 * Math.sin(a * 6 + phase * 1.6) +
          0.03 * Math.sin(a * 9 + phase * 0.8)
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
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = `rgb(${MASK})`
      ctx.fillRect(0, 0, w, h)

      // Carve out living ink dots with destination-out
      ctx.globalCompositeOperation = 'destination-out'
      for (let i = stamps.length - 1; i >= 0; i--) {
        const t = (now - stamps[i].born) / LIFETIME
        if (t >= 1) {
          stamps.splice(i, 1)
          continue
        }

        // Smooth cubic Hermite ease for opening & silky sine fade for closing
        const easeOut = 1 - Math.pow(1 - t, 2.6)
        const r = R_START + (stamps[i].rmax - R_START) * easeOut
        const alpha = Math.sin((1 - t) * Math.PI * 0.5)

        carveInk(stamps[i].x, stamps[i].y, r, alpha, stamps[i].phase)
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
  }, [maskColor, maxRadius, lifetime])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-black ${className}`}
      style={{ zIndex: 0 }}
    >
      {/* Background artwork image */}
      <div
        className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out"
        style={{
          backgroundImage: `url("${imageSrc}")`,
          backgroundSize: '1440px auto',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.92,
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
