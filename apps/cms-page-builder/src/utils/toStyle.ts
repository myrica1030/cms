export type StyleObject = Partial<Record<keyof CSSStyleDeclaration, any>>

export function toStyle(styleObject: StyleObject | UI.ModalStyle = {}): string {
  const nonUnitProperties = new Set([
    'line-height',
    'z-index',
    'order',
    'opacity',
  ])

  return Object.entries(styleObject)
    .filter(([, v]) => v === 0 || v)
    .map(([k, v]) => {
      k = k.replaceAll(/[A-Z]/g, match => `-${match.toLowerCase()}`)
      if (typeof v === 'number' && v !== 0 && !nonUnitProperties.has(k)) v = `${v}px`
      return `${k}:${v}`
    })
    .join(';')
}
