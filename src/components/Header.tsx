'use client'

import Logo from './Logo'
import PremiumBadge from './PremiumBadge'
import { useUser } from '@/context/UserContext'

export default function Header() {
  const { isPremium } = useUser()

  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-blue-100 w-full py-4 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        {/* Center: Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
          Caption Wizard AI
        </h1>

        {/* Right: Premium Badge */}
        <div className="flex items-center gap-2">
          {isPremium && <PremiumBadge />}
        </div>
      </div>
    </div>
  )
}
