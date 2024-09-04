import React from 'react'
import { useParams } from 'react-router-dom'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { MockedFunction } from 'vitest'
import { api } from 'src/client'
import type { ArticleEntity, HttpResponse } from 'src/client/cms/cms-api'
import type { PaginatedEntity } from 'src/client/type'
import { articleFixture, paginatedMetadataFixture } from 'src/fixtures'
import ArticleCreatePage from './ArticleCreatePage'

const mockToast = vi.fn()
vi.mock('src/contexts/toast/toast.context', () => ({
  default: () => mockToast,
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: vi.fn(),
}))

describe('# ArticleCreatePage', () => {
  const mockedUseParams = useParams as MockedFunction<typeof useParams>
  const mockedCreateRequest = vi.spyOn(api.article, 'createArticle')
  const mockedRetrieveTags = vi.spyOn(api.tag, 'retrieveTags')
  const mockedRetrieveCategories = vi.spyOn(api.category, 'retrieveRootCategories')

  beforeEach(async () => {
    mockedUseParams.mockReturnValue({ id: '1' })
    mockedCreateRequest.mockResolvedValue({ status: 200, data: articleFixture.entity } as HttpResponse<ArticleEntity>)
    mockedRetrieveTags.mockResolvedValue({ status: 200, data: { items: [], metadata: paginatedMetadataFixture } } as HttpResponse<PaginatedEntity>)
    mockedRetrieveCategories.mockResolvedValue({ status: 200, data: [] } as HttpResponse)

    render(<ArticleCreatePage />)
    await waitFor(() => expect(mockedRetrieveTags).toHaveBeenCalled())
  })

  it('should render correctly', async () => {
    expect(screen.getByText('Create Article')).toBeInTheDocument()
  })

  it('should navigate to previous page when click back button', async () => {
    fireEvent.click(screen.getByRole('link', { name: 'Back' }))

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('should not trigger onSubmit when submit a empty form', async () => {
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('should call API when submit a valid form', async () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), { target: { value: 'article title' } })

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => expect(mockedCreateRequest).toHaveBeenCalledWith({
      title: 'article title',
      tags: [],
      content: '',
      categoryId: 1,
    }))
  })
})
