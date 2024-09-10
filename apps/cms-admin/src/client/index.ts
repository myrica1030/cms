import CONFIG from '@/config'
import { Api } from './cms/cms-api'

export const api = new Api<string>({
  baseUrl: CONFIG.API_URL,
  securityWorker: token => token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {},
})
