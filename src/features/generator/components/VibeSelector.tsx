import type { VibeGroup } from '../types'

type VibeSelectorProps = {
  groups: VibeGroup[]
  selected: string
  onSelect: (value: string) => void
}

export function VibeSelector({ groups, selected, onSelect }: VibeSelectorProps) {
  const vibes = groups.flatMap((group) =>
    group.vibes.map((vibe) => ({
      ...vibe,
      groupTitle: group.title,
    }))
  )

  const selectedVibe = vibes.find((vibe) => vibe.value === selected) ?? vibes[0]

  return (
    <section className="space-y-4" id="vibes">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="tech-label">02 / Style</p>
          <h2 className="mt-3 text-lg font-semibold text-foreground">Pick the tone</h2>
          <p className="mt-1 text-sm text-muted">Keep it minimal. Tap once to swap the caption direction.</p>
        </div>
        {selectedVibe?.badge && <span className="badge-soft mt-1">{selectedVibe.badge}</span>}
      </div>
      <div className="flex flex-wrap gap-2.5">
        {vibes.map((vibe) => {
          const isSelected = selected === vibe.value

          return (
            <button
              key={vibe.value}
              type="button"
              onClick={() => onSelect(vibe.value)}
              aria-pressed={isSelected}
              title={`Switch tone to ${vibe.label}`}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                isSelected
                  ? 'border-sky-400 bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(37,99,235,0.18))] text-foreground shadow-[0_18px_35px_-18px_rgba(14,165,233,0.55)]'
                  : 'border-[var(--border-subtle)] bg-white/50 text-muted hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 dark:bg-slate-950/20 dark:hover:text-sky-300'
              }`}
            >
              {vibe.label}
            </button>
          )
        })}
      </div>

      {selectedVibe && (
        <div className="rounded-[24px] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.42)] p-4 dark:bg-[rgba(4,18,36,0.42)]">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-base font-semibold text-foreground">{selectedVibe.label}</p>
              <p className="text-xs uppercase tracking-[0.18em] text-muted">{selectedVibe.groupTitle}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedVibe.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="glass-pill rounded-full px-2.5 py-1 text-[11px] font-medium text-muted"
                >
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">{selectedVibe.description}</p>
        </div>
      )}
    </section>
  )
}
