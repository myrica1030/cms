function camelToLowerWords(text: string): string {
  return text
    .split(/(?=[A-Z])/)
    .map(word => word.trim())
    .join(' ')
    .toLowerCase()
}

export function capitalize(str: string | undefined): string {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function sentence(text: string): string {
  const words = camelToLowerWords(text)
  return capitalize(words)
}
