'use client'

import { useEffect, useState } from 'react'
// import Link from 'next/link'

export default function Home() {
  const [description, setDescription] = useState('')
  const [tone, setTone] = useState('funny')
  const [captions, setCaptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [isPremium, setIsPremium] = useState(false)
  const [email, setEmail] = useState<string | null>(null)

  // Fetch premium status (check Supabase via server route)
  useEffect(() => {
    const checkPremium = async () => {
      const res = await fetch('/api/get-user') // You can create this route to return the user's premium email if exists
      const data = await res.json()
      if (data.email) {
        setEmail(data.email)
        setIsPremium(true)
      }
    }
    checkPremium()
  }, [])

  const handleGenerate = async () => {
    if (!description.trim()) return
    setLoading(true)
    setCaptions([])
    setCopiedIndex(null)

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description, tone }),
    })

    const data = await res.json()
    setCaptions(data.captions || [])
    setLoading(false)
  }

  const handleCopy = (caption: string, index: number) => {
    navigator.clipboard.writeText(caption)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 1500)
  }

  const handlePremium = async () => {
    const res = await fetch('/api/checkout', { method: 'POST' })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6 transition">
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-300 dark:border-white/10">
        <h1 className="text-4xl font-bold text-center mb-6">✨ InstaCaption AI</h1>

        {email && (
          <p className="text-center text-green-400 mb-4">
            🌟 Premium user: <span className="font-medium">{email}</span>
          </p>
        )}

        <textarea
          rows={4}
          className="w-full p-4 mb-4 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-white/10 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white/60 outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Describe your image here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full p-3 mb-6 rounded-lg bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-white/10 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-500"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
        >
          <option value="funny">😂 Funny</option>
          <option value="motivational">🔥 Motivational</option>
          <option value="luxury" disabled={!isPremium}>
            💎 Luxury {isPremium ? '' : '(Premium)'}
          </option>
          <option value="relatable">😅 Relatable</option>
          <option value="mysterious" disabled={!isPremium}>
            🕶️ Mysterious {isPremium ? '' : '(Premium)'}
          </option>
          <option value="poetry" disabled={!isPremium}>
            🎭 Poetry {isPremium ? '' : '(Premium)'}
          </option>
        </select>

        {!isPremium && (
          <button
            onClick={handlePremium}
            className="w-full mb-6 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg"
          >
            🌟 Unlock Premium Tones – $5
          </button>
        )}

        <button
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-lg font-semibold text-white disabled:opacity-50"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Captions 🚀'}
        </button>

        {captions.length > 0 && (
          <div className="mt-6 bg-gray-100 dark:bg-gray-700 p-5 rounded-lg border border-gray-300 dark:border-white/20 transition">
            <h2 className="font-semibold text-indigo-600 dark:text-indigo-300 mb-4">📝 Choose Your Caption:</h2>
            <ul className="space-y-3">
              {captions.map((text, i) => (
                <li
                  key={i}
                  className="flex justify-between items-center bg-white dark:bg-white/10 p-3 rounded border border-white/10"
                >
                  <span className="text-sm">{text}</span>
                  <button
                    title="Copy caption"
                    className="text-lg hover:text-green-500 transition"
                    onClick={() => handleCopy(text, i)}
                  >
                    {copiedIndex === i ? '✅' : '📋'}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-right">
              <button
                title="Regenerate"
                onClick={handleGenerate}
                className="text-2xl hover:text-indigo-400 transition"
              >
                🔁
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
