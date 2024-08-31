import { cryptoPassword } from './cryptoPassword'

describe('utilities', () => {
  it('cryptoPassword', () => {
    const hashedPassword = cryptoPassword('foobar')

    expect(hashedPassword).toBe('4fcc06915b43d8a49aff193441e9e18654e6a27c2c428b02e8fcc41ccc2299f9')
  })
})
