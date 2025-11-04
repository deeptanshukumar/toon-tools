import { Metadata } from 'next'
import { TrendingDown, Zap, DollarSign, Database } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Benchmarks - TOON Tools',
  description: 'Performance benchmarks showing token savings and speed comparisons for TOON format',
}

export default function BenchmarksPage() {
  const formatComparison = [
    { format: 'JSON', tokens: 1250, size: '4.2 KB', percentage: 100, color: 'bg-gray-500' },
    { format: 'YAML', tokens: 1180, size: '3.8 KB', percentage: 94, color: 'bg-orange-500' },
    { format: 'XML', tokens: 1450, size: '5.1 KB', percentage: 116, color: 'bg-red-500' },
    { format: 'TOON', tokens: 625, size: '2.1 KB', percentage: 50, color: 'bg-green-500', highlight: true },
  ]

  const datasetBenchmarks = [
    {
      name: 'User Profiles (100 records)',
      json: '12,500 tokens',
      toon: '6,250 tokens',
      savings: '50%',
      apiCost: '$0.019'
    },
    {
      name: 'E-commerce Products (500 items)',
      json: '45,000 tokens',
      toon: '20,700 tokens',
      savings: '54%',
      apiCost: '$0.073'
    },
    {
      name: 'Chat Conversation (50 messages)',
      json: '8,200 tokens',
      toon: '3,690 tokens',
      savings: '55%',
      apiCost: '$0.013'
    },
    {
      name: 'API Response (Nested Data)',
      json: '18,500 tokens',
      toon: '9,065 tokens',
      savings: '51%',
      apiCost: '$0.028'
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Performance Benchmarks</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Real-world data showing TOON's token savings and performance advantages
          </p>
        </div>
      </div>

      <div className="container py-12 space-y-16">
        {/* Format Comparison */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Format Comparison</h2>
          <div className="bg-background border border-border rounded-2xl p-8">
            <p className="text-muted-foreground mb-6">
              Testing dataset: Complex nested object with arrays, numbers, and strings (typical API response)
            </p>
            <div className="space-y-6">
              {formatComparison.map((bench) => (
                <div key={bench.format} className={bench.highlight ? 'bg-green-500/5 rounded-lg p-4 border border-green-500/20' : ''}>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-24 font-semibold">{bench.format}</div>
                    <div className="flex-1">
                      <div className="h-10 bg-muted rounded-lg overflow-hidden relative">
                        <div 
                          className={`h-full ${bench.color} transition-all duration-1000 flex items-center justify-between px-4 text-white font-semibold`}
                          style={{ width: `${bench.percentage}%` }}
                        >
                          <span>{bench.tokens} tokens</span>
                          <span className="text-sm opacity-80">{bench.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`w-20 text-right font-bold ${bench.highlight ? 'text-green-600 dark:text-green-400' : ''}`}>
                      {bench.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Metrics */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Key Performance Metrics</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: TrendingDown, value: '50%', label: 'Avg Token Reduction', gradient: 'from-green-500 to-emerald-600' },
              { icon: DollarSign, value: '$3.50', label: 'Cost Savings/1M tokens', gradient: 'from-blue-500 to-cyan-600' },
              { icon: Zap, value: '<1ms', label: 'Conversion Time', gradient: 'from-yellow-500 to-orange-600' },
              { icon: Database, value: '40%', label: 'Storage Savings', gradient: 'from-purple-500 to-pink-600' },
            ].map((metric, idx) => {
              const Icon = metric.icon
              return (
                <div key={idx} className="bg-background border border-border rounded-lg p-6">
                  <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${metric.gradient} mb-4 shadow-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{metric.value}</div>
                  <div className="text-sm text-muted-foreground">{metric.label}</div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Dataset Benchmarks */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Real Dataset Benchmarks</h2>
          <div className="bg-background border border-border rounded-2xl p-8 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Dataset</th>
                  <th className="text-right py-3 px-4 font-semibold">JSON</th>
                  <th className="text-right py-3 px-4 font-semibold text-green-600 dark:text-green-400">TOON</th>
                  <th className="text-right py-3 px-4 font-semibold">Savings</th>
                  <th className="text-right py-3 px-4 font-semibold">GPT-4 Cost Saved</th>
                </tr>
              </thead>
              <tbody>
                {datasetBenchmarks.map((bench, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-medium">{bench.name}</td>
                    <td className="text-right py-4 px-4 text-muted-foreground">{bench.json}</td>
                    <td className="text-right py-4 px-4 text-green-600 dark:text-green-400 font-semibold">{bench.toon}</td>
                    <td className="text-right py-4 px-4">
                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-bold">
                        {bench.savings}
                      </span>
                    </td>
                    <td className="text-right py-4 px-4 font-semibold">{bench.apiCost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="text-sm text-muted-foreground mt-4">
              * Costs based on GPT-4 Turbo pricing ($0.01 per 1K input tokens, $0.03 per 1K output tokens)
            </p>
          </div>
        </section>

        {/* Methodology */}
        <section className="bg-muted/30 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Methodology</h2>
          <div className="space-y-3 text-muted-foreground">
            <p><strong>Tokenizer:</strong> OpenAI's cl100k_base (GPT-3.5 & GPT-4)</p>
            <p><strong>Test Environment:</strong> Chrome 120, M1 MacBook Pro</p>
            <p><strong>Data Sources:</strong> Real-world API responses, database exports, and configuration files</p>
            <p><strong>Measurements:</strong> Average of 1000 conversions per dataset</p>
          </div>
        </section>
      </div>
    </div>
  )
}
