'use client'

import Image from 'next/image'

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`rounded-full overflow-hidden w-12 h-12  ${className}`}>
      <Image
        src="/darklogo.svg"
        alt="Caption Wizard AI"
        width={48}
        height={48}
        className="object-cover w-full h-full"
        priority
      />
    </div>
  )
}
