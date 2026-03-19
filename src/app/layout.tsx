import type { Metadata } from 'next'
import { IBM_Plex_Mono, Space_Grotesk } from 'next/font/google'
import './styles/globals.css'
import Script from 'next/script'
import { UserProvider } from '@/context/UserContext'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import AdSlot from '@/components/AdSlot'
import { ThemeProvider } from '@/context/ThemeContext'
import ThemeScript from '@/components/ThemeScript'
import { featureFlags } from '@/lib/featureFlags'

const displayFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
})

const monoFont = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-mono',
})

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Caption Wizard AI',
    url: 'https://captionwizard.pro',
    logo: 'https://captionwizard.pro/og-image.png',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Caption Wizard AI',
    url: 'https://captionwizard.pro',
    applicationCategory: 'ProductivityApplication',
    operatingSystem: 'Web',
    description:
      'AI caption generator for Instagram, TikTok, Reels, Shorts, and social media posts.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'AI caption generator',
      'Instagram caption ideas',
      'TikTok caption ideas',
      'Reels caption writer',
      'Hashtag generation',
      'Tone and style selection',
    ],
    publisher: {
      '@type': 'Organization',
      name: 'Caption Wizard AI',
    },
  },
] as const

export const metadata: Metadata = {
  title: 'AI Caption Generator for Instagram, TikTok & Reels | Caption Wizard AI',
  description:
    'Free AI caption generator for Instagram, TikTok, Reels, and social media posts. Generate caption ideas, hooks, and hashtags in seconds.',
  keywords: [
    'ai caption generator',
    'Instagram caption generator',
    'TikTok caption generator',
    'Reels caption generator',
    'social media caption generator',
    'AI caption maker',
    'caption writer',
    'caption ideas',
    'Instagram caption ideas',
    'TikTok caption ideas',
    'Reels caption ideas',
    'hashtag generator',
    'social media captions',
    'free caption tool',
    'AI writing tool',
  ],
  applicationName: 'Caption Wizard AI',
  category: 'technology',
  creator: 'Caption Wizard AI',
  publisher: 'Caption Wizard AI',
  referrer: 'origin-when-cross-origin',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/newlogo.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/logo-light.png', sizes: '1024x1024', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Caption Wizard AI',
  },
  formatDetection: {
    address: false,
    email: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  metadataBase: new URL('https://captionwizard.pro'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'AI Caption Generator for Instagram, TikTok & Reels | Caption Wizard AI',
    description:
      'Generate social media captions, hooks, and hashtags for Instagram, TikTok, Reels, and Shorts.',
    url: 'https://captionwizard.pro',
    siteName: 'Caption Wizard AI',
    locale: 'en_US',
    images: [
      {
        url: 'https://captionwizard.pro/og-image.png',
        width: 1200,
        height: 626,
        alt: 'Caption Wizard AI caption generator preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Caption Generator for Instagram, TikTok & Reels',
    description:
      'Generate caption ideas, hooks, and hashtags for Instagram, TikTok, Reels, and social posts.',
    images: ['https://captionwizard.pro/og-image.png'],
    creator: '@umarriaz56',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        {featureFlags.ads && (
          <>
            <meta name="google-adsense-account" content="ca-pub-2318193865626108" />
            <script
              async
              src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2318193865626108"
              crossOrigin="anonymous"
            />
          </>
        )}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C897NRVZ36"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C897NRVZ36');
          `}
        </Script>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body
        className={`${displayFont.variable} ${monoFont.variable} min-h-screen bg-[var(--background-primary)] text-[var(--foreground-primary)] antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          <UserProvider>
            <div className="relative flex min-h-screen flex-col overflow-hidden">
              <div
                className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_0%,rgba(56,189,248,0.24),transparent_32%),radial-gradient(circle_at_85%_10%,rgba(59,130,246,0.22),transparent_28%)] opacity-90 blur-3xl transition-opacity duration-500 dark:bg-[radial-gradient(circle_at_10%_0%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(56,189,248,0.14),transparent_26%)]"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(255,255,255,0.65)_0%,rgba(233,244,255,0.16)_40%,rgba(3,7,18,0)_100%)] dark:bg-[linear-gradient(180deg,rgba(7,18,35,0.7)_0%,rgba(2,8,23,0.2)_40%,rgba(2,8,23,0)_100%)]"
                aria-hidden="true"
              />
              <a href="#generator" className="skip-link">
                Skip to caption generator
              </a>
              <Header />
              <div className="flex flex-1 flex-col lg:flex-row">
                {featureFlags.ads && (
                  <aside className="hidden w-64 shrink-0 lg:block">
                    <div className="sticky top-24 px-4">
                      <AdSlot placement="sidebar-left" className="h-[600px] w-[160px]" />
                    </div>
                  </aside>
                )}
                <main className="flex-1 overflow-x-hidden">
                  {children}
                </main>
                {featureFlags.ads && (
                  <aside className="hidden w-64 shrink-0 lg:block">
                    <div className="sticky top-24 px-4">
                      <AdSlot placement="sidebar-right" className="h-[600px] w-[160px]" />
                    </div>
                  </aside>
                )}
              </div>
              <Footer />
            </div>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
