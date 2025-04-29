'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/Logo'


function PremiumInner() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  

  const [email, setEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        setError('Missing session ID')
        setLoading(false)
        return
      }

      try {
        const res = await fetch('/api/verify-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })

        const data = await res.json()

        if (!data.email) {
          setError(data.error || 'Unable to verify session')
          setLoading(false)
          return
        }

        setEmail(data.email)

        await fetch('/api/save-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email }),
        })
      } catch (err) {
        console.error('Verification error:', err)
        setError('Something went wrong')
      } finally {
        setLoading(false)
      }
    }

    verifySession()
  }, [sessionId])

  return (
    <div className="w-full max-w-xl mx-auto p-8 bg-white border border-gray-200 rounded-xl shadow-sm text-center space-y-4">
      <div className="flex justify-center items-center gap-3 mb-4">
        <Logo />
        <h1 className="text-2xl font-bold text-gray-800">Caption Wizard AI</h1>
      </div>

      {loading && <p className="text-lg text-gray-600">⏳ Verifying your premium status...</p>}

      {!loading && email && (
        <>
          <h2 className="text-3xl font-bold text-green-600">🎉 Premium Unlocked!</h2>
          <p className="text-gray-700">Welcome, <strong>{email}</strong></p>
          <p className="text-sm text-gray-500">You now have full access to exclusive caption tools.</p>
          <Link
            href="/"
            className="inline-block mt-4 px-5 py-2 bg-indigo-100 text-indigo-800 font-semibold rounded-full hover:bg-indigo-200 transition"
          >
            ← Start Creating Captions
          </Link>
        </>
      )}

      {!loading && error && (
        <>
          <h2 className="text-2xl font-semibold text-red-500">❌ Verification Failed</h2>
          <p className="text-sm text-gray-500">{error}</p>
          <Link
            href="/"
            className="inline-block mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition"
          >
            ← Back to Homepage
          </Link>
        </>
      )}
    </div>
  )
}

export default function PremiumPage() {
  return (
    <main className="min-h-screen bg-[#f4f4fb] text-gray-800 p-6 flex items-center justify-center transition-all">
      <Suspense fallback={<p className="text-center text-lg text-gray-600">⏳ Loading...</p>}>
        <PremiumInner />
      </Suspense>
    </main>
  )
}
