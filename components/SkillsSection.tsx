'use client'

import { useLayoutEffect, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ensureGsapPlugins, initSpotlight, initTilt3D } from './motion'

interface Skill {
  title: string
  description: string
  tools: string[]
}

const SKILLS: Skill[] = [
  {
    title: 'Organizar arquivos',
    description: 'Mova, renomeie e estruture pastas automaticamente.',
    tools: ['fs.mkdir', 'fs.move', 'fs.rename'],
  },
  {
    title: 'Ler e resumir',
    description: 'Extraia o essencial de documentos e logs longos.',
    tools: ['pdf.parse', 'data.summarize'],
  },
  {
    title: 'Preparar mensagens',
    description: 'Rascunhe e-mails e relatórios prontos para envio.',
    tools: ['draft.create', 'markdown.render'],
  },
  {
    title: 'Conectar apps',
    description: 'Integre ferramentas externas com chaves locais.',
    tools: ['slack.auth', 'drive.auth', 'notion.connect'],
  },
  {
    title: 'Criar rotinas',
    description: 'Agende tarefas recorrentes baseadas em tempo.',
    tools: ['cron.schedule', 'routine.register'],
  },
  {
    title: 'Revisar projetos',
    description: 'Analise repositórios e código em busca de erros.',
    tools: ['fs.scan_dir', 'fs.read_file'],
  },
  {
    title: 'Gerar histórico',
    description: 'Registre decisões e estados de rollback.',
    tools: ['history.log', 'receipt.generate'],
  },
  {
    title: 'Enviar notificações',
    description: 'Envie relatórios para Telegram ou Discord.',
    tools: ['telegram.notify', 'discord.send'],
  },
]

export function SkillsSection() {
  const rootRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-skill-reveal]',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
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

  useEffect(() => {
    const cards = document.querySelectorAll('.skill-card')
    const cleanups: (() => void)[] = []
    
    cards.forEach((card) => {
      cleanups.push(initSpotlight(card as HTMLElement))
      cleanups.push(initTilt3D(card as HTMLElement, 3))
    })

    return () => {
      cleanups.forEach(cleanup => cleanup())
    }
  }, [])

  return (
    <section id="skills" ref={rootRef} className="bg-[#050505] py-24 sm:py-32 perspective-1000">
      <div className="mx-auto max-w-4xl px-5 sm:px-6">

        {/* Header */}
        <div data-skill-reveal className="mb-16 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber-500 mb-5">Habilidades</p>
          <h2 className="text-[28px] sm:text-[36px] font-bold leading-tight tracking-tight text-white">
            O que o agente pode fazer por você.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILLS.map((skill) => (
            <div
              key={skill.title}
              data-skill-reveal
              className="skill-card group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition-colors hover:bg-white/[0.04] transform-style-3d"
            >
              {/* Spotlight Glow */}
              <div 
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-2xl"
                style={{
                  background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(251, 191, 36, 0.1), transparent 40%)'
                }}
              />
              
              <div className="relative z-10">
                <p className="text-[16px] font-bold text-white">
                  {skill.title}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-white/50">
                  {skill.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 font-mono text-[11px] text-white/30">
                  {skill.tools.map((t) => (
                    <span key={t} className="rounded-md bg-white/[0.05] px-2 py-1">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
