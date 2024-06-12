import { composeStories } from '@storybook/react'
import { within } from '@storybook/test'
import { render, screen } from '@testing-library/react'

import * as stories from './Banner.stories'

const { Default } = composeStories(stories)

describe('Banner', () => {
  it('renders banner', () => {
    render(<Default />)

    expect(
      within(screen.getByRole('banner')).getByText(Default.args.title ?? ''),
    ).toBeInTheDocument()
  })
})
