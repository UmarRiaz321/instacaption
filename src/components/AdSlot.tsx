'use client'

import { useEffect } from 'react'

export default function AdSlot({ slotId, className = '' }: { slotId: string, className?: string }) {
  useEffect(() => {
    try {
      // @ts-expect-error
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        // @ts-ignore
        window.adsbygoogle.push({})
      }
    } catch (e) {
      console.error('Ad error:', e)
    }
  }, [])

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      data-ad-client="ca-pub-2318193865626108"
      data-ad-slot={slotId}
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  )
}
