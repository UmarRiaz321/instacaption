import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AdSlot from '@/components/AdSlot'
import { blogPosts } from '@/data/blogPosts'

type BlogPostParams = {
  params: {
    slug: string
  }
}

const formatDate = (input: string) =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(input))

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export function generateMetadata({ params }: BlogPostParams): Metadata {
  const currentPost = blogPosts.find((post) => post.slug === params.slug)

  if (!currentPost) {
    return {}
  }

  return {
    title: `${currentPost.title} — Caption Wizard AI Blog`,
    description: currentPost.shortDescription,
    alternates: {
      canonical: `/blog/${currentPost.slug}`,
    },
    openGraph: {
      title: `${currentPost.title} — Caption Wizard AI Blog`,
      description: currentPost.shortDescription,
      url: `https://captionwizard.pro/blog/${currentPost.slug}`,
      type: 'article',
      tags: currentPost.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: currentPost.title,
      description: currentPost.shortDescription,
    },
  }
}

export default function BlogPostPage({ params }: BlogPostParams) {
  const post = blogPosts.find((entry) => entry.slug === params.slug)

  if (!post) {
    notFound()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.shortDescription,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url: `https://captionwizard.pro/blog/${post.slug}`,
    keywords: post.tags.join(', '),
    articleSection: post.category,
    publisher: {
      '@type': 'Organization',
      name: 'Caption Wizard AI',
    },
  } as const

  return (
    <article className="px-4 py-12 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-10">
        <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted">
          <Link
            href="/blog"
            className="transition hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:hover:text-indigo-300"
          >
            ← Back to Archive
          </Link>
          <span>{post.readingTime}</span>
        </div>

        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-500">
            {post.category}
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--foreground-primary)] md:text-5xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span className="hidden h-1 w-1 rounded-full bg-muted/70 sm:inline-block" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-indigo-200 px-3 py-1 text-[11px] tracking-[0.35em] text-indigo-500 dark:border-indigo-400/40 dark:text-indigo-300">
                  {tag.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </header>

        <figure className="overflow-hidden rounded-3xl border border-dashed border-indigo-200 bg-gradient-to-br from-indigo-100 via-white to-indigo-200 p-8 text-center dark:border-indigo-400/40 dark:from-indigo-950/60 dark:via-slate-950 dark:to-indigo-900/50">
          <div className="mx-auto flex h-64 w-full max-w-2xl items-center justify-center rounded-2xl border border-indigo-200 border-dashed bg-white/80 text-sm font-medium uppercase tracking-[0.4em] text-indigo-400 dark:border-indigo-400/40 dark:bg-slate-950/60 dark:text-indigo-200">
            Hero image placeholder
          </div>
          <figcaption className="mt-4 text-xs uppercase tracking-[0.3em] text-muted">
            Swap this block with your final 16:9 hero image or branded graphic.
          </figcaption>
        </figure>

        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[var(--foreground-primary)]">Opening Summary</h2>
            <p className="rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--background-elevated)] p-6 text-sm text-muted">
              Draft two to three sentences that frame the news angle, key takeaway, and who benefits
              from these insights. Replace this placeholder copy with your finalized introduction.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[var(--foreground-primary)]">Key Highlights</h2>
            <ul className="space-y-3 rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--background-elevated)] p-6 text-sm text-muted">
              <li>• Summarize three headline data points, product updates, or campaign wins.</li>
              <li>• Reference supporting metrics, quotes, or community reactions.</li>
              <li>• Link internally to product pages, templates, or relevant guides.</li>
            </ul>
          </section>

          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--background-elevated)] p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-[var(--foreground-primary)]">Inline Inventory</h2>
            <p className="mb-4 text-sm text-muted">
              Embed live AdSense creatives, promo banners, or newsletter CTAs directly within the
              article body to increase visibility.
            </p>
            <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40 p-4 dark:border-indigo-400/40 dark:bg-indigo-950/30">
              <AdSlot slotId="blog-inline-001" className="h-60 w-full" />
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[var(--foreground-primary)]">Deep Dive Outline</h2>
            <ol className="space-y-3 rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--background-elevated)] p-6 text-sm text-muted">
              <li>1. Replace with thematic subheading and supporting commentary.</li>
              <li>2. Add bulletproof examples, quotes, or dataset snapshots.</li>
              <li>3. Close with action steps, prompt ideas, or notable resources.</li>
            </ol>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-[var(--foreground-primary)]">Call to Action</h2>
            <p className="rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--background-elevated)] p-6 text-sm text-muted">
              Close with what readers should do next: generate captions, subscribe to updates, or
              share the post. Swap this placeholder with persuasive copy and relevant links.
            </p>
          </section>
        </div>
      </div>
    </article>
  )
}
