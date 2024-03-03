import { Outline } from './Icon.Outline'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Outline> = {
  component: Outline,
}

export default meta
type Story = StoryObj<typeof Outline>

export const Primary: Story = {
  args: {
    name: 'Home',
  },
}
