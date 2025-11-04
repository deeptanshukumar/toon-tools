import Link from 'next/link'
import { 
  ArrowRight,
  FileJson,
  FileType,
  Table,
  FileCode,
  Code2,
  PlaySquare,
  Calculator,
  CheckCircle2,
  Package,
  Terminal,
  BookOpen,
  Download
} from 'lucide-react'

const tools = [
  {
    icon: FileJson,
    title: 'JSON to TOON',
    description: 'Convert JSON to token-optimized format',
    href: '/tools/json-to-toon',
    badge: 'Popular',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    icon: FileType,
    title: 'TOON to JSON',
    description: 'Convert TOON back to JSON format',
    href: '/tools/toon-to-json',
    gradient: 'from-blue-500 to-cyan-600'
  },
  {
    icon: Table,
    title: 'CSV Converter',
    description: 'Bidirectional CSV and TOON conversion',
    href: '/tools/csv-toon',
    gradient: 'from-purple-500 to-pink-600'
  },
  {
    icon: FileCode,
    title: 'YAML Converter',
    description: 'Convert YAML to TOON format',
    href: '/tools/yaml-toon',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    icon: Code2,
    title: 'XML Converter',
    description: 'Convert XML to TOON format',
    href: '/tools/xml-toon',
    gradient: 'from-yellow-500 to-orange-600'
  },
  {
    icon: PlaySquare,
    title: 'Playground',
    description: 'Compare all formats side-by-side',
    href: '/playground',
    badge: 'New',
    gradient: 'from-green-500 to-teal-600'
  },
  {
    icon: Calculator,
    title: 'Token Counter',
    description: 'Analyze and count tokens in any format',
    href: '/tools/token-counter',
    gradient: 'from-indigo-500 to-purple-600'
  },
  {
    icon: CheckCircle2,
    title: 'Validator',
    description: 'Validate TOON syntax and structure',
    href: '/tools/validator',
    gradient: 'from-green-500 to-emerald-600'
  },
  {
    icon: Package,
    title: 'Batch Converter',
    description: 'Convert multiple files at once',
    href: '/tools/batch',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    icon: Terminal,
    title: 'API Tester',
    description: 'Test TOON with API endpoints',
    href: '/tools/api-tester',
    gradient: 'from-gray-500 to-slate-600'
  },
  {
    icon: BookOpen,
    title: 'Documentation',
    description: 'Learn about TOON format',
    href: '/docs',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    icon: Download,
    title: 'Downloads',
    description: 'Get CLI tools and libraries',
    href: '/downloads',
    gradient: 'from-green-500 to-lime-600'
  },
]

export function FeaturesGrid() {
  return (
    <section id="tools" className="py-20 sm:py-24 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
            Complete Toolset
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to work with TOON format. All tools run entirely in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link 
                key={tool.href}
                href={tool.href}
                className="group relative block p-6 border border-border rounded-lg bg-card hover:border-green-500 hover:shadow-lg transition-all duration-300"
              >
                {tool.badge && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center rounded-full bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-500/20">
                      {tool.badge}
                    </span>
                  </div>
                )}
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {tool.description}
                    </p>
                  </div>
                  
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </Link>
            )
          })}
        </div>

        {/* Privacy Banner - Vercel style */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-lg border border-green-500/20 bg-green-500/5 p-8">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Your Privacy is Guaranteed
                </h3>
                <p className="text-muted-foreground">
                  All conversions happen directly in your browser. No data is ever sent to our servers. 
                  Works completely offline. Open source and auditable.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
