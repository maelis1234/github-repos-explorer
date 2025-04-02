import ErrorPage from '@/app/[username]/[repoName]/error'
import { render, screen, waitFor } from '@testing-library/react'

jest.mock('@/components/ErrorAlert.tsx', () => {
  return function MockErrorAlert({ message }: { message: string }) {
    return <div data-testid='error-alert'>{message}</div>
  }
})

describe('ErrorPage', () => {
  const mockError = new Error('Something went wrong')

  it('renders ErrorAlert component with message', async () => {
    render(<ErrorPage error={mockError} />)

    await waitFor(() => {
      expect(screen.getByTestId('error-alert')).toHaveTextContent(
        'Something went wrong'
      )
    })
  })

  it('displays a Back link', () => {
    render(<ErrorPage error={mockError} />)

    const backLink = screen.getByRole('link', { name: 'Back to Search Page' })
    expect(backLink).toHaveAttribute('href', '/')
  })
})
