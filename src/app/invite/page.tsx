'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/context/UserContext'
import Link from 'next/link'

export default function InvitePage() {
  const { email } = useUser()
  const [copied, setCopied] = useState(false)
  const [invites, setInvites] = useState(0)
  const [loading, setLoading] = useState(true)

  const referralLink = email ? `https://captionwizard.pro/?ref=${encodeURIComponent(email)}` : ''

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  useEffect(() => {
    if (!email) return; // Wait until email is ready
  
    fetch('/api/get-invites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.invites === 'number') {
          setInvites(data.invites)
        } else {
          setInvites(0)
        }
      })
      .catch(() => {
        setInvites(0)
      })
      .finally(() => {
        setLoading(false) // ✅ Important: Only stop loading after fetch
      })
  
  }, [email])
  

  if (!email) {
    return (
      <main className="min-h-screen bg-[#f4f4fb] flex items-center justify-center text-gray-800">
        <div className="text-center space-y-4">
          <p className="text-lg font-semibold">Please login first to view your invite link 🚀</p>
          <Link href="/" className="text-indigo-500 hover:underline text-sm">← Back to Home</Link>
        </div>
      </main>
    )
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f4f4fb] flex items-center justify-center text-gray-800">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
          <p className="text-lg font-semibold">Loading your invite link...</p>
        </div>
      </main>
    )
  }
  

  return (
    <main className="min-h-screen bg-[#f4f4fb] flex flex-col items-center justify-center px-4 py-12 text-gray-800">
      <div className="bg-white border border-gray-300 p-8 rounded-2xl w-full max-w-xl shadow-lg text-center space-y-6">
        <h1 className="text-3xl font-bold">🎁 Get Free Premium</h1>
        <p className="text-gray-600 text-sm">
          Invite <strong>3 friends</strong> and unlock lifetime premium access for free!
        </p>

        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={referralLink}
            className="flex-1 p-2 border border-gray-300 rounded-lg text-xs text-gray-600 bg-gray-100"
          />
          <button
            onClick={handleCopy}
            className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold px-3 py-2 rounded-lg transition"
          >
            {copied ? '✅ Copied' : '📋 Copy'}
          </button>
        </div>

        <div className="flex justify-center gap-4">
          <a
            href={`https://wa.me/?text=Join me on Caption Wizard AI 🚀 ${referralLink}`}
            target="_blank"
            className="text-green-500 hover:underline text-sm"
          >
            WhatsApp
          </a>
          <a
            href={`https://twitter.com/intent/tweet?text=Unlock%20free%20AI%20captions%20with%20me!%20${referralLink}`}
            target="_blank"
            className="text-blue-400 hover:underline text-sm"
          >
            Twitter
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${referralLink}`}
            target="_blank"
            className="text-blue-600 hover:underline text-sm"
          >
            Facebook
          </a>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mt-4">
          <div
            className="bg-green-400 h-3 rounded-full transition-all"
            style={{ width: `${Math.min((invites / 3) * 100, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500">{invites}/3 friends invited</p>

        <Link
          href="/"
          className="inline-block mt-6 text-indigo-500 hover:underline text-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  )
}
