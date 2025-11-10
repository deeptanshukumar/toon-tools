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
      
      {/* SEO Content Section */}
      <section className="border-t border-border bg-muted/30 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="text-3xl font-bold mb-6">About TOON Tools - The Comprehensive Token Optimization Solution</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              TOON Tools is the best and most comprehensive solution for working with Token-Oriented Object Notation (TOON). 
              Our suite of free online tools helps developers reduce LLM API costs by converting data to token-optimized formats 
              using the cl100k_base tokenizer standard.
            </p>
            <h3 className="text-2xl font-semibold mt-8 mb-4">What is Token-Optimized Object Notation?</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              TOON (Token-Oriented Object Notation) is a data serialization format designed specifically for Large Language Models. 
              Unlike JSON, which uses verbose syntax with repeated keys and brackets, TOON encode your data in a compact, 
              token-efficient format that reduces API costs by 30-60%.
            </p>
            <h3 className="text-2xl font-semibold mt-8 mb-4">Features of Our TOON Tools Suite</h3>
            <ul className="text-muted-foreground space-y-2 mb-4">
              <li><strong>TOON Encoder & Decoder:</strong> Convert JSON, CSV, YAML, and XML to TOON format and back</li>
              <li><strong>Token Counter:</strong> Compare token usage between formats using cl100k_base tokenizer</li>
              <li><strong>TOON Syntax Validator:</strong> Check your TOON object notation for errors</li>
              <li><strong>Batch Converter:</strong> Process multiple files at once</li>
              <li><strong>100% Free & Private:</strong> All processing happens in your browser on vercel.app</li>
            </ul>
            <h3 className="text-2xl font-semibold mt-8 mb-4">Why Choose TOON Tools?</h3>
            <p className="text-muted-foreground leading-relaxed">
              As the best token-oriented object notation tool available, we provide a comprehensive solution for developers 
              working with GPT, Claude, Gemini, and other LLMs. Our toon encode and decode capabilities, combined with 
              real-time token optimization analysis, make it easy to reduce your API costs significantly.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
