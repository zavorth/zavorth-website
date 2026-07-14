import React from 'react'
import Image from 'next/image'

const links = [
  ['Docs', '/docs'],
  ['Demo', '/demo'],
  ['Segurança', '/security'],
  ['Changelog', '/changelog'],
  ['Privacidade', '/privacy'],
  ['Termos', '/terms'],
] as const

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {/* One mascot only — no second BrandMark next to the name */}
          <Image
            src="/brand/zavorth-mascot.svg"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 object-contain"
            unoptimized
          />
          <div>
            <span className="text-base font-semibold text-white">Zavorth</span>
            <p className="mt-1 max-w-xs text-sm leading-relaxed text-neutral-500">
              Agente local com habilidades, memória e aprovação em operações sensíveis.
            </p>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-sm text-neutral-500 transition-colors hover:text-neutral-200"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
