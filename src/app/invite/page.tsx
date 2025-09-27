'use client'

import { useState } from 'react'
import Link from 'next/link'

const shareUrl = 'https://captionwizard.pro'
const shareMessage = encodeURIComponent('I just found Caption Wizard AI — a free AI tool for mind-blowing captions → https://captionwizard.pro')

const shareOptions = [
  {
    label: 'WhatsApp',
    href: `https://wa.me/?text=${shareMessage}`,
    color: 'text-emerald-500',
  },
  {
    label: 'X / Twitter',
    href: `https://twitter.com/intent/tweet?text=${shareMessage}`,
    color: 'text-muted',
  },
  {
    label: 'LinkedIn',
    href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    color: 'text-sky-600',
  },
]

export default function InvitePage() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 lg:px-6">
      <section className="glass-card rounded-3xl p-10 transition-colors">
        <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-500 dark:border-indigo-500/40 dark:bg-indigo-500/10 dark:text-indigo-200">
          Spread the vibe
        </p>
        <h1 className="mt-4 text-3xl font-semibold text-foreground">Share Caption Wizard AI</h1>
        <p className="mt-3 text-sm text-muted">
          Let your creator friends know they can generate scroll-stopping captions for free. No paywall. No login. Just vibes.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="glass-pill flex-1 rounded-2xl px-4 py-3 text-sm text-muted focus:outline-none"
          />
          <button
            onClick={handleCopy}
            className="inline-flex items-center justify-center rounded-2xl border border-indigo-400 bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-300/50 transition hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            {copied ? '✅ Copied' : '📋 Copy link'}
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {shareOptions.map((option) => (
            <a
              key={option.label}
              href={option.href}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card flex h-full flex-col justify-between rounded-3xl p-6 text-sm transition hover:-translate-y-1 hover:text-indigo-500"
            >
              <span className={`text-xs font-semibold uppercase tracking-wide ${option.color}`}>{option.label}</span>
              <span className="mt-6 text-muted">Share the link instantly with a single tap.</span>
            </a>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-slate-200/70 pt-6 text-sm text-muted dark:border-slate-700/70">
          <span className="text-muted">Thanks for helping creators discover better captions.</span>
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-indigo-300 px-4 py-2 font-medium text-indigo-500 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-indigo-500/60 dark:text-indigo-300">
            ← Back to Generator
          </Link>
        </div>
      </section>
    </main>
  )
}
