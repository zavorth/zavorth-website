'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Network, 
  Compass, 
  Search, 
  Code2, 
  ShieldCheck, 
  CheckCircle2,
  Sparkles
} from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeHover, setActiveHover] = useState<number | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const swarmBranches = [
    {
      id: 'architect',
      name: 'Arquiteto',
      role: 'Mapeia Arquitetura',
      icon: Compass,
      desc: 'Analisa o impacto das mudanças e traça o plano de execução.',
      metric: '0 Dependências Quebradas',
    },
    {
      id: 'researcher',
      name: 'Pesquisador',
      role: 'Varredura Contínua',
      icon: Search,
      desc: 'Examina documentações e repositórios sem poluir o contexto principal.',
      metric: 'Busca Semântica < 10ms',
    },
    {
      id: 'builder',
      name: 'Construtor',
      role: 'Implementação Real',
      icon: Code2,
      desc: 'Escreve código completo e tipado de ponta a ponta sem atalhos.',
      metric: '100% Código Funcional',
    },
    {
      id: 'auditor',
      name: 'Auditor',
      role: 'Garantia de Qualidade',
      icon: ShieldCheck,
      desc: 'Executa suítes de testes automatizados antes de aprovar.',
      metric: 'Zero Regressões',
    },
  ]

  // Continuous background particle flow along the swarm streams
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

    // Animated energy photons travelling from top center to 4 bottom targets
    const photonCount = 28
    const photons: Array<{
      branch: number
      t: number
      speed: number
      size: number
      alpha: number
    }> = []

    for (let i = 0; i < photonCount; i++) {
      photons.push({
        branch: i % 4,
        t: Math.random(),
        speed: 0.0035 + Math.random() * 0.004,
        size: Math.random() * 2 + 1.5,
        alpha: Math.random() * 0.7 + 0.3,
      })
    }

    let animId = 0
    const render = () => {
      ctx.clearRect(0, 0, w, h)

      const startX = w / 2
      const startY = 40
      const targetY = h - 60

      // Draw the 4 organic curved guide streams
      for (let i = 0; i < 4; i++) {
        const targetX = (w / 5) * (i + 1)
        const cp1X = startX + (targetX - startX) * 0.25
        const cp1Y = startY + (targetY - startY) * 0.5
        const cp2X = targetX
        const cp2Y = startY + (targetY - startY) * 0.7

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, targetX, targetY)
        ctx.strokeStyle = activeHover === i 
          ? 'rgba(0, 232, 143, 0.45)' 
          : 'rgba(0, 232, 143, 0.12)'
        ctx.lineWidth = activeHover === i ? 2 : 1
        ctx.stroke()
      }

      // Animate flowing photons along bezier paths
      for (let i = 0; i < photons.length; i++) {
        const p = photons[i]
        p.t += p.speed
        if (p.t > 1) p.t = 0

        const targetX = (w / 5) * (p.branch + 1)
        const cp1X = startX + (targetX - startX) * 0.25
        const cp1Y = startY + (targetY - startY) * 0.5
        const cp2X = targetX
        const cp2Y = startY + (targetY - startY) * 0.7

        // Cubic bezier interpolation
        const u = 1 - p.t
        const tt = p.t * p.t
        const uu = u * u
        const uuu = uu * u
        const ttt = tt * p.t

        const px = uuu * startX + 3 * uu * p.t * cp1X + 3 * u * tt * cp2X + ttt * targetX
        const py = uuu * startY + 3 * uu * p.t * cp1Y + 3 * u * tt * cp2Y + ttt * targetY

        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 232, 143, ${p.alpha})`
        ctx.shadowColor = '#00e88f'
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(animId)
    }
  }, [activeHover])

  // GSAP ScrollTrigger for revealing the whole swarm stage organically
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-swarm-pillar',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      data-how-it-works
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Subtle central energy glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#00e88f]/[0.03] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <Network className="w-3.5 h-3.5 text-[#00e88f]" />
            <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
              Orquestração Swarm
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-white">
            Vários especialistas{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              operando em paralelo.
            </span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-neutral-400 font-light max-w-2xl mx-auto leading-relaxed">
            Seu objetivo se ramifica automaticamente. Subagentes especializados pesquisam, constroem e auditam em tempo real sem filas lentas.
          </p>
        </div>

        {/* Cinematic Living Swarm Visualization (Continuous Automatic Motion) */}
        <div className="relative pt-6 pb-12">
          
          {/* Central Origin Node (Your Goal) */}
          <div className="flex flex-col items-center justify-center text-center relative z-20 mb-8">
            <div className="px-5 py-2 rounded-full bg-black border border-[#00e88f]/40 shadow-[0_0_30px_rgba(0,232,143,0.25)] flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#00e88f] animate-ping" />
              <span className="text-xs font-mono text-white tracking-wide">
                OBJETIVO DEFINIDO &middot; DISPARO PARALELO AUTOMÁTICO
              </span>
            </div>
          </div>

          {/* Living Particle Streams Canvas */}
          <div className="relative w-full h-[220px] hidden sm:block">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none"
            />
          </div>

          {/* 4 Automatic Parallel Branches */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-20 mt-4">
            {swarmBranches.map((branch, idx) => {
              const Icon = branch.icon
              const isHovered = activeHover === idx
              return (
                <div
                  key={branch.id}
                  onMouseEnter={() => setActiveHover(idx)}
                  onMouseLeave={() => setActiveHover(null)}
                  className={`gsap-swarm-pillar p-6 rounded-3xl transition-all duration-300 border ${
                    isHovered
                      ? 'bg-white/[0.05] border-[#00e88f]/50 shadow-[0_0_30px_rgba(0,232,143,0.15)] scale-[1.02]'
                      : 'bg-neutral-950/40 border-white/[0.06] hover:border-white/[0.12]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-2xl bg-[#00e88f]/10 border border-[#00e88f]/20 flex items-center justify-center text-[#00e88f]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-[#00e88f] px-2 py-0.5 rounded-full bg-[#00e88f]/[0.08]">
                      PARALELO
                    </span>
                  </div>

                  <h3 className="text-base font-medium text-white mb-0.5">{branch.name}</h3>
                  <span className="text-xs text-neutral-400 font-light block mb-3">{branch.role}</span>

                  <p className="text-xs text-neutral-400 font-light leading-relaxed mb-4">
                    {branch.desc}
                  </p>

                  <div className="pt-3 border-t border-white/[0.04] text-[11px] font-mono text-neutral-500 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#00e88f]" />
                    <span>{branch.metric}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Convergence Summary Pulse */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 bg-white/[0.02] border border-white/[0.06] px-4 py-2 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00e88f]" />
              <span>Todas as branches sincronizam automaticamente antes da entrega final</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
