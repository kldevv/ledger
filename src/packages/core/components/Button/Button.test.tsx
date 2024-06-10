import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as stories from './Button.stories'

const { Primary, Secondary, Loading } = composeStories(stories)

describe('Button', () => {
  it('render primary', () => {
    render(<Primary />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass(
      'border-2 bg-light-accent hover:bg-light-accent/60 text-light-shades',
    )
  })

  it('render secondary', () => {
    render(<Secondary />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass(
      'border-2 border-light-accent hover:bg-light-accent/10 text-light-accent',
    )
  })

  it('render loading', () => {
    render(<Loading />)

    expect(screen.getByTestId('loading-box')).toBeInTheDocument()
  })
})
