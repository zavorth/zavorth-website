'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

interface MagnetProps {
  children: React.ReactNode
  padding?: number
  disabled?: boolean
  magnetStrength?: number
  activeTransition?: string
  inactiveTransition?: string
  wrapperClassName?: string
  innerClassName?: string
}

export function Magnet({
  children,
  padding = 40,
  disabled = false,
  magnetStrength = 0.35,
  wrapperClassName = '',
  innerClassName = '',
}: MagnetProps) {
  const magnetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = magnetRef.current
    if (!el || disabled) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power2.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power2.out' })

    const onPointerMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const distX = e.clientX - centerX
      const distY = e.clientY - centerY

      const distance = Math.hypot(distX, distY)
      const radius = Math.max(rect.width, rect.height) / 2 + padding

      if (distance < radius) {
        xTo(distX * magnetStrength)
        yTo(distY * magnetStrength)
      } else {
        xTo(0)
        yTo(0)
      }
    }

    const onPointerLeave = () => {
      xTo(0)
      yTo(0)
    }

    window.addEventListener('mousemove', onPointerMove)
    el.addEventListener('mouseleave', onPointerLeave)

    return () => {
      window.removeEventListener('mousemove', onPointerMove)
      el.removeEventListener('mouseleave', onPointerLeave)
    }
  }, [disabled, magnetStrength, padding])

  return (
    <div className={`inline-block ${wrapperClassName}`}>
      <div ref={magnetRef} className={`will-change-transform ${innerClassName}`}>
        {children}
      </div>
    </div>
  )
}
