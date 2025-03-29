import HomePage from '@/app/page'
import { render, screen } from '@testing-library/react'

jest.mock('@/components/SearchRepositories.tsx', () => {
  return jest.fn(() => <div>Search Repositories Component</div>)
})

describe('HomePage', () => {
  it('renders SearchRepositories component', () => {
    render(<HomePage />)

    expect(
      screen.getByText('Search Repositories Component')
    ).toBeInTheDocument()
  })
})
