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

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20">
      <Navbar />
      <Hero />
      <ProductIntroSection />
      <WhatItDoesSection />
      <FeaturesGridSection />
      <FeaturesSection />
      <InstallSection />
      <Footer />
    </main>
  )
}
