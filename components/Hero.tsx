'use client'

import React, { useLayoutEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import FoxMascot from './FoxMascot'
import HeroNetworkBackground from './HeroNetworkBackground'
import { LocalStackMarquee } from './LocalStackMarquee'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isMascotHot, setIsMascotHot] = useState(false)

  useLayoutEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-hero-bg]',
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'power2.out', stagger: 0.1 },
      )

      gsap.fromTo(
        '[data-hero-mascot]',
        { y: 34, opacity: 0, scale: 0.92 },
        { y: 0, opacity: 1, scale: 1, duration: 1.05, ease: 'expo.out', delay: 0.25 },
      )

      gsap.fromTo(
        '[data-hero-eyebrow]',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', delay: 0.46 },
      )

      const headlineLines = sectionRef.current?.querySelectorAll('[data-hero-line]')
      headlineLines?.forEach((line, i) => {
        gsap.fromTo(
          line,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'expo.out', delay: 0.64 + i * 0.12 },
        )
      })

      gsap.fromTo(
        '[data-hero-copy]',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', delay: 1.02 },
      )

      gsap.fromTo(
        '[data-hero-cta]',
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', delay: 1.22 },
      )

      gsap.fromTo(
        '[data-hero-marquee]',
        { opacity: 0 },
        { opacity: 1, duration: 0.55, ease: 'power2.out', delay: 1.58 },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden"
    >
      <div
        data-hero-bg
        className="pointer-events-none absolute inset-0 z-0"
        style={{ opacity: 0 }}
      >
        <HeroNetworkBackground />
      </div>

      <div
        data-hero-bg
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0,
          background:
            'radial-gradient(ellipse 72% 62% at 50% 40%, transparent 32%, rgba(1, 2, 2, 0.74) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col items-center justify-center px-5 pb-8 pt-16 text-center sm:px-6 lg:pb-9">
        <div className="flex w-full flex-col items-center">
          <div
            className="mb-4 flex items-center justify-center sm:mb-5"
            data-hero-mascot
            onPointerEnter={() => setIsMascotHot(true)}
            onPointerLeave={() => setIsMascotHot(false)}
            onFocus={() => setIsMascotHot(true)}
            onBlur={() => setIsMascotHot(false)}
          >
            <div className="relative">
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10"
                style={{
                  width: '300px',
                  height: '300px',
                  transform: 'translate(-50%, -50%)',
                  border: '1px solid rgba(255, 122, 0, 0.08)',
                  borderRadius: '50%',
                  animation: 'ringPulse 5s ease-in-out infinite',
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10"
                style={{
                  width: '230px',
                  height: '230px',
                  transform: 'translate(-50%, -50%)',
                  background:
                    'radial-gradient(circle, rgba(255, 122, 0, 0.08) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                  animation: 'runtimePulse 4s ease-in-out infinite',
                }}
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 -z-10"
                style={{
                  width: '360px',
                  height: '360px',
                  transform: 'translate(-50%, -50%)',
                  border: '1px solid rgba(255, 122, 0, 0.04)',
                  borderRadius: '50%',
                }}
                aria-hidden="true"
              />

              <FoxMascot size={176} className="cursor-pointer" />
            </div>
          </div>

          <div data-hero-eyebrow className="eyebrow mx-auto mb-4 inline-flex">
            <span className="relative flex h-2 w-2">
              <span
                className="status-pulse absolute inline-flex h-full w-full rounded-full"
                style={{ background: '#10b981' }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ background: '#10b981' }}
              />
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.25em]"
              style={{ color: '#64647a' }}
            >
              Agent Runtime - v1
            </span>
          </div>

          <h1
            className={`hero-serif-title mx-auto max-w-[72rem] ${
              isMascotHot ? 'hero-serif-title--awakened' : ''
            }`}
            aria-label="A IA local que seu computador merece."
          >
            <div data-hero-line>
              <span>A IA local que seu </span>
            </div>
            <div data-hero-line>
              <span>computador merece.</span>
            </div>
          </h1>

          <div data-hero-copy className="mx-auto mt-5 max-w-[38rem]">
            <p className="text-[0.95rem] leading-[1.7]" style={{ color: '#8a8aa0' }}>
              Linguagem natural vira execucao real. Memoria, politicas, ferramentas
              e evidencia no mesmo loop - de qualquer canal.
            </p>
          </div>

          <div
            data-hero-cta
            className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <a
              href="/start"
              className="group btn-sheen inline-flex w-[252px] max-w-full items-center justify-center gap-3 rounded-2xl px-8 py-4 text-[15px] font-semibold transition-all duration-300 sm:w-auto"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #0ea572 100%)',
                color: '#022c22',
                boxShadow:
                  '0 4px 32px rgba(16, 185, 129, 0.25), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
            >
              Comecar localmente
              <ArrowRight
                size={18}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="/demo"
              className="inline-flex w-[252px] max-w-full items-center justify-center gap-2 rounded-2xl px-8 py-4 text-[15px] font-medium transition-all duration-300 sm:w-auto"
              style={{
                background: 'rgba(12, 12, 18, 0.7)',
                color: '#b0b0be',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(12px)',
              }}
            >
              Ver demo
            </a>
          </div>
        </div>

        <div data-hero-marquee className="mt-4 w-full">
          <LocalStackMarquee />
        </div>
      </div>
    </section>
  )
}
