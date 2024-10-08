import { HttpStatus, ValidationPipe } from '@nestjs/common'
import { FormException } from 'common/exception/form-exception.exception'

export const validationPipe = new ValidationPipe({
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: errors => {
    const errorEntries = errors.map(error => [error.property, Object.values(error.constraints ?? {})])
    // eslint-disable-next-line ts/no-unsafe-argument
    return new FormException(Object.fromEntries(errorEntries))
  },
  transform: true,
})
