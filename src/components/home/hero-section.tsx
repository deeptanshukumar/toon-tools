import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Zap, Shield } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Subtle grid background - Vercel style */}
      <div className="absolute inset-0 bg-grid-pattern" />
      
      {/* Gradient fade at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      
      <div className="relative container mx-auto px-4 py-20 sm:py-28 lg:py-36">
        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-sm">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-muted-foreground">100% Client-Side • Zero Data Collection</span>
            </div>
          </div>
          
          {/* Main Heading */}
          <div className="text-center mb-4">
            <div className="inline-block px-4 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-4">
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                TOON = Token-Oriented Object Notation
              </span>
            </div>
          </div>
          
          <h1 className="text-center text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="block text-foreground mb-2">
              Token-Optimized
            </span>
            <span className="block text-gradient text-gradient-dark">
              Data Conversion
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-center text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Convert JSON, CSV, YAML, and XML to TOON format. 
            Reduce LLM token usage by up to{' '}
            <span className="text-green-600 dark:text-green-400 font-semibold">60%</span>
            {' '}and save on API costs.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              asChild 
              size="lg" 
              className="text-base h-12 px-8 bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="/tools/json-to-toon" className="inline-flex items-center gap-2">
                Start Converting
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="text-base h-12 px-8 border-border hover:bg-accent"
            >
              <Link href="/playground">
                View Playground
              </Link>
            </Button>
          </div>
          
          {/* Stats - Vercel minimalist style */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold text-foreground mb-2">60%</div>
              <div className="text-sm text-muted-foreground">Token Reduction</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-4xl sm:text-5xl font-bold mb-2">
                <Zap className="h-10 w-10 text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400">Fast</span>
              </div>
              <div className="text-sm text-muted-foreground">Instant Results</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-4xl sm:text-5xl font-bold mb-2">
                <Shield className="h-10 w-10 text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400">Safe</span>
              </div>
              <div className="text-sm text-muted-foreground">Private & Secure</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
