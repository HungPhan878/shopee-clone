/* eslint-disable prettier/prettier */
import { createContext, useState } from 'react'

// components
import authLS from 'src/utils/auth'
import { User } from 'src/types/user.type'

interface AppContextInterface {
  isAuthenticated: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  profile: User | null
  setProfile: React.Dispatch<React.SetStateAction<User | null>>
}

const initialAppContext: AppContextInterface = {
  isAuthenticated: Boolean(authLS.getAccessTokenFromLs()),
  setIsAuthenticated: () => null,
  profile: authLS.getProfileFromLS(),
  setProfile: () => null
}

const AppContext = createContext<AppContextInterface>(initialAppContext)

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    initialAppContext.isAuthenticated
  )
  const [profile, setProfile] = useState<User | null>(initialAppContext.profile)

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, profile, setProfile }}
    >
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
