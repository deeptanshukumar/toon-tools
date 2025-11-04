import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://toontools-fy1i90t9e-deeptanshu-kumars-projects.vercel.app'
  
  const routes = [
    '',
    '/tools/json-to-toon',
    '/tools/toon-to-json',
    '/tools/csv-toon',
    '/tools/yaml-toon',
    '/tools/xml-toon',
    '/tools/token-counter',
    '/tools/validator',
    '/tools/batch',
    '/playground',
    '/docs',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))
}
