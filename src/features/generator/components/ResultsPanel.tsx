type ResultsPanelProps = {
  captions: string[]
  onRegenerate: () => void
  onCopyAll: () => void
  onCopy: (caption: string, index: number) => void
  copiedTarget: number | 'all' | null
  loading: boolean
}

export function ResultsPanel({
  captions,
  onRegenerate,
  onCopyAll,
  onCopy,
  copiedTarget,
  loading,
}: ResultsPanelProps) {
  if (captions.length === 0) {
    return (
      <section className="glass-card rounded-3xl p-8 transition-colors" id="results">
        <h2 className="text-2xl font-semibold text-foreground">How it works</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl bg-[var(--background-muted)] p-5">
            <p className="text-sm font-semibold text-foreground">1. Describe the post</p>
            <p className="mt-2 text-sm text-muted">Mention the scene, subject, and mood in plain language.</p>
          </article>
          <article className="rounded-2xl bg-[var(--background-muted)] p-5">
            <p className="text-sm font-semibold text-foreground">2. Choose a style</p>
            <p className="mt-2 text-sm text-muted">Pick the tone you want, like funny, travel, or professional.</p>
          </article>
          <article className="rounded-2xl bg-[var(--background-muted)] p-5">
            <p className="text-sm font-semibold text-foreground">3. Copy your favorite</p>
            <p className="mt-2 text-sm text-muted">You’ll get multiple options with hashtags, ready to edit or post.</p>
          </article>
        </div>
      </section>
    )
  }

  return (
    <section aria-live="polite" className="space-y-6" id="results">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Your caption options</h2>
            <p className="text-sm text-muted">Copy one, copy all, or generate another set.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onCopyAll}
              className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted transition hover:-translate-y-0.5 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              {copiedTarget === 'all' ? 'Copied all' : 'Copy all'}
            </button>
            <button
              type="button"
              onClick={onRegenerate}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-400/60 px-4 py-2 text-sm font-semibold text-indigo-500 transition hover:-translate-y-0.5 hover:border-indigo-500 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-60 dark:border-indigo-500/40 dark:text-indigo-300 dark:hover:text-indigo-200"
            >
              {loading ? 'Writing new options...' : 'Generate another set'}
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {captions.map((caption, index) => (
            <article key={index} className="glass-card group relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-400 via-sky-400 to-purple-400 opacity-70 transition group-hover:opacity-100" />
              <p className="text-xs font-semibold uppercase tracking-wide text-muted">Option {index + 1}</p>
              <p className="text-base leading-relaxed text-foreground">{caption}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-muted">
                <span>Ready to edit or post</span>
                <button
                  type="button"
                  onClick={() => onCopy(caption, index)}
                  className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-muted transition hover:-translate-y-0.5 hover:text-indigo-500 dark:hover:text-indigo-300"
                >
                  {copiedTarget === index ? 'Copied' : 'Copy'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
