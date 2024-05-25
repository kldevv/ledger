/* eslint-env jest */
import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as stories from './Button.Text.stories'

const { Primary, Secondary } = composeStories(stories)

describe('Button.Text', () => {
  it('renders primary', () => {
    render(<Primary />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('button-text-primary')
  })

  it('renders secondary', () => {
    render(<Secondary />)

    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('button-text-secondary')
  })
})
