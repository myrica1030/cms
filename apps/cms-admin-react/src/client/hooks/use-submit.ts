import React, { useState } from 'react'
import type { AxiosError } from 'axios'
import { isAxiosError } from 'axios'
import type { HttpResponse, RequestParams } from 'src/client/cms/cms-api'
import type { FormRef } from 'src/components/form/FormRenderer'
import type { FormExceptionKey } from 'src/utils/form.util'
import { fieldErrorDecorator, focusErrorField } from 'src/utils/form.util'

export type FormErrorResponse = Record<string, FormExceptionKey[]>

export function isFormError(error: unknown): error is AxiosError<FormErrorResponse> {
  // FIXME
  if (!isAxiosError(error)) return false
  return error.response?.status === 422 && !!error.response.data
}

type SubmitRequest<Req = unknown, Res = unknown> = (body: Req, params?: RequestParams) => Promise<HttpResponse<Res>>
type SubmitRequestWithId<Req = unknown, Res = unknown> = (id: number, body: Req, params?: RequestParams) => Promise<HttpResponse<Res>>

interface UseSubmitReturnType<ReqArgs extends unknown[], Res> {
  formRef: FormRef
  submitting: boolean
  submitRequest: (...args: ReqArgs) => Promise<Res>
}

export function useSubmit<Req = unknown, Res = unknown>(request: SubmitRequest<Req, Res>): UseSubmitReturnType<Parameters<SubmitRequest<Req>>, Res>
export function useSubmit<Req = unknown, Res = unknown>(request: SubmitRequestWithId<Req, Res>): UseSubmitReturnType<Parameters<SubmitRequestWithId<Req>>, Res>
export function useSubmit<Req = unknown, Res = unknown>(request: SubmitRequest<Req, Res> | SubmitRequestWithId<Req, Res>): UseSubmitReturnType<Parameters<SubmitRequestWithId | SubmitRequest>, Res> {
  const formRef: FormRef = React.useRef(null)
  const [submitting, setSubmitting] = useState(false)

  const submitRequest = async (...args: unknown[]): Promise<Res> => {
    try {
      setSubmitting(true)
      // eslint-disable-next-line ts/no-unsafe-function-type
      const response = await (request as Function)(...args) as HttpResponse<Res>
      return response.data
    }
    catch (error) {
      if (formRef.current && isFormError(error)) {
        for (const [field, message] of Object.entries(error.response?.data ?? {})) formRef.current?.setError(field, fieldErrorDecorator(field, message))
        focusErrorField()
      }
      else {
        console.error(error)
      }
      throw error
    }
    finally {
      setSubmitting(false)
    }
  }

  return {
    formRef,
    submitting,
    submitRequest,
  }
}
