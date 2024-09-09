import { pick } from '../pick'

describe('# pick', () => {
  it('should pickup the special properties', () => {
    const foo = {
      a: 1,
      b: 2,
    }

    expect(pick(foo, 'a')).toEqual({ a: 1 })
  })

  it('should not modify origin array when pick up keys', () => {
    const foo = {
      a: 1,
      b: 2,
    }
    pick(foo, ['a'])

    expect(foo).toEqual({ a: 1, b: 2 })
  })
})
