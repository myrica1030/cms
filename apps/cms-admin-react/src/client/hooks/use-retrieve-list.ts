import { useCallback, useEffect, useState } from 'react'
import type {
  HttpResponse,
  PaginatedEntity,
  PaginatedMetadata,
  PaginationQuery,
  RequestParams,
} from 'src/client/cms/cms-api'

type RetrieveListRequest<Query extends PaginationQuery = PaginationQuery, Entity = unknown> = (query?: Query, params?: RequestParams) => Promise<HttpResponse<PaginatedEntity<Entity>>>

export function useRetrieveList<Query extends PaginationQuery = PaginationQuery, Entity = unknown>(request: RetrieveListRequest<Query, Entity>) {
  const [items, setItems] = useState<Entity[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [pageMeta, setPageMeta] = useState<PaginatedMetadata>({
    total: 0,
    limit: 10,
    totalPages: 0,
    currentPage: 1,
  })

  const retrieveList = useCallback(async (query?: Query, params?: RequestParams): Promise<void> => {
    try {
      setLoading(true)
      const response = await request(query, params)
      const { metadata, items } = response.data
      setItems(items)
      setPageMeta(metadata)
    }
    catch (error) {
      console.error(error)
      setError(true)
    }
    finally {
      setLoading(false)
    }
  }, [request])

  useEffect(() => {
    void retrieveList()
  }, [retrieveList])

  return {
    pageMeta,
    items,
    error,
    loading,
    retrieveList,
  }
}
