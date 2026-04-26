'use client'

import React, { useState, useEffect } from 'react'
import { Copy, Check } from 'lucide-react'

type Tab = 'install' | 'status' | 'skills'

export function TerminalCard() {
  const [activeTab, setActiveTab] = useState<Tab>('install')
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    const text = activeTab === 'install' ? 'npx basilisk@latest' : 'basilisk status'
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div id="terminal-preview" className="terminal-card group relative mx-auto w-full max-w-[780px] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#080e12]/70 backdrop-blur-2xl transition-all duration-500 hover:border-white/[0.12] hover:shadow-[0_30px_80px_-20px_rgba(16,185,129,0.25)]">
      {/* Rotating Border Effect */}
      <div className="pointer-events-none absolute inset-[-1px] rounded-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100" 
           style={{
             padding: '1px',
             background: 'conic-gradient(from var(--angle, 0deg), transparent 0deg, #10b981 30deg, transparent 80deg, transparent 360deg)',
             WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
             WebkitMaskComposite: 'xor',
             maskComposite: 'exclude',
             animation: 'rotateBorder 4s linear infinite'
           }} 
      />
      
      <style jsx>{`
        @keyframes rotateBorder {
          to { --angle: 360deg; }
        }
      `}</style>

      {/* Terminal Top Bar */}
      <div className="flex items-center gap-4 bg-[#030508]/40 px-[18px] py-[14px] border-b border-white/[0.06]">
        <div className="flex gap-[7px]">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        
        <div className="ml-2 flex flex-wrap gap-1">
          {(['install', 'status', 'skills'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`rounded-md px-3 py-1 font-mono text-[11px] transition-all duration-250 ${
                activeTab === tab 
                  ? 'bg-[#10b981] text-[#022c1e] font-semibold shadow-[0_0_16px_rgba(16,185,129,0.4)]' 
                  : 'text-[#8a948f] hover:bg-white/[0.03] hover:text-[#c7d3cc]'
              }`}
            >
              {tab}.sh
            </button>
          ))}
        </div>

        <div className="ml-auto flex gap-1.5">
          <span className="rounded-md border border-white/[0.06] px-2.5 py-1 font-mono text-[10px] text-[#8a948f]">
            v1.0.4
          </span>
          <span className="rounded-md border border-[#6ee7b7]/30 px-2.5 py-1 font-mono text-[10px] text-[#6ee7b7]">
            BETA
          </span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="relative p-[28px] font-mono text-[14px] leading-relaxed">
        {activeTab === 'install' && (
          <div className="space-y-4">
            <p className="text-[13px] italic text-[#5c645f]"># Suba o runtime Basilisk localmente</p>
            <div className="flex items-center gap-3">
              <span className="font-bold text-[#10b981] select-none">&gt;</span>
              <code className="flex-1 text-[#e6f1ea]">
                npx <span className="text-[#6ee7b7]">basilisk@latest</span>
              </code>
              <button 
                onClick={handleCopy}
                className={`flex items-center gap-2 rounded-md border border-white/[0.06] bg-transparent px-2.5 py-1.5 font-mono text-[10px] transition-all duration-250 hover:border-white/[0.12] hover:bg-[#10b981]/10 ${copied ? 'text-[#10b981] border-[#10b981]' : 'text-[#8a948f] hover:text-[#10b981]'}`}
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? 'COPIED' : 'COPY'}
              </button>
            </div>
          </div>
        )}

        {activeTab === 'status' && (
          <div className="space-y-2">
            <p className="text-[#10b981]">ACTIVE Basilisk Runtime</p>
            <p className="text-[#8a948f]">Versao: 1.0.4-beta</p>
            <p className="text-[#8a948f]">Sessao: <span className="text-[#e6f1ea]">bsk_9f2a71...</span></p>
            <p className="text-[#8a948f]">Canais ativos: <span className="text-[#6ee7b7]">Terminal, WhatsApp, Telegram</span></p>
            <p className="mt-4 text-[#8a948f]">Memoria: <span className="text-[#6ee7b7]">compactada para o run</span></p>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-2">
            <p className="text-[#8a948f] mb-3">Skills disponiveis sob governanca:</p>
            <div className="grid grid-cols-2 gap-2 text-[13px]">
              <div className="flex items-center gap-2 text-[#e6f1ea]">
                <span className="text-[#10b981]">+</span> file.manager
              </div>
              <div className="flex items-center gap-2 text-[#e6f1ea]">
                <span className="text-[#10b981]">+</span> browser.control
              </div>
              <div className="flex items-center gap-2 text-[#e6f1ea]">
                <span className="text-[#10b981]">+</span> git.orchestrator
              </div>
              <div className="flex items-center gap-2 text-[#e6f1ea]">
                <span className="text-[#10b981]">+</span> cloud.provisioner
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="border-t border-white/[0.06] bg-black/10 px-5 py-3 text-center text-[11px] text-[#5c645f]">
        Execucao local. Identidade governada. Evidencia anexada.
      </div>
    </div>
  )
}
