import assert from 'node:assert'
import { Transform } from 'class-transformer'
import type { ValidationArguments, ValidationOptions } from 'class-validator'
import { IsBoolean, registerDecorator } from 'class-validator'

export interface IsNumberStringOptions extends ValidationOptions {
  /**
   * If `true`, the value must be a positive integer.
   * It will ignore `allowNegative`, `allowZero` and `decimal` options.
   * @default false
   */
  onlyPositiveInteger?: boolean
  /**
   * If `true`, the value can be a negative number.
   * @default true
   */
  allowNegative?: boolean
  /**
   * If `true`, the value can be zero.
   * @default true
   */
  allowZero?: boolean
  /**
   * If provided, the value can have a maximum of `decimal` decimal places.
   */
  decimal?: number
  /**
   * If provided, the value must be greater than or equal to `min`.
   */
  min?: number
  /**
   * If provided, the value must be less than or equal to `max`.
   */
  max?: number
}

export function IsNumberString(validationOptions?: IsNumberStringOptions): PropertyDecorator {
  return (object: NonNullable<unknown>, propertyName: string | symbol) => {
    registerDecorator({
      name: 'isNumberString',
      target: object.constructor,
      propertyName: String(propertyName),
      constraints: [],
      options: validationOptions,
      validator: {
        validate: (origValue: unknown, _args: ValidationArguments) => {
          if (typeof origValue !== 'number' && typeof origValue !== 'string') return false
          const value = Number.parseFloat(origValue as string)
          if (typeof origValue !== 'number' && String(value) !== origValue) return false
          assert.ok(typeof value === 'number')
          if (validationOptions?.onlyPositiveInteger === true) {
            validationOptions.allowNegative = false
            validationOptions.allowZero = false
            validationOptions.decimal = 0
          }
          if (validationOptions?.allowNegative === false && value < 0) return false
          if (validationOptions?.allowZero === false && value === 0) return false
          if (validationOptions?.decimal !== undefined) {
            const decimalString = value.toString().split('.')[1]
            if (decimalString && decimalString.length > validationOptions.decimal) return false
          }
          if (validationOptions?.min !== undefined && value < validationOptions.min) return false
          if (validationOptions?.max !== undefined && value > validationOptions.max) return false
          const re = /^\d*(?:\.\d+)?$/
          return re.test(String(value).replaceAll(',', ''))
        },
        defaultMessage(validationArguments: ValidationArguments): string {
          // eslint-disable-next-line ts/no-unsafe-assignment
          let { property, value } = validationArguments
          value = Number.parseFloat(value as string)
          assert.ok(typeof value === 'number')
          if (validationOptions?.onlyPositiveInteger === true && (value < 0 || value === 0 || value % 1 !== 0)) return `${property} must be a positive integer string`
          if (validationOptions?.allowNegative === false && value < 0) return `${property} must be a positive number string`
          if (validationOptions?.allowZero === false && value === 0) return `${property} must be a non-zero number string`
          if (validationOptions?.decimal !== undefined && (String(value).split('.')[1]?.length || 0) > validationOptions.decimal) return `${property} must be a number string with maximum ${validationOptions.decimal} decimal places`
          if (validationOptions?.min !== undefined && value < validationOptions.min) return `${property} must be a number string greater than or equal to ${validationOptions.min}`
          if (validationOptions?.max !== undefined && value > validationOptions.max) return `${property} must be a number string less than or equal to ${validationOptions.max}`
          return `${property} must be a number string`
        },
      },
    })
  }
}

export function IsQueryNumber(isNumberStringOptions?: IsNumberStringOptions): PropertyDecorator {
  return function (object: NonNullable<unknown>, propertyName: string | symbol) {
    IsNumberString(isNumberStringOptions)(object, propertyName)
    Transform(({ value }) => {
      if (typeof value === 'string' && /^\d*(?:\.\d+)?$/.test(value.replaceAll(',', ''))) {
        const numberValue = Number.parseFloat(value)
        return Number.isNaN(numberValue) ? value : numberValue
      }
      return value as unknown
    })(object, propertyName)
  }
}

export function IsQueryBoolean(validationOptions?: ValidationOptions): PropertyDecorator {
  return function (target: NonNullable<unknown>, key: string | symbol) {
    IsBoolean(validationOptions)(target, key)
    Transform(({ value }) => {
      if (value === 'true' || value === 'false') {
        return value === 'true'
      }
      return value as unknown
    })(target, key)
  }
}
