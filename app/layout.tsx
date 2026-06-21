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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Zavorth - IA em acao com voce no controle',
  description:
    'Zavorth e um painel para usar IA no mundo real: peca tarefas, veja o plano, aprove acoes importantes e acompanhe tudo com clareza.',
  keywords: [
    'Zavorth',
    'IA',
    'inteligencia artificial',
    'painel de controle',
    'automacao segura',
    'agentes de IA',
    'controle',
    'aprovacao',
  ],
  authors: [{ name: 'Zavorth' }],
  openGraph: {
    title: 'Zavorth - IA em acao com voce no controle',
    description:
      'Zavorth e um painel para usar IA no mundo real: peca tarefas, veja o plano, aprove acoes importantes e acompanhe tudo com clareza.',
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
    <html lang="pt-BR" suppressHydrationWarning className={`${zavorthSans.variable} ${jbMono.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body suppressHydrationWarning className="relative min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
