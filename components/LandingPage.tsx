'use client'

import React from 'react'
import { Navbar } from './Navbar'
import { Hero } from './Hero'
import { ProductIntroSection } from './ProductIntroSection'
import { WhatItDoesSection } from './WhatItDoesSection'
import { FeaturesGridSection } from './FeaturesGridSection'
import { FeaturesSection } from './FeaturesSection'
import { SafetyGovernanceSection } from './SafetyGovernanceSection'
import { InstallSection } from './InstallSection'
import { Footer } from './Footer'
import { ScrollReveal } from './ScrollReveal'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar />
      <Hero />
      
      {/* 1. Cognitive Engine (Bento Grid 3D) */}
      <ScrollReveal className="relative z-10" y={28} duration={0.7}>
        <ProductIntroSection />
      </ScrollReveal>
      
      {/* 2. Agnostic Intelligence & Pluggable Provider Families */}
      <ScrollReveal className="relative z-10" y={28} duration={0.7}>
        <WhatItDoesSection />
      </ScrollReveal>
      
      {/* 3. Infinite Context & Living Memory Stream */}
      <ScrollReveal className="relative z-10" y={28} duration={0.7}>
        <FeaturesGridSection />
      </ScrollReveal>
      
      {/* 4. Autonomous Subagent Mesh & Swarm Orchestration */}
      <ScrollReveal className="relative z-10" y={28} duration={0.7}>
        <FeaturesSection />
      </ScrollReveal>
      
      {/* 5. Safety Governance & Transparent Audit Receipts */}
      <ScrollReveal className="relative z-10" y={28} duration={0.7}>
        <SafetyGovernanceSection />
      </ScrollReveal>
      
      {/* 6. Local Install Section (with Ink Reveal Artwork) */}
      <ScrollReveal className="relative z-10" y={28} duration={0.7}>
        <InstallSection />
      </ScrollReveal>
      
      <Footer />
    </main>
  )
}
