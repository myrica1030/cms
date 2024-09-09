import React, { createContext, useContext } from 'react'
import type { AuthorizationState } from './use-authorization'
import useAuthorization from './use-authorization'

const AuthorizationContext = createContext<AuthorizationState>({} as AuthorizationState)

export const AuthorizationProvider: React.FC<React.PropsWithChildren> = props => {
  const value = useAuthorization()

  return <AuthorizationContext.Provider value={value}>{props.children}</AuthorizationContext.Provider>
}

const useAuthorizationContext = () => useContext(AuthorizationContext)

export default useAuthorizationContext
