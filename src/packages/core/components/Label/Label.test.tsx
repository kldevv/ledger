import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as stories from './Label.stories'

const { Default, NoLabel } = composeStories(stories)

describe('Button.Text', () => {
  it('render default', () => {
    render(<Default />)

    const error = screen.getByTestId('field-label')

    expect(error).toBeInTheDocument()
    expect(error).toHaveTextContent(Default.args.t ?? '')
  })

  it('render null on no label', () => {
    render(<NoLabel />)

    expect(screen.queryByTestId('field-label')).not.toBeInTheDocument()
  })
})
