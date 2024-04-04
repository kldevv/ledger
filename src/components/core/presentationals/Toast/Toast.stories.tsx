import { Toast } from './Toast'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Toast> = {
  component: Toast,
}

export default meta
type Story = StoryObj<typeof Toast>

export const Primary: Story = {
  args: {
    message: 'This is a toast',
  },
}
