/* eslint-env jest */
import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as stories from './LoadingBox.stories'

const { Primary } = composeStories(stories)

describe('LoadingBox', () => {
  it('renders primary', () => {
    render(<Primary />)

    expect(screen.getByTestId('loading-box')).toBeInTheDocument()
  })
})
