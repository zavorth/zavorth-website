'use client'

import React, { useEffect, useRef } from 'react'

/* ────────────────────────────────────────────────────────────
 *  AuroraMeshGradient
 *  A premium animated mesh gradient background inspired by
 *  Stripe/Linear — dark, moody, slowly evolving aurora effect.
 *  Uses pure high-performance Canvas 2D and CSS noise overlays
 *  to avoid CPU-bound frame rendering bottlenecks.
 *  Features smooth mouse interactive coordinate shifting.
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

export function AuroraMeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    let w = 0, h = 0
    let mouse = { x: 0.5, y: 0.5 }
    let smoothMouse = { x: 0.5, y: 0.5 }

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

    // Handle mouse movement for interactive warping
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      // Normalize coordinates between 0 and 1
      const cx = (e.clientX - rect.left) / rect.width
      const cy = (e.clientY - rect.top) / rect.height
      
      // Only update if it's within sensible range
      if (cx >= 0 && cx <= 1 && cy >= 0 && cy <= 1) {
        mouse.x = cx
        mouse.y = cy
      }
    }
    
    // Add mouse move event listener to window so it captures it smoothly
    window.addEventListener('mousemove', handleMouseMove)

    // Create orbs with deep, moody colors (HSL)
    const orbs: GradientOrb[] = [
      // Deep violet — large, dominant
      {
        x: 0.3, y: 0.4, radius: 0.65,
        hue: 270, saturation: 85, lightness: 12, alpha: 0.65,
        vx: 0, vy: 0,
        phaseX: 0, phaseY: 0.5,
        speedX: 0.05, speedY: 0.04,
      },
      // Dark teal / cyan
      {
        x: 0.7, y: 0.6, radius: 0.55,
        hue: 195, saturation: 80, lightness: 11, alpha: 0.6,
        vx: 0, vy: 0,
        phaseX: 2.1, phaseY: 1.3,
        speedX: 0.04, speedY: 0.06,
      },
      // Deep magenta
      {
        x: 0.5, y: 0.2, radius: 0.5,
        hue: 325, saturation: 75, lightness: 11, alpha: 0.5,
        vx: 0, vy: 0,
        phaseX: 4.0, phaseY: 3.2,
        speedX: 0.03, speedY: 0.05,
      },
      // Subtle warm amber
      {
        x: 0.2, y: 0.8, radius: 0.45,
        hue: 35, saturation: 70, lightness: 9, alpha: 0.35,
        vx: 0, vy: 0,
        phaseX: 1.5, phaseY: 4.7,
        speedX: 0.04, speedY: 0.03,
      },
      // Deep blue
      {
        x: 0.8, y: 0.3, radius: 0.6,
        hue: 235, saturation: 80, lightness: 10, alpha: 0.55,
        vx: 0, vy: 0,
        phaseX: 3.3, phaseY: 2.1,
        speedX: 0.03, speedY: 0.05,
      },
    ]

    let time = 0

    const render = () => {
      time += 0.005

      // Smoothly interpolate mouse coordinates (lerp)
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.06
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.06

      // Dark base background
      ctx.fillStyle = '#050505'
      ctx.fillRect(0, 0, w, h)

      // Draw each orb as a radial gradient blob
      for (const orb of orbs) {
        // Organic movement using sin/cos with different phases
        let cx = w * (0.5 + 0.35 * Math.sin(time * orb.speedX + orb.phaseX) * Math.cos(time * orb.speedY * 0.7 + orb.phaseY * 1.3))
        let cy = h * (0.5 + 0.3 * Math.cos(time * orb.speedY + orb.phaseY) * Math.sin(time * orb.speedX * 0.8 + orb.phaseX * 0.9))
        const r = Math.max(w, h) * orb.radius

        // Warp gently towards the smooth mouse position to create an amazing interactive parallax feeling
        const dx = smoothMouse.x - 0.5
        const dy = smoothMouse.y - 0.5
        cx += dx * w * 0.18 * (orb.radius * 1.5)
        cy += dy * h * 0.18 * (orb.radius * 1.5)

        // Subtle color shifting over time
        const hue = orb.hue + Math.sin(time * 0.1 + orb.phaseX) * 12

        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        grad.addColorStop(0, `hsla(${hue}, ${orb.saturation}%, ${orb.lightness + 5}%, ${orb.alpha})`)
        grad.addColorStop(0.3, `hsla(${hue}, ${orb.saturation}%, ${orb.lightness}%, ${orb.alpha * 0.7})`)
        grad.addColorStop(0.6, `hsla(${hue}, ${orb.saturation * 0.9}%, ${orb.lightness * 0.7}%, ${orb.alpha * 0.25})`)
        grad.addColorStop(1, 'hsla(0, 0%, 0%, 0)')

        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }

      // Reset composite to default
      ctx.globalCompositeOperation = 'source-over'

      // Note: We removed the high-cost ctx.getImageData and ctx.putImageData film grain
      // loops entirely to prevent CPU stalls, replacing them with a GPU-native CSS noise overlay.

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#050505' }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      {/* Premium GPU-accelerated static/dynamic SVG film grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}

AuroraMeshGradient.displayName = 'AuroraMeshGradient'
