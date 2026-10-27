import { createContext, useContext, useState } from 'react'

const DemoAuthContext = createContext(null)

export function DemoAuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const login = (email) => setUser({ name: email.split('@')[0], email })
  const signup = (name, email) => setUser({ name, email })
  const logout = () => setUser(null)

  return <DemoAuthContext.Provider value={{ user, login, signup, logout }}>{children}</DemoAuthContext.Provider>
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext)
  if (!context) throw new Error('useDemoAuth must be used within DemoAuthProvider')
  return context
}
