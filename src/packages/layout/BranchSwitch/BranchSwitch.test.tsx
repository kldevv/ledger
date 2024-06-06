import { composeStories } from '@storybook/react'
import { userEvent } from '@storybook/test'
import { render, screen } from '@testing-library/react'

import * as stories from './BranchSwitch.stories'

const { Default } = composeStories(stories)

describe('BranchSwitch', () => {
  it('renders default', async () => {
    render(<Default />)

    const button = await screen.findByRole('button')

    expect(button).toBeInTheDocument()

    await userEvent.click(button)
  })
})
