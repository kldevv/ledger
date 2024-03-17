import { Tabs } from './Tabs'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  args: {
    options: [
      {
        label: 'First Tab',
        content:
          'Cras interdum metus nec luctus egestas. Curabitur sed neque libero.',
      },
      {
        label: 'Second Tab',
        content: 'Lorem ipsum dolor sit amet.',
      },
    ],
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

export const FullWdith: Story = {}

export const Fit: Story = {
  args: {
    fullWidth: false,
  },
}
