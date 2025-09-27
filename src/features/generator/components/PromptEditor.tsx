import type { KeyboardEvent } from 'react'

const metricClass = 'glass-pill flex items-center justify-between rounded-xl px-4 py-2 text-xs font-semibold text-muted'

type PromptEditorProps = {
  description: string
  onChange: (value: string) => void
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void
  quickPrompts: string[]
  characterCount: number
  wordCount: number
  estimatedTokens: number
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
  estimatedTokens,
  maxCharacters,
  isOverLimit,
}: PromptEditorProps) {
  return (
    <div className="glass-card rounded-3xl p-6 transition-colors">
      <label htmlFor="description" className="flex items-center justify-between text-sm font-medium text-foreground">
        Describe your photo or video
        <span className="text-xs text-muted">Press ⌘⏎ / Ctrl⏎ to generate</span>
      </label>
      <textarea
        id="description"
        rows={4}
        className="mt-3 w-full resize-none rounded-2xl border border-transparent bg-white/95 p-4 text-base text-foreground placeholder:text-muted transition focus:border-indigo-400 focus:outline-none focus:ring focus:ring-indigo-300/30 dark:bg-[rgba(15,23,42,0.75)]"
        placeholder="I just shot..."
        value={description}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={onKeyDown}
      />

      <div className="mt-4 flex flex-wrap gap-3">
        {quickPrompts.map((prompt) => (
          <button
            key={prompt}
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
          <span className="uppercase tracking-wide">Token est.</span>
          <span className="text-sm font-semibold text-foreground">{estimatedTokens}</span>
        </div>
      </div>
      <p className={`mt-2 text-xs ${isOverLimit ? 'text-rose-500' : 'text-muted'}`}>
        {isOverLimit
          ? `Trim ${characterCount - maxCharacters} characters for the cleanest output.`
          : 'Keep it vivid and concise — 1 to 2 sentences works best.'}
      </p>
    </div>
  )
}
