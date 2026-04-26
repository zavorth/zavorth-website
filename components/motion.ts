'use client'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

let registered = false

/*
  Shared motion helpers for the Basilisk marketing site.

  Rules:
  - core content must render visible by default;
  - GSAP enhances layout, it never gates readability;
  - reduced motion should collapse to the final visual state cleanly.
*/

export function ensureGsapPlugins() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)
    registered = true
  }
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

type RevealOptions = {
  trigger?: Element | string
  start?: string
  y?: number
  duration?: number
  stagger?: number
}

export function createReveal(
  targets: gsap.TweenTarget,
  {
    trigger,
    start = 'top 72%',
    y = 18,
    duration = 0.7,
    stagger = 0.08,
  }: RevealOptions = {}
) {
  if (prefersReducedMotion()) return null

  return gsap.from(targets, {
    y,
    duration,
    ease: 'expo.out',
    stagger,
    clearProps: 'transform',
    scrollTrigger: trigger
      ? {
          trigger,
          start,
          once: true,
        }
      : undefined,
  })
}

type LineDrawOptions = {
  trigger?: Element | string
  start?: string
  end?: string
  scrub?: number | boolean
  duration?: number
  ease?: string
}

export function setupLineDraw(path: SVGPathElement) {
  const length = path.getTotalLength()
  gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
  return length
}

export function animateLineDraw(
  path: SVGPathElement,
  {
    trigger,
    start = 'top 78%',
    end,
    scrub,
    duration = 1.2,
    ease = 'power2.inOut',
  }: LineDrawOptions = {}
) {
  if (prefersReducedMotion()) {
    gsap.set(path, { strokeDashoffset: 0 })
    return null
  }

  return gsap.to(path, {
    strokeDashoffset: 0,
    duration,
    ease,
    scrollTrigger: trigger
      ? {
          trigger,
          start,
          end,
          scrub,
        }
      : undefined,
  })
}

export function attachMagneticGlow(
  root: ParentNode,
  selector = '.magnetic-glow'
) {
  if (
    typeof window === 'undefined'
    || prefersReducedMotion()
    || !window.matchMedia('(pointer: fine)').matches
  ) {
    return () => {}
  }

  const cards = Array.from(root.querySelectorAll<HTMLElement>(selector))

  const onMove = (event: PointerEvent) => {
    const target = event.currentTarget as HTMLElement | null
    if (!target) return
    const rect = target.getBoundingClientRect()
    target.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`)
    target.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`)
  }

  cards.forEach((card) => {
    card.addEventListener('pointermove', onMove)
  })

  return () => {
    cards.forEach((card) => {
      card.removeEventListener('pointermove', onMove)
    })
  }
}
