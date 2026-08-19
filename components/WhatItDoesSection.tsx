'use client'

import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Globe2, ShieldCheck, Cpu, Sparkles } from 'lucide-react'

export function WhatItDoesSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const providerIcons = [
    { src: '/logos/anthropic.svg', alt: 'Anthropic' },
    { src: '/logos/openai.svg', alt: 'OpenAI' },
    { src: '/logos/googlegemini.svg', alt: 'Google Gemini' },
    { src: '/logos/shell.svg', alt: 'Local Offline' },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = canvas.offsetWidth)
    let h = (canvas.height = canvas.offsetHeight)

    const onResize = () => {
      if (!canvas) return
      w = canvas.width = canvas.offsetWidth
      h = canvas.height = canvas.offsetHeight
    }
    window.addEventListener('resize', onResize)

    // Interactive constellation particles
    const particleCount = 35
    const particles: Array<{ x: number; y: number; vx: number; vy: number; radius: number }> = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
      })
    }

    let mouseX = w / 2
    let mouseY = h / 2
    let isHovered = false

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      isHovered = true
    }

    const onMouseLeave = () => {
      isHovered = false
    }

    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    let animId = 0
    const render = () => {
      ctx.clearRect(0, 0, w, h)

      // Draw connection lines between nearby particles
      for (let i = 0; i < particleCount; i++) {
        const p1 = particles[i]
        p1.x += p1.vx
        p1.y += p1.vy

        if (p1.x < 0 || p1.x > w) p1.vx *= -1
        if (p1.y < 0 || p1.y > h) p1.vy *= -1

        // Magnetic attraction to cursor
        if (isHovered) {
          const dx = mouseX - p1.x
          const dy = mouseY - p1.y
          const dist = Math.hypot(dx, dy)
          if (dist < 180) {
            p1.x += (dx / dist) * 0.5
            p1.y += (dy / dist) * 0.5
          }
        }

        ctx.beginPath()
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 232, 143, 0.4)'
        ctx.fill()

        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j]
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)
          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0, 232, 143, ${0.15 * (1 - dist / 130)})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section
      id="how-it-works"
      data-how-it-works
      className="landing-surface relative overflow-hidden py-32 sm:py-44 border-t border-white/[0.06] text-white scroll-mt-20"
    >
      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-8">
            <Globe2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="section-kicker text-xs font-medium tracking-widest uppercase text-neutral-300">
              Inteligência Conectada
            </span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.08]">
            As melhores IAs do planeta,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-white">
              unificadas para você.
            </span>
          </h2>

          <p className="mt-8 text-base sm:text-lg text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Você não fica preso a nenhuma empresa ou assinatura única. O Zavorth se conecta aos modelos mais avançados do mundo ou roda 100% offline e privado no seu computador.
          </p>
        </div>

        {/* Constellation Canvas & Interactive Core */}
        <div className="relative rounded-3xl border border-white/[0.08] bg-neutral-950/70 p-8 sm:p-16 backdrop-blur-2xl overflow-hidden min-h-[440px] flex flex-col justify-between">
          
          {/* Interactive Constellation Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-auto cursor-crosshair opacity-80"
          />

          {/* Central Orbit of Provider Glyphs */}
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 sm:gap-12 my-auto">
            {providerIcons.map((item) => (
              <motion.div
                key={item.alt}
                whileHover={{ scale: 1.15, y: -4 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-black/80 border border-white/15 flex items-center justify-center backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] cursor-pointer group"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={32}
                  height={32}
                  className="opacity-70 group-hover:opacity-100 transition-opacity filter invert brightness-200"
                />
              </motion.div>
            ))}
          </div>

          {/* Bottom Human Value Highlights */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/[0.06] text-center sm:text-left">
            <div>
              <p className="text-sm font-semibold text-white mb-1">Sem Bloqueios</p>
              <p className="text-xs text-neutral-400 font-light">Use qualquer modelo quando quiser, sem mudar de aplicativo.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">Privacidade Absoluta</p>
              <p className="text-xs text-neutral-400 font-light">Opção de rodar modelos locais sem enviar um único byte para a nuvem.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-1">Velocidade Automática</p>
              <p className="text-xs text-neutral-400 font-light">O agente escolhe o caminho mais rápido para cada tipo de tarefa.</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
