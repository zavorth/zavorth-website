'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const steps = [
  {
    num: '01',
    title: 'Você dá o comando',
    description:
      'Linguagem natural, sem sintaxe especial. O classificador neural interpreta sua intenção e decompõe em ações atômicas.',
    example: 'zavorth "organizar downloads e logar"',
  },
  {
    num: '02',
    title: 'O agente avalia o risco',
    description:
      'Cada ação é classificada individualmente. Operações de baixo risco executam automaticamente. Ações destrutivas pausam e aguardam sua aprovação.',
    example: 'fs.move → Baixo risco · telegram.send → Médio risco',
  },
  {
    num: '03',
    title: 'Execução selada',
    description:
      'Após a execução, todas as ações são empacotadas em um recibo criptográfico imutável — um registro auditável salvo localmente no seu disco.',
    example: 'Ledger Hash: ZV-901-X9 · Assinado localmente',
  },
]

export function HowItWorksSection() {
  const rootRef = useRef<HTMLElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!rootRef.current || !lineRef.current) return
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Vertical progress line
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 35%',
            end: 'bottom 65%',
            scrub: true,
          },
        }
      )

      // Item reveals & active glows
      const items = gsap.utils.toArray('.flow-step')
      items.forEach((item: any) => {
        // Entrance animation
        gsap.fromTo(
          item,
          { opacity: 0.3, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 60%',
              scrub: true,
            },
          }
        )

        // Glowing border/shadow and active bullet highlights
        const card = item.querySelector('.step-card')
        const bullet = item.querySelector('.step-bullet')
        const bulletInner = item.querySelector('.step-bullet-inner')

        if (card && bullet) {
          // Glow card
          gsap.fromTo(
            card,
            { borderColor: 'rgba(255, 255, 255, 0.04)', backgroundColor: 'rgba(255, 255, 255, 0.01)', boxShadow: '0 0 0px rgba(0,0,0,0)' },
            {
              borderColor: 'rgba(245, 158, 11, 0.25)',
              backgroundColor: 'rgba(245, 158, 11, 0.02)',
              boxShadow: '0 10px 30px rgba(245, 158, 11, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
              scrollTrigger: {
                trigger: item,
                start: 'top 60%',
                end: 'bottom 45%',
                scrub: true,
              }
            }
          )

          // Highlight bullet
          gsap.fromTo(
            bullet,
            { borderColor: 'rgba(255, 255, 255, 0.08)', scale: 1 },
            {
              borderColor: 'rgba(245, 158, 11, 0.6)',
              scale: 1.15,
              scrollTrigger: {
                trigger: item,
                start: 'top 60%',
                end: 'bottom 45%',
                scrub: true,
              }
            }
          )

          if (bulletInner) {
            gsap.fromTo(
              bulletInner,
              { backgroundColor: '#4b5563', scale: 1 },
              {
                backgroundColor: '#f59e0b',
                scale: 1.25,
                scrollTrigger: {
                  trigger: item,
                  start: 'top 60%',
                  end: 'bottom 45%',
                  scrub: true,
                }
              }
            )
          }
        }
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      id="how-it-works"
      className="relative bg-[#050505] border-t border-white/[0.06] py-24 sm:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-28 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-500">
            Fluxo de Execução
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white">
            Do comando ao recibo,
            <br className="hidden sm:block" /> em milissegundos.
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed">
            Três etapas. Classificação neural, governança de risco e auditoria
            criptográfica — tudo automático, tudo local.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-3 bottom-3 w-[2px] bg-white/[0.03] origin-top pointer-events-none rounded-full">
            <div
              ref={lineRef}
              className="w-full h-full bg-gradient-to-b from-amber-500 via-fuchsia-500 to-cyan-500 origin-top scale-y-0 rounded-full"
              style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.4))' }}
            />
          </div>

          <div className="space-y-12">
            {steps.map((step) => (
              <div key={step.num} className="flow-step relative pl-16">
                {/* Bullet */}
                <div className="step-bullet absolute left-6 top-6 -translate-x-1/2 w-4.5 h-4.5 rounded-full bg-[#050505] border border-white/[0.08] flex items-center justify-center z-10 transition-all duration-300 shadow-md">
                  <div className="step-bullet-inner w-1.5 h-1.5 rounded-full bg-neutral-600 transition-colors duration-300" />
                </div>

                {/* Glassmorphic Step Bento Card */}
                <div className="step-card rounded-2xl border border-white/[0.04] bg-[#0c0c0e]/30 p-6 sm:p-8 transition-all duration-500 shadow-[inset_0_1px_1px_rgba(255,255,255,0.02)]">
                  <div className="space-y-3">
                    <span className="font-mono text-xs text-amber-500 font-semibold tracking-wider">
                      {step.num}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                    
                    {/* Simulated Command Box */}
                    <div className="mt-5 rounded-xl border border-white/[0.05] bg-black/40 px-4 py-3 font-mono text-[12px] text-neutral-400 flex items-center justify-between shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)]">
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-neutral-600 select-none">$</span>
                        <span className="text-neutral-300 font-light truncate">{step.example}</span>
                      </div>
                      <span className="text-[9px] text-neutral-600 uppercase tracking-widest hidden sm:inline select-none">
                        Output
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
