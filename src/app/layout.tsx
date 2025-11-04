import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { constructMetadata } from '@/lib/seo'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = constructMetadata({
  title: 'TOON Tools - Free Token-Oriented Object Notation Converter & Tools',
  description: 'Reduce LLM token usage by 30-60% with free TOON converter tools. Convert JSON, CSV, YAML, XML to TOON format. 100% client-side, privacy-first. Token counter, validator & batch converter included.',
  keywords: [
    'free TOON converter',
    'JSON to TOON online',
    'reduce GPT-4 costs',
    'LLM optimization',
    'API token savings',
    'CSV to TOON',
    'YAML to TOON',
    'XML to TOON',
  ],
  canonical: 'https://toontools.com',
  image: '/og-image.png',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.className} ${inter.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1" role="main">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
