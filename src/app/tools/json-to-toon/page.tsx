'use client'

import { useState, useEffect, Suspense } from 'react'
import { Editor } from '@monaco-editor/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  Copy, 
  Download, 
  Shield,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Zap,
  Database,
  TrendingDown,
  Info
} from 'lucide-react'
import { encode } from '@toon-format/toon'
import { downloadFile, copyToClipboard } from '@/lib/utils'
import { countTokens, compareTokenCounts } from '@/lib/tokenizer'
import { simpleExample, ecommerceExample } from '@/lib/example-data'
import { EditorErrorBoundary } from '@/components/error-boundary'
import { MonacoSkeleton } from '@/components/monaco-skeleton'
import { useKeyboardShortcuts, getShortcutText } from '@/hooks/use-keyboard-shortcuts'

export default function JsonToToonPage() {
  const [jsonInput, setJsonInput] = useState(simpleExample)
  const [toonOutput, setToonOutput] = useState('')
  const [error, setError] = useState('')
  const [tokenStats, setTokenStats] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const convertToToon = () => {
    setError('')
    
    try {
      const parsedJson = JSON.parse(jsonInput)
      const toonResult = encode(parsedJson, {
        indent: 2,
        delimiter: ',',
        lengthMarker: false
      })
      
      setToonOutput(toonResult)
      const stats = compareTokenCounts(jsonInput, toonResult)
      setTokenStats(stats)
    } catch (err: any) {
      setError(err.message || 'Failed to convert JSON to TOON')
      setToonOutput('')
      setTokenStats(null)
    }
  }

  const handleClear = () => {
    setJsonInput('')
    setToonOutput('')
    setError('')
    setTokenStats(null)
  }

  const handleCopy = async () => {
    try {
      await copyToClipboard(toonOutput)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownload = () => {
    downloadFile(toonOutput, 'output.toon', 'text/plain')
  }

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onConvert: convertToToon,
    onCopy: handleCopy,
    onClear: handleClear
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      if (jsonInput.trim()) {
        convertToToon()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [jsonInput])

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-8">
          <h1 className="text-4xl font-bold mb-3 text-foreground">
            JSON to TOON Converter
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Convert JSON to Token-Oriented Object Notation and reduce token usage by up to 60%
          </p>
          
          {/* Privacy Notice - Vercel style */}
          <div className="flex items-start gap-3 p-4 rounded-lg border border-green-500/20 bg-green-500/5">
            <Shield className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium mb-1">
                100% Client-Side Processing
              </p>
              <p className="text-sm text-muted-foreground">
                All conversions run entirely in your browser. No data is ever sent to our servers. 
                Your files remain private and secure on your machine.
              </p>
            </div>
          </div>
        </div>

        {/* Example Buttons */}
        <div className="max-w-5xl mx-auto mb-6 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setJsonInput(simpleExample)}
            className="text-xs"
          >
            Simple Example
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setJsonInput(ecommerceExample)}
            className="text-xs"
          >
            E-commerce Data
          </Button>
        </div>

        {/* Converter Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* JSON Input */}
          <Card className="p-4 border border-border vercel-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">JSON Input</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {countTokens(jsonInput).tokens} tokens • {getShortcutText('Enter')} to convert
                </p>
              </div>
            </div>
            <EditorErrorBoundary>
              <Suspense fallback={<MonacoSkeleton height="450px" />}>
                <div className="border border-border rounded-md overflow-hidden">
                  <Editor
                    height="450px"
                    defaultLanguage="json"
                    value={jsonInput}
                    onChange={(value) => setJsonInput(value || '')}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: false },
                      fontSize: 13,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      wordWrap: 'on',
                      automaticLayout: true,
                      padding: { top: 16, bottom: 16 },
                    }}
                  />
                </div>
              </Suspense>
            </EditorErrorBoundary>
          </Card>

          {/* TOON Output */}
          <Card className="p-4 border border-border vercel-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">TOON Output</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {toonOutput ? countTokens(toonOutput).tokens : 0} tokens • {getShortcutText('K')} to copy
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  disabled={!toonOutput}
                  className="h-7 w-7 p-0"
                  title={`Copy (${getShortcutText('K')})`}
                >
                  {copied ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDownload}
                  disabled={!toonOutput}
                  className="h-7 w-7 p-0"
                  title="Download as .toon file"
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <EditorErrorBoundary>
              <Suspense fallback={<MonacoSkeleton height="450px" />}>
                <div className="border border-border rounded-md overflow-hidden">
                  <Editor
                    height="450px"
                    defaultLanguage="plaintext"
                    value={toonOutput || '// Converted TOON will appear here...'}
                    options={{
                      readOnly: true,
                      minimap: { enabled: false },
                      fontSize: 13,
                      lineNumbers: 'on',
                      scrollBeyondLastLine: false,
                      wordWrap: 'on',
                      automaticLayout: true,
                      padding: { top: 16, bottom: 16 },
                    }}
                    theme="vs-dark"
                  />
                </div>
              </Suspense>
            </EditorErrorBoundary>
          </Card>
        </div>

        {/* Error Display */}
        {error && (
          <div className="max-w-5xl mx-auto mb-6">
            <div className="flex items-start gap-3 p-4 rounded-lg border border-red-500/20 bg-red-500/5">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-600 dark:text-red-400">Conversion Error</p>
                <p className="text-sm text-muted-foreground mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Token Statistics */}
        {tokenStats && (
          <div className="max-w-5xl mx-auto">
            <Card className="p-6 border border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <TrendingDown className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Token Savings</h3>
                  <p className="text-sm text-muted-foreground">Compare the efficiency</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="p-4 rounded-lg bg-background border border-border">
                  <div className="text-xs text-muted-foreground mb-1">JSON Tokens</div>
                  <div className="text-2xl font-bold text-foreground">
                    {tokenStats.jsonTokens.toLocaleString()}
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-background border border-border">
                  <div className="text-xs text-muted-foreground mb-1">TOON Tokens</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {tokenStats.toonTokens.toLocaleString()}
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-background border border-border">
                  <div className="text-xs text-muted-foreground mb-1">Reduction</div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {tokenStats.reductionPercentage.toFixed(1)}%
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-md bg-background/50">
                <Info className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-xs text-muted-foreground">
                  <strong className="text-foreground">{tokenStats.tokensSaved.toLocaleString()} tokens saved</strong> • 
                  Estimated cost savings: <strong className="text-foreground">${tokenStats.costSavings.toFixed(4)}</strong> per request (GPT-5)
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* Info Section */}
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">30-60%</div>
            <div className="text-sm text-muted-foreground">Token Reduction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">0ms</div>
            <div className="text-sm text-muted-foreground">Server Latency</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">100%</div>
            <div className="text-sm text-muted-foreground">Private & Secure</div>
          </div>
        </div>
      </div>
    </div>
  )
}
