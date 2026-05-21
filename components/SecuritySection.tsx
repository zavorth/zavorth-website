'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ensureGsapPlugins } from './motion'
import { KeyRound, EyeOff, FileCheck2 } from 'lucide-react'

const features = [
  {
    icon: KeyRound,
    title: 'Isolamento SecretRef',
    description:
      'Chaves de API e tokens resolvem apenas em runtime local — nunca são expostos ao LLM.',
  },
  {
    icon: EyeOff,
    title: 'Execução local',
    description:
      'Zero telemetria, zero cloud. Seus dados e logs permanecem no seu disco.',
  },
  {
    icon: FileCheck2,
    title: 'Recibos criptográficos',
    description:
      'Cada ação gera um recibo assinado e verificável para auditoria completa.',
  },
]

export function SecuritySection() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-sec-reveal]',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
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

  return (
    <section
      id="security"
      ref={rootRef}
      className="relative bg-[#050505] border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl px-6">
        {/* Eyebrow */}
        <p
          data-sec-reveal
          className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500 mb-5"
        >
          Segurança &amp; Privacidade
        </p>

        {/* Heading */}
        <h2
          data-sec-reveal
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] mb-8"
        >
          Suas credenciais nunca saem
          <br className="hidden sm:block" /> da sua máquina.
        </h2>

        {/* Body text */}
        <div data-sec-reveal className="space-y-5 mb-16">
          <p className="text-base sm:text-lg leading-relaxed text-neutral-400">
            O Zavorth opera com isolamento total de credenciais através do
            sistema SecretRef. Suas chaves de API, tokens e senhas nunca são
            injetados nos prompts enviados ao LLM — eles são resolvidos
            exclusivamente em runtime local, sem jamais trafegar pela rede.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-neutral-400">
            Não existe telemetria em nuvem. Nenhum dado operacional, log de
            execução ou histórico de comandos é transmitido a servidores
            externos. Tudo permanece no seu disco, sob seu controle absoluto.
          </p>
          <p className="text-base sm:text-lg leading-relaxed text-neutral-400">
            Cada ação executada pelo agente gera um recibo criptográfico
            assinado — um registro verificável e imutável que permite auditoria
            completa de tudo o que foi feito, quando e com quais permissões.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10">
          {features.map((f) => (
            <div
              key={f.title}
              data-sec-reveal
              className="border-t border-white/[0.08] pt-5"
            >
              <f.icon className="h-5 w-5 text-amber-500 mb-3" strokeWidth={1.5} />
              <h3 className="text-sm font-semibold text-white mb-1">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-500">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
