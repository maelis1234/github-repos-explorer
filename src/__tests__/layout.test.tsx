import RootLayout from '@/app/layout'
import { render, screen } from '@testing-library/react'

describe('RootLayout', () => {
  it('renders the header and main content', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    )

    const header = screen.getByRole('banner')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('bg-black')
    expect(header).toHaveTextContent('GitHub Repos Explorer')

    const main = screen.getByRole('main')
    expect(main).toBeInTheDocument()
    expect(main).toHaveClass('flex')
    expect(main).toHaveClass('items-center')
    expect(main).toHaveClass('justify-center')
    expect(main).toHaveTextContent('Test Content')
  })

  it('renders children correctly', () => {
    const testContent = 'Test Child Component'
    render(
      <RootLayout>
        <div>{testContent}</div>
      </RootLayout>
    )

    expect(screen.getByText(testContent)).toBeInTheDocument()
  })
})
