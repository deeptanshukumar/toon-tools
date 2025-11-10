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
  title: 'TOON Tools - Best Token-Oriented Object Notation Converter & Comprehensive Solution',
  description: 'The best comprehensive TOON tools suite. Reduce LLM token usage by 30-60% with token optimized object notation. Convert JSON, CSV, YAML, XML to TOON format using cl100k_base tokenizer. Free toon encoder, decoder, syntax validator. Complete solution for token optimization.',
  keywords: [
    'toon tools',
    'token optimized object notation',
    'token oriented object notation',
    'best toon tool',
    'comprehensive toon solution',
    'toon encode',
    'toon object notation',
    'toon syntax',
    'toon token oriented',
    'cl100k_base',
    'free TOON converter',
    'JSON to TOON online',
    'reduce GPT-4 costs',
    'LLM optimization',
    'API token savings',
    'CSV to TOON',
    'YAML to TOON',
    'XML to TOON',
    'toon encoder',
    'toon decoder',
    'site:vercel.app',
  ],
  canonical: 'https://toontools.app',
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
        <meta name="google-site-verification" content="c1NrV2S56uUJCt1IxsATy8eXspQXRwLGzIA6BniCIrs" />
        <meta name="application-name" content="TOON Tools" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'TOON Tools',
              url: 'https://toontools.app/',
              publisher: {
                '@type': 'Organization',
                name: 'TOON Tools',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://toontools.app/icon.svg',
                },
              },
            }),
          }}
        />
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
