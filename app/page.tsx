import React from 'react'
import { Navbar } from '../components/Navbar'
import { Hero } from '../components/Hero'
import { AboutSection } from '../components/AboutSection'
import { WhatItDoesSection } from '../components/WhatItDoesSection'
import { ConnectionsSection } from '../components/ConnectionsSection'
import { FeaturesSection } from '../components/FeaturesSection'
import { InstallSection } from '../components/InstallSection'
import { Footer } from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-white/20">
      <Navbar />
      <Hero />
      <AboutSection />
      <WhatItDoesSection />
      <ConnectionsSection />
      <FeaturesSection />
      <InstallSection />
      <Footer />
    </main>
  )
}
