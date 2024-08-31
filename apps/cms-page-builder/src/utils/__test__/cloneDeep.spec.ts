import { cloneDeep } from '../cloneDeep'

describe('# cloneDeep', () => {
  it('should copy the difference reference from a object', () => {
    const obj = {
      foo: {
        bar: 'baz',
      },
    }

    const objCopy = cloneDeep(obj)
    obj.foo.bar = 'foobar'

    expect(objCopy.foo.bar).toBe('baz')
  })
})
