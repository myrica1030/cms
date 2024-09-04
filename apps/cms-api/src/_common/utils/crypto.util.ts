import { createHmac } from 'node:crypto'
import { APP_SECRET } from 'src/config'

export function cryptoPassword(password: string): string {
  const hmac = createHmac('sha256', APP_SECRET)
  return hmac.update(password).digest('hex')
}
