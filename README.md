# TOON Tools - Comprehensive Token-Oriented Object Notation Toolsuite

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://toontools.app)
[![GitHub](https://img.shields.io/github/stars/deeptanshukumar/toon-tools?style=social)](https://github.com/deeptanshukumar/toon-tools)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**The "iLovePDF of TOON Tools"** - A complete suite of conversion tools for Token-Oriented Object Notation (TOON), designed to help AI developers reduce LLM token usage by 30-60%.

🌐 **Live Demo:** [toontools.app](https://toontools.app)

## 🚀 Features

### Conversion Tools
- **JSON ↔ TOON** - Bidirectional conversion with real-time token counting
- **CSV ↔ TOON** - Transform tabular data intelligently  
- **YAML ↔ TOON** - Convert configurations to token-efficient format
- **XML ↔ TOON** - Transform XML structures to compact notation

### Analysis & Optimization
- **Format Comparison Playground** - Compare multiple formats side-by-side
- **Token Counter & Analyzer** - Advanced token counting with cost estimation
- **TOON Validator & Formatter** - Validate syntax and format code
- **Batch Converter** - Convert multiple files at once

### Developer Tools
- **API Endpoint Tester** - Test LLM APIs with TOON format
- **Code Generator** - Generate integration code in multiple languages
- **Documentation Hub** - Comprehensive guides and tutorials
- **Downloadable Scripts** - Standalone conversion scripts

## 🎯 Why TOON Tools?

- **💰 Save Money:** Reduce LLM API costs by 30-60%
- **🔒 Privacy First:** All conversions run locally in your browser
- **⚡ Lightning Fast:** Real-time conversion with instant feedback
- **🎨 Beautiful UI:** Modern, accessible interface with dark mode
- **📱 Responsive:** Works seamlessly on desktop and mobile
- **🆓 Free Forever:** No signups, no limits, completely free

## 🛠️ Tech Stack

- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Format Library:** @toon-format/toon
- **Token Counting:** gpt-tokenizer
- **Editor:** Monaco Editor
- **Charts:** Recharts
- **Icons:** Lucide React

## 📦 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

The app will be available at http://localhost:3000 (or 3001 if 3000 is in use).

## ✨ Recent Improvements

### UX Enhancements
- ✅ **Error Boundaries** - Graceful error handling for Monaco Editor
- ✅ **Loading Skeletons** - Beautiful loading states for better perceived performance
- ✅ **Keyboard Shortcuts** - Power user features:
  - `Ctrl/Cmd+Enter` - Convert/Submit
  - `Ctrl/Cmd+K` - Copy output
  - `Ctrl/Cmd+L` - Clear/Reset
  - `Ctrl/Cmd+M` - Toggle mode

### Performance Optimizations
- ✅ **Reduced Bundle Size** - Removed 6 unused dependencies (~2-3MB saved)
- ✅ **Cache Headers** - Optimized static asset caching (1 year for immutable assets)
- ✅ **Font Optimization** - Inter font with `display: swap` to prevent FOIT
- ✅ **Security Headers** - X-Frame-Options, X-Content-Type-Options, CSP-ready

### Design System
- ✅ **Vercel-Inspired Design** - Consistent, professional UI across all pages
- ✅ **Semantic Color Tokens** - Proper dark/light mode support
- ✅ **Responsive Layout** - Mobile-first, works on all screen sizes

### SEO & Marketing
- ✅ **OpenGraph Images** - Proper social media previews
- ✅ **Structured Data** - JSON-LD for better search visibility
- ✅ **Comprehensive Metadata** - Optimized for search engines

## 🏗️ Project Structure

```
toon/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with font optimization
│   │   ├── page.tsx            # Homepage
│   │   └── tools/              # Tool pages
│   │       ├── json-to-toon/   # JSON ↔ TOON converter
│   │       ├── csv-toon/       # CSV ↔ TOON converter
│   │       ├── yaml-toon/      # YAML ↔ TOON converter
│   │       ├── xml-toon/       # XML ↔ TOON converter
│   │       ├── validator/      # TOON validator
│   │       ├── batch/          # Batch converter
│   │       ├── token-counter/  # Token counter & analyzer
│   │       └── api-tester/     # API endpoint tester
│   ├── components/
│   │   ├── error-boundary.tsx  # Error boundary components
│   │   ├── monaco-skeleton.tsx # Loading skeleton for editors
│   │   ├── home/               # Homepage components
│   │   ├── layout/             # Header, Footer
│   │   └── ui/                 # shadcn/ui components
│   ├── hooks/
│   │   └── use-keyboard-shortcuts.ts  # Keyboard shortcut management
│   └── lib/
│       ├── converters/         # Format converters
│       │   ├── csv-converter.ts
│       │   ├── yaml-converter.ts
│       │   └── xml-converter.ts
│       ├── tokenizer.ts        # Token counting utilities
│       ├── utils.ts            # Helper functions
│       ├── seo.ts              # SEO metadata constructor
│       └── example-data.ts     # Sample data
├── public/                     # Static assets
│   └── og-image.png           # OpenGraph image
├── .github/
│   └── copilot-instructions.md # GitHub Copilot context
└── next.config.ts             # Next.js config with cache headers
```

## 🎨 Component Usage

### Error Boundaries
```tsx
import { EditorErrorBoundary } from '@/components/error-boundary'

<EditorErrorBoundary>
  <Editor {...props} />
</EditorErrorBoundary>
```

### Loading Skeletons
```tsx
import { MonacoSkeleton } from '@/components/monaco-skeleton'
import { Suspense } from 'react'

<Suspense fallback={<MonacoSkeleton height="450px" />}>
  <Editor {...props} />
</Suspense>
```

### Keyboard Shortcuts
```tsx
import { useKeyboardShortcuts, getShortcutText } from '@/hooks/use-keyboard-shortcuts'

useKeyboardShortcuts({
  onConvert: handleConvert,
  onCopy: handleCopy,
  onClear: handleClear,
  onToggleMode: toggleMode
})

// Display shortcuts in UI
<p>{getShortcutText('Enter')} to convert</p>
```

## 🚢 Deployment

This project is optimized for deployment on **Vercel**:

```bash
# Deploy to Vercel
vercel

# Or connect your GitHub repo to Vercel for automatic deployments
```

### Environment Variables
No environment variables required - all processing is client-side!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TOON Format](https://github.com/johannschopplich/toon) - The original TOON specification and library
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Next.js](https://nextjs.org/) - The React framework
- [Vercel](https://vercel.com/) - Deployment platform

## 📞 Support

- 💬 GitHub Issues: [Report a bug](https://github.com/yourusername/toon/issues)
- 📖 Documentation: [View docs](https://toontools.com/docs)

---
NOTE: I'm not a web developer, this project was built using ai as an experiment to make a tool for this new format called [TOON Format](https://github.com/johannschopplich/toon) and a good tool, devs can use. I also built it for fun to see how far ai can build with some human intervention regarding design and choices. This was indeed quite fun to build!

REPO for TOON [TOON Format](https://github.com/johannschopplich/toon) 
