import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as stories from './Link.stories'

const { Primary, Secondary, Loading } = composeStories(stories)

describe('Button', () => {
  it('renders primary', () => {
    render(<Primary />)

    const link = screen.getByRole('link')

    expect(link).toBeInTheDocument()
    expect(link).toHaveClass(
      'border-2 bg-light-accent hover:bg-light-accent/60 text-light-shades',
    )
  })

  it('renders secondary', () => {
    render(<Secondary />)

    const link = screen.getByRole('link')

    expect(link).toBeInTheDocument()
    expect(link).toHaveClass(
      'border-2 border-light-accent hover:bg-light-accent/10 text-light-accent',
    )
  })

  it('renders loading', () => {
    render(<Loading />)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
})
