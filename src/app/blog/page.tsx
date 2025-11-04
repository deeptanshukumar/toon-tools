import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog - TOON Tools',
  description: 'Latest updates, tutorials, and insights about TOON format and token optimization',
}

const blogPosts = [
  {
    title: 'Introducing TOON Tools: The Complete Converter Suite',
    excerpt: 'Learn how TOON Tools can help you reduce LLM token costs by 50% with our free online converters.',
    date: '2024-01-15',
    readTime: '5 min read',
    slug: 'introducing-toon-tools',
    category: 'Announcement'
  },
  {
    title: 'How TOON Format Reduces Token Usage',
    excerpt: 'Deep dive into the technical details of how TOON achieves 30-60% token savings compared to JSON.',
    date: '2024-01-12',
    readTime: '8 min read',
    slug: 'how-toon-reduces-tokens',
    category: 'Technical'
  },
  {
    title: 'Best Practices for LLM Token Optimization',
    excerpt: 'Practical tips and strategies for reducing token costs in your AI applications.',
    date: '2024-01-10',
    readTime: '6 min read',
    slug: 'token-optimization-best-practices',
    category: 'Tutorial'
  },
  {
    title: 'Integrating TOON into Your API',
    excerpt: 'Step-by-step guide to adding TOON support to your REST or GraphQL API.',
    date: '2024-01-08',
    readTime: '10 min read',
    slug: 'integrating-toon-api',
    category: 'Tutorial'
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Latest updates, tutorials, and insights about TOON format and token optimization
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="container py-12">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, idx) => (
            <article 
              key={idx}
              className="bg-background border border-border rounded-lg overflow-hidden hover:border-green-500/50 transition-all hover:shadow-lg group"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 font-medium">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.readTime}
                  </div>
                </div>

                <h2 className="text-2xl font-bold mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {post.excerpt}
                </p>

                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="text-center mt-12 p-8 bg-muted/30 rounded-lg max-w-2xl mx-auto">
          <p className="text-muted-foreground">
            More articles coming soon! Follow us on{' '}
            <Link href="https://twitter.com/toontools" className="text-green-600 dark:text-green-400 hover:underline">
              Twitter
            </Link>
            {' '}for updates.
          </p>
        </div>
      </div>
    </div>
  )
}
