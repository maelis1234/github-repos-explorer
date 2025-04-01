import { formatRepositoryData, handleFetchError } from '../utils/api.utils'
import { Repository } from '../utils/types'

const API_GITHUB_URL = 'https://api.github.com'

const myHeaders = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
}

const getRepositoriesByUsername = async (
  username: string
): Promise<Repository[]> => {
  const response = await fetch(`${API_GITHUB_URL}/users/${username}/repos`, {
    headers: myHeaders,
  })

  handleFetchError(response)

  const data = await response.json()

  return data.map((repos: Repository) => formatRepositoryData(repos))
}

const getRepositoryDetail = async (
  username: string,
  repoName: string
): Promise<Repository> => {
  const response = await fetch(
    `${API_GITHUB_URL}/repos/${username}/${repoName}`,
    {
      headers: myHeaders,
    }
  )

  handleFetchError(response)

  const data = await response.json()

  return formatRepositoryData(data)
}

export { getRepositoriesByUsername, getRepositoryDetail }
