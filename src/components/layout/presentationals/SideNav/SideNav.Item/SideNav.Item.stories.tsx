import { SideNavItem } from './SideNav.Item'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SideNavItem> = {
  component: SideNavItem,
}

export default meta
type Story = StoryObj<typeof SideNavItem>

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
