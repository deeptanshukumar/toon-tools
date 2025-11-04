import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Zap } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              <Sparkles className="h-4 w-4" />
              <span>100% Free • No Signup Required</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start Saving on Tokens Today
            </h2>
            <p className="text-xl md:text-2xl mb-4 opacity-90 max-w-2xl mx-auto">
              Join thousands of developers reducing LLM costs by 50%
            </p>
            <p className="text-lg opacity-80 mb-10 max-w-xl mx-auto">
              Convert your data to TOON format and watch your token costs drop instantly
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="/tools/json-to-toon">
                <Button 
                  size="lg" 
                  className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 h-auto font-bold shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Start Converting Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/playground">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-6 h-auto font-semibold transition-all hover:scale-105"
                >
                  Try Interactive Playground
                </Button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-8 border-t border-white/20">
              <div>
                <div className="text-3xl font-bold mb-1">50%</div>
                <div className="text-sm opacity-80">Token Savings</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">&lt;1ms</div>
                <div className="text-sm opacity-80">Conversion Speed</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-1">100%</div>
                <div className="text-sm opacity-80">Privacy First</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
