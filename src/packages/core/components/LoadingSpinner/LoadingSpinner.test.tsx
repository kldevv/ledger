import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as stories from './LoadingSpinner.stories'

const { Primary } = composeStories(stories)

describe('LoadingSpinner', () => {
  it('renders primary', () => {
    render(<Primary />)

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
})
