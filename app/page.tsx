import React from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { HowItWorksSection } from '../components/HowItWorksSection'
import { SecuritySection } from '../components/SecuritySection'
import { ConnectionsSection } from '../components/ConnectionsSection'
import { EverydaySection } from '../components/EverydaySection'
import { SkillsSection } from '../components/SkillsSection'
import { PreviewSection } from '../components/PreviewSection'
import { DashboardSection } from '../components/DashboardSection'
import { InstallSection } from '../components/InstallSection'
import { CTASection } from '../components/CTASection'
import { Footer } from '../components/Footer'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />

      <div className="section-divider" />
      <HowItWorksSection />

      <div className="section-divider" />
      <SecuritySection />

      <div className="section-divider" />
      <DashboardSection />

      <div className="section-divider" />
      <EverydaySection />

      <div className="section-divider" />
      <SkillsSection />

      <div className="section-divider" />
      <PreviewSection />

      <div className="section-divider" />
      <ConnectionsSection />

      <div className="section-divider" />
      <InstallSection />

      <div className="section-divider" />
      <CTASection />

      <Footer />
    </main>
  )
}
