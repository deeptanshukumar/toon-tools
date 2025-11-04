'use client'

import { useState, useEffect } from 'react'
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
  Zap
} from 'lucide-react'
import { decode } from '@toon-format/toon'
import { downloadFile, copyToClipboard } from '@/lib/utils'
import { countTokens } from '@/lib/tokenizer'

const toonExample = `users[3]{id:i,name,email,active:b}:
  1,Alice Johnson,alice@example.com,true
  2,Bob Smith,bob@example.com,true
  3,Carol White,carol@example.com,false`

export default function ToonToJsonPage() {
  const [toonInput, setToonInput] = useState(toonExample)
  const [jsonOutput, setJsonOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [conversionTime, setConversionTime] = useState(0)

  // Convert TOON to JSON
  const convertToJson = () => {
    setError('')
    const startTime = performance.now()
    
    try {
      // Decode TOON to JSON
      const jsonResult = decode(toonInput, {
        indent: 2,
        strict: true
      })
      
      // Format as pretty JSON
      const formatted = JSON.stringify(jsonResult, null, 2)
      setJsonOutput(formatted)
      setConversionTime(performance.now() - startTime)
    } catch (err: any) {
      setError(err.message || 'Failed to convert TOON to JSON')
      setJsonOutput('')
    }
  }

  // Auto-convert on input change (with debounce)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (toonInput.trim()) {
        convertToJson()
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [toonInput])

  const handleCopy = async () => {
    try {
      await copyToClipboard(jsonOutput)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownload = () => {
    downloadFile(jsonOutput, 'output.json', 'application/json')
  }

  const toonTokens = toonInput ? countTokens(toonInput).tokens : 0
  const jsonTokens = jsonOutput ? countTokens(jsonOutput).tokens : 0

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-12 max-w-[1400px]">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-3 text-white">
            TOON to JSON Converter
          </h1>
          <p className="text-gray-400 text-sm mb-4">
            Convert Token-Oriented Object Notation back to standard JSON format
          </p>
          
          {/* Privacy Notice */}
          <div className="flex items-start gap-3 p-4 rounded-lg border border-green-500/20 bg-green-500/5">
            <Shield className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-gray-300 font-medium mb-1">
                100% Client-Side Processing
              </p>
              <p className="text-xs text-gray-400">
                All conversions run entirely in your browser. No data is ever sent to our servers. 
                Your files remain private and secure on your machine.
              </p>
            </div>
          </div>
        </div>

        {/* Converter Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* TOON Input */}
          <Card className="p-4 bg-zinc-900 border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white">
                TOON Input
              </h2>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Sparkles className="h-3.5 w-3.5" />
                <span>{toonTokens} tokens</span>
              </div>
            </div>
            <div className="border border-zinc-800 rounded-lg overflow-hidden">
              <Editor
                height="500px"
                defaultLanguage="plaintext"
                value={toonInput}
                onChange={(value) => setToonInput(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                  padding: { top: 16, bottom: 16 }
                }}
              />
            </div>
          </Card>

          {/* JSON Output */}
          <Card className="p-4 bg-zinc-900 border-zinc-800">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white">
                JSON Output
              </h2>
              <div className="flex items-center gap-3">
                <div className="text-xs text-gray-400">
                  {jsonTokens} tokens
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  disabled={!jsonOutput}
                  className="h-7 w-7 p-0 hover:bg-zinc-800"
                >
                  {copied ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDownload}
                  disabled={!jsonOutput}
                  className="h-7 w-7 p-0 hover:bg-zinc-800"
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="border border-zinc-800 rounded-lg overflow-hidden">
              <Editor
                height="500px"
                defaultLanguage="json"
                value={jsonOutput || '// Converted JSON will appear here...'}
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 14,
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
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6">
            <Card className="p-4 bg-red-500/10 border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium">Error:</span>
                <span>{error}</span>
              </div>
            </Card>
          </div>
        )}


      </div>
    </div>
  )
}
