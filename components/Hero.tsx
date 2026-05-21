'use client'

import React, { useLayoutEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import { BlackHoleCanvas } from './BlackHoleCanvas'
import { LocalStackMarquee } from './LocalStackMarquee'

/**
 * Hero Section — Gemini I/O 2026 Style
 *
 * Behavior modeled after gemini.google/about:
 * 1. Page loads with black screen
 * 2. Title words animate in with scale + blur stagger (text is NOT selectable)
 * 3. After title completes, the background animation fades in
 * 4. User interacts ONLY with the canvas (click changes colors, drag orbits)
 * 5. A single CTA button below the title
 */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const textLayerRef = useRef<HTMLHeadingElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const [animationReady, setAnimationReady] = useState(false)

  useLayoutEffect(() => {
    if (!sectionRef.current || !textLayerRef.current || !canvasWrapRef.current) return

    const ctx = gsap.context(() => {
      const words = textLayerRef.current!.querySelectorAll('.hero-word')
      const canvasWrap = canvasWrapRef.current!
      const cta = ctaRef.current

      // Start: everything hidden
      gsap.set(words, { opacity: 0, scale: 0.85, filter: 'blur(12px)', y: 20 })
      gsap.set(canvasWrap, { opacity: 0 })
      if (cta) gsap.set(cta, { opacity: 0, y: 16 })
      if (marqueeRef.current) gsap.set(marqueeRef.current, { opacity: 0 })

      // Timeline: text first, then canvas
      const tl = gsap.timeline({
        delay: 0.3,
        onComplete: () => setAnimationReady(true),
      })

      // Phase 1: Words stagger in (like Gemini's overlayTextScaleLayer spans)
      tl.to(words, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 0.9,
        ease: 'expo.out',
        stagger: 0.08,
      })

      // Phase 2: Canvas background fades in (starts slightly before text finishes)
      tl.to(canvasWrap, {
        opacity: 1,
        duration: 1.6,
        ease: 'power2.inOut',
      }, '-=0.4')

      // Phase 3: CTA button appears
      if (cta) {
        tl.to(cta, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        }, '-=0.8')
      }

      // Phase 4: Marquee fades in last
      if (marqueeRef.current) {
        tl.to(marqueeRef.current, {
          opacity: 1,
          duration: 0.55,
          ease: 'power2.out',
        }, '-=0.3')
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById('how-it-works')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      {/* Canvas Animation Layer — receives ALL pointer events */}
      <div
        ref={canvasWrapRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <BlackHoleCanvas />
      </div>

      {/* Text Content Layer — NO pointer events (user cannot select or interact) */}
      <div className="relative z-10 pointer-events-none mx-auto flex w-full max-w-5xl flex-col items-center text-center select-none px-5">
        {/* Title — each word in its own span for individual animation */}
        <h1
          ref={textLayerRef}
          className="text-[36px] sm:text-[56px] lg:text-[72px] xl:text-[84px] font-black leading-[1.05] tracking-[-0.04em] text-white google-sans-display"
        >
          <span className="hero-word inline-block">Uma</span>{' '}
          <span className="hero-word inline-block">IA</span>{' '}
          <span className="hero-word inline-block">que</span>{' '}
          <span className="hero-word inline-block">trabalha</span>
          <br />
          <span className="hero-word inline-block text-amber-gradient">com</span>{' '}
          <span className="hero-word inline-block text-amber-gradient">você</span>{' '}
          <span className="hero-word inline-block text-amber-gradient">—</span>{' '}
          <span className="hero-word inline-block text-amber-gradient">não</span>{' '}
          <span className="hero-word inline-block text-amber-gradient">por</span>{' '}
          <span className="hero-word inline-block text-amber-gradient">trás.</span>
        </h1>

        {/* CTA — also pointer-events-none on container, but enabled on the button itself */}
        <div ref={ctaRef} className="mt-10 pointer-events-auto" style={{ opacity: 0 }}>
          <a
            href="#how-it-works"
            onClick={scrollToSection}
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-md px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white/[0.14] hover:border-white/[0.2] hover:scale-[1.03] active:scale-[0.97]"
          >
            Descobrir mais
          </a>
        </div>

        {/* Marquee — infinite scroll of entry surfaces */}
        <div ref={marqueeRef} className="mt-6 w-full pointer-events-auto" style={{ opacity: 0 }}>
          <LocalStackMarquee />
        </div>
      </div>
    </section>
  )
}
