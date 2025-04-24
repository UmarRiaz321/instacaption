'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Logo from '@/components/Logo'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('Processing your upgrade...')

  useEffect(() => {
    const handleSuccess = async () => {
      if (!sessionId) return

      // Optional: Call your backend to validate session
      // (we can skip this if you're using webhooks)
      setTimeout(() => {
        setMessage('🎉 You’re now a premium user!')
        setLoading(false)
      }, 1500)
    }

    handleSuccess()
  }, [sessionId])

  return (
    <main className="min-h-screen bg-[#111] text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-[#1a1a1a] p-8 rounded-xl shadow-md text-center border border-white/10">
        <Logo />
        <h1 className="text-2xl font-bold mt-3 mb-4">Thank you! 🙌</h1>
        <p className="text-white/70 text-sm mb-4">{message}</p>

        {!loading && (
          <Link
            href="/"
            className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Go to App →
          </Link>
        )}
      </div>
    </main>
  )
}
