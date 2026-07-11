'use client'

import React from 'react'

interface BrandMarkProps {
  className?: string
  animated?: boolean
}

/**
 * Zavorth BrandMark — geometric Z-path mark on a dark rounded square.
 * Matches product logo.svg / favicon.svg (green stroke path + node).
 */
export function BrandMark({ className = 'h-7 w-7', animated = true }: BrandMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Zavorth Logo"
      role="img"
    >
      <defs>
        <filter id="zavorth-mark-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="64" height="64" rx="18" fill="#060809" />
      <rect x="7" y="7" width="50" height="50" rx="15" fill="#00e88f" opacity="0.12" />

      <path
        d="M19 19h28L24 45h28"
        fill="none"
        stroke="#00e88f"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={animated ? 'url(#zavorth-mark-glow)' : undefined}
      >
        {animated ? (
          <animate
            attributeName="opacity"
            values="0.88;1;0.88"
            dur="3.2s"
            repeatCount="indefinite"
          />
        ) : null}
      </path>

      <circle cx="46" cy="18" r="4" fill="#00e88f">
        {animated ? (
          <animate
            attributeName="opacity"
            values="0.75;1;0.75"
            dur="2.4s"
            repeatCount="indefinite"
          />
        ) : null}
      </circle>
    </svg>
  )
}
