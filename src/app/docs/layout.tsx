import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo'

export const metadata: Metadata = constructMetadata({
  title: 'TOON Documentation - Learn Token-Oriented Object Notation',
  description: 'Complete TOON documentation with examples, tutorials, and best practices. Learn how to reduce LLM token usage by 30-60% with TOON format.',
  keywords: [
    'TOON documentation',
    'TOON tutorial',
    'learn TOON',
    'TOON examples',
    'TOON guide',
  ],
  canonical: 'https://toontools.com/docs',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
