import { composeStories } from '@storybook/react'
import { render, screen, within } from '@testing-library/react'

import * as stories from './DescList.stories'

const { Default, Loading } = composeStories(stories)

describe('DescList', () => {
  it('render default', () => {
    render(<Default />)

    const descListItems = screen.getAllByTestId('desc-list-item')

    expect(descListItems).toHaveLength(Default.args.items?.length ?? 0)

    descListItems.map((item, index) => {
      expect(
        within(item).getByTestId('desc-list-item-title'),
      ).toHaveTextContent(Default.args.items?.at(index)?.title ?? '')

      expect(
        within(item).getByTestId('desc-list-item-desc'),
      ).toBeInTheDocument()
    })
  })

  it('render loading', () => {
    render(<Loading />)

    const descListItems = screen.getAllByTestId('desc-list-item')

    expect(descListItems).toHaveLength(Loading.args.items?.length ?? 0)

    descListItems.map((item, index) => {
      expect(
        within(item).getByTestId('desc-list-item-title'),
      ).toHaveTextContent(Default.args.items?.at(index)?.title ?? '')

      expect(within(item).getByTestId('loading-box')).toBeInTheDocument()
    })
  })
})
