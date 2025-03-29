import { getRepositoriesByUsername, getRepositoryDetail } from '@/services/api'
import { Repository } from '@/utils/types'
import { MOCK_REPOS } from './mocks/mock'

global.fetch = jest.fn()

const mockRepo: Repository = MOCK_REPOS[1]

describe('GitHub API calls', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getRepositoriesByUsername', () => {
    it('fetches repositories successfully', async () => {
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([mockRepo]),
      })

      const result = await getRepositoriesByUsername('mock-user')
      expect(result).toEqual([mockRepo])
      expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/users/mock-user/repos',
        {
          headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
        }
      )
    })

    it('throws error for failed fetch', async () => {
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
      })

      await expect(getRepositoriesByUsername('unknown-user')).rejects.toThrow(
        'User not found. Please check the GitHub username and try again.'
      )
    })

    it('handles network errors', async () => {
      ;(fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

      await expect(getRepositoriesByUsername('test-user')).rejects.toThrow(
        'Network error'
      )
    })
  })

  describe('getRepositoryDetail', () => {
    it('fetches repository details successfully', async () => {
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockRepo),
      })

      const result = await getRepositoryDetail('mock-user', 'mock-repo')
      expect(result).toEqual(mockRepo)
      expect(fetch).toHaveBeenCalledWith(
        'https://api.github.com/repos/mock-user/mock-repo',
        {
          headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
        }
      )
    })

    it('throws error for failed fetch', async () => {
      ;(fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 403,
      })

      await expect(
        getRepositoryDetail('test-user', 'private-repo')
      ).rejects.toThrow(
        'Too many requests. Forbidden request. Please try again later or add an authentication token.'
      )
    })

    it('handles network errors', async () => {
      ;(fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

      await expect(
        getRepositoryDetail('mock-user', 'mock-repo')
      ).rejects.toThrow('Network error')
    })
  })
})
