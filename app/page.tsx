import React from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { ProductIntroSection } from '../components/ProductIntroSection'
import { WhatItDoesSection } from '../components/WhatItDoesSection'
import { FeaturesSection } from '../components/FeaturesSection'
import { ConnectionsSection } from '../components/ConnectionsSection'
import { InstallSection } from '../components/InstallSection'
import { Footer } from '../components/Footer'

/**
 * Landing composition (QA-locked order):
 * Hero (full-bleed black hole) → product story → how it works → proofs → connections → install → footer
 * No heavy editorial frame over the hero.
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <Navbar />
      <Hero />
      <ProductIntroSection />
      <WhatItDoesSection />
      <FeaturesSection />
      <ConnectionsSection />
      <InstallSection />
      <Footer />
    </main>
  )
}
