'use client'

import Image from 'next/image'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Image
      src="/logo-light.png"
      alt="Caption Wizard AI"
      width={40}
      height={40}
      className={`h-10 w-10 object-contain ${className}`}
      priority
    />
  )
}
