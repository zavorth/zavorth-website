'use client'

import React, { useEffect, useRef } from 'react'

interface TrailPoint {
  x: number
  y: number
  time: number
}

interface SmokeWisp {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  born: number
  life: number
}

export interface InkRevealCanvasProps {
  /** Source URL of the background artwork image to reveal */
  imageSrc?: string
  /** Mask background color in hex/rgb format */
  maskColor?: string
  /** Brush thickness for the continuous path */
  brushSize?: number
  /** Lifetime in ms before the smoke trail fades */
  lifetime?: number
  /** CSS class names for the container */
  className?: string
}

export function InkRevealCanvas({
  imageSrc = '/artwork/hero-bg.png',
  maskColor = '#000000',
  brushSize = 50,
  lifetime = 1400,
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
      resizeObserver = new ResizeObserver(() => resize())
      resizeObserver.observe(parent)
      resizeObserver.observe(container)
    }

    window.addEventListener('resize', resize)

    const points: TrailPoint[] = []
    const wisps: SmokeWisp[] = []
    let animId = 0
    let running = false

    const addPoint = (x: number, y: number) => {
      const now = performance.now()
      points.push({ x, y, time: now })

      // Spawn subtle smoke wisps along the path
      if (Math.random() < 0.6) {
        wisps.push({
          x: x + (Math.random() * 14 - 7),
          y: y + (Math.random() * 14 - 7),
          vx: (Math.random() * 0.4 - 0.2),
          vy: -0.2 - Math.random() * 0.3, // gently rise
          size: 14 + Math.random() * 18,
          born: now,
          life: 900 + Math.random() * 500,
        })
      }
    }

    const render = () => {
      const now = performance.now()

      // Repaint solid black mask
      fillSolidMask()

      // Filter out expired points
      while (points.length > 0 && now - points[0].time > lifetime) {
        points.shift()
      }

      // Filter out expired wisps
      for (let i = wisps.length - 1; i >= 0; i--) {
        if (now - wisps[i].born > wisps[i].life) {
          wisps.splice(i, 1)
        }
      }

      ctx.save()
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
      ctx.globalCompositeOperation = 'destination-out'
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      // 1. Draw smooth continuous smoke ribbon trail along mouse path
      if (points.length > 1) {
        for (let i = 1; i < points.length; i++) {
          const p0 = points[i - 1]
          const p1 = points[i]
          const age = now - p1.time
          const progress = age / lifetime
          if (progress >= 1) continue

          const alpha = 1 - progress
          const currentWidth = brushSize * (0.6 + 0.4 * alpha)

          // Outer feathered smoke aura
          ctx.save()
          ctx.strokeStyle = `rgba(0, 0, 0, ${0.45 * alpha})`
          ctx.lineWidth = currentWidth * 1.6
          ctx.shadowBlur = 24
          ctx.shadowColor = 'rgba(0, 0, 0, 1)'
          ctx.beginPath()
          ctx.moveTo(p0.x, p0.y)
          ctx.lineTo(p1.x, p1.y)
          ctx.stroke()
          ctx.restore()

          // Inner solid path core
          ctx.save()
          ctx.strokeStyle = `rgba(0, 0, 0, ${0.9 * alpha})`
          ctx.lineWidth = currentWidth
          ctx.shadowBlur = 12
          ctx.shadowColor = 'rgba(0, 0, 0, 1)'
          ctx.beginPath()
          ctx.moveTo(p0.x, p0.y)
          ctx.lineTo(p1.x, p1.y)
          ctx.stroke()
          ctx.restore()
        }
      } else if (points.length === 1) {
        // Single tap/point
        const p = points[0]
        const alpha = 1 - (now - p.time) / lifetime
        if (alpha > 0) {
          const rad = (brushSize / 2) * alpha
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad)
          g.addColorStop(0, `rgba(0, 0, 0, ${0.9 * alpha})`)
          g.addColorStop(1, 'rgba(0, 0, 0, 0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(p.x, p.y, rad, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      // 2. Draw drifting smoke wisps along the trail
      for (let i = 0; i < wisps.length; i++) {
        const wisp = wisps[i]
        const wElapsed = now - wisp.born
        const wT = wElapsed / wisp.life
        if (wT >= 1) continue

        wisp.x += wisp.vx
        wisp.y += wisp.vy

        const wAlpha = (1 - wT) * 0.4
        const wRadius = wisp.size * (1 + wT * 0.5)

        const g = ctx.createRadialGradient(wisp.x, wisp.y, 0, wisp.x, wisp.y, wRadius)
        g.addColorStop(0, `rgba(0, 0, 0, ${wAlpha})`)
        g.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(wisp.x, wisp.y, wRadius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()

      if (points.length > 0 || wisps.length > 0) {
        animId = requestAnimationFrame(render)
      } else {
        running = false
        fillSolidMask()
      }
    }

    const start = () => {
      if (!running) {
        running = true
        animId = requestAnimationFrame(render)
      }
    }

    let lastX = 0
    let lastY = 0

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
        const dist = Math.hypot(x - lastX, y - lastY)
        if (dist > 4) {
          addPoint(x, y)
          lastX = x
          lastY = y
          start()
        }
      }
    }

    parent.addEventListener('mousemove', onPointerMove, { passive: true })
    parent.addEventListener('pointermove', onPointerMove, { passive: true })
    parent.addEventListener('touchmove', onPointerMove, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      if (resizeObserver) resizeObserver.disconnect()
      parent.removeEventListener('mousemove', onPointerMove)
      parent.removeEventListener('pointermove', onPointerMove)
      parent.removeEventListener('touchmove', onPointerMove)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [maskColor, brushSize, lifetime])

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
