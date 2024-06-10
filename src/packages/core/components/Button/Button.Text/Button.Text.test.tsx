import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as stories from './Button.Text.stories'

const { Primary, Secondary, Loading } = composeStories(stories)

describe('Button.Text', () => {
  it('render primary', () => {
    render(<Primary />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('text-light-accent hover:text-light-accent/60')
  })

  it('render secondary', () => {
    render(<Secondary />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('text-dark-shades hover:text-dark-shades/60')
  })

  it('render loading', () => {
    render(<Loading />)

    expect(screen.getByTestId('loading-box')).toBeInTheDocument()
  })
})
