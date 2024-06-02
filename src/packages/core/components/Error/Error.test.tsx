import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as stories from './Error.stories'

const { Default, NoError } = composeStories(stories)

describe('Button.Text', () => {
  it('render default', () => {
    render(<Default />)

    const error = screen.getByTestId('field-error')

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent(Default.args.e ?? '')
  })

  it('render null on no error', () => {
    render(<NoError />)

    expect(screen.queryByTestId('field-error')).not.toBeInTheDocument()
  })
})
