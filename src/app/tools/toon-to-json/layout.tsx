import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo'

export const metadata: Metadata = constructMetadata({
  title: 'TOON to JSON Converter - Decode TOON Format Online | Free Tool',
  description: 'Convert TOON back to JSON format instantly. Free, fast, 100% client-side decoding. Perfect for round-trip conversion and data restoration. No signup required.',
  keywords: [
    'TOON to JSON',
    'decode TOON',
    'TOON decoder',
    'reverse TOON conversion',
    'TOON format to JSON',
  ],
  canonical: 'https://toontools.com/tools/toon-to-json',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
