import { act, renderHook } from '@testing-library/react'
import type { AxiosResponse } from 'axios'
import { noop } from 'lodash'
import { service } from 'src/services'
import type { ArticleEntity } from 'src/services/api'
import { useRetrieveDetail } from 'src/services/hooks/use-retrieve-detail'

describe('# useRetrieveDetail', () => {
  const mockRetrieveArticle = vi.spyOn(service.article, 'retrieveArticle')

  beforeEach(() => {
    mockRetrieveArticle.mockResolvedValue({ status: 200, data: { id: 1 } as ArticleEntity } as AxiosResponse)
  })

  it('should call api when hook loaded', async () => {
    const { result } = renderHook(() => useRetrieveDetail(service.article.retrieveArticle, 1))
    expect(result.current.loading).toEqual(true)

    await act(async () => noop())
    expect(mockRetrieveArticle).toHaveBeenCalledWith(1)
    expect(result.current.detail).toEqual({ id: 1 })
    expect(result.current.loading).toEqual(false)
  })
})
