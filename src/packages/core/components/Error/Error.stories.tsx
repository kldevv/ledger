import { Error } from './Error'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Error> = {
  component: Error,
}

export default meta

type Story = StoryObj<typeof Error>

export const Default: Story = {
  args: {
    e: 'Default error',
  },
}

export const NoError: Story = {}
