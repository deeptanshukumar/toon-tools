import Link from 'next/link'
import { Github, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">TOON Tools</h3>
            <p className="text-sm text-muted-foreground">
              Free TOON converter tools for AI developers. Reduce LLM token usage by 30-60%.
            </p>
            <div className="flex gap-4">
              <Link href="https://github.com/toon-format/toon" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com/toontools" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Tools</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/tools/json-to-toon" className="text-muted-foreground hover:text-foreground">JSON to TOON</Link></li>
              <li><Link href="/tools/toon-to-json" className="text-muted-foreground hover:text-foreground">TOON to JSON</Link></li>
              <li><Link href="/tools/csv-toon" className="text-muted-foreground hover:text-foreground">CSV Converter</Link></li>
              <li><Link href="/tools/yaml-toon" className="text-muted-foreground hover:text-foreground">YAML Converter</Link></li>
              <li><Link href="/tools/xml-toon" className="text-muted-foreground hover:text-foreground">XML Converter</Link></li>
              <li><Link href="/tools/validator" className="text-muted-foreground hover:text-foreground">TOON Validator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/docs" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
              <li><Link href="/playground" className="text-muted-foreground hover:text-foreground">Playground</Link></li>
              <li><Link href="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
              <li><Link href="/benchmarks" className="text-muted-foreground hover:text-foreground">Benchmarks</Link></li>
              <li><Link href="/faq" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TOON Tools. All rights reserved. Built with ❤️ for the AI community.</p>
          <p className="mt-2">
            TOON format by{' '}
            <Link href="https://github.com/toon-format/toon" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">
              @toon-format
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
