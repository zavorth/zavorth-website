import type { Metadata } from 'next'
import { Anton, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display-agent',
  display: 'swap',
})

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Zavorth — Peça. Veja. Decida.',
  description:
    'Sua IA que faz as coisas com você no comando. Peça do seu jeito, veja o que vai acontecer e confirme o que importa — no computador, no Telegram, no dashboard.',
  keywords: [
    'Zavorth',
    'IA no seu computador',
    'agente de IA',
    'automação com controle',
    'dashboard de IA',
    'IA com confirmação',
    'assistente local',
  ],
  authors: [{ name: 'Zavorth' }],
  openGraph: {
    title: 'Zavorth — Peça. Veja. Decida.',
    description:
      'Peça do seu jeito. Ele mostra o que vai fazer. Você decide. No computador, no Telegram, no dashboard.',
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
    <html lang="pt-BR" suppressHydrationWarning className={`${zavorthSans.variable} ${jbMono.variable} ${anton.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body suppressHydrationWarning className="relative min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
