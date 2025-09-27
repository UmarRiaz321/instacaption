'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/Logo'

export default function SuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [message, setMessage] = useState('Processing your upgrade...')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      // Optionally fetch more data here
      setTimeout(() => {
        setMessage('🎉 You’re now a premium user!')
        setLoading(false)
      }, 1200)
    }
  }, [sessionId])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background-primary)] p-6 text-foreground">
      <div className="glass-card w-full max-w-md rounded-2xl p-8 text-center">
        <Logo />
        <h1 className="mt-3 mb-4 text-2xl font-bold text-foreground">Thank you! 🙌</h1>
        <p className="mb-4 text-sm text-muted">{message}</p>

        {!loading && (
          <Link
            href="/"
            className="mt-4 inline-block rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-300/40 transition hover:-translate-y-0.5 hover:bg-indigo-500"
          >
            Go to App →
          </Link>
        )}
      </div>
    </main>
  )
}
