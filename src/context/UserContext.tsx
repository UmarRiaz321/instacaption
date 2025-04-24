'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
  email: string | null
  isPremium: boolean
  setEmail: (email: string | null) => void
  setIsPremium: (val: boolean) => void
}

const UserContext = createContext<UserContextType>({
  email: null,
  isPremium: false,
  setEmail: () => {},
  setIsPremium: () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    const storedEmail = localStorage.getItem('caption_user_email')
    if (storedEmail) {
      fetch('/api/check-premium', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: storedEmail }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.premium) {
            setIsPremium(true)
            setEmail(storedEmail)
          }
        })
    }
  }, [])

  return (
    <UserContext.Provider value={{ email, isPremium, setEmail, setIsPremium }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
