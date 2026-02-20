import type { Metadata } from 'next'
import { Playfair_Display, Lora, Cormorant_Garamond } from 'next/font/google'

import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700']
})
const lora = Lora({ 
  subsets: ['latin'], 
  variable: '--font-lora',
  weight: ['400', '500', '600', '700']
})
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Baby Girl Birthday Celebration',
  description: 'You are cordially invited to celebrate a special milestone',
  generator: 'v0.app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${cormorant.variable}`}>
      <body className="font-lora antialiased text-slate-900/90">
        {children}
      </body>
    </html>
  )
}
