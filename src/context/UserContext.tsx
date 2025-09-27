'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
  email: string | null
  setEmail: (email: string | null) => void
}

const UserContext = createContext<UserContextType>({
  email: null,
  setEmail: () => {},
})

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    const storedEmail = localStorage.getItem('caption_user_email')

    if (storedEmail) {
      setEmail(storedEmail) // ✅ Always set email first!
    }
  }, [])

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
