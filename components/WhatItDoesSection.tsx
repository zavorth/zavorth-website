'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Network, Sparkles, CheckCircle2, Cpu, ArrowUpRight } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Procedural Deterministic 5x5 Symmetric Identicon Generator
 */
function Identicon({ seed, className = 'w-8 h-8' }: { seed: string; className?: string }) {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash)
  }

  const grid: boolean[][] = []
  for (let y = 0; y < 5; y++) {
    grid[y] = []
    for (let x = 0; x < 3; x++) {
      const bitIndex = (y * 3 + x) % 31
      const isFilled = ((hash >> bitIndex) & 1) === 1
      grid[y][x] = isFilled
      grid[y][4 - x] = isFilled
    }
  }

  return (
    <svg viewBox="0 0 5 5" className={className} shapeRendering="crispEdges">
      {grid.map((row, y) =>
        row.map((filled, x) =>
          filled ? (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#00e88f" />
          ) : (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="rgba(255,255,255,0.04)" />
          )
        )
      )}
    </svg>
  )
}

interface GraphNode {
  id: string
  name: string
  tag: string
  role: string
  desc: string
  metric: string
  seed: string
  x: number // percentage
  y: number // percentage
}

export function WhatItDoesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [selectedNode, setSelectedNode] = useState<string>('core')
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  const nodes: Record<string, GraphNode> = {
    core: {
      id: 'core',
      name: 'Zavorth Core Orchestrator',
      tag: 'COORDENADOR CENTRAL',
      role: 'Distribuição e Síntese',
      desc: 'Recebe o objetivo do usuário, divide o grafo de tarefas e sincroniza os subagentes em paralelo.',
      metric: 'Orquestração < 5ms',
      seed: 'zavorth-root-orchestrator',
      x: 50,
      y: 50,
    },
    architect: {
      id: 'architect',
      name: 'agent.architect',
      tag: 'ARQUITETO',
      role: 'Grafo & Dependências',
      desc: 'Mapeia a arquitetura, detecta dependências e traça o plano de execução sem quebras.',
      metric: '0 Dependências Cíclicas',
      seed: 'zavorth-architect-subagent',
      x: 20,
      y: 22,
    },
    researcher: {
      id: 'researcher',
      name: 'agent.researcher',
      tag: 'PESQUISADOR',
      role: 'Varredura de Contexto',
      desc: 'Indexa documentações, arquivos e referências sem poluir o contexto principal.',
      metric: 'Busca Semântica < 10ms',
      seed: 'zavorth-researcher-subagent',
      x: 80,
      y: 22,
    },
    builder: {
      id: 'builder',
      name: 'agent.builder',
      tag: 'CONSTRUTOR',
      role: 'Implementação de Código',
      desc: 'Gera código completo, tipado e funcional de ponta a ponta sem atalhos ou placeholders.',
      metric: 'Tipagem 100% Estrita',
      seed: 'zavorth-builder-subagent',
      x: 20,
      y: 78,
    },
    auditor: {
      id: 'auditor',
      name: 'agent.auditor',
      tag: 'AUDITOR',
      role: 'Testes & Anti-Regressão',
      desc: 'Executa testes automatizados, linters e auditorias antes de autorizar qualquer entrega.',
      metric: 'Zero Regressões',
      seed: 'zavorth-auditor-subagent',
      x: 80,
      y: 78,
    },
  }

  // Graph Edges (Connections between nodes)
  const edges: Array<[string, string]> = [
    ['core', 'architect'],
    ['core', 'researcher'],
    ['core', 'builder'],
    ['core', 'auditor'],
    ['architect', 'builder'],
    ['researcher', 'builder'],
    ['builder', 'auditor'],
    ['auditor', 'architect'],
  ]

  // Continuous Canvas Particle & Edge Animator
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = container.offsetWidth)
    let h = (canvas.height = container.offsetHeight)

    const onResize = () => {
      if (!canvas || !container) return
      w = canvas.width = container.offsetWidth
      h = canvas.height = container.offsetHeight
    }
    window.addEventListener('resize', onResize)

    // Photons travelling along the graph edges
    const photonCount = 24
    const photons: Array<{
      edgeIndex: number
      t: number
      speed: number
      size: number
    }> = []

    for (let i = 0; i < photonCount; i++) {
      photons.push({
        edgeIndex: i % edges.length,
        t: Math.random(),
        speed: 0.004 + Math.random() * 0.005,
        size: Math.random() * 2 + 1.2,
      })
    }

    let animId = 0
    const render = () => {
      ctx.clearRect(0, 0, w, h)

      // Draw all graph edges
      for (let i = 0; i < edges.length; i++) {
        const [sourceId, targetId] = edges[i]
        const source = nodes[sourceId]
        const target = nodes[targetId]

        const sx = (source.x / 100) * w
        const sy = (source.y / 100) * h
        const tx = (target.x / 100) * w
        const ty = (target.y / 100) * h

        const isHighlighted =
          hoveredNode === sourceId ||
          hoveredNode === targetId ||
          selectedNode === sourceId ||
          selectedNode === targetId

        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(tx, ty)
        ctx.strokeStyle = isHighlighted
          ? 'rgba(0, 232, 143, 0.45)'
          : 'rgba(0, 232, 143, 0.12)'
        ctx.lineWidth = isHighlighted ? 1.8 : 1
        ctx.stroke()
      }

      // Animate travelling photons across the edges
      for (let i = 0; i < photons.length; i++) {
        const p = photons[i]
        p.t += p.speed
        if (p.t > 1) p.t = 0

        const [sourceId, targetId] = edges[p.edgeIndex]
        const source = nodes[sourceId]
        const target = nodes[targetId]

        const sx = (source.x / 100) * w
        const sy = (source.y / 100) * h
        const tx = (target.x / 100) * w
        const ty = (target.y / 100) * h

        const px = sx + (tx - sx) * p.t
        const py = sy + (ty - sy) * p.t

        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = '#00e88f'
        ctx.shadowColor = '#00e88f'
        ctx.shadowBlur = 6
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
  }, [hoveredNode, selectedNode])

  // GSAP ScrollTrigger Node Assembly
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.graph-node-anchor',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'elastic.out(1, 0.75)',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const currentNode = nodes[hoveredNode || selectedNode]

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      data-how-it-works
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00e88f]/[0.03] rounded-full blur-[180px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <Network className="w-3.5 h-3.5 text-[#00e88f]" />
            <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
              Topologia em Grafo
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
            A inteligência conectada em{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              rede distribuída.
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
            Cada subagente opera como um nó no grafo neural do Zavorth. Eles trocam dados e coordenam tarefas de forma autônoma e não-bloqueante.
          </p>
        </div>

        {/* Cinematic Neural Graph Viewport */}
        <div 
          ref={containerRef}
          className="relative w-full aspect-[4/3] sm:aspect-[16/9] max-h-[560px] rounded-3xl border border-white/[0.08] bg-neutral-950/80 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.8)] overflow-hidden"
        >
          {/* Subtle Grid Map Coordinate Texture */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />

          {/* Canvas for dynamic edge lines & laser photons */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
          />

          {/* Top Status Bar in Viewport */}
          <div className="absolute top-5 left-6 right-6 flex items-center justify-between pointer-events-none z-20">
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 bg-black/60 px-3 py-1.5 rounded-full border border-white/[0.06] backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00e88f] animate-pulse" />
              <span>SWARM TOPOLOGY &middot; 5 NÓS ATIVOS</span>
            </div>
            <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline bg-black/60 px-3 py-1.5 rounded-full border border-white/[0.06] backdrop-blur-md">
              INTERAÇÃO: PARE O MOUSE SOBRE UM NÓ
            </span>
          </div>

          {/* Render All Graph Nodes on Exact Percentage Coordinates */}
          {Object.values(nodes).map((node) => {
            const isCore = node.id === 'core'
            const isSelected = (hoveredNode || selectedNode) === node.id

            return (
              <div
                key={node.id}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="graph-node-anchor absolute z-30 cursor-pointer"
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(node.id)}
              >
                <div
                  className={`relative p-3 sm:p-4 rounded-2xl transition-all duration-300 flex items-center gap-3 backdrop-blur-xl border ${
                    isSelected
                      ? 'bg-black border-[#00e88f] shadow-[0_0_30px_rgba(0,232,143,0.3)] scale-110'
                      : isCore
                      ? 'bg-black/90 border-[#00e88f]/40 shadow-[0_0_20px_rgba(0,232,143,0.15)] hover:border-[#00e88f]'
                      : 'bg-black/80 border-white/[0.1] hover:border-[#00e88f]/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center p-1.5 shrink-0">
                    <Identicon seed={node.seed} className="w-full h-full" />
                  </div>

                  <div className="hidden sm:block text-left">
                    <span className="text-[9px] font-mono text-[#00e88f] uppercase tracking-wider block">
                      {node.tag}
                    </span>
                    <span className="text-xs font-medium text-white block">
                      {node.role}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}

          {/* Bottom Live Telemetry HUD Overlay */}
          <div className="absolute bottom-5 left-6 right-6 z-20 pointer-events-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentNode.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="p-4 sm:p-5 rounded-2xl bg-black/85 border border-[#00e88f]/30 backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 pointer-events-auto"
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#00e88f]/10 flex items-center justify-center p-1 border border-[#00e88f]/20 shrink-0">
                    <Identicon seed={currentNode.seed} className="w-full h-full" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-white">
                        {currentNode.name}
                      </h4>
                      <span className="text-[10px] font-mono text-[#00e88f] px-2 py-0.5 rounded-full bg-[#00e88f]/10">
                        {currentNode.tag}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light mt-0.5">
                      {currentNode.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-start sm:self-center font-mono text-[11px] text-[#00e88f] bg-white/[0.03] px-3 py-1.5 rounded-xl border border-white/[0.06]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{currentNode.metric}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  )
}
