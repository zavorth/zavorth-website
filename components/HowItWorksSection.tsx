'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ensureGsapPlugins } from './motion'

const TERMINAL_LINES = [
  { prefix: '❯', text: 'zavorth "Organize meus arquivos por projeto e avise no Telegram"', prefixColor: 'text-[#5AB5CB]', textColor: 'text-white' },
  { prefix: '', text: '', prefixColor: '', textColor: '' },
  { prefix: '⌁', text: 'Parsing natural language...', prefixColor: 'text-white/40', textColor: 'text-white/50' },
  { prefix: '⌁', text: 'Mission structured → scope: filesystem, channel: telegram', prefixColor: 'text-white/40', textColor: 'text-white/50' },
  { prefix: '⌁', text: 'Policy broker → tools: [fs.move, fs.mkdir] ALLOWED', prefixColor: 'text-white/40', textColor: 'text-emerald-400' },
  { prefix: '⌁', text: 'Policy broker → fs.delete BLOCKED (requires approval)', prefixColor: 'text-white/40', textColor: 'text-amber-400' },
  { prefix: '', text: '', prefixColor: '', textColor: '' },
  { prefix: '▸', text: 'Executing mission...', prefixColor: 'text-white/40', textColor: 'text-white/50' },
  { prefix: '  ', text: 'moved 36 files → /Trabalho', prefixColor: '', textColor: 'text-white/40' },
  { prefix: '  ', text: 'telegram.send(summary) → delivered', prefixColor: '', textColor: 'text-white/40' },
  { prefix: '', text: '', prefixColor: '', textColor: '' },
  { prefix: '✓', text: 'Done. Receipt #ZV-2026-0521 generated. Rollback available.', prefixColor: 'text-emerald-400', textColor: 'text-emerald-400' },
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-reveal]',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="bg-[#050505] py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-start">
          {/* Left — Text */}
          <div>
            <h2
              data-reveal
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl leading-[1.1] mb-10"
            >
              Como o Zavorth funciona
            </h2>

            <div className="space-y-6">
              <p data-reveal className="text-lg leading-relaxed text-white/60">
                Você escreve em linguagem natural. O runtime interpreta a
                instrução e estrutura uma missão com escopo de arquivos,
                controle de canais e artefatos de saída — sem templates, sem
                configuração manual.
              </p>

              <p data-reveal className="text-lg leading-relaxed text-white/60">
                Antes de qualquer execução, um policy broker avalia permissões
                em tempo real. Ferramentas, provedores e canais passam pelo
                mesmo árbitro de regras. Ações sensíveis param até você decidir.
              </p>

              <p data-reveal className="text-lg leading-relaxed text-white/60">
                Tudo executa localmente. Cada ação gera um recibo operacional
                auditável com rollback disponível. Nada escala silenciosamente
                sem o seu controle.
              </p>
            </div>
          </div>

          {/* Right — Terminal */}
          <div data-reveal>
            <div className="rounded-lg border border-white/10 bg-[#141414] overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                <span className="ml-3 font-mono text-xs text-white/40">
                  zavorth — terminal
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-[13px] leading-[1.75] min-h-[320px]">
                {TERMINAL_LINES.map((line, i) =>
                  line.text === '' ? (
                    <div key={i} className="h-5" />
                  ) : (
                    <div key={i} className="flex gap-2">
                      {line.prefix && (
                        <span className={`shrink-0 select-none ${line.prefixColor}`}>
                          {line.prefix}
                        </span>
                      )}
                      <span className={line.textColor}>{line.text}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
