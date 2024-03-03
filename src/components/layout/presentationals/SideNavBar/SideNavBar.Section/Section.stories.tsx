import { Section } from './Section'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Section> = {
  component: Section,
}

export default meta
type Story = StoryObj<typeof Section>

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
