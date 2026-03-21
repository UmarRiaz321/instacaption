'use client'

import { useEffect, useRef } from 'react'
import { ResultsPanel } from './ResultsPanel'

type ResultsModalProps = {
  open: boolean
  onClose: () => void
  captions: string[]
  onCopyAll: () => void
  onCopy: (caption: string, index: number) => void
  copiedTarget: number | 'all' | null
  loading: boolean
}

export function ResultsModal({
  open,
  onClose,
  captions,
  onCopyAll,
  onCopy,
  copiedTarget,
  loading,
}: ResultsModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Close results"
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/72 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="results-heading"
        className="relative z-10 w-full max-w-3xl rounded-[30px] border border-sky-400/20 bg-[linear-gradient(180deg,rgba(3,15,30,0.97),rgba(7,24,48,0.95))] p-5 shadow-[0_48px_140px_-60px_rgba(14,165,233,0.55)]"
      >
        <div className="flex flex-col gap-3 border-b border-[var(--border-subtle)] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-6 text-muted">
            Close this popup any time. Your latest results stay saved until you start over.
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="button-secondary w-full justify-center sm:w-auto"
          >
            Close
          </button>
        </div>

        <div className="mt-5 max-h-[70vh] overflow-y-auto pr-1">
          <ResultsPanel
            captions={captions}
            copiedTarget={copiedTarget}
            loading={loading}
            onCopy={onCopy}
            onCopyAll={onCopyAll}
          />
        </div>
      </div>
    </div>
  )
}
