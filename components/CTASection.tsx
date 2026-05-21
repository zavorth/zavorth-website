'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ensureGsapPlugins } from './motion'

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (!sectionRef.current) return
    ensureGsapPlugins()

    const ctx = gsap.context(() => {
      gsap.fromTo('[data-cta-reveal]',
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current!,
            start: 'top 85%',
            once: true,
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="cta" ref={sectionRef} className="relative border-t border-white/[0.06] bg-[#050505] py-24 sm:py-32">
      <div className="mx-auto max-w-xl px-5 sm:px-6 text-center">
        <h2
          data-cta-reveal
          className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl"
        >
          Coloque a IA para agir
          <br />
          <span className="text-text-muted">sem entregar o controle.</span>
        </h2>

        <p
          data-cta-reveal
          className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-text-muted"
        >
          O Zavorth une tarefas, apps e automações em uma experiência local e segura.
          Você pede, acompanha, aprova e confere.
        </p>

        <div data-cta-reveal className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#install"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-black transition-colors hover:bg-neutral-200"
          >
            <span>Começar agora</span>
            <ArrowRight size={15} strokeWidth={2.5} />
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] px-6 py-3 text-[14px] font-medium text-text-muted transition-colors hover:text-text-primary hover:border-white/20"
          >
            Ver como funciona
          </a>
        </div>
      </div>
    </section>
  )
}
