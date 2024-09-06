import { ArgumentsHost, Catch, ExceptionFilter, HttpException, InternalServerErrorException } from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import HttpStatusCode from 'common/enum/http-status-code.enum'
import type { Request, Response } from 'express'
import { FormErrorCause, FormException } from 'src/_common/exception/form-exception.exception'
import { PROD } from 'src/config'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    if (exception instanceof HttpException) return this.catchHttpException(exception, host)
    if (exception instanceof PrismaClientKnownRequestError) return this.cachePrismaException(exception, host)

    console.error(exception)
    return this.catchHttpException(new InternalServerErrorException(exception), host)
  }

  private catchHttpException(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const _request = ctx.getRequest<Request>()
    const status = exception.getStatus()

    if (HttpStatusCode.isServerError(status)) {
      Error.captureStackTrace(this, this.constructor)

      response
        .status(status)
        .json({
          status,
          message: exception.message,
          cause: PROD ? undefined : exception.cause,
          stack: PROD ? undefined : exception.stack,
        })
      return
    }

    let responsePayload = exception.getResponse()
    if (typeof responsePayload === 'string') {
      responsePayload = {
        status,
        message: responsePayload,
      }
    }
    response
      .status(status)
      .json(responsePayload)
  }

  private cachePrismaException(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    switch (exception.code) {
      // Unique constraint failed https://www.prisma.io/docs/orm/reference/error-reference#p2002
      case 'P2002':{
        const field = exception.meta!.target as string
        return this.catchHttpException(new FormException({ [field]: [FormErrorCause.IsExist] }), host)
      }
      // Foreign key constraint failed https://www.prisma.io/docs/orm/reference/error-reference#p2003
      case 'P2003':{
        const metaFiledName = exception.meta!.field_name as string
        const field = metaFiledName.match(/^[\da-z]+_(.+)_fkey \(index\)/i)?.at(1)
        if (field) {
          return this.catchHttpException(new FormException({ [field]: [FormErrorCause.IsNotExist] }), host)
        }
        break
      }
    }

    console.error(exception)

    if (PROD) {
      delete exception.stack
      exception.message = exception.message.split('\n').at(-1) ?? ''
    }

    return this.catchHttpException(new InternalServerErrorException(exception), host)
  }
}
