'use client'

import React, { useEffect, useState, useCallback, useRef } from 'react'
import {
  Menu, X, ChevronDown,
  LayoutDashboard, Terminal, Send, Brain, GitBranch, Sparkles
} from 'lucide-react'
import { BrandMark } from './BrandMark'
import { NAV_LINKS } from '../lib/constants'

const PRODUCT_TILES = [
  { name: 'Command Center', desc: 'Dashboard para readiness, aprovações, provedores e recibos.', href: '#how-it-works', Icon: LayoutDashboard },
  { name: 'CLI/TUI', desc: 'Terminal para status, comandos, aprovações e checks diários.', href: '#install', Icon: Terminal },
  { name: 'Canais', desc: 'Telegram, Discord e API com aprovações governadas.', href: '#security', Icon: Send },
  { name: 'Mnemos', desc: 'Memória local e compreensão universal de documentos.', href: '#skills', Icon: Brain },
  { name: 'Swarm v2', desc: 'Planejamento multi-agente com budgets e isolamento.', href: '#how-it-works', Icon: GitBranch },
  { name: 'Skills', desc: 'Skills nativas com curadoria, scoring e aprovação.', href: '#skills', Icon: Sparkles },
]

/**
 * Navbar — Zavorth Core top bar (Google/Minimalist Style)
 */
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeId, setActiveId] = useState<string>('')
  const [isProductOpen, setIsProductOpen] = useState(false)
  const [isMobileProductOpen, setIsMobileProductOpen] = useState(false)
  const [entranceCompleted, setEntranceCompleted] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const productTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10
      setIsScrolled(scrolled)
      if (scrolled) {
        setEntranceCompleted(true)
      }

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

    const timer = setTimeout(() => {
      setEntranceCompleted(true)
    }, 2200) // 1400ms delay + 800ms animation duration

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
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
    setIsProductOpen(false)
  }, [])

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setIsMobileMenuOpen(false)
  }, [])

  const handleProductEnter = useCallback(() => {
    if (productTimeoutRef.current) {
      clearTimeout(productTimeoutRef.current)
      productTimeoutRef.current = null
    }
    setIsProductOpen(true)
  }, [])

  const handleProductLeave = useCallback(() => {
    productTimeoutRef.current = setTimeout(() => {
      setIsProductOpen(false)
    }, 150)
  }, [])

  useEffect(() => {
    return () => {
      if (productTimeoutRef.current) clearTimeout(productTimeoutRef.current)
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes navbarSlideDown {
          from {
            opacity: 0;
            transform: translate(-50%, -24px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        .navbar-animate-entrance {
          opacity: 0;
          transform: translate(-50%, -24px);
          animation: navbarSlideDown 800ms cubic-bezier(0.16, 1, 0.3, 1) 1400ms forwards;
        }
      `}</style>
      <div
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all ease-in-out ${
          isScrolled
            ? 'top-3 w-[94%] sm:w-[90%] max-w-[1100px]'
            : 'top-5 w-[96%] max-w-[1240px]'
        } ${
          entranceCompleted
            ? 'opacity-100 translate-y-0'
            : 'navbar-animate-entrance pointer-events-none'
        }`}
        style={{
          transitionDuration: !isScrolled ? '800ms' : '500ms',
        }}
      >
        <nav
          ref={navRef}
          className={`w-full rounded-full border border-white/[0.05] bg-[#07070a]/40 backdrop-blur-2xl transition-all duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] ${
            isScrolled
              ? 'py-2 px-6 border-white/[0.08] bg-[#07070a]/70 shadow-[0_16px_40px_0_rgba(0,0,0,0.7)]'
              : 'py-3.5 px-8'
          }`}
          aria-label="Primary"
        >
          <div className="flex items-center justify-between">

            {/* ─── Logo ─── */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2.5 transition-all duration-300 hover:scale-[1.02]"
              aria-label="Zavorth — voltar ao topo"
            >
              <BrandMark className="h-5.5 w-5.5" animated={!isScrolled} />
              <span className="text-[16px] font-semibold tracking-tight text-white transition-colors group-hover:text-amber-400">
                Zavorth
              </span>
            </button>

            {/* ─── Desktop Navigation Links ─── */}
            <div className="hidden items-center gap-2 lg:flex ml-8">
              {/* Product Dropdown */}
              <div
                className="relative flex items-center"
                onMouseEnter={handleProductEnter}
                onMouseLeave={handleProductLeave}
              >
                <button
                  className={`flex items-center gap-1 text-[13px] font-medium tracking-tight px-3.5 py-1.5 rounded-full transition-all duration-300 border ${
                    isProductOpen
                      ? 'text-white bg-white/[0.04] border-white/[0.08]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.02] border-transparent'
                  }`}
                >
                  Produto
                  <ChevronDown
                    size={12}
                    className={`transition-transform duration-300 ${isProductOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown panel */}
                <div
                  className="absolute top-full pt-3 opacity-0 invisible pointer-events-none transition-all duration-300"
                  style={{
                    left: '50%',
                    marginLeft: '-160px',
                    opacity: isProductOpen ? 1 : 0,
                    visibility: isProductOpen ? 'visible' : 'hidden',
                    pointerEvents: isProductOpen ? 'auto' : 'none',
                    transform: isProductOpen ? 'translateY(0)' : 'translateY(-6px)'
                  }}
                >
                  <div className="w-[325px] rounded-2xl border border-white/[0.08] bg-[#07070a]/90 backdrop-blur-3xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8)] p-2">
                    <div className="grid grid-cols-1 gap-1">
                      {PRODUCT_TILES.map((tile) => (
                        <button
                          key={tile.name}
                          onClick={() => {
                            const id = tile.href.replace('#', '')
                            scrollToSection(id)
                          }}
                          className="w-full flex items-start gap-3 rounded-xl p-2.5 text-left transition-all duration-200 hover:bg-white/[0.04] border border-transparent hover:border-white/[0.03]"
                        >
                          <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.05] text-amber-500 shrink-0">
                            <tile.Icon size={14} />
                          </div>
                          <div>
                            <span className="block text-[13px] font-semibold text-white mb-0.5">
                              {tile.name}
                            </span>
                            <span className="block text-[11px] leading-snug text-neutral-400">
                              {tile.desc}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Regular nav links */}
              {NAV_LINKS.map((link) => {
                const active = activeId === link.id
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative px-3.5 py-1.5 rounded-full text-[13px] font-medium tracking-tight transition-all duration-300 border ${
                      active
                        ? 'text-amber-400 bg-white/[0.04] border-white/[0.06] shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.02] border-transparent'
                    }`}
                  >
                    <span className="relative">
                      {link.label}
                      <span
                        className={`absolute -bottom-1 left-0 right-0 h-[1.5px] bg-amber-500 rounded-full transition-transform duration-300 origin-center ${
                          active ? 'scale-x-100 opacity-80' : 'scale-x-0 opacity-0'
                        }`}
                      />
                    </span>
                  </button>
                )
              })}
            </div>

            {/* ─── Desktop Right Side ─── */}
            <div className="hidden items-center gap-4 lg:flex ml-auto">
              <a
                href="#install"
                onClick={(e) => { e.preventDefault(); scrollToSection('install') }}
                className="flex items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 hover:text-white hover:bg-amber-500 hover:border-amber-500 px-5 py-1.5 text-[13px] font-semibold transition-all duration-300 shadow-[0_0_15px_rgba(245,158,11,0.12)] hover:shadow-[0_0_25px_rgba(245,158,11,0.25)] hover:scale-[1.03] active:scale-[0.97]"
              >
                Começar agora
              </a>
            </div>

            {/* ─── Mobile Toggle ─── */}
            <button
              className="relative p-2 text-neutral-400 transition-colors hover:text-white lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </div>

      {/* ─── Mobile Menu ─── */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-[#050505]/95 backdrop-blur-xl"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative mt-20 border-t border-white/[0.06] px-6 py-6 overflow-y-auto max-h-[calc(100vh-5rem)]">
            <nav className="flex flex-col gap-2">
              <button
                onClick={() => setIsMobileProductOpen(!isMobileProductOpen)}
                className={`w-full flex items-center justify-between rounded-xl px-4 py-3 text-left text-[14px] font-medium transition-colors ${
                  isMobileProductOpen ? 'bg-white/[0.05] text-white border border-white/[0.05]' : 'text-neutral-300 border border-transparent'
                }`}
              >
                Produto
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isMobileProductOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isMobileProductOpen && (
                <div className="ml-2 mb-2 space-y-1">
                  {PRODUCT_TILES.map((tile) => (
                    <button
                      key={tile.name}
                      onClick={() => {
                        const id = tile.href.replace('#', '')
                        scrollToSection(id)
                      }}
                      className="w-full flex items-start gap-3 rounded-lg px-4 py-2.5 text-left transition-colors hover:bg-white/[0.04]"
                    >
                      <tile.Icon size={14} className="mt-1 shrink-0 text-neutral-500" />
                      <div>
                        <span className="block text-[13px] font-medium text-white mb-0.5">
                          {tile.name}
                        </span>
                        <span className="block text-[11px] text-neutral-500">
                          {tile.desc}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {NAV_LINKS.map((link) => {
                const active = activeId === link.id
                return (
                  <button
                     key={link.id}
                     onClick={() => scrollToSection(link.id)}
                     className={`w-full rounded-xl px-4 py-3 text-left text-[14px] font-medium transition-colors border ${
                       active ? 'bg-white/[0.05] text-white border-white/[0.05]' : 'text-neutral-300 hover:bg-white/[0.02] border-transparent'
                     }`}
                  >
                    {link.label}
                  </button>
                )
              })}
            </nav>
            <div className="mt-8">
              <a
                href="#install"
                onClick={(e) => { e.preventDefault(); scrollToSection('install'); setIsMobileMenuOpen(false) }}
                className="block w-full rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 py-3 text-center text-[14px] font-semibold transition-all shadow-[0_0_15px_rgba(245,158,11,0.12)] hover:bg-amber-500 hover:text-white"
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
