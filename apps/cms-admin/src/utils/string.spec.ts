import { capitalize } from './string'

describe('capitalize', () => {
  it('capitalizes the first letter of a lowercase word', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('does not change the first letter if it is already capitalized', () => {
    expect(capitalize('Hello')).toBe('Hello')
  })

  it('capitalizes the first letter of a single character', () => {
    expect(capitalize('h')).toBe('H')
  })

  it('returns an empty string if input is an empty string', () => {
    expect(capitalize('')).toBe('')
  })

  it('capitalizes the first letter and keeps the rest of the string unchanged', () => {
    expect(capitalize('hELLO')).toBe('HELLO')
  })

  it('capitalizes the first letter of each word and keeps the rest of the string unchanged', () => {
    expect(capitalize('hello world FOO')).toBe('Hello world FOO')
  })
})
