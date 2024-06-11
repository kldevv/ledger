import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as stories from './PageHeader.stories'

const { Default, HasChildren } = composeStories(stories)

describe('PageHeader', () => {
  it('renders header and desc', () => {
    render(<Default />)

    expect(
      screen.getByRole('heading', { level: 1, name: Default.args.header }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Description/)).toBeInTheDocument()
  })

  it('renders children - represented by two buttons', () => {
    render(<HasChildren />)

    expect(
      screen.getByRole('button', { name: /Button Secondary/ }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Button Primary/ }),
    ).toBeInTheDocument()
  })
})
