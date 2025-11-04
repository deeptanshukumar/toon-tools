import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - TOON Tools',
  description: 'Terms of service for using TOON Tools',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-muted/30">
        <div className="container py-12">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Last updated: January 15, 2024
          </p>
        </div>
      </div>

      <div className="container py-12 max-w-4xl">
        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using TOON Tools, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Permission is granted to use TOON Tools for personal and commercial purposes, including:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Converting data between formats</li>
                <li>Validating TOON format syntax</li>
                <li>Analyzing token usage</li>
                <li>Downloading converted files</li>
              </ul>
              <p>This license shall automatically terminate if you violate any of these restrictions.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                TOON Tools is provided "as is" without warranty of any kind, express or implied. We make no warranties regarding:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Accuracy or reliability of conversions</li>
                <li>Suitability for any particular purpose</li>
                <li>Uninterrupted or error-free operation</li>
                <li>Data loss or corruption</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
            <p className="text-muted-foreground">
              In no event shall TOON Tools or its developers be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
            <p className="text-muted-foreground">
              While we strive for accuracy in all conversions, TOON Tools makes no warranties about the accuracy, reliability, or completeness of any converted data. Users are responsible for verifying all output.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Fair Use</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Attempt to overload or disrupt the service</li>
                <li>Use automated tools to scrape or abuse the service</li>
                <li>Reverse engineer or attempt to extract source code</li>
                <li>Use the service for any illegal purposes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
            <p className="text-muted-foreground">
              TOON Tools may revise these terms of service at any time without notice. By using this website, you agree to be bound by the current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Open Source</h2>
            <p className="text-muted-foreground">
              TOON Tools uses the open-source @toon-format/toon library, which is licensed under the MIT License. You are free to use the library in your own projects subject to the terms of the MIT License.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Data Privacy</h2>
            <p className="text-muted-foreground">
              All data processing occurs in your browser. We do not collect, store, or transmit any user data. See our{' '}
              <a href="/privacy" className="text-green-600 dark:text-green-400 hover:underline">
                Privacy Policy
              </a>
              {' '}for details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Governing Law</h2>
            <p className="text-muted-foreground">
              These terms and conditions are governed by and construed in accordance with the laws applicable in your jurisdiction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Contact</h2>
            <p className="text-muted-foreground">
              If you have any questions about these Terms of Service, please contact us via our{' '}
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
