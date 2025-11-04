'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { Shield, Send, Clock, FileJson } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Editor from '@monaco-editor/react'
import { encode as encodeToon, decode as decodeToon } from '@toon-format/toon'

export default function APITesterPage() {
  const [method, setMethod] = useState<'GET' | 'POST'>('GET')
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/users/1')
  const [requestBody, setRequestBody] = useState('')
  const [useToon, setUseToon] = useState(false)
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ time: 0, size: 0, status: 0 })

  const handleSendRequest = async () => {
    setLoading(true)
    const startTime = performance.now()
    
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': useToon ? 'application/toon' : 'application/json',
        }
      }

      if (method === 'POST' && requestBody) {
        try {
          const jsonBody = JSON.parse(requestBody)
          options.body = useToon ? encodeToon(jsonBody) : JSON.stringify(jsonBody)
        } catch (e) {
          throw new Error('Invalid JSON in request body')
        }
      }

      const res = await fetch(url, options)
      const endTime = performance.now()
      
      const text = await res.text()
      let displayText = text
      
      // Parse and convert response
      try {
        // First parse the response (most APIs return JSON)
        const responseData = JSON.parse(text)
        
        if (useToon) {
          // Convert JSON response to TOON format for display
          displayText = encodeToon(responseData, {
            indent: 2,
            delimiter: ',',
            lengthMarker: false
          })
        } else {
          // Show as formatted JSON
          displayText = JSON.stringify(responseData, null, 2)
        }
      } catch (parseError) {
        // If parsing fails, show raw response
        displayText = text + '\n\n// Error: Could not parse response'
      }
      
      setResponse(displayText)
      setStats({
        time: Math.round(endTime - startTime),
        size: new Blob([text]).size,
        status: res.status
      })
    } catch (error: any) {
      setResponse(`Error: ${error.message}`)
      setStats({ time: 0, size: 0, status: 0 })
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Privacy Badge */}
      <div className="border-b bg-green-500/5">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="text-muted-foreground">
              All API requests are made from your browser • No data stored on our servers
            </span>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">API Tester</h1>
          <p className="text-muted-foreground">
            Test TOON format with real API endpoints
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Request Panel */}
          <div className="space-y-6">
            <div className="bg-background border border-border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Request</h2>
              
              {/* Method & URL */}
              <div className="flex gap-3 mb-4">
                <select 
                  value={method}
                  onChange={(e) => setMethod(e.target.value as 'GET' | 'POST')}
                  className="px-4 py-2 bg-background border border-border rounded-lg"
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                </select>
                
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter API URL..."
                  className="flex-1 px-4 py-2 bg-background border border-border rounded-lg"
                />
              </div>

              {/* TOON Toggle */}
              <div className="flex items-center gap-3 mb-4 p-3 bg-muted/50 rounded-lg">
                <input
                  type="checkbox"
                  id="useToon"
                  checked={useToon}
                  onChange={(e) => setUseToon(e.target.checked)}
                  className="h-4 w-4"
                />
                <label htmlFor="useToon" className="text-sm font-medium cursor-pointer">
                  Use TOON format for request/response
                </label>
              </div>

              {/* Request Body (for POST) */}
              {method === 'POST' && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Request Body (JSON)</label>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <Editor
                      height="200px"
                      defaultLanguage="json"
                      value={requestBody}
                      onChange={(value) => setRequestBody(value || '')}
                      theme="vs-dark"
                      options={{
                        minimap: { enabled: false },
                        fontSize: 13,
                        lineNumbers: 'off',
                        scrollBeyondLastLine: false,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Send Button */}
              <Button 
                onClick={handleSendRequest}
                disabled={loading || !url}
                className="w-full bg-green-600 hover:bg-green-700"
                size="lg"
              >
                <Send className="h-4 w-4 mr-2" />
                {loading ? 'Sending...' : 'Send Request'}
              </Button>
            </div>

            {/* Stats */}
            {stats.status > 0 && (
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-background border border-border rounded-lg p-4 text-center">
                  <div className={`text-2xl font-bold mb-1 ${
                    stats.status >= 200 && stats.status < 300 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {stats.status}
                  </div>
                  <div className="text-xs text-muted-foreground">Status</div>
                </div>
                <div className="bg-background border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold mb-1">{stats.time}ms</div>
                  <div className="text-xs text-muted-foreground">Time</div>
                </div>
                <div className="bg-background border border-border rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold mb-1">{stats.size}B</div>
                  <div className="text-xs text-muted-foreground">Size</div>
                </div>
              </div>
            )}
          </div>

          {/* Response Panel */}
          <div className="bg-background border border-border rounded-lg overflow-hidden">
            <div className="bg-muted px-6 py-4 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold">Response</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileJson className="h-4 w-4" />
                {useToon ? 'TOON' : 'JSON'}
              </div>
            </div>
            <div className="h-[500px]">
              <Editor
                height="100%"
                defaultLanguage={useToon ? 'plaintext' : 'json'}
                value={response || '// Response will appear here...'}
                theme="vs-dark"
                options={{
                  readOnly: true,
                  minimap: { enabled: false },
                  fontSize: 13,
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </div>
        </div>

        {/* Example Endpoints */}
        <div className="mt-8 bg-muted/30 rounded-lg p-6">
          <h3 className="font-semibold mb-4">Try These Example APIs:</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { label: 'JSONPlaceholder User', url: 'https://jsonplaceholder.typicode.com/users/1' },
              { label: 'JSONPlaceholder Posts', url: 'https://jsonplaceholder.typicode.com/posts' },
              { label: 'JSONPlaceholder Comments', url: 'https://jsonplaceholder.typicode.com/comments?postId=1' },
              { label: 'Random User API', url: 'https://randomuser.me/api/' },
            ].map((example, idx) => (
              <button
                key={idx}
                onClick={() => setUrl(example.url)}
                className="text-left px-4 py-3 bg-background border border-border rounded-lg hover:border-green-500/50 transition-all text-sm"
              >
                <div className="font-medium mb-1">{example.label}</div>
                <div className="text-xs text-muted-foreground truncate">{example.url}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
