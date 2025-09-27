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
    <div className="glass-card mt-6 rounded-2xl p-5 animate-fade-in-down">
      <h3 className="text-lg font-semibold text-foreground mb-2">Invite a friend for free premium 🎁</h3>
      <input
        type="email"
        placeholder="Friend's email"
        value={inviteEmail}
        onChange={(e) => setInviteEmail(e.target.value)}
        className="glass-pill w-full rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
      />
      <button
        onClick={handleInvite}
        className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-300/40 transition hover:-translate-y-0.5 hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
      >
        Send Invite
      </button>
      {status && <p className="mt-3 text-sm text-muted">{status}</p>}
    </div>
  )
}
