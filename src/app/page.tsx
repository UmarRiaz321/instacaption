'use client'

import { useState } from 'react'
import { useUser } from '@/context/UserContext'
import Logo from '@/components/Logo'
import PremiumBadge from '@/components/PremiumBadge'

export default function Home() {
  const { email, isPremium, setEmail, setIsPremium } = useUser()
  const [showApp, setShowApp] = useState<boolean>(!!email)
  const [localEmail, setLocalEmail] = useState('')
  const [description, setDescription] = useState('')
  const [tone, setTone] = useState('funny')
  const [captions, setCaptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  const handleStart = async () => {
    if (!localEmail.includes('@')) return

    const res = await fetch('/api/check-premium', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: localEmail }),
    })

    const data = await res.json()
    localStorage.setItem('caption_user_email', localEmail)
    setEmail(localEmail)
    setIsPremium(!!data.premium)
    setShowApp(true)
  }

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
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white p-6 flex items-center justify-center">
      {!showApp ? (
        <div className="w-full max-w-md backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl text-center animate-fade-in">
          <h1 className="text-3xl font-bold mb-4">✨ Caption Wizard AI</h1>
          <input
            type="email"
            placeholder="Enter your email to start"
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white mb-4 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={handleStart}
            className="w-full bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-md font-semibold transition-all"
          >
            Start 🚀
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl backdrop-blur-md bg-white/5 border border-white/10 p-8 rounded-2xl shadow-xl animate-fade-in space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Logo />
              <h1 className="text-3xl font-bold text-white">Caption Wizard AI</h1>
            </div>
            {isPremium && <PremiumBadge />}
          </div>

          {email && !isPremium && (
            <div className="text-center text-white/50 text-sm">
              You are logged in as <span className="font-medium">{email}</span>
            </div>
          )}

          <textarea
            rows={4}
            className="w-full p-4 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe your image here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option value="funny">😂 Funny</option>
            <option value="motivational">🔥 Motivational</option>
            <option value="luxury" disabled={!isPremium}>💎 Luxury {isPremium ? '' : '(Premium)'}</option>
            <option value="relatable">😅 Relatable</option>
            <option value="mysterious" disabled={!isPremium}>🕶️ Mysterious {isPremium ? '' : '(Premium)'}</option>
            <option value="poetry" disabled={!isPremium}>🎭 Poetry {isPremium ? '' : '(Premium)'}</option>
          </select>

          {!isPremium && (
            <button
              onClick={handlePremium}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg transition-all"
            >
              🌟 Unlock Premium Tones – £5
            </button>
          )}

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-6 py-3 rounded-lg font-semibold text-white disabled:opacity-50"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate Captions'}
          </button>

          {captions.length > 0 && (
            <div className="mt-4 p-4 bg-black/20 rounded-lg border border-white/10">
              <h2 className="text-indigo-300 font-semibold mb-3">📝 Captions:</h2>
              <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/10">
                {captions.map((text, i) => (
                  <div key={i} className="bg-white/5 p-3 rounded-md flex justify-between items-center border border-white/10">
                    <p className="text-sm text-white">{text}</p>
                    <button
                      className="text-white text-lg hover:text-green-400 transition"
                      onClick={() => handleCopy(text, i)}
                    >
                      {copiedIndex === i ? '✅' : '📋'}
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-right mt-4">
                <button onClick={handleGenerate} className="text-2xl hover:text-indigo-300 transition">🔁</button>
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  )
}