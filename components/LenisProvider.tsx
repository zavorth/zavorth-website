'use client'

import { useEffect, type ReactNode } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * LenisProvider — rolagem suave premium sincronizada com GSAP ScrollTrigger.
 *
 * Uso (app/layout.tsx):
 *   <body>
 *     <LenisProvider>{children}</LenisProvider>
 *   </body>
 *
 * Notas importantes:
 * - `syncTouch: false` mantém o scroll por toque 100% nativo no mobile,
 *   o que preserva a correção de scroll do BlackHoleCanvas (touch-action: pan-y).
 * - O RAF do Lenis é dirigido pelo ticker do GSAP, garantindo que o
 *   ScrollTrigger e o Lenis fiquem perfeitamente sincronizados.
 * - Respeita prefers-reduced-motion: se ativo, não inicializa o smooth scroll.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const prefersReducedMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    const lenis = new Lenis({
      lerp: 0.1, // suavidade da interpolação (menor = mais "flutuante")
      smoothWheel: true, // scroll suave no desktop (roda do mouse)
      syncTouch: false, // mobile permanece nativo — essencial para o canvas
      wheelMultiplier: 1,
    })

    // Mantém o ScrollTrigger atualizado a cada frame de scroll do Lenis
    lenis.on('scroll', ScrollTrigger.update)

    // Dirige o Lenis pelo ticker do GSAP (um único RAF para tudo)
    const raf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
