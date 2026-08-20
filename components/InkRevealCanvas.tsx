'use client'

import React, { useEffect, useRef } from 'react'

interface InkStamp {
  x: number
  y: number
  born: number
  rmax: number
}

export interface InkRevealCanvasProps {
  /** Source URL of the background artwork image to reveal */
  imageSrc?: string
  /** Mask background color in hex/rgb format */
  maskColor?: string
  /** Maximum radius of the reveal spotlight */
  maxRadius?: number
  /** Lifetime in ms before a reveal spotlight fades back to solid black */
  lifetime?: number
  /** CSS class names for the container */
  className?: string
}

export function InkRevealCanvas({
  imageSrc = '/artwork/hero-bg.png',
  maskColor = '#000000',
  maxRadius = 160,
  lifetime = 1800,
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
    const R_START = 28
    const R_END = maxRadius
    const MAX_STAMPS = 120
    const STAMP_STEP = 10

    let w = 0
    let h = 0

    const fillSolidMask = () => {
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.globalCompositeOperation = 'source-over'
      ctx.fillStyle = maskColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()
    }

    const resize = () => {
      const rect = container.getBoundingClientRect()
      w = Math.max(1, Math.ceil(rect.width))
      h = Math.max(1, Math.ceil(rect.height))
      canvas.width = Math.round(w * DPR)
      canvas.height = Math.round(h * DPR)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      fillSolidMask()
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
        rmax: R_END * (0.9 + Math.random() * 0.2),
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

    // Pure, smooth organic spotlight shape with silky soft feathered edges
    const carveSmoothSpotlight = (x: number, y: number, r: number, alpha: number) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r)
      g.addColorStop(0, `rgba(0, 0, 0, ${0.98 * alpha})`)
      g.addColorStop(0.35, `rgba(0, 0, 0, ${0.85 * alpha})`)
      g.addColorStop(0.7, `rgba(0, 0, 0, ${0.4 * alpha})`)
      g.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    const loop = () => {
      const now = performance.now()

      // Repaint solid black mask
      fillSolidMask()

      ctx.save()
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.globalCompositeOperation = 'destination-out'

      for (let i = stamps.length - 1; i >= 0; i--) {
        const t = (now - stamps[i].born) / lifetime
        if (t >= 1) {
          stamps.splice(i, 1)
          continue
        }
        const ease = 1 - Math.pow(1 - t, 2.5)
        const r = R_START + (stamps[i].rmax - R_START) * ease
        const alpha = 1 - t * t
        carveSmoothSpotlight(stamps[i].x, stamps[i].y, r, alpha)
      }
      ctx.restore()

      if (stamps.length > 0) {
        animId = requestAnimationFrame(loop)
      } else {
        running = false
        fillSolidMask()
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

      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        stampAlong(x, y)
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
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-black ${className}`}
      style={{
        zIndex: 0,
      }}
    >
      {/* Background artwork image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-700 ease-out"
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
