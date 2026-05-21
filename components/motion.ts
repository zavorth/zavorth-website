import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/* ─── GSAP Plugin Registration ─── */
let pluginsRegistered = false

export function ensureGsapPlugins() {
  if (pluginsRegistered) return
  gsap.registerPlugin(ScrollTrigger)
  pluginsRegistered = true
}

/* ─── GSAP Scroll Reveal ─── */
interface RevealOptions {
  trigger: HTMLElement | string
  start?: string
  y?: number
  duration?: number
  stagger?: number
}

export function createReveal(selector: string, opts: RevealOptions) {
  gsap.fromTo(
    selector,
    { y: opts.y ?? 16, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: opts.duration ?? 0.75,
      ease: 'expo.out',
      stagger: opts.stagger ?? 0.06,
      scrollTrigger: {
        trigger: opts.trigger,
        start: opts.start ?? 'top 78%',
        once: true,
      },
    }
  )
}

/* ─── Framer Motion Variants ─── */
export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: [0.19, 1, 0.22, 1],
    },
  }),
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: 'easeOut',
    },
  }),
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay,
      ease: [0.19, 1, 0.22, 1],
    },
  }),
}

/* ─── Premium GSAP Dynamic Interactions ─── */

/**
 * Tracks the mouse coordinate on a card element and exposes it as CSS variables
 * for a radial spotlight glow effect.
 */
export function initSpotlight(card: HTMLElement) {
  const onMouseMove = (e: MouseEvent) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }
  card.addEventListener('mousemove', onMouseMove)
  return () => card.removeEventListener('mousemove', onMouseMove)
}

/**
 * Tilts a card element in 3D perspective space depending on mouse position.
 */
export function initTilt3D(card: HTMLElement, maxTilt = 6) {
  const onMouseMove = (e: MouseEvent) => {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const xc = rect.width / 2
    const yc = rect.height / 2
    const tiltX = ((y - yc) / yc) * maxTilt
    const tiltY = -((x - xc) / xc) * maxTilt

    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      transformPerspective: 1000,
      ease: 'power2.out',
      duration: 0.4,
    })
  }

  const onMouseLeave = () => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: 'power3.out',
      duration: 0.6,
    })
  }

  card.addEventListener('mousemove', onMouseMove)
  card.addEventListener('mouseleave', onMouseLeave)
  return () => {
    card.removeEventListener('mousemove', onMouseMove)
    card.removeEventListener('mouseleave', onMouseLeave)
  }
}

/**
 * Creates a magnetic attraction effect, pulling the button towards the cursor.
 */
export function initMagnetic(btn: HTMLElement, force = 0.3) {
  const onMouseMove = (e: MouseEvent) => {
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)

    gsap.to(btn, {
      x: x * force,
      y: y * force,
      duration: 0.3,
      ease: 'power2.out',
    })
  }

  const onMouseLeave = () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1.1, 0.4)',
    })
  }

  btn.addEventListener('mousemove', onMouseMove)
  btn.addEventListener('mouseleave', onMouseLeave)
  return () => {
    btn.removeEventListener('mousemove', onMouseMove)
    btn.removeEventListener('mouseleave', onMouseLeave)
  }
}
