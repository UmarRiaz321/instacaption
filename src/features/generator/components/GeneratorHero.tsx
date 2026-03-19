import type { HighlightStat } from '../types'

type GeneratorHeroProps = {
  stats: HighlightStat[]
}

export function GeneratorHero({ stats }: GeneratorHeroProps) {
  return (
    <header className="flex h-full flex-col justify-between gap-8">
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="badge-soft px-4 py-1 text-xs">Caption Console</span>
          <span className="tech-label">Input / Style / Generate</span>
        </div>
        <h1 className="max-w-xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-foreground sm:text-5xl">
          Start with the moment. End with a caption worth posting.
        </h1>
        <p className="max-w-xl text-base leading-7 text-muted sm:text-lg">
          Describe the post in plain language, choose the tone, and generate a clean caption set with hashtags in
          seconds.
        </p>
        <div className="flex flex-wrap gap-3 text-sm text-muted">
          <span className="glass-pill rounded-full px-3 py-1.5">No prompt syntax</span>
          <span className="glass-pill rounded-full px-3 py-1.5">Post-ready in seconds</span>
          <span className="glass-pill rounded-full px-3 py-1.5">Built for non-technical users</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="glass-card rounded-2xl p-4 text-center transition-colors">
            <p className="text-2xl font-semibold text-[var(--accent-primary)]">{stat.value}</p>
            <p className="text-xs uppercase tracking-wide text-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </header>
  )
}
