'use client'

import React, { useEffect, useRef } from 'react'

function seededRandom(seed: number) {
  return function next() {
    let value = (seed += 0x6d2b79f5)
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  alpha: number,
  colorTemplate: string,
  glow = false,
) {
  if (glow) {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius * 8.5)
    gradient.addColorStop(0, colorTemplate.replace('__A__', String(alpha * 0.2)))
    gradient.addColorStop(0.45, colorTemplate.replace('__A__', String(alpha * 0.075)))
    gradient.addColorStop(1, colorTemplate.replace('__A__', '0'))
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(x, y, radius * 8.5, 0, Math.PI * 2)
    ctx.fill()
  }

  ctx.beginPath()
  ctx.arc(x, y, radius, 0, Math.PI * 2)
  ctx.fillStyle = colorTemplate.replace('__A__', String(alpha))
  ctx.fill()
}

export default function HeroNetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let resizeTimer = 0

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const width = Math.max(1, Math.floor(rect.width))
      const height = Math.max(1, Math.floor(rect.height))
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25)

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const rand = seededRandom(width * 97 + height * 31 + 1337)

      const base = ctx.createLinearGradient(0, 0, width, height)
      base.addColorStop(0, '#010202')
      base.addColorStop(0.3, '#030605')
      base.addColorStop(0.62, '#050706')
      base.addColorStop(1, '#010202')
      ctx.fillStyle = base
      ctx.fillRect(0, 0, width, height)

      const glowRadius = Math.max(width, height)
      const ambientGlows: Array<[number, number, number, string, string]> = [
        [width * 0.18, height * 0.18, glowRadius * 0.48, 'rgba(176,255,210,0.09)', 'rgba(176,255,210,0)'],
        [width * 0.78, height * 0.26, glowRadius * 0.4, 'rgba(220,240,255,0.052)', 'rgba(220,240,255,0)'],
        [width * 0.48, height * 0.76, glowRadius * 0.5, 'rgba(176,255,210,0.038)', 'rgba(176,255,210,0)'],
      ]

      ambientGlows.forEach(([x, y, radius, inner, outer]) => {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        gradient.addColorStop(0, inner)
        gradient.addColorStop(0.48, outer)
        gradient.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, width, height)
      })

      const smallStars = width < 760 ? 145 : 290
      const mediumStars = width < 760 ? 36 : 72
      const heroStars = width < 760 ? 8 : 16

      for (let i = 0; i < smallStars; i += 1) {
        const x = rand() * width
        const y = rand() * height
        const radius = 0.25 + rand() * 0.85
        const alpha = 0.055 + rand() * 0.27
        const greenish = i % 8 === 0

        drawStar(
          ctx,
          x,
          y,
          radius,
          alpha,
          greenish ? 'rgba(176,255,210,__A__)' : 'rgba(240,246,252,__A__)',
        )
      }

      for (let i = 0; i < mediumStars; i += 1) {
        const x = rand() * width
        const y = rand() * height
        const radius = 0.75 + rand() * 1.35
        const alpha = 0.12 + rand() * 0.3
        const color = i % 4 === 0 ? 'rgba(176,255,210,__A__)' : 'rgba(248,252,255,__A__)'
        drawStar(ctx, x, y, radius, alpha, color, true)
      }

      for (let i = 0; i < heroStars; i += 1) {
        const x = rand() * width
        const y = rand() * height
        const radius = 1.25 + rand() * 1.9
        const alpha = 0.22 + rand() * 0.34
        const color = i % 5 === 0 ? 'rgba(176,255,210,__A__)' : 'rgba(255,255,255,__A__)'

        drawStar(ctx, x, y, radius, alpha, color, true)

        ctx.save()
        ctx.globalAlpha = alpha * 0.18
        ctx.strokeStyle = i % 5 === 0 ? 'rgba(176,255,210,1)' : 'rgba(255,255,255,1)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x - radius * 3.5, y)
        ctx.lineTo(x + radius * 3.5, y)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(x, y - radius * 3.5)
        ctx.lineTo(x, y + radius * 3.5)
        ctx.stroke()
        ctx.restore()
      }

      ctx.save()
      ctx.globalAlpha = 0.13
      ctx.translate(width * 0.52, height * 0.44)
      ctx.rotate(-0.22)
      const haze = ctx.createLinearGradient(-width * 0.45, 0, width * 0.45, 0)
      haze.addColorStop(0, 'rgba(176,255,210,0)')
      haze.addColorStop(0.25, 'rgba(176,255,210,0.055)')
      haze.addColorStop(0.5, 'rgba(255,255,255,0.065)')
      haze.addColorStop(0.75, 'rgba(176,255,210,0.04)')
      haze.addColorStop(1, 'rgba(176,255,210,0)')
      ctx.fillStyle = haze
      ctx.beginPath()
      ctx.ellipse(0, 0, width * 0.48, height * 0.11, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()
    }

    const handleResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(draw, 80)
    }

    draw()
    window.addEventListener('resize', handleResize, { passive: true })

    return () => {
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_64%_at_50%_40%,transparent_26%,rgba(2,3,3,0.62)_78%,rgba(2,3,3,0.9)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent via-[#050505]/72 to-[#050505]" />
    </div>
  )
}
