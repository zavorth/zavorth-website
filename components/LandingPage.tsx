'use client'

import React from 'react'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { ProductIntroSection } from './ProductIntroSection'
import { WhatItDoesSection } from './WhatItDoesSection'
import { FeaturesGridSection } from './FeaturesGridSection'
import { InstallSection } from './InstallSection'
import { Footer } from './Footer'
import { ScrollReveal } from './ScrollReveal'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-[#00e88f]/20 selection:text-[#00e88f]">
      <Navbar />
      <Hero />
      
      {/* Product Introduction (Kinetic Core Stage) */}
      <ScrollReveal className="relative z-10" y={20} duration={0.6}>
        <ProductIntroSection />
      </ScrollReveal>
      
      {/* Swarm System & Agent Orchestration */}
      <ScrollReveal className="relative z-10" y={20} duration={0.6}>
        <WhatItDoesSection />
      </ScrollReveal>
      
      {/* Architecture & Capabilities Grid */}
      <ScrollReveal className="relative z-10" y={20} duration={0.6}>
        <FeaturesGridSection />
      </ScrollReveal>
      
      {/* Local Runtime Installation */}
      <ScrollReveal className="relative z-10" y={20} duration={0.6}>
        <InstallSection />
      </ScrollReveal>
      
      <Footer />
    </main>
  )
}
