import { Repository } from './types'

const getErrorMessage = (status: number) => {
  let message = ''
  switch (status) {
    case 403:
      message =
        'Too many requests. Forbidden request. Please try again later or add an authentication token.'
      break
    case 404:
      message =
        'User not found. Please check the GitHub username and try again.'
      break
    case 500:
      message = 'GitHub server error. Please try again later.'
      break
    default:
      message = "An unexpected error occured. Please try again later."
      break
  }

  return message
}

const handleFetchError = (response: Response) => {
  if (!response.ok) {
    throw new Error(getErrorMessage(response.status))
  }
}

const formatRepositoryData = (repo: Repository): Repository => ({
   id: repo.id,
    name: repo.name,
    description: repo.description,
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    html_url: repo.html_url,
    subscribers_count: repo.subscribers_count,
    owner: {
      login: repo.owner.login,
      avatar_url: repo.owner.avatar_url,
      html_url: repo.owner.html_url,
    }
})

export { getErrorMessage, handleFetchError, formatRepositoryData }
