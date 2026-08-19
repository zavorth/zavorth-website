'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ShieldAlert, 
  FileCheck2, 
  Lock, 
  Key, 
  Check, 
  X, 
  FileText,
  ShieldCheck,
  Zap
} from 'lucide-react'

export function SafetyGovernanceSection() {
  const [decisionState, setDecisionState] = useState<'pending' | 'approved' | 'rejected'>('pending')

  const riskTiers = [
    {
      tier: 'Nível 1 · Seguro',
      title: 'Leitura & Pesquisa',
      desc: 'Inspeção de arquivos, buscas semânticas e cálculos ocorrem com auto-aprovação instantânea.',
      status: 'Auto-Approved',
      tone: 'text-emerald-400',
    },
    {
      tier: 'Nível 2 · Moderado',
      title: 'Edição de Código',
      desc: 'Modificações em arquivos do projeto com snapshots e garantia de rollback cirúrgico em caso de falha.',
      status: 'Snapshotted',
      tone: 'text-amber-400',
    },
    {
      tier: 'Nível 3 · Crítico',
      title: 'Comandos & Sistema',
      desc: 'Comandos de terminal, instalação de pacotes e chamadas externas exigem aprovação explícita.',
      status: 'Approval Required',
      tone: 'text-rose-400',
    },
  ]

  return (
    <section
      id="safety"
      className="relative overflow-hidden py-28 sm:py-36 bg-black text-white scroll-mt-20 border-t border-white/[0.06]"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-md mb-6"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] font-medium tracking-wider uppercase text-neutral-300">
              Governança &amp; Segurança
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-semibold tracking-tight text-white leading-[1.15]"
          >
            Você sempre no controle{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-emerald-400">
              das ações sensíveis.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto font-light"
          >
            Nada acontece sem sua autorização. O sistema classifica riscos por níveis e gera recibos criptográficos locais para cada operação executada.
          </motion.p>
        </div>

        {/* 3-Tier Risk Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {riskTiers.map((tier) => (
            <div
              key={tier.tier}
              className="p-7 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-neutral-900/40 to-neutral-950/80 backdrop-blur-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">
                    {tier.tier}
                  </span>
                  <span className={`text-[10px] font-mono font-medium ${tier.tone}`}>
                    {tier.status}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{tier.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed font-light">{tier.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Approval Simulator & Audit Receipt */}
        <div className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-neutral-900/50 via-black to-neutral-950/80 p-8 sm:p-12 backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            
            {/* Interactive Decision Block */}
            <div className="w-full lg:w-1/2 p-6 rounded-2xl bg-black/60 border border-white/[0.06]">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <span className="text-xs font-semibold text-white flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  Solicitação de Ação Sensível
                </span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                  RISCO NIVEL 3
                </span>
              </div>

              <p className="text-xs text-neutral-300 font-light mb-6">
                O agente deseja executar a compilação do pacote e registrar a versão de lançamento no ambiente local.
              </p>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setDecisionState('approved')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    decisionState === 'approved'
                      ? 'bg-emerald-500 text-black font-semibold shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                      : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Aprovar (Go)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDecisionState('rejected')}
                  className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ${
                    decisionState === 'rejected'
                      ? 'bg-rose-500 text-white font-semibold'
                      : 'bg-white/[0.03] hover:bg-white/[0.06] text-neutral-400 border border-white/[0.08]'
                  }`}
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Recusar</span>
                </button>
              </div>
            </div>

            {/* Audit Receipt */}
            <div className="w-full lg:w-1/2 p-6 rounded-2xl bg-black/60 border border-white/[0.06]">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-4">
                <span className="text-xs font-semibold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" />
                  Recibo Criptográfico de Auditoria
                </span>
                <span className="text-[10px] font-mono text-emerald-400">AUDIT RECEIPT</span>
              </div>

              <div className="space-y-2 font-mono text-[11px] text-neutral-400">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Status da Decisão:</span>
                  <span className={decisionState === 'approved' ? 'text-emerald-400 font-semibold' : decisionState === 'rejected' ? 'text-rose-400 font-semibold' : 'text-amber-400'}>
                    {decisionState.toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Assinatura Local:</span>
                  <span className="text-neutral-300">sha256:7f342...ea04f</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Privacidade:</span>
                  <span className="text-emerald-400">100% On-Device / Zero Leaks</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  )
}
