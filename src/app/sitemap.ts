import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://toontools.com'
  
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
