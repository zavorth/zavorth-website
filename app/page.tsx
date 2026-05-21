import React from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { SecuritySection } from '../components/SecuritySection'
import { SkillsSection } from '../components/SkillsSection'
import { InstallSection } from '../components/InstallSection'
import { Footer } from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <Navbar />
      <Hero />

      <div className="section-divider" />
      <HowItWorksSection />

      <div className="section-divider" />
      <SecuritySection />

      <div className="section-divider" />
      <SkillsSection />

      <div className="section-divider" />
      <InstallSection />

      <Footer />
    </main>
  )
}
