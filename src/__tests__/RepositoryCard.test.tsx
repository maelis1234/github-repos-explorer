import RepositoryCard from '@/components/RepositoryCard'
import { Repository } from '@/utils/types'
import { render, screen } from '@testing-library/react'
import { MOCK_REPOS } from './mocks/mock'

jest.mock('@heroicons/react/24/outline', () => ({
  FolderOpenIcon: () => <div data-testid='folder-icon' />,
}))

const mockRepo: Repository = MOCK_REPOS[0]

describe('RepositoryCard', () => {
  it('renders the repository name correctly', () => {
    render(<RepositoryCard repo={mockRepo} />)
    expect(screen.getByText(mockRepo.name)).toBeInTheDocument()
  })

  it('displays the icon', () => {
    render(<RepositoryCard repo={mockRepo} />)
    expect(screen.getByTestId('folder-icon')).toBeInTheDocument()
  })

  it('has correct link', () => {
    render(<RepositoryCard repo={mockRepo} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute(
      'href',
      `/${mockRepo.owner.login}/${mockRepo.name}`
    )
  })
})
