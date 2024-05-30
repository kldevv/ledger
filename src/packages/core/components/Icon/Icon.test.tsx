import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as stories from './Icon.stories'
import * as IconSVGs from './SVGs'

const { Primary } = composeStories(stories)

describe('Icon', () => {
  it.each(Object.keys(IconSVGs))('renders icon %s', (name) => {
    render(<Primary name={name as keyof typeof IconSVGs} />)

    expect(screen.getByTestId(`icon-${name.toLowerCase()}`)).toBeInTheDocument()
  })
})
