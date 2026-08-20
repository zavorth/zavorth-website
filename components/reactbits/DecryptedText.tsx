'use client'

import React, { useEffect, useState, useRef } from 'react'

interface DecryptedTextProps {
  text: string
  speed?: number
  maxIterations?: number
  characters?: string
  className?: string
  encryptedClassName?: string
  animateOn?: 'view' | 'hover' | 'both'
  revealDirection?: 'start' | 'end' | 'center'
  useOriginalCharsOnly?: boolean
}

const DEFAULT_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'

export function DecryptedText({
  text,
  speed = 40,
  maxIterations = 10,
  characters = DEFAULT_CHARS,
  className = '',
  encryptedClassName = 'text-[#00e88f]/80 font-mono',
  animateOn = 'view',
  revealDirection = 'start',
  useOriginalCharsOnly = false,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isScrambling, setIsScrambling] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)
  const hasAnimatedRef = useRef(false)

  const availableChars = useOriginalCharsOnly
    ? Array.from(new Set(text.split(''))).filter((c) => c !== ' ').join('')
    : characters

  const shuffleText = () => {
    let iteration = 0
    setIsScrambling(true)

    const interval = setInterval(() => {
      setDisplayText(() => {
        return text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' '
            
            const progress = iteration / maxIterations
            const shouldReveal =
              revealDirection === 'start'
                ? index / text.length <= progress
                : revealDirection === 'end'
                ? (text.length - index) / text.length <= progress
                : Math.abs(index - text.length / 2) / (text.length / 2) >= 1 - progress

            if (shouldReveal) {
              return char
            }

            return availableChars[Math.floor(Math.random() * availableChars.length)] || char
          })
          .join('')
      })

      iteration += 1

      if (iteration > maxIterations) {
        clearInterval(interval)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, speed)
  }

  useEffect(() => {
    if (animateOn === 'hover') return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true
            shuffleText()
          }
        })
      },
      { threshold: 0.2 }
    )

    const el = elementRef.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
    }
  }, [animateOn, text])

  const handleMouseEnter = () => {
    if ((animateOn === 'hover' || animateOn === 'both') && !isScrambling) {
      shuffleText()
    }
  }

  return (
    <span
      ref={elementRef}
      onMouseEnter={handleMouseEnter}
      className={`inline-block ${className} ${isScrambling ? encryptedClassName : ''}`}
    >
      {displayText}
    </span>
  )
}
