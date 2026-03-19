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
    <div className="space-y-3">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={onPrimary} disabled={disablePrimary} className="button-primary">
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
      <p className="text-xs font-medium text-muted">{usageMessage}</p>
      {error && <p className="text-sm text-rose-500 dark:text-rose-300">{error}</p>}
    </div>
  )
}
