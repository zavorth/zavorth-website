'use client'

import React from 'react'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { ProductIntroSection } from './ProductIntroSection'
import { WhatItDoesSection } from './WhatItDoesSection'
import { FeaturesGridSection } from './FeaturesGridSection'
import { FeaturesSection } from './FeaturesSection'
import { InstallSection } from './InstallSection'
import { Footer } from './Footer'
import { ScrollReveal } from './ScrollReveal'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar />
      <Hero />
      
      {/* 1. Do Pensamento ao Produto (Kinetic Ideation Stage) */}
      <ScrollReveal className="relative z-10" y={28} duration={0.7}>
        <ProductIntroSection />
      </ScrollReveal>
      
      {/* 2. As Melhores IAs Unificadas (Interactive Constellation Particle Canvas) */}
      <ScrollReveal className="relative z-10" y={28} duration={0.7}>
        <WhatItDoesSection />
      </ScrollReveal>
      
      {/* 3. Memória Real (Living Memory Story) */}
      <ScrollReveal className="relative z-10" y={28} duration={0.7}>
        <FeaturesGridSection />
      </ScrollReveal>
      
      {/* 4. Colaboração Invisível & Prova Real do Produto */}
      <ScrollReveal className="relative z-10" y={28} duration={0.7}>
        <FeaturesSection />
      </ScrollReveal>
      
      {/* 5. Instale no seu Computador (com Efeito de Tinta Procedural) */}
      <ScrollReveal className="relative z-10" y={28} duration={0.7}>
        <InstallSection />
      </ScrollReveal>
      
      <Footer />
    </main>
  )
}
