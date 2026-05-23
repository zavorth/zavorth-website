import type { Metadata } from 'next'
import { JetBrains_Mono, Playfair_Display } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const zavorthSans = localFont({
  src: [
    {
      path: '../public/fonts/ZavorthSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/ZavorthSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/ZavorthSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/ZavorthSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
})

const jbMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Zavorth — IA em ação com você no controle',
  description:
    'Zavorth é um painel de controle para usar IA no mundo real: peça tarefas, veja o plano, aprove ações importantes e acompanhe tudo com clareza.',
  keywords: [
    'Zavorth',
    'IA',
    'inteligência artificial',
    'painel de controle',
    'automação segura',
    'agentes de IA',
    'controle',
    'aprovação',
  ],
  authors: [{ name: 'Zavorth' }],
  openGraph: {
    title: 'Zavorth — IA em ação com você no controle',
    description:
      'Zavorth é um painel de controle para usar IA no mundo real: peça tarefas, veja o plano, aprove ações importantes e acompanhe tudo com clareza.',
    siteName: 'Zavorth',
    locale: 'pt_BR',
    type: 'website',
    images: ['/og-zavorth.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${zavorthSans.variable} ${jbMono.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="min-h-screen bg-surface font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
