'use client'

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { prefersReducedMotion } from './motion'

type BrandMarkProps = {
  className?: string
  animated?: boolean
}

export function BrandMark({ className = '', animated = false }: BrandMarkProps) {
  const ringRef = useRef<SVGGElement>(null)

  useLayoutEffect(() => {
    if (!animated || !ringRef.current || prefersReducedMotion()) return

    const ctx = gsap.context(() => {
      gsap.to(ringRef.current, {
        rotate: 360,
        transformOrigin: '50% 50%',
        duration: 30,
        ease: 'none',
        repeat: -1,
      })
    })

    return () => ctx.revert()
  }, [animated])

  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="bsk-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.12" />
        </linearGradient>
      </defs>
      <g ref={ringRef}>
        <circle cx="16" cy="16" r="13" stroke="url(#bsk-ring)" strokeWidth="1.1" />
        <circle cx="16" cy="3" r="1.1" fill="#10b981" />
      </g>
      <path
        d="M16 6L23 10.5V19.5L16 24L9 19.5V10.5L16 6Z"
        stroke="#10b981"
        strokeWidth="1"
        fill="rgba(16, 185, 129, 0.04)"
        opacity="0.5"
      />
      <circle cx="16" cy="16" r="3" fill="#10b981" />
      <circle cx="16" cy="16" r="5.5" stroke="#10b981" strokeWidth="0.5" opacity="0.3" />
    </svg>
  )
}
