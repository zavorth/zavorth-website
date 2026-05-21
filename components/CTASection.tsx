'use client'

import React, { useLayoutEffect, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { createReveal, ensureGsapPlugins, initMagnetic } from './motion'

/**
 * CTASection — Final conversion panel
 * 
 * Features a dynamic slow-moving fluid aurora background, a GSAP-powered
 * magnetic call-to-action button, and ScrollTrigger reveal staggers.
 */

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const magneticButtonRef = useRef<HTMLAnchorElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      createReveal('[data-cta-reveal]', {
        trigger: sectionRef.current!,
        start: 'top 85%',
        y: 20,
        duration: 0.8,
        stagger: 0.08,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const btn = magneticButtonRef.current
    if (!btn) return
    const cleanup = initMagnetic(btn, 0.35) // Gentle magnetic pull force
    return cleanup
  }, [])

  return (
    <section id="cta" ref={sectionRef} className="relative section-rhythm overflow-hidden">
      <div className="mx-auto max-w-content px-5 sm:px-6">
        
        {/* Aurora Container with dynamic animated bubbles */}
        <div className="aurora-bg relative overflow-hidden rounded-3xl border border-white/[0.06] p-10 text-center sm:p-20 shadow-[0_24px_60px_rgba(0,0,0,0.5)]">
          {/* Animated aurora glows inside the container */}
          <div className="aurora-glow-1 absolute -left-10 -top-20" />
          <div className="aurora-glow-2 absolute -right-20 -bottom-20" />
          
          {/* Accent radial center spotlight overlay */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.03), transparent 75%)'
            }}
          />

          <div className="relative z-10">
            <h2 data-cta-reveal className="mx-auto mb-6 max-w-3xl text-[28px] font-black leading-[1.1] tracking-tight text-text-primary sm:text-[44px] google-sans-display">
              Coloque a IA{' '}
              <span className="text-serif italic text-amber-gradient">para agir</span>
              <br />
              <span className="text-amber-gradient">sem entregar o controle.</span>
            </h2>

            <p data-cta-reveal className="mx-auto mb-10 max-w-xl text-[14px] sm:text-[15px] leading-relaxed text-text-muted">
              O Zavorth une tarefas, apps e automações em uma experiência simples:
              você pede, acompanha, aprova e confere.
            </p>

            {/* CTAs */}
            <div data-cta-reveal className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* Magnetic Action Button */}
              <a 
                ref={magneticButtonRef}
                href="#install" 
                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-[13px] border border-amber/20 hover:scale-105 active:scale-95"
              >
                <span>Começar agora</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </a>
              <a 
                href="#how-it-works" 
                className="btn-secondary inline-flex items-center gap-2 px-7 py-3.5 font-medium text-[13px] text-text-muted hover:text-text-primary hover:bg-white/[0.04]"
              >
                Ver como funciona
              </a>
            </div>

            {/* Final tagline */}
            <p data-cta-reveal className="mt-12 font-mono text-[9px] uppercase tracking-[0.2em] text-text-faint">
              Peça. Veja o plano. Aprove quando importar. Acompanhe tudo.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
