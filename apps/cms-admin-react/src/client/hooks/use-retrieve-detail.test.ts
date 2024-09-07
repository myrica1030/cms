import { act, renderHook } from '@testing-library/react'
import { noop } from 'lodash'
import type { ArticlePublicEntity, HttpResponse } from 'src/client/cms/cms-api'
import { api } from 'src/client/index'
import { useRetrieveDetail } from './use-retrieve-detail'

describe('# useRetrieveDetail', () => {
  const mockedRetrieveArticle = vi.spyOn(api.article, 'retrieveArticle')

  beforeEach(() => {
    mockedRetrieveArticle.mockResolvedValue({
      status: 200,
      data: { id: 1 },
    } as HttpResponse<ArticlePublicEntity>)
  })

  it('should call api when hook loaded', async () => {
    const { result } = renderHook(() => useRetrieveDetail(api.article.retrieveArticle, 1))
    expect(result.current.loading).toEqual(true)

    await act(async () => noop())
    expect(mockedRetrieveArticle).toHaveBeenCalledWith(1)
    expect(result.current.detail).toEqual({ id: 1 })
    expect(result.current.loading).toEqual(false)
  })
})
