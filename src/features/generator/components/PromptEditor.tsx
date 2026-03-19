import type { KeyboardEvent } from 'react'

const metricClass =
  'glass-pill inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-muted'

type PromptEditorProps = {
  description: string
  onChange: (value: string) => void
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void
  quickPrompts: string[]
  characterCount: number
  wordCount: number
  maxCharacters: number
  isOverLimit: boolean
}

export function PromptEditor({
  description,
  onChange,
  onKeyDown,
  quickPrompts,
  characterCount,
  wordCount,
  maxCharacters,
  isOverLimit,
}: PromptEditorProps) {
  const visiblePrompts = quickPrompts.slice(0, 3)

  return (
    <section className="space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="tech-label">01 / Input</p>
          <label htmlFor="description" className="mt-3 block text-lg font-semibold text-foreground">
            Describe the post
          </label>
          <p className="mt-1 text-sm text-muted">Write the setting, subject, and mood in one or two lines.</p>
        </div>
        <span className="text-xs font-medium text-muted">Shortcut: ⌘⏎ / Ctrl⏎</span>
      </div>
      <textarea
        id="description"
        rows={3}
        className="min-h-[118px] w-full resize-none rounded-[24px] border border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(245,250,255,1))] px-4 py-3 text-base leading-7 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.96)] outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-300/20 dark:bg-[linear-gradient(180deg,rgba(6,18,35,0.75),rgba(9,25,48,0.92))]"
        placeholder="Example: Late-night product launch photo with the team celebrating around the screen."
        value={description}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
      />

      <div className="flex flex-wrap items-center gap-2.5">
        <p className="tech-label">Try an example</p>
        {visiblePrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onChange(prompt)}
            className="glass-pill rounded-full px-3 py-1.5 text-xs font-medium text-muted transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:hover:text-sky-300"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <div className={metricClass}>
          <span className="uppercase tracking-wide">Words</span>
          <span className="text-foreground">{wordCount}</span>
        </div>
        <div className={metricClass}>
          <span className="uppercase tracking-wide">Characters</span>
          <span className={isOverLimit ? 'text-rose-500' : 'text-foreground'}>
            {characterCount}/{maxCharacters}
          </span>
        </div>
        <div className={metricClass}>
          <span className="uppercase tracking-wide">Works best with</span>
          <span className="text-foreground">1-2 lines</span>
        </div>
      </div>
      <p className={`text-xs leading-6 ${isOverLimit ? 'text-rose-500' : 'text-muted'}`}>
        {isOverLimit
          ? `Trim ${characterCount - maxCharacters} characters to keep the request clear.`
          : 'Keep it simple: setting, subject, and mood usually give the best results.'}
      </p>
    </section>
  )
}
