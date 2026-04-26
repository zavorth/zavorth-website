'use client'

import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

gsap.registerPlugin(MotionPathPlugin)

export function NexoVisual() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const pulses = svgRef.current.querySelectorAll('.nexo-pulse')
    
    pulses.forEach((pulse, i) => {
      gsap.to(pulse, {
        motionPath: {
          path: `#line-${i % 4}`,
          align: `#line-${i % 4}`,
          autoRotate: true,
          alignOrigin: [0.5, 0.5],
        },
        duration: 2 + Math.random() * 2,
        repeat: -1,
        ease: 'none',
        delay: i * 0.5,
      })
    })
  }, [])

  return (
    <div className="nexo-visual relative aspect-square w-full max-w-[560px] mx-auto overflow-visible">
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="h-full w-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Connection Lines */}
        <path id="line-0" d="M200,200 L100,100" className="stroke-white/10" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        <path id="line-1" d="M200,200 L300,100" className="stroke-white/10" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        <path id="line-2" d="M200,200 L100,300" className="stroke-white/10" strokeWidth="1" strokeDasharray="4 4" fill="none" />
        <path id="line-3" d="M200,200 L300,300" className="stroke-white/10" strokeWidth="1" strokeDasharray="4 4" fill="none" />

        {/* Nodes */}
        <g className="nodes">
          {/* Core Node */}
          <circle cx="200" cy="200" r="40" className="fill-[#10b981]/20 stroke-[#10b981] stroke-2" filter="url(#glow)" />
          <text x="200" y="205" textAnchor="middle" className="fill-white font-sans font-bold text-[10px]">BASILISK</text>

          {/* Model Nodes */}
          {[
            { cx: 100, cy: 100, label: 'CLAUDE' },
            { cx: 300, cy: 100, label: 'GPT-4' },
            { cx: 100, cy: 300, label: 'LOCAL' },
            { cx: 300, cy: 300, label: 'CUSTOM' },
          ].map((node, i) => (
            <g key={i} className="model-node">
              <circle cx={node.cx} cy={node.cy} r="25" className="fill-white/[0.03] stroke-white/10 hover:stroke-[#10b981] transition-colors duration-300" />
              <text x={node.cx} y={node.cy + 4} textAnchor="middle" className="fill-neutral-500 font-mono text-[8px] font-semibold">{node.label}</text>
            </g>
          ))}
        </g>

        {/* Pulses (Animated via GSAP) */}
        <circle r="3" className="nexo-pulse fill-[#10b981]" filter="url(#glow)" />
        <circle r="3" className="nexo-pulse fill-[#34d399]" filter="url(#glow)" />
        <circle r="3" className="nexo-pulse fill-[#10b981]" filter="url(#glow)" />
        <circle r="3" className="nexo-pulse fill-[#34d399]" filter="url(#glow)" />
      </svg>
    </div>
  )
}
