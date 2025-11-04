'use client'

import { useState, useEffect } from 'react'
import { Editor } from '@monaco-editor/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield,
  Sparkles,
  DollarSign,
  BarChart3,
  FileText,
  Copy,
  CheckCircle2
} from 'lucide-react'
import { countTokens, compareTokenCounts } from '@/lib/tokenizer'
import { copyToClipboard } from '@/lib/utils'
import { encode } from '@toon-format/toon'

const exampleText = `{
  "users": [
    {"id": 1, "name": "Alice", "active": true},
    {"id": 2, "name": "Bob", "active": false}
  ]
}`

export default function TokenCounterPage() {
  const [input, setInput] = useState(exampleText)
  const [format, setFormat] = useState<'json' | 'text'>('json')
  const [copied, setCopied] = useState(false)

  const tokenCount = input ? countTokens(input).tokens : 0
  const charCount = input.length
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0
  const lineCount = input ? input.split('\n').length : 0

  // Pricing calculations (GPT-5 pricing as of November 2025)
  const inputCostPer1M = 1.25   // $1.25 per 1M input tokens (GPT-5)
  const outputCostPer1M = 10.00 // $10.00 per 1M output tokens (GPT-5)
  
  const inputCost = (tokenCount / 1_000_000) * inputCostPer1M
  const outputCost = (tokenCount / 1_000_000) * outputCostPer1M

  // Compare with TOON if JSON
  let toonComparison = null
  if (format === 'json') {
    try {
      const jsonObj = JSON.parse(input)
      const toonStr = encode(jsonObj)
      const comparison = compareTokenCounts(input, toonStr)
      if (comparison.toonTokens) {
        toonComparison = comparison
      }
    } catch (e) {
      // Ignore if not valid JSON
    }
  }

  const handleCopy = async () => {
    const report = `Token Counter Report
━━━━━━━━━━━━━━━━━━━━
Tokens: ${tokenCount}
Characters: ${charCount}
Words: ${wordCount}
Lines: ${lineCount}

Cost Estimates (GPT-5):
Input: $${inputCost.toFixed(6)}
Output: $${outputCost.toFixed(6)}
${toonComparison ? `
TOON Comparison:
Original (JSON): ${toonComparison.jsonTokens} tokens
TOON Format: ${toonComparison.toonTokens} tokens
Savings: ${toonComparison.tokensSaved} tokens (${toonComparison.reductionPercentage.toFixed(1)}%)
Cost Savings: $${toonComparison.costSavings.toFixed(6)}
` : ''}
━━━━━━━━━━━━━━━━━━━━`

    try {
      await copyToClipboard(report)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-8">
          <h1 className="text-4xl font-bold mb-3 text-foreground">
            Token Counter & Cost Calculator
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Count tokens, calculate LLM costs, and compare formats
          </p>
          
          {/* Privacy Notice */}
          <div className="flex items-start gap-3 p-4 rounded-lg border border-green-500/20 bg-green-500/5">
            <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium mb-1">
                100% Client-Side Processing
              </p>
              <p className="text-sm text-muted-foreground">
                All counting happens in your browser. Your content is never uploaded or analyzed by our servers.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Editor */}
          <div className="lg:col-span-2">
            <Card className="p-4 border border-border vercel-border">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">
                  Your Text
                </h2>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant={format === 'text' ? 'default' : 'ghost'}
                    onClick={() => setFormat('text')}
                    className="h-7 text-xs"
                  >
                    Text
                  </Button>
                  <Button
                    size="sm"
                    variant={format === 'json' ? 'default' : 'ghost'}
                    onClick={() => setFormat('json')}
                    className="h-7 text-xs"
                  >
                    JSON
                  </Button>
                </div>
              </div>
              <div className="border border-border rounded-md overflow-hidden">
                <Editor
                  height="600px"
                  defaultLanguage={format}
                  value={input}
                  onChange={(value) => setInput(value || '')}
                  theme="vs-dark"
                  options={{
                    minimap: { enabled: false },
                    fontSize: 13,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 }
                  }}
                />
              </div>
            </Card>
          </div>

          {/* Stats Sidebar */}
          <div className="space-y-4">
            {/* Token Count */}
            <Card className="p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Sparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Total Tokens</p>
                  <p className="text-2xl font-bold text-foreground">{tokenCount.toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Characters:</span>
                  <span className="text-foreground font-medium">{charCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Words:</span>
                  <span className="text-foreground font-medium">{wordCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Lines:</span>
                  <span className="text-foreground font-medium">{lineCount.toLocaleString()}</span>
                </div>
              </div>
            </Card>

            {/* Cost Estimate */}
            <Card className="p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">GPT-5 Cost</p>
                  <p className="text-xl font-bold text-foreground">${inputCost.toFixed(4)}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Input:</span>
                  <span className="text-foreground font-medium">${inputCost.toFixed(6)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Output:</span>
                  <span className="text-foreground font-medium">${outputCost.toFixed(6)}</span>
                </div>
                <div className="pt-2 border-t border-border text-xs text-muted-foreground">
                  Based on $30/$60 per 1M tokens
                </div>
              </div>
            </Card>

            {/* TOON Comparison */}
            {toonComparison && (
              <Card className="p-6 bg-green-500/5 border-green-500/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-500/10 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">TOON Savings</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {toonComparison.reductionPercentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>JSON:</span>
                    <span className="text-foreground font-medium">{toonComparison.jsonTokens} tokens</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>TOON:</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">{toonComparison.toonTokens} tokens</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Saved:</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">{toonComparison.tokensSaved} tokens</span>
                  </div>
                  <div className="pt-2 border-t border-green-500/20">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Cost savings:</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">${toonComparison.costSavings.toFixed(6)}</span>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Export Report */}
            <Button
              onClick={handleCopy}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium"
            >
              {copied ? (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Report
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Accurate</div>
            <div className="text-sm text-muted-foreground">Token Counting</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Real-time</div>
            <div className="text-sm text-muted-foreground">Cost Estimation</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Private</div>
          </div>
        </div>
      </div>
    </div>
  )
}
