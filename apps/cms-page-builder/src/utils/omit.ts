export default function omit<T extends Record<K, any>, K extends string>(object: T, paths: K | K[]): Omit<T, K> {
  if (!Array.isArray(paths)) paths = [paths]
  const omitted = { ...object }
  for (const key of paths) {
    delete omitted[key]
  }
  return omitted
}
