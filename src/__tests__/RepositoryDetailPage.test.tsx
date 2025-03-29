import { MOCK_REPOS } from '@/__tests__/mocks/mock'
import RepositoryDetailPage from '@/app/[username]/[repoName]/page'
import { getRepositoryDetail } from '@/services/api'
import { Repository } from '@/utils/types'
import { render, screen, waitFor } from '@testing-library/react'

jest.mock('@/components/RepositoryDetailCard', () => {
  return function MockRepositoryDetailCard({ repo }: { repo: Repository }) {
    return <div data-testid='repository-detail-card'>{repo.name}</div>
  }
})

jest.mock('@/services/api', () => ({
  getRepositoryDetail: jest.fn(),
}))

describe('RepositoryDetailPage', () => {
  const mockRepo = MOCK_REPOS[1]

  beforeEach(() => {
    ;(getRepositoryDetail as jest.Mock).mockResolvedValue(mockRepo)
  })

  it('renders RepositoryDetailCard component with repository data', async () => {
    render(
      <RepositoryDetailPage
        params={Promise.resolve({
          username: 'mock-user',
          repoName: 'mock-repo',
        })}
      />
    )

    await waitFor(() => {
      expect(screen.findByTestId('repository-detail-card'))
    })
  })

  it('calls getRepositoryDetail with correct parameters', async () => {
    render(
      <RepositoryDetailPage
        params={Promise.resolve({
          username: 'mock-user',
          repoName: 'mock-repo',
        })}
      />
    )

    await waitFor(() => {
      expect(getRepositoryDetail).toHaveBeenCalledWith('mock-user', 'mock-repo')
    })
  })
})
