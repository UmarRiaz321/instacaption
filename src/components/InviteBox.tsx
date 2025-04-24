'use client'

import { useState } from 'react'

export default function InviteBox() {
  const [inviteEmail, setInviteEmail] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  const handleInvite = async () => {
    if (!inviteEmail.includes('@')) {
      setStatus('Please enter a valid email.')
      return
    }

    const res = await fetch('/api/invite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: inviteEmail }),
    })

    const data = await res.json()
    setStatus(data.message || data.error)
    setInviteEmail('')
  }

  return (
    <div className="mt-6 bg-white/5 p-4 rounded-md border border-white/10 animate-fade-in-down">
      <h3 className="text-white text-lg font-semibold mb-2">Invite a friend for free premium 🎁</h3>
      <input
        type="email"
        placeholder="Friend's email"
        value={inviteEmail}
        onChange={(e) => setInviteEmail(e.target.value)}
        className="w-full p-3 rounded-md bg-white/10 border border-white/20 text-white outline-none mb-2"
      />
      <button
        onClick={handleInvite}
        className="w-full bg-indigo-600 hover:bg-indigo-700 transition px-6 py-2 rounded-md font-semibold"
      >
        Send Invite
      </button>
      {status && <p className="mt-2 text-sm text-indigo-300">{status}</p>}
    </div>
  )
}
