import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'FAQ — Caption Wizard AI',
  description: 'Answers to the most common Caption Wizard AI questions for creators and brands.',
}

const faqs = [
  {
    question: 'What is Caption Wizard AI?',
    answer:
      'It is a creative writing copilot that transforms your ideas into Instagram, TikTok, and Reels captions aligned with your chosen vibe.',
  },
  {
    question: 'Is everything really free?',
    answer:
      'Yes. All vibes and features are unlocked. We removed the paywall so every creator can experiment without limits.',
  },
  {
    question: 'Do I need an account or email?',
    answer:
      'No sign-up required. Simply describe your moment, pick a vibe, and generate captions instantly.',
  },
  {
    question: 'What platforms does it support?',
    answer:
      'Captions are optimized for Instagram, TikTok, YouTube Shorts, LinkedIn, and anywhere a short-form hook is needed.',
  },
  {
    question: 'How do I get the best result?',
    answer:
      'Mention the setting, the feeling, and your audience. You can also regenerate with multiple vibes and cherry-pick your favourite lines.',
  },
  {
    question: 'Can I suggest new vibes?',
    answer:
      'Definitely. Ping us on social or send a feedback note and we will prioritise the most requested vibes.',
  },
]

export default function FAQPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-16 lg:px-6">
      <div className="glass-card rounded-3xl p-10 transition-colors">
        <div className="max-w-3xl space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-500 dark:border-indigo-500/40 dark:bg-indigo-500/10 dark:text-indigo-200">
            Support hub
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Frequently asked questions</h1>
          <p className="text-sm text-muted">
            Quick answers for creators, brands, and agencies exploring Caption Wizard AI. If your question is missing, reach out and we&apos;ll update this guide.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {faqs.map((item) => (
            <article
              key={item.question}
              className="glass-card rounded-2xl p-6 transition hover:-translate-y-1"
            >
              <h2 className="text-lg font-semibold text-foreground">{item.question}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.answer}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-slate-200/70 pt-6 text-sm text-muted dark:border-slate-700/70">
          <span className="text-muted">Still curious? We love hearing new vibe requests.</span>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-indigo-300 px-4 py-2 font-medium text-indigo-500 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-indigo-500/60 dark:text-indigo-300"
          >
            ← Back to Generator
          </Link>
        </div>
      </div>
    </main>
  )
}
