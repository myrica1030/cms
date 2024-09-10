import { defineStore } from 'pinia'
import { api } from '@/client'
import type { AuthEntity, UserEntity } from '@/client/cms/cms-api'

export const useAuthStore = defineStore('auth', () => {
  const token = useStorage<string | null>('token', null)
  const user = useStorage<UserEntity | null>('user', null)

  function saveAuth(auth: AuthEntity | null) {
    if (auth) {
      const { token: _token, ..._user } = auth
      api.setSecurityData(_token)
      token.value = _token
      user.value = _user
    }
    else {
      api.setSecurityData(null)
      token.value = null
      user.value = null
    }
  }

  return { user, saveAuth }
})
