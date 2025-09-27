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
    <div className="glass-card mx-auto w-full max-w-xl space-y-4 rounded-2xl p-8 text-center">
      <div className="flex justify-center items-center gap-3 mb-4">
        <Logo />
        <h1 className="text-2xl font-bold text-foreground">Caption Wizard AI</h1>
      </div>

      {loading && <p className="text-lg text-muted">⏳ Verifying your premium status...</p>}

      {!loading && email && (
        <>
          <h2 className="text-3xl font-bold text-emerald-500">🎉 Premium Unlocked!</h2>
          <p className="text-foreground">Welcome, <strong>{email}</strong></p>
          <p className="text-sm text-muted">You now have full access to exclusive caption tools.</p>
          <Link
            href="/"
            className="glass-pill inline-block mt-4 rounded-full px-5 py-2 text-sm font-semibold text-indigo-600 transition hover:-translate-y-0.5 hover:text-indigo-500"
          >
            ← Start Creating Captions
          </Link>
        </>
      )}

      {!loading && error && (
        <>
          <h2 className="text-2xl font-semibold text-rose-500">❌ Verification Failed</h2>
          <p className="text-sm text-muted">{error}</p>
          <Link
            href="/"
            className="glass-pill inline-block mt-4 rounded-full px-4 py-2 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:text-indigo-500"
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
    <main className="flex min-h-screen items-center justify-center bg-[var(--background-primary)] p-6 text-foreground transition-all">
      <Suspense fallback={<p className="text-center text-lg text-muted">⏳ Loading...</p>}>
        <PremiumInner />
      </Suspense>
    </main>
  )
}
