export const EXAMPLE_DATA = {
  simple: {
    name: 'Simple Example',
    json: JSON.stringify(
      {
        users: [
          { id: 1, name: 'Alice', role: 'admin' },
          { id: 2, name: 'Bob', role: 'user' },
        ],
      },
      null,
      2
    ),
  },
  ecommerce: {
    name: 'E-Commerce Order',
    json: JSON.stringify(
      {
        order: {
          id: 'ORD-2024-001',
          date: '2024-11-04T10:30:00Z',
          customer: {
            id: 12345,
            name: 'John Doe',
            email: 'john@example.com',
          },
          items: [
            { sku: 'WIDGET-A1', name: 'Premium Widget', qty: 2, price: 29.99 },
            { sku: 'GADGET-B2', name: 'Smart Gadget', qty: 1, price: 149.99 },
            { sku: 'TOOL-C3', name: 'Pro Tool', qty: 3, price: 19.99 },
          ],
          shipping: {
            address: '123 Main St',
            city: 'San Francisco',
            state: 'CA',
            zip: '94102',
            method: 'express',
          },
          payment: {
            method: 'credit_card',
            last4: '4242',
            amount: 269.94,
          },
          status: 'shipped',
        },
      },
      null,
      2
    ),
  },
  analytics: {
    name: 'Analytics Data',
    json: JSON.stringify(
      {
        metrics: Array.from({ length: 30 }, (_, i) => ({
          date: `2024-${String(Math.floor(i / 30) + 1).padStart(2, '0')}-${String((i % 30) + 1).padStart(2, '0')}`,
          views: Math.floor(Math.random() * 10000) + 1000,
          clicks: Math.floor(Math.random() * 500) + 100,
          conversions: Math.floor(Math.random() * 50) + 10,
          revenue: parseFloat((Math.random() * 10000 + 1000).toFixed(2)),
          bounceRate: parseFloat((Math.random() * 0.5 + 0.3).toFixed(2)),
        })),
      },
      null,
      2
    ),
  },
  github: {
    name: 'GitHub Repositories',
    json: JSON.stringify(
      {
        repositories: [
          {
            id: 28457823,
            name: 'freeCodeCamp',
            repo: 'freeCodeCamp/freeCodeCamp',
            description: "freeCodeCamp.org's open-source codebase and curriculum",
            stars: 430886,
            forks: 42146,
            language: 'TypeScript',
            createdAt: '2014-12-24T17:49:19Z',
          },
          {
            id: 132750724,
            name: 'build-your-own-x',
            repo: 'codecrafters-io/build-your-own-x',
            description: 'Master programming by recreating your favorite technologies',
            stars: 430877,
            forks: 40453,
            language: 'Markdown',
            createdAt: '2018-05-09T12:03:18Z',
          },
          {
            id: 21737465,
            name: 'awesome',
            repo: 'sindresorhus/awesome',
            description: '😎 Awesome lists about all kinds of interesting topics',
            stars: 410052,
            forks: 32029,
            language: null,
            createdAt: '2014-07-11T13:42:37Z',
          },
        ],
      },
      null,
      2
    ),
  },
}

// Export individual examples for convenience
export const simpleExample = EXAMPLE_DATA.simple.json
export const ecommerceExample = EXAMPLE_DATA.ecommerce.json
export const analyticsExample = EXAMPLE_DATA.analytics.json
export const githubExample = EXAMPLE_DATA.github.json
