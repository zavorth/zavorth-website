import React from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { DashboardSection } from '../components/DashboardSection'
import { SecuritySection } from '../components/SecuritySection'
import { PreviewSection } from '../components/PreviewSection'
import { SkillsSection } from '../components/SkillsSection'
import { ConnectionsSection } from '../components/ConnectionsSection'
import { EverydaySection } from '../components/EverydaySection'
import { InstallSection } from '../components/InstallSection'
import { Footer } from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-white/20">
      <Navbar />
      <Hero />

      {/* Narrative Section 1: The Paradigm */}
      <HowItWorksSection />

      {/* Narrative Section 2: The Command Center */}
      <DashboardSection />

      {/* Narrative Section 2.5: Security & Privacy */}
      <SecuritySection />

      {/* Narrative Section 2.8: Interactive Preview */}
      <PreviewSection />

      {/* Narrative Section 3: The Web of Connections */}
      <SkillsSection />

      {/* Narrative Section 3.5: Integrations & Channels */}
      <ConnectionsSection />

      {/* Narrative Section 4: Everyday Leverage */}
      <EverydaySection />

      <div className="section-divider" />
      <InstallSection />

      <Footer />
    </main>
  )
}
