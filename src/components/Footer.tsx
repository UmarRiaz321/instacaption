// src/components/Footer.tsx

import Link from 'next/link'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="theme-divider w-full border-t bg-[var(--background-elevated)] py-10 text-sm text-muted backdrop-blur transition-colors">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 lg:flex-row lg:items-center lg:justify-between lg:px-6">
        <div className="space-y-2">
          <p className="text-base font-semibold text-foreground">Caption Wizard AI</p>
          <p className="max-w-md text-sm text-muted">
            Craft scroll-stopping Instagram, TikTok, and Reels captions with lightning speed. Futuristic vibes. Forever free.
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-4 text-sm font-medium text-muted">
          <Link href="#generator" className="transition hover:text-indigo-500 dark:hover:text-indigo-300">
            Generator
          </Link>
          <Link href="#vibes" className="transition hover:text-indigo-500 dark:hover:text-indigo-300">
            Vibes
          </Link>
          <Link href="/faq" className="transition hover:text-indigo-500 dark:hover:text-indigo-300">
            FAQ
          </Link>
          <Link href="/privacy" className="transition hover:text-indigo-500 dark:hover:text-indigo-300">
            Privacy
          </Link>
          <Link href="/terms" className="transition hover:text-indigo-500 dark:hover:text-indigo-300">
            Terms
          </Link>
        </nav>

        <p className="text-xs text-muted opacity-80">
          © {year} Caption Wizard AI. Give credit if you vibe with it.
        </p>
      </div>
    </footer>
  )
}
