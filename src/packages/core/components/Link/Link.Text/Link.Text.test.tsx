/* eslint-env jest */
import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as stories from './Link.Text.stories'

const { Primary, Secondary } = composeStories(stories)

describe('Link.Text', () => {
  it('renders primary', () => {
    render(<Primary />)

    const link = screen.getByRole('link')

    expect(link).toBeInTheDocument()
    expect(link).toHaveClass('link-text-primary')
  })

  it('renders secondary', () => {
    render(<Secondary />)

    const link = screen.getByRole('link')

    expect(link).toBeInTheDocument()
    expect(link).toHaveClass('link-text-secondary')
  })
})
