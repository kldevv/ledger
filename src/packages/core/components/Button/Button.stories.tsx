import { Button } from './Button'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    variant: 'primary',
    className: 'text-sm',
    children: 'Hello',
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const Primary: Story = {}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args) => (
    <div className="h-8 w-16">
      <Button {...args} />
    </div>
  ),
}
