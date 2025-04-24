import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import { UserProvider } from '@/context/UserContext'
import Footer from '@/components/Footer'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: 'Caption Wizard AI — Generate Perfect Instagram Captions with AI',
  description: 'Describe your photo. Choose a vibe. Get 3 perfect captions — funny, luxury, poetic & more. Powered by AI.',
  keywords: [
    'Instagram captions',
    'AI captions',
    'caption generator',
    'caption wizard',
    'funny captions',
    'poetic captions',
    'OpenAI caption tool',
  ],
  metadataBase: new URL('https://captionwizard.pro'),
  openGraph: {
    title: 'Caption Wizard AI',
    description: 'Describe your vibe. Get scroll-stopping captions instantly. Powered by AI.',
    url: 'https://captionwizard.pro',
    siteName: 'Caption Wizard AI',
    images: [
      {
        url: 'https://captionwizard.pro/og-image.png', // replace if needed
        width: 1200,
        height: 630,
        alt: 'Caption Wizard AI',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Caption Wizard AI',
    description: 'Create perfect Instagram captions with AI — choose your vibe, get results instantly.',
    images: ['https://captionwizard.pro/og-image.png'],
    creator: '@umarriaz56', // optional
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2318193865626108" crossOrigin="anonymous"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          {children}
        </UserProvider>
        <Footer />

      </body>
    </html>
  );
}
