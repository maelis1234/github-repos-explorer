export interface Repository {
  id: string
  name: string
  description: string | null
  created_at: string
  updated_at: string
  language: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  owner: Owner
}

interface Owner {
  login: string
  avatar_url: string
  html_url: string
}
