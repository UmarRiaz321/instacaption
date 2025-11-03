'use client'

import { useEffect, useMemo } from 'react'

declare global {
  interface Window {
    adsbygoogle: Array<Record<string, unknown>>;
  }
}

const slotRegistry = {
  'sidebar-left': process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR_LEFT,
  'sidebar-right': process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR_RIGHT,
  'blog-hero': process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_HERO,
  'blog-sidebar': process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_SIDEBAR,
  'blog-inline': process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INLINE,
} as const

type SlotKey = keyof typeof slotRegistry

type AdSlotProps = {
  slotId?: string
  placement?: SlotKey
  className?: string
}

export default function AdSlot({ slotId, placement, className = '' }: AdSlotProps) {
  const resolvedSlotId = useMemo(() => {
    if (slotId) {
      return slotId
    }
    if (placement) {
      return slotRegistry[placement]
    }
    return undefined
  }, [placement, slotId])

  useEffect(() => {
    if (!resolvedSlotId) {
      return
    }
    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || []
        window.adsbygoogle.push({})
      }
    } catch (e) {
      console.error('Ad error:', e)
    }
  }, [resolvedSlotId])

  if (!resolvedSlotId) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('AdSlot: No slot ID resolved for placement', placement)
    }
    return (
      <div
        className={`flex items-center justify-center rounded-xl border border-dashed border-indigo-200/60 bg-indigo-50/40 text-xs text-muted dark:border-indigo-400/40 dark:bg-indigo-950/30 ${className}`}
      >
        Ad slot unavailable
      </div>
    )
  }

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      data-ad-client="ca-pub-2318193865626108"
      data-ad-slot={resolvedSlotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  )
}
