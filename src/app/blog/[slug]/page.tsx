import Image from 'next/image'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/data/blogPosts'
import AdSlot from '@/components/AdSlot'
import { featureFlags } from '@/lib/featureFlags'

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

const SITE_URL = 'https://captionwizard.pro'

const formatDate = (input: string) =>
  new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(input))

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const currentPost = blogPosts.find((post) => post.slug === resolvedParams.slug)

  if (!currentPost) {
    return {}
  }

  const imageUrl = new URL(currentPost.heroImage, SITE_URL).toString()

  return {
    title: `${currentPost.title} | Caption Wizard AI`,
    description: currentPost.shortDescription,
    keywords: currentPost.tags,
    alternates: {
      canonical: `/blog/${currentPost.slug}`,
    },
    authors: [{ name: currentPost.author }],
    openGraph: {
      title: `${currentPost.title} | Caption Wizard AI`,
      description: currentPost.shortDescription,
      url: `https://captionwizard.pro/blog/${currentPost.slug}`,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: currentPost.heroImageAlt,
        },
      ],
      tags: currentPost.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: currentPost.title,
      description: currentPost.shortDescription,
      images: [imageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = blogPosts.find((entry) => entry.slug === resolvedParams.slug)

  if (!post) {
    notFound()
  }

  const heroImageUrl = new URL(post.heroImage, SITE_URL).toString()

  const articleBody = post.content
    .flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ])
    .join('\n\n')

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
    author: {
      '@type': 'Person',
      name: post.author,
    },
    image: heroImageUrl,
    articleBody,
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
            ← Back to All Guides
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
            <span>{post.author}</span>
            <span className="hidden h-1 w-1 rounded-full bg-muted/70 sm:inline-block" />
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

        <section className="space-y-6">
          <figure className="overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-[var(--background-elevated)] shadow-sm">
            <div className="relative aspect-[16/9] w-full">
              <Image
                src={post.heroImage}
                alt={post.heroImageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
            <figcaption className="px-6 py-4 text-xs uppercase tracking-[0.3em] text-muted">
              {post.heroImageAlt}
            </figcaption>
          </figure>
          <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--background-elevated)] p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">
              What You&apos;ll Learn
            </p>
            <p className="mt-3 text-base leading-relaxed text-muted">{post.shortDescription}</p>
          </div>
        </section>

        <div className="space-y-12">
          {post.content.map((section, index) => (
            <section
              key={`${post.slug}-${section.heading}`}
              className="space-y-4 rounded-2xl border border-[var(--border-subtle)] bg-[var(--background-elevated)] p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-[var(--foreground-primary)]">
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${post.slug}-${section.heading}-p-${paragraphIndex}`} className="text-sm leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-2 rounded-xl border border-dashed border-indigo-200/60 bg-indigo-50/40 p-4 text-sm text-muted dark:border-indigo-400/30 dark:bg-indigo-950/30">
                  {section.bullets.map((item, bulletIndex) => (
                    <li key={`${post.slug}-${section.heading}-b-${bulletIndex}`} className="flex gap-2">
                      <span aria-hidden="true">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {featureFlags.ads && index === 1 && (
                <div className="mt-6 rounded-xl border border-dashed border-indigo-200 bg-indigo-50/40 p-4 dark:border-indigo-400/40 dark:bg-indigo-950/30">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">
                    Sponsored Placement
                  </p>
                  {/* <p className="mt-2 text-xs text-muted">
                    Swap this slot with your live AdSense unit or campaign creative.
                  </p> */}
                  <AdSlot placement="blog-inline" className="h-52 w-full" />
                </div>
              )}
            </section>
          ))}
        </div>

        <section className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--background-elevated)] p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-500">
            Try the Tool
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-[var(--foreground-primary)]">
            Turn this guide into faster caption drafts
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Use the main caption generator to apply the framework from this article, test different tones,
            and create ready-to-edit captions with matching hashtags for Instagram, TikTok, and Reels.
          </p>
          <Link
            href="/#generator"
            className="inline-flex mt-5 items-center justify-center rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:bg-indigo-400 dark:text-slate-950 dark:hover:bg-indigo-300"
          >
            Open the AI caption generator
          </Link>
        </section>
      </div>
    </article>
  )
}
