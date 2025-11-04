import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo'

export const metadata: Metadata = constructMetadata({
  title: 'Format Comparison Playground - Compare JSON, TOON, CSV, YAML, XML',
  description: 'Compare token usage across 5 data formats in real-time. See which format is most efficient for your data. Free interactive playground. 100% client-side.',
  keywords: [
    'format comparison',
    'JSON vs TOON',
    'compare data formats',
    'token comparison',
    'format efficiency',
  ],
  canonical: 'https://toontools.com/playground',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
