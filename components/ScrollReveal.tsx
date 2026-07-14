'use client'

import { useRef, type ReactNode, type ElementType } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

type ScrollRevealProps = {
  children: ReactNode
  /** Elemento HTML renderizado (padrão: section) */
  as?: ElementType
  className?: string
  /** Deslocamento vertical inicial em px (padrão: 48) */
  y?: number
  /** Atraso em cascata entre filhos com [data-reveal] (padrão: 0.12s) */
  stagger?: number
  /** Duração da animação (padrão: 1s) */
  duration?: number
}

/**
 * ScrollReveal — animação de entrada premium ao rolar (fade + movimento suave).
 *
 * Todos os elementos filhos marcados com `data-reveal` animam em cascata
 * quando a seção entra na viewport. Se nenhum filho tiver `data-reveal`,
 * a seção inteira anima como um bloco único.
 *
 * Exemplo:
 *   <ScrollReveal className="py-32">
 *     <h2 data-reveal>Título</h2>
 *     <p data-reveal>Descrição</p>
 *     <div data-reveal>Conteúdo</div>
 *   </ScrollReveal>
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
