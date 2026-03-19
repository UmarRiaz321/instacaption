import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Caption Wizard AI',
    short_name: 'Caption Wizard',
    description:
      'AI caption generator for Instagram, TikTok, Reels, Shorts, and social media posts.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fbff',
    theme_color: '#0ea5e9',
    lang: 'en',
    categories: ['productivity', 'social', 'utilities'],
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo-light.png',
        sizes: '1024x1024',
        type: 'image/png',
      },
      {
        src: '/newlogo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}
