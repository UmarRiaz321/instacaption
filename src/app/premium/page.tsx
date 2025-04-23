'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function PremiumPage() {
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

        // Save user to Supabase
        const saveRes = await fetch('/api/save-user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email }),
        })

        const saveData = await saveRes.json()
        if (saveData.error) {
          console.error('Save to DB failed:', saveData.error)
        }
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
    <main className="min-h-screen flex items-center justify-center p-6 bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-white transition">
      <div className="max-w-xl bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md text-center border border-gray-300 dark:border-white/10">
        {loading && <p className="text-lg">⏳ Verifying your premium status...</p>}

        {!loading && email && (
          <>
            <h1 className="text-3xl font-bold mb-4">🎉 Premium Unlocked!</h1>
            <p className="text-lg mb-4">Welcome, <strong>{email}</strong></p>
            <p className="text-md mb-6">You now have full access to exclusive caption tools.</p>
            <Link
              href="/"
              className="inline-block px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              ← Start Creating Premium Captions
            </Link>
          </>
        )}

        {!loading && error && (
          <>
            <h1 className="text-2xl font-semibold mb-4 text-red-500">❌ Verification Failed</h1>
            <p>{error}</p>
            <Link
              href="/"
              className="inline-block mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              ← Back to Homepage
            </Link>
          </>
        )}
      </div>
    </main>
  )
}
