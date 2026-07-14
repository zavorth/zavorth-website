'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { BlackHoleCanvas } from './BlackHoleCanvas'
import { HeroSupportMarquee } from './HeroSupportMarquee'

const lineOne = 'A IA que opera no seu computador.'
const lineTwo = 'Com você no controle das decisões.'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const textLayerRef = useRef<HTMLDivElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const [canvasReady, setCanvasReady] = useState(false)
  const [typed, setTyped] = useState(false)

  // Client-only mount flag for the black hole canvas; honor reduced motion.
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTyped(true)
    }
    setCanvasReady(true)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const canvasWrap = canvasWrapRef.current
    const textLayer = textLayerRef.current
    if (!section) return

    let targetProgress = 0
    let currentProgress = 0
    let active = true

    const handleScroll = () => {
      const rect = section.getBoundingClientRect()
      // Use whole hero section height for scroll progress (landing composition contract).
      const scrollableHeight = Math.max(1, rect.height)
      targetProgress = rect.top < 0 ? Math.min(1, -rect.top / scrollableHeight) : 0
    }

    const update = () => {
      if (!active) return
      currentProgress += (targetProgress - currentProgress) * 0.9

      if (textLayer) {
        const textOpacity = Math.max(0, 1 - currentProgress * 1.5)
        textLayer.style.opacity = `${textOpacity}`
        textLayer.style.transform = `translateY(${currentProgress * -40}px) scale(${1 - currentProgress * 0.4})`
      }

      if (canvasWrap) {
        // Smooth, gradual fade starting at 30% scroll progress
        const canvasOpacity = Math.max(0, 1 - currentProgress * 1.2)
        canvasWrap.style.opacity = `${canvasOpacity}`
        canvasWrap.style.transform = `scale(${1 - currentProgress * 0.15})`
      }

      requestAnimationFrame(update)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    requestAnimationFrame(update)

    return () => {
      active = false
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const container = titleContainerRef.current
    if (!container) return

    const chars = Array.from(container.querySelectorAll('.char')) as HTMLSpanElement[]
    const cursorContainer = container.querySelector('.cursor-container') as HTMLDivElement | null
    const bar = container.querySelector('.blinking-cursor') as HTMLDivElement | null

    if (chars.length === 0 || !cursorContainer || !bar) return

    let cancelled = false
    let timeouts: ReturnType<typeof setTimeout>[] = []

    const updateTypingCursor = (target: HTMLSpanElement, side: 'before' | 'after' = 'after') => {
      if (!cursorContainer || !bar) return
      const targetRect = target.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const targetX = side === 'before'
        ? targetRect.left - containerRect.left - 2
        : targetRect.left - containerRect.left + targetRect.width + 7
      const targetY = targetRect.top - containerRect.top
      const cursorHeight = Math.max(28, targetRect.height * 0.92)
      cursorContainer.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
      bar.style.height = `${cursorHeight}px`
    }

    // Wait for layout to stabilize before positioning cursor
    const startTyping = () => {
      if (cancelled) return

      // Show cursor at start position
      cursorContainer.style.opacity = '1'
      updateTypingCursor(chars[0], 'before')

      let elapsed = 80 // ms — quick start

      chars.forEach((char) => {
        const value = char.textContent || ''
        // ~2.5–3× faster than the original typing cadence
        let delay = 30
        if (/[.,?!;:]/.test(value)) delay = 90
        if (value === ' ') delay = 18
        delay = Math.round(delay * (0.92 + Math.random() * 0.12))

        const timeout = setTimeout(() => {
          if (cancelled) return
          char.style.opacity = '1'
          updateTypingCursor(char, 'after')

          // Pulse cursor with GSAP (snappier)
          gsap.fromTo(
            bar,
            {
              scaleY: 1.12,
              boxShadow:
                '0 0 22px rgba(245,158,11,0.95), 0 0 38px rgba(255,255,255,0.52), 0 0 52px rgba(236,72,153,0.28)',
            },
            {
              scaleY: 1,
              boxShadow:
                '0 0 14px rgba(245,158,11,0.72), 0 0 28px rgba(236,72,153,0.28), 0 0 36px rgba(59,130,246,0.22)',
              duration: 0.12,
              ease: 'power2.out',
            }
          )
        }, elapsed)
        timeouts.push(timeout)

        elapsed += delay
      })

      // Hide cursor after typing completes
      const completeTimeout = setTimeout(() => {
        if (cancelled) return
        cursorContainer.style.opacity = '0'
        setTyped(true)
        window.dispatchEvent(new CustomEvent('hero-title-typed'))
      }, elapsed + 80)
      timeouts.push(completeTimeout)
    }

    // Start after layout is ready
    const raf = requestAnimationFrame(() => {
      startTyping()
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      timeouts.forEach(clearTimeout)
    }
  }, [])

  const renderLine = (text: string, key: string) =>
    text.split(' ').map((word, wordIndex, words) => (
      <React.Fragment key={`${key}-word-${wordIndex}`}>
        <span className="inline-block">
          {word.split('').map((char, charIndex) => (
            <span key={`${key}-${wordIndex}-${charIndex}`} className="char inline-block" style={{ opacity: 0 }}>
              {char}
            </span>
          ))}
        </span>
        {wordIndex < words.length - 1 ? <span aria-hidden="true"> </span> : null}
      </React.Fragment>
    ))

  return (
    <section ref={sectionRef} id="hero" className="relative h-[125vh] bg-black">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div
          ref={canvasWrapRef}
          className="absolute inset-0 origin-center"
        >
          {canvasReady ? <BlackHoleCanvas /> : (
            <div className="relative w-full h-full select-none">
              <div
                data-black-hole-placeholder
                className="absolute inset-0 z-0 h-[120%] w-full pointer-events-auto -translate-y-[15%] sm:-translate-y-[18%]"
                style={{ background: 'transparent' }}
              />
            </div>
          )}
        </div>

        <div
          ref={textLayerRef}
          className="relative z-10 mx-auto w-full max-w-6xl px-5 text-center pointer-events-none"
        >
          <h1 className="mx-auto max-w-[92vw] select-none text-[32px] font-medium leading-[1.08] tracking-normal text-white/95 sm:text-[50px] lg:text-[68px]">
            <span ref={titleContainerRef} className="relative inline-block max-w-full">
              <span className="cursor-container pointer-events-none absolute left-0 top-0 z-20" style={{ opacity: 0 }}>
                <span className="blinking-cursor block w-[5px] rounded-full" style={{ height: '56px' }} />
              </span>
              <span className="block">{renderLine(lineOne, 'line-one')}</span>
              <span className="block text-amber-400">{renderLine(lineTwo, 'line-two')}</span>
            </span>
          </h1>

          <div
            className={`mt-8 flex w-full flex-col items-center gap-7 pointer-events-auto transition-opacity duration-1000 ${
              typed ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
              Runtime local com habilidades, memória e aprovação obrigatória em ações sensíveis.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-3.5">
              <a href="/demo" className="hero-btn hero-btn-primary">
                Ver demonstração
              </a>
              <a href="#install" className="hero-btn hero-btn-ghost">
                Instalar
              </a>
            </div>
            <HeroSupportMarquee />
          </div>
        </div>
      </div>
      <style jsx>{`
        .cursor-container {
          will-change: transform, opacity;
        }

        .blinking-cursor {
          background: linear-gradient(180deg, #ffffff 0%, #fbbf24 32%, #f59e0b 56%, #ec4899 78%, #3b82f6 100%);
          box-shadow:
            0 0 14px rgba(245, 158, 11, 0.72),
            0 0 28px rgba(236, 72, 153, 0.28),
            0 0 36px rgba(59, 130, 246, 0.22);
          animation: heroCursorBlink 1080ms steps(2, end) infinite;
          transform-origin: center;
        }

        @keyframes heroCursorBlink {
          0%, 78% { opacity: 1; }
          79%, 100% { opacity: 0.32; }
        }
      `}</style>
    </section>
  )
}
