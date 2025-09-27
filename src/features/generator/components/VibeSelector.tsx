import type { VibeGroup } from '../types'

type VibeSelectorProps = {
  groups: VibeGroup[]
  selected: string
  onSelect: (value: string) => void
}

export function VibeSelector({ groups, selected, onSelect }: VibeSelectorProps) {
  return (
    <div className="space-y-5" id="vibes">
      {groups.map((group) => (
        <section key={group.title} className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">{group.title}</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {group.vibes.map((vibe) => {
              const isSelected = selected === vibe.value

              return (
                <button
                  key={vibe.value}
                  type="button"
                  onClick={() => onSelect(vibe.value)}
                  aria-pressed={isSelected}
                  title={`Switch tone to ${vibe.label}`}
                  className={`glass-card group relative flex flex-col gap-3 rounded-3xl p-5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                    isSelected ? 'ring-2 ring-indigo-400 shadow-indigo-300/50 -translate-y-1' : 'hover:-translate-y-1 hover:shadow-lg'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base font-semibold text-foreground transition-colors group-hover:text-indigo-500 dark:group-hover:text-indigo-300">
                      {vibe.label}
                    </span>
                    {vibe.badge && (
                      <span className="glass-pill inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-indigo-500">
                        {vibe.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed text-muted">{vibe.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1 text-xs font-medium text-muted">
                    {vibe.hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="glass-pill inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium text-muted"
                      >
                        {tag.startsWith('#') ? tag : `#${tag}`}
                      </span>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
