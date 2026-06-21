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
    const fallback = window.setTimeout(show, 2600)
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 text-white"
          aria-label="Zavorth, voltar ao topo"
        >
          <BrandMark className="h-5 w-5" animated />
          <span className="text-[15px] font-semibold">Zavorth</span>
        </button>

        <nav className="hidden items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.035] p-1.5 shadow-[0_18px_70px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(event) => {
                event.preventDefault()
                scrollTo(link.id)
              }}
              className={`rounded-full px-3.5 py-2 text-[12px] font-medium transition-colors ${
                link.id === 'install'
                  ? 'bg-amber-400 text-black hover:bg-amber-300'
                  : 'text-neutral-400 hover:bg-white/[0.055] hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setMobileOpen((current) => !current)}
          className="rounded-full border border-white/[0.08] bg-black/50 p-2.5 text-neutral-300 backdrop-blur-xl md:hidden"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={17} /> : <Menu size={17} />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="mx-5 flex flex-col border-y border-white/[0.07] bg-black/95 py-4 backdrop-blur-xl md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={(event) => {
                event.preventDefault()
                scrollTo(link.id)
              }}
              className="px-2 py-3 text-left text-sm text-neutral-300"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
