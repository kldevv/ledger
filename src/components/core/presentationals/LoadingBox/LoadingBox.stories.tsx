import { LoadingBox } from './LoadingBox'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LoadingBox> = {
  component: LoadingBox,
}

export default meta
type Story = StoryObj<typeof LoadingBox>

export const Primary: Story = {
  args: {
    className: 'w-32 h-6',
  },
}
