import { Metadata } from 'next'
import { ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'FAQ - TOON Tools',
  description: 'Frequently asked questions about TOON format and TOON Tools',
}

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is TOON format?',
        a: 'TOON (Token-Oriented Object Notation) is a data serialization format optimized for LLM token efficiency. It reduces token usage by 30-60% compared to JSON while maintaining all data structure and information.'
      },
      {
        q: 'Is TOON Tools free to use?',
        a: 'Yes! TOON Tools is 100% free with no signup required. All tools run in your browser for maximum privacy and speed.'
      },
      {
        q: 'Do you store my data?',
        a: 'No. All conversions happen entirely in your browser using JavaScript and WebAssembly. Your data never leaves your device and is never uploaded to any server.'
      },
      {
        q: 'Can I use TOON in production?',
        a: 'Absolutely! The @toon-format/toon library is stable, well-tested, and used by many developers. It supports Node.js, browsers, and has TypeScript definitions.'
      },
    ]
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'How does TOON reduce token usage?',
        a: 'TOON uses several techniques: removing unnecessary whitespace, optimizing key-value pair syntax, using compact data type representations, and employing efficient encoding for common patterns.'
      },
      {
        q: 'Is TOON compatible with all data types?',
        a: 'TOON supports all standard JSON data types: objects, arrays, strings, numbers, booleans, and null. It also preserves nested structures perfectly.'
      },
      {
        q: 'Can I convert TOON back to JSON?',
        a: 'Yes! TOON is fully reversible. You can convert JSON→TOON and TOON→JSON without any data loss. Both encode() and decode() functions are available.'
      },
      {
        q: 'What programming languages support TOON?',
        a: 'The official library supports JavaScript/TypeScript (Node.js and browsers). Community libraries exist for Python, Go, and Rust. You can also use the format manually in any language.'
      },
    ]
  },
  {
    category: 'Use Cases',
    questions: [
      {
        q: 'When should I use TOON?',
        a: 'Use TOON when working with LLMs (ChatGPT, Claude, etc.), storing data in token-limited contexts, or when you want to reduce API costs. It\'s perfect for chat histories, API responses, and configuration files.'
      },
      {
        q: 'Does TOON work with OpenAI API?',
        a: 'Yes! TOON works great with OpenAI, Anthropic, and other LLM APIs. Simply convert your data to TOON before sending it and convert back when receiving responses.'
      },
      {
        q: 'Can I use TOON for RAG applications?',
        a: 'Definitely! TOON is excellent for RAG (Retrieval-Augmented Generation) since it lets you fit more context in the same token budget, improving your LLM\'s knowledge base efficiency.'
      },
      {
        q: 'Is TOON good for large datasets?',
        a: 'Yes, TOON handles large datasets efficiently. The conversion is fast (<1ms for most data), and larger files see even better token savings (often 50%+).'
      },
    ]
  },
  {
    category: 'Tools & Features',
    questions: [
      {
        q: 'What converters do you offer?',
        a: 'We offer JSON↔TOON, CSV↔TOON, YAML↔TOON, XML↔TOON converters, plus a Token Counter, Validator, Batch Converter, and Interactive Playground.'
      },
      {
        q: 'Can I convert multiple files at once?',
        a: 'Yes! Use our Batch Converter tool to upload and convert multiple files simultaneously. Perfect for migrating existing data to TOON format.'
      },
      {
        q: 'Do you have an API?',
        a: 'Currently, all tools are client-side only. However, you can easily integrate the @toon-format/toon library into your own API using npm.'
      },
      {
        q: 'Is there a CLI tool?',
        a: 'Yes! Install the toon-cli package from npm: `npm install -g toon-cli`. Then use commands like `toon encode file.json` or `toon decode file.toon`.'
      },
    ]
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Everything you need to know about TOON format and TOON Tools
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="container py-12 max-w-4xl">
        <div className="space-y-12">
          {faqs.map((category, catIdx) => (
            <section key={catIdx}>
              <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-green-500/30">
                {category.category}
              </h2>
              <div className="space-y-6">
                {category.questions.map((faq, faqIdx) => (
                  <details 
                    key={faqIdx}
                    className="group bg-background border border-border rounded-lg overflow-hidden hover:border-green-500/50 transition-all"
                  >
                    <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                      <h3 className="text-lg font-semibold pr-4">{faq.q}</h3>
                      <ChevronDown className="h-5 w-5 text-muted-foreground group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="px-6 pb-6 text-muted-foreground border-t border-border pt-4">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 p-8 bg-green-500/5 border border-green-500/20 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-3">Still have questions?</h2>
          <p className="text-muted-foreground mb-6">
            Check out our documentation or join the community on GitHub
          </p>
          <div className="flex gap-4 justify-center">
            <a 
              href="/docs" 
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
            >
              Read Documentation
            </a>
            <a 
              href="https://github.com/toon-format/toon/discussions" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-background border border-border hover:border-green-500/50 rounded-lg font-semibold transition-all"
            >
              GitHub Discussions
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
