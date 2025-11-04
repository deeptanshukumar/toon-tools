'use client'

import { useState, useMemo } from 'react'
import { ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { encode as gptEncode } from 'gpt-tokenizer'
import { encode as encodeToon } from '@toon-format/toon'

export function TokenSavingsDemo() {
  const [activeExample, setActiveExample] = useState(0)
  
  const examples = [
    {
      name: 'User Profile',
      json: {
        "id": 12345,
        "username": "john_doe",
        "email": "john@example.com",
        "profile": {
          "firstName": "John",
          "lastName": "Doe",
          "age": 30,
          "city": "San Francisco"
        },
        "preferences": {
          "theme": "dark",
          "notifications": true,
          "language": "en"
        }
      }
    },
    {
      name: 'API Response',
      json: {
        "status": "success",
        "data": [
          { "id": 1, "name": "Product A", "price": 29.99 },
          { "id": 2, "name": "Product B", "price": 49.99 },
          { "id": 3, "name": "Product C", "price": 19.99 }
        ],
        "metadata": {
          "total": 3,
          "page": 1,
          "limit": 10
        }
      }
    },
    {
      name: 'Chat Messages',
      json: {
        "conversation": [
          { "role": "user", "content": "Hello!" },
          { "role": "assistant", "content": "Hi there!" },
          { "role": "user", "content": "How are you?" }
        ],
        "timestamp": "2024-01-15T10:30:00Z",
        "userId": "user_123"
      }
    }
  ]
  
  const currentExample = examples[activeExample]
  const jsonStr = JSON.stringify(currentExample.json, null, 2)
  const toonStr = useMemo(() => {
    try {
      return encodeToon(currentExample.json)
    } catch {
      return 'Error encoding'
    }
  }, [currentExample])
  
  const jsonTokens = gptEncode(jsonStr).length
  const toonTokens = gptEncode(toonStr).length
  const savings = Math.round(((jsonTokens - toonTokens) / jsonTokens) * 100)
  
  return (
    <section className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">See the Difference</h2>
          <p className="text-xl text-muted-foreground">
            Real examples showing immediate token savings
          </p>
        </div>
        
        {/* Example Selector */}
        <div className="flex justify-center gap-4 mb-8">
          {examples.map((example, idx) => (
            <button
              key={idx}
              onClick={() => setActiveExample(idx)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeExample === idx
                  ? 'bg-green-600 text-white shadow-lg scale-105'
                  : 'bg-background border border-border hover:border-green-500/50'
              }`}
            >
              {example.name}
            </button>
          ))}
        </div>
        
        {/* Comparison Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* JSON */}
          <div className="bg-background border border-border rounded-lg overflow-hidden">
            <div className="bg-muted px-4 py-3 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">JSON Format</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">{jsonTokens} tokens</span>
                </div>
              </div>
            </div>
            <pre className="p-4 text-sm overflow-x-auto max-h-[400px] overflow-y-auto">
              <code>{jsonStr}</code>
            </pre>
          </div>
          
          {/* TOON */}
          <div className="bg-background border border-green-500/30 rounded-lg overflow-hidden shadow-lg shadow-green-500/10">
            <div className="bg-green-500/10 px-4 py-3 border-b border-green-500/30">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-green-600 dark:text-green-400">TOON Format</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-green-600 dark:text-green-400 font-semibold">{toonTokens} tokens</span>
                  <div className="px-2 py-1 rounded bg-green-600 text-white text-xs font-bold flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    {savings}% saved
                  </div>
                </div>
              </div>
            </div>
            <pre className="p-4 text-sm overflow-x-auto max-h-[400px] overflow-y-auto">
              <code className="text-green-600 dark:text-green-400">{toonStr}</code>
            </pre>
          </div>
        </div>
        
        {/* Stats Summary */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-background border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold mb-2">{jsonTokens}</div>
            <div className="text-sm text-muted-foreground">JSON Tokens</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{toonTokens}</div>
            <div className="text-sm text-muted-foreground">TOON Tokens</div>
          </div>
          <div className="bg-background border border-border rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{savings}%</div>
            <div className="text-sm text-muted-foreground">Token Savings</div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/playground" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
          >
            Try Interactive Playground
            <ArrowRight className="h-5 w-5" />
          </Link>
          <p className="mt-4 text-sm text-muted-foreground">
            Test with your own data • No signup required • Works offline
          </p>
        </div>
      </div>
    </section>
  )
}
