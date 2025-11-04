import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo'

export const metadata: Metadata = constructMetadata({
  title: 'CSV to TOON Converter - Bidirectional CSV/TOON Conversion | Free',
  description: 'Convert between CSV and TOON formats instantly. Reduce CSV token usage by 40-50%. Free, fast, 100% client-side. Perfect for data optimization and LLM applications.',
  keywords: [
    'CSV to TOON',
    'TOON to CSV',
    'CSV converter',
    'optimize CSV data',
    'reduce CSV tokens',
  ],
  canonical: 'https://toontools.com/tools/csv-toon',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
