'use client'

import React, { useLayoutEffect, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ensureGsapPlugins } from './motion'
import { Lock, Unlock, Key, ShieldAlert, KeyRound, EyeOff, FileKey2 } from 'lucide-react'

// Cryptographic vault status indicator
type VaultStatus = 'secured' | 'scanning' | 'unlocked'

export function SecuritySection() {
  const rootRef = useRef<HTMLElement>(null)
  const [vaultStatus, setVaultStatus] = useState<VaultStatus>('secured')
  const [isHovered, setIsHovered] = useState(false)
  const ring1Ref = useRef<SVGCircleElement>(null)
  const ring2Ref = useRef<SVGCircleElement>(null)

  useLayoutEffect(() => {
    if (!rootRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      // Reveal items sequentially
      gsap.fromTo('[data-sec-reveal]',
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

  // Rotate vault rings smoothly using GSAP
  useEffect(() => {
    if (!ring1Ref.current || !ring2Ref.current) return
    
    const r1 = gsap.to(ring1Ref.current, {
      rotation: 360,
      transformOrigin: 'center',
      repeat: -1,
      duration: 20,
      ease: 'none'
    })

    const r2 = gsap.to(ring2Ref.current, {
      rotation: -360,
      transformOrigin: 'center',
      repeat: -1,
      duration: 15,
      ease: 'none'
    })

    if (isHovered) {
      gsap.to([r1, r2], { timeScale: 2.5, duration: 0.5 })
    } else {
      gsap.to([r1, r2], { timeScale: 1, duration: 0.5 })
    }

    return () => {
      r1.kill()
      r2.kill()
    }
  }, [isHovered])

  // Trigger temporary scan state when vault is clicked
  const handleVaultClick = () => {
    if (vaultStatus === 'secured') {
      setVaultStatus('scanning')
      setTimeout(() => {
        setVaultStatus('unlocked')
      }, 1500)
    } else if (vaultStatus === 'unlocked') {
      setVaultStatus('secured')
    }
  }

  return (
    <section id="control" ref={rootRef} className="relative section-rhythm overflow-hidden py-24 sm:py-32">
      {/* Background element */}
      <div className="absolute inset-0 bg-[#060608] -z-20" />
      <div className="absolute left-[10%] top-[30%] -z-10 h-[350px] w-[350px] rounded-full bg-amber-500/5 blur-[120px]" />
      <div className="absolute right-[5%] bottom-[15%] -z-10 h-[300px] w-[300px] rounded-full bg-[#8800ff]/3 blur-[110px]" />

      <div className="mx-auto max-w-content px-5 sm:px-6 relative z-10">
        
        {/* Header */}
        <div data-sec-reveal className="mb-20 max-w-3xl">
          <p className="eyebrow mb-4">Segurança & Privacidade</p>
          <h2 className="section-title-display mb-6 text-text-primary">
            Criptografia local e zero trust.
            <br />
            <span className="text-text-muted">A palavra final continua sendo sua.</span>
          </h2>
          <p className="max-w-xl text-body-lg text-text-muted">
            O Zavorth opera sob um modelo híbrido: ele prepara as automações localmente 
            com isolamento completo de credenciais e chaves. Nada sai sem o seu consentimento.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          
          {/* Left: Cryptographic key vault interactive visualizer */}
          <div 
            data-sec-reveal 
            className="flex flex-col items-center justify-center p-8 rounded-3xl border border-white/[0.06] bg-[#0c0c0e]/40 backdrop-blur-md shadow-2xl relative group overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Interactive Vault SVG */}
            <div className="relative h-64 w-64 mb-6 cursor-pointer select-none" onClick={handleVaultClick}>
              {/* Inner glowing lock icon */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div 
                  className={`h-20 w-20 rounded-full flex items-center justify-center border transition-all duration-500 ${
                    vaultStatus === 'secured' 
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.25)]' 
                      : vaultStatus === 'scanning'
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-500 animate-pulse shadow-[0_0_30px_rgba(59,130,246,0.25)]'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.25)]'
                  }`}
                >
                  {vaultStatus === 'secured' && <Lock className="h-8 w-8" />}
                  {vaultStatus === 'scanning' && <Key className="h-8 w-8 animate-spin" />}
                  {vaultStatus === 'unlocked' && <Unlock className="h-8 w-8" />}
                </div>
              </div>

              {/* Vector rings */}
              <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
                {/* Outermost Ring */}
                <circle 
                  ref={ring1Ref}
                  cx="100" 
                  cy="100" 
                  r="85" 
                  stroke="url(#vault-ring-gradient)" 
                  strokeWidth="1.5" 
                  strokeDasharray="15 30 50 15"
                  className="transition-all duration-300"
                />

                {/* Second Ring */}
                <circle 
                  ref={ring2Ref}
                  cx="100" 
                  cy="100" 
                  r="65" 
                  stroke="url(#vault-ring-gradient-reverse)" 
                  strokeWidth="1" 
                  strokeDasharray="40 10 15 25"
                  className="opacity-70 transition-all duration-300"
                />

                {/* Background reference circle */}
                <circle cx="100" cy="100" r="85" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                <circle cx="100" cy="100" r="65" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />

                {/* SVG Definitions */}
                <defs>
                  <linearGradient id="vault-ring-gradient" x1="0" y1="0" x2="200" y2="200">
                    <stop offset="0%" stopColor={vaultStatus === 'secured' ? '#f59e0b' : vaultStatus === 'scanning' ? '#3b82f6' : '#10b981'} />
                    <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
                    <stop offset="100%" stopColor={vaultStatus === 'secured' ? '#b45309' : vaultStatus === 'scanning' ? '#1d4ed8' : '#047857'} />
                  </linearGradient>
                  <linearGradient id="vault-ring-gradient-reverse" x1="200" y1="200" x2="0" y2="0">
                    <stop offset="0%" stopColor={vaultStatus === 'secured' ? '#f59e0b' : vaultStatus === 'scanning' ? '#3b82f6' : '#10b981'} stopOpacity="0.8" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Micro details / interaction prompt */}
            <div className="text-center">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-faint mb-1.5 block">
                {vaultStatus === 'secured' ? 'COFRE CRIPTOGRÁFICO ATIVO' : vaultStatus === 'scanning' ? 'DESCRIPTOGRAFANDO SECRETS LOCAL' : 'CHAVE EFÊMERA DESBLOQUEADA'}
              </span>
              <p className="text-[12px] text-text-muted max-w-[280px]">
                {vaultStatus === 'secured' 
                  ? 'Clique no cofre para simular a autorização de credenciais de chaves SecretRef.' 
                  : vaultStatus === 'scanning' 
                  ? 'Verificando assinaturas de segurança do broker...'
                  : 'Chave ativa por 15 segundos para execução local segura.'
                }
              </p>
            </div>
          </div>

          {/* Right: Security & Isolation Cards */}
          <div className="flex flex-col gap-5">
            {/* SecretRef Isolation Card */}
            <div data-sec-reveal className="glass-panel p-6 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:border-amber-500/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <KeyRound className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] text-text-primary">Isolamento SecretRef</h3>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-text-faint">credenciais protegidas</span>
                </div>
              </div>
              <p className="text-[13.5px] leading-relaxed text-text-muted">
                Suas chaves de API, senhas e tokens de acesso nunca são injetados nas discussões de prompts do LLM. O Zavorth utiliza referências criptografadas locais que resolvem dados em runtime local.
              </p>
            </div>

            {/* Zero Cloud Leak Card */}
            <div data-sec-reveal className="glass-panel p-6 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:border-amber-500/20 transition-all duration-300">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <EyeOff className="h-4.5 w-4.5" />
                </div>
                <div>
                  <h3 className="font-bold text-[15px] text-text-primary">Auditoria Sem Nuvem</h3>
                  <span className="font-mono text-[9px] uppercase tracking-wider text-text-faint">zero data leak</span>
                </div>
              </div>
              <p className="text-[13.5px] leading-relaxed text-text-muted">
                O arquivo de histórico operacional e os recibos de transações residem em seu disco local de forma assinada e cifrada. Sem rastros ou logs de telemetria enviados a servidores externos.
              </p>
            </div>

            {/* Security Guard Quote */}
            <div data-sec-reveal className="border-l-2 border-amber-500/30 pl-5 py-1">
              <p className="text-[13.5px] font-medium leading-relaxed text-text-secondary italic">
                &ldquo;Proteger credenciais não é uma barreira complexa para o usuário; no Zavorth, é a fundação invisível e inviolável do runtime.&rdquo;
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
