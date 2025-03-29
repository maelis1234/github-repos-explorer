import { handleFetchError } from '../utils/errors'
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

  return data.map((repo: Repository) => ({
    id: repo.id,
    name: repo.name,
    description: repo.description,
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    html_url: repo.html_url,
    owner: {
      login: repo.owner.login,
      avatar_url: repo.owner.avatar_url,
      html_url: repo.owner.html_url,
    },
  }))
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

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    created_at: data.created_at,
    updated_at: data.updated_at,
    language: data.language,
    stargazers_count: data.stargazers_count,
    forks_count: data.forks_count,
    html_url: data.html_url,
    owner: {
      login: data.owner.login,
      avatar_url: data.owner.avatar_url,
      html_url: data.owner.html_url,
    },
  }
}

export { getRepositoriesByUsername, getRepositoryDetail }
