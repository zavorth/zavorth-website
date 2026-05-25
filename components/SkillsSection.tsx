'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SKILLS = [
  {
    num: '01',
    title: 'Broker de Segurança',
    desc: 'O núcleo de governança do Zavorth. Analisa cada comando de terminal e chamada de sistema antes da execução contra suas políticas locais customizadas.'
  },
  {
    num: '02',
    title: 'Memória Local (Mnemos)',
    desc: 'Um sistema de embeddings local para indexar e compreender PDFs, código-fonte, planilhas e imagens sem enviar dados para a nuvem.'
  },
  {
    num: '03',
    title: 'Swarm v2 (Multi-Agentes)',
    desc: 'Orquestração paralela de múltiplos subagentes especialistas com restrição rígida de orçamento e escopo operacional isolado.'
  },
  {
    num: '04',
    title: 'Catálogo de Provedores',
    desc: 'Central de roteamento inteligente de LLMs que gerencia chaves locally e aplica rotas de fallback se algum provedor falhar.'
  }
]

export function SkillsSection() {
  const containerRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !lineRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Draw progress line height based on scroll
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 30%',
            end: 'bottom 70%',
            scrub: true,
          }
        }
      )

      // Animate text reveal
      const items = gsap.utils.toArray('.skill-item')
      items.forEach((item: any) => {
        gsap.fromTo(item,
          { opacity: 0.2, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
            }
          }
        )
      })

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={containerRef} 
      className="relative bg-surface-deep text-text-primary py-32 border-b border-white/5 overflow-hidden"
    >
      <div className="mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-32 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">Recursos Nativos</span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-none text-text-primary">
            Arquitetura robusta de agentes
          </h2>
          <p className="text-lg text-text-muted font-light leading-relaxed">
            Eliminamos os setups genéricos para oferecer uma estrutura confiável de execução local.
          </p>
        </div>

        {/* Linear Timeline (Spacious and Clean) */}
        <div className="relative">
          {/* Vertical Progress Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 origin-top pointer-events-none">
            <div 
              ref={lineRef}
              className="w-full h-full bg-accent origin-top scale-y-0"
              style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))' }}
            />
          </div>

          <div className="space-y-24">
            {SKILLS.map((skill, index) => {
              const isEven = index % 2 === 0
              return (
                <div 
                  key={index} 
                  className={`skill-item relative flex flex-col sm:flex-row items-start sm:items-center ${isEven ? 'sm:flex-row-reverse' : ''}`}
                >
                  {/* Bullet */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-[7px] w-3 h-3 rounded-full bg-surface-deep border border-accent flex items-center justify-center z-10">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  </div>

                  {/* Empty Spacer side */}
                  <div className="w-full sm:w-1/2" />

                  {/* Content side */}
                  <div className={`w-full sm:w-1/2 pl-12 sm:pl-0 ${isEven ? 'sm:pr-16' : 'sm:pl-16'} space-y-3`}>
                    <div className="font-mono text-xs text-accent font-semibold">
                      {skill.num} // NATIVE CAPABILITY
                    </div>
                    <h3 className="text-2xl font-bold text-white leading-tight">
                      {skill.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed font-light">
                      {skill.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
