'use client'

import React from 'react'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { ProductIntroSection } from './ProductIntroSection'
import { WhatItDoesSection } from './WhatItDoesSection'
import { InstallSection } from './InstallSection'
import { Footer } from './Footer'
import { ScrollReveal } from './ScrollReveal'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#00e88f]/20 selection:text-[#00e88f]">
      <Navbar />
      <Hero />
      
      {/* 1. Visão Geral (GSAP Scroll Word-by-Word Illumination) */}
      <ScrollReveal className="relative z-10" y={20} duration={0.6}>
        <ProductIntroSection />
      </ScrollReveal>
      
      {/* 2. Capacidades Essenciais (Horizontal Minimal Rows) */}
      <ScrollReveal className="relative z-10" y={20} duration={0.6}>
        <WhatItDoesSection />
      </ScrollReveal>
      
      {/* 3. Instale o Runtime Local (com Ink Reveal e Fundo Preto 100% Sólido) */}
      <ScrollReveal className="relative z-10" y={20} duration={0.6}>
        <InstallSection />
      </ScrollReveal>
      
      <Footer />
    </main>
  )
}
