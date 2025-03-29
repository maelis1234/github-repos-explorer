import { getRepositoriesByUsername } from '@/services/api'
import { Repository } from '@/utils/types'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import SearchRepositories from '../components/SearchRepositories'
import { MOCK_REPOS } from './mocks/mock'

jest.mock('@/services/api', () => ({
  getRepositoriesByUsername: jest.fn(),
}))

jest.mock('@/components/ErrorAlert.tsx', () => {
  return function MockErrorAlert({ message }: { message: string }) {
    return <div data-testid='error-alert'>{message}</div>
  }
})

const mockRepos: Repository[] = MOCK_REPOS

describe('SearchRepositories', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the search input and button', () => {
    render(<SearchRepositories />)

    expect(
      screen.getByPlaceholderText('Search for a Github User...')
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })

  it('updates search input value', () => {
    render(<SearchRepositories />)
    const input = screen.getByPlaceholderText('Search for a Github User...')

    fireEvent.change(input, { target: { value: 'mock-user' } })

    expect(input).toHaveValue('mock-user')
  })

  it('triggers search on button click', async () => {
    ;(getRepositoriesByUsername as jest.Mock).mockResolvedValue(mockRepos)

    render(<SearchRepositories />)

    const input = screen.getByPlaceholderText('Search for a Github User...')
    const button = screen.getByRole('button', { name: 'Search' })

    fireEvent.change(input, { target: { value: 'mock-user' } })
    fireEvent.click(button)

    expect(getRepositoriesByUsername).toHaveBeenCalledWith('mock-user')
    await waitFor(() => {
      expect(screen.getByText(mockRepos[0].name)).toBeInTheDocument()
      expect(screen.getByText(mockRepos[1].name)).toBeInTheDocument()
    })
  })

  it('triggers search on Enter key', async () => {
    ;(getRepositoriesByUsername as jest.Mock).mockResolvedValue(mockRepos)

    render(<SearchRepositories />)
    const input = screen.getByPlaceholderText('Search for a Github User...')

    fireEvent.change(input, { target: { value: 'mock-user' } })
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' })

    expect(getRepositoriesByUsername).toHaveBeenCalledWith('mock-user')
    await waitFor(() => {
      expect(screen.getByText(mockRepos[0].name)).toBeInTheDocument()
      expect(screen.getByText(mockRepos[1].name)).toBeInTheDocument()
    })
  })

  it('should not call API when search is empty', async () => {
    render(<SearchRepositories />)

    fireEvent.click(screen.getByText('Search'))

    expect(getRepositoriesByUsername).not.toHaveBeenCalled()
  })

  it('should disable button during search', async () => {
    ;(getRepositoriesByUsername as jest.Mock).mockImplementation(
      () => new Promise(() => {})
    )

    render(<SearchRepositories />)

    fireEvent.change(
      screen.getByPlaceholderText('Search for a Github User...'),
      {
        target: { value: 'mock-user' },
      }
    )
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('displays error message when search fails', async () => {
    ;(getRepositoriesByUsername as jest.Mock).mockRejectedValue(
      new Error('User not found')
    )

    render(<SearchRepositories />)

    fireEvent.change(
      screen.getByPlaceholderText('Search for a Github User...'),
      {
        target: { value: 'mock-user' },
      }
    )
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    await waitFor(() => {
      expect(screen.getByTestId('error-alert')).toHaveTextContent(
        'User not found'
      )
    })
  })

  it('displays "This user has no public repos." message for empty results', async () => {
    ;(getRepositoriesByUsername as jest.Mock).mockResolvedValue([])

    render(<SearchRepositories />)
    fireEvent.change(
      screen.getByPlaceholderText('Search for a Github User...'),
      {
        target: { value: 'mock-user' },
      }
    )
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    await waitFor(() => {
      expect(screen.getByTestId('error-alert')).toHaveTextContent(
        'This user has no public repos.'
      )
    })
  })

  it('displays repos after successful search', async () => {
    ;(getRepositoriesByUsername as jest.Mock).mockResolvedValue(mockRepos)

    render(<SearchRepositories />)
    fireEvent.change(
      screen.getByPlaceholderText('Search for a Github User...'),
      {
        target: { value: 'mock-user' },
      }
    )
    fireEvent.click(screen.getByRole('button', { name: 'Search' }))

    await waitFor(() => {
      const links = screen.getAllByRole('link')
      expect(screen.getByText('mock-repo')).toBeInTheDocument()
      expect(screen.getByText('mock-repo-2')).toBeInTheDocument()
      expect(links[0]).toHaveAttribute('href', '/mock-user/mock-repo')
      expect(links[1]).toHaveAttribute('href', '/mock-user/mock-repo-2')
    })
  })
})
