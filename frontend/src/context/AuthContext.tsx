import React, { createContext, useState, useEffect, useContext, ReactNode, useMemo } from 'react'
import * as SecureStore from 'expo-secure-store'

interface AuthContextType {
  userToken: string | null
  isLoading: boolean
  signIn: (token: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const bootstrapAsync = async () => {
      let storedToken: string | null
      try {
        storedToken = await SecureStore.getItemAsync('userToken')
        setUserToken(storedToken)
      } catch (e) {
        console.error('failed to restore token', e)
      }
      setIsLoading(false)
    };
    bootstrapAsync()
  }, [])

  const authContextValue = React.useMemo(() => ({
    signIn: async (token: string) => {
      console.log('AuthContext: Signing In, setting token...')
      await SecureStore.setItemAsync('userToken', token)
      setUserToken(null)
    },
    signOut: async () => {
      console.log('AuthContext: Signing Out, removing token...')
      await SecureStore.deleteItemAsync('userToken')
      setUserToken(null)
    },
    userToken,
    isLoading,
  }), [userToken, isLoading])

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}