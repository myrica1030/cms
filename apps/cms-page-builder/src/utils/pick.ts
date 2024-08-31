export function pick<T extends Record<K, any>, K extends string> (object: T, paths: K | K[]): Pick<T, K> {
  if (!Array.isArray(paths)) paths = [paths]
  const result: Partial<Pick<T, K>> = {}
  for (const key of paths) {
    result[key] = object[key]
  }
  return result as any
}
