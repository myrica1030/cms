import { generateId } from '../generateId'

describe('# generateId', () => {
  it('should generate a random string', () => {
    const id = generateId()

    expect(id).toEqual(expect.any(String))
  })

  it('should not generate same id at same time', () => {
    for (let i = 0; i < 10; i++) {
      const id1 = generateId()
      const id2 = generateId()
      expect(id1).not.toEqual(id2)
    }
  })
})
