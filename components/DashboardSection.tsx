'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { createReveal, ensureGsapPlugins, initSpotlight } from './motion'
import { Shield, Eye, Layers, FileCheck, Lock, Radio } from 'lucide-react'

/**
 * DashboardSection — "Trust Plane"
 * 
 * Replaces the generic "control panel" with Zavorth's actual Trust Plane
 * architecture: Policy Broker, Approval Envelopes, SecretRef isolation,
 * Autonomy Slider, Visual Receipts, and Trust Panel.
 * 
 * Rendered as a 2×3 grid of deep, glass-morphism feature cards with
 * live inline interactive demonstrations.
 */

type AutonomyLevel = 'conservative' | 'balanced' | 'advanced' | 'business'

export function DashboardSection() {
  const rootRef = useRef<HTMLElement>(null)
  const gridContainerRef = useRef<HTMLDivElement>(null)
  
  // Dynamic Autonomy State that updates other cards
  const [autonomy, setAutonomy] = useState<AutonomyLevel>('balanced')
  const [sliderVal, setSliderVal] = useState(1) // 0: Cons, 1: Bal, 2: Adv, 3: Bus

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value)
    setSliderVal(val)
    const levels: AutonomyLevel[] = ['conservative', 'balanced', 'advanced', 'business']
    setAutonomy(levels[val])
  }

  useLayoutEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()
    const ctx = gsap.context(() => {
      createReveal('[data-trust-reveal]', {
        trigger: rootRef.current!,
        start: 'top 80%',
        y: 24,
        duration: 0.7,
        stagger: 0.08,
      })

      // Attach spotlight animations to each trust card
      if (gridContainerRef.current) {
        const cards = gridContainerRef.current.querySelectorAll('.trust-card')
        cards.forEach((card) => {
          initSpotlight(card as HTMLElement)
        })
      }
    }, rootRef)
    return () => ctx.revert()
  }, [])

  // Dynamic values helper based on autonomy state
  const getPolicyBrokerDemo = () => {
    switch(autonomy) {
      case 'conservative':
        return (
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-text-faint">fs.move</span>
              <span className="rounded-sm bg-amber/10 px-2 py-0.5 text-[10px] text-amber">GATE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-faint">fs.delete</span>
              <span className="rounded-sm bg-danger/10 px-2 py-0.5 text-[10px] text-danger">BLOCK</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-faint">web.fetch</span>
              <span className="rounded-sm bg-danger/10 px-2 py-0.5 text-[10px] text-danger">BLOCK</span>
            </div>
          </div>
        )
      case 'balanced':
        return (
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-text-faint">fs.move</span>
              <span className="rounded-sm bg-success/10 px-2 py-0.5 text-[10px] text-success">ALLOW</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-faint">fs.delete</span>
              <span className="rounded-sm bg-amber/10 px-2 py-0.5 text-[10px] text-amber">GATE</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-faint">web.fetch(external)</span>
              <span className="rounded-sm bg-danger/10 px-2 py-0.5 text-[10px] text-danger">BLOCK</span>
            </div>
          </div>
        )
      case 'advanced':
        return (
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-text-faint">fs.move</span>
              <span className="rounded-sm bg-success/10 px-2 py-0.5 text-[10px] text-success">ALLOW</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-faint">fs.delete</span>
              <span className="rounded-sm bg-success/10 px-2 py-0.5 text-[10px] text-success">ALLOW</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-faint">web.fetch(external)</span>
              <span className="rounded-sm bg-amber/10 px-2 py-0.5 text-[10px] text-amber">GATE</span>
            </div>
          </div>
        )
      case 'business':
        return (
          <div className="space-y-1.5 font-mono text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-text-faint">fs.move</span>
              <span className="rounded-sm bg-success/10 px-2 py-0.5 text-[10px] text-success">ALLOW</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-faint">fs.delete</span>
              <span className="rounded-sm bg-success/10 px-2 py-0.5 text-[10px] text-success">ALLOW</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-text-faint">web.fetch(external)</span>
              <span className="rounded-sm bg-success/10 px-2 py-0.5 text-[10px] text-success">ALLOW</span>
            </div>
          </div>
        )
    }
  }

  const getApprovalEnvelopeDemo = () => {
    const isRequired = autonomy === 'conservative' || autonomy === 'balanced'
    return (
      <div className={`rounded-xl border p-3 transition-all duration-300 ${
        isRequired ? 'border-amber/20 bg-amber/[0.02]' : 'border-success/10 bg-success/[0.01]'
      }`}>
        <div className="mb-2 flex items-center gap-2">
          <Shield size={12} className={isRequired ? 'text-amber' : 'text-success'} />
          <span className={`font-mono text-[10px] font-bold ${isRequired ? 'text-amber' : 'text-success'}`}>
            {isRequired ? 'ENVELOPE REQUERIDO #ZV-0042' : 'AUTO-RESOLVIDO (BYPASS)'}
          </span>
        </div>
        <div className="space-y-1 font-mono text-[10px] text-text-faint">
          <p>scope: delete /backup/*.sql</p>
          <p>surface: {isRequired ? 'dashboard | telegram' : 'none'}</p>
          <p>actionable: {isRequired ? 'yes (requires signature)' : 'no'}</p>
        </div>
      </div>
    )
  }

  const getTrustPanelDemo = () => {
    switch(autonomy) {
      case 'conservative':
        return (
          <div className="space-y-1.5 font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              <span className="text-text-secondary">Organizar arquivos</span>
              <span className="ml-auto text-amber">Pede antes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-danger" />
              <span className="text-text-secondary">Excluir arquivos</span>
              <span className="ml-auto text-danger">Bloqueado</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-danger" />
              <span className="text-text-secondary">Acessar rede</span>
              <span className="ml-auto text-danger">Bloqueado</span>
            </div>
          </div>
        )
      case 'balanced':
        return (
          <div className="space-y-1.5 font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <span className="text-text-secondary">Organizar arquivos</span>
              <span className="ml-auto text-success">Autônomo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              <span className="text-text-secondary">Excluir arquivos</span>
              <span className="ml-auto text-amber">Pede antes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-danger" />
              <span className="text-text-secondary">Acessar rede</span>
              <span className="ml-auto text-danger">Bloqueado</span>
            </div>
          </div>
        )
      case 'advanced':
        return (
          <div className="space-y-1.5 font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <span className="text-text-secondary">Organizar arquivos</span>
              <span className="ml-auto text-success">Autônomo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <span className="text-text-secondary">Excluir arquivos</span>
              <span className="ml-auto text-success">Autônomo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              <span className="text-text-secondary">Acessar rede</span>
              <span className="ml-auto text-amber">Pede antes</span>
            </div>
          </div>
        )
      case 'business':
        return (
          <div className="space-y-1.5 font-mono text-[10px]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <span className="text-text-secondary">Organizar arquivos</span>
              <span className="ml-auto text-success">Autônomo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <span className="text-text-secondary">Excluir arquivos</span>
              <span className="ml-auto text-success">Autônomo</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              <span className="text-text-secondary">Acessar rede</span>
              <span className="ml-auto text-success">Autônomo</span>
            </div>
          </div>
        )
    }
  }

  const getVisualReceiptsDemo = () => {
    switch(autonomy) {
      case 'conservative':
        return (
          <div className="space-y-1 font-mono text-[10px]">
            <div className="flex items-center justify-between text-text-secondary">
              <span>8 ações executadas</span>
              <span className="text-success">✓</span>
            </div>
            <div className="flex items-center justify-between text-text-secondary">
              <span>29 ações bloqueadas</span>
              <span className="text-danger">✖</span>
            </div>
            <div className="flex items-center justify-between text-text-secondary">
              <span>Rollback disponível</span>
              <span className="text-success">24h</span>
            </div>
          </div>
        )
      case 'balanced':
        return (
          <div className="space-y-1 font-mono text-[10px]">
            <div className="flex items-center justify-between text-text-secondary">
              <span>37 ações executadas</span>
              <span className="text-success">✓</span>
            </div>
            <div className="flex items-center justify-between text-text-secondary">
              <span>3 ações bloqueadas</span>
              <span className="text-amber">⚠</span>
            </div>
            <div className="flex items-center justify-between text-text-secondary">
              <span>Rollback disponível</span>
              <span className="text-success">24h</span>
            </div>
          </div>
        )
      case 'advanced':
        return (
          <div className="space-y-1 font-mono text-[10px]">
            <div className="flex items-center justify-between text-text-secondary">
              <span>40 ações executadas</span>
              <span className="text-success">✓</span>
            </div>
            <div className="flex items-center justify-between text-text-secondary">
              <span>0 ações bloqueadas</span>
              <span className="text-success">✓</span>
            </div>
            <div className="flex items-center justify-between text-text-secondary">
              <span>Rollback disponível</span>
              <span className="text-success">12h</span>
            </div>
          </div>
        )
      case 'business':
        return (
          <div className="space-y-1 font-mono text-[10px]">
            <div className="flex items-center justify-between text-text-secondary">
              <span>40 ações executadas</span>
              <span className="text-success">✓</span>
            </div>
            <div className="flex items-center justify-between text-text-secondary">
              <span>Sem travas de segurança</span>
              <span className="text-danger">⚠</span>
            </div>
            <div className="flex items-center justify-between text-text-secondary">
              <span>Rollback indisponível</span>
              <span className="text-text-faint">none</span>
            </div>
          </div>
        )
    }
  }

  return (
    <section id="dashboard" ref={rootRef} className="relative section-rhythm overflow-hidden">
      {/* Aurora Ambient Spotlight elements */}
      <div className="absolute right-[5%] bottom-[10%] -z-10 h-[300px] w-[300px] rounded-full bg-violet-600/5 blur-[90px]" />
      
      <div className="mx-auto max-w-content px-5 sm:px-6 relative z-10">
        {/* Header */}
        <div data-trust-reveal className="mb-16 text-center">
          <p className="eyebrow mb-4 justify-center">Trust Plane</p>
          <h2 className="section-title-display mb-5 text-text-primary">
            Seis camadas entre o pedido
            <br />
            <span className="text-text-muted">e qualquer ação real.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-body-lg text-text-muted">
            O Zavorth não é um chatbot com acesso ao terminal. É um runtime
            governado com política, aprovação, isolamento de credenciais, recibos
            e controle de autonomia — tudo auditável.
          </p>
        </div>

        {/* 2×3 Grid container */}
        <div ref={gridContainerRef} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          
          {/* Card 1: Policy Broker */}
          <div
            data-trust-reveal
            className="trust-card spotlight-card spotlight-border group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#070707]/60 p-6 transition-all duration-500 hover:border-amber/15 hover:shadow-[0_0_50px_rgba(245,158,11,0.03)]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-text-muted transition-colors duration-300 group-hover:bg-amber/10 group-hover:text-amber">
                    <Layers size={15} />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text-faint">
                    Policy Broker
                  </span>
                </div>
                <h3 className="mb-2 text-[15px] font-semibold leading-snug tracking-tight text-text-primary">
                  Um árbitro para todas as decisões
                </h3>
                <p className="mb-5 text-[13px] leading-relaxed text-text-muted">
                  Ferramentas, canais, skills, MCP e arquivos. Um único broker resolve tudo com base na autonomia ativa.
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.04] bg-black/40 p-3.5 mt-auto">
                {getPolicyBrokerDemo()}
              </div>
            </div>
          </div>

          {/* Card 2: Approval Envelope */}
          <div
            data-trust-reveal
            className="trust-card spotlight-card spotlight-border group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#070707]/60 p-6 transition-all duration-500 hover:border-amber/15 hover:shadow-[0_0_50px_rgba(245,158,11,0.03)]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-text-muted transition-colors duration-300 group-hover:bg-amber/10 group-hover:text-amber">
                    <Shield size={15} />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text-faint">
                    Approval Envelope
                  </span>
                </div>
                <h3 className="mb-2 text-[15px] font-semibold leading-snug tracking-tight text-text-primary">
                  Aprovações escopadas e auditáveis
                </h3>
                <p className="mb-5 text-[13px] leading-relaxed text-text-muted">
                  Cada gate gera um envelope com escopo de ação, superfície de assinatura e hash. Nada escala ocultamente.
                </p>
              </div>
              <div className="mt-auto">
                {getApprovalEnvelopeDemo()}
              </div>
            </div>
          </div>

          {/* Card 3: SecretRef */}
          <div
            data-trust-reveal
            className="trust-card spotlight-card spotlight-border group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#070707]/60 p-6 transition-all duration-500 hover:border-amber/15 hover:shadow-[0_0_50px_rgba(245,158,11,0.03)]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-text-muted transition-colors duration-300 group-hover:bg-amber/10 group-hover:text-amber">
                    <Lock size={15} />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text-faint">
                    SecretRef
                  </span>
                </div>
                <h3 className="mb-2 text-[15px] font-semibold leading-snug tracking-tight text-text-primary">
                  Credenciais nunca tocam o prompt
                </h3>
                <p className="mb-5 text-[13px] leading-relaxed text-text-muted">
                  Tokens, chaves e senhas viram referências opacas (SecretRef). O modelo vê o alias estruturado, não o segredo.
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.04] bg-black/40 p-3.5 mt-auto">
                <div className="space-y-1.5 font-mono text-[10px]">
                  <div className="flex items-center gap-2">
                    <span className="text-danger line-through opacity-40">TELEGRAM_TOKEN=sk-abc1293...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-success">SecretRef("telegram.bot_token")</span>
                  </div>
                  <p className="mt-2 text-[9px] text-text-faint">→ O modelo consome o alias opaco na chamada</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Trust Panel */}
          <div
            data-trust-reveal
            className="trust-card spotlight-card spotlight-border group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#070707]/60 p-6 transition-all duration-500 hover:border-amber/15 hover:shadow-[0_0_50px_rgba(245,158,11,0.03)]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-text-muted transition-colors duration-300 group-hover:bg-amber/10 group-hover:text-amber">
                    <Eye size={15} />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text-faint">
                    Trust Panel
                  </span>
                </div>
                <h3 className="mb-2 text-[15px] font-semibold leading-snug tracking-tight text-text-primary">
                  Saiba exatamente o que é permitido
                </h3>
                <p className="mb-5 text-[13px] leading-relaxed text-text-muted">
                  O que ele executa sozinho, o que necessita de autorização antes, e o que está bloqueado em linguagem humana.
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.04] bg-black/40 p-3.5 mt-auto">
                {getTrustPanelDemo()}
              </div>
            </div>
          </div>

          {/* Card 5: Visual Receipts */}
          <div
            data-trust-reveal
            className="trust-card spotlight-card spotlight-border group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#070707]/60 p-6 transition-all duration-500 hover:border-amber/15 hover:shadow-[0_0_50px_rgba(245,158,11,0.03)]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-text-muted transition-colors duration-300 group-hover:bg-amber/10 group-hover:text-amber">
                    <FileCheck size={15} />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text-faint">
                    Visual Receipts
                  </span>
                </div>
                <h3 className="mb-2 text-[15px] font-semibold leading-snug tracking-tight text-text-primary">
                  Recibos estruturados para auditoria
                </h3>
                <p className="mb-5 text-[13px] leading-relaxed text-text-muted">
                  Mapeamento completo do que mudou no sistema, quais arquivos foram criados, e janela de rollback operacional.
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.04] bg-black/40 p-3.5 mt-auto">
                {getVisualReceiptsDemo()}
              </div>
            </div>
          </div>

          {/* Card 6: Autonomy Slider (Drag & Update Core) */}
          <div
            data-trust-reveal
            className="trust-card spotlight-card spotlight-border group relative overflow-hidden rounded-2xl border border-white/[0.05] bg-[#070707]/60 p-6 transition-all duration-500 hover:border-amber/15 hover:shadow-[0_0_50px_rgba(245,158,11,0.03)]"
          >
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-text-muted transition-colors duration-300 group-hover:bg-amber/10 group-hover:text-amber">
                    <Radio size={15} />
                  </div>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-amber animate-pulse">
                    Interactive Autonomy
                  </span>
                </div>
                <h3 className="mb-2 text-[15px] font-semibold leading-snug tracking-tight text-text-primary">
                  Simule o nível de autonomia do runtime
                </h3>
                <p className="mb-5 text-[13px] leading-relaxed text-text-muted">
                  Arraste o slider abaixo para alterar dinamicamente os parâmetros de permissões e as travas nos cartões acima.
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.05] bg-black/50 p-4 mt-auto">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-faint">Nível ativo:</span>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber">
                      {autonomy}
                    </span>
                  </div>
                  
                  {/* Styled Input Range Slider */}
                  <input
                    type="range"
                    min="0"
                    max="3"
                    step="1"
                    value={sliderVal}
                    onChange={handleSliderChange}
                    className="w-full h-1 bg-white/[0.08] rounded-lg appearance-none cursor-pointer accent-amber"
                  />
                  
                  <div className="flex justify-between font-mono text-[8px] text-text-faint select-none">
                    <span className={sliderVal === 0 ? 'text-amber font-bold' : ''}>CONS</span>
                    <span className={sliderVal === 1 ? 'text-amber font-bold' : ''}>BAL</span>
                    <span className={sliderVal === 2 ? 'text-amber font-bold' : ''}>ADV</span>
                    <span className={sliderVal === 3 ? 'text-amber font-bold' : ''}>BUS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
