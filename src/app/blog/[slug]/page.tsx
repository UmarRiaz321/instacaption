import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import AdSlot from '@/components/AdSlot'
import { blogPosts } from '@/data/blogPosts'

type BlogPostPageProps = {
  params: Promise<{
    slug: string
  }>
}

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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  const post = blogPosts.find((entry) => entry.slug === resolvedParams.slug)

  if (!post) {
    notFound()
  }

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

        {/* <section
          className="rounded-3xl border border-indigo-200/60 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-8 dark:border-indigo-400/30 dark:from-indigo-950/40 dark:via-slate-950 dark:to-indigo-900/40"
          aria-label={post.heroImageAlt ?? post.title}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-indigo-500">
            Overview
          </p>
          <p className="mt-4 text-lg text-[var(--foreground-primary)]">{post.shortDescription}</p>
        </section> */}

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
              {index === 1 && (
                <div className="mt-6 rounded-2xl border border-dashed border-indigo-200/60 bg-indigo-50/30 p-4 dark:border-indigo-400/30 dark:bg-indigo-950/20">
                  {/* <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-indigo-500">
                    Sponsored Placement
                  </p> */}
                  <AdSlot slotId="blog-inline-001" className="h-52 w-full" />
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </article>
  )
}
