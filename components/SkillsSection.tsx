'use client'

import React, { useLayoutEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ensureGsapPlugins } from './motion'
import { FolderOpen, FileText, PenLine, Plug, RefreshCw, ListChecks, Search, Clock, Bell, ShieldCheck, ChevronRight, Terminal, ShieldAlert, KeyRound } from 'lucide-react'

interface SkillDetail {
  name: string
  description: string
  status: 'ready' | 'config' | 'approval'
  icon: React.ReactNode
  category: 'files' | 'data' | 'auto' | 'security'
  permissions: {
    resource: string
    policy: 'allow' | 'gate' | 'block'
  }[]
  tools: string[]
}

const SKILL_DIRECTORY: SkillDetail[] = [
  {
    name: 'Organizar arquivos',
    description: 'Mova, renomeie, estruture pastas e gerencie mídias no disco local de forma automatizada.',
    status: 'ready',
    icon: <FolderOpen className="h-4.5 w-4.5" />,
    category: 'files',
    permissions: [
      { resource: 'fs.read', policy: 'allow' },
      { resource: 'fs.write', policy: 'gate' },
      { resource: 'fs.delete', policy: 'block' }
    ],
    tools: ['fs.mkdir', 'fs.move_file', 'fs.rename']
  },
  {
    name: 'Revisar projetos',
    description: 'Analise repositórios, estruturas de pastas e códigos fonte em busca de erros ou refatorações.',
    status: 'ready',
    icon: <Search className="h-4.5 w-4.5" />,
    category: 'files',
    permissions: [
      { resource: 'fs.read', policy: 'allow' },
      { resource: 'fs.write', policy: 'block' }
    ],
    tools: ['fs.scan_dir', 'fs.read_file']
  },
  {
    name: 'Ler e resumir informações',
    description: 'Extraia o essencial de documentos PDFs, planilhas XLS e logs operacionais longos de forma limpa.',
    status: 'ready',
    icon: <FileText className="h-4.5 w-4.5" />,
    category: 'data',
    permissions: [
      { resource: 'fs.read', policy: 'allow' },
      { resource: 'data.export', policy: 'gate' }
    ],
    tools: ['pdf.parse', 'data.summarize']
  },
  {
    name: 'Preparar mensagens',
    description: 'Escreva e formate rascunhos de e-mails, relatórios markdown e textos prontos para aprovação rápida.',
    status: 'ready',
    icon: <PenLine className="h-4.5 w-4.5" />,
    category: 'data',
    permissions: [
      { resource: 'data.write', policy: 'allow' }
    ],
    tools: ['draft.create', 'markdown.render']
  },
  {
    name: 'Conectar apps',
    description: 'Integre ferramentas externas (Slack, Notion, Drive) usando chaves criptográficas locais SecretRef.',
    status: 'config',
    icon: <Plug className="h-4.5 w-4.5" />,
    category: 'auto',
    permissions: [
      { resource: 'net.outbound', policy: 'gate' },
      { resource: 'secrets.decrypt', policy: 'gate' }
    ],
    tools: ['slack.auth', 'drive.auth', 'notion.connect']
  },
  {
    name: 'Criar rotinas',
    description: 'Agende e automatize sequências de tarefas recorrentes baseadas em tempo ou triggers locais.',
    status: 'approval',
    icon: <RefreshCw className="h-4.5 w-4.5" />,
    category: 'auto',
    permissions: [
      { resource: 'cron.register', policy: 'gate' },
      { resource: 'sys.execute', policy: 'block' }
    ],
    tools: ['cron.schedule', 'routine.register']
  },
  {
    name: 'Acompanhar tarefas',
    description: 'Monitore o status de execuções longas e notifique canais externos em caso de falhas ou bloqueios.',
    status: 'ready',
    icon: <ListChecks className="h-4.5 w-4.5" />,
    category: 'auto',
    permissions: [
      { resource: 'sys.status', policy: 'allow' }
    ],
    tools: ['task.monitor', 'task.list']
  },
  {
    name: 'Gerar histórico',
    description: 'Mantenha um registro completo das decisões, recibos e estados de rollback das tarefas locais.',
    status: 'ready',
    icon: <Clock className="h-4.5 w-4.5" />,
    category: 'security',
    permissions: [
      { resource: 'db.write', policy: 'allow' },
      { resource: 'db.read', policy: 'allow' }
    ],
    tools: ['history.log', 'receipt.generate']
  },
  {
    name: 'Enviar notificações',
    description: 'Envie relatórios operacionais diretamente para o Telegram, WhatsApp ou Console Administrativo.',
    status: 'config',
    icon: <Bell className="h-4.5 w-4.5" />,
    category: 'security',
    permissions: [
      { resource: 'net.outbound', policy: 'gate' }
    ],
    tools: ['telegram.notify', 'discord.send']
  },
  {
    name: 'Trabalhar com aprovações',
    description: 'Exija assinatura criptográfica por envelope de aprovação antes de qualquer ação sensível.',
    status: 'approval',
    icon: <ShieldCheck className="h-4.5 w-4.5" />,
    category: 'security',
    permissions: [
      { resource: 'auth.signature', policy: 'gate' },
      { resource: 'bypass.mode', policy: 'block' }
    ],
    tools: ['approval.request', 'envelope.sign']
  }
]

