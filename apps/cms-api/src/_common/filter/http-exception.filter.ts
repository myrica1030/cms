import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common'
import { Catch, HttpException } from '@nestjs/common'
import type { Response } from 'express'
import HttpStatusCode from '../enum/http-status-code'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()

    if (HttpStatusCode.isServerError(status)) {
      Error.captureStackTrace(this, this.constructor)

      response
        .status(status)
        .json({
          status: `${status}`.startsWith('4') ? 'fail' : 'error',
          isOperational: true,
        })
      return
    }

    let responsePayload = exception.getResponse()
    if (typeof responsePayload === 'string') {
      responsePayload = {
        statusCode: status,
        message: responsePayload,
      }
    }
    response
      .status(status)
      .json(responsePayload)
  }
}
