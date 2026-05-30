import type { Metadata } from 'next'
import { Playfair_Display, Lora, Cormorant_Garamond } from 'next/font/google'

import { LanguageProvider } from '@/context/LanguageContext'
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

const siteUrl = 'https://zoe-mu-ten.vercel.app';
const ogImage = '/optimized/one_year/DSC04487.webp';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Zoe's Birthday",
  description: 'You are cordially invited to celebrate a special milestone',
  openGraph: {
    type: 'website',
    url: siteUrl,
    title: "Zoe's Birthday",
    description: 'You are cordially invited to celebrate a special milestone',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Zoe's first birthday celebration",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Zoe's Birthday",
    description: 'You are cordially invited to celebrate a special milestone',
    images: [ogImage],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${lora.variable} ${cormorant.variable}`}>
      <body className="font-lora antialiased text-slate-900/90">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
