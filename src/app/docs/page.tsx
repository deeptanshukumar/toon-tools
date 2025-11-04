import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Book, 
  Code, 
  Zap, 
  Shield, 
  ArrowRight,
  CheckCircle2,
  Terminal,
} from 'lucide-react'

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4 text-foreground">
            Documentation
          </h1>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Token-Oriented Object Notation
          </p>
        </div>

        {/* What is TOON */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            What is TOON?
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              TOON (Token-Oriented Object Notation) is a compact data format designed specifically 
              to reduce token usage in Large Language Model (LLM) applications. It achieves{' '}
              <strong className="text-green-600 dark:text-green-400">30-60% token reduction</strong> compared to JSON 
              while maintaining full data fidelity and human readability.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <Card className="p-6 border border-border vercel-border">
              <Zap className="h-8 w-8 text-green-600 dark:text-green-400 mb-3" />
              <h3 className="font-semibold text-lg mb-2">30-60% Smaller</h3>
              <p className="text-sm text-muted-foreground">
                Significantly reduces LLM API costs
              </p>
            </Card>
            <Card className="p-6 border border-border vercel-border">
              <Shield className="h-8 w-8 text-green-600 dark:text-green-400 mb-3" />
              <h3 className="font-semibold text-lg mb-2">100% Private</h3>
              <p className="text-sm text-muted-foreground">
                All conversions run in your browser
              </p>
            </Card>
            <Card className="p-6 border border-border vercel-border">
              <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400 mb-3" />
              <h3 className="font-semibold text-lg mb-2">Lossless</h3>
              <p className="text-sm text-muted-foreground">
                Perfect round-trip conversion
              </p>
            </Card>
          </div>
        </section>

        {/* Quick Example */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Quick Example
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-muted-foreground">JSON</h3>
                <span className="text-xs text-muted-foreground">89 tokens</span>
              </div>
              <Card className="p-4 border border-border bg-card">
                <pre className="text-sm overflow-x-auto">
                  <code>{`{
  "users": [
    {
      "id": 1,
      "name": "Alice",
      "role": "admin"
    },
    {
      "id": 2,
      "name": "Bob",
      "role": "user"
    }
  ]
}`}</code>
                </pre>
              </Card>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-green-600 dark:text-green-400">TOON</h3>
                <span className="text-xs text-green-600 dark:text-green-400">34 tokens</span>
              </div>
              <Card className="p-4 border border-green-500/20 bg-green-500/5">
                <pre className="text-sm overflow-x-auto">
                  <code>{`users[2]{id,name,role}:
  1,Alice,admin
  2,Bob,user`}</code>
                </pre>
              </Card>
              <div className="mt-3 text-sm text-green-600 dark:text-green-400 font-medium">
                ✓ 62% reduction (55 tokens saved)
              </div>
            </div>
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Key Features
          </h2>
          
          <div className="space-y-4">
            {[
              {
                title: 'Compact Syntax',
                description: 'Removes unnecessary brackets, quotes, and whitespace while preserving structure'
              },
              {
                title: 'Type Inference',
                description: 'Automatically detects numbers, booleans, and null values'
              },
              {
                title: 'Array-First Design',
                description: 'Optimized for tabular data and arrays of objects (common in APIs)'
              },
              {
                title: 'Human Readable',
                description: 'Easy to read and understand, similar to CSV but more powerful'
              },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-3 p-4 border border-border rounded-lg hover:border-green-500/50 transition-colors">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Perfect For
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 border border-border vercel-border">
              <h4 className="font-semibold text-lg mb-4">LLM Applications</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Reduce ChatGPT API costs
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Claude context optimization
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  GPT-4 token efficiency
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Few-shot learning examples
                </li>
              </ul>
            </Card>
            
            <Card className="p-6 border border-border vercel-border">
              <h4 className="font-semibold text-lg mb-4">Data Processing</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  API response formatting
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Database exports
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Log file compression
                </li>
                <li className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
                  Configuration files
                </li>
              </ul>
            </Card>
          </div>
        </section>

        {/* Privacy */}
        <section className="mb-16">
          <Card className="p-8 border border-green-500/20 bg-green-500/5">
            <div className="flex items-start gap-4">
              <Shield className="h-12 w-12 text-green-600 dark:text-green-400 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold mb-3 text-foreground">
                  Your Privacy is Guaranteed
                </h2>
                <p className="text-muted-foreground mb-4">
                  All TOON Tools run <strong className="text-foreground">100% client-side</strong> in your browser. 
                  Your data never touches our servers or any third-party services.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    'No data is uploaded or stored',
                    'Works completely offline',
                    'No analytics or tracking',
                    'Open source and auditable'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </section>

        {/* NPM Package */}
        <section className="mb-16">
          <Card className="p-6 border border-border vercel-border">
            <div className="flex items-start gap-4 mb-4">
              <Terminal className="h-8 w-8 text-green-600 dark:text-green-400" />
              <div>
                <h2 className="text-2xl font-bold text-foreground">Use in Your Projects</h2>
                <p className="text-muted-foreground mt-2">
                  Install the official TOON library via npm:
                </p>
              </div>
            </div>
            
            <Card className="p-4 bg-muted border-0 mb-4">
              <code className="text-sm">npm install @toon-format/toon</code>
            </Card>
            
            <Card className="p-4 bg-muted border-0">
              <pre className="text-sm overflow-x-auto">
                <code>{`import { encode, decode } from '@toon-format/toon'

// Convert to TOON
const toon = encode({ users: [{ id: 1, name: 'Alice' }] })

// Convert back to JSON
const json = decode(toon)`}</code>
              </pre>
            </Card>
          </Card>
        </section>

        {/* Get Started */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">
            Ready to Get Started?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-foreground text-background hover:bg-foreground/90">
              <Link href="/tools/json-to-toon">
                Try JSON to TOON <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-border">
              <Link href="/playground">
                Explore Playground
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
