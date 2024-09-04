import CONFIG from 'src/config'
import { Api } from './api'

export * from './hooks/use-submit'
export * from './hooks/use-retrieve-list'

export const service = new Api<string>({
  baseURL: CONFIG.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  securityWorker: token => token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {},
})
