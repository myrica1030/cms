import { MemoryRouter } from 'react-router-dom'
import { act, renderHook, waitFor } from '@testing-library/react'
import { api } from 'src/client'
import type { AuthEntity, HttpResponse, UserEntity } from 'src/client/cms/cms-api'
import useAuthorization from 'src/contexts/authorization/use-authorization'
import StorageUtil from 'src/utils/storage.util'

vi.mock('src/client')

describe('# Authorization Context', () => {
  const mockSetSecurityData = vi.spyOn(api, 'setSecurityData')
  const mockRetrieveProfile = vi.spyOn(api.user, 'profile')

  it('should got auth with null when init state', async () => {
    const { result } = renderHook(() => useAuthorization(), {
      wrapper: MemoryRouter,
      initialProps: {},
    })

    expect(result.current.profile).toBeNull()
  })

  it('should jump to login page when token not exist', async () => {
    vi.spyOn(StorageUtil.prototype, 'get').mockReturnValue(null)

    renderHook(() => useAuthorization(), { wrapper: MemoryRouter, initialProps: {} })

    await waitFor(() => expect(mockSetSecurityData).toHaveBeenCalledWith(null))
  })

  it('should retrieve userProfile API when load context', async () => {
    vi.spyOn(StorageUtil.prototype, 'get').mockReturnValue('token')
    mockRetrieveProfile.mockResolvedValue({ status: 200, data: { username: 'foo' } } as HttpResponse<UserEntity>)

    const { result } = renderHook(() => useAuthorization(), { wrapper: MemoryRouter, initialProps: {} })
    await waitFor(() => expect(result.current.profile).toEqual({ username: 'foo' }))
  })

  it('should redirect to login page when token is invalid', async () => {
    vi.spyOn(StorageUtil.prototype, 'get').mockReturnValue('token')
    mockRetrieveProfile.mockRejectedValue({ response: { status: 401 } })

    renderHook(() => useAuthorization(), { wrapper: MemoryRouter, initialProps: {} })

    await waitFor(() => expect(mockSetSecurityData).toHaveBeenCalledWith(null))
  })

  it('should return correct loading state when retrieve API', async () => {
    vi.spyOn(StorageUtil.prototype, 'get').mockReturnValue('token')
    mockRetrieveProfile.mockResolvedValue({ username: 'foo' } as any)

    const { result } = renderHook(() => useAuthorization(), { wrapper: MemoryRouter, initialProps: {} })
    expect(result.current.loading).toBeTruthy()

    await waitFor(() => {
      expect(result.current.loading).toBeFalsy()
    })
  })

  it('should set localstorage when call mount authorization', async () => {
    vi.spyOn(StorageUtil.prototype, 'get').mockReturnValue('token')
    mockRetrieveProfile.mockResolvedValue({ username: 'foo' } as any)
    const { result } = renderHook(() => useAuthorization(), { wrapper: MemoryRouter, initialProps: {} })

    await act(async () => {
      result.current.mountAuthorization({ id: 1, token: 'token' } as AuthEntity)
    })

    expect(mockSetSecurityData).toHaveBeenCalledWith('token')
  })

  it('should remove localStorage when call unmount authorization', async () => {
    vi.spyOn(StorageUtil.prototype, 'get').mockReturnValue('token')
    mockRetrieveProfile.mockResolvedValue({ username: 'foo' } as any)
    const { result } = renderHook(() => useAuthorization(), { wrapper: MemoryRouter, initialProps: {} })

    await act(async () => {
      result.current.unmountAuthorization()
    })

    expect(mockSetSecurityData).toHaveBeenCalledWith(null)
  })
})
