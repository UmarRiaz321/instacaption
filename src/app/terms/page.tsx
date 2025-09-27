import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — Caption Wizard AI',
  description: 'Understand the guidelines for using Caption Wizard AI responsibly.',
}

export default function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-16 lg:px-6">
      <article className="glass-card rounded-3xl p-10 transition-colors">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-500 dark:border-indigo-500/40 dark:bg-indigo-500/10 dark:text-indigo-200">
            Terms update
          </p>
          <h1 className="text-3xl font-semibold text-foreground">Terms of service</h1>
          <p className="text-sm text-muted">
            By using Caption Wizard AI, you agree to stay within these guidelines. We keep the rules lightweight so you can create freely and responsibly.
          </p>
        </div>

        <section className="mt-8 space-y-5 text-sm leading-relaxed text-muted">
          <p>• Use Caption Wizard AI for lawful, respectful, and brand-safe content creation.</p>
          <p>• Do not share, export, or promote captions that include hate speech, misinformation, or harmful content.</p>
          <p>• We may adapt or pause features to protect the community or comply with platform policies.</p>
          <p>• Continued use after updates means you accept the latest version of this policy.</p>
          <p>• Questions? Email <a href="mailto:legal@captionwizard.pro" className="font-semibold text-indigo-500 dark:text-indigo-300">legal@captionwizard.pro</a>.</p>
        </section>
      </article>
    </main>
  )
}
  
