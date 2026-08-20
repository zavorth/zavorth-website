'use client'

import React, { useEffect, useState } from 'react'
import { Menu, X, Terminal } from 'lucide-react'
import { BrandMark } from './BrandMark'
import { NAV_LINKS } from '../lib/constants'

export function Navbar() {
  const [visible, setVisible] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const show = () => setVisible(true)
    const fallback = window.setTimeout(show, 2500)
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
      className={`fixed inset-x-0 top-5 z-50 flex justify-center px-4 transition-all duration-700 pointer-events-none ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
      }`}
    >
      {/* Floating Glass Island Capsule */}
      <div className="pointer-events-auto flex items-center justify-between gap-6 px-4 py-2 rounded-full border border-white/[0.1] bg-black/70 backdrop-blur-2xl shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(0,232,143,0.04)] hover:border-white/[0.18] transition-all duration-300">
        
        {/* Brand Link */}
        <button
          onClick={() => {
            const prefersReduced =
              typeof window.matchMedia === 'function' &&
              window.matchMedia('(prefers-reduced-motion: reduce)').matches
            window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' })
          }}
          className="flex items-center gap-2 text-white hover:opacity-80 transition-opacity pl-1 cursor-pointer"
          aria-label="Zavorth, voltar ao topo"
        >
          <BrandMark className="h-4 w-4 text-[#00e88f]" animated />
          <span className="font-mono text-xs font-bold tracking-[0.18em]">ZAVORTH</span>
        </button>

        {/* Desktop Links */}
        <nav className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map((link) => {
            const isInstall = link.id === 'install'
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  scrollTo(link.id)
                }}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-all duration-200 ${
                  isInstall
                    ? 'bg-[#00e88f] text-black font-semibold hover:bg-[#00e88f]/90 hover:shadow-[0_0_15px_rgba(0,232,143,0.3)] ml-2'
                    : 'text-neutral-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen((curr) => !curr)}
          className="p-1 rounded-full text-neutral-400 hover:text-white sm:hidden cursor-pointer"
          aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div
          id="mobile-nav-menu"
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col justify-center items-center gap-6 p-6 pointer-events-auto sm:hidden"
        >
          <div className="flex flex-col items-center gap-5 w-full max-w-xs">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(event) => {
                  event.preventDefault()
                  scrollTo(link.id)
                }}
                className={`w-full py-3 text-center text-sm font-mono rounded-2xl transition-all ${
                  link.id === 'install'
                    ? 'bg-[#00e88f] text-black font-bold'
                    : 'text-neutral-300 hover:text-white bg-white/[0.04]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
