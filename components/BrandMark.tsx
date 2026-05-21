'use client'

import React from 'react'

interface BrandMarkProps {
  className?: string
  animated?: boolean
}

/**
 * Zavorth BrandMark — "Geometric Amber Fox"
 *
 * A premium, modern, and beautiful geometric fox icon designed for Zavorth.
 * Uses a low-poly styled layout with golden ratios, rich amber/gold gradients,
 * drop shadows, and subtle inner glows to look extremely premium.
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
        <radialGradient id="fox-bg-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </radialGradient>

        {/* Primary bright gold gradient */}
        <linearGradient id="fox-gold-bright" x1="50" y1="15" x2="50" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>

        {/* Deep amber gradient for contrast/shadow areas */}
        <linearGradient id="fox-amber-dark" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#B45309" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        {/* Medium amber gradient */}
        <linearGradient id="fox-amber-mid" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>

        {/* Glowing eyes filter */}
        <filter id="eye-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Soft shadow for the entire fox */}
        <filter id="fox-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Ambient background glow behind the fox */}
      <circle cx="50" cy="50" r="45" fill="url(#fox-bg-glow)" />

      {/* Rotating orbit ring if animated */}
      {animated && (
        <circle
          cx="50"
          cy="50"
          r="42"
          stroke="url(#fox-gold-bright)"
          strokeWidth="0.8"
          strokeDasharray="4 12"
          opacity="0.25"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="25s"
            repeatCount="indefinite"
          />
        </circle>
      )}

      {/* The Fox Symbol Group */}
      <g filter="url(#fox-shadow)">
        {/* Outer Left Ear */}
        <path
          d="M 50 45 L 20 15 L 36 48 Z"
          fill="url(#fox-amber-dark)"
        />

        {/* Outer Right Ear */}
        <path
          d="M 50 45 L 80 15 L 64 48 Z"
          fill="url(#fox-amber-dark)"
        />

        {/* Inner Left Ear - highlighted facet */}
        <path
          d="M 50 45 L 26 21 L 36 48 Z"
          fill="url(#fox-gold-bright)"
          opacity="0.85"
        />

        {/* Inner Right Ear - highlighted facet */}
        <path
          d="M 50 45 L 74 21 L 64 48 Z"
          fill="url(#fox-gold-bright)"
          opacity="0.85"
        />

        {/* Left Cheek */}
        <path
          d="M 20 54 L 36 48 L 50 68 Z"
          fill="url(#fox-amber-mid)"
        />

        {/* Right Cheek */}
        <path
          d="M 80 54 L 64 48 L 50 68 Z"
          fill="url(#fox-amber-mid)"
        />

        {/* Left Outer Cheek Wing */}
        <path
          d="M 20 54 L 32 64 L 50 68 Z"
          fill="url(#fox-amber-dark)"
        />

        {/* Right Outer Cheek Wing */}
        <path
          d="M 80 54 L 68 64 L 50 68 Z"
          fill="url(#fox-amber-dark)"
        />

        {/* Central Forehead (Testa) */}
        <path
          d="M 50 32 L 36 48 L 50 68 L 64 48 Z"
          fill="url(#fox-gold-bright)"
        />

        {/* Focinho / Snout Left */}
        <path
          d="M 50 68 L 32 64 L 50 88 Z"
          fill="url(#fox-amber-mid)"
        />

        {/* Focinho / Snout Right */}
        <path
          d="M 50 68 L 68 64 L 50 88 Z"
          fill="url(#fox-amber-dark)"
        />

        {/* Nose Tip - small diamond */}
        <path
          d="M 50 84 L 47 88 L 50 91 L 53 88 Z"
          fill="#1E293B"
        />

        {/* Left Glowing Eye */}
        <path
          d="M 39 52 L 45 54 L 43 56 Z"
          fill="#FFF"
          filter="url(#eye-glow)"
        />
        <path
          d="M 39 52 L 45 54 L 43 56 Z"
          fill="#FBBF24"
        />

        {/* Right Glowing Eye */}
        <path
          d="M 61 52 L 55 54 L 57 56 Z"
          fill="#FFF"
          filter="url(#eye-glow)"
        />
        <path
          d="M 61 52 L 55 54 L 57 56 Z"
          fill="#FBBF24"
        />
      </g>
    </svg>
  )
}
