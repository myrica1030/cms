/* eslint-disable ts/no-unsafe-function-type,style/indent-binary-ops */

import type { Primitive } from 'type-fest'

export type PickNullable<T> = {
  [P in keyof T as null extends T[P] ? P : never]: T[P]
}
export type PickNotNullable<T> = {
  [P in keyof T as null extends T[P] ? never : P]: T[P]
}

export type NullableOptional<T> = T extends null
  ? undefined | null
  : T extends Primitive | Function | Date | RegExp
    ? T
    : T extends Array<infer U>
      ? Array<NullableOptional<U>>
      : T extends Map<infer K, infer V>
        ? Map<K, NullableOptional<V>>
        : T extends Set<infer U>
          ? Set<NullableOptional<U>>
          : T extends object
            ? {
              [K in keyof PickNullable<T>]?: NullableOptional<T[K]> | null | undefined
            } & {
              [K in keyof PickNotNullable<T>]: NullableOptional<T[K]>
            }
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
          ? Set<UndefinedToNull<U>>
          : T extends object
            ? { [K in keyof T]: UndefinedToNull<T[K]> }
            : unknown
