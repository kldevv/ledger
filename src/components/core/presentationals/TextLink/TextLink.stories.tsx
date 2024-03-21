import { TextLink } from './TextLink'

import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof TextLink> = {
  component: TextLink,
}

export default meta
type Story = StoryObj<typeof TextLink>

export const Primary: Story = {
  args: {
    href: '/',
    children: 'Some text',
  },
}
