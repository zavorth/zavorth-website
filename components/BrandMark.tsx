'use client'

import React from 'react'

interface BrandMarkProps {
  className?: string
  animated?: boolean
}

/**
 * Zavorth BrandMark — AI Spark / Geometric Star
 *
 * A modern, Google/Gemini-style 4-point star representing artificial intelligence.
 * Clean, minimalistic, with a subtle glow and premium gradient.
 */
export function BrandMark({ className = 'h-7 w-7', animated = true }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Zavorth Logo"
      role="img"
    >
      <defs>
        {/* Deep background glow */}
        <radialGradient id="star-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>

        {/* Primary bright gold gradient */}
        <linearGradient id="star-gradient" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>

        {/* Subtle glow filter */}
        <filter id="star-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ambient glow behind */}
      <circle cx="50" cy="50" r="45" fill="url(#star-bg-glow)" />

      {/* Rotating outer ring if animated */}
      {animated && (
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="url(#star-gradient)"
          strokeWidth="0.5"
          strokeDasharray="2 6"
          opacity="0.3"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="30s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* Primary 4-point AI star */}
      <path
        d="M 50 15 C 50 38 38 50 15 50 C 38 50 50 62 50 85 C 50 62 62 50 85 50 C 62 50 50 38 50 15 Z"
        fill="url(#star-gradient)"
        filter="url(#star-glow)"
      />

      {/* Secondary smaller star offset */}
      <path
        d="M 75 18 C 75 26 69 32 61 32 C 69 32 75 38 75 46 C 75 38 81 32 89 32 C 81 32 75 26 75 18 Z"
        fill="#FEF3C7"
        opacity="0.9"
        filter="url(#star-glow)"
      />
    </svg>
  )
}
