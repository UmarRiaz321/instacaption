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
    <div className="glass-card rounded-3xl p-6 transition-colors">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <label htmlFor="description" className="text-sm font-medium text-foreground">
            What are you posting?
          </label>
          <p className="mt-1 text-sm text-muted">
            Describe the photo or video in plain English. One or two short sentences is enough.
          </p>
        </div>
        <span className="text-xs text-muted">Shortcut: ⌘⏎ / Ctrl⏎</span>
      </div>
      <textarea
        id="description"
        rows={4}
        className="mt-3 w-full resize-none rounded-2xl border border-[var(--border-subtle)] bg-[var(--background-muted)] p-4 text-base text-foreground placeholder:text-muted transition focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300/30"
        placeholder="Example: A golden-hour beach walk after a long week at work."
        value={description}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
      />

      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted">Try an example</p>
      <div className="mt-2 flex flex-wrap gap-3">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onChange(prompt)}
            className="glass-pill rounded-full px-3 py-1 text-xs font-medium text-muted transition hover:-translate-y-0.5 hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:hover:text-indigo-300"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
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
    </div>
  )
}
