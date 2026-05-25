'use client'

import React from 'react'
import { BrandMark } from './BrandMark'

const linkGroups = [
  {
    title: 'Produto',
    links: [
      { label: 'Recursos', href: '#features' },
      { label: 'Conexões', href: '#connections' },
      { label: 'Demonstração', href: '#demo' },
      { label: 'Preços', href: '#pricing' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Documentação', href: '#docs' },
      { label: 'API Reference', href: '#api' },
      { label: 'Comunidade', href: '#community' },
      { label: 'Changelog', href: '#changelog' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacidade', href: '#privacy' },
      { label: 'Termos de Uso', href: '#terms' },
      { label: 'Licença', href: '#license' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative footer-gradient">
      {/* Top divider */}
      <div className="section-divider h-px w-full" />

      {/* Main grid */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <BrandMark />
              <span className="text-white font-semibold text-lg tracking-tight">
                Zavorth
              </span>
            </div>
            <p className="text-neutral-500 text-sm leading-relaxed mb-5 max-w-xs">
              Uma IA que trabalha com você — não por trás de você.
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-700 bg-white/[0.03] border border-white/[0.05] rounded-md px-2.5 py-1">
              v0.1.0-alpha
            </span>
          </div>

          {/* Link columns */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-mono text-[10px] uppercase tracking-[0.15em] text-neutral-600 mb-5">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="footer-link relative text-sm text-neutral-500 hover:text-neutral-300 transition-colors duration-300 pb-0.5"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="border-t border-dashed border-white/[0.06] py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-neutral-600 text-xs font-mono">
            © {new Date().getFullYear()} Zavorth. Todos os direitos reservados.
          </span>
          <span className="text-neutral-600 text-xs font-mono flex items-center gap-1.5">
            <span className="text-amber-500/50 text-[10px]">★</span>
            Feito com propósito e controle.
          </span>
        </div>
      </div>

      <style jsx>{`
        .footer-gradient {
          background: linear-gradient(to bottom, #050505, #020202);
        }

        .section-divider {
          background: linear-gradient(
            to right,
            transparent,
            rgba(255, 255, 255, 0.06) 20%,
            rgba(255, 255, 255, 0.06) 80%,
            transparent
          );
        }

        .footer-link {
          display: inline-block;
        }

        .footer-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 0;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.3);
          transition: width 300ms ease;
        }

        .footer-link:hover::after {
          width: 100%;
        }
      `}</style>
    </footer>
  )
}
