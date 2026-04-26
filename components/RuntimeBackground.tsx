'use client'

import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

export default function RuntimeBackground({ className = '' }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const topoRef = useRef<SVGSVGElement>(null)
  const veil1Ref = useRef<HTMLDivElement>(null)
  const veil2Ref = useRef<HTMLDivElement>(null)
  const veil3Ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Gentle pan for the topography
    gsap.to(topoRef.current, {
      x: '-3%',
      y: '2%',
      duration: 30,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    // Fluid, organic motions for the veils
    gsap.to(veil1Ref.current, {
      x: '15%',
      y: '5%',
      rotation: 10,
      scale: 1.1,
      duration: 22,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    gsap.to(veil2Ref.current, {
      x: '-10%',
      y: '-8%',
      rotation: -5,
      scale: 1.15,
      duration: 28,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    gsap.to(veil3Ref.current, {
      x: '5%',
      y: '10%',
      rotation: 8,
      scale: 1.05,
      duration: 25,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
  }, { scope: rootRef })

  return (
    <div ref={rootRef} className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      
      {/* ─── 1. TOPOGRAPHY LAYER ─── */}
      <div className="absolute inset-0 opacity-[0.15] scale-[1.1] transform-gpu">
        <svg
          ref={topoRef}
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="topo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(16, 185, 129, 0.4)" />
              <stop offset="50%" stopColor="rgba(52, 211, 153, 0.16)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0.1)" />
            </linearGradient>
            <linearGradient id="topo-flow" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(16,185,129,0.8)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>

          {/* Static contour lines for structure */}
          <g stroke="url(#topo-grad)" strokeWidth="0.1" fill="none">
            <path d="M-10,20 Q30,40 50,20 T110,30" />
            <path d="M-10,35 Q40,60 60,30 T110,45" />
            <path d="M-10,50 Q45,80 70,40 T110,60" />
            <path d="M-10,65 Q50,100 80,50 T110,75" />
            <path d="M-10,80 Q55,120 90,60 T110,90" />
            
            <path d="M10,-10 Q30,40 20,60 T30,110" />
            <path d="M30,-10 Q50,45 35,65 T45,110" />
            <path d="M50,-10 Q70,50 50,70 T60,110" />
            <path d="M70,-10 Q90,55 65,75 T75,110" />
            <path d="M90,-10 Q110,60 80,80 T90,110" />
          </g>

          {/* Animated signal pulses tracing the topography */}
          <g stroke="url(#topo-flow)" strokeWidth="0.15" fill="none" className="topo-signal" strokeDasharray="100" strokeDashoffset="100">
            <path d="M-10,35 Q40,60 60,30 T110,45" />
            <path d="M30,-10 Q50,45 35,65 T45,110" />
          </g>
        </svg>
      </div>

      {/* ─── 2. SIGNAL VEILS ─── */}
      <div className="absolute inset-0 mix-blend-screen opacity-60">
        
        {/* Veil 1 - Bottom/Left Flow */}
        <div 
          ref={veil1Ref}
          className="absolute -bottom-[20%] -left-[10%] w-[120%] h-[60%] rounded-[100%] blur-[120px] transform-gpu pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0) 70%)'
          }}
        />

        {/* Veil 2 - Top/Right Flow */}
        <div 
          ref={veil2Ref}
          className="absolute -top-[30%] -right-[20%] w-[130%] h-[70%] rounded-[100%] blur-[140px] transform-gpu pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(52, 211, 153, 0.1) 0%, rgba(52, 211, 153, 0) 65%)'
          }}
        />

        {/* Veil 3 - Core Deep Glow */}
        <div 
          ref={veil3Ref}
          className="absolute top-[20%] left-[20%] w-[60%] h-[80%] rounded-[100%] blur-[100px] transform-gpu pointer-events-none opacity-50"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(4, 38, 30, 0.8) 0%, transparent 80%)'
          }}
        />

      </div>

    </div>
  )
}
