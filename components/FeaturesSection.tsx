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
        <div className="mb-16 max-w-2xl">
          <span className="section-kicker">Arquitetura</span>
          <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-5xl">
            Arquitetura técnica <br />
            <span className="text-emerald-400">isolada e auditável.</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-neutral-400 sm:text-lg">
            O Zavorth não expõe seus arquivos ou credenciais. Toda execução de ferramentas ocorre sob controle restrito e sandbox local.
          </p>
        </div>

        {/* Blueprint Técnico em SVG */}
        <div className="relative w-full border border-white/5 bg-neutral-950/60 rounded-3xl p-6 sm:p-10 backdrop-blur-md overflow-x-auto">
          {/* Cabeçalho da blueprint técnica */}
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-8 font-mono text-[9px] text-neutral-500 uppercase tracking-widest">
            <span>blueprint: local_isolation_architecture_v1.0</span>
            <span className="text-emerald-400 animate-pulse">● active policy</span>
          </div>

          <div className="min-w-[640px] aspect-[16/9] w-full flex items-center justify-center">
            <svg
              viewBox="0 0 800 450"
              className="w-full h-full text-neutral-700 stroke-current fill-none"
              strokeWidth="1.2"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Definições de estilos e marcadores */}
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" stroke="none" />
                </marker>
                <marker id="arrow-emerald" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#00e88f" stroke="none" />
                </marker>
              </defs>

              {/* AREA PRINCIPAL: MAQUINA DO OPERADOR */}
              <rect x="20" y="20" width="760" height="410" rx="16" strokeDasharray="3 3" />
              <text x="35" y="45" fill="currentColor" className="font-mono text-[9px] uppercase tracking-wider font-semibold">
                [ Host OS: Operator Machine ]
              </text>

              {/* AREA 1: ZAVORTH CORE DAEMON */}
              <rect x="60" y="70" width="310" height="320" rx="12" stroke="currentColor" strokeOpacity="0.4" />
              <text x="75" y="95" fill="currentColor" className="font-mono text-[9px] uppercase tracking-wider">
                Zavorth Daemon (Control Plane)
              </text>

              {/* Sub-blocos do Daemon */}
              {/* Intent Parser */}
              <rect x="80" y="120" width="120" height="60" rx="6" />
              <text x="95" y="145" fill="currentColor" className="font-mono text-[9px]">01. Intent Parser</text>
              
              {/* Planner */}
              <rect x="230" y="120" width="120" height="60" rx="6" />
              <text x="245" y="145" fill="currentColor" className="font-mono text-[9px]">02. Planner Engine</text>

              {/* Local Storage (Memory + Rules) */}
              <rect x="80" y="270" width="270" height="90" rx="8" stroke="#00e88f" strokeOpacity="0.5" />
              <text x="95" y="295" fill="#00e88f" className="font-mono text-[9px] font-semibold">Local Storage & Memory Engine</text>
              <text x="95" y="315" fill="currentColor" className="font-mono text-[8px] opacity-70">SQLite Database · Markdown Contexts</text>
              <text x="95" y="335" fill="currentColor" className="font-mono text-[8px] opacity-70">Rules & Guardrails Policies</text>

              {/* AREA 2: SECURE SANDBOX CONTAINER */}
              <rect x="470" y="70" width="270" height="320" rx="12" stroke="#00e88f" strokeOpacity="0.8" />
              <text x="485" y="95" fill="#00e88f" className="font-mono text-[9px] uppercase tracking-wider font-semibold">
                Isolated Execution Sandbox
              </text>

              {/* Sub-blocos do Sandbox */}
              {/* File System Wrapper */}
              <rect x="490" y="120" width="230" height="50" rx="6" />
              <text x="505" y="150" fill="currentColor" className="font-mono text-[9px]">Local Files (Read/Write)</text>
              
              {/* Terminal Command PTY */}
              <rect x="490" y="190" width="230" height="50" rx="6" />
              <text x="505" y="220" fill="currentColor" className="font-mono text-[9px]">PTY shell execution</text>

              {/* Secure API Gateway */}
              <rect x="490" y="260" width="230" height="50" rx="6" />
              <text x="505" y="290" fill="currentColor" className="font-mono text-[9px]">Gated API Integrations</text>

              {/* GATE DE CONTROLE (BARREIRA INTERMEDIÁRIA) */}
              <g transform="translate(420, 230)">
                <line x1="0" y1="-120" x2="0" y2="120" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5 5" className="animate-[pulse_2s_infinite]" />
                <circle r="16" fill="#030303" stroke="#F59E0B" strokeWidth="2" />
                {/* Ícone de escudo/chave no gate */}
                <path d="M -4,-4 L 4,-4 L 4,4 L -4,4 Z" stroke="#F59E0B" strokeWidth="1" fill="none" />
                <text x="10" y="-12" fill="#F59E0B" className="font-mono text-[8px] uppercase tracking-widest font-semibold">
                  OPERATOR_GATE
                </text>
              </g>

              {/* FLUXOS E DIRECIONAMENTO (SETAS) */}
              {/* Input de linguagem natural */}
              <line x1="140" y1="20" x2="140" y2="120" stroke="currentColor" markerEnd="url(#arrow)" />
              <text x="148" y="45" fill="currentColor" className="font-mono text-[8px] opacity-75">USER_INTENT</text>

              {/* Envio do Parser para o Planner */}
              <line x1="200" y1="150" x2="230" y2="150" stroke="currentColor" markerEnd="url(#arrow)" />

              {/* Conexão com o Banco de dados local */}
              <line x1="215" y1="180" x2="215" y2="270" stroke="currentColor" markerEnd="url(#arrow)" />

              {/* Do Planner para o Gate */}
              <path d="M 350,150 L 390,150 L 390,210 L 415,210" stroke="#F59E0B" markerEnd="url(#arrow)" />
              <text x="360" y="140" fill="#F59E0B" className="font-mono text-[8px]">plan.md (Risco)</text>

              {/* Do Gate para o Sandbox (Só passa quando aprovado) */}
              <line x1="425" y1="230" x2="470" y2="230" stroke="#00e88f" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />
              <text x="430" y="220" fill="#00e88f" className="font-mono text-[8px] font-semibold">APPROVED</text>

              {/* Prova de execução gerando logs locais */}
              <path d="M 605,320 L 605,390 L 350,390 L 350,360" stroke="#00e88f" strokeWidth="1.2" strokeDasharray="3 3" markerEnd="url(#arrow-emerald)" />
              <text x="420" y="380" fill="#00e88f" className="font-mono text-[8px]">PROOFS & HASHES</text>

              {/* Conexão externa filtrada */}
              <path d="M 720,285 L 780,285" stroke="currentColor" strokeDasharray="3 3" markerEnd="url(#arrow)" />
              <text x="730" y="275" fill="currentColor" className="font-mono text-[7px] opacity-70">EXTERNAL_API</text>
            </svg>
          </div>

          {/* Anotação técnica explicativa */}
          <div className="mt-6 border-t border-white/5 pt-4 text-xs text-neutral-500 leading-relaxed max-w-2xl font-mono">
            * O runtime do Zavorth impede vazamento de dados assegurando que o processamento principal (Daemon) e os bancos de dados residam localmente. O isolamento em sandbox impede alterações no Host sem consentimento prévio do operador.
          </div>
        </div>
      </div>
    </section>
  )
}
