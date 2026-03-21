import type { Metadata } from 'next'
import Link from 'next/link'
import { blogPosts } from '@/data/blogPosts'
import AdSlot from '@/components/AdSlot'
import { featureFlags } from '@/lib/featureFlags'

const SITE_URL = 'https://captionwizard.pro'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

export const metadata: Metadata = {
  title: 'Instagram Caption Ideas, TikTok Captions & Hashtag Guides | Caption Wizard AI Blog',
  description:
    'Browse 30 backdated long-form guides on Instagram caption ideas, TikTok captions, Reels captions, hashtag strategy, social media SEO, and AI caption workflows.',
  keywords: [
    'instagram caption ideas',
    'tiktok captions',
    'reels captions',
    'caption generator with hashtags',
    'social media caption ideas',
    'instagram hashtags',
    'small business instagram captions',
    'ai caption generator blog',
  ],
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'Instagram Caption Ideas, TikTok Captions & Hashtag Guides',
    description:
      'Long-form guides on Instagram caption ideas, TikTok captions, Reels strategy, hashtags, and AI-assisted caption writing.',
    url: `${SITE_URL}/blog`,
    siteName: 'Caption Wizard AI',
    type: 'website',
    images: [
      {
        url: DEFAULT_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Caption Wizard AI Blog header graphic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Instagram Caption Ideas, TikTok Captions & Hashtag Guides',
    description:
      'Backdated long-form guides on captions, hashtags, Reels, TikTok, and AI-assisted social writing.',
    images: [DEFAULT_IMAGE],
  },
}

const listStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  url: `${SITE_URL}/blog`,
  name: 'Caption Wizard AI Blog',
  description:
    'Backdated library of long-form caption guides covering Instagram captions, TikTok captions, Reels, hashtags, and AI writing workflows.',
  publisher: {
    '@type': 'Organization',
    name: 'Caption Wizard AI',
  },
  blogPost: blogPosts.map((post) => ({
    '@type': 'BlogPosting',
    url: `${SITE_URL}/blog/${post.slug}`,
    headline: post.title,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    keywords: post.tags.join(', '),
    articleSection: post.category,
    description: post.shortDescription,
    image: new URL(post.heroImage, SITE_URL).toString(),
  })),
} as const

const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
)

const formatDate = (input: string) =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(input))

export default function BlogPage() {
  return (
    <div className="px-4 py-12 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listStructuredData) }}
      />

      <div className="mx-auto flex max-w-5xl flex-col gap-12">
        <div className="flex flex-col gap-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-500">
            Caption Strategy Library
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground-primary)] md:text-5xl">
            Instagram, TikTok, Reels, and Hashtag Guides
          </h1>
          <p className="max-w-3xl text-base leading-7 text-muted">
            Explore backdated, search-focused guides built around real caption problems: better Instagram caption ideas, stronger TikTok hooks, clearer Reels copy, smarter hashtag strategy, and practical AI caption workflows.
          </p>
        </div>
{/* 
        <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--background-elevated)] p-6 shadow-sm">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-[var(--foreground-primary)]">Featured Slot</h2>
              <p className="text-sm text-muted">
                Reserve a featured placement, hero image, or newsletter signup block above the fold.
                Replace the ad slot below when campaign assets are ready.
              </p>
            </div>
            <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40 p-4 dark:border-indigo-400/40 dark:bg-indigo-950/30">
              <AdSlot placement="blog-hero" className="h-60 w-full" />
            </div>
          </div>
        </div> */}

        <div className="grid gap-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-[var(--foreground-primary)]">All Guides</h2>
            <p className="text-xs uppercase tracking-[0.3em] text-muted">
              {sortedPosts.length} long-form articles
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {sortedPosts.map((post) => (
              <article
                key={post.slug}
                className="group flex h-full flex-col justify-between rounded-2xl border border-[var(--border-subtle)] bg-[var(--background-elevated)] p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg dark:hover:border-indigo-400/40"
              >
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">
                    {post.category}
                  </p>
                  <h3 className="text-2xl font-semibold leading-tight text-[var(--foreground-primary)] group-hover:text-indigo-500 dark:group-hover:text-indigo-300">
                    <Link href={`/blog/${post.slug}`} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="line-clamp-3 text-sm text-muted">{post.shortDescription}</p>
                </div>
                <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted">
                  <span>{formatDate(post.publishedAt)}</span>
                  <span>{post.readingTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {featureFlags.ads && (
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--background-elevated)] p-6 shadow-sm">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-[var(--foreground-primary)]">Sidebar Inventory</h2>
                <p className="text-sm text-muted">
                  Drop campaign recaps, gated lead magnets, or additional ad inventory next to the blog
                  catalogue. The slot is responsive and inherits dark mode styles.
                </p>
                <ul className="list-inside list-disc text-sm text-muted">
                  <li>Replace slot IDs with live AdSense identifiers</li>
                  <li>Swap copy for newsletter CTAs or promo banners</li>
                  <li>Link to your top converting generator prompts</li>
                </ul>
              </div>
              <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40 p-4 dark:border-indigo-400/40 dark:bg-indigo-950/30">
                <AdSlot placement="blog-sidebar" className="h-96 w-full" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
