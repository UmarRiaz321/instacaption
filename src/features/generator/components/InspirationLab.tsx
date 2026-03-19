import type { InspirationCard } from '../types'

type InspirationLabProps = {
  cards: InspirationCard[]
  onApply: (card: InspirationCard) => void
  onToneSelect: (tone: string) => void
  onPromptLoad: (prompt: string) => void
}

export function InspirationLab({ cards, onApply, onToneSelect, onPromptLoad }: InspirationLabProps) {
  return (
    <div className="glass-card rounded-[28px] p-6 transition-colors">
      <div className="flex items-center justify-between">
        <div>
          <p className="tech-label">Starter Prompts</p>
          <h3 className="mt-3 text-xl font-semibold text-foreground">Load a fast example</h3>
        </div>
        <span className="badge-soft">Examples</span>
      </div>
      <p className="mt-2 text-sm text-muted">
        Pick a sample prompt and the tool will fill in the description and matching style for you.
      </p>

      <div className="mt-5 space-y-3">
        {cards.map((entry) => (
          <article
            key={entry.title}
            className="rounded-2xl border border-transparent bg-[var(--background-muted)] px-4 py-3 transition hover:-translate-y-0.5 hover:border-sky-300/60"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-foreground">
                {entry.icon} {entry.title}
              </span>
              <button
                type="button"
                onClick={() => onApply(entry)}
                className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-3 py-1 text-xs font-semibold text-white shadow-md shadow-sky-300/40 transition hover:-translate-y-0.5 hover:bg-sky-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
              >
                Use example
              </button>
            </div>
            <p className="mt-2 text-sm text-muted">{entry.prompt}</p>
            <p className="mt-2 text-xs text-muted opacity-80">{entry.tip}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted">
        <button
          type="button"
          onClick={() => onToneSelect('mysterious')}
          className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1 transition hover:-translate-y-0.5 hover:text-sky-600 dark:hover:text-sky-300"
        >
          Try mysterious
        </button>
        <button
          type="button"
          onClick={() => onToneSelect('luxury')}
          className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1 transition hover:-translate-y-0.5 hover:text-sky-600 dark:hover:text-sky-300"
        >
          Try luxury
        </button>
        <button
          type="button"
          onClick={() => onPromptLoad('Product flatlay with crisp lighting and warm shadows')}
          className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1 transition hover:-translate-y-0.5 hover:text-sky-600 dark:hover:text-sky-300"
        >
          Load product photo example
        </button>
      </div>
    </div>
  )
}
