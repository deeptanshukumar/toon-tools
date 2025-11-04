'use client'

import { Bot, Database, Cloud, Code2, MessageSquare, FileJson } from 'lucide-react'
import Link from 'next/link'

export function UseCases() {
  const useCases = [
    {
      icon: Bot,
      title: 'LLM Applications',
      description: 'Reduce token costs and improve context window efficiency',
      gradient: 'from-green-500 to-emerald-600',
      examples: [
        'Chat history compression',
        'RAG document storage',
        'Prompt template optimization',
        'Function calling payloads'
      ],
      code: `// Before: 450 tokens
const context = JSON.stringify({
  "conversation": [...messages],
  "metadata": {...}
});

// After: 225 tokens (50% saved!)
const context = encodeToon({
  conversation: [...messages],
  metadata: {...}
});`
    },
    {
      icon: Cloud,
      title: 'API Development',
      description: 'Faster responses with smaller payloads',
      gradient: 'from-blue-500 to-cyan-600',
      examples: [
        'REST API responses',
        'GraphQL query results',
        'Webhook payloads',
        'Real-time data streaming'
      ],
      code: `// API Response
app.get('/users', (req, res) => {
  const users = getUsersFromDB();
  
  // Send TOON format (50% smaller)
  res.set('Content-Type', 'application/toon');
  res.send(encodeToon(users));
  
  // Clients can easily decode:
  // const users = decodeToon(response);
});`
    },
    {
      icon: Database,
      title: 'Data Storage',
      description: 'Store more data in less space',
      gradient: 'from-purple-500 to-pink-600',
      examples: [
        'Cache optimization',
        'LocalStorage efficiency',
        'Database exports',
        'Backup compression'
      ],
      code: `// Store in localStorage
const data = fetchLargeDataset();

// Traditional JSON: 5MB
localStorage.setItem('data', 
  JSON.stringify(data));

// TOON format: 2.5MB (50% saved!)
localStorage.setItem('data', 
  encodeToon(data));`
    },
    {
      icon: MessageSquare,
      title: 'Chat & Messaging',
      description: 'Optimize message history and conversation data',
      gradient: 'from-orange-500 to-red-600',
      examples: [
        'Message history storage',
        'Context preservation',
        'Multi-turn conversations',
        'Chatbot training data'
      ],
      code: `// Store conversation efficiently
const conversation = [
  { role: "user", content: "..." },
  { role: "assistant", content: "..." },
  // ... more messages
];

// 60% smaller than JSON
const compressed = encodeToon(conversation);
await db.saveConversation(userId, compressed);`
    },
    {
      icon: Code2,
      title: 'Development Tools',
      description: 'Integrate TOON into your development workflow',
      gradient: 'from-yellow-500 to-orange-600',
      examples: [
        'CI/CD pipelines',
        'Build optimization',
        'Config file compression',
        'Test data generation'
      ],
      code: `// package.json or any config
{
  "scripts": {
    "build": "toon-convert config.json",
    "optimize": "toon-batch src/data"
  },
  "dependencies": {
    "@toon-format/toon": "^0.7.3"
  }
}`
    },
    {
      icon: FileJson,
      title: 'Data Processing',
      description: 'Process and transform data efficiently',
      gradient: 'from-indigo-500 to-purple-600',
      examples: [
        'ETL pipelines',
        'Data migration',
        'Format conversion',
        'Batch processing'
      ],
      code: `// Batch convert files
import { encode } from '@toon-format/toon';
import fs from 'fs';

const files = fs.readdirSync('./data');
files.forEach(file => {
  const json = JSON.parse(fs.readFileSync(file));
  const toon = encode(json);
  fs.writeFileSync(file + '.toon', toon);
});`
    }
  ]
  
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Use Cases</h2>
          <p className="text-xl text-muted-foreground">
            From LLM apps to APIs - TOON saves tokens everywhere
          </p>
        </div>
        
        <div className="grid gap-8">
          {useCases.map((useCase, idx) => {
            const Icon = useCase.icon
            return (
              <div 
                key={idx} 
                className="bg-background border border-border rounded-2xl overflow-hidden hover:border-green-500/50 transition-all hover:shadow-lg"
              >
                <div className="grid md:grid-cols-2 gap-8 p-8">
                  {/* Left: Description */}
                  <div>
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${useCase.gradient} mb-4 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-3">{useCase.title}</h3>
                    <p className="text-muted-foreground mb-6">{useCase.description}</p>
                    
                    <div className="space-y-2">
                      <div className="font-semibold mb-3">Perfect for:</div>
                      {useCase.examples.map((example, eIdx) => (
                        <div key={eIdx} className="flex items-center gap-2 text-sm">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                          <span>{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Right: Code Example */}
                  <div className="bg-muted/50 rounded-lg p-4 border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Example Code
                      </span>
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        TypeScript
                      </span>
                    </div>
                    <pre className="text-sm overflow-x-auto">
                      <code className="text-foreground">{useCase.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        
        {/* CTA */}
        <div className="text-center mt-12">
          <Link 
            href="/docs" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-background hover:bg-muted border border-border hover:border-green-500/50 rounded-lg font-semibold transition-all"
          >
            View Full Documentation
          </Link>
        </div>
      </div>
    </section>
  )
}
