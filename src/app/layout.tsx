import type { Metadata } from "next";
import "./styles/globals.css";
import { UserProvider } from '@/context/UserContext'
import Footer from '@/components/Footer'
import Header from '@/components/Header' // Make sure Header exists
import AdSlot from '@/components/AdSlot'


export const metadata: Metadata = {
  title: 'Caption Wizard AI — Generate Perfect Captions for social media with AI',
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
        url: 'https://captionwizard.pro/og-image.png',
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
    creator: '@umarriaz56',
  },
}




export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2318193865626108"></meta>
      </head>
      <body className="bg-[#f4f4fb] text-gray-800 antialiased font-sans">
        <UserProvider>
          <div className="flex flex-col h-screen">
            <header className="sticky top-0 z-50">
              <Header />
            </header>
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,640px)_1fr]">
              {/* Left sticky ad */}
              <div className="hidden lg:block relative">
                <div className="sticky top-24 px-2">
                  <AdSlot slotId="1234567890" className="h-[600px] w-[160px]" />
                </div>
              </div>


              <main className="flex-grow  overflow-y-auto hide-scrollbar">
                {children}
              </main>

              {/* Right sticky ad */}
              <div className="hidden lg:block relative">
                <div className="sticky top-24 px-2">
                  <AdSlot slotId="0987654321" className="h-[600px] w-[160px]" />
                </div>
              </div>
            </div>

            <footer className="sticky bottom-0 z-50">
              <Footer />
            </footer>
          </div>
        </UserProvider>
      </body>
    </html>
  )
}