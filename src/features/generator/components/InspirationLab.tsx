import type { InspirationCard } from '../types'

type InspirationLabProps = {
  cards: InspirationCard[]
  onApply: (card: InspirationCard) => void
  onToneSelect: (tone: string) => void
  onPromptLoad: (prompt: string) => void
}

export function InspirationLab({ cards, onApply, onToneSelect, onPromptLoad }: InspirationLabProps) {
  return (
    <div className="glass-card rounded-3xl p-6 transition-colors">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Inspiration lab</h3>
        <span className="badge-soft">Fresh</span>
      </div>
      <p className="mt-2 text-sm text-muted">
        Pick a scenario we see trending. We’ll auto load the prompt and best-fit vibe.
      </p>

      <div className="mt-5 space-y-3">
        {cards.map((entry) => (
          <article
            key={entry.title}
            className="rounded-2xl border border-transparent bg-[var(--background-muted)] px-4 py-3 transition hover:-translate-y-0.5 hover:border-indigo-300/60"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-foreground">
                {entry.icon} {entry.title}
              </span>
              <button
                onClick={() => onApply(entry)}
                className="inline-flex items-center gap-2 rounded-full bg-indigo-500 px-3 py-1 text-xs font-semibold text-white shadow-md shadow-indigo-300/40 transition hover:-translate-y-0.5 hover:bg-indigo-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                Apply
              </button>
            </div>
            <p className="mt-2 text-sm text-muted">{entry.prompt}</p>
            <p className="mt-2 text-xs text-muted opacity-80">{entry.tip}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-xs text-muted">
        <button
          onClick={() => onToneSelect('mysterious')}
          className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1 transition hover:-translate-y-0.5 hover:text-indigo-500 dark:hover:text-indigo-300"
        >
          Remix with 🕶️ Mysterious
        </button>
        <button
          onClick={() => onToneSelect('luxury')}
          className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1 transition hover:-translate-y-0.5 hover:text-indigo-500 dark:hover:text-indigo-300"
        >
          Switch to 💎 Luxury
        </button>
        <button
          onClick={() => onPromptLoad('Product flatlay with crisp lighting and warm shadows')}
          className="glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1 transition hover:-translate-y-0.5 hover:text-indigo-500 dark:hover:text-indigo-300"
        >
          Load product flatlay
        </button>
      </div>
    </div>
  )
}
