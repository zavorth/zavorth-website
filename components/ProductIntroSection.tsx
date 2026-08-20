'use client'

import React, { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Sparkles, Terminal, FileCode2, Check, FolderGit2, Play, Cpu, ShieldCheck } from 'lucide-react'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ProductIntroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeTab, setActiveTab] = useState(0)

  const demos = [
    {
      id: 'app',
      title: 'Construir Aplicação',
      tag: 'CÓDIGO & BUILD',
      command: 'zavorth "Crie uma dashboard Next.js com autenticação e testes"',
      files: ['app/page.tsx', 'components/Dashboard.tsx', 'tests/auth.test.ts'],
      codeSnippet: `// Auto-gerado pelo Zavorth com tipagem estrita
export async function generateReport(data: MetricStream): Promise<ValidationReceipt> {
  const receipt = await auditPipeline.verify(data);
  return { status: 'passed', timestamp: Date.now(), receipt };
}`,
      output: '✓ 3 arquivos criados · 0 erros TypeScript · Testes passaram',
    },
    {
      id: 'organize',
      title: 'Organizar Workspace',
      tag: 'SISTEMA DE ARQUIVOS',
      command: 'zavorth "Classifique todos os arquivos soltos em pastas por projeto"',
      files: ['Projetos/Zavorth/', 'Docs/Financas/', 'Backups/2026/'],
      codeSnippet: `// Mapeamento e estruturação atômica em disco
[FS.Scan] 184 arquivos não-indexados encontrados
[FS.Classify] 12 pastas estruturadas sem sobrescrita
[FS.Receipt] Rollback snapshot gravado em .gemini/snapshots/`,
      output: '✓ 184 arquivos organizados · Zero perda de dados',
    },
    {
      id: 'automate',
      title: 'Automatizar Pipeline',
      tag: 'ROTINAS & BACKGROUND',
      command: 'zavorth "Monitore o repositório e execute auditorias a cada commit"',
      files: ['scripts/audit-watcher.mjs', '.github/workflows/ci.yml'],
      codeSnippet: `// Daemon residente em segundo plano
daemon.on('git:commit', async (commit) => {
  const result = await runIntegrityAudit(commit.hash);
  if (!result.ok) await alertChannel.notify(result.errors);
});`,
      output: '✓ Watcher ativo em segundo plano · Notificações configuradas',
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gsap-intro-headline',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        }
      )

      gsap.fromTo(
        '.gsap-intro-box',
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 65%',
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const currentDemo = demos[activeTab]

  return (
    <section
      id="overview"
      ref={sectionRef}
      data-product-intro
      className="landing-surface relative overflow-hidden py-32 sm:py-48 bg-black text-white scroll-mt-20 border-t border-white/[0.04]"
    >
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#00e88f]/[0.025] rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#00e88f]" />
            <span className="section-kicker text-xs font-mono tracking-widest text-[#00e88f] uppercase">
              O Que É o Zavorth
            </span>
          </div>

          <h2 className="gsap-intro-headline text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight leading-[1.1] text-white">
            Não é um chatbot.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-[#00e88f]">
              É um engenheiro no seu computador.
            </span>
          </h2>

          <p className="mt-6 text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Enquanto IAs convencionais ficam presas no navegador gerando texto que você precisa copiar, o Zavorth manipula seus arquivos, executa comandos reais e entrega projetos completos no seu sistema operacional.
          </p>
        </div>

        {/* Interactive IDE / OS Simulator Cockpit */}
        <div className="gsap-intro-box rounded-3xl border border-white/[0.08] bg-[#09090b]/90 backdrop-blur-2xl shadow-[0_30px_100px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Top Bar with Scenarios Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-b border-white/[0.06] bg-white/[0.01]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]/80" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/80" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]/80" />
              <span className="ml-3 text-xs font-mono text-neutral-400 hidden sm:inline">
                zavorth-workspace &mdash; local environment
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {demos.map((d, i) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer shrink-0 ${
                    activeTab === i
                      ? 'bg-[#00e88f]/10 text-[#00e88f] border border-[#00e88f]/30 shadow-[0_0_15px_rgba(0,232,143,0.15)]'
                      : 'text-neutral-400 hover:text-white bg-white/[0.02] border border-white/[0.04]'
                  }`}
                >
                  {d.title}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Workspace Split (File Tree + Code + Terminal Output) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[340px]">
            
            {/* Left: Files Touched in Workspace */}
            <div className="lg:col-span-4 p-6 border-b lg:border-b-0 lg:border-r border-white/[0.06] bg-black/40 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-4">
                  Arquivos no seu Disco
                </span>
                
                <div className="space-y-2.5">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentDemo.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-2"
                    >
                      {currentDemo.files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs font-mono text-neutral-300"
                        >
                          <FileCode2 className="w-3.5 h-3.5 text-[#00e88f]" />
                          <span className="truncate">{file}</span>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.04] text-[11px] font-mono text-neutral-500 flex items-center justify-between">
                <span>LOCAL FILESYSTEM</span>
                <span className="text-[#00e88f]">GRAVAÇÃO ATÔMICA</span>
              </div>
            </div>

            {/* Right: Code Stream & Terminal Result */}
            <div className="lg:col-span-8 p-6 flex flex-col justify-between bg-black/20">
              <div>
                {/* Simulated Terminal Command */}
                <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-black/60 border border-white/[0.06] font-mono text-xs text-neutral-300 mb-4 overflow-x-auto">
                  <span className="text-[#00e88f] font-bold select-none">&gt;</span>
                  <span className="truncate">{currentDemo.command}</span>
                </div>

                {/* Syntax Code Editor */}
                <div className="p-4 rounded-xl bg-black/60 border border-white/[0.04] font-mono text-xs text-neutral-300 leading-relaxed overflow-x-auto">
                  <pre className="text-neutral-300">
                    <code>{currentDemo.codeSnippet}</code>
                  </pre>
                </div>
              </div>

              {/* Bottom Result Status */}
              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2 text-[#00e88f]">
                  <Check className="w-4 h-4" />
                  <span>{currentDemo.output}</span>
                </div>
                <span className="text-[10px] text-neutral-500">100% VERIFICADO</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
