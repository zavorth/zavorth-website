'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import { Menu, X } from 'lucide-react'
import { BrandMark } from './BrandMark'
import { NAV_LINKS } from '../lib/constants'
import { initMagnetic } from './motion'

/**
 * Navbar — Gemini-grade top bar
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const navRef = useRef<HTMLElement>(null)
  
  // Refs for magnetic effect
  const ctaRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    // Setup magnetic effects on mount
    let cleanupCTA: (() => void) | undefined
    if (ctaRef.current) {
      cleanupCTA = initMagnetic(ctaRef.current, 0.4)
    }
    
    // Magnetic links
    const linkCleanups: (() => void)[] = []
    document.querySelectorAll('.navbar-link').forEach((el) => {
      linkCleanups.push(initMagnetic(el as HTMLElement, 0.2))
    })

    return () => {
      if (cleanupCTA) cleanupCTA()
      linkCleanups.forEach(cleanup => cleanup())
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)

      const sections = NAV_LINKS
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

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setIsMobileMenuOpen(false)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }, [])

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar-root fixed left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'navbar-scrolled top-3 mx-auto max-w-[94%] sm:max-w-3xl lg:max-w-4xl'
            : 'navbar-top top-0'
        }`}
        aria-label="Primary"
      >
        <div className={`navbar-inner border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? 'rounded-full border-white/[0.08] bg-[#0a0a0a]/80 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.04)] px-3 sm:px-5'
            : 'rounded-none border-transparent bg-transparent px-5 sm:px-6'
        }`}>
          <div className="mx-auto max-w-content">
            <div className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled ? 'h-[3.25rem]' : 'h-[3.75rem]'
            }`}>

              {/* ─── Logo ─── */}
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 transition-all duration-300"
                aria-label="Zavorth — voltar ao topo"
              >
                <div className="relative">
                  {/* Ambient glow behind icon on hover */}
                  <div className="absolute inset-0 rounded-full bg-amber/20 blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden="true" />
                  <BrandMark className="relative h-7 w-7 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110" />
                </div>
                <span className="text-[15px] font-semibold tracking-[-0.02em] text-white/90 transition-colors duration-300 group-hover:text-white">
                  Zavorth
                </span>
              </button>

              {/* ─── Desktop Navigation Links ─── */}
              <div className="hidden items-center gap-1 lg:flex">
                {NAV_LINKS.map((link) => {
                  const active = activeId === link.id
                  return (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`navbar-link relative whitespace-nowrap px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-300 ${
                        active
                          ? 'text-white bg-white/[0.08]'
                          : 'text-white/50 hover:text-white/80 hover:bg-white/[0.04]'
                      }`}
                    >
                      {link.label}
                    </button>
                  )
                })}
              </div>

              {/* ─── Desktop Right Side ─── */}
              <div className="hidden items-center gap-3 lg:flex">
                {/* Status indicator — minimal */}
                <div className="flex items-center gap-2 opacity-70">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-40" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber" />
                  </span>
                  <span className="font-mono text-[9px] font-medium uppercase tracking-[0.2em] text-white/40">
                    pronto
                  </span>
                </div>

                {/* CTA Button — glass with amber accent */}
                <a
                  ref={ctaRef}
                  href="#install"
                  onClick={(e) => { e.preventDefault(); scrollToSection('install') }}
                  className="navbar-cta group relative overflow-hidden rounded-full px-5 py-2 text-[13px] font-semibold text-[#1a1207] transition-all duration-300"
                >
                  {/* Button background with gradient */}
                  <div
                    className="absolute inset-0 rounded-full transition-all duration-300 group-hover:shadow-[0_4px_20px_rgba(245,158,11,0.35)]"
                    style={{
                      background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)',
                    }}
                    aria-hidden="true"
                  />
                  {/* Sheen overlay */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
                    }}
                    aria-hidden="true"
                  />
                  <span className="relative z-10">Começar agora</span>
                </a>
              </div>

              {/* ─── Mobile Toggle ─── */}
              <button
                className="relative p-2 text-white/50 transition-colors hover:text-white/80 lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Menu ─── */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navegação mobile"
        >
          <div
            className="absolute inset-0 bg-[#030303]/95 backdrop-blur-xl"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="relative mt-[3.75rem] border-t border-white/[0.06] px-6 py-8">
            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const active = activeId === link.id
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`w-full rounded-xl px-4 py-3.5 text-left text-[15px] font-medium transition-all duration-200 ${
                      active
                        ? 'bg-white/[0.06] text-white'
                        : 'text-white/50 hover:bg-white/[0.03] hover:text-white/80'
                    }`}
                  >
                    {link.label}
                  </button>
                )
              })}
            </nav>
            <div className="mt-8 border-t border-white/[0.06] pt-6">
              <a
                href="#install"
                onClick={(e) => { e.preventDefault(); scrollToSection('install'); setIsMobileMenuOpen(false) }}
                className="block w-full rounded-xl py-3.5 text-center text-[15px] font-semibold text-[#1a1207] transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)',
                }}
              >
                Começar agora
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
