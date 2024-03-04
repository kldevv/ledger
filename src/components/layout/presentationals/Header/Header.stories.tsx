import { Header } from './Header'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Header> = {
  component: Header,
}

export default meta
type Story = StoryObj<typeof Header>

export const Primary: Story = {
  args: {
    header: 'Header',
    section:
      'Add section messages here. It can be a sentence about what the page is about',
    link: {
      href: '/',
      label: 'Button',
    },
  },
}

export const WithoutLink: Story = {
  args: {
    ...Primary.args,
    link: undefined,
  },
}

export const WithoutSection: Story = {
  args: {
    ...Primary.args,
    section: undefined,
  },
}

export const Tight: Story = {
  args: {
    ...Primary.args,
    className: 'w-20',
  },
}
