'use client'

import React, { useLayoutEffect, useRef } from 'react'
import {
  Brain,
  FileSearch,
  Globe,
  MessageSquare,
  Mic,
  ShieldCheck,
  Terminal,
  Webhook,
} from 'lucide-react'
import gsap from 'gsap'
import { createReveal, ensureGsapPlugins } from './motion'

const channels = [
  { label: 'Web', desc: 'dashboard', Icon: Globe },
  { label: 'Chat', desc: 'mensagens', Icon: MessageSquare },
  { label: 'Voz', desc: 'fala', Icon: Mic },
  { label: 'CLI', desc: 'terminal', Icon: Terminal },
  { label: 'API', desc: 'eventos', Icon: Webhook },
]

const runtimeLayers = ['Memoria', 'Politica', 'Tools', 'Auditoria']

const coreFeatures = [
  {
    icon: Brain,
    title: 'Memoria progressiva',
    desc: 'Contexto em camadas para manter continuidade sem estourar tokens.',
  },
  {
    icon: ShieldCheck,
    title: 'Governanca embarcada',
    desc: 'Preview, aprovacao e rollback vivem dentro do loop.',
  },
  {
    icon: FileSearch,
    title: 'Evidencia rastreavel',
    desc: 'Cada acao deixa log, proveniencia e resumo auditavel.',
  },
]

export function RuntimeSection() {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      createReveal('[data-runtime-header]', {
        trigger: rootRef.current!,
        start: 'top 78%',
        y: 18,
        duration: 0.8,
      })
      createReveal('[data-runtime-item]', {
        trigger: '[data-runtime-content]',
        start: 'top 82%',
        y: 16,
        duration: 0.75,
        stagger: 0.055,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="runtime" ref={rootRef} className="relative section-rhythm">
      <div className="section-divider max-w-content mx-auto mb-16 lg:mb-20" />

      <div className="max-w-6xl mx-auto px-6">
        <div data-runtime-header className="text-center mb-12 md:mb-14">
          <p className="eyebrow mb-4 justify-center mx-auto">02 - Runtime</p>
          <h2 className="section-title-display text-heading sm:text-display-sm text-neutral-50 mb-5">
            Um loop. <span className="signal-text">Todas as superficies.</span>
          </h2>
          <p className="section-lead text-body-lg text-neutral-500 leading-relaxed">
            Todo pedido, de qualquer canal, cai no mesmo runtime com memoria,
            politica e auditoria ja no caminho.
          </p>
        </div>

        <div data-runtime-content className="runtime-signal-map">
          <div className="runtime-signal-map__channels" data-runtime-item>
            {channels.map((channel) => {
              const Icon = channel.Icon

              return (
                <div key={channel.label} className="runtime-signal-channel">
                  <span className="runtime-signal-channel__icon">
                    <Icon size={17} />
                  </span>
                  <strong>{channel.label}</strong>
                  <small>{channel.desc}</small>
                </div>
              )
            })}
          </div>

          <div className="runtime-signal-map__core" data-runtime-item>
            <div className="runtime-core-orbit" aria-hidden="true" />
            <p>Runtime unico</p>
            <h3>A superficie muda. O centro nao.</h3>
            <span>
              Identidade, politica, tools e evidencia seguem o pedido ate a entrega.
            </span>
            <div className="runtime-core-rail">
              {runtimeLayers.map((layer) => (
                <b key={layer}>{layer}</b>
              ))}
            </div>
          </div>

          <div className="runtime-signal-map__proofs" data-runtime-item>
            {coreFeatures.map((feature) => {
              const FeatureIcon = feature.icon

              return (
                <div key={feature.title} className="runtime-proof-line">
                  <FeatureIcon size={17} />
                  <span>
                    <strong>{feature.title}</strong>
                    <small>{feature.desc}</small>
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
