import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo'

export const metadata: Metadata = constructMetadata({
  title: 'API Tester - Test TOON Format with Real APIs | Free Tool',
  description: 'Test TOON format with real API endpoints. Send requests in TOON format, compare with JSON, and see token savings in action. 100% client-side, no data stored.',
  keywords: [
    'API tester',
    'TOON API testing',
    'test API endpoints',
    'TOON format testing',
    'API request tool',
    'REST API tester',
  ],
  canonical: 'https://toontools.com/tools/api-tester',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
