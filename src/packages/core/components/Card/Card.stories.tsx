import { Card } from './Card'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Card> = {
  component: Card,
  args: {
    children: 'Any Text',
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {}

export const Loading: Story = {
  args: {
    loading: true,
  },
}
