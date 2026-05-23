'use client'

import React, { useEffect, useRef } from 'react'

/* ────────────────────────────────────────────────────────────
 *  ZavorthCosmicCanvas
 *  A mesmerising cosmic-dust / nebula particle field rendered
 *  on a plain <canvas>.  No Three.js needed — pure 2-D context
 *  with additive-style glow.  Mouse gently repels nearby particles.
 * ──────────────────────────────────────────────────────────── */

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseRadius: number
  hue: number
  saturation: number
  lightness: number
  alpha: number
  baseAlpha: number
  drift: number       // per-particle slow sine offset
  pulseSpeed: number  // twinkle speed
  pulsePhase: number  // twinkle phase
  layer: number       // 0 = far-back,  1 = mid,  2 = foreground
}

const PARTICLE_COUNT = 420
const MOUSE_RADIUS = 180
const MOUSE_FORCE = 0.6

function createParticle(w: number, h: number): Particle {
  const layer = Math.random() < 0.55 ? 0 : Math.random() < 0.7 ? 1 : 2

  // Palette: deep violet → electric blue → soft pink → cyan
  const hueRanges = [
    [260, 290],  // violet / purple
    [210, 240],  // blue
    [310, 340],  // magenta / pink
    [180, 200],  // cyan-ish
  ]
  const range = hueRanges[Math.floor(Math.random() * hueRanges.length)]
  const hue = range[0] + Math.random() * (range[1] - range[0])

  const baseRadius = layer === 0
    ? 0.4 + Math.random() * 1.0
    : layer === 1
      ? 0.8 + Math.random() * 1.6
      : 1.4 + Math.random() * 2.4

  const baseAlpha = layer === 0
    ? 0.15 + Math.random() * 0.2
    : layer === 1
      ? 0.25 + Math.random() * 0.3
      : 0.4 + Math.random() * 0.35

  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.15,
    vy: (Math.random() - 0.5) * 0.15,
    radius: baseRadius,
    baseRadius,
    hue,
    saturation: 60 + Math.random() * 30,
    lightness: 55 + Math.random() * 25,
    alpha: baseAlpha,
    baseAlpha,
    drift: Math.random() * Math.PI * 2,
    pulseSpeed: 0.3 + Math.random() * 0.8,
    pulsePhase: Math.random() * Math.PI * 2,
    layer,
  }
}

export function ZavorthCosmicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    /* — resize handler — */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    /* — init particles — */
    const rect = canvas.getBoundingClientRect()
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(rect.width, rect.height),
    )

    /* — mouse tracking — */
    const onMouse = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }
    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', onLeave)

    /* — nebula background gradient (drawn once per frame) — */
    const drawBg = (w: number, h: number) => {
      ctx.clearRect(0, 0, w, h)

      // Subtle radial nebula glow from center
      const grad = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, Math.max(w, h) * 0.7)
      grad.addColorStop(0, 'rgba(30, 10, 60, 0.25)')
      grad.addColorStop(0.4, 'rgba(10, 5, 30, 0.12)')
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)
    }

    /* — render loop — */
    const render = () => {
      const r = canvas.getBoundingClientRect()
      const w = r.width
      const h = r.height
      timeRef.current += 0.016 // ~60 fps tick
      const t = timeRef.current

      drawBg(w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      const particles = particlesRef.current

      // Sort by layer so far particles render first
      // (we only sort once at init, layers don't change)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Gentle drift
        p.x += p.vx + Math.sin(t * 0.3 + p.drift) * 0.08
        p.y += p.vy + Math.cos(t * 0.25 + p.drift) * 0.06

        // Wrap around edges with padding
        if (p.x < -20) p.x = w + 20
        if (p.x > w + 20) p.x = -20
        if (p.y < -20) p.y = h + 20
        if (p.y > h + 20) p.y = -20

        // Mouse repulsion
        const dx = p.x - mx
        const dy = p.y - my
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE
          p.x += (dx / dist) * force * 2
          p.y += (dy / dist) * force * 2
        }

        // Twinkle
        const pulse = Math.sin(t * p.pulseSpeed + p.pulsePhase) * 0.5 + 0.5
        p.alpha = p.baseAlpha * (0.5 + pulse * 0.5)
        p.radius = p.baseRadius * (0.85 + pulse * 0.15)

        // Draw particle with glow
        const color = `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${p.alpha})`
        const glowColor = `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, ${p.alpha * 0.3})`

        // Outer glow
        ctx.beginPath()
        const glowSize = p.radius * 3.5
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize)
        grd.addColorStop(0, color)
        grd.addColorStop(0.4, glowColor)
        grd.addColorStop(1, 'hsla(0, 0%, 0%, 0)')
        ctx.fillStyle = grd
        ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2)
        ctx.fill()

        // Bright core
        ctx.beginPath()
        ctx.fillStyle = `hsla(${p.hue}, ${Math.min(p.saturation + 10, 100)}%, ${Math.min(p.lightness + 20, 95)}%, ${Math.min(p.alpha * 1.4, 1)})`
        ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2)
        ctx.fill()
      }

      // Occasional larger "star" flares — every ~3 seconds a random bright flash
      if (Math.random() < 0.003) {
        const fp = particles[Math.floor(Math.random() * particles.length)]
        const flareGrd = ctx.createRadialGradient(fp.x, fp.y, 0, fp.x, fp.y, fp.radius * 12)
        flareGrd.addColorStop(0, `hsla(${fp.hue}, 80%, 90%, 0.6)`)
        flareGrd.addColorStop(0.3, `hsla(${fp.hue}, 70%, 70%, 0.15)`)
        flareGrd.addColorStop(1, 'hsla(0,0%,0%,0)')
        ctx.beginPath()
        ctx.fillStyle = flareGrd
        ctx.arc(fp.x, fp.y, fp.radius * 12, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(render)
    }

    // Sort particles by layer once
    particlesRef.current.sort((a, b) => a.layer - b.layer)
    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'transparent' }}
    />
  )
}

ZavorthCosmicCanvas.displayName = 'ZavorthCosmicCanvas'
