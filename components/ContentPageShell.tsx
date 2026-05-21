'use client'

import React from 'react'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

interface ContentPageShellProps {
  eyebrow: string
  title: string
  intro: string
  children: React.ReactNode
}

export function ContentPageShell({ eyebrow, title, intro, children }: ContentPageShellProps) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-narrow px-5 pb-20 pt-32 sm:px-6">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="section-title-display mb-5 text-text-primary">{title}</h1>
        <p className="mb-12 text-body-lg text-text-muted">{intro}</p>
        {children}
      </main>
      <Footer />
    </>
  )
}
