import RepositoryDetailCard from '@/components/RepositoryDetailCard'
import { render, screen } from '@testing-library/react'
import { MOCK_REPOS } from './mocks/mock'

describe('RepositoryDetailCard Component', () => {
  const mockRepo = MOCK_REPOS[0]

  it('should render with the provided repository', () => {
    render(<RepositoryDetailCard repo={mockRepo} />)

    expect(screen.getByText(mockRepo.name)).toBeInTheDocument()
    expect(screen.getByText(mockRepo.owner.login)).toBeInTheDocument()
    expect(screen.getByText(mockRepo.description ?? '')).toBeInTheDocument()
    expect(
      screen.getByText(
        `Created on ${new Date(mockRepo.created_at).toLocaleDateString()}`
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        `Updated on ${new Date(mockRepo.updated_at).toLocaleDateString()}`
      )
    ).toBeInTheDocument()

    expect(screen.getByText(mockRepo.language ?? '')).toBeInTheDocument()
    expect(
      screen.getByText(`Starred by ${mockRepo.stargazers_count} devs`)
    ).toBeInTheDocument()
     expect(
      screen.getByText(`${mockRepo.subscribers_count} followers`)
    ).toBeInTheDocument()
    expect(
      screen.getByText(`${mockRepo.forks_count} forks`)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'View on GitHub' })
    ).toHaveAttribute('href', mockRepo.html_url)
  })

  it("renders 'No description available' when description is missing", () => {
    const repoWithoutDescription = { ...mockRepo, description: null }
    render(<RepositoryDetailCard repo={repoWithoutDescription} />)

    expect(screen.getByText('No description available')).toBeInTheDocument()
  })

  it("renders 'Unknown' text when language is missing", () => {
    const repoWithoutLanguage = { ...mockRepo, language: null }
    render(<RepositoryDetailCard repo={repoWithoutLanguage} />)

    expect(screen.getByText('Unknown')).toBeInTheDocument()
  })
})
