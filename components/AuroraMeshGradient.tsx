'use client'

import React, { useEffect, useRef } from 'react'

/* ────────────────────────────────────────────────────────────
 *  AuroraMeshGradient
 *  A premium animated mesh gradient background inspired by
 *  Stripe/Linear — dark, moody, slowly evolving aurora effect.
 *  Pure Canvas 2D, no dependencies.
 * ──────────────────────────────────────────────────────────── */

interface GradientOrb {
  x: number
  y: number
  radius: number
  hue: number
  saturation: number
  lightness: number
  alpha: number
  vx: number
  vy: number
  phaseX: number
  phaseY: number
  speedX: number
  speedY: number
}

const ORB_COUNT = 5

export function AuroraMeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let w = 0, h = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Create orbs with deep, moody colors
    const orbs: GradientOrb[] = [
      // Deep violet — large, dominant
      {
        x: 0.3, y: 0.4, radius: 0.55,
        hue: 270, saturation: 80, lightness: 12, alpha: 0.7,
        vx: 0, vy: 0,
        phaseX: 0, phaseY: 0.5,
        speedX: 0.08, speedY: 0.06,
      },
      // Dark teal / cyan
      {
        x: 0.7, y: 0.6, radius: 0.45,
        hue: 190, saturation: 70, lightness: 10, alpha: 0.6,
        vx: 0, vy: 0,
        phaseX: 2.1, phaseY: 1.3,
        speedX: 0.07, speedY: 0.09,
      },
      // Deep magenta
      {
        x: 0.5, y: 0.2, radius: 0.4,
        hue: 320, saturation: 65, lightness: 10, alpha: 0.5,
        vx: 0, vy: 0,
        phaseX: 4.0, phaseY: 3.2,
        speedX: 0.05, speedY: 0.07,
      },
      // Subtle warm amber (very faint)
      {
        x: 0.2, y: 0.8, radius: 0.35,
        hue: 30, saturation: 60, lightness: 8, alpha: 0.35,
        vx: 0, vy: 0,
        phaseX: 1.5, phaseY: 4.7,
        speedX: 0.06, speedY: 0.04,
      },
      // Deep blue
      {
        x: 0.8, y: 0.3, radius: 0.5,
        hue: 230, saturation: 75, lightness: 9, alpha: 0.55,
        vx: 0, vy: 0,
        phaseX: 3.3, phaseY: 2.1,
        speedX: 0.04, speedY: 0.08,
      },
    ]

    let time = 0

    const render = () => {
      time += 0.004

      // Dark base
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, w, h)

      // Draw each orb as a radial gradient blob
      for (const orb of orbs) {
        // Organic movement using sin/cos with different phases
        const cx = w * (0.5 + 0.35 * Math.sin(time * orb.speedX + orb.phaseX) * Math.cos(time * orb.speedY * 0.7 + orb.phaseY * 1.3))
        const cy = h * (0.5 + 0.3 * Math.cos(time * orb.speedY + orb.phaseY) * Math.sin(time * orb.speedX * 0.8 + orb.phaseX * 0.9))
        const r = Math.max(w, h) * orb.radius

        // Subtle hue drift over time
        const hue = orb.hue + Math.sin(time * 0.15 + orb.phaseX) * 15

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        grad.addColorStop(0, `hsla(${hue}, ${orb.saturation}%, ${orb.lightness + 4}%, ${orb.alpha})`)
        grad.addColorStop(0.4, `hsla(${hue}, ${orb.saturation}%, ${orb.lightness}%, ${orb.alpha * 0.6})`)
        grad.addColorStop(0.7, `hsla(${hue}, ${orb.saturation * 0.8}%, ${orb.lightness * 0.6}%, ${orb.alpha * 0.2})`)
        grad.addColorStop(1, 'hsla(0, 0%, 0%, 0)')

        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }

      // Reset composite
      ctx.globalCompositeOperation = 'source-over'

      // Subtle film grain for texture
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 16) { // sample every 4th pixel for perf
        const noise = (Math.random() - 0.5) * 8
        data[i] = Math.max(0, Math.min(255, data[i] + noise))
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise))
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise))
      }
      ctx.putImageData(imageData, 0, 0)

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#050505' }}
    />
  )
}

AuroraMeshGradient.displayName = 'AuroraMeshGradient'
