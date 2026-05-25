import React from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { OverviewSection } from '../components/OverviewSection'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { SkillsSection } from '../components/SkillsSection'
import { SecuritySection } from '../components/SecuritySection'
import { ConnectionsSection } from '../components/ConnectionsSection'
import { InstallSection } from '../components/InstallSection'
import { Footer } from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <Navbar />
      <Hero />

      {/* Terminal Vivo — Animated Console Demo */}
      <OverviewSection />

      {/* Timeline Cinematográfica — Vertical Step Flow */}
      <HowItWorksSection />

      {/* Bento Grid Premium — Native Modules Spotlight */}
      <SkillsSection />

      {/* Showcase de Métricas — Governance & Benefits */}
      <SecuritySection />

      {/* Grid Orbital — Integrations & Connections */}
      <ConnectionsSection />

      <div className="section-divider" />
      
      {/* CLI Installation Pill */}
      <InstallSection />

      <Footer />
    </main>
  )
}

