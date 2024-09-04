import { useCallback, useEffect, useState } from 'react'
import type { HttpResponse, RequestParams } from 'src/client/cms/cms-api'

type RetrieveDetailRequest<Entity = unknown> = (id: number, params?: RequestParams) => Promise<HttpResponse<Entity>>

export function useRetrieveDetail<Entity = unknown>(request: RetrieveDetailRequest<Entity>, id: number) {
  const [loading, setLoading] = useState(false)
  const [detail, setDetail] = useState<Entity>()

  const retrieveDetail = useCallback(async (...retrieveArgs: [RequestParams?]) => {
    try {
      setLoading(true)
      const { data } = await request(id, ...retrieveArgs)
      setDetail(data)
    }
    catch (error) {
      console.error(error)
      // TODO: error handling
    }
    finally {
      setLoading(false)
    }
  }, [id, request])

  useEffect(() => {
    void retrieveDetail()
  }, [retrieveDetail])

  return {
    loading,
    detail,
  }
}
