'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Shield, Eye, X, Check } from 'lucide-react'
import gsap from 'gsap'

interface ApprovalCardProps {
  title?: string
  items?: { label: string; value: string }[]
  className?: string
}

export function ApprovalCard({
  title = 'Zavorth quer organizar sua pasta Projetos',
  items = [
    { label: 'Arquivos encontrados', value: '42' },
    { label: 'Novas pastas sugeridas', value: '8' },
    { label: 'Arquivos apagados', value: '0' },
    { label: 'Prévia disponível', value: 'Sim' },
    { label: 'Pode ser desfeito', value: 'Sim' },
  ],
  className = '',
}: ApprovalCardProps) {
  const [state, setState] = useState<'pending' | 'authorized' | 'cancelled' | 'preview'>('pending')
  const contentRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const reset = () => {
    setTimeout(() => {
      setState('pending')
    }, 2800)
  }

  // Trigger elastic transition entry when status changes
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    
    gsap.fromTo(el, 
      { opacity: 0, scale: 0.95, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'back.out(1.5)' }
    )
  }, [state])

  // Spark burst particles simulation on authorize
  const triggerParticlesBurst = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const container = containerRef.current
    if (!container) return

    const containerRect = container.getBoundingClientRect()
    const x = rect.left - containerRect.left + rect.width / 2
    const y = rect.top - containerRect.top + rect.height / 2

    // Create 15 glowing sparks
    for (let i = 0; i < 15; i++) {
      const spark = document.createElement('div')
      spark.className = 'absolute pointer-events-none rounded-full'
      
      const isGreen = state === 'preview' || i % 2 === 0
      spark.style.backgroundColor = isGreen ? '#10b981' : '#f59e0b'
      spark.style.boxShadow = isGreen ? '0 0 8px #10b981' : '0 0 8px #f59e0b'
      
      const size = Math.random() * 5 + 3
      spark.style.width = `${size}px`
      spark.style.height = `${size}px`
      spark.style.left = `${x}px`
      spark.style.top = `${y}px`
      spark.style.zIndex = '50'

      container.appendChild(spark)

      // Random path trajectory
      const angle = Math.random() * Math.PI * 2
      const distance = Math.random() * 80 + 40
      const tx = Math.cos(angle) * distance
      const ty = Math.sin(angle) * distance

      gsap.to(spark, {
        x: tx,
        y: ty,
        scale: 0.1,
        opacity: 0,
        duration: Math.random() * 0.5 + 0.4,
        ease: 'power2.out',
        onComplete: () => {
          spark.remove()
        }
      })
    }
  }

  const handleAuthorize = (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerParticlesBurst(e)
    setState('authorized')
    reset()
  }

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    setState('cancelled')
    reset()
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl border border-amber/10 bg-amber/[0.02] backdrop-blur-md shadow-[0_12px_30px_rgba(0,0,0,0.3)] ${className}`}
    >
      {/* Dynamic top highlight depending on status */}
      <div 
        className="absolute inset-x-0 top-0 h-[2px] transition-colors duration-300"
        style={{
          backgroundColor: 
            state === 'authorized' ? '#10b981' :
            state === 'cancelled' ? '#ef4444' : '#f59e0b'
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 border-b border-amber/10 px-5 py-3.5">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber/10">
          <Shield size={14} className="text-amber" />
        </div>
        <div>
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-amber">
            Runtime Gate Pending
          </p>
        </div>
      </div>

      {/* Content wrapper with transition animation */}
      <div ref={contentRef} className="px-5 py-4">
        <p className="mb-4 text-[15px] font-bold leading-snug text-text-primary google-sans-display">{title}</p>

        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-[13px] text-text-muted">{item.label}</span>
              <span className="font-mono text-[13px] font-bold text-text-secondary">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Action interfaces */}
        {state === 'pending' && (
          <div className="mt-5 flex gap-2">
            <button
              onClick={handleAuthorize}
              className="flex items-center gap-1.5 rounded-lg bg-amber px-4 py-2 text-[13px] font-semibold text-surface transition-all hover:bg-amber-dark active:scale-95"
            >
              <Check size={14} />
              Autorizar
            </button>
            <button
              onClick={() => setState('preview')}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-[13px] font-medium text-text-muted transition-all hover:bg-white/[0.05] active:scale-95"
            >
              <Eye size={14} />
              Ver prévia
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.02] px-4 py-2 text-[13px] font-medium text-text-muted transition-all hover:border-danger/20 hover:text-danger active:scale-95"
            >
              <X size={14} />
              Cancelar
            </button>
          </div>
        )}

        {state === 'authorized' && (
          <div className="mt-5 flex items-center gap-2.5 rounded-lg border border-success/20 bg-success/[0.04] px-4 py-2.5 text-[13px] font-semibold text-success">
            <Check size={16} />
            Tarefa autorizada. Executando com segurança.
          </div>
        )}

        {state === 'cancelled' && (
          <div className="mt-5 flex items-center gap-2.5 rounded-lg border border-danger/20 bg-danger/[0.04] px-4 py-2.5 text-[13px] font-semibold text-danger">
            <X size={16} />
            Tarefa cancelada. Nenhum arquivo foi alterado.
          </div>
        )}

        {state === 'preview' && (
          <div className="mt-5 space-y-3">
            <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-amber">
              Plano de Execução Analisado
            </p>
            <div className="space-y-1.5 rounded-lg border border-white/[0.05] bg-black/30 p-3.5">
              <p className="text-[12px] text-text-muted">→ Criar pasta: Faculdade</p>
              <p className="text-[12px] text-text-muted">→ Mover 12 arquivos PDF</p>
              <p className="text-[12px] text-text-muted">→ Mover 6 imagens para Mídia</p>
              <p className="text-[12px] text-success">✓ Nenhum arquivo será apagado (safe-run)</p>
            </div>
            <button
              onClick={handleAuthorize}
              className="flex w-full justify-center items-center gap-1.5 rounded-lg bg-amber px-4 py-2.5 text-[13px] font-semibold text-surface transition-all hover:bg-amber-dark active:scale-95"
            >
              <Check size={14} />
              Autorizar Plano de Ações
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
