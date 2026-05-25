'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { KeyRound, Clock, Send } from 'lucide-react'

const layers = [
  {
    icon: KeyRound,
    title: 'Assinatura local',
    description:
      'Chaves de execução nunca saem do seu hardware. Cada operação sensível exige uma assinatura criptográfica local antes de prosseguir.',
  },
  {
    icon: Clock,
    title: 'Permissões com expiração',
    description:
      'Autorizações são granulares e temporárias. Quando o tempo limite expira, o acesso é revogado automaticamente — sem estado residual.',
  },
  {
    icon: Send,
    title: 'Aprovação via Telegram',
    description:
      'Comandos de risco disparam uma notificação criptografada no seu celular. Nenhuma ação destrutiva avança sem o seu "Aprovar".',
  },
]

export function DashboardSection() {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!rootRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-gov-reveal]',
        { y: 25, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current!,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <section
      ref={rootRef}
      className="relative bg-[#050505] border-t border-white/[0.06] py-24 sm:py-32 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-amber-500/[0.015] blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-6">
        {/* Header - Centered and Spacious */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p
            data-gov-reveal
            className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500"
          >
            Governança Remota
          </p>

          <h2
            data-gov-reveal
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight"
          >
            Nenhuma ação sensível executa sem a sua assinatura.
          </h2>

          <p
            data-gov-reveal
            className="text-sm sm:text-base leading-relaxed text-neutral-400 max-w-xl mx-auto font-light"
          >
            O Zavorth opera sob o princípio de zero-trust local. O agente pausa, classifica o risco e solicita sua aprovação criptográfica em tempo real via Telegram antes de qualquer ação sensível.
          </p>
        </div>

        {/* Minimal Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {layers.map((layer) => (
            <div
              key={layer.title}
              onMouseMove={handleMouseMove}
              data-gov-reveal
              className="spotlight-card spotlight-border relative rounded-2xl border border-white/[0.04] bg-[#07070a]/20 backdrop-blur-md p-6 flex flex-col justify-between overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.01)] transition-all duration-300 hover:border-white/[0.08]"
            >
              <div className="space-y-4">
                <div className="p-2 h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                  <layer.icon className="h-4.5 w-4.5" strokeWidth={1.5} />
                </div>
                <h3 className="text-sm font-semibold text-white tracking-tight">
                  {layer.title}
                </h3>
                <p className="text-xs leading-relaxed text-neutral-400 font-light">
                  {layer.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
