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
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <Navbar />
      <Hero />
      <ScrollReveal className="relative z-10" y={32} duration={0.8}>
        <ProductIntroSection />
      </ScrollReveal>
      <ScrollReveal className="relative z-10" y={32} duration={0.8}>
        <WhatItDoesSection />
      </ScrollReveal>
      <ScrollReveal className="relative z-10" y={32} duration={0.8}>
        <FeaturesGridSection />
      </ScrollReveal>
      <ScrollReveal className="relative z-10" y={32} duration={0.8}>
        <FeaturesSection />
      </ScrollReveal>
      <ScrollReveal className="relative z-10" y={32} duration={0.8}>
        <InstallSection />
      </ScrollReveal>
      <Footer />
    </main>
  )
}

