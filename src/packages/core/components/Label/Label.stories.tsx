import { Label } from './Label'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Label> = {
  component: Label,
}

export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    t: 'Default label',
  },
}

export const NoLabel: Story = {}
