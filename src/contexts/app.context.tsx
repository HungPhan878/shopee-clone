/* eslint-disable prettier/prettier */
import { createContext, useState } from 'react'

// components
import authLS from 'src/utils/auth'
import { User } from 'src/types/user.type'
import { extensionPurchases } from 'src/types/purchase.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
  extensionPurchases: extensionPurchases[]
  setExtensionPurchases: React.Dispatch<
    React.SetStateAction<extensionPurchases[]>
  >
  reset: () => void
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(authLS.getAccessTokenFromLs()),
  setIsAuthenticated: () => null,
  profile: authLS.getProfileFromLS(),
  setProfile: () => null,
  extensionPurchases: [],
  setExtensionPurchases: () => null,
  reset: () => null
}

const AppContext = createContext<AppContextInterface>(initialAppContext)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  )
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)
  const [extensionPurchases, setExtensionPurchases] = useState<
    extensionPurchases[]
  >(initialAppContext.extensionPurchases)

  const reset = () => {
    setIsAuthenticated(false)
    setExtensionPurchases([])
    setProfile(null)
  }

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        profile,
        setProfile,
        extensionPurchases,
        setExtensionPurchases,
        reset
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
