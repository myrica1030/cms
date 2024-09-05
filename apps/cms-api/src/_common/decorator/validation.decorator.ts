import { Transform } from 'class-transformer'
import type { IsNumberOptions, ValidationOptions } from 'class-validator'
import { IsBoolean, IsNumber } from 'class-validator'

export function IsQueryNumber(options: IsNumberOptions = {}): PropertyDecorator {
  return function (object: NonNullable<unknown>, propertyName: string | symbol) {
    IsNumber (options)(object, propertyName)
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
