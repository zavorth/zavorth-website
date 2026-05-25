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

  const [titleTyped, setTitleTyped] = useState(false)

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

  // Simple, robust text slide up animation
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTitleTyped(true)
        window.dispatchEvent(new CustomEvent('hero-title-typed'))
      }
    })

    // Canvas handles its own fade internally

    // Slide up Line 1
    tl.fromTo('.hero-line-1',
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1 }
    )

    // Slide up Line 2
    tl.fromTo('.hero-line-2',
      { opacity: 0, y: 35 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' },
      '-=0.6'
    )

    // Slide up CTA
    tl.fromTo(ctaWrapRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    )

    // Fade in scroll indicator
    tl.fromTo(scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.3'
    )

    return () => {
      tl.kill()
    }
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
            {/* Title */}
            <h1 className="text-[36px] sm:text-[56px] lg:text-[72px] xl:text-[80px] font-black leading-[1.05] tracking-[-0.04em] text-white zavorth-display select-none pointer-events-none">
              <div className="hero-line-1 opacity-0">Uma IA que trabalha</div>
              <div className="hero-line-2 text-amber-500 opacity-0 mt-1">com você — não por trás.</div>
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
