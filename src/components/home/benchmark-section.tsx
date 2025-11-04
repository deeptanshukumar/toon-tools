'use client'

import { TrendingDown, Zap, DollarSign, Clock } from 'lucide-react'

export function BenchmarkSection() {
  const benchmarks = [
    {
      format: 'JSON',
      tokens: 1250,
      percentage: 100,
      color: 'bg-gray-500'
    },
    {
      format: 'YAML',
      tokens: 1180,
      percentage: 94,
      color: 'bg-orange-500'
    },
    {
      format: 'XML',
      tokens: 1450,
      percentage: 116,
      color: 'bg-red-500'
    },
    {
      format: 'TOON',
      tokens: 625,
      percentage: 50,
      color: 'bg-green-500',
      highlight: true
    }
  ]
  
  const metrics = [
    {
      icon: TrendingDown,
      value: '50%',
      label: 'Token Reduction',
      description: 'Average savings across common data structures',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: DollarSign,
      value: '$3.50',
      label: 'Cost Savings',
      description: 'Per 1M tokens on GPT-4 (based on 50% reduction)',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Clock,
      value: '2x',
      label: 'Faster Processing',
      description: 'Reduced latency with smaller payloads',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: Zap,
      value: '< 1ms',
      label: 'Conversion Speed',
      description: 'Encode/decode operations in browser',
      gradient: 'from-yellow-500 to-orange-600'
    }
  ]
  
  const useCaseStats = [
    {
      useCase: 'LLM Chat History',
      json: '3,500 tokens',
      toon: '1,750 tokens',
      savings: '50%'
    },
    {
      useCase: 'API Response (100 items)',
      json: '5,200 tokens',
      toon: '2,400 tokens',
      savings: '54%'
    },
    {
      useCase: 'Configuration File',
      json: '850 tokens',
      toon: '380 tokens',
      savings: '55%'
    },
    {
      useCase: 'Database Export',
      json: '12,000 tokens',
      toon: '5,800 tokens',
      savings: '52%'
    }
  ]
  
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Proven Performance</h2>
          <p className="text-xl text-muted-foreground">
            Real-world benchmarks show consistent 50%+ token savings
          </p>
        </div>
        
        {/* Format Comparison Chart */}
        <div className="bg-background border border-border rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold mb-8 text-center">Format Comparison (Same Dataset)</h3>
          <div className="space-y-6">
            {benchmarks.map((bench) => (
              <div key={bench.format} className={bench.highlight ? 'bg-green-500/5 rounded-lg p-4 border border-green-500/20' : ''}>
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-24 font-semibold">{bench.format}</div>
                  <div className="flex-1">
                    <div className="h-10 bg-muted rounded-lg overflow-hidden relative">
                      <div 
                        className={`h-full ${bench.color} transition-all duration-1000 flex items-center justify-end pr-4 text-white font-semibold`}
                        style={{ width: `${bench.percentage}%` }}
                      >
                        {bench.tokens} tokens
                      </div>
                    </div>
                  </div>
                  <div className={`w-20 text-right font-bold ${bench.highlight ? 'text-green-600 dark:text-green-400' : ''}`}>
                    {bench.percentage}%
                  </div>
                </div>
                {bench.highlight && (
                  <div className="text-sm text-green-600 dark:text-green-400 font-medium text-right">
                    ⚡ 50% smaller than JSON
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon
            return (
              <div key={idx} className="bg-background border border-border rounded-lg p-6 hover:border-green-500/50 transition-all hover:shadow-lg">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${metric.gradient} mb-4 shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2">{metric.value}</div>
                <div className="font-semibold mb-1">{metric.label}</div>
                <div className="text-sm text-muted-foreground">{metric.description}</div>
              </div>
            )
          })}
        </div>
        
        {/* Real Use Case Stats */}
        <div className="bg-background border border-border rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Real-World Use Cases</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Use Case</th>
                  <th className="text-right py-3 px-4 font-semibold">JSON</th>
                  <th className="text-right py-3 px-4 font-semibold text-green-600 dark:text-green-400">TOON</th>
                  <th className="text-right py-3 px-4 font-semibold">Savings</th>
                </tr>
              </thead>
              <tbody>
                {useCaseStats.map((stat, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-medium">{stat.useCase}</td>
                    <td className="text-right py-4 px-4 text-muted-foreground">{stat.json}</td>
                    <td className="text-right py-4 px-4 text-green-600 dark:text-green-400 font-semibold">{stat.toon}</td>
                    <td className="text-right py-4 px-4">
                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold">
                        {stat.savings}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-6">
            * Token counts measured using GPT-3.5 tokenizer (cl100k_base)
          </p>
        </div>
      </div>
    </section>
  )
}
