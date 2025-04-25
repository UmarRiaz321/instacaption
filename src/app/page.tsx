'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/context/UserContext'

const tones = [
  { value: 'funny', label: '😂 Funny' },
  { value: 'motivational', label: '🔥 Motivational' },
  { value: 'luxury', label: '💎 Luxury' },
  { value: 'relatable', label: '😅 Relatable' },
  { value: 'mysterious', label: '🕶️ Mysterious' },
  { value: 'poetry', label: '🎭 Poetry' },
]

export default function Home() {
  const { email, isPremium, setEmail, setIsPremium } = useUser()

  const [showApp, setShowApp] = useState<boolean>(!!email)
  const [localEmail, setLocalEmail] = useState('')
  const [description, setDescription] = useState('')
  const [tone, setTone] = useState('funny')
  const [captions, setCaptions] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)

  useEffect(() => {
    const storedEmail = localStorage.getItem('caption_user_email')
    if (storedEmail) {
      setLocalEmail(storedEmail)
      setEmail(storedEmail)
      setShowApp(true)

      fetch('/api/check-premium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: storedEmail }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.premium) setIsPremium(true)
        })
    }
  }, [setEmail, setIsPremium])

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

  const handleLogout = () => {
    localStorage.removeItem('caption_user_email')
    setEmail('')
    setLocalEmail('')
    setIsPremium(false)
    setShowApp(false)
    setCaptions([])
    setDescription('')
  }

  return (
    <main className="min-h-screen bg-[#f4f4fb] text-gray-800 font-sans flex flex-col">
      <div className="flex-grow px-6 py-10 max-w-2xl w-full mx-auto">
        {!showApp ? (
          <div className="w-full bg-white border border-gray-200 rounded-md p-6 text-center space-y-4">
            <p className="text-xl font-medium">Start with your email</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              className="w-full border-b border-gray-400 bg-transparent py-2 px-2 focus:outline-none focus:ring-0"
            />
            <button
              onClick={handleStart}
              className="w-full mt-4 bg-purple-300 hover:bg-purple-400 text-purple-900 font-semibold py-2 rounded-full transition"
            >
              Start
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">Logged in as <strong>{email}</strong></p>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>

            <textarea
              rows={3}
              className="w-full bg-transparent border-b border-gray-400 placeholder-gray-500 text-base p-2 focus:outline-none focus:ring-0"
              placeholder="Describe your image or moment..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex flex-wrap gap-2">
              {tones.map(({ value, label }) => {
                const isLocked = !isPremium && ['luxury', 'mysterious', 'poetry'].includes(value)
                const isSelected = tone === value
                const baseClass = 'px-4 py-2 rounded-full text-sm font-medium border transition'
                const selectedClass = isSelected ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
                const lockedClass = isLocked ? 'opacity-40 cursor-not-allowed' : ''

                return (
                  <button
                    key={value}
                    onClick={() => !isLocked && setTone(value)}
                    disabled={isLocked}
                    className={`${baseClass} ${selectedClass} ${lockedClass}`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>

            {!isPremium && (
              <button
                onClick={handlePremium}
                className="w-full bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-semibold py-2 rounded-full"
              >
                🌟 Unlock Premium Tones – £5
              </button>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full bg-blue-300 hover:bg-blue-400 text-blue-900 font-semibold py-3 rounded-full transition disabled:opacity-50"
            >
              {loading ? 'Typing...' : 'Generate Captions'}
            </button>

            {captions.length > 0 && (
              <div className="space-y-3 mt-4 max-h-[300px] overflow-y-auto scrollbar-hide">
                {captions.map((caption, i) => (
                  <div key={i} className="flex justify-between items-center bg-[#d1f7e6] text-sm px-4 py-3 rounded-full text-gray-800">
                    <span>✨ {caption}</span>
                    <button
                      className="ml-3 text-blue-600 hover:text-green-600"
                      onClick={() => handleCopy(caption, i)}
                    >
                      {copiedIndex === i ? '✅' : '📋'}
                    </button>
                  </div>
                ))}
                <div className="text-right pt-3">
                  <button onClick={handleGenerate} className="text-blue-600 text-xl">🔁</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}