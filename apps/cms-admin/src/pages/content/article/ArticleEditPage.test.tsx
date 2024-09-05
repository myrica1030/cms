import React from 'react'
import { useParams } from 'react-router-dom'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import type { MockedFunction } from 'vitest'
import { api } from 'src/client'
import type { ArticleEntity, HttpResponse, PaginatedEntity, TagEntity } from 'src/client/cms/cms-api'
import { paginatedMetadataFixture, tagFixture } from 'src/fixtures'
import ArticleEditPage from './ArticleEditPage'

vi.mock('src/contexts/toast/toast.context', () => ({
  default: () => ({ success: vi.fn(), error: vi.fn() }),
}))

const mockNavigate = vi.fn()
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useParams: vi.fn(),
}))

describe('# ArticleEditPage', () => {
  const mockedUseParams = useParams as MockedFunction<typeof useParams>
  const mockedUpdateRequest = vi.spyOn(api.article, 'updateArticle')
  const mockedRetrieveArticle = vi.spyOn(api.article, 'retrieveArticle')
  const mockedRetrieveTags = vi.spyOn(api.tag, 'retrieveTags')
  const mockedRetrieveCategories = vi.spyOn(api.category, 'retrieveRootCategories')

  beforeEach(async () => {
    mockedUseParams.mockReturnValue({ id: '1' })
    mockedUpdateRequest.mockResolvedValue({ status: 200, data: { id: 1 } } as any)
    mockedRetrieveArticle.mockResolvedValue({
      status: 200,
      data: { id: 1, title: 'Title', content: '<p>content</p>', tags: [tagFixture.entity.key] },
    } as HttpResponse<ArticleEntity>)
    mockedRetrieveTags.mockResolvedValue({
      status: 200,
      data: { items: [tagFixture.entity], metadata: paginatedMetadataFixture },
    } as HttpResponse<PaginatedEntity<TagEntity>>)
    mockedRetrieveCategories.mockResolvedValue({ status: 200, data: [] } as HttpResponse)

    await act(async () => {
      render(<ArticleEditPage />)
    })

    await waitFor(() => expect(mockedRetrieveArticle).toHaveBeenCalled())
  })

  it('should render correctly', async () => {
    expect(screen.getByText('Edit Article')).toBeInTheDocument()
  })

  it('should navigate to previous page when click back button', async () => {
    fireEvent.click(screen.getByRole('link', { name: 'Back' }))

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })

  it('should call API when submit a valid form', async () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'Title' }), { target: { value: 'article title' } })

    fireEvent.click(screen.getByRole('button', { name: 'Submit' }))

    await waitFor(() => expect(mockedUpdateRequest).toHaveBeenCalledWith(1, {
      title: 'article title',
      tags: ['semantic-ui'],
      content: '<p>content</p>',
      categoryId: Number.NaN,
    }))
  })
})
