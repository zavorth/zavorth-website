'use client'

import { Terminal, ShieldCheck, FileCheck } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'

interface Step {
  num: string
  title: string
  desc: string
  icon: LucideIcon
}

const steps: Step[] = [
  {
    num: '01',
    title: 'Diga o que precisa',
    desc: 'Escreva comandos em linguagem natural. Zavorth interpreta sua intenção e traduz em ações executáveis dentro do ambiente local.',
    icon: Terminal,
  },
  {
    num: '02',
    title: 'Análise de risco local',
    desc: 'O motor inspeciona a intenção do comando, verifica permissões e isola a execução em um sandbox seguro antes de prosseguir.',
    icon: ShieldCheck,
  },
  {
    num: '03',
    title: 'Recibo criptográfico',
    desc: 'Após a execução segura, um recibo assinado criptograficamente é gerado com hash, timestamp e detalhes completos da operação.',
    icon: FileCheck,
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative bg-[#050505] py-24 sm:py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="mb-16 text-center sm:mb-20">
          <span className="mb-4 inline-block font-mono text-[11px] tracking-[0.25em] text-amber-500 uppercase">
            Fluxo
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Do comando ao recibo em segundos.
          </h2>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Timeline vertical line — desktop: centered, mobile: left */}
          <div className="timeline-line absolute top-0 bottom-0 left-5 w-[2px] md:left-1/2 md:-translate-x-1/2">
            <div className="timeline-glow h-full w-full" />
          </div>

          {/* Steps */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0

              return (
                <div key={step.num} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-5 top-6 z-10 -translate-x-1/2 md:left-1/2 md:top-8 md:-translate-x-1/2">
                    <div className="relative flex h-4 w-4 items-center justify-center">
                      <span className="absolute h-4 w-4 rounded-full bg-amber-500/20" />
                      <span className="relative h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    </div>
                  </div>

                  {/* Card — mobile: always right of line, desktop: alternating */}
                  <div
                    className={`
                      ml-12 md:ml-0 md:w-[calc(50%-2rem)]
                      ${isLeft ? 'md:mr-auto md:pr-0' : 'md:ml-auto md:pl-0'}
                    `}
                  >
                    <div className="group relative overflow-hidden rounded-xl border border-white/[0.06] bg-black/40 p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.1] hover:bg-black/50 sm:p-7">
                      {/* Watermark number */}
                      <span
                        className={`pointer-events-none absolute top-3 font-mono text-6xl font-black leading-none text-white opacity-[0.04] select-none sm:text-7xl ${
                          isLeft ? 'right-5' : 'right-5 md:left-5 md:right-auto'
                        }`}
                      >
                        {step.num}
                      </span>

                      {/* Icon */}
                      <div className="relative mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 ring-1 ring-amber-500/20">
                        <step.icon className="h-5 w-5 text-amber-500" strokeWidth={1.8} />
                      </div>

                      {/* Content */}
                      <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-neutral-400">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeline-glow {
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(245, 158, 11, 0.25) 20%,
            rgba(245, 158, 11, 0.4) 50%,
            rgba(245, 158, 11, 0.25) 80%,
            transparent 100%
          );
          position: relative;
        }

        .timeline-glow::after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 60px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(245, 158, 11, 0.6),
            transparent
          );
          border-radius: 999px;
          filter: blur(3px);
          animation: timelinePulse 3s ease-in-out infinite;
        }

        @keyframes timelinePulse {
          0% {
            top: -10%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  )
}
