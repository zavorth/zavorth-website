'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the landing page composition to disable SSR.
// This completely resolves hydration mismatches caused by browser extensions
// (like bis_skin_checked injected into tags) by rendering cleanly on the client.
const LandingPage = dynamic(() => import('../components/LandingPage'), {
  ssr: false
})

export default function Home() {
  return <LandingPage />
}
