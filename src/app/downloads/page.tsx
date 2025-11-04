import { Metadata } from 'next'
import { Download, Terminal, Code2, Package, BookOpen, Github } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Downloads - TOON Tools',
  description: 'Download TOON CLI tools, libraries, and integrations',
}

export default function DownloadsPage() {
  const downloads = [
    {
      icon: Package,
      name: '@toon-format/toon',
      description: 'Official JavaScript/TypeScript library for Node.js and browsers',
      version: 'v0.7.3',
      platform: 'npm',
      command: 'npm install @toon-format/toon',
      link: 'https://www.npmjs.com/package/@toon-format/toon',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      icon: Terminal,
      name: 'TOON CLI',
      description: 'Command-line tool for converting files and batch processing',
      version: 'v1.0.0',
      platform: 'npm',
      command: 'npm install -g toon-cli',
      link: '#',
      gradient: 'from-blue-500 to-cyan-600',
      comingSoon: true
    },
    {
      icon: Code2,
      name: 'Python Library',
      description: 'TOON encoder/decoder for Python applications',
      version: 'v0.3.1',
      platform: 'pip',
      command: 'pip install toon-format',
      link: '#',
      gradient: 'from-yellow-500 to-orange-600',
      comingSoon: true
    },
    {
      icon: Github,
      name: 'VS Code Extension',
      description: 'Syntax highlighting and validation for TOON files',
      version: 'v1.0.0',
      platform: 'VS Code',
      command: 'Search "TOON" in Extensions',
      link: '#',
      gradient: 'from-purple-500 to-pink-600',
      comingSoon: true
    },
  ]

  const integrations = [
    {
      name: 'Express.js Middleware',
      description: 'Add TOON support to your Express API',
      code: `import express from 'express'
import { toonMiddleware } from 'express-toon'

const app = express()
app.use(toonMiddleware())

app.get('/api/data', (req, res) => {
  res.toon({ users: [...] })
})`
    },
    {
      name: 'Next.js API Route',
      description: 'Use TOON in Next.js API routes',
      code: `import { encode } from '@toon-format/toon'

export default function handler(req, res) {
  const data = { message: 'Hello' }
  
  res.setHeader('Content-Type', 'application/toon')
  res.send(encode(data))
}`
    },
    {
      name: 'React Hook',
      description: 'Client-side TOON encoding/decoding',
      code: `import { useToon } from '@toon-format/react'

function MyComponent() {
  const { encode, decode } = useToon()
  
  const toonData = encode(myObject)
  const jsonData = decode(toonString)
  
  return <div>{/* ... */}</div>
}`
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Downloads</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Libraries, CLI tools, and integrations for TOON format
          </p>
        </div>
      </div>

      <div className="container py-12">
        {/* Main Downloads */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Official Packages</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {downloads.map((item, idx) => {
              const Icon = item.icon
              return (
                <div 
                  key={idx}
                  className="bg-background border border-border rounded-lg p-6 hover:border-green-500/50 transition-all hover:shadow-lg relative overflow-hidden"
                >
                  {item.comingSoon && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold">
                      Coming Soon
                    </div>
                  )}
                  
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${item.gradient} mb-4 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                  
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-sm font-semibold">
                      {item.version}
                    </span>
                    <span className="text-sm text-muted-foreground">{item.platform}</span>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-3 mb-4 font-mono text-sm">
                    {item.command}
                  </div>
                  
                  {!item.comingSoon && (
                    <a 
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:gap-3 transition-all"
                    >
                      <Download className="h-4 w-4" />
                      View on {item.platform}
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Code Examples */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Integration Examples</h2>
          <div className="space-y-6">
            {integrations.map((integration, idx) => (
              <div 
                key={idx}
                className="bg-background border border-border rounded-lg overflow-hidden"
              >
                <div className="p-6 border-b border-border">
                  <h3 className="text-xl font-bold mb-2">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">{integration.description}</p>
                </div>
                <div className="bg-muted/50 p-6">
                  <pre className="text-sm overflow-x-auto">
                    <code>{integration.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Start */}
        <section className="bg-green-500/5 border border-green-500/20 rounded-2xl p-8">
          <div className="flex items-start gap-4">
            <div className="inline-flex p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg flex-shrink-0">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-3">Quick Start Guide</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">1. Install the package</h3>
                  <code className="block bg-background border border-border rounded px-3 py-2 text-sm">
                    npm install @toon-format/toon
                  </code>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">2. Import and use</h3>
                  <pre className="bg-background border border-border rounded p-3 text-sm overflow-x-auto">
{`import { encode, decode } from '@toon-format/toon'

// Convert JSON to TOON
const data = { name: "John", age: 30 }
const toonStr = encode(data)

// Convert TOON back to JSON
const jsonObj = decode(toonStr)`}
                  </pre>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">3. Check the docs</h3>
                  <a 
                    href="/docs" 
                    className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:gap-3 transition-all"
                  >
                    Read Full Documentation →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
