import { MetadataRoute } from 'next'
import { seoTools } from '@/data/seo-tools'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://replyrocket.io'

  // Standard static pages
  const staticPages = [
    '',
    '/pricing',
    '/login',
    '/signup',
    '/contact',
    '/privacy',
    '/terms'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Dynamic SEO tool pages
  const dynamicToolPages = seoTools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  return [...staticPages, ...dynamicToolPages]
}
