import { SideNavSection } from './SideNav.Section'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof SideNavSection> = {
  component: SideNavSection,
}

export default meta
type Story = StoryObj<typeof SideNavSection>

export const Titled: Story = {
  args: {
    title: 'Home',
    items: [
      { icon: 'ReceiptPercent', href: '/transactions', label: 'Transactions' },
      { icon: 'Home', href: '/', label: 'Home' },
    ],
  },
}

export const Untitled: Story = {
  args: {
    items: [{ icon: 'Home', href: '/', label: 'Home' }],
  },
}
