'use client'

import React from 'react'
import Image from 'next/image'

/**
 * Real product proof — current Zavorth Control UI only.
 * Old fox / Command Center marketing mock was removed.
 */
const proof = {
  src: '/product/zavorth-desktop-shell.png',
  alt: 'Zavorth Desktop — shell, chat e runtime',
  caption:
    'Zavorth Desktop — interface atual do produto (shell, chat e runtime), sem mock de marketing.',
  chrome: 'Zavorth Desktop',
} as const

export function FeaturesSection() {
  return (
    <section
      id="trust"
      data-proof-section
      className="landing-surface relative scroll-mt-20 border-t border-white/[0.06] py-24 sm:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <span className="section-kicker">Interface do Sistema</span>
          <h2 className="mt-6 font-display text-4xl font-semibold leading-none tracking-tight text-white sm:text-5xl">
            O produto, <span className="text-emerald-400">de verdade</span>
          </h2>
          <p className="mt-5 text-lg font-light leading-relaxed text-neutral-400">
            Nenhuma simulação conceitual com marca abandonada. Esta é a interface atual do Zavorth Control.
          </p>
        </div>

        <figure
          data-zavorth-proof
          className="overflow-hidden rounded-xl border border-white/[0.1] bg-[#060807] shadow-[0_30px_80px_rgba(0,0,0,0.65)]"
        >
          <div className="flex items-center gap-2 border-b border-white/[0.07] bg-white/[0.03] px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[9px] uppercase tracking-wider text-neutral-500 select-none">
              {proof.chrome}
            </span>
          </div>

          <div className="relative aspect-[16/9] sm:aspect-[21/10] w-full bg-black">
            <Image
              src={proof.src}
              alt={proof.alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 1152px) 100vw, 1152px"
              priority
            />
          </div>

          <figcaption className="border-t border-white/[0.06] px-5 py-4 font-mono text-[11px] leading-relaxed text-neutral-400">
            {proof.caption}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
