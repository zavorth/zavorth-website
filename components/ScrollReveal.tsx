'use client'

import { useRef, type ReactNode, type ElementType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type ScrollRevealProps = {
  children: ReactNode
  /** Rendered HTML container element (default: 'section') */
  as?: ElementType
  className?: string
  /** Initial vertical offset in pixels (default: 48) */
  y?: number
  /** Stagger delay between child elements with [data-reveal] in seconds (default: 0.12) */
  stagger?: number
  /** Animation duration in seconds (default: 1) */
  duration?: number
}

/**
 * ScrollReveal — viewport entrance animation with fade and smooth upward translation.
 *
 * Child elements annotated with `data-reveal` are animated sequentially with stagger.
 * If no child element has `data-reveal`, the entire container animates as a single block.
 */
export function ScrollReveal({
  children,
  as: Tag = 'section',
  className,
  y = 48,
  stagger = 0.12,
  duration = 1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const root = ref.current
      if (!root) return

      const prefersReducedMotion =
        typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReducedMotion) return

      const items = root.querySelectorAll<HTMLElement>('[data-reveal]')
      const targets = items.length > 0 ? Array.from(items) : [root]

      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          ease: 'power3.out',
          stagger,
          scrollTrigger: {
            trigger: root,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    },
    { scope: ref }
  )

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
