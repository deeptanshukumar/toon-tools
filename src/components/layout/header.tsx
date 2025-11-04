'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, Moon, Sun, Github } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'

const navigation = [
  { name: 'Tools', href: '/#tools' },
  { name: 'Playground', href: '/playground' },
  { name: 'Docs', href: '/docs' },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const handleToolsClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault()
      const toolsSection = document.getElementById('tools')
      if (toolsSection) {
        toolsSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-foreground flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" className="text-background" />
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" className="text-background" />
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" className="text-background" />
              </svg>
            </div>
            <span className="text-lg font-semibold text-foreground">TOON Tools</span>
          </Link>

          <div className="hidden md:flex gap-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={item.name === 'Tools' ? handleToolsClick : undefined}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  pathname?.startsWith(item.href.split('/')[1] === '' ? item.href : `/${item.href.split('/')[1]}`)
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Link href="https://github.com/johannschopplich/toon" target="_blank" rel="noopener noreferrer">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Github className="h-4 w-4" />
              <span className="sr-only">GitHub</span>
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-8 w-8"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  if (item.name === 'Tools') {
                    handleToolsClick(e)
                  }
                  setMobileMenuOpen(false)
                }}
                className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
