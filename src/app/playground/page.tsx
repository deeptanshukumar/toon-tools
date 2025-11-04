'use client'

import { useState, useEffect } from 'react'
import { Editor } from '@monaco-editor/react'
import { Card } from '@/components/ui/card'
import { Shield, TrendingDown } from 'lucide-react'
import { encode } from '@toon-format/toon'
import { countTokens } from '@/lib/tokenizer'
import { simpleExample } from '@/lib/example-data'

export default function PlaygroundPage() {
  const [jsonInput, setJsonInput] = useState(simpleExample)
  const [toonOutput, setToonOutput] = useState('')
  const [csvOutput, setCsvOutput] = useState('')
  const [yamlOutput, setYamlOutput] = useState('')
  const [xmlOutput, setXmlOutput] = useState('')
  
  const convert = async () => {
    try {
      const parsed = JSON.parse(jsonInput)
      
      // TOON
      const toon = encode(parsed, { indent: 2, delimiter: ',', lengthMarker: false })
      setToonOutput(toon)
      
      // CSV
      if (Array.isArray(parsed) || (typeof parsed === 'object' && Object.values(parsed)[0] && Array.isArray(Object.values(parsed)[0]))) {
        const Papa = await import('papaparse')
        const data = Array.isArray(parsed) ? parsed : Object.values(parsed)[0] as any[]
        const csv = Papa.unparse(data)
        setCsvOutput(csv)
      } else {
        setCsvOutput('// CSV requires array of objects')
      }
      
      // YAML
      const yaml = await import('js-yaml')
      const yamlStr = yaml.dump(parsed, { indent: 2 })
      setYamlOutput(yamlStr)
      
      // XML
      const { XMLBuilder } = await import('fast-xml-parser')
      const builder = new XMLBuilder({ format: true, indentBy: '  ' })
      const xmlStr = builder.build(parsed)
      setXmlOutput(xmlStr)
      
    } catch (err) {
      console.error('Conversion error:', err)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (jsonInput.trim()) {
        convert()
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [jsonInput])

  const formats = [
    { name: 'JSON', value: jsonInput, lang: 'json', editable: true },
    { name: 'TOON', value: toonOutput, lang: 'plaintext', editable: false },
    { name: 'CSV', value: csvOutput, lang: 'plaintext', editable: false },
    { name: 'YAML', value: yamlOutput, lang: 'yaml', editable: false },
    { name: 'XML', value: xmlOutput, lang: 'xml', editable: false },
  ]

  const tokenCounts = formats.map(f => ({
    name: f.name,
    tokens: f.value ? countTokens(f.value).tokens : 0
  }))

  const maxTokens = Math.max(...tokenCounts.map(t => t.tokens))

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-7xl mx-auto mb-8">
          <h1 className="text-4xl font-bold mb-3 text-foreground">
            Format Comparison Playground
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Compare JSON, TOON, CSV, YAML, and XML side-by-side with real-time token analysis
          </p>
          
          {/* Privacy Notice */}
          <div className="flex items-start gap-3 p-4 rounded-lg border border-green-500/20 bg-green-500/5">
            <Shield className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-foreground font-medium mb-1">
                100% Client-Side Processing
              </p>
              <p className="text-sm text-muted-foreground">
                All conversions happen in your browser. No data leaves your machine.
              </p>
            </div>
          </div>
        </div>

        {/* JSON Input */}
        <div className="max-w-7xl mx-auto mb-6">
          <Card className="p-4 border border-border vercel-border">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-sm font-semibold text-foreground">JSON Input (Edit Here)</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {countTokens(jsonInput).tokens} tokens
                </p>
              </div>
            </div>
            <div className="border border-border rounded-md overflow-hidden">
              <Editor
                height="250px"
                defaultLanguage="json"
                value={jsonInput}
                onChange={(value) => setJsonInput(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                  padding: { top: 12, bottom: 12 },
                }}
              />
            </div>
          </Card>
        </div>

        {/* Format Comparison Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {formats.slice(1).map((format) => (
            <Card key={format.name} className="p-4 border border-border vercel-border">
              <div className="mb-3">
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {format.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {format.value ? countTokens(format.value).tokens : 0} tokens
                </p>
              </div>
              <div className="border border-border rounded-md overflow-hidden">
                <Editor
                  height="350px"
                  defaultLanguage={format.lang}
                  value={format.value || `// ${format.name} output...`}
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 12,
                    lineNumbers: 'off',
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    automaticLayout: true,
                    padding: { top: 12, bottom: 12 },
                  }}
                  theme="vs-dark"
                />
              </div>
            </Card>
          ))}
        </div>

        {/* Token Comparison */}
        <div className="max-w-7xl mx-auto">
          <Card className="p-6 border border-green-500/20 bg-green-500/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <TrendingDown className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Token Count Comparison</h3>
                <p className="text-sm text-muted-foreground">Lower is better for LLM efficiency</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 mb-6">
              {tokenCounts.map((format) => {
                const percentage = maxTokens > 0 ? (format.tokens / maxTokens) * 100 : 0
                const isLowest = format.tokens > 0 && format.tokens === Math.min(...tokenCounts.filter(t => t.tokens > 0).map(t => t.tokens))
                
                return (
                  <div key={format.name} className={`p-4 rounded-lg bg-background border ${isLowest ? 'border-green-500/50' : 'border-border'}`}>
                    <div className="text-xs text-muted-foreground mb-2">
                      {format.name}
                    </div>
                    <div className={`text-2xl font-bold mb-3 ${isLowest ? 'text-green-600 dark:text-green-400' : 'text-foreground'}`}>
                      {format.tokens}
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-500 ${isLowest ? 'bg-green-500' : 'bg-foreground/20'}`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Savings Highlight */}
            {toonOutput && jsonInput && (
              <div className="p-4 rounded-lg bg-background border border-green-500/30">
                <p className="text-sm text-center">
                  <span className="text-green-600 dark:text-green-400 font-bold text-lg">
                    TOON saves {((1 - countTokens(toonOutput).tokens / countTokens(jsonInput).tokens) * 100).toFixed(1)}%
                  </span>
                  {' '}compared to JSON ({countTokens(jsonInput).tokens - countTokens(toonOutput).tokens} tokens)
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
