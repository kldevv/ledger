import { Icon } from '..'

import { DescList } from './DescList'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof DescList> = {
  component: DescList,
}

export default meta
type Story = StoryObj<typeof DescList>

export const Primary: Story = {
  args: {
    items: [
      {
        title: 'Item 1',
        desc: 'Cras interdum metus nec luctus egestas. Curabitur sed neque libero.',
      },
      {
        title:
          'Cras interdum metus nec luctus egestas. Curabitur sed neque libero.',
        desc: <Icon.Outline name="Home" />,
      },
    ],
  },
}
