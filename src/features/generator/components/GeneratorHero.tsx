import type { HighlightStat } from '../types'

type GeneratorHeroProps = {
  stats: HighlightStat[]
}

export function GeneratorHero({ stats }: GeneratorHeroProps) {
  return (
    <header className="glass-card rounded-3xl p-8 transition-colors">
      <span className="badge-soft mb-3 inline-flex items-center gap-2 px-4 py-1 text-xs">
        Simple caption writer
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        Turn a quick description into captions you can post right away.
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted">
        Describe the photo or video, choose a style, and get ready-to-use caption options with matching hashtags. No prompt engineering needed.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-4 text-center transition-colors">
            <p className="text-2xl font-semibold text-[var(--accent-primary)] dark:text-indigo-300">{stat.value}</p>
            <p className="text-xs uppercase tracking-wide text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </header>
  )
}
