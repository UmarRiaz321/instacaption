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
    <section className="space-y-3" id="vibes">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="tech-label">02 / Style</p>
          <h2 className="mt-3 text-lg font-semibold text-foreground">Pick the tone</h2>
          <p className="mt-1 text-sm text-muted">Tap once to change how the caption sounds.</p>
        </div>
        {selectedVibe?.badge && <span className="badge-soft mt-1">{selectedVibe.badge}</span>}
      </div>
      <div className="flex flex-wrap gap-2">
        {vibes.map((vibe) => {
          const isSelected = selected === vibe.value

          return (
            <button
              key={vibe.value}
              type="button"
              onClick={() => onSelect(vibe.value)}
              aria-pressed={isSelected}
              title={`Switch tone to ${vibe.label}`}
              className={`rounded-full border px-3.5 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 ${
                isSelected
                  ? 'border-sky-400 bg-[linear-gradient(135deg,rgba(14,165,233,0.16),rgba(37,99,235,0.18))] text-foreground shadow-[0_18px_35px_-18px_rgba(14,165,233,0.4)]'
                  : 'border-[var(--border-subtle)] bg-white/94 text-muted hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 dark:bg-slate-950/20 dark:hover:text-sky-300'
              }`}
            >
              {vibe.label}
            </button>
          )
        })}
      </div>

      {selectedVibe && (
        <div className="rounded-[20px] border border-[var(--border-subtle)] bg-[rgba(255,255,255,0.84)] px-4 py-3 dark:bg-[rgba(4,18,36,0.42)]">
          <p className="text-sm font-medium text-foreground">
            <span className="font-semibold">{selectedVibe.label}:</span> {selectedVibe.description}
          </p>
          <p className="mt-2 text-xs font-medium text-muted">
            Suggested tags: {selectedVibe.hashtags.map((tag) => (tag.startsWith('#') ? tag : `#${tag}`)).join(' ')}
          </p>
        </div>
      )}
    </section>
  )
}
