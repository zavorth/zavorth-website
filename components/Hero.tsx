'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import dynamic from 'next/dynamic'
import { initMagnetic } from './motion'

const BlackHoleCanvas = dynamic(
  () => import('./BlackHoleCanvas').then((mod) => mod.BlackHoleCanvas),
  { ssr: false }
)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const ctaWrapRef = useRef<HTMLDivElement>(null)
  const ctaBtnRef = useRef<HTMLAnchorElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const textLayerRef = useRef<HTMLDivElement>(null)
  const textParallaxRef = useRef<HTMLDivElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)

  const [titleTyped, setTitleTyped] = useState(false)

  const line1Text = "Uma IA que trabalha"
  const line2Text = "com você — não por trás."

  // Direct DOM scroll tracking for buttery smooth performance (zero React renders)
  useEffect(() => {
    const section = sectionRef.current
    const canvasWrap = canvasWrapRef.current
    const textLayer = textLayerRef.current
    const scrollIndicator = scrollIndicatorRef.current

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

      const damping = targetProgress < currentProgress ? 0.25 : 0.15
      currentProgress += (targetProgress - currentProgress) * damping

      const titleScale = 1 - currentProgress * 0.4
      const titleOpacity = Math.max(0, 1 - currentProgress * 1.5)
      const titleY = 40 - currentProgress * 40

      const canvasOpacity = Math.max(0, 1 - (currentProgress / 0.85))
      const canvasScale = 1 - currentProgress * 0.15

      if (textLayer) {
        textLayer.style.transform = `translateY(${titleY}px) scale(${titleScale})`
        textLayer.style.opacity = `${titleOpacity}`
      }

      if (canvasWrap) {
        const innerCanvas = canvasWrap.querySelector('.inner-canvas') as HTMLDivElement
        if (innerCanvas) {
          innerCanvas.style.opacity = `${canvasOpacity}`
          innerCanvas.style.transform = `scale(${canvasScale})`
        }
      }

      const indicatorOpacity = Math.max(0, 1 - (currentProgress / 0.15))
      const innerIndicator = scrollIndicator?.querySelector('.scroll-indicator-inner') as HTMLDivElement
      if (innerIndicator) {
        innerIndicator.style.opacity = `${indicatorOpacity}`
      }

      requestAnimationFrame(updateLoop)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    requestAnimationFrame(updateLoop)

    return () => {
      isLoopActive = false
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Magnetic button effect
  useEffect(() => {
    if (!ctaBtnRef.current) return
    const cleanup = initMagnetic(ctaBtnRef.current, 0.4)
    return () => cleanup()
  }, [])

  // Dynamic Typing animation with neon lightsaber Keystroke Pulse
  useEffect(() => {
    if (!titleContainerRef.current) return

    const container = titleContainerRef.current
    const cursorContainer = container.querySelector('.cursor-container') as HTMLDivElement
    const bar = container.querySelector('.blinking-cursor') as HTMLDivElement

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
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTitleTyped(true)
          if (cursorContainer) {
            cursorContainer.style.opacity = '0'
          }
          window.dispatchEvent(new CustomEvent('hero-title-typed'))
        }
      })

      let cumulativeTime = 0.1 // small initial delay

      chars.forEach((char, i) => {
        const charText = char.textContent || ''
        let charDelay = 0.018 // Base typing speed

        if (charText === '\u00A0' || charText === ' ') {
          charDelay = 0.035
        } else if (/[.,?!;:-—]/.test(charText)) {
          charDelay = 0.1 // Pause slightly at punctuation
        }
        
        charDelay = charDelay * (0.9 + Math.random() * 0.2)

        tl.to(char, {
          opacity: 1,
          duration: 0.01,
          onStart: () => {
            // Position cursor right after the newly typed character
            const charRect = char.getBoundingClientRect()
            const containerRect = container.getBoundingClientRect()
            updateBlinkingCursor(
              (charRect.left - containerRect.left) + charRect.width + 4,
              charRect.top - containerRect.top
            )

            // Trigger neon lightsaber pulse on cursor bar
            if (bar) {
              gsap.fromTo(bar,
                {
                  boxShadow: '0 0 18px rgba(245, 158, 11, 1), 0 0 35px rgba(256, 256, 256, 1)',
                  scale: 1.2
                },
                {
                  boxShadow: '0 0 8px rgba(245, 158, 11, 0.6), 0 0 16px rgba(236, 72, 153, 0.4), 0 0 24px rgba(59, 130, 246, 0.3)',
                  scale: 1.0,
                  duration: 0.08,
                  ease: 'power2.out'
                }
              )
            }
          }
        }, cumulativeTime)

        cumulativeTime += charDelay
      })

      // Fade in the CTA and scroll indicator after typing finishes
      tl.fromTo(ctaWrapRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        cumulativeTime
      )

      tl.fromTo(scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' },
        cumulativeTime + 0.2
      )

    }, container)

    return () => ctx.revert()
  }, [])

  const scrollToSection = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const target = document.getElementById('overview')
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-[120vh] bg-[#020204]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center z-0">
        
        {/* Canvas Animation Layer */}
        <div
          ref={canvasWrapRef}
          className="absolute inset-0 z-0"
        >
          <div className="inner-canvas w-full h-full" style={{ transformOrigin: 'center center' }}>
            <BlackHoleCanvas />
          </div>
        </div>

        {/* Text Content Layer */}
        <div 
          ref={textLayerRef}
          className="relative z-10 pointer-events-none mx-auto flex w-full max-w-5xl flex-col items-center text-center select-none px-5"
          style={{
            transform: 'translateY(40px) scale(1)',
            opacity: 1,
            transformOrigin: 'center center',
          }}
        >
          <div
            ref={textParallaxRef}
            className="w-full flex flex-col items-center justify-center"
          >
            {/* Title — animated with custom character typing cursor */}
            <h1 className="text-[36px] sm:text-[56px] lg:text-[72px] xl:text-[80px] font-black leading-[1.05] tracking-[-0.04em] text-white zavorth-display select-none pointer-events-none">
              <div ref={titleContainerRef} className="typed-container select-none">
                <div className="cursor-container">
                  <div className="blinking-cursor" />
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

            {/* CTA */}
            <div ref={ctaWrapRef} className="mt-12 pointer-events-auto opacity-0">
              <a
                ref={ctaBtnRef}
                href="#overview"
                onClick={scrollToSection}
                className="inline-flex items-center gap-2 rounded-full bg-white/[0.08] border border-white/[0.1] backdrop-blur-md px-8 py-3.5 text-[14px] font-semibold text-white transition-all hover:bg-white/[0.14] hover:border-white/[0.2] hover:scale-[1.03] active:scale-[0.97]"
              >
                Começar agora
              </a>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div 
          ref={scrollIndicatorRef}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10 pointer-events-none opacity-0"
        >
          <div className="scroll-indicator-inner flex flex-col items-center gap-3 transition-opacity duration-300">
            <span className="scroll-indicator-text text-[10px] tracking-wider text-neutral-500 uppercase">Role para continuar</span>
          </div>
        </div>

      </div>
    </section>
  )
}
