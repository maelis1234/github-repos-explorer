import { Repository } from '@/utils/types'

export const MOCK_REPOS: Repository[] = [
  {
    id: '123',
    name: 'mock-repo',
    description: 'This is a mock repo for tests.',
    created_at: '2025-01-01T00:00:00.000Z',
    updated_at: '2025-01-03T00:00:00.000Z',
    language: 'Typescript',
    stargazers_count: 20,
    forks_count: 10,
    html_url: 'https://github.com/mock-user/mock-repo',
    owner: {
      login: 'mock-user',
      avatar_url: 'https://github.com/mock-user/avatar',
      html_url: 'https://github.com/mock-user',
    },
  },
  {
    id: '456',
    name: 'mock-repo-2',
    description: 'This is a second mock repo for tests.',
    created_at: '2024-01-01T00:00:00.000Z',
    updated_at: '2025-01-03T00:00:00.000Z',
    language: 'Typescript',
    stargazers_count: 60,
    forks_count: 40,
    html_url: 'https://github.com/mock-user/mock-repo-2',
    owner: {
      login: 'mock-user',
      avatar_url: 'https://github.com/mock-user/avatar',
      html_url: 'https://github.com/mock-user',
    },
  },
]
