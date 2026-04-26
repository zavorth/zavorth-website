import React from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { DemoSection } from '../components/DemoSection'
import { RuntimeSection } from '../components/RuntimeSection'
import { FeaturesSection } from '../components/FeaturesSection'
import { ConnectsSection } from '../components/ConnectsSection'
import { CTASection } from '../components/CTASection'
import { Footer } from '../components/Footer'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <DemoSection />
      <RuntimeSection />
      <FeaturesSection />
      <ConnectsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
