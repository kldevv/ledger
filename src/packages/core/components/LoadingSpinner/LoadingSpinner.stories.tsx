import { LoadingSpinner } from './LoadingSpinner'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof LoadingSpinner> = {
  component: LoadingSpinner,
}

export default meta

type Story = StoryObj<typeof LoadingSpinner>

export const Primary: Story = {
  args: {
    className: 'size-8',
  },
}
