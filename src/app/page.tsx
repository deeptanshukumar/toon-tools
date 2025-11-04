import { HeroSection } from '@/components/home/hero-section'
import { FeaturesGrid } from '@/components/home/features-grid'
import { TokenSavingsDemo } from '@/components/home/token-savings-demo'
import { HowItWorks } from '@/components/home/how-it-works'
import { UseCases } from '@/components/home/use-cases'
import { BenchmarkSection } from '@/components/home/benchmark-section'
import { CTASection } from '@/components/home/cta-section'
import { jsonLdWebsite, jsonLdOrganization, jsonLdSoftwareApplication } from '@/lib/seo'

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSoftwareApplication) }}
      />
      
      <HeroSection />
      <FeaturesGrid />
      <TokenSavingsDemo />
      <HowItWorks />
      <BenchmarkSection />
      <UseCases />
      <CTASection />
    </>
  )
}
