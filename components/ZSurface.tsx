'use client'

import React from 'react'

/**
 * Zavorth product surface — not a generic macOS terminal.
 * Brand rail, monogram, segmented status. Used across landing demos.
 */

export function ZMark({ className = '' }: { className?: string }) {
  return (
    <span className={`zs-mark ${className}`.trim()} aria-hidden>
      Z
    </span>
  )
}

export function ZCursor() {
  return <span className="zs-cursor" aria-hidden />
}

type ZSurfaceProps = {
  label: string
  meta?: string
  status?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
  tall?: boolean
}

export function ZSurface({
  label,
  meta = 'local',
  status = 'online',
  children,
  footer,
  className = '',
  tall,
}: ZSurfaceProps) {
  return (
    <div className={`zs-frame ${tall ? 'is-tall' : ''} ${className}`.trim()} data-zavorth-surface>
      <div className="zs-rail" aria-hidden />
      <header className="zs-head">
        <div className="zs-head-left">
          <ZMark />
          <span className="zs-label">{label}</span>
          {meta ? <span className="zs-meta">{meta}</span> : null}
        </div>
        <div className="zs-head-right">
          <span className="zs-status">
            <i />
            {status}
          </span>
        </div>
      </header>
      <div className="zs-body">{children}</div>
      {footer ? <footer className="zs-foot">{footer}</footer> : null}
    </div>
  )
}

type ZRowProps = {
  tone?: 'default' | 'mute' | 'dim' | 'ok' | 'wait' | 'cmd'
  children: React.ReactNode
  faint?: boolean
  className?: string
}

export function ZRow({ tone = 'default', children, faint, className = '' }: ZRowProps) {
  return (
    <div className={`zs-row is-${tone} ${faint ? 'is-faint' : ''} ${className}`.trim()}>
      {children}
    </div>
  )
}
