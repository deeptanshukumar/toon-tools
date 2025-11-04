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
  ArrowLeftRight,
  TrendingDown,
  Info
} from 'lucide-react'
import { xmlToToon, toonToXml } from '@/lib/converters/xml-converter'
import { downloadFile, copyToClipboard } from '@/lib/utils'
import { countTokens, compareTokenCounts } from '@/lib/tokenizer'

const xmlSimple = `<?xml version="1.0" encoding="UTF-8"?>
<users>
  <user>
    <id>1</id>
    <name>Alice</name>
    <role>admin</role>
  </user>
  <user>
    <id>2</id>
    <name>Bob</name>
    <role>user</role>
  </user>
</users>`

const xmlEcommerce = `<?xml version="1.0" encoding="UTF-8"?>
<products>
  <product>
    <product_id>1001</product_id>
    <name>Wireless Mouse</name>
    <price>29.99</price>
    <stock>150</stock>
    <category>Electronics</category>
    <featured>true</featured>
  </product>
  <product>
    <product_id>1002</product_id>
    <name>Keyboard</name>
    <price>59.99</price>
    <stock>85</stock>
    <category>Electronics</category>
    <featured>false</featured>
  </product>
</products>`

const toonExample = `users{user[2]{id:i,name,role}}:
  1,Alice,admin
  2,Bob,user`

export default function XmlToonPage() {
  const [mode, setMode] = useState<'xml-to-toon' | 'toon-to-xml'>('xml-to-toon')
  const [input, setInput] = useState(xmlSimple)
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [tokenStats, setTokenStats] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setError('')
    
    try {
      if (mode === 'xml-to-toon') {
        const result = xmlToToon(input)
        if (result.success && result.output) {
          setOutput(result.output)
          const stats = compareTokenCounts(input, result.output)
          setTokenStats(stats)
        } else {
          setError(result.error || 'Conversion failed')
          setOutput('')
          setTokenStats(null)
        }
      } else {
        const result = toonToXml(input)
        if (result.success && result.output) {
          setOutput(result.output)
          setTokenStats(null)
        } else {
          setError(result.error || 'Conversion failed')
          setOutput('')
          setTokenStats(null)
        }
      }
    } catch (err: any) {
      setError(err.message || 'Conversion failed')
      setOutput('')
      setTokenStats(null)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (input.trim()) {
        convert()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [input, mode])

  const handleCopy = async () => {
    try {
      await copyToClipboard(output)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownload = () => {
    const ext = mode === 'xml-to-toon' ? 'toon' : 'xml'
    downloadFile(output, `output.${ext}`, 'text/plain')
  }

  const toggleMode = () => {
    const newMode = mode === 'xml-to-toon' ? 'toon-to-xml' : 'xml-to-toon'
    setMode(newMode)
    setInput(newMode === 'xml-to-toon' ? xmlSimple : toonExample)
    setOutput('')
    setError('')
    setTokenStats(null)
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-5xl mx-auto mb-8">
          <h1 className="text-4xl font-bold mb-3 text-foreground">
            XML to TOON Converter
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Convert XML to Token-Oriented Object Notation and reduce token usage by up to 60%
          </p>
          
          {/* Privacy Notice */}
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
        {mode === 'xml-to-toon' && (
          <div className="max-w-5xl mx-auto mb-6 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput(xmlSimple)}
              className="text-xs"
            >
              Simple Example
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setInput(xmlEcommerce)}
              className="text-xs"
            >
              E-commerce Data
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMode}
              className="text-xs ml-auto"
            >
              <ArrowLeftRight className="h-3 w-3 mr-1" />
              Switch to TOON → XML
            </Button>
          </div>
        )}
        {mode === 'toon-to-xml' && (
          <div className="max-w-5xl mx-auto mb-6 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleMode}
              className="text-xs ml-auto"
            >
              <ArrowLeftRight className="h-3 w-3 mr-1" />
              Switch to XML → TOON
            </Button>
          </div>
        )}

        {/* Converter Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {/* Input */}
          <Card className="p-4 border border-border vercel-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  {mode === 'xml-to-toon' ? 'XML' : 'TOON'} Input
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {countTokens(input).tokens} tokens
                </p>
              </div>
            </div>
            <div className="border border-border rounded-md overflow-hidden">
              <Editor
                height="450px"
                defaultLanguage={mode === 'xml-to-toon' ? 'xml' : 'plaintext'}
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
                  padding: { top: 16, bottom: 16 },
                }}
              />
            </div>
          </Card>

          {/* Output */}
          <Card className="p-4 border border-border vercel-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  {mode === 'xml-to-toon' ? 'TOON' : 'XML'} Output
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {output ? countTokens(output).tokens : 0} tokens
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleCopy}
                  disabled={!output}
                  className="h-7 w-7 p-0"
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
                  disabled={!output}
                  className="h-7 w-7 p-0"
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
            <div className="border border-border rounded-md overflow-hidden">
              <Editor
                height="450px"
                defaultLanguage={mode === 'xml-to-toon' ? 'plaintext' : 'xml'}
                value={output || '// Converted output will appear here...'}
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

        {/* Token Statistics (only for XML to TOON) */}
        {tokenStats && mode === 'xml-to-toon' && (
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
                  <div className="text-xs text-muted-foreground mb-1">XML Tokens</div>
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
