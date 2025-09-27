import type { HighlightStat } from '../types'

type GeneratorHeroProps = {
  stats: HighlightStat[]
}

export function GeneratorHero({ stats }: GeneratorHeroProps) {
  return (
    <header className="glass-card rounded-3xl p-8 transition-colors">
      <span className="badge-soft mb-3 inline-flex items-center gap-2 px-4 py-1 text-xs">
        AI caption studio 2.0
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <h1 className="text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
        Describe your moment. Pick a vibe. Drop captions your audience will save.
      </h1>
      <p className="mt-4 max-w-2xl text-base text-muted">
        Caption Wizard AI blends storytelling, trends, and SEO-friendly hooks into bite-sized copy. Every tone is handcrafted for creators, founders, and brands who want their content to resonate.
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
