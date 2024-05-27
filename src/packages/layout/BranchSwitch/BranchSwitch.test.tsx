/* eslint-env jest */
import { composeStories } from '@storybook/react'
import { userEvent } from '@storybook/test'
import { render, screen } from '@testing-library/react'

import * as stories from './BranchSwitch.stories'

const { Default } = composeStories(stories)

describe('BranchSwitch', () => {
  it('renders primary', async () => {
    render(<Default />)

    const button = await screen.findByRole('button')

    expect(button).toBeInTheDocument()

    await userEvent.click(button)

    expect(screen.findByText(''))
  })

  // it('renders secondary', () => {
  //   render(<Secondary />)

  //   const link = screen.getByRole('link')

  //   expect(link).toBeInTheDocument()
  //   expect(link).toHaveClass('link-text-secondary')
  // })
})
