import type { Metadata } from 'next'
import { Outfit, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-sans',
  display: 'swap',
})

const jbMono = JetBrains_Mono({ 
  subsets: ['latin'], 
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Basilisk - Runtime local-first para agentes',
  description:
    'Basilisk e um runtime local-first para transformar linguagem natural em execucao governada.',
  keywords: [
    'agent runtime',
    'AI agent',
    'local-first',
    'natural language',
    'governed execution',
    'MCP',
  ],
  authors: [{ name: 'Basilisk' }],
  openGraph: {
    title: 'Basilisk - Runtime local-first para agentes',
    description: 'Linguagem natural, execucao real e controle local.',
    type: 'website',
    locale: 'pt_BR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${outfit.variable} ${jbMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-surface font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
