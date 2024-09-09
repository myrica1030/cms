import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from 'src/client'
import type { AuthEntity, UserEntity } from 'src/client/cms/cms-api'
import { routeMap } from 'src/route'
import StorageUtil from 'src/utils/storage.util'

export interface AuthorizationState {
  profile: UserEntity | null
  loading: boolean
  mountAuthorization: (authEntity: AuthEntity) => void
  unmountAuthorization: () => void
}

const authorizationTokenStorage = new StorageUtil<string>('auth_token')

export default function useAuthorization(): AuthorizationState {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<UserEntity | null>(null)
  const navigate = useNavigate()

  const mountAuthorization: AuthorizationState['mountAuthorization'] = (authEntity: AuthEntity) => {
    setUser(authEntity)
    authorizationTokenStorage.set(authEntity.token)
    api.setSecurityData(authEntity.token)
  }

  const unmountAuthorization = () => {
    setUser(null)
    authorizationTokenStorage.remove()
    api.setSecurityData(null)
  }

  const retrieveUserProfile = useCallback(async () => {
    const localToken = authorizationTokenStorage.get()
    if (!localToken) {
      unmountAuthorization()
      navigate(routeMap.login, { replace: true })
      setLoading(false)
      return
    }
    api.setSecurityData(localToken)

    try {
      setLoading(true)
      const { data: user } = await api.user.profile()
      setUser(user)
    }
    catch {
      unmountAuthorization()
      navigate(routeMap.login, { replace: true })
    }
    finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    void retrieveUserProfile()
  }, [retrieveUserProfile])

  return {
    profile: user,
    loading,
    mountAuthorization,
    unmountAuthorization,
  }
}
