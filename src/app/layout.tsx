import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata  = {
  title: 'InstaCaption AI',
  description: 'Generate scroll-stopping, creative Instagram captions using AI.',
  keywords: ['AI Captions', 'Instagram Captions', 'AI Content', 'Caption Generator'],
  openGraph: {
    title: 'InstaCaption AI',
    description: 'Generate scroll-stopping, creative Instagram captions using AI.',
    url: 'https://instacaption.vercel.app',
    siteName: 'InstaCaption AI',
    images: [
      {
        url: 'https://instacaption.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'InstaCaption AI',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InstaCaption AI',
    description: 'Generate scroll-stopping, creative Instagram captions using AI.',
    images: ['https://instacaption.vercel.app/og-image.png'],
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
