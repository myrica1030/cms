export const generateId = (): string => {
  const timestamp = Date.now()
  const random = Math.trunc(Math.random() * 10_000)

  return random.toString(36) + timestamp.toString(36)
}
