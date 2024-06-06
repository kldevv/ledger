import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as stories from './Card.stories'

const { Default, Loading } = composeStories(stories)

describe('Card', () => {
  it('render default', () => {
    render(<Default />)

    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument()
  })

  it('render loading', () => {
    render(<Loading />)

    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })
})
