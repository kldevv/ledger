import { Item } from './Item'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Item> = {
  component: Item,
}

export default meta
type Story = StoryObj<typeof Item>

export const Active: Story = {
  args: {
    icon: 'Home',
    href: '/',
    label: 'Home',
  },
}

export const Inactive: Story = {
  args: {
    icon: 'ReceiptPercent',
    href: '/transactions',
    label: 'Transactions',
  },
}
