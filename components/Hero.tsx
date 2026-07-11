'use client'

import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { BlackHoleCanvas } from './BlackHoleCanvas'

const lineOne = 'A IA que trabalha no seu computador.'
const lineTwo = 'Com você decidindo o que importa.'

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
      const damping = targetProgress > currentProgress ? 0.35 : 0.45
      currentProgress += (targetProgress - currentProgress) * damping

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

      let elapsed = 300 // ms

      chars.forEach((char, index) => {
        const value = char.textContent || ''
        let delay = 82
        if (/[.,?!;:]/.test(value)) delay = 280
        delay = Math.round(delay * (0.9 + Math.random() * 0.16))

        const timeout = setTimeout(() => {
          if (cancelled) return
          char.style.opacity = '1'
          updateTypingCursor(char, 'after')

          // Pulse cursor with GSAP
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
      }, elapsed + 200)
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
    <section ref={sectionRef} id="hero" className="relative h-[165vh] bg-black">
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

          <div className={`mt-12 flex justify-center items-center gap-6 sm:gap-9 pointer-events-auto transition-opacity duration-1000 ${typed ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            {/* OpenAI */}
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current text-neutral-600 transition-all duration-300 hover:text-[#10a37f] hover:scale-110 cursor-help"
            >
              <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
            </svg>

            {/* Anthropic Claude */}
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current text-neutral-600 transition-all duration-300 hover:text-[#d97757] hover:scale-110 cursor-help"
            >
              <path d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z" />
            </svg>

            {/* Google Gemini */}
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current text-neutral-600 transition-all duration-300 hover:text-[#8e75ff] hover:scale-110 cursor-help"
            >
              <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
            </svg>

            {/* GitHub */}
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current text-neutral-600 transition-all duration-300 hover:text-white hover:scale-110 cursor-help"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>

            {/* Telegram */}
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current text-neutral-600 transition-all duration-300 hover:text-[#229ED9] hover:scale-110 cursor-help"
            >
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>

            {/* Discord */}
            <svg
              role="img"
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-current text-neutral-600 transition-all duration-300 hover:text-[#5865F2] hover:scale-110 cursor-help"
            >
              <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
            </svg>
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
