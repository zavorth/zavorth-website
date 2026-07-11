'use client'

import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { BrandMark } from './BrandMark'
import { NAV_LINKS } from '../lib/constants'

export function Navbar() {
  const [visible, setVisible] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const show = () => setVisible(true)
    // Fallback only after a full typing sequence (~6–8s), not mid-intro
    const fallback = window.setTimeout(show, 9000)
    window.addEventListener('hero-title-typed', show)
    return () => {
      window.clearTimeout(fallback)
      window.removeEventListener('hero-title-typed', show)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Escape closes the mobile menu
  useEffect(() => {
    if (!mobileOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mobileOpen])

  const scrollTo = (id: string) => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReduced ? 'auto' : 'smooth',
      block: 'start',
    })
    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[72px] transition-all duration-700 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="border-b border-white/[0.05] bg-black/72 shadow-[0_8px_30px_rgb(0,0,0,0.5)] backdrop-blur-2xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-8">
          <button
            onClick={() => {
              const prefersReduced =
                typeof window.matchMedia === 'function' &&
                window.matchMedia('(prefers-reduced-motion: reduce)').matches
              window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
            }}
            className="flex items-center gap-2.5 text-white transition-opacity hover:opacity-90"
            aria-label="Zavorth, voltar ao topo"
          >
            <BrandMark className="h-5 w-5 text-emerald-400" animated />
            <span className="font-mono text-[14px] font-bold tracking-[0.16em]">ZAVORTH</span>
          </button>

          <nav className="hidden items-center gap-2 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  scrollTo(link.id)
                }}
                className={`rounded px-3.5 py-1.5 font-mono text-[11px] font-medium tracking-wide transition-all ${
                  link.id === 'install'
                    ? 'bg-emerald-400 text-black hover:bg-emerald-300 font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMobileOpen((current) => !current)}
            className="rounded border border-white/[0.08] bg-black/50 p-2 text-neutral-300 backdrop-blur-xl md:hidden hover:text-white"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav-menu"
          className="mx-0 flex flex-col border-b border-white/[0.07] bg-black/95 py-4 backdrop-blur-xl md:hidden"
          aria-label="Menu de navegação"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(event) => {
                event.preventDefault()
                scrollTo(link.id)
              }}
              className="px-6 py-3 text-left font-mono text-xs text-neutral-300 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
