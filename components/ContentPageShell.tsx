import React from 'react'
import { BrandMark } from './BrandMark'
import { Footer } from './Footer'

interface ContentPageShellProps {
  eyebrow: string
  title: string
  intro: string
  children: React.ReactNode
}

const CONTENT_NAV = [
  { href: '/docs', label: 'Docs' },
  { href: '/demo', label: 'Demo' },
  { href: '/start', label: 'Start' },
] as const

/**
 * Shell for legal/docs-style subpages.
 * Uses a self-contained top bar (not landing Navbar) so in-page #anchors
 * from the home page never appear broken on content routes.
 */
export function ContentPageShell({ eyebrow, title, intro, children }: ContentPageShellProps) {
  return (
    <div className="min-h-screen bg-surface text-neutral-100">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#060809]"
      >
        Pular para o conteúdo
      </a>

      <header className="border-b border-white/[0.06] bg-surface/88 backdrop-blur-sm">
        <div className="mx-auto flex max-w-narrow items-center justify-between px-5 py-5 sm:px-6">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 text-white"
            aria-label="Zavorth, voltar para a home"
          >
            <BrandMark className="h-7 w-7" animated={false} />
            <span className="text-[15px] font-semibold tracking-tight">Zavorth</span>
          </a>

          <nav className="flex items-center gap-1 sm:gap-2" aria-label="Navegação de conteúdo">
            {CONTENT_NAV.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-2.5 py-1.5 text-[12px] font-medium text-neutral-400 transition-colors hover:bg-white/[0.05] hover:text-neutral-100 sm:px-3"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-narrow px-5 pb-20 pt-12 sm:px-6 sm:pt-14">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="section-title-display mb-5 text-text-primary">{title}</h1>
        <p className="mb-12 text-body-lg text-text-muted">{intro}</p>
        {children}
      </main>

      <Footer />
    </div>
  )
}
