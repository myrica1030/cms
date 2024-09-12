import { UnprocessableEntityException } from '@nestjs/common'
import { IsEnumProperty } from 'common/decorator/api-property.decorator'

export enum FormErrorCause {
  IsNotEmpty = 'isNotEmpty',
  IsExist = 'isExist',
  IsNotExist = 'isNotExist',
  IsInvalid = 'isInvalid',
}

export class FormError implements Record<string, (string | FormErrorCause)[]> {
  @IsEnumProperty({ FormErrorCause })
  _?: any

  [field: string]: (string | FormErrorCause)[]
}

export class FormException extends UnprocessableEntityException {
  constructor(body: FormError) {
    super(body)
  }
}
