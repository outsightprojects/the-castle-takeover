import type { Metadata } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'The Castle Takeover — 28-30 August 2026',
  description:
    'A weekend celebration at Schloss Dornburg. Three days of music, food, friends, and one unforgettable castle.',
  openGraph: {
    title: 'The Castle Takeover',
    description: 'A weekend celebration at Schloss Dornburg — 28-30 August 2026',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-dvh bg-c-black text-c-white grain">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
