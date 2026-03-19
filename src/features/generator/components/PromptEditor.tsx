import type { KeyboardEvent } from 'react'

const metricClass = 'glass-pill flex items-center justify-between rounded-xl px-4 py-2 text-xs font-semibold text-muted'

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
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="tech-label">01 / Input</p>
          <label htmlFor="description" className="mt-3 block text-lg font-semibold text-foreground">
            Describe the post
          </label>
          <p className="mt-1 text-sm text-muted">Write the setting, subject, and mood in one or two lines.</p>
        </div>
        <span className="text-xs text-muted">Shortcut: ⌘⏎ / Ctrl⏎</span>
      </div>
      <textarea
        id="description"
        rows={6}
        className="min-h-[190px] w-full resize-none rounded-[28px] border border-[var(--border-subtle)] bg-[linear-gradient(180deg,rgba(255,255,255,0.64),rgba(232,244,255,0.82))] px-5 py-4 text-base leading-7 text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-300/20 dark:bg-[linear-gradient(180deg,rgba(6,18,35,0.75),rgba(9,25,48,0.92))]"
        placeholder="Example: Late-night product launch photo with the team celebrating around the screen."
        value={description}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
      />

      <div className="flex flex-wrap items-center gap-3">
        <p className="tech-label">Try an example</p>
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onChange(prompt)}
            className="glass-pill rounded-full px-3 py-1.5 text-xs font-medium text-muted transition hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 dark:hover:text-sky-300"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className={metricClass}>
          <span className="uppercase tracking-wide">Words</span>
          <span className="text-sm font-semibold text-foreground">{wordCount}</span>
        </div>
        <div className={metricClass}>
          <span className="uppercase tracking-wide">Characters</span>
          <span className={`text-sm font-semibold ${isOverLimit ? 'text-rose-500' : 'text-foreground'}`}>
            {characterCount}/{maxCharacters}
          </span>
        </div>
        <div className={metricClass}>
          <span className="uppercase tracking-wide">Works best with</span>
          <span className="text-sm font-semibold text-foreground">1-2 lines</span>
        </div>
      </div>
      <p className={`mt-2 text-xs ${isOverLimit ? 'text-rose-500' : 'text-muted'}`}>
        {isOverLimit
          ? `Trim ${characterCount - maxCharacters} characters to keep the request clear.`
          : 'Keep it simple: setting, subject, and mood usually give the best results.'}
      </p>
    </section>
  )
}
