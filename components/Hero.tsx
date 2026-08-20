'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { Copy, Check, ArrowRight } from 'lucide-react'
import { BlackHoleCanvas } from './BlackHoleCanvas'
import { HeroSupportMarquee } from './HeroSupportMarquee'
import { Magnet } from './reactbits/Magnet'

const lineOne = 'A IA que opera no seu computador.'
const lineTwo = 'Com você no controle das decisões.'
const INSTALL_CMD = 'npm install -g zavorth@latest'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const textLayerRef = useRef<HTMLDivElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)
  const [canvasReady, setCanvasReady] = useState(false)
  const [typed, setTyped] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = INSTALL_CMD
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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

    const startTyping = () => {
      if (cancelled || !cursorContainer) return

      cursorContainer.style.opacity = '1'
      const firstChar = chars[0]
      if (firstChar) {
        updateTypingCursor(firstChar, 'before')
      }

      const charDuration = 22
      let elapsed = 100

      chars.forEach((char, index) => {
        const timeout = setTimeout(() => {
          if (cancelled) return
          char.style.opacity = '1'
          updateTypingCursor(char, 'after')
        }, elapsed)

        timeouts.push(timeout)
        elapsed += charDuration
      })

      const completeTimeout = setTimeout(() => {
        if (cancelled) return
        setTyped(true)
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('hero-title-typed'))
        }
      }, elapsed + 80)
      timeouts.push(completeTimeout)
    }

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
            className={`mt-8 flex w-full flex-col items-center gap-6 pointer-events-auto transition-opacity duration-1000 ${
              typed ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-neutral-400 sm:text-[15px]">
              Runtime local com habilidades, memória e aprovação obrigatória em ações sensíveis.
            </p>

            {/* Modern Terminal-Style Quick Install & Demo with React Bits Magnet */}
            <div className="flex flex-wrap items-center justify-center gap-3.5">
              
              {/* Magnetic Terminal Quick Copy Capsule */}
              <Magnet magnetStrength={0.25} padding={30}>
                <div 
                  onClick={handleCopy}
                  className="group flex items-center gap-3 px-4 py-2 rounded-full border border-white/[0.12] bg-black/60 backdrop-blur-2xl hover:border-[#00e88f]/50 hover:shadow-[0_0_25px_rgba(0,232,143,0.15)] transition-all duration-300 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-2 font-mono text-xs text-neutral-300">
                    <span className="text-[#00e88f] font-bold">$</span>
                    <span className="text-white font-normal">{INSTALL_CMD}</span>
                  </div>
                  
                  <button
                    type="button"
                    className="p-1 rounded-full text-neutral-400 group-hover:text-[#00e88f] transition-colors"
                    aria-label="Copiar comando de instalação"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-[#00e88f]" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </Magnet>

              {/* Magnetic Demo CTA */}
              <Magnet magnetStrength={0.25} padding={30}>
                <a
                  href="/demo"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/[0.1] bg-white/[0.04] text-xs font-mono text-neutral-300 hover:text-white hover:bg-white/[0.08] hover:border-white/[0.2] transition-all duration-200"
                >
                  <span>Ver demonstração</span>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                </a>
              </Magnet>

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
