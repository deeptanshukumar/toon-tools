'use client'

import { useState, useEffect } from 'react'
import { Editor } from '@monaco-editor/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield,
  CheckCircle2,
  AlertCircle,
  Info,
  Sparkles,
  WandSparkles
} from 'lucide-react'
import { decode } from '@toon-format/toon'
import { countTokens } from '@/lib/tokenizer'

const exampleToon = `users[3]{id:i,name,email,active:b}:
  1,Alice Johnson,alice@example.com,true
  2,Bob Smith,bob@example.com,true
  3,Carol White,carol@example.com,false`

export default function ValidatorPage() {
  const [input, setInput] = useState(exampleToon)
  const [isValid, setIsValid] = useState<boolean | null>(null)
  const [error, setError] = useState<string>('')
  const [warnings, setWarnings] = useState<string[]>([])
  const [formatted, setFormatted] = useState('')

  const validate = () => {
    setError('')
    setWarnings([])
    setIsValid(null)
    setFormatted('')

    if (!input.trim()) {
      setError('Input is empty')
      setIsValid(false)
      return
    }

    try {
      // Try to decode the TOON
      const decoded = decode(input, { strict: true })
      setIsValid(true)
      
      // Check for common issues/warnings
      const newWarnings: string[] = []
      
      // Check if it's too verbose (could be more compact)
      if (input.length > 1000 && JSON.stringify(decoded).length < input.length * 0.5) {
        newWarnings.push('TOON format may be less efficient than JSON for this data structure')
      }
      
      // Check for very long lines
      const lines = input.split('\n')
      const longLines = lines.filter(l => l.length > 200)
      if (longLines.length > 0) {
        newWarnings.push(`${longLines.length} line(s) exceed 200 characters - consider breaking them up`)
      }
      
      // Check for missing type annotations
      if (input.includes('{') && !input.includes(':i') && !input.includes(':b') && !input.includes(':f')) {
        newWarnings.push('No type annotations found - consider adding :i, :b, or :f for better type safety')
      }
      
      setWarnings(newWarnings)
      
      // Format the output nicely
      setFormatted(JSON.stringify(decoded, null, 2))
      
    } catch (err: any) {
      setIsValid(false)
      setError(err.message || 'Invalid TOON syntax')
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim()) {
        validate()
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [input])

  const tokenCount = input ? countTokens(input).tokens : 0

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-8">
          <h1 className="text-4xl font-bold mb-3 text-foreground">
            TOON Validator & Formatter
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Validate TOON syntax, catch errors, and get optimization suggestions
          </p>
          
          {/* Privacy Notice */}
          <div className="flex items-start gap-3 p-4 rounded-lg border border-green-500/20 bg-green-500/5">
            <Shield className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium mb-1">
                100% Client-Side Processing
              </p>
              <p className="text-sm text-muted-foreground">
                All validation happens in your browser. Your TOON data is never uploaded to our servers.
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Editor */}
          <div className="space-y-4">
            <Card className="p-4 border border-border vercel-border">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">
                  TOON Input
                </h2>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{tokenCount} tokens</span>
                </div>
              </div>
              <div className="border border-border rounded-md overflow-hidden">
                <Editor
                  height="450px"
                  defaultLanguage="plaintext"
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

            {/* Validation Status */}
            {isValid !== null && (
              <Card className={`p-4 ${isValid ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/10'}`}>
                <div className="flex items-center gap-3">
                  {isValid ? (
                    <>
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">Valid TOON Syntax</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Your TOON is correctly formatted and can be decoded
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-red-600 dark:text-red-400">Invalid TOON Syntax</p>
                        <p className="text-xs text-muted-foreground mt-1">{error}</p>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            )}

            {/* Warnings */}
            {warnings.length > 0 && (
              <Card className="p-4 border-yellow-500/20 bg-yellow-500/5">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-2">Suggestions</p>
                    <ul className="space-y-1.5">
                      {warnings.map((warning, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-yellow-600 dark:text-yellow-400">•</span>
                          <span>{warning}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Decoded Output */}
          <div>
            <Card className="p-4 border border-border vercel-border">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold text-foreground">
                  Decoded JSON
                </h2>
                {isValid && (
                  <div className="flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Valid</span>
                  </div>
                )}
              </div>
              <div className="border border-border rounded-md overflow-hidden">
                <Editor
                  height="450px"
                  defaultLanguage="json"
                  value={formatted || '// Decoded JSON will appear here...'}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 13,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    automaticLayout: true,
                    padding: { top: 16, bottom: 16 }
                  }}
                  theme="vs-dark"
                />
              </div>
            </Card>

            {/* Quick Tips */}
            <Card className="p-6 border border-border mt-4">
              <div className="flex items-center gap-2 mb-4">
                <WandSparkles className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h3 className="text-sm font-semibold text-foreground">Quick Tips</h3>
              </div>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Use type annotations (:i, :b, :f) for integers, booleans, and floats</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Array syntax: arrayName[count]&#123;fields&#125;:</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Separate values with commas, rows with newlines</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400">✓</span>
                  <span>Keep lines under 200 characters for readability</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>

        {/* Info Section */}
        <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Instant</div>
            <div className="text-sm text-muted-foreground">Validation</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">Real-time</div>
            <div className="text-sm text-muted-foreground">Feedback</div>
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
