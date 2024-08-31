import omit from '../omit'

describe('# omit', () => {
  it('should omit the special properties', () => {
    const foo = {
      a: 1,
      b: 2,
    }

    expect(omit(foo, 'a')).toEqual({ b: 2 })
  })

  it('should not modify origin array when omit keys', () => {
    const foo = {
      a: 1,
      b: 2,
    }
    omit(foo, ['a'])

    expect(foo).toEqual({ a: 1, b: 2 })
  })
})
