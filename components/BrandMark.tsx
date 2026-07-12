'use client'

import React from 'react'

interface BrandMarkProps {
  className?: string
  animated?: boolean
}

/**
 * Zavorth BrandMark — pixel mascot in brand green (#00e88f).
 */
export function BrandMark({ className = 'h-7 w-7', animated = true }: BrandMarkProps) {
  const gradientId = React.useId().replace(/:/g, '')
  const filterId = React.useId().replace(/:/g, '')

  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Zavorth"
      role="img"
      style={{ shapeRendering: 'crispEdges' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="64" y1="64" x2="448" y2="448" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00e88f" />
          <stop offset="100%" stopColor="#00c978" />
        </linearGradient>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter={animated ? `url(#${filterId})` : undefined}>
        {animated ? (
          <animate attributeName="opacity" values="0.9;1;0.9" dur="3.2s" repeatCount="indefinite" />
        ) : null}

        <rect x="128" y="64" width="64" height="128" fill={`url(#${gradientId})`} />
        <rect x="320" y="64" width="64" height="128" fill={`url(#${gradientId})`} />
        <rect x="192" y="192" width="128" height="64" fill={`url(#${gradientId})`} />
        <rect x="64" y="192" width="384" height="128" fill={`url(#${gradientId})`} />
        <rect x="0" y="256" width="64" height="64" fill={`url(#${gradientId})`} />
        <rect x="448" y="256" width="64" height="64" fill={`url(#${gradientId})`} />
        <rect x="64" y="320" width="384" height="96" fill={`url(#${gradientId})`} />
        <rect x="128" y="416" width="96" height="64" fill={`url(#${gradientId})`} />
        <rect x="288" y="416" width="96" height="64" fill={`url(#${gradientId})`} />
        <rect x="160" y="240" width="32" height="64" fill="#000000" />
        <rect x="320" y="240" width="32" height="64" fill="#000000" />
      </g>
    </svg>
  )
}
