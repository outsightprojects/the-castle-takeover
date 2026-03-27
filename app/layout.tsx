import type { Metadata } from 'next'
import { Fredoka, Comic_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const fredoka = Fredoka({ 
  subsets: ["latin"],
  variable: '--font-fredoka',
  weight: ['300', '400', '500', '600', '700'],
});

const comicNeue = Comic_Neue({ 
  subsets: ["latin"],
  variable: '--font-comic',
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  title: 'The Castle Takeover - 40th Birthday Bash',
  description: 'Cari, Peter & Georg celebrate their 40th birthday at Schloss Dornburg. 28-30 Aug 2026. Join us for an unforgettable castle party!',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fredoka.variable} ${comicNeue.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
