'use client'

import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BrandMark } from './BrandMark'

const navLinks = [
  { id: 'product', label: 'Produto' },
  { id: 'runtime', label: 'Runtime' },
  { id: 'governance', label: 'Capacidades' },
  { id: 'connects', label: 'Conexoes' },
  { id: 'get-started', label: 'Comecar' },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      const sections = navLinks
        .map((link) => document.getElementById(link.id))
        .filter(Boolean) as HTMLElement[]

      let current = ''
      for (const section of sections) {
        if (section.getBoundingClientRect().top - 120 <= 0) current = section.id
      }
      setActiveId(current)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-[background,border-color,backdrop-filter] duration-300 ease-out-quart ${
          isScrolled
            ? 'bg-surface/78 border-b border-white/[0.04] shadow-[0_1px_20px_rgba(0,0,0,0.22)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
        aria-label="Primary"
      >
        <div className="max-w-content mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2.5"
              aria-label="Basilisk - voltar ao topo"
            >
              <BrandMark
                animated
                className="h-7 w-7 transition-transform duration-500 ease-out-expo group-hover:scale-110"
              />
              <span className="text-[15px] font-semibold tracking-tight text-neutral-100">
                Basilisk
              </span>
            </button>

            <div className="hidden items-center gap-0.5 lg:flex">
              {navLinks.map((link) => {
                const active = activeId === link.id

                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`nav-link-underline nav-pill relative px-3.5 py-2 text-caption font-medium transition-colors duration-200 ${
                      active ? 'nav-pill-active' : ''
                    } ${
                      active ? 'text-neutral-100' : 'text-neutral-500 hover:text-neutral-200'
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute left-3.5 right-3.5 -bottom-0.5 h-px bg-accent transition-all duration-300 ease-out-quart ${
                        active ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                )
              })}
            </div>

            <div className="hidden items-center gap-2 lg:flex">
              <a
                href="/demo"
                className="px-3 py-2 text-caption text-neutral-400 transition-colors hover:text-neutral-200"
              >
                Demo
              </a>
              <a
                href="/examples"
                className="px-3 py-2 text-caption text-neutral-400 transition-colors hover:text-neutral-200"
              >
                Exemplos
              </a>
              <a
                href="/editions"
                className="px-3 py-2 text-caption text-neutral-400 transition-colors hover:text-neutral-200"
              >
                Edicoes
              </a>
              <a
                href="/release"
                className="px-3 py-2 text-caption text-neutral-400 transition-colors hover:text-neutral-200"
              >
                Release
              </a>
              <a
                href="/integrations"
                className="px-3 py-2 text-caption text-neutral-400 transition-colors hover:text-neutral-200"
              >
                Integracoes
              </a>
              <a
                href="/feedback"
                className="px-3 py-2 text-caption text-neutral-400 transition-colors hover:text-neutral-200"
              >
                Feedback
              </a>
              <a
                href="/docs"
                className="px-3 py-2 text-caption text-neutral-400 transition-colors hover:text-neutral-200"
              >
                Docs
              </a>
              <a
                href="/start"
                className="btn-sheen rounded-lg border border-accent/12 bg-accent/10 px-5 py-2 text-caption text-accent transition-all duration-300 hover:border-accent/22 hover:bg-accent/18 hover:shadow-glow-sm"
              >
                Comecar
              </a>
            </div>

            <button
              className="p-2.5 text-neutral-400 transition-colors hover:text-neutral-200 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div
            className="absolute inset-0 bg-surface/95 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative mt-16 border-t border-border bg-surface px-6 py-8">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="w-full rounded-lg px-3 py-3 text-left text-body text-neutral-400 transition-colors hover:bg-surface-raised hover:text-neutral-100"
                >
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
              <a
                href="/start"
                className="w-full rounded-xl border border-white/[0.08] px-4 py-3 text-center font-medium text-neutral-300 transition-colors hover:bg-surface-raised"
              >
                Comecar
              </a>
              <a
                href="/demo"
                className="w-full rounded-xl border border-white/[0.08] px-4 py-3 text-center font-medium text-neutral-300 transition-colors hover:bg-surface-raised"
              >
                Ver demo
              </a>
              <a
                href="/examples"
                className="w-full rounded-xl border border-white/[0.08] px-4 py-3 text-center font-medium text-neutral-300 transition-colors hover:bg-surface-raised"
              >
                Exemplos
              </a>
              <a
                href="/editions"
                className="w-full rounded-xl border border-white/[0.08] px-4 py-3 text-center font-medium text-neutral-300 transition-colors hover:bg-surface-raised"
              >
                Edicoes
              </a>
              <a
                href="/release"
                className="w-full rounded-xl border border-white/[0.08] px-4 py-3 text-center font-medium text-neutral-300 transition-colors hover:bg-surface-raised"
              >
                Release
              </a>
              <a
                href="/integrations"
                className="w-full rounded-xl border border-white/[0.08] px-4 py-3 text-center font-medium text-neutral-300 transition-colors hover:bg-surface-raised"
              >
                Integracoes
              </a>
              <a
                href="/feedback"
                className="w-full rounded-xl border border-white/[0.08] px-4 py-3 text-center font-medium text-neutral-300 transition-colors hover:bg-surface-raised"
              >
                Feedback
              </a>
              <a
                href="/docs#quickstart"
                className="w-full rounded-xl bg-accent px-4 py-3 text-center font-medium text-surface transition-colors hover:bg-accent-light"
              >
                Quickstart
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
