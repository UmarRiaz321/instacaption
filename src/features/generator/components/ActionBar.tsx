import type { ReactNode } from 'react'

type ActionBarProps = {
  primaryLabel: ReactNode
  secondaryLabel: ReactNode
  onPrimary: () => void
  onSecondary: () => void
  disablePrimary: boolean
  disableSecondary?: boolean
  usageMessage: string
  error?: string | null
}

export function ActionBar({
  primaryLabel,
  secondaryLabel,
  onPrimary,
  onSecondary,
  disablePrimary,
  disableSecondary = false,
  usageMessage,
  error,
}: ActionBarProps) {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="tech-label">03 / Generate</p>
          <p className="mt-3 text-lg font-semibold text-foreground">Create the caption set</p>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={onPrimary} disabled={disablePrimary} className="button-primary min-w-[12rem]">
          {primaryLabel}
        </button>
        <button
          type="button"
          onClick={onSecondary}
          disabled={disableSecondary}
          className="button-secondary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {secondaryLabel}
        </button>
      </div>
      <p className="glass-pill inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-medium text-muted">
        {usageMessage}
      </p>
      {error && <p className="text-sm text-rose-500 dark:text-rose-300">{error}</p>}
    </section>
  )
}
