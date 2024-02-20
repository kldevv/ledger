import { TreasuryBookContextProvider } from '@/hooks'
import { useTreasuryBooksQuery } from '@/shared'

import { TreasuryBookSelector } from './TreasuryBookSelector'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TreasuryBookSelector> = {
  component: TreasuryBookSelector,
  decorators: (Story) => (
    <TreasuryBookContextProvider>
      <Story />
    </TreasuryBookContextProvider>
  ),
  parameters: {
    msw: {
      handlers: {
        useTreasuryBooksQuery,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof TreasuryBookSelector>

export const Primary: Story = {}
