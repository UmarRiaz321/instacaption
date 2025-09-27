import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — Caption Wizard AI',
  description: 'Learn how Caption Wizard AI handles data, privacy, and user safety.',
}

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 lg:px-6">
      <article className="glass-card rounded-3xl p-10 transition-colors">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-500 dark:border-indigo-500/40 dark:bg-indigo-500/10 dark:text-indigo-200">
            Privacy first
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Privacy policy</h1>
          <p className="text-sm text-muted">
            Caption Wizard AI is designed to empower creators without compromising personal data. This page explains how we collect, use, and protect information.
          </p>
        </div>

        <section className="mt-8 space-y-6 text-sm leading-relaxed text-muted">
          <p>
            • We only store optional inputs that help improve your experience, such as the last prompt and vibe you selected. This stays in your browser using local storage.
          </p>
          <p>
            • We do not sell, rent, or share personal information. Any analytics we run are aggregate and anonymised.
          </p>
          <p>
            • If you reach out for support, we will use the details you provide solely to respond to your request.
          </p>
          <p>
            • For data removal or questions, email <a href="mailto:privacy@captionwizard.pro" className="font-semibold text-indigo-500 dark:text-indigo-300">privacy@captionwizard.pro</a> and we will respond within 48 hours.
          </p>
        </section>
      </article>
    </main>
  )
}
  
