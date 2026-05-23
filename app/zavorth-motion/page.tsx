'use client'

import React from 'react'
import { ArrowLeft, Terminal, Cpu, Zap, Activity } from 'lucide-react'
import { BrandMark } from '../../components/BrandMark'
import { Footer } from '../../components/Footer'
import { ZavorthPlayground } from '../../components/ZavorthPlayground'

export default function ZavorthMotionPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-neutral-100 selection:bg-cyan-500/30 overflow-hidden relative">
      {/* Dynamic background lighting */}
      <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Header */}
      <header className="border-b border-white/[0.06] bg-[#050505]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="/" className="inline-flex items-center gap-2.5" aria-label="Voltar para a home">
            <BrandMark className="h-7 w-7" />
            <span className="text-[16px] font-semibold tracking-tight text-white">
              Zavorth Core
            </span>
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-1.5 text-[12px] font-medium text-neutral-400 transition-colors hover:text-white hover:bg-white/[0.06]"
          >
            <ArrowLeft size={14} />
            Home
          </a>
        </div>
      </header>

      {/* Hero section inside the dedicated route */}
      <section className="relative pt-12 pb-4">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20 text-xs font-semibold text-cyan-400 font-mono tracking-wider uppercase mb-4">
            <Activity size={12} className="animate-pulse" /> Playground Interativo
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            Experiência de Escrita Líquida
          </h1>
          <p className="max-w-2xl mx-auto text-zinc-400 text-sm sm:text-base leading-relaxed">
            Interaja diretamente com o núcleo de animações do Zavorth. Customize o texto e observe
            a resposta do cursor elástico neon com micro-vibrações sob demanda.
          </p>
        </div>
      </section>

      {/* Main interactive playground component */}
      <section className="py-2">
        <ZavorthPlayground />
      </section>

      {/* Technical features breakdown section */}
      <section className="py-12 max-w-5xl mx-auto px-6">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-zinc-950/40 border border-white/[0.06] rounded-xl p-5 backdrop-blur-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-950/30 text-cyan-400 mb-4">
              <Cpu size={20} />
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">Micro-stagger Humano</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              O ritmo de digitação não é linear. O Zavorth insere atrasos variáveis baseados em pontuação,
              espaços e variação humana randômica (90% a 110%) para emular digitação orgânica.
            </p>
          </div>

          <div className="bg-zinc-950/40 border border-white/[0.06] rounded-xl p-5 backdrop-blur-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-violet-500/20 bg-violet-950/30 text-violet-400 mb-4">
              <Zap size={20} />
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">Feedback de Keystroke</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              A cada caractere inserido no display, o cursor `.glowing-cursor-bar` recebe um bloom de sombra neon
              e expande 1.15x, simulando a energia de uma tecla física sendo pressionada.
            </p>
          </div>

          <div className="bg-zinc-950/40 border border-white/[0.06] rounded-xl p-5 backdrop-blur-md">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-fuchsia-500/20 bg-fuchsia-950/30 text-fuchsia-400 mb-4">
              <Terminal size={20} />
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">Cursor Vetorial Dinâmico</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Sem arquivos estáticos de imagem. O cursor é renderizado puramente via CSS com gradiente vetorial
              linear que se adapta de forma fluida à altura da fonte e baseline de texto.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
