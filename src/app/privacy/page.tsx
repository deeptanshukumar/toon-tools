import { Metadata } from 'next'
import { Shield, Lock, Eye, Server } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy - TOON Tools',
  description: 'Privacy policy for TOON Tools - your data never leaves your browser',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Last updated: January 15, 2024
          </p>
        </div>
      </div>

      <div className="container py-12 max-w-4xl">
        {/* Privacy-First Highlights */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {[
            {
              icon: Shield,
              title: '100% Client-Side',
              description: 'All conversions happen in your browser. No server uploads.',
              gradient: 'from-green-500 to-emerald-600'
            },
            {
              icon: Lock,
              title: 'No Data Collection',
              description: 'We don\'t collect, store, or track your conversion data.',
              gradient: 'from-blue-500 to-cyan-600'
            },
            {
              icon: Eye,
              title: 'No Tracking',
              description: 'No analytics, cookies, or user tracking of any kind.',
              gradient: 'from-purple-500 to-pink-600'
            },
            {
              icon: Server,
              title: 'No Accounts',
              description: 'No signup required. Use all tools completely anonymously.',
              gradient: 'from-orange-500 to-red-600'
            },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div key={idx} className="bg-background border border-border rounded-lg p-6">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${item.gradient} mb-4 shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            )
          })}
        </div>

        {/* Detailed Policy */}
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground">
              TOON Tools is a privacy-first web application. We are committed to protecting your privacy and ensuring your data remains secure. This privacy policy explains how we handle your information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Data Processing</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">Client-Side Processing:</strong> All data conversion, validation, and token counting operations are performed entirely in your browser using JavaScript and WebAssembly. Your data never leaves your device.
              </p>
              <p>
                <strong className="text-foreground">No Server Uploads:</strong> We do not upload any of your conversion data to our servers. The website is hosted as static files, and all processing happens locally.
              </p>
              <p>
                <strong className="text-foreground">No Storage:</strong> We do not store any of your data, conversion history, or personal information. When you close your browser, all data is deleted from memory.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Information We Don't Collect</h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Your conversion data or file contents</li>
              <li>Personal information (name, email, etc.)</li>
              <li>User accounts or authentication data</li>
              <li>IP addresses or location data</li>
              <li>Browsing history or behavior</li>
              <li>Cookies or tracking identifiers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground mb-4">
              We do not use any third-party analytics, advertising, or tracking services. The website is designed to function completely independently without external dependencies for user data.
            </p>
            <p className="text-muted-foreground">
              <strong className="text-foreground">Open Source Libraries:</strong> We use the official @toon-format/toon library and other open-source packages, which are loaded from CDNs but do not collect any user data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Local Storage</h2>
            <p className="text-muted-foreground">
              We may use your browser's localStorage to remember user preferences (such as theme selection). This data is stored only on your device and is not transmitted to any server.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">External Links</h2>
            <p className="text-muted-foreground">
              Our website contains links to external sites (GitHub, npm, etc.). We are not responsible for the privacy practices of these external sites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Security</h2>
            <p className="text-muted-foreground">
              Since all processing happens in your browser and we don't collect data, there is no server-side security risk. We recommend using HTTPS and keeping your browser updated for maximum security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this privacy policy from time to time. We will notify users of any significant changes by updating the &quot;Last updated&quot; date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-muted-foreground">
              If you have any questions about this privacy policy, please open an issue on our{' '}
              <a 
                href="https://github.com/toon-format/toon" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-green-600 dark:text-green-400 hover:underline"
              >
                GitHub repository
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
