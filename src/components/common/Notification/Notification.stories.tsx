import { Notification } from './Notification'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Notification> = {
  component: Notification,
}

export default meta
type Story = StoryObj<typeof Notification>

export const Primary: Story = {
  args: {
    message: 'This is a toast',
  },
}
