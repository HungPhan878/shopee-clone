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

// Tạo f để khi qua createWrapper có thể set lại acc
export const getInitialAppContext: () => AppContextInterface = () => ({
  isAuthenticated: Boolean(authLS.getAccessTokenFromLs()),
  setIsAuthenticated: () => null,
  profile: authLS.getProfileFromLS(),
  setProfile: () => null,
  extensionPurchases: [],
  setExtensionPurchases: () => null,
  reset: () => null
})

const initialAppContext = getInitialAppContext()

const AppContext = createContext<AppContextInterface>(initialAppContext)

const AppProvider = ({
  children,
  // Thêm tham số 2 để khi qua createWrapper bọc app lại để custom lại defaultValue
  defaultValue = initialAppContext
}: {
  children: React.ReactNode
  defaultValue?: AppContextInterface
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    defaultValue.isAuthenticated
  )
  const [profile, setProfile] = useState<User | null>(defaultValue.profile)
  const [extensionPurchases, setExtensionPurchases] = useState<
    extensionPurchases[]
  >(defaultValue.extensionPurchases)

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
