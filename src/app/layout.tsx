import type { Metadata } from "next";
import "./styles/globals.css";
import { UserProvider } from '@/context/UserContext'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import AdSlot from '@/components/AdSlot'
import { ThemeProvider } from '@/context/ThemeContext'
import ThemeScript from '@/components/ThemeScript'

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Caption Wizard AI',
  url: 'https://captionwizard.pro',
  description: 'Free AI caption generator for Instagram, TikTok, and Reels with trending vibes and dark mode.',
  publisher: {
    '@type': 'Organization',
    name: 'Caption Wizard AI',
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://captionwizard.pro/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
} as const

export const metadata: Metadata = {
  title: 'Caption Wizard AI — Free AI Instagram Caption Generator',
  description: 'Generate social media captions instantly with Caption Wizard AI. Free for everyone, packed with creative tones, hashtags, and SEO-friendly hooks.',
  keywords: [
    'Instagram caption generator',
    'AI caption maker',
    'social media captions',
    'TikTok caption ideas',
    'free caption tool',
    'AI writing assistant',
    'viral captions',
  ],
  metadataBase: new URL('https://captionwizard.pro'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Caption Wizard AI — Free AI Caption Generator',
    description: 'Turn any idea into scroll-stopping captions in seconds. Futuristic UI, dark mode, and creative vibes included.',
    url: 'https://captionwizard.pro',
    siteName: 'Caption Wizard AI',
    images: [
      {
        url: 'https://captionwizard.pro/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Caption Wizard AI preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caption Wizard AI — Free AI Caption Generator',
    description: 'Describe your vibe and get 3 viral-ready captions instantly. 100% free.',
    images: ['https://captionwizard.pro/og-image.png'],
    creator: '@umarriaz56',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-2318193865626108"></meta>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2318193865626108"
          crossOrigin="anonymous"
        />
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-[var(--background-primary)] text-[var(--foreground-primary)] antialiased transition-colors duration-300">
        <ThemeProvider>
          <UserProvider>
            <div className="relative flex min-h-screen flex-col overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(165,180,252,0.35),transparent_60%)] opacity-70 blur-3xl transition-opacity duration-500 dark:bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.25),transparent_65%)]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(135deg,rgba(99,102,241,0.08)_0%,rgba(255,255,255,0.3)_35%,rgba(15,23,42,0)_100%)]"
                aria-hidden="true"
              />
              <a href="#generator" className="skip-link">
                Skip to caption generator
              </a>
              <Header />
              <div className="flex flex-1 flex-col lg:flex-row">
                <aside className="hidden w-64 shrink-0 lg:block">
                  <div className="sticky top-24 px-4">
                    <AdSlot placement="sidebar-left" className="h-[600px] w-[160px]" />
                  </div>
                </aside>
                <main className="flex-1 overflow-x-hidden">
                  {children}
                </main>
                <aside className="hidden w-64 shrink-0 lg:block">
                  <div className="sticky top-24 px-4">
                    <AdSlot placement="sidebar-right" className="h-[600px] w-[160px]" />
                  </div>
                </aside>
              </div>
              <Footer />
            </div>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
