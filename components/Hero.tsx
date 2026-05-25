'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import dynamic from 'next/dynamic'
import { LocalStackMarquee } from './LocalStackMarquee'
import { initMagnetic } from './motion'

const BlackHoleCanvas = dynamic(
  () => import('./BlackHoleCanvas').then((mod) => mod.BlackHoleCanvas),
  { ssr: false }
)

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
  const ctaWrapRef = useRef<HTMLDivElement>(null)
  const ctaBtnRef = useRef<HTMLAnchorElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const textLayerRef = useRef<HTMLDivElement>(null)
  const textParallaxRef = useRef<HTMLDivElement>(null)

  const [titleTyped, setTitleTyped] = useState(false)

  // Direct DOM scroll tracking for buttery smooth performance (zero React renders)
  useEffect(() => {
    const section = sectionRef.current
    const canvasWrap = canvasWrapRef.current
    const textLayer = textLayerRef.current

    if (!section) return

    let targetProgress = 0
    let currentProgress = 0
    let isLoopActive = true

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      let progress = 0
      if (rect.top < 0) {
        const scrollableHeight = rect.height - window.innerHeight
        progress = scrollableHeight > 0 ? Math.min(1, -rect.top / scrollableHeight) : 1
      }
      targetProgress = progress
    }

    const updateLoop = () => {
      if (!isLoopActive) return

      // Smooth scroll interpolation (damping: 0.15 on scroll down, 0.25 on scroll back up)
      const damping = targetProgress < currentProgress ? 0.25 : 0.15
      currentProgress += (targetProgress - currentProgress) * damping

      const titleScale = 1 - currentProgress * (1 - 0.47)
      const titleOpacity = Math.max(0, 1 - currentProgress * 1.5)
      const canvasOpacity = currentProgress >= 0.7 ? Math.max(0, 1 - (currentProgress - 0.7) / 0.3) : 1

      if (textLayer) {
        textLayer.style.transform = `translateY(120px) scale(${titleScale})`
        textLayer.style.opacity = `${titleOpacity}`
      }

      if (canvasWrap) {
        const innerCanvas = canvasWrap.querySelector('.inner-canvas') as HTMLDivElement
        if (innerCanvas) {
          innerCanvas.style.opacity = `${canvasOpacity}`
        }
      }

      requestAnimationFrame(updateLoop)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Start animation loop
    requestAnimationFrame(updateLoop)

    return () => {
      isLoopActive = false
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const line1Text = "Uma IA que trabalha"
  const line2Text = "com você — não por trás."

  // Magnetic button effect
  useEffect(() => {
    if (!ctaBtnRef.current) return
    const cleanup = initMagnetic(ctaBtnRef.current, 0.4)
    return () => cleanup()
  }, [])

  // Phase 1: Background Canvas Fades In immediately
  useEffect(() => {
    if (!sectionRef.current || !canvasWrapRef.current) return

    const ctx = gsap.context(() => {
      const canvasWrap = canvasWrapRef.current!
      
      // Initially hide standard GSAP targets
      gsap.set(canvasWrap, { opacity: 0 })
      if (ctaWrapRef.current) gsap.set(ctaWrapRef.current, { opacity: 0, y: 15 })

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
    const staggerSpeed = 0.015 // Speeded up typing speed
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

      // Fade in the interactive CTA buttons
      tl.to(ctaWrapRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
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
      className="relative h-[130vh] bg-[#020204]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-0">
        {/* Canvas Animation Layer — receives ALL pointer events */}
        <div
          ref={canvasWrapRef}
          className="absolute inset-0 z-0"
          style={{ 
            opacity: 0,
            transform: 'scale(1) translate(0px, 0px)',
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          <div className="inner-canvas w-full h-full transition-opacity duration-100" style={{ opacity: 1 }}>
            <BlackHoleCanvas />
          </div>
        </div>

        {/* Text Content Layer */}
        <div 
          ref={textLayerRef}
          className="relative z-10 pointer-events-none mx-auto flex w-full max-w-5xl flex-col items-center text-center select-none px-5"
          style={{
            transform: 'translateY(120px) scale(1)',
            opacity: 1,
            transformOrigin: 'center center',
            transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.1s ease-out'
          }}
        >
          <div
            ref={textParallaxRef}
            className="w-full flex flex-col items-center justify-center"
            style={{
              transform: 'translate(0px, 0px)',
              transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
            }}
          >
        {/* Title — animated with custom recursive dynamic typing cursor */}
        <h1
          className="text-[36px] sm:text-[56px] lg:text-[72px] xl:text-[84px] font-black leading-[1.05] tracking-[-0.04em] text-white zavorth-display select-none pointer-events-none"
        >
          <div ref={titleContainerRef} className="typed-container select-none">
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

        {/* CTA — enabled on the button itself */}
        <div ref={ctaWrapRef} className="mt-12 pointer-events-auto" style={{ opacity: 0 }}>
          <a
            ref={ctaBtnRef}
            href="#how-it-works"
            onClick={scrollToSection}
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-md px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white/[0.14] hover:border-white/[0.2] hover:scale-[1.03] active:scale-[0.97]"
          >
            Descobrir mais
          </a>
        </div>
        </div>
        </div>
      </div>
    </section>
  )
}
