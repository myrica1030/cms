export const cloneDeep = <T = any>(obj: T): T => JSON.parse(JSON.stringify(obj))
