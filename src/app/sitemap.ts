import type { MetadataRoute } from 'next'
import { blogPosts } from '@/data/blogPosts'

const SITE_URL = 'https://captionwizard.pro'

const staticRoutes: Array<MetadataRoute.Sitemap[0]> = [
  {
    url: SITE_URL,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 1,
  },
  {
    url: `${SITE_URL}/blog`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${SITE_URL}/about`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly',
    priority: 0.6,
  },
  {
    url: `${SITE_URL}/faq`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.5,
  },
  {
    url: `${SITE_URL}/privacy`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly',
    priority: 0.4,
  },
  {
    url: `${SITE_URL}/terms`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly',
    priority: 0.4,
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = blogPosts.map<MetadataRoute.Sitemap[0]>((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.publishedAt,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...posts]
}
