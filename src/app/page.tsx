'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/context/UserContext'
import { track } from '@/lib/logsnag'
import UpgradeModal from '@/components/UpgradeModal'
// import { useSearchParams } from 'next/navigation'


const tones = [
  { value: 'funny', label: '😂 Funny', premium: false },
  { value: 'motivational', label: '🔥 Motivational', premium: false },
  { value: 'relatable', label: '😅 Relatable', premium: false },
  { value: 'inspirational', label: '🌟 Inspirational', premium: false },
  { value: 'luxury', label: '💎 Luxury', premium: true },
  { value: 'mysterious', label: '🕶️ Mysterious', premium: true },
  { value: 'poetry', label: '🎭 Poetry', premium: true },
  { value: 'emotional', label: '💖 Emotional', premium: true },
  { value: 'adventurous', label: '🏕️ Adventurous', premium: true },
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
  // const generationCount = useRef(0)
  const [showUpgrade, setShowUpgrade] = useState(false)
  // inside Home()
  // const searchParams = useSearchParams()
  // const inviterEmail = searchParams.get('ref')


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
  
    // 1. First, check premium
    const res = await fetch('/api/check-premium', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: localEmail }),
    })
  
    const data = await res.json()
  
    // 2. Save email
    localStorage.setItem('caption_user_email', localEmail)
    setEmail(localEmail)
    setIsPremium(!!data.premium)
    setShowApp(true)
  
    // 3. Track user start
    await track('start', { email: localEmail })
  
    // 4. Check for ref param
    const params = new URLSearchParams(window.location.search)
    const referrer = params.get('ref')
  
    if (referrer) {
      await fetch('/api/save-referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referrer, newUserEmail: localEmail }),
      })
    }
  }
  


  const handleGenerate = async () => {
    if (!description.trim()) return

    const today = new Date().toISOString().slice(0, 10) // format "YYYY-MM-DD"
    const storageKey = `captionwizard_count_${today}`
    const currentCount = parseInt(localStorage.getItem(storageKey) || '0')

    if (!isPremium && currentCount >= 5) {
      setShowUpgrade(true)
      await track('upgrade_popup_shown', { email: email || '' })
      return
    }

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

    if (!isPremium) {
      localStorage.setItem(storageKey, String(currentCount + 1))
    }

    await track('generate', { email: email || '', tone, description })
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (!showApp) {
        handleStart()
      } else {
        handleGenerate()
      }
    }
  }

  return (
    <main className="flex flex-col min-h-screen bg-[#f4f4fb] text-gray-800 font-sans overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden px-6 py-8 max-w-2xl w-full mx-auto">

        {!showApp ? (
          <div className="w-full bg-white border border-gray-200 rounded-md p-6 text-center space-y-4">
            <p className="text-xl font-medium">Start with your email</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={localEmail}
              onChange={(e) => setLocalEmail(e.target.value)}
              onKeyDown={handleKeyDown}
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
          <div className="flex flex-col h-full">
            {/* Top area */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">Logged in as <strong>{email}</strong></p>
                <button onClick={handleLogout} className="text-sm text-red-500 hover:underline">Logout</button>
              </div>

              <textarea
                rows={2}
                className="w-full bg-transparent border-b border-gray-400 placeholder-gray-500 text-base p-2 focus:outline-none focus:ring-0"
                placeholder="Describe your image or moment..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <div className="flex flex-wrap gap-2 justify-center">
                {tones.map(({ value, label, premium }) => {
                  const isLocked = !isPremium && premium
                  const isSelected = tone === value
                  const baseClass = 'relative flex items-center justify-center px-4 py-2 rounded-full text-sm font-medium border transition'
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
                      <span className="absolute -top-2 -right-2 text-[10px] font-bold bg-yellow-400 text-yellow-900 px-1.5 py-0.5 rounded-full shadow-sm">
                        {premium ? 'PRO' : 'FREE'}
                      </span>
                    </button>
                  )
                })}
              </div>

              {!isPremium && (
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={handlePremium}
                    className="w-full bg-yellow-300 hover:bg-yellow-400 text-yellow-900 font-semibold py-2 rounded-full"
                  >
                    🌟 Unlock Premium – £5
                  </button>

                  <button
                    onClick={() => window.location.href = '/invite'}
                    className="w-full bg-pink-300 hover:bg-pink-400 text-pink-900 font-semibold py-2 rounded-full transition"
                  >
                    🎁 Get Free Premium
                  </button>
                </div>
              )}

              {showUpgrade && (
                <UpgradeModal
                  onClose={() => setShowUpgrade(false)}
                  onUpgrade={handlePremium}
                />
              )}

              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-blue-300 hover:bg-blue-400 text-blue-900 font-semibold py-3 rounded-full transition disabled:opacity-50"
              >
                {loading ? 'Typing...' : 'Generate Captions'}
              </button>
            </div>

            {/* Captions scrollable */}
            {captions.length > 0 && (
              <div className="flex flex-col flex-1 mt-6 overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide pr-1">
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
                </div>

                {/* Regenerate sticky */}
                <div className="pt-4 text-right">
                  <button onClick={handleGenerate} className="text-blue-600 text-xl">
                    🔁
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
