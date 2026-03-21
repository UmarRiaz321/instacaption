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
    <section aria-live="polite" className="space-y-3 pt-1" id="results">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="tech-label">04 / Results</p>
          <h2 id="results-heading" className="mt-2 text-lg font-semibold text-foreground">Generated captions</h2>
          <p className="mt-1 text-sm leading-6 text-muted">
            {loading && !hasCaptions
              ? 'Writing your captions now.'
              : hasCaptions
                ? 'Your latest caption set stays available here until you start over.'
                : 'Generate to open your caption set here.'}
          </p>
        </div>
        {hasCaptions && (
          <button
            type="button"
            onClick={onCopyAll}
            className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-muted transition hover:-translate-y-0.5 hover:text-sky-700 dark:hover:text-sky-300"
          >
            {copiedTarget === 'all' ? 'Copied all' : 'Copy all'}
          </button>
        )}
      </div>

      {!hasCaptions && !loading && (
        <div className="rounded-[22px] border border-dashed border-[var(--border-subtle)] bg-[rgba(255,255,255,0.52)] px-5 py-5 dark:bg-[rgba(4,18,36,0.35)]">
          <p className="text-sm font-semibold text-foreground">Ready when you are.</p>
          <p className="mt-1 text-sm leading-6 text-muted">
            Generate to see caption suggestions with matching hashtags in this popup.
          </p>
        </div>
      )}

      {!hasCaptions && loading && (
        <div className="grid gap-3">
          {[1, 2, 3].map((item) => (
            <article
              key={item}
              className="animate-pulse rounded-2xl border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.9)] p-5 dark:bg-[var(--background-muted)]"
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
        <div className="grid gap-3">
          {captions.map((caption, index) => (
            <article
              key={index}
              className="group relative overflow-hidden rounded-[24px] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.9)] p-5 transition hover:-translate-y-0.5 dark:bg-[rgba(7,24,47,0.72)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 opacity-35 transition group-hover:opacity-60" />
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Caption {index + 1}</p>
              <p className="mt-2 text-base leading-relaxed text-foreground">{caption}</p>
              <div className="mt-4 flex items-center justify-between text-sm text-muted">
                <span>Edit or post as-is</span>
                <button
                  type="button"
                  onClick={() => onCopy(caption, index)}
                  className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium text-muted transition hover:-translate-y-0.5 hover:text-sky-700 dark:hover:text-sky-300"
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
