'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface BlurTextProps {
  text: string
  delay?: number
  className?: string
  animateBy?: 'words' | 'letters'
  direction?: 'top' | 'bottom'
  threshold?: number
}

export function BlurText({
  text,
  delay = 50,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.2,
}: BlurTextProps) {
  const containerRef = useRef<HTMLHeadingElement>(null)

  const elements = animateBy === 'words' ? text.split(' ') : text.split('')

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Honor reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const targets = el.querySelectorAll('.blur-unit')
    const yOffset = direction === 'top' ? -18 : 18

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: yOffset,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: delay / 1000,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [delay, direction])

  return (
    <h2 ref={containerRef} className={`inline-block ${className}`}>
      {elements.map((unit, index) => (
        <span
          key={index}
          className="blur-unit inline-block transition-transform will-change-[transform,filter,opacity]"
        >
          {unit === ' ' ? '\u00A0' : unit}
          {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
        </span>
      ))}
    </h2>
  )
}
