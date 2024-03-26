import { Button } from './Button'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  component: Button,
}

export default meta
type Story = StoryObj

export const Primary: Story = {
  args: {
    children: 'Button Text',
  },
}

export const Disabled: Story = {
  args: {
    children: 'Button Text',
    disabled: true,
  },
}

export const Loading: Story = {
  args: {
    children: 'Button Text',
    loading: true,
  },
}
