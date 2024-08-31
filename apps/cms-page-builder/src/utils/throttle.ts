/* eslint-disable prefer-rest-params */
type ThrottleFn<T, A extends any[]> = (this: T, ...args: A) => unknown

export const throttle = <T = any, A extends any[] = any[]>(fn: ThrottleFn<T, A>, wait: number): (this: T, ...args: A) => void => {
  let timer: NodeJS.Timeout | undefined
  let firstInvoke = true

  function throttled (this: any) {
    if (firstInvoke) {
      Reflect.apply(fn, this, arguments)
      firstInvoke = false
      return
    }

    if (timer) return
    timer = setTimeout(() => {
      clearTimeout(timer)
      timer = undefined

      Reflect.apply(fn, this, arguments)
    }, wait)
  }

  return throttled
}
