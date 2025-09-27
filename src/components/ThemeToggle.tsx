'use client'

import { useEffect, useState } from 'react'
import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <span className="h-10 w-10 animate-pulse rounded-full bg-slate-200 dark:bg-slate-700" />
    )
  }

  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:scale-[1.02] hover:border-indigo-400 hover:text-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-indigo-500/60 dark:hover:text-indigo-300"
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12.79A9 9 0 0 1 11.21 3a7 7 0 1 0 9.79 9.79Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="h-5 w-5"
        >
          <circle cx="12" cy="12" r="5" />
          <path strokeLinecap="round" d="M12 1.5v2" />
          <path strokeLinecap="round" d="M12 20.5v2" />
          <path strokeLinecap="round" d="m4.22 4.22 1.42 1.42" />
          <path strokeLinecap="round" d="m18.36 18.36 1.42 1.42" />
          <path strokeLinecap="round" d="M1.5 12h2" />
          <path strokeLinecap="round" d="M20.5 12h2" />
          <path strokeLinecap="round" d="m4.22 19.78 1.42-1.42" />
          <path strokeLinecap="round" d="m18.36 5.64 1.42-1.42" />
        </svg>
      )}
    </button>
  )
}
