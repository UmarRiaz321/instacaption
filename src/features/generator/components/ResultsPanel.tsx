type ResultsPanelProps = {
  captions: string[]
  onRegenerate: () => void
  onCopy: (caption: string, index: number) => void
  copiedIndex: number | null
}

export function ResultsPanel({ captions, onRegenerate, onCopy, copiedIndex }: ResultsPanelProps) {
  if (captions.length === 0) {
    return null
  }

  return (
    <section aria-live="polite" className="space-y-6" id="results">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Your caption drops</h2>
            <p className="text-sm text-muted">Tap to copy. Share the vibe. Remix anytime.</p>
          </div>
          <button
            onClick={onRegenerate}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-400/60 px-4 py-2 text-sm font-semibold text-indigo-500 transition hover:-translate-y-0.5 hover:border-indigo-500 hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-indigo-500/40 dark:text-indigo-300 dark:hover:text-indigo-200"
          >
            🔁 Regenerate
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {captions.map((caption, index) => (
            <article key={index} className="glass-card group relative overflow-hidden rounded-3xl p-6 transition hover:-translate-y-1">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-400 via-sky-400 to-purple-400 opacity-70 transition group-hover:opacity-100" />
              <p className="text-base leading-relaxed text-foreground">{caption}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-muted">
                <span>Ready to post</span>
                <button
                  onClick={() => onCopy(caption, index)}
                  className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-muted transition hover:-translate-y-0.5 hover:text-indigo-500 dark:hover:text-indigo-300"
                >
                  {copiedIndex === index ? '✅ Copied' : '📋 Copy'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
