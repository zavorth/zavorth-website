'use client'

import React from 'react'
import { BrandMark } from './BrandMark'

const footerLinks = [
  {
    title: 'Produto',
    links: [
      { label: 'Como funciona', href: '#how-it-works' },
      { label: 'Controle', href: '#control' },
      { label: 'Habilidades', href: '#skills' },
      { label: 'Conexões', href: '#connections' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Documentação', href: '/docs' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Exemplos', href: '/examples' },
      { label: 'Integrações', href: '/integrations' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidade', href: '/privacy' },
      { label: 'Termos', href: '/terms' },
      { label: 'Segurança', href: '/security' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-surface-deep">
      <div className="mx-auto max-w-content px-5 sm:px-6">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <BrandMark className="h-5 w-5" />
              <span className="text-[14px] font-semibold text-text-primary">Zavorth</span>
            </div>
            <p className="max-w-xs text-[13px] leading-relaxed text-text-faint">
              Uma IA que trabalha com você — não por trás de você.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text-faint">
                {group.title}
              </p>
              <nav className="flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[13px] text-text-muted transition-colors hover:text-text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.04] py-6 sm:flex-row">
          <p className="text-[12px] text-text-faint">
            © {new Date().getFullYear()} Zavorth. Todos os direitos reservados.
          </p>
          <p className="font-mono text-[10px] uppercase tracking-wider text-text-faint">
            Feito com propósito e controle.
          </p>
        </div>
      </div>
    </footer>
  )
}
