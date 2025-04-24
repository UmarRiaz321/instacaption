'use client'

import { useState } from 'react'
import { useUser } from '@/context/UserContext'
import Logo from '@/components/Logo'
// import InviteBox from '@/components/InviteBox'
import PremiumBadge from '@/components/PremiumBadge'

export default function Home() {
  const { email, isPremium, setEmail, setIsPremium } = useUser()

  const [showApp, setShowApp] = useState<boolean>(!!email)
  const [localEmail, setLocalEmail] = useState('')

  const handleStart = async () => {
    if (!localEmail.includes('@')) return

    const res = await fetch('/api/check-premium', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: localEmail }),
    })

    const data = await res.json()

    if (data.premium) {
      localStorage.setItem('caption_user_email', localEmail)
      setEmail(localEmail)
      setIsPremium(true)
      setShowApp(true)
    } else {
      // still let them in, just not premium
      localStorage.setItem('caption_user_email', localEmail)
      setEmail(localEmail)
      setIsPremium(false)
      setShowApp(true)
    }
  }


  const [description, setDescription] = useState('')
  const [tone, setTone] = useState('funny')
  const [captions, setCaptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

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
    <main className="min-h-screen bg-[#111] text-white p-6 flex items-center justify-center">
      {!showApp ? (
        <div className="w-full max-w-md bg-[#1a1a1a] border border-white/10 p-8 rounded-xl shadow-md text-center">
          {/* <Logo /> */}
          <h1 className="text-2xl font-semibold mb-4 mt-2"> Caption Wizard AI</h1>
          {/* <p className="text-sm text-white/60 mb-4">Enter your email to begin</p> */}
          <input
            type="email"
            placeholder="Enter your email to start"
            value={localEmail}
            onChange={(e) => setLocalEmail(e.target.value)}
            className="w-full p-3 rounded-md bg-white/5 border border-white/20 text-white mb-4"
          />
          <button
            onClick={handleStart}
            className="w-full bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-md font-semibold"
          >
            Start
          </button>
        </div>
      ) : (
        <div className="w-full max-w-2xl bg-[#1a1a1a] p-8 rounded-2xl shadow-lg border border-white/10">
          <div className="flex justify-center items-center gap-3 mb-6 animate-fade-in-down">
            <Logo />
            <h1 className="text-3xl font-bold text-white">Caption Wizard AI</h1>
          </div>

          {email && (
            <div className="text-center text-green-400 mb-4">
              {isPremium && (
                <div className="flex justify-center mb-4">
                  <PremiumBadge /> 
                </div>
              )}
              {!isPremium && (
                <p className="text-sm text-white/60">
                  You are logged in as <strong>{email}</strong>
                </p>
              )}
            </div>
          )}

          <textarea
            rows={4}
            className="w-full p-4 mb-4 rounded-lg bg-[#222] border border-white/10 text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Describe your image here..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full p-3 mb-6 rounded-lg bg-[#222] border border-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500"
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
            <div className="mt-6 bg-[#222] p-5 rounded-lg border border-white/10 transition">
              <h2 className="font-semibold text-indigo-300 mb-4">📝 Choose Your Caption:</h2>
              <ul className="space-y-3">
                {captions.map((text, i) => (
                  <li
                    key={i}
                    className="flex justify-between items-center bg-[#111] p-3 rounded border border-white/10"
                  >
                    <span className="text-sm text-white">{text}</span>
                    <button
                      title="Copy caption"
                      className="text-lg hover:text-green-400 transition"
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

          {/* {!isPremium && <InviteBox />} */}
        </div>
      )}
    </main>
  )
}
