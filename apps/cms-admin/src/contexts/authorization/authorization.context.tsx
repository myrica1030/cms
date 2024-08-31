import React, { createContext, useContext } from 'react'
import type { AuthorizationState } from './useAuthorization'
import useAuthorization from './useAuthorization'

const AuthorizationContext = createContext<AuthorizationState>({} as AuthorizationState)

export const AuthorizationProvider: React.FC<React.PropsWithChildren> = props => {
  const value = useAuthorization()

  return <AuthorizationContext.Provider value={value}>{props.children}</AuthorizationContext.Provider>
}

const useAuthorizationContext = () => useContext(AuthorizationContext)

export default useAuthorizationContext
