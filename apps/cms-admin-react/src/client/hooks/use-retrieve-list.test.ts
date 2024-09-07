import { act, renderHook } from '@testing-library/react'
import { noop } from 'lodash'
import type { PaginatedEntity } from 'src/client/cms/cms-api'
import { paginatedMetadataFixture } from 'src/fixtures'
import { useRetrieveList } from './use-retrieve-list'

describe('# useRetrieveList', () => {
  it('should call request when call retrieveList method', async () => {
    const items = [1, 2, 3]
    const request = vi.fn().mockResolvedValue({
      status: 200,
      data: { items, metadata: paginatedMetadataFixture } as PaginatedEntity<number>,
    })
    const { result } = renderHook(() => useRetrieveList(request))

    expect(result.current.loading).toBe(true)

    await act(async () => {
      await result.current.retrieveList({ bar: 'baz' })
    })

    expect(result.current.loading).toBe(false)
    expect(request).toHaveBeenCalledWith({ bar: 'baz' }, undefined)
    expect(result.current.items).toEqual(items)
  })

  it('should display error when request failed', async () => {
    vi.spyOn(console, 'error').mockImplementation(noop)
    const request = vi.fn().mockRejectedValue({
      status: 500,
    })

    const { result } = renderHook(() => useRetrieveList(request))
    await act(async () => noop())

    expect(result.current.error).toBe(true)
  })
})
