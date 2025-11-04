import { Metadata } from 'next'
import { constructMetadata } from '@/lib/seo'

export const metadata: Metadata = constructMetadata({
  title: 'JSON to TOON Converter - Free Online Tool | Reduce LLM Tokens by 60%',
  description: 'Convert JSON to TOON format instantly and save up to 60% on LLM tokens. Free, fast, 100% client-side. Perfect for optimizing GPT-4, Claude, and Gemini API calls. No signup required.',
  keywords: [
    'JSON to TOON converter',
    'JSON TOON online',
    'reduce GPT-4 tokens',
    'optimize LLM costs',
    'API token savings',
    'free JSON converter',
    'token optimization tool',
  ],
  canonical: 'https://toontools.com/tools/json-to-toon',
})

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
