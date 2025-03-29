import { render, screen } from '@testing-library/react'

import ErrorAlert from '@/components/ErrorAlert'

describe('ErrorAlert Component', () => {
  it('should render with the provided message', () => {
    const errorMessage = 'User not found'

    render(<ErrorAlert message={errorMessage} />)

    expect(screen.getByText(errorMessage)).toBeInTheDocument()
  })
})
