import { useTreasuryBooksQuery } from '@/shared'

import { BranchSwitch } from './BranchSwitch'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof BranchSwitch> = {
  component: BranchSwitch,
  parameters: {
    msw: {
      handlers: {
        useTreasuryBooksQuery,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof BranchSwitch>

export const Primary: Story = {}
