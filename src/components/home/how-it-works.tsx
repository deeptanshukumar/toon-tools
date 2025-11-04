'use client'

import { Upload, RefreshCw, Download, Zap, Shield, Code2 } from 'lucide-react'

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Input Your Data',
      description: 'Paste JSON, CSV, YAML, or XML directly into the editor. Or upload files with drag & drop.',
      features: ['Supports multiple formats', 'Syntax highlighting', 'Instant validation'],
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: RefreshCw,
      title: 'Auto-Convert to TOON',
      description: 'Our encoder analyzes your data structure and converts it to optimized TOON format instantly.',
      features: ['Smart compression', 'Structure preservation', 'No data loss'],
      color: 'from-purple-500 to-pink-600'
    },
    {
      icon: Download,
      title: 'Copy or Download',
      description: 'Get your optimized TOON output. Copy to clipboard, download as file, or use directly in your app.',
      features: ['Multiple export options', 'Token count analysis', 'Ready for LLMs'],
      color: 'from-green-500 to-emerald-600'
    }
  ]
  
  const benefits = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Conversion happens in milliseconds using optimized WebAssembly',
      gradient: 'from-yellow-500 to-orange-600'
    },
    {
      icon: Shield,
      title: '100% Private',
      description: 'All processing happens in your browser. No data ever leaves your device',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Code2,
      title: 'Open Source',
      description: 'Built on the official @toon-format/toon library with full transparency',
      gradient: 'from-blue-500 to-indigo-600'
    }
  ]
  
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground">
            Convert your data in three simple steps
          </p>
        </div>
        
        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <div key={idx} className="relative">
                {/* Connector Line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-border to-transparent" />
                )}
                
                <div className="relative bg-background border border-border rounded-lg p-8 hover:border-green-500/50 transition-all hover:shadow-lg">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm shadow-lg">
                    {idx + 1}
                  </div>
                  
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${step.color} mb-4 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  
                  {/* Features */}
                  <ul className="space-y-2">
                    {step.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* Benefits */}
        <div className="bg-muted/30 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl font-bold text-center mb-8">Why Choose TOON Tools?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <div key={idx} className="text-center">
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${benefit.gradient} mb-4 shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
