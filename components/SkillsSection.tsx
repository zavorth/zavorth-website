'use client'

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ensureGsapPlugins } from './motion'

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

  return (
    <section id="skills" ref={rootRef} className="bg-[#050505] py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-6">

        {/* Header */}
        <div data-skill-reveal className="mb-16 text-center">
          <p className="eyebrow mb-4">Habilidades</p>
          <h2 className="text-[28px] sm:text-[36px] font-bold leading-tight tracking-tight text-text-primary">
            O que o agente pode fazer por você.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {SKILLS.map((skill) => (
            <div
              key={skill.title}
              data-skill-reveal
              className="border-b border-white/[0.04] py-5"
            >
              <p className="text-[15px] font-bold text-text-primary">
                {skill.title}
              </p>
              <p className="mt-1 text-[14px] text-text-muted">
                {skill.description}
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2 font-mono text-[11px] text-text-faint">
                {skill.tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
