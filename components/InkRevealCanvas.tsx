'use client'

import React, { useEffect, useRef } from 'react'

interface GlowPoint {
  x: number
  y: number
  born: number
  maxRadius: number
}

export interface InkRevealCanvasProps {
  imageSrc?: string
  maskColor?: string
  maxRadius?: number
  lifetime?: number
  className?: string
}

export function InkRevealCanvas({
  maxRadius = 180,
  lifetime = 1600,
  className = '',
}: InkRevealCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const parent = (container.closest('section') || container.parentElement || container) as HTMLElement
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const DPR = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)
    let w = 0
    let h = 0

    const resize = () => {
      const rect = container.getBoundingClientRect()
      w = Math.max(1, Math.ceil(rect.width))
      h = Math.max(1, Math.ceil(rect.height))
      canvas.width = Math.round(w * DPR)
      canvas.height = Math.round(h * DPR)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
    }

    resize()

    let resizeObserver: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => resize())
      resizeObserver.observe(parent)
      resizeObserver.observe(container)
    }

    window.addEventListener('resize', resize)

    const points: GlowPoint[] = []
    let animId = 0
    let running = false

    const addPoint = (x: number, y: number) => {
      if (points.length > 50) points.shift()
      points.push({
        x,
        y,
        born: performance.now(),
        maxRadius: maxRadius + (Math.random() * 40 - 20),
      })
    }

    const render = () => {
      const now = performance.now()
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.save()
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)

      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i]
        const elapsed = now - p.born
        const t = elapsed / lifetime

        if (t >= 1) {
          points.splice(i, 1)
          continue
        }

        // Smooth cubic ease-out
        const ease = 1 - Math.pow(1 - t, 2.5)
        const radius = 40 + (p.maxRadius - 40) * ease
        const alpha = (1 - t) * 0.18 // Soft, non-intrusive emerald glow

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius)
        grad.addColorStop(0, `rgba(0, 232, 143, ${alpha})`)
        grad.addColorStop(0.4, `rgba(0, 232, 143, ${alpha * 0.5})`)
        grad.addColorStop(1, 'rgba(0, 232, 143, 0)')

        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()

      if (points.length > 0) {
        animId = requestAnimationFrame(render)
      } else {
        running = false
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
        if (dist > 12) {
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
  }, [maxRadius, lifetime])

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none bg-black ${className}`}
      style={{ zIndex: 0 }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
      />
    </div>
  )
}
