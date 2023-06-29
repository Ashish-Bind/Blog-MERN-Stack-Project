import { createContext, useState } from 'react'

export const UserContext = createContext({})

export const UserContextProvider = function ({ children }) {
  const [userInfo, setUserInfo] = useState({})
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  )
}
