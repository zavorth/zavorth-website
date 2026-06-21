import React from 'react'
import { BrandMark } from './BrandMark'

const links = [
  ['Docs', '/docs'],
  ['Demo', '/demo'],
  ['Seguranca', '/security'],
  ['Changelog', '/changelog'],
  ['Privacidade', '/privacy'],
  ['Termos', '/terms'],
] as const

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-black/75 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <BrandMark className="h-5 w-5" />
          <div>
            <span className="block text-sm font-semibold text-white">Zavorth</span>
            <span className="block text-xs text-neutral-600">Agentes de IA, trabalhando no seu ambiente.</span>
          </div>
        </div>

        <nav className="flex flex-wrap gap-x-5 gap-y-3">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="text-xs text-neutral-600 transition-colors hover:text-neutral-300"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}
