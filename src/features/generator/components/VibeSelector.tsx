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
    <section className="max-w-xl space-y-3" id="vibes">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="tech-label">02 / Style</p>
          <label htmlFor="caption-style" className="mt-3 block text-lg font-semibold text-foreground">
            Pick a style
          </label>
          <p className="mt-1 text-sm text-muted">Choose how the caption should sound before you generate.</p>
        </div>
        {selectedVibe?.badge && <span className="badge-soft mt-1">{selectedVibe.badge}</span>}
      </div>
      <div className="relative">
        <select
          id="caption-style"
          value={selected}
          onChange={(event) => onSelect(event.target.value)}
          className="w-full appearance-none rounded-[22px] border border-[var(--border-subtle)] bg-[rgba(7,24,47,0.64)] px-4 py-3 pr-12 text-base text-foreground outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-300/20"
        >
          {groups.map((group) => (
            <optgroup key={group.title} label={group.title}>
              {group.vibes.map((vibe) => (
                <option key={vibe.value} value={vibe.value}>
                  {vibe.label}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-muted" aria-hidden="true">
          <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" stroke="currentColor" strokeWidth="1.6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m5 7 5 6 5-6" />
          </svg>
        </span>
      </div>

      {selectedVibe && (
        <div className="rounded-[20px] border border-[var(--border-subtle)] bg-[rgba(7,24,47,0.44)] px-4 py-3">
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
