'use client'

import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'

const BlackHoleCanvas = dynamic(
  () => import('./BlackHoleCanvas').then((mod) => mod.BlackHoleCanvas),
  { ssr: false }
)

const lineOne = 'A IA que trabalha no seu computador.'
const lineTwo = 'Com voce decidindo o que importa.'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const textLayerRef = useRef<HTMLDivElement>(null)
  const titleContainerRef = useRef<HTMLDivElement>(null)

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
      const damping = targetProgress > currentProgress ? 0.22 : 0.3
      currentProgress += (targetProgress - currentProgress) * damping

      if (textLayer) {
        const textOpacity = Math.max(0, 1 - currentProgress * 1.45)
        textLayer.style.opacity = `${textOpacity}`
        textLayer.style.transform = `translateY(${currentProgress * -18}px) scale(${1 - currentProgress * 0.36})`
      }

      if (canvasWrap) {
        const exitProgress = Math.max(0, (currentProgress - 0.78) / 0.22)
        canvasWrap.style.opacity = `${Math.max(0.28, 1 - exitProgress)}`
        canvasWrap.style.transform = `scale(${1 - currentProgress * 0.06})`
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

    if (chars.length === 0) return

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

    updateTypingCursor(chars[0], 'before')
    if (cursorContainer) cursorContainer.style.opacity = '1'

    const timeline = gsap.timeline({
      onComplete: () => {
        if (cursorContainer) cursorContainer.style.opacity = '0'
        window.dispatchEvent(new CustomEvent('hero-title-typed'))
      },
    })

    let elapsed = 0.3
    chars.forEach((char) => {
      const value = char.textContent || ''
      let delay = 0.082
      if (/[.,?!;:]/.test(value)) delay = 0.28
      delay = delay * (0.9 + Math.random() * 0.16)

      timeline.call(() => {
        char.style.opacity = '1'
        updateTypingCursor(char, 'after')
        if (bar) {
          gsap.fromTo(
            bar,
            {
              scaleY: 1.18,
              boxShadow:
                '0 0 22px rgba(245,158,11,0.95), 0 0 38px rgba(255,255,255,0.52), 0 0 52px rgba(236,72,153,0.28)',
            },
            {
              scaleY: 1,
              boxShadow:
                '0 0 14px rgba(245,158,11,0.72), 0 0 28px rgba(236,72,153,0.28), 0 0 36px rgba(59,130,246,0.22)',
              duration: 0.18,
              ease: 'power2.out',
            }
          )
        }
      }, undefined, elapsed)

      elapsed += delay
    })

    return () => {
      timeline.kill()
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
    <section ref={sectionRef} id="hero" className="relative h-[165vh] bg-black">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div
          ref={canvasWrapRef}
          className="absolute inset-0 origin-center"
        >
          <BlackHoleCanvas />
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
