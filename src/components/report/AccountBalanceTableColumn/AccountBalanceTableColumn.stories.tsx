import { CategoryType } from '@/api/graphql'

import { AccountBalanceTableColumn } from './AccountBalanceTableColumn'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof AccountBalanceTableColumn> = {
  component: AccountBalanceTableColumn,
}

export default meta
type Story = StoryObj<typeof AccountBalanceTableColumn>

export const Primary: Story = {
  args: {
    data: [
      {
        type: CategoryType.ASSETS,
        category: { id: '1', name: 'CategoryA' },
        account: { id: '101', name: 'AccountX' },
        balance: 1500,
      },
      {
        type: CategoryType.ASSETS,
        category: { id: '2', name: 'CategoryB' },
        account: { id: '102', name: 'AccountY' },
        balance: 1500,
      },
      {
        type: CategoryType.EQUITY,
        category: { id: '3', name: 'CategoryC' },
        account: { id: '103', name: 'AccountZ' },
        balance: 20,
      },
    ],
  },
}
