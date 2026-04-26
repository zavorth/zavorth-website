import React from 'react'
import { BrandMark } from './BrandMark'

type FooterLink = { label: string; href: string; external?: boolean }

const footerLinks: Record<string, FooterLink[]> = {
  Produto: [
    { label: 'Produto', href: '/#product' },
    { label: 'Runtime', href: '/#runtime' },
    { label: 'Governanca', href: '/#governance' },
    { label: 'Conexoes', href: '/#connects' },
    { label: 'Integracoes', href: '/integrations' },
    { label: 'Demo', href: '/demo' },
    { label: 'Comecar', href: '/start' },
    { label: 'Release', href: '/release' },
    { label: 'Feedback', href: '/feedback' },
    { label: 'Secao comecar', href: '/#get-started' },
  ],
  Recursos: [
    { label: 'First run', href: '/start' },
    { label: 'Demo guiada', href: '/demo' },
    { label: 'Exemplos', href: '/examples' },
    { label: 'Edicoes', href: '/editions' },
    { label: 'Bundle', href: '/release' },
    { label: 'Feedback loop', href: '/feedback' },
    { label: 'Integration showcase', href: '/integrations' },
    { label: 'Policy', href: '/docs#distribution-policy' },
    { label: 'Integration docs', href: '/docs#integration-showcase' },
    { label: 'Release docs', href: '/docs#release-bundle' },
    { label: 'Feedback docs', href: '/docs#feedback-loop' },
    { label: 'Documentacao', href: '/docs' },
    { label: 'Quickstart', href: '/docs#quickstart' },
    { label: 'Changelog', href: '/changelog' },
    { label: 'Seguranca', href: '/security' },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-border-solid/70">
      <div className="max-w-content mx-auto px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,2fr)_repeat(2,minmax(0,1fr))] md:gap-12">
          <div>
            <a href="/" className="mb-5 flex items-center gap-2.5" aria-label="Basilisk">
              <BrandMark className="h-7 w-7" />
              <span className="text-[15px] font-semibold tracking-tight text-neutral-200">
                Basilisk
              </span>
            </a>
            <p className="max-w-sm text-caption leading-relaxed text-neutral-500">
              Runtime local-first que transforma linguagem natural em acao governada,
              rastreavel e disponivel em varias superficies.
            </p>
            <p className="mt-5 text-[11px] font-mono uppercase tracking-[0.16em] text-neutral-600">
              Local-first. Governado. Auditavel por padrao.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="mb-4 text-[11px] font-mono uppercase tracking-[0.14em] text-neutral-600">
                {title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-caption text-neutral-500 transition-colors hover:text-neutral-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 md:flex-row">
          <p className="text-[11px] text-neutral-700">
            &copy; {new Date().getFullYear()} Basilisk. Feito para execucao local governada.
          </p>
          <div className="flex items-center gap-6">
            <a href="/privacy" className="text-[11px] text-neutral-700 transition-colors hover:text-neutral-400">
              Privacidade
            </a>
            <a href="/terms" className="text-[11px] text-neutral-700 transition-colors hover:text-neutral-400">
              Termos
            </a>
            <a href="/security" className="text-[11px] text-neutral-700 transition-colors hover:text-neutral-400">
              Seguranca
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
