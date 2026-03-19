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
    <section className="space-y-3">
      <div>
        <p className="tech-label">03 / Generate</p>
        <p className="mt-3 text-lg font-semibold text-foreground">Generate the captions</p>
        <p className="mt-1 text-sm leading-6 text-muted">The results will appear directly below in this workspace.</p>
      </div>
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <button type="button" onClick={onPrimary} disabled={disablePrimary} className="button-primary min-w-[13rem]">
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
        <p className="text-xs font-medium leading-6 text-muted lg:ml-auto">{usageMessage}</p>
      </div>
      {error && <p className="text-sm text-rose-500 dark:text-rose-300">{error}</p>}
    </section>
  )
}
