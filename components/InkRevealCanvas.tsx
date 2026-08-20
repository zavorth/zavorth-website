'use client'

import React, { useEffect, useRef } from 'react'

interface SmokePuff {
  x: number
  y: number
  vx: number
  vy: number
  born: number
  lifetime: number
  rStart: number
  rEnd: number
  angle: number
  vAngle: number
  opacity: number
}

export interface InkRevealCanvasProps {
  /** Source URL of the background artwork image to reveal */
  imageSrc?: string
  /** Mask background color in hex/rgb format */
  maskColor?: string
  /** Maximum radius of the smoke billows */
  maxRadius?: number
  /** Lifetime in ms before smoke dissipates */
  lifetime?: number
  /** CSS class names for the container */
  className?: string
}

export function InkRevealCanvas({
  imageSrc = '/artwork/hero-bg.png',
  maskColor = '#000000',
  maxRadius = 140,
  lifetime = 2200,
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
    const MAX_PUFFS = 180
    const STAMP_STEP = 12

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

    const puffs: SmokePuff[] = []
    let lastX: number | null = null
    let lastY: number | null = null
    let running = false
    let animId = 0

    const addSmokePuff = (x: number, y: number, speedMultiplier = 1) => {
      if (puffs.length >= MAX_PUFFS) puffs.shift()

      // Organic subtle drift and turbulence
      const angle = Math.random() * Math.PI * 2
      const driftSpeed = (0.2 + Math.random() * 0.5) * speedMultiplier
      const vx = Math.cos(angle) * driftSpeed
      const vy = Math.sin(angle) * driftSpeed - 0.25 // subtle upward smoke drift

      puffs.push({
        x: x + (Math.random() * 16 - 8),
        y: y + (Math.random() * 16 - 8),
        vx,
        vy,
        born: performance.now(),
        lifetime: lifetime * (0.8 + Math.random() * 0.4),
        rStart: 24 + Math.random() * 16,
        rEnd: maxRadius * (0.85 + Math.random() * 0.35),
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() * 0.02 - 0.01),
        opacity: 0.85 + Math.random() * 0.15,
      })
    }

    const stampAlong = (x: number, y: number) => {
      if (lastX === null || lastY === null) {
        addSmokePuff(x, y)
      } else {
        const dx = x - lastX
        const dy = y - lastY
        const dist = Math.hypot(dx, dy)
        const steps = Math.max(1, Math.ceil(dist / STAMP_STEP))
        for (let i = 1; i <= steps; i++) {
          const px = lastX + (dx * i) / steps
          const py = lastY + (dy * i) / steps
          addSmokePuff(px, py, 0.8)
          // Add a smaller sub-puff for volumetric smoke depth
          if (i % 2 === 0) {
            addSmokePuff(px + (Math.random() * 20 - 10), py + (Math.random() * 20 - 10), 0.5)
          }
        }
      }
      lastX = x
      lastY = y
    }

    // Volumetric organic smoke billow with multi-stop radial feathering
    const drawSmokePuff = (puff: SmokePuff, now: number) => {
      const elapsed = now - puff.born
      const t = elapsed / puff.lifetime
      if (t >= 1) return false

      // Update position with drift
      puff.x += puff.vx
      puff.y += puff.vy
      puff.angle += puff.vAngle

      // Smooth expansion & dissipation curve
      const expandEase = 1 - Math.pow(1 - t, 2.2)
      const currentRadius = puff.rStart + (puff.rEnd - puff.rStart) * expandEase
      const alpha = (1 - t * t) * puff.opacity

      const g = ctx.createRadialGradient(puff.x, puff.y, 0, puff.x, puff.y, currentRadius)
      g.addColorStop(0, `rgba(0, 0, 0, ${0.95 * alpha})`)
      g.addColorStop(0.25, `rgba(0, 0, 0, ${0.82 * alpha})`)
      g.addColorStop(0.55, `rgba(0, 0, 0, ${0.45 * alpha})`)
      g.addColorStop(0.8, `rgba(0, 0, 0, ${0.15 * alpha})`)
      g.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = g
      ctx.beginPath()
      ctx.arc(puff.x, puff.y, currentRadius, 0, Math.PI * 2)
      ctx.fill()

      return true
    }

    const loop = () => {
      const now = performance.now()

      // Repaint solid black mask
      fillSolidMask()

      ctx.save()
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.globalCompositeOperation = 'destination-out'

      for (let i = puffs.length - 1; i >= 0; i--) {
        const alive = drawSmokePuff(puffs[i], now)
        if (!alive) {
          puffs.splice(i, 1)
        }
      }
      ctx.restore()

      if (puffs.length > 0) {
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
