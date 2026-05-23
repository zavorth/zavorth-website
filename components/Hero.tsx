'use client'

import React, { useLayoutEffect, useRef, useState, useCallback, useEffect } from 'react'
import gsap from 'gsap'
import { BlackHoleCanvas } from './BlackHoleCanvas'
import { LocalStackMarquee } from './LocalStackMarquee'
import { initMagnetic } from './motion'

/**
 * Hero Section — Zavorth Core Style
 *
 * Behavior modeled after Zavorth Core Experience:
 * 1. Page loads with black screen
 * 2. Title words animate in with scale + blur stagger (text is NOT selectable)
 * 3. After title completes, the background animation fades in
 * 4. User interacts ONLY with the canvas (click changes colors, drag orbits)
 * 5. A single CTA button below the title
 */

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const ctaWrapRef = useRef<HTMLDivElement>(null)
  const ctaBtnRef = useRef<HTMLAnchorElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)

  const [titleTyped, setTitleTyped] = useState(false)

  const line1Text = "Uma IA que trabalha"
  const line2Text = "com você — não por trás."

  // Magnetic button effect
  useEffect(() => {
    if (!ctaBtnRef.current) return
    const cleanup = initMagnetic(ctaBtnRef.current, 0.4)
    return () => cleanup()
  }, [])

  // Phase 1: Background Canvas Fades In immediately
  useLayoutEffect(() => {
    if (!sectionRef.current || !canvasWrapRef.current) return

    const ctx = gsap.context(() => {
      const canvasWrap = canvasWrapRef.current!
      
      // Initially hide standard GSAP targets
      gsap.set(canvasWrap, { opacity: 0 })
      if (taglineRef.current) gsap.set(taglineRef.current, { opacity: 0, y: 15, filter: 'blur(8px)' })
      if (ctaWrapRef.current) gsap.set(ctaWrapRef.current, { opacity: 0, y: 15 })
      if (marqueeRef.current) gsap.set(marqueeRef.current, { opacity: 0 })

      // Fade in the stellar background canvas
      gsap.to(canvasWrap, {
        opacity: 1,
        duration: 1.8,
        ease: 'power2.inOut',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Phase 2: Dynamic Typing on the MAIN Title
  useEffect(() => {
    if (!titleContainerRef.current) return

    const container = titleContainerRef.current
    const cursorContainer = container.querySelector('.cursor-container') as HTMLDivElement
    const bar = container.querySelector('.glowing-cursor-bar') as HTMLDivElement

    const chars = Array.from(container.querySelectorAll('.char')) as HTMLSpanElement[]
    if (chars.length === 0) return

    const updateBlinkingCursor = (x: number, y: number) => {
      container.style.setProperty('--cursor-pos-x', `${x}px`)
      container.style.setProperty('--cursor-pos-y', `${y}px`)
    }

    // Set initial position of the cursor
    const first = chars[0]
    const charRect = first.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    updateBlinkingCursor(
      charRect.left - containerRect.left,
      charRect.top - containerRect.top
    )

    if (cursorContainer) {
      cursorContainer.style.opacity = '1'
      cursorContainer.classList.add('typing-active')
    }

    const timeouts: NodeJS.Timeout[] = []
    const staggerSpeed = 0.045
    const staggerMs = staggerSpeed * 1000
    let cumulativeDelay = 0.0 // 0ms initial load delay

    chars.forEach((char, i) => {
      const charText = char.textContent
      let charDelay = staggerMs

      if (charText === '\u00A0' || charText === ' ') {
        charDelay = staggerMs * 1.6
      } else if (/[.,?!;:-—]/.test(charText || '')) {
        charDelay = staggerMs * 4.0 // Pause at punctuation and dashes
      }
      charDelay = charDelay * (0.95 + Math.random() * 0.1)

      const t = setTimeout(() => {
        char.style.opacity = '1'

        const charRect = char.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()

        updateBlinkingCursor(
          (charRect.left - containerRect.left) + charRect.width + 10,
          charRect.top - containerRect.top
        )

        // Majestic neon lightsaber active keystroke pulse
        if (bar) {
          bar.style.boxShadow = '0 0 18px rgba(6, 182, 212, 1), 0 0 35px rgba(256, 256, 256, 1)'
          bar.style.transform = 'scale(1.2)'
          const tPulse = setTimeout(() => {
            bar.style.boxShadow = '0 0 6px rgba(6, 182, 212, 0.7), 0 0 12px rgba(139, 92, 246, 0.5)'
            bar.style.transform = 'scale(1)'
          }, 80)
          timeouts.push(tPulse)
        }

        if (i === chars.length - 1) {
          setTitleTyped(true)
          if (cursorContainer) {
            cursorContainer.classList.remove('typing-active')
            cursorContainer.style.opacity = '0'
          }
        }
      }, cumulativeDelay)

      timeouts.push(t)
      cumulativeDelay += charDelay
    })

    return () => {
      timeouts.forEach(t => clearTimeout(t))
    }
  }, [])

  // Phase 3: Staggered entrance for tagline, CTA buttons, and marquee when title completes
  useEffect(() => {
    if (!titleTyped) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // Stagger tagline fade-in with micro-blur
      tl.to(taglineRef.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
      })

      // Fade in the interactive CTA buttons
      tl.to(ctaWrapRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      }, '-=0.5')

      // Fade in the marquee
      if (marqueeRef.current) {
        tl.to(marqueeRef.current, {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.3')
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [titleTyped])

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

      {/* Text Content Layer */}
      <div className="relative z-10 pointer-events-none mx-auto flex w-full max-w-5xl flex-col items-center text-center select-none px-5">
        {/* Title — animated with custom recursive dynamic typing cursor */}
        <h1
          className="text-[36px] sm:text-[56px] lg:text-[72px] xl:text-[84px] font-black leading-[1.05] tracking-[-0.04em] text-white zavorth-display select-text pointer-events-auto"
        >
          <div ref={titleContainerRef} className="typed-container select-text">
            <div className="cursor-container">
              <div className="glowing-cursor-bar" />
            </div>
            <span className="typed-content">
              {line1Text.split(' ').map((word, wordIdx) => (
                <span key={`w1-${wordIdx}`} className="inline-block relative">
                  {word.split('').map((char, charIdx) => (
                    <span
                      key={`c1-${charIdx}`}
                      className="char inline-block relative opacity-0"
                    >
                      {char}
                    </span>
                  ))}
                  {wordIdx < line1Text.split(' ').length - 1 && '\u00A0'}
                </span>
              ))}
              <br />
              <span className="text-amber-500 drop-shadow-md">
                {line2Text.split(' ').map((word, wordIdx) => (
                  <span key={`w2-${wordIdx}`} className="inline-block relative">
                    {word.split('').map((char, charIdx) => (
                      <span
                        key={`c2-${charIdx}`}
                        className="char inline-block relative opacity-0"
                      >
                        {char}
                      </span>
                    ))}
                    {wordIdx < line2Text.split(' ').length - 1 && '\u00A0'}
                  </span>
                ))}
              </span>
            </span>
          </div>
        </h1>

        {/* Dynamic Tagline — Fades in staggered after title typing completes */}
        <div
          ref={taglineRef}
          className="mt-8 text-[15px] sm:text-[18px] md:text-[20px] text-gray-400 font-medium tracking-tight max-w-3xl leading-relaxed pointer-events-auto"
          style={{ opacity: 0 }}
        >
          Empoderando desenvolvedores a orquestrar agência autônoma em escala massiva.
        </div>

        {/* CTA — enabled on the button itself */}
        <div ref={ctaWrapRef} className="mt-10 pointer-events-auto" style={{ opacity: 0 }}>
          <a
            ref={ctaBtnRef}
            href="#how-it-works"
            onClick={scrollToSection}
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-md px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white/[0.14] hover:border-white/[0.2] hover:scale-[1.03] active:scale-[0.97]"
          >
            Descobrir mais
          </a>
        </div>

        {/* Marquee — infinite scroll of entry surfaces */}
        <div ref={marqueeRef} className="mt-8 w-full pointer-events-auto" style={{ opacity: 0 }}>
          <LocalStackMarquee />
        </div>
      </div>
    </section>
  )
}
