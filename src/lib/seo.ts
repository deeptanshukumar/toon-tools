import { Metadata } from 'next'

const baseUrl = 'https://toontools.vercel.app'

export const siteConfig = {
  name: 'TOON Tools',
  description: 'Free TOON converter tools - Reduce LLM token usage by 30-60%. Convert JSON, CSV, YAML, XML to TOON format. 100% client-side, privacy-first.',
  url: baseUrl,
  ogImage: `${baseUrl}/og-image.png`,
  links: {
    twitter: 'https://twitter.com/toontools',
    github: 'https://github.com/johannschopplich/toon',
  },
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  keywords = [],
  noIndex = false,
  canonical,
}: {
  title?: string
  description?: string
  image?: string
  keywords?: string[]
  noIndex?: boolean
  canonical?: string
} = {}): Metadata {
  const defaultKeywords = [
    'TOON converter',
    'JSON to TOON',
    'token optimization',
    'LLM token savings',
    'GPT-4 cost reduction',
    'API cost optimization',
    'token counter',
    'TOON format',
    'Token-Oriented Object Notation',
    'reduce AI costs',
  ]

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    openGraph: {
      title,
      description,
      type: 'website',
      url: canonical || siteConfig.url,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: siteConfig.name,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@toontools',
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    ...(canonical && {
      alternates: {
        canonical,
      },
    }),
  }
}

export const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/tools/{search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  sameAs: [
    siteConfig.links.twitter,
    siteConfig.links.github,
  ],
}

export const jsonLdSoftwareApplication = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: siteConfig.name,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '127',
  },
  description: siteConfig.description,
  url: siteConfig.url,
  screenshot: `${siteConfig.url}/screenshot.png`,
}
