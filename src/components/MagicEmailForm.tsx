'use client'

import { useEffect, useState } from 'react'

export default function MagicEmailForm({ onStatus }: { onStatus?: (isPremium: boolean, email: string) => void }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const storedEmail = localStorage.getItem('caption_user_email')
    if (storedEmail) {
      checkPremium(storedEmail)
    }
  }, [])

  const checkPremium = async (userEmail: string) => {
    const res = await fetch('/api/check-premium', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: userEmail }),
    })

    const data = await res.json()

    if (data.premium) {
      localStorage.setItem('caption_user_email', userEmail)
      setStatus('✅ Premium access granted')
      onStatus?.(true, userEmail)
    } else {
      setStatus('❌ Not a premium user')
      onStatus?.(false, userEmail)
    }
  }

  const handleSubmit = async () => {
    if (!email.includes('@')) {
      setStatus('Please enter a valid email.')
      return
    }

    checkPremium(email)
  }

  return (
    <div className="mt-6 bg-white/5 p-4 rounded-md border border-white/10">
      <h3 className="text-white text-lg font-semibold mb-2">Check if you have premium access 🔐</h3>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white outline-none mb-2"
      />
      <button
        onClick={handleSubmit}
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-6 py-2 rounded-md font-semibold"
      >
        Check Access
      </button>
      {status && <p className="mt-2 text-sm text-indigo-300">{status}</p>}
    </div>
  )
}
