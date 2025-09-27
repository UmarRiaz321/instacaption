'use client'

import Link from 'next/link'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'

const links = [
  { href: '#generator', label: 'Generator' },
  { href: '#vibes', label: 'Vibes' },
  { href: '#faq', label: 'FAQ' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur">
      <div className="theme-divider border-b bg-[var(--background-elevated)] shadow-sm transition-colors">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-foreground dark:text-foreground">Caption Wizard AI</p>
              <p className="text-xs text-muted">Create viral captions in seconds. 100% free.</p>
            </div>
          </div>

          <div className="hidden items-center gap-6 text-sm font-medium text-muted md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:hover:text-indigo-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <span className="glass-pill hidden rounded-full px-3 py-1 text-xs font-semibold text-emerald-600 transition dark:text-emerald-300 sm:inline-flex">
              Forever free
            </span>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  )
}
