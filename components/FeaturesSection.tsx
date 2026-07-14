'use client'

import React from 'react'

export function FeaturesSection() {
  return (
    <section
      id="trust"
      data-proof-section
      className="landing-surface relative scroll-mt-20 border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_40%_0%,rgba(0,232,143,0.04),transparent_48%)]" />

      <div className="relative z-10 mx-auto max-w-5xl px-6">
        {/* Cabeçalho */}
        <div className="mb-20 max-w-2xl">
          <span className="section-kicker">Arquitetura</span>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Arquitetura técnica <br />
            <span className="text-emerald-400">isolada e auditável.</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-400 sm:text-lg">
            O Zavorth não expõe seus arquivos ou credenciais. Toda execução de ferramentas ocorre sob controle restrito e sandbox local.
          </p>
        </div>

        {/* Ficha Técnica de Segurança (Grid de 3 Colunas Limpas) */}
        <div className="grid gap-12 border-t border-white/5 pt-12 md:grid-cols-3 md:gap-8">
          
          {/* Coluna 1: Sandbox */}
          <div className="flex flex-col">
            <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
              [ SANDBOX_ISOLATION ]
            </span>
            <h3 className="mt-4 text-lg font-medium text-white tracking-tight">
              Isolamento de Processo
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500">
              Toda manipulação de arquivos e chamadas PTY do terminal executam sob políticas restritas. A escrita e a execução de binários são bloqueadas até que o gate de aprovação receba o seu consentimento explícito.
            </p>
            <div className="mt-auto pt-6 font-mono text-[9px] text-neutral-600">
              STATUS: ENFORCED · RAM_ONLY
            </div>
          </div>

          {/* Coluna 2: Local Database */}
          <div className="flex flex-col border-t border-white/5 pt-8 md:border-t-0 md:pt-0 md:border-l md:border-white/5 md:pl-8">
            <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
              [ LOCAL_DATABASE ]
            </span>
            <h3 className="mt-4 text-lg font-medium text-white tracking-tight">
              Armazenamento Seguro
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500">
              O banco de dados SQLite de sessões, a memória semântica e os arquivos temporários são salvos diretamente no disco do operador. Credenciais e chaves de API não passam por servidores externos nem ficam salvas em nuvem.
            </p>
            <div className="mt-auto pt-6 font-mono text-[9px] text-neutral-600">
              STORAGE: SQLITE3 · AES_256
            </div>
          </div>

          {/* Coluna 3: Cryptographic Proofs */}
          <div className="flex flex-col border-t border-white/5 pt-8 md:border-t-0 md:pt-0 md:border-l md:border-white/5 md:pl-8">
            <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase tracking-widest">
              [ CRYPTO_AUDIT ]
            </span>
            <h3 className="mt-4 text-lg font-medium text-white tracking-tight">
              Prova de Integridade
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-neutral-500">
              Cada transação executada com sucesso pelo runtime é gravada em um diário criptográfico local. É gerado um hash inalterável (SHA-256) das modificações, permitindo auditorias, validação e restauração rápida de estado.
            </p>
            <div className="mt-auto pt-6 font-mono text-[9px] text-neutral-600">
              HASHING: SHA-256 · SIGNED
            </div>
          </div>

        </div>

        {/* Nota técnica de rodapé */}
        <div className="mt-16 border-t border-white/5 pt-6 text-xs text-neutral-500 leading-relaxed font-mono text-center">
          * Zavorth Local Runtime Security Model v1.0 — Proteção absoluta do Host OS contra mutações não autorizadas.
        </div>
      </div>
    </section>
  )
}
