import CONFIG from 'src/config'
import { Api } from './cms/cms-api'

export * from './hooks/use-submit'
export * from './hooks/use-retrieve-list'

export const api = new Api<string>({
  baseUrl: CONFIG.API_URL,
  securityWorker: token => token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {},
})
