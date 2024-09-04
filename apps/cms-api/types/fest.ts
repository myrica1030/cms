/* eslint-disable ts/no-unsafe-function-type */

import type { Primitive } from 'type-fest'

export type NullToUndefined<T> = T extends null
  ? undefined
  : T extends Primitive | Function | Date | RegExp
    ? T
    : T extends Array<infer U>
      ? Array<NullToUndefined<U>>
      : T extends Map<infer K, infer V>
        ? Map<K, NullToUndefined<V>>
        : T extends Set<infer U>
          ? Set<NullToUndefined<U>>
          : T extends object
            ? { [K in keyof T]?: NullToUndefined<T[K]> }
            : unknown

export type UndefinedToNull<T> = T extends undefined
  ? null
  : T extends Primitive | Function | Date | RegExp
    ? T
    : T extends Array<infer U>
      ? Array<UndefinedToNull<U>>
      : T extends Map<infer K, infer V>
        ? Map<K, UndefinedToNull<V>>
        : T extends Set<infer U>
          ? Set<NullToUndefined<U>>
          : T extends object
            ? { [K in keyof T]: UndefinedToNull<T[K]> }
            : unknown
