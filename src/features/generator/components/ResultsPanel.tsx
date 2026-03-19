type ResultsPanelProps = {
  captions: string[]
  onCopyAll: () => void
  onCopy: (caption: string, index: number) => void
  copiedTarget: number | 'all' | null
  loading: boolean
}

export function ResultsPanel({
  captions,
  onCopyAll,
  onCopy,
  copiedTarget,
  loading,
}: ResultsPanelProps) {
  const hasCaptions = captions.length > 0

  return (
    <section
      aria-live="polite"
      className="flex h-full flex-col rounded-[32px] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.52)] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl dark:bg-[rgba(4,18,36,0.56)] lg:p-6"
      id="results"
    >
      <div className="flex flex-col gap-4 border-b border-[var(--border-subtle)] pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="tech-label">Generated Results</p>
          <h2 className="mt-3 text-2xl font-semibold text-foreground">Caption options</h2>
          <p className="mt-1 text-sm text-muted">
            {loading && !hasCaptions
              ? 'Writing your caption options now.'
              : hasCaptions
                ? 'Copy one, copy all, or tweak the prompt and generate again.'
                : 'Your results will appear here the moment you generate.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {hasCaptions ? (
            <button
              type="button"
              onClick={onCopyAll}
              className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted transition hover:-translate-y-0.5 hover:text-sky-600 dark:hover:text-sky-300"
            >
              {copiedTarget === 'all' ? 'Copied all' : 'Copy all'}
            </button>
          ) : (
            <span className="glass-pill rounded-full px-3 py-1.5 text-xs font-medium text-muted">
              {loading ? 'Generating...' : 'Ready when you are'}
            </span>
          )}
        </div>
      </div>

      {!hasCaptions && !loading && (
        <div className="mt-5 grid gap-3">
          <article className="rounded-2xl bg-[var(--background-muted)] p-4">
            <p className="text-sm font-semibold text-foreground">You will get 3 polished options</p>
            <p className="mt-1 text-sm text-muted">Each result is written to be easy to edit, post, or copy as-is.</p>
          </article>
          <article className="rounded-2xl bg-[var(--background-muted)] p-4">
            <p className="text-sm font-semibold text-foreground">Hashtags are included</p>
            <p className="mt-1 text-sm text-muted">The tool adds a small matching hashtag set at the end of each caption.</p>
          </article>
          <article className="rounded-2xl bg-[var(--background-muted)] p-4">
            <p className="text-sm font-semibold text-foreground">Results stay in this panel</p>
            <p className="mt-1 text-sm text-muted">Generate, compare, and copy without leaving the main workspace.</p>
          </article>
        </div>
      )}

      {!hasCaptions && loading && (
        <div className="mt-5 grid gap-3">
          {[1, 2, 3].map((item) => (
            <article
              key={item}
              className="animate-pulse rounded-2xl border border-[var(--border-subtle)] bg-[var(--background-muted)] p-5"
            >
              <div className="h-3 w-24 rounded-full bg-sky-200/60 dark:bg-sky-400/20" />
              <div className="mt-4 h-4 w-full rounded-full bg-sky-200/60 dark:bg-sky-400/20" />
              <div className="mt-2 h-4 w-5/6 rounded-full bg-sky-200/60 dark:bg-sky-400/20" />
              <div className="mt-4 h-9 w-24 rounded-full bg-sky-200/60 dark:bg-sky-400/20" />
            </article>
          ))}
        </div>
      )}

      {hasCaptions && (
        <div className="mt-5 grid gap-3">
          {captions.map((caption, index) => (
            <article key={index} className="glass-card group relative overflow-hidden rounded-3xl p-5 transition hover:-translate-y-1">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 opacity-70 transition group-hover:opacity-100" />
              <p className="tech-label !tracking-[0.18em] text-muted">Option {index + 1}</p>
              <p className="text-base leading-relaxed text-foreground">{caption}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-muted">
                <span>Ready to edit or post</span>
                <button
                  type="button"
                  onClick={() => onCopy(caption, index)}
                  className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-muted transition hover:-translate-y-0.5 hover:text-sky-600 dark:hover:text-sky-300"
                >
                  {copiedTarget === index ? 'Copied' : 'Copy'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