const CATEGORIES = [
  { id: 'all', label: 'Todas as Skills' },
  { id: 'files', label: 'Filesystem' },
  { id: 'data', label: 'Dados & Conteúdo' },
  { id: 'auto', label: 'Automações' },
  { id: 'security', label: 'Segurança' }
]

export function SkillsSection() {
  const rootRef = useRef<HTMLElement>(null)
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail>(SKILL_DIRECTORY[0])

  useLayoutEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-skill-reveal]',
        { y: 25, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: rootRef.current!,
            start: 'top 80%',
            once: true,
          }
        }
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  const filteredSkills = SKILL_DIRECTORY.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory
  )

  const handleSelectSkill = (skill: SkillDetail) => {
    setSelectedSkill(skill)
  }

  return (
    <section id="skills" ref={rootRef} className="relative section-rhythm overflow-hidden py-24 sm:py-32">
      {/* Background ambient glowing overlays */}
      <div className="absolute inset-0 bg-[#060608] -z-20" />
      <div className="absolute left-[5%] top-[10%] -z-10 h-[320px] w-[320px] rounded-full bg-cyan-500/4 blur-[110px]" />
      <div className="absolute right-[10%] bottom-[10%] -z-10 h-[300px] w-[300px] rounded-full bg-amber-500/4 blur-[100px]" />

      <div className="mx-auto max-w-content px-5 sm:px-6 relative z-10">
        
        {/* Header */}
        <div data-skill-reveal className="mb-16 max-w-3xl">
          <p className="eyebrow mb-4">Diretório de Habilidades</p>
          <h2 className="section-title-display mb-6 text-text-primary">
            Escolha o que o agente pode acessar.
            <br />
            <span className="text-text-muted">Manifestos de habilidades transparentes.</span>
          </h2>
          <p className="max-w-xl text-body-lg text-text-muted">
            Cada habilidade instalada no runtime do Zavorth expõe um manifesto claro de ferramentas internas e permissões locais rígidas.
          </p>
        </div>

        {/* Directory Layout Grid */}
        <div data-skill-reveal className="grid gap-6 lg:grid-cols-[1fr_2fr_1.8fr] items-start">
          
          {/* Column 1: Category Selector */}
          <div className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto pb-4 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id)
                  // Auto select first skill of category
                  const first = SKILL_DIRECTORY.find((s) => cat.id === 'all' || s.category === cat.id)
                  if (first) setSelectedSkill(first)
                }}
                className={`whitespace-nowrap rounded-xl px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-wider text-left transition-all duration-300 w-auto lg:w-full border ${
                  activeCategory === cat.id
                    ? 'bg-white/[0.04] border-white/[0.08] text-amber-500 shadow-md'
                    : 'bg-transparent border-transparent text-text-faint hover:text-text-muted hover:bg-white/[0.01]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Column 2: List of active skills in category */}
          <div className="glass-panel p-4 rounded-2xl border border-white/[0.06] bg-[#0c0c0e]/30 flex flex-col gap-1.5 max-h-[380px] overflow-y-auto">
            {filteredSkills.map((skill) => {
              const isSelected = selectedSkill.name === skill.name
              return (
                <button
                  key={skill.name}
                  onClick={() => handleSelectSkill(skill)}
                  className={`flex items-center gap-3.5 p-3.5 rounded-xl border text-left transition-all duration-300 ${
                    isSelected
                      ? 'bg-amber-500/[0.03] border-amber-500/20 shadow-md'
                      : 'bg-transparent border-transparent hover:bg-white/[0.01] hover:border-white/[0.04]'
                  }`}
                >
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center border transition-all duration-300 ${
                    isSelected ? 'bg-amber-500/10 border-amber-500/20 text-amber-500' : 'bg-white/[0.03] border-white/[0.05] text-text-muted'
                  }`}>
                    {skill.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className={`font-semibold text-[13.5px] truncate ${isSelected ? 'text-amber-500' : 'text-text-primary'}`}>
                        {skill.name}
                      </span>
                      <ChevronRight size={12} className={isSelected ? 'text-amber-500' : 'text-text-faint'} />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-text-faint block mt-0.5">
                      {skill.status === 'ready' ? 'Ativo' : skill.status === 'config' ? 'Requer Configuração' : 'Exige Aprovação'}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Column 3: Skill Detail Info & Permission Matrix */}
          <div className="glass-panel p-6 rounded-2xl border border-white/[0.06] bg-[#0c0c0e]/40 backdrop-blur-md shadow-2xl min-h-[380px] flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/[0.05]">
                <div className="h-9 w-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                  {selectedSkill.icon}
                </div>
                <div>
                  <h3 className="font-bold text-[15px] text-text-primary">{selectedSkill.name}</h3>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-text-faint">MANIFESTO DE PRIVACIDADE</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-[13px] text-text-muted leading-relaxed mb-6">
                {selectedSkill.description}
              </p>

              {/* Exposed Tools */}
              <div className="mb-6">
                <span className="font-mono text-[10px] text-text-faint uppercase tracking-wider block mb-2.5">Ferramentas Internas</span>
                <div className="flex flex-wrap gap-1.5 font-mono text-[10.5px]">
                  {selectedSkill.tools.map((t) => (
                    <span key={t} className="rounded-md bg-white/[0.03] border border-white/[0.05] px-2 py-1 text-text-secondary">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Security Policy Matrix */}
              <div>
                <span className="font-mono text-[10px] text-text-faint uppercase tracking-wider block mb-2.5">Matriz de Permissões</span>
                <div className="space-y-2 font-mono text-[11px]">
                  {selectedSkill.permissions.map((p) => {
                    let badge = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    let label = 'ALLOW'

                    if (p.policy === 'gate') {
                      badge = 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                      label = 'GATE'
                    } else if (p.policy === 'block') {
                      badge = 'bg-red-500/10 text-red-400 border-red-500/20'
                      label = 'BLOCK'
                    }

                    return (
                      <div key={p.resource} className="flex items-center justify-between py-1 border-b border-white/[0.02]">
                        <span className="text-text-secondary">{p.resource}</span>
                        <span className={`px-2 py-0.5 rounded border text-[9.5px] font-bold ${badge}`}>
                          {label}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Matrix Status Alert Footer */}
            <div className="mt-8 border-t border-white/[0.05] pt-4 flex items-center gap-2">
              <KeyRound size={12} className="text-text-faint" />
              <span className="font-mono text-[9px] uppercase tracking-wider text-text-faint">
                POLÍTICAS RESOLVIDAS LOCALMENTE
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
